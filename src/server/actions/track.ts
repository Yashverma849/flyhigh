"use server";

import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { TrackSchema } from "@/lib/validations";
import { consumePublicLimit } from "@/server/ratelimit";

async function clientIdentifier() {
  const h = await headers();
  return h.get("x-forwarded-for")?.split(",")[0]?.trim() ?? h.get("x-real-ip") ?? "anonymous";
}

export async function trackShipment(_prev: unknown, formData: FormData) {
  const ip = await clientIdentifier();
  const rl = await consumePublicLimit(`track:${ip}`);
  if (!rl.success) {
    return { error: "Too many lookups. Try again in a few minutes." };
  }

  const parsed = TrackSchema.safeParse({ id: formData.get("id") });
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid tracking ID" };
  }

  redirect(`/track/${parsed.data.id.toUpperCase()}`);
}
