"use server";

import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";
import { db, hasDatabaseUrl, isDbConfigured, supabase } from "@/server/db/client";
import { shipmentEvents, shipments } from "@/server/db/schema";
import { CreateShipmentSchema, UpdateShipmentSchema } from "@/lib/validations";
import { requireSession } from "@/server/auth/session";
import { getNextShipmentId } from "@/server/queries/shipment-id";

export type ShipmentActionState =
  | { status: "idle" }
  | { status: "success"; id: string }
  | { status: "error"; message: string; fieldErrors?: Record<string, string[]> };

function parseOptionalDate(value: string | undefined) {
  if (!value) return null;
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
}

async function requireAuth() {
  try {
    await requireSession();
  } catch {
    return { ok: false as const, error: "You must be signed in." };
  }
  if (!isDbConfigured) {
    return { ok: false as const, error: "Database is not configured." };
  }
  return { ok: true as const };
}

function buildShipmentPayload(
  data: {
    customerName: string;
    origin: string;
    destination: string;
    mode: "sea" | "air" | "road";
    status: "Booked" | "In Transit" | "Customs" | "Delivered" | "Exception";
    eta?: string;
    valueInr?: number;
    promisedAt?: string;
  },
  existingDeliveredAt?: Date | null,
) {
  const now = new Date();
  const promised = parseOptionalDate(data.promisedAt);
  let deliveredAt = existingDeliveredAt ?? null;
  if (data.status === "Delivered" && !deliveredAt) deliveredAt = now;
  if (data.status !== "Delivered") deliveredAt = null;

  return {
    customerName: data.customerName,
    origin: data.origin,
    destination: data.destination,
    mode: data.mode,
    status: data.status,
    eta: data.eta || null,
    valueInr: data.valueInr ?? null,
    promisedAt: promised,
    deliveredAt,
    updatedAt: now,
  };
}

export async function createShipment(
  _prev: ShipmentActionState,
  formData: FormData,
): Promise<ShipmentActionState> {
  const auth = await requireAuth();
  if (!auth.ok) return { status: "error", message: auth.error };

  const parsed = CreateShipmentSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) {
    return {
      status: "error",
      message: "Please check the form for errors.",
      fieldErrors: parsed.error.flatten().fieldErrors,
    };
  }

  const payload = buildShipmentPayload(parsed.data);

  try {
    const id = await getNextShipmentId();
    const now = new Date();

    const row = {
      id,
      customer_id: null as string | null,
      customer_name: payload.customerName,
      origin: payload.origin,
      destination: payload.destination,
      mode: payload.mode,
      status: payload.status,
      eta: payload.eta,
      value_inr: payload.valueInr,
      promised_at: payload.promisedAt?.toISOString() ?? null,
      delivered_at: payload.deliveredAt?.toISOString() ?? null,
      created_at: now.toISOString(),
      updated_at: now.toISOString(),
    };

    if (!hasDatabaseUrl || !db) {
      if (!supabase) throw new Error("Database unavailable");
      const { error: shipmentError } = await supabase.from("shipment").insert(row);
      if (shipmentError) throw shipmentError;
      const { error: eventError } = await supabase.from("shipment_event").insert({
        shipment_id: id,
        status: "Booked",
        location: payload.origin,
        note: "Booking confirmed.",
        occurred_at: now.toISOString(),
      });
      if (eventError) throw eventError;
    } else {
      await db.insert(shipments).values({
        id,
        customerName: payload.customerName,
        origin: payload.origin,
        destination: payload.destination,
        mode: payload.mode,
        status: payload.status,
        eta: payload.eta,
        valueInr: payload.valueInr,
        promisedAt: payload.promisedAt,
        deliveredAt: payload.deliveredAt,
      });
      await db.insert(shipmentEvents).values({
        shipmentId: id,
        status: "Booked",
        location: payload.origin,
        note: "Booking confirmed.",
      });
    }

    revalidateShipmentPaths();
    return { status: "success", id };
  } catch (err) {
    console.error("createShipment failed", err);
    return { status: "error", message: "Could not create shipment. Please try again." };
  }
}

