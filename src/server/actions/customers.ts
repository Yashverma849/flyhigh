"use server";

import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";
import { db, hasDatabaseUrl, isDbConfigured, supabase } from "@/server/db/client";
import { customers } from "@/server/db/schema";
import { CreateCustomerSchema, UpdateCustomerSchema } from "@/lib/validations";
import { requireSession } from "@/server/auth/session";

export type CustomerActionState =
  | { status: "idle" }
  | { status: "success"; id: string }
  | { status: "error"; message: string; fieldErrors?: Record<string, string[]> };

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

function normalizePayload(data: {
  name: string;
  contactEmail?: string;
  primaryContact?: string;
  location?: string;
  tier: "platinum" | "gold" | "silver";
  healthScore?: number;
}) {
  return {
    name: data.name,
    contactEmail: data.contactEmail || null,
    primaryContact: data.primaryContact || null,
    location: data.location || null,
    tier: data.tier,
    healthScore: data.healthScore ?? 80,
  };
}

function revalidateCustomerPaths() {
  revalidatePath("/admin/customers");
  revalidatePath("/admin");
}

export async function createCustomer(
  _prev: CustomerActionState,
  formData: FormData,
): Promise<CustomerActionState> {
  const auth = await requireAuth();
  if (!auth.ok) return { status: "error", message: auth.error };

  const parsed = CreateCustomerSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) {
    return {
      status: "error",
      message: "Please check the form for errors.",
      fieldErrors: parsed.error.flatten().fieldErrors,
    };
  }

  const payload = normalizePayload(parsed.data);

  try {
    if (!hasDatabaseUrl || !db) {
      if (!supabase) throw new Error("Database unavailable");
      const { data, error } = await supabase
        .from("customer")
        .insert({
          name: payload.name,
          contact_email: payload.contactEmail,
          primary_contact: payload.primaryContact,
          location: payload.location,
          tier: payload.tier,
          health_score: payload.healthScore,
        })
        .select("id")
        .single();
      if (error) throw error;
      if (!data) throw new Error("Insert returned no row");
      revalidateCustomerPaths();
      return { status: "success", id: data.id };
    }

    const [row] = await db
      .insert(customers)
      .values({
        name: payload.name,
        contactEmail: payload.contactEmail,
        primaryContact: payload.primaryContact,
        location: payload.location,
        tier: payload.tier,
        healthScore: payload.healthScore,
      })
      .returning({ id: customers.id });

    if (!row) throw new Error("Insert returned no row");
    revalidateCustomerPaths();
    return { status: "success", id: row.id };
  } catch (err) {
    console.error("createCustomer failed", err);
    return { status: "error", message: "Could not create customer. Please try again." };
  }
}

export async function updateCustomer(
  _prev: CustomerActionState,
  formData: FormData,
): Promise<CustomerActionState> {
  const auth = await requireAuth();
  if (!auth.ok) return { status: "error", message: auth.error };

  const parsed = UpdateCustomerSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) {
    return {
      status: "error",
      message: "Please check the form for errors.",
      fieldErrors: parsed.error.flatten().fieldErrors,
    };
  }

  const { id, ...fields } = parsed.data;
  const payload = normalizePayload(fields);

  try {
    if (!hasDatabaseUrl || !db) {
      if (!supabase) throw new Error("Database unavailable");
      const { data, error } = await supabase
        .from("customer")
        .update({
          name: payload.name,
          contact_email: payload.contactEmail,
          primary_contact: payload.primaryContact,
          location: payload.location,
          tier: payload.tier,
          health_score: payload.healthScore,
        })
        .eq("id", id)
        .select("id")
        .maybeSingle();
      if (error) throw error;
      if (!data) return { status: "error", message: "Customer not found." };
    } else {
      const [row] = await db
        .update(customers)
        .set({
          name: payload.name,
          contactEmail: payload.contactEmail,
          primaryContact: payload.primaryContact,
          location: payload.location,
          tier: payload.tier,
          healthScore: payload.healthScore,
        })
        .where(eq(customers.id, id))
        .returning({ id: customers.id });
      if (!row) return { status: "error", message: "Customer not found." };
    }

    revalidateCustomerPaths();
    return { status: "success", id };
  } catch (err) {
    console.error("updateCustomer failed", err);
    return { status: "error", message: "Could not update customer. Please try again." };
  }
}

export async function deleteCustomer(id: string): Promise<CustomerActionState> {
  const auth = await requireAuth();
  if (!auth.ok) return { status: "error", message: auth.error };
  if (!id.trim()) return { status: "error", message: "Customer id is required." };

  try {
    if (!hasDatabaseUrl || !db) {
      if (!supabase) throw new Error("Database unavailable");
      const { error } = await supabase.from("customer").delete().eq("id", id);
      if (error) throw error;
    } else {
      await db.delete(customers).where(eq(customers.id, id));
    }

    revalidateCustomerPaths();
    return { status: "success", id };
  } catch (err) {
    console.error("deleteCustomer failed", err);
    return { status: "error", message: "Could not delete customer. Please try again." };
  }
}
