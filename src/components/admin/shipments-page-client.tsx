"use client";

import { useEffect, useState } from "react";
import { Download, Plus } from "lucide-react";
import { ShipmentsTable } from "@/components/admin/tables/shipments-table";
import { NewShipmentModal } from "@/components/admin/new-shipment-modal";
import { EditShipmentModal } from "@/components/admin/edit-shipment-modal";
import { DeleteShipmentModal } from "@/components/admin/delete-shipment-modal";
import { exportShipmentsCsv } from "@/lib/export-csv";
import type { Shipment } from "@/server/db/schema";

type Props = {
  shipments: Shipment[];
};

export function ShipmentsPageClient({ shipments }: Props) {
  const [createOpen, setCreateOpen] = useState(false);
  const [editing, setEditing] = useState<Shipment | null>(null);
  const [deleting, setDeleting] = useState<Shipment | null>(null);
  const [exportRows, setExportRows] = useState(shipments);

  useEffect(() => {
    setExportRows(shipments);
  }, [shipments]);

  function handleExport() {
    if (exportRows.length === 0) return;
    exportShipmentsCsv(exportRows);
  }

  return (
    <>
      <div className="mb-8 flex items-end justify-between">
        <div>
          <h1 className="f-display text-4xl">Shipments</h1>
          <p className="mt-2 text-sm" style={{ color: "var(--ash)" }}>
            {shipments.length} loaded · live ledger updates as bookings come in
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            className="btn-ghost flex items-center gap-2 text-sm"
            onClick={handleExport}
            disabled={exportRows.length === 0}
          >
            <Download size={13} /> Export CSV
          </button>
          <button
            type="button"
            className="btn-primary flex items-center gap-2 text-sm"
            onClick={() => setCreateOpen(true)}
          >
            New shipment <Plus size={14} />
          </button>
        </div>
      </div>

      <ShipmentsTable
        shipments={shipments}
        onEdit={setEditing}
        onDelete={setDeleting}
        onFilteredChange={setExportRows}
      />

      <NewShipmentModal open={createOpen} onClose={() => setCreateOpen(false)} />
      <EditShipmentModal shipment={editing} onClose={() => setEditing(null)} />
      <DeleteShipmentModal shipment={deleting} onClose={() => setDeleting(null)} />
    </>
  );
}