export async function updateShipment(
  _prev: ShipmentActionState,
  formData: FormData,
): Promise<ShipmentActionState> {
  const auth = await requireAuth();
  if (!auth.ok) return { status: "error", message: auth.error };

  const parsed = UpdateShipmentSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) {
    return {
      status: "error",
      message: "Please check the form for errors.",
      fieldErrors: parsed.error.flatten().fieldErrors,
    };
  }

  const { id, ...fields } = parsed.data;

  try {
    let existingDeliveredAt: Date | null = null;

    if (!hasDatabaseUrl || !db) {
      if (!supabase) throw new Error("Database unavailable");
      const { data: existing, error: fetchError } = await supabase
        .from("shipment")
        .select("delivered_at")
        .eq("id", id)
        .maybeSingle();
      if (fetchError) throw fetchError;
      if (!existing) return { status: "error", message: "Shipment not found." };
      existingDeliveredAt = existing.delivered_at ? new Date(existing.delivered_at) : null;
    } else {
      const [existing] = await db
        .select({ deliveredAt: shipments.deliveredAt })
        .from(shipments)
        .where(eq(shipments.id, id))
        .limit(1);
      if (!existing) return { status: "error", message: "Shipment not found." };
      existingDeliveredAt = existing.deliveredAt;
    }

    const payload = buildShipmentPayload(fields, existingDeliveredAt);

    if (!hasDatabaseUrl || !db) {
      if (!supabase) throw new Error("Database unavailable");
      const { error } = await supabase
        .from("shipment")
        .update({
          customer_name: payload.customerName,
          origin: payload.origin,
          destination: payload.destination,
          mode: payload.mode,
          status: payload.status,
          eta: payload.eta,
          value_inr: payload.valueInr,
          promised_at: payload.promisedAt?.toISOString() ?? null,
          delivered_at: payload.deliveredAt?.toISOString() ?? null,
          updated_at: payload.updatedAt.toISOString(),
        })
        .eq("id", id);
      if (error) throw error;
    } else {
      await db
        .update(shipments)
        .set({
          customerName: payload.customerName,
          origin: payload.origin,
          destination: payload.destination,
          mode: payload.mode,
          status: payload.status,
          eta: payload.eta,
          valueInr: payload.valueInr,
          promisedAt: payload.promisedAt,
          deliveredAt: payload.deliveredAt,
          updatedAt: payload.updatedAt,
        })
        .where(eq(shipments.id, id));
    }

    revalidateShipmentPaths(id);
    return { status: "success", id };
  } catch (err) {
    console.error("updateShipment failed", err);
    return { status: "error", message: "Could not update shipment. Please try again." };
  }
}

export async function deleteShipment(id: string): Promise<ShipmentActionState> {
  const auth = await requireAuth();
  if (!auth.ok) return { status: "error", message: auth.error };

  if (!id.trim()) return { status: "error", message: "Shipment reference is required." };

  try {
    if (!hasDatabaseUrl || !db) {
      if (!supabase) throw new Error("Database unavailable");
      const { error } = await supabase.from("shipment").delete().eq("id", id);
      if (error) throw error;
    } else {
      await db.delete(shipments).where(eq(shipments.id, id));
    }

    revalidateShipmentPaths(id);
    return { status: "success", id };
  } catch (err) {
    console.error("deleteShipment failed", err);
    return { status: "error", message: "Could not delete shipment. Please try again." };
  }
}

function revalidateShipmentPaths(id?: string) {
  revalidatePath("/admin");
  revalidatePath("/admin/shipments");
  revalidatePath("/admin/analytics");
  if (id) revalidatePath(`/admin/shipments/${id}`);
}
