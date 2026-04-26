import type { Metadata } from "next";
import { Download, Plus } from "lucide-react";
import { ShipmentsTable } from "@/components/admin/tables/shipments-table";
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
      <div className="mb-8 flex items-end justify-between">
        <div>
          <div className="caption mb-2" style={{ color: "var(--cargo)" }}>
            01 · LEDGER
          </div>
          <h1 className="f-display text-4xl">Shipments</h1>
          <p className="mt-2 text-sm" style={{ color: "var(--ash)" }}>
            {shipments.length} loaded · live ledger updates as bookings come in
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button type="button" className="btn-ghost flex items-center gap-2 text-sm">
            <Download size={13} /> Export CSV
          </button>
          <button type="button" className="btn-primary text-sm">
            New shipment <Plus size={14} />
          </button>
        </div>
      </div>

      <ShipmentsTable shipments={shipments} />
    </div>
  );
}
