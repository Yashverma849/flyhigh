"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";
import { deleteShipment } from "@/server/actions/shipments";
import { ShipmentModalShell } from "@/components/admin/shipment-modal-shell";
import type { Shipment } from "@/server/db/schema";

type Props = {
  shipment: Shipment | null;
  onClose: () => void;
};

export function DeleteShipmentModal({ shipment, onClose }: Props) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();
  const open = shipment != null;

  if (!shipment) return null;

  function handleDelete() {
    setError(null);
    startTransition(async () => {
      const result = await deleteShipment(shipment!.id);
      if (result.status === "success") {
        onClose();
        router.refresh();
        return;
      }
      if (result.status === "error") setError(result.message);
    });
  }

  return (
    <ShipmentModalShell
      open={open}
      onClose={onClose}
      eyebrow="DELETE BOOKING"
      title="Remove shipment?"
      titleId="delete-shipment-title"
    >
      <div className="px-6 py-6 md:px-8">
        <p className="text-sm leading-relaxed" style={{ color: "var(--ash)" }}>
          This permanently removes{" "}
          <span className="f-mono" style={{ color: "var(--cargo)" }}>
            {shipment.id}
          </span>{" "}
          and its timeline events. This cannot be undone.
        </p>

        {error && (
          <p
            className="caption mt-4 rounded-md border px-4 py-3"
            style={{ borderColor: "var(--rust)", color: "var(--rust)" }}
          >
            {error}
          </p>
        )}

        <div
          className="mt-8 flex items-center justify-end gap-3 border-t pt-6"
          style={{ borderColor: "var(--line)" }}
        >
          <button type="button" className="btn-ghost text-sm" onClick={onClose} disabled={pending}>
            Cancel
          </button>
          <button
            type="button"
            className="flex items-center gap-2 text-sm"
            style={{
              color: "var(--rust)",
              border: "1px solid var(--rust)",
              padding: "13px 21px",
              borderRadius: 999,
            }}
            onClick={handleDelete}
            disabled={pending}
          >
            <Trash2 size={14} />
            {pending ? "Deleting…" : "Delete shipment"}
          </button>
        </div>
      </div>
    </ShipmentModalShell>
  );
}
