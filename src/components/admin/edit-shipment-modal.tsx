"use client";

import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { updateShipment, type ShipmentActionState } from "@/server/actions/shipments";
import { ShipmentFormFields } from "@/components/admin/shipment-form-fields";
import { ShipmentModalShell } from "@/components/admin/shipment-modal-shell";
import type { Shipment } from "@/server/db/schema";

type Props = {
  shipment: Shipment | null;
  onClose: () => void;
};

const initial: ShipmentActionState = { status: "idle" };

export function EditShipmentModal({ shipment, onClose }: Props) {
  const router = useRouter();
  const [state, formAction, pending] = useActionState(updateShipment, initial);
  const open = shipment != null;

  useEffect(() => {
    if (state.status === "success") {
      onClose();
      router.refresh();
    }
  }, [state.status, onClose, router]);

  if (!shipment) return null;

  const fieldErrors = state.status === "error" ? state.fieldErrors : undefined;

  return (
    <ShipmentModalShell
      open={open}
      onClose={onClose}
      eyebrow="EDIT BOOKING"
      title={shipment.id}
      titleId="edit-shipment-title"
    >
      <form
        key={shipment.id}
        action={formAction}
        className="modal-scroll flex-1 overflow-y-auto px-6 py-6 md:px-8"
      >
        <input type="hidden" name="id" value={shipment.id} />

        {state.status === "error" && state.message && (
          <p
            className="caption mb-6 rounded-md border px-4 py-3"
            style={{ borderColor: "var(--rust)", color: "var(--rust)" }}
          >
            {state.message}
          </p>
        )}

        <ShipmentFormFields
          fieldErrors={fieldErrors}
          showReference
          defaults={{
            id: shipment.id,
            customerName: shipment.customerName,
            origin: shipment.origin,
            destination: shipment.destination,
            mode: shipment.mode,
            status: shipment.status,
            eta: shipment.eta,
            valueInr: shipment.valueInr,
            promisedAt: shipment.promisedAt,
          }}
        />

        <div
          className="mt-8 flex items-center justify-end gap-3 border-t pt-6"
          style={{ borderColor: "var(--line)" }}
        >
          <button type="button" className="btn-ghost text-sm" onClick={onClose}>
            Cancel
          </button>
          <button type="submit" className="btn-primary text-sm" disabled={pending}>
            {pending ? "Saving…" : "Save changes"}
          </button>
        </div>
      </form>
    </ShipmentModalShell>
  );
}
