import type { Metadata } from "next";
import { ShipmentsPageClient } from "@/components/admin/shipments-page-client";
import { getRecentShipments } from "@/server/queries/shipments";

export const metadata: Metadata = { title: "Shipments" };

export default async function AdminShipmentsPage() {
  let shipments: Awaited<ReturnType<typeof getRecentShipments>> = [];
  try {
    shipments = await getRecentShipments(200);
  } catch {
    shipments = [];
  }

  return (
    <div>
      <ShipmentsPageClient shipments={shipments} />
    </div>
  );
}
