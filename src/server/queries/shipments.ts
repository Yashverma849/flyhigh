import "server-only";
import { eq, desc } from "drizzle-orm";
import { db } from "@/server/db/client";
import { shipmentEvents, shipments } from "@/server/db/schema";

export async function getShipmentById(id: string) {
  const result = await db
    .select()
    .from(shipments)
    .where(eq(shipments.id, id))
    .limit(1);
  return result[0] ?? null;
}

export async function getShipmentEvents(shipmentId: string) {
  return db
    .select()
    .from(shipmentEvents)
    .where(eq(shipmentEvents.shipmentId, shipmentId))
    .orderBy(desc(shipmentEvents.occurredAt));
}

export async function getRecentShipments(limit = 25) {
  return db.select().from(shipments).orderBy(desc(shipments.createdAt)).limit(limit);
}
