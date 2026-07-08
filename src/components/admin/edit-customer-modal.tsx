"use client";

import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { updateCustomer, type CustomerActionState } from "@/server/actions/customers";
import { CustomerFormFields } from "@/components/admin/customer-form-fields";
import { ShipmentModalShell } from "@/components/admin/shipment-modal-shell";
import type { CustomerRow } from "@/server/queries/dashboard";

type Props = {
  customer: CustomerRow | null;
  onClose: () => void;
};

const initial: CustomerActionState = { status: "idle" };

export function EditCustomerModal({ customer, onClose }: Props) {
  const router = useRouter();
  const [state, formAction, pending] = useActionState(updateCustomer, initial);
  const open = customer != null;

  useEffect(() => {
    if (state.status === "success") {
      onClose();
      router.refresh();
    }
  }, [state.status, onClose, router]);

  if (!customer) return null;

  const fieldErrors = state.status === "error" ? state.fieldErrors : undefined;

  return (
    <ShipmentModalShell
      open={open}
      onClose={onClose}
      eyebrow="EDIT ACCOUNT"
      title={customer.name}
      titleId="edit-customer-title"
    >
      <form
        key={customer.id}
        action={formAction}
        className="modal-scroll flex-1 overflow-y-auto px-6 py-6 md:px-8"
      >
        <input type="hidden" name="id" value={customer.id} />

        {state.status === "error" && state.message && (
          <p
            className="caption mb-6 rounded-md border px-4 py-3"
            style={{ borderColor: "var(--rust)", color: "var(--rust)" }}
          >
            {state.message}
          </p>
        )}

        <CustomerFormFields
          fieldErrors={fieldErrors}
          defaults={{
            name: customer.name,
            contactEmail: customer.contactEmail,
            primaryContact: customer.contact,
            location: customer.location,
            tier: customer.tier,
            health: customer.health,
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
