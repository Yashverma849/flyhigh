"use client";

import { useActionState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { createCustomer, type CustomerActionState } from "@/server/actions/customers";
import { CustomerFormFields } from "@/components/admin/customer-form-fields";
import { ShipmentModalShell } from "@/components/admin/shipment-modal-shell";

type Props = {
  open: boolean;
  onClose: () => void;
};

const initial: CustomerActionState = { status: "idle" };

export function NewCustomerModal({ open, onClose }: Props) {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);
  const [state, formAction, pending] = useActionState(createCustomer, initial);

  useEffect(() => {
    if (state.status === "success") {
      formRef.current?.reset();
      onClose();
      router.refresh();
    }
  }, [state.status, onClose, router]);

  const fieldErrors = state.status === "error" ? state.fieldErrors : undefined;

  return (
    <ShipmentModalShell
      open={open}
      onClose={onClose}
      eyebrow="NEW ACCOUNT"
      title="Add customer"
      titleId="new-customer-title"
    >
      <form
        ref={formRef}
        action={formAction}
        className="modal-scroll flex-1 overflow-y-auto px-6 py-6 md:px-8"
      >
        {state.status === "error" && state.message && (
          <p
            className="caption mb-6 rounded-md border px-4 py-3"
            style={{ borderColor: "var(--rust)", color: "var(--rust)" }}
          >
            {state.message}
          </p>
        )}

        <CustomerFormFields fieldErrors={fieldErrors} />

        <div
          className="mt-8 flex items-center justify-end gap-3 border-t pt-6"
          style={{ borderColor: "var(--line)" }}
        >
          <button type="button" className="btn-ghost text-sm" onClick={onClose}>
            Cancel
          </button>
          <button type="submit" className="btn-primary text-sm" disabled={pending}>
            {pending ? "Adding…" : "Add customer"}
          </button>
        </div>
      </form>
    </ShipmentModalShell>
  );
}
