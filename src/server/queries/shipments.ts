import "server-only";
import { eq, desc } from "drizzle-orm";
import { db, hasDatabaseUrl, isDbConfigured } from "@/server/db/client";
import {
  supabaseGetRecentShipments,
  supabaseGetShipmentById,
  supabaseGetShipmentEvents,
} from "@/server/db/supabase-data";
import { shipmentEvents, shipments } from "@/server/db/schema";

export async function getShipmentById(id: string) {
  if (!isDbConfigured) return null;
  if (!hasDatabaseUrl || !db) return supabaseGetShipmentById(id);
  const result = await db.select().from(shipments).where(eq(shipments.id, id)).limit(1);
  return result[0] ?? null;
}

export async function getShipmentEvents(shipmentId: string) {
  if (!isDbConfigured) return [];
  if (!hasDatabaseUrl || !db) return supabaseGetShipmentEvents(shipmentId);
  return db
    .select()
    .from(shipmentEvents)
    .where(eq(shipmentEvents.shipmentId, shipmentId))
    .orderBy(desc(shipmentEvents.occurredAt));
}

export async function getRecentShipments(limit = 25) {
  if (!isDbConfigured) return [];
  if (!hasDatabaseUrl || !db) return supabaseGetRecentShipments(limit);
  return db.select().from(shipments).orderBy(desc(shipments.createdAt)).limit(limit);
}
