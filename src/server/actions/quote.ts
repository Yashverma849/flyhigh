"use server";

import { headers } from "next/headers";
import { db, hasDatabaseUrl, isDbConfigured, supabase } from "@/server/db/client";
import { quotes } from "@/server/db/schema";
import { QuoteSchema } from "@/lib/validations";
import { consumePublicLimit } from "@/server/ratelimit";

export type ActionState =
  | { status: "idle" }
  | { status: "success"; id: string }
  | { status: "error"; message: string; fieldErrors?: Record<string, string[]> };

async function clientIdentifier() {
  const h = await headers();
  return h.get("x-forwarded-for")?.split(",")[0]?.trim() ?? h.get("x-real-ip") ?? "anonymous";
}

export async function createQuote(_prev: ActionState, formData: FormData): Promise<ActionState> {
  const ip = await clientIdentifier();
  const rl = await consumePublicLimit(`quote:${ip}`);
  if (!rl.success) {
    return { status: "error", message: "Too many requests. Try again in a few minutes." };
  }

  const parsed = QuoteSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) {
    return {
      status: "error",
      message: "Please check the form for errors.",
      fieldErrors: parsed.error.flatten().fieldErrors,
    };
  }

  if (!isDbConfigured) {
    return {
      status: "error",
      message:
        "Quote requests are temporarily unavailable. Please email flyhighfreightservices@gmail.com directly.",
    };
  }

  try {
    if (!hasDatabaseUrl || !db) {
      if (!supabase) throw new Error("Database unavailable");
      const { data, error } = await supabase
        .from("quote")
        .insert({
          contact_name: parsed.data.contactName,
          email: parsed.data.email,
          phone: parsed.data.phone || null,
          company: parsed.data.company || null,
          mode: parsed.data.mode,
          origin: parsed.data.origin,
          destination: parsed.data.destination,
          weight_kg: parsed.data.weightKg ?? null,
          volume_cbm: parsed.data.volumeCbm ?? null,
          incoterm: parsed.data.incoterm || null,
          notes: parsed.data.notes || null,
        })
        .select("id")
        .single();
      if (error) throw error;
      if (!data) throw new Error("Insert returned no row");
      return { status: "success", id: data.id };
    }

    const [row] = await db
      .insert(quotes)
      .values({
        contactName: parsed.data.contactName,
        email: parsed.data.email,
        phone: parsed.data.phone || null,
        company: parsed.data.company || null,
        mode: parsed.data.mode,
        origin: parsed.data.origin,
        destination: parsed.data.destination,
        weightKg: parsed.data.weightKg ?? null,
        volumeCbm: parsed.data.volumeCbm ?? null,
        incoterm: parsed.data.incoterm ?? null,
        notes: parsed.data.notes || null,
      })
      .returning({ id: quotes.id });

    if (!row) throw new Error("Insert returned no row");
    return { status: "success", id: row.id };
  } catch (err) {
    console.error("createQuote failed", err);
    return {
      status: "error",
      message:
        "We couldn't record your request. Please email flyhighfreightservices@gmail.com directly while we look at this.",
    };
  }
}
