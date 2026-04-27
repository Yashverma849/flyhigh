"use server";

import { headers } from "next/headers";
import { db, isDbConfigured } from "@/server/db/client";
import { contactSubmissions } from "@/server/db/schema";
import { ContactSchema } from "@/lib/validations";
import { consumePublicLimit } from "@/server/ratelimit";
import type { ActionState } from "./quote";

async function clientIdentifier() {
  const h = await headers();
  return (
    h.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    h.get("x-real-ip") ??
    "anonymous"
  );
}

export async function submitContact(
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const ip = await clientIdentifier();
  const rl = await consumePublicLimit(`contact:${ip}`);
  if (!rl.success) {
    return { status: "error", message: "Too many requests. Try again in a few minutes." };
  }

  const parsed = ContactSchema.safeParse(Object.fromEntries(formData));
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
        "Contact submissions are temporarily unavailable. Please email flyhighfreightservices@gmail.com directly.",
    };
  }

  try {
    const [row] = await db
      .insert(contactSubmissions)
      .values({
        name: parsed.data.name,
        email: parsed.data.email,
        message: parsed.data.message,
      })
      .returning({ id: contactSubmissions.id });

    if (!row) throw new Error("Insert returned no row");
    return { status: "success", id: row.id };
  } catch (err) {
    console.error("submitContact failed", err);
    return {
      status: "error",
      message: "We couldn't record your message. Please try again.",
    };
  }
}
