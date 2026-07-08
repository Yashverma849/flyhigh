import "server-only";
import { desc, like } from "drizzle-orm";
import { db, hasDatabaseUrl, supabase } from "@/server/db/client";
import { shipments } from "@/server/db/schema";
import {
  formatShipmentId,
  parseShipmentSequence,
  shipmentIdPrefix,
} from "@/lib/shipment-id";

export async function getNextShipmentId() {
  const prefix = shipmentIdPrefix();

  if (!hasDatabaseUrl || !db) {
    if (!supabase) throw new Error("Database unavailable");
    const { data, error } = await supabase
      .from("shipment")
      .select("id")
      .like("id", `${prefix}%`)
      .order("id", { ascending: false })
      .limit(1);
    if (error) throw error;
    const last = data?.[0]?.id ? parseShipmentSequence(data[0].id, prefix) : 0;
    return formatShipmentId(prefix, last + 1);
  }

  const [latest] = await db
    .select({ id: shipments.id })
    .from(shipments)
    .where(like(shipments.id, `${prefix}%`))
    .orderBy(desc(shipments.id))
    .limit(1);

  const last = latest?.id ? parseShipmentSequence(latest.id, prefix) : 0;
  return formatShipmentId(prefix, last + 1);
}
