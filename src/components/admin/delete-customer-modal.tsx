"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";
import { deleteCustomer } from "@/server/actions/customers";
import { ShipmentModalShell } from "@/components/admin/shipment-modal-shell";
import type { CustomerRow } from "@/server/queries/dashboard";

type Props = {
  customer: CustomerRow | null;
  onClose: () => void;
};

export function DeleteCustomerModal({ customer, onClose }: Props) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();
  const open = customer != null;

  if (!customer) return null;

  function handleDelete() {
    setError(null);
    startTransition(async () => {
      const result = await deleteCustomer(customer!.id);
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
      eyebrow="DELETE ACCOUNT"
      title="Remove customer?"
      titleId="delete-customer-title"
    >
      <div className="px-6 py-6 md:px-8">
        <p className="text-sm leading-relaxed" style={{ color: "var(--ash)" }}>
          This permanently removes{" "}
          <span style={{ color: "var(--bone)" }}>{customer.name}</span>. Linked shipments
          will keep their customer name but lose the account link.
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
            {pending ? "Deleting…" : "Delete customer"}
          </button>
        </div>
      </div>
    </ShipmentModalShell>
  );
}
