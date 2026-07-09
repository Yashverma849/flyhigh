"use client";

import { useActionState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { createCaseStudy, type CaseStudyActionState } from "@/server/actions/case-studies";
import { CaseStudyFormFields } from "@/components/admin/case-study-form-fields";
import { ShipmentModalShell } from "@/components/admin/shipment-modal-shell";

type Props = {
  open: boolean;
  onClose: () => void;
};

const initial: CaseStudyActionState = { status: "idle" };

export function NewCaseStudyModal({ open, onClose }: Props) {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);
  const [state, formAction, pending] = useActionState(createCaseStudy, initial);

  useEffect(() => {
    if (state.status === "success") {
      formRef.current?.reset();
      onClose();
      router.refresh();
    }
  }, [state.status, onClose, router]);

  const fieldErrors = state.status === "error" ? state.fieldErrors : undefined;
  const fieldErrorList =
    fieldErrors &&
    Object.entries(fieldErrors).flatMap(([field, messages]) =>
      (messages ?? []).map((message) => ({ field, message })),
    );

  return (
    <ShipmentModalShell
      open={open}
      onClose={onClose}
      eyebrow="NEW POST"
      title="Create case study"
      titleId="new-case-study-title"
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

        {fieldErrorList && fieldErrorList.length > 0 && (
          <ul
            className="caption mb-6 list-disc space-y-1 rounded-md border px-4 py-3 pl-8"
            style={{ borderColor: "var(--rust)", color: "var(--rust)" }}
          >
            {fieldErrorList.map(({ field, message }) => (
              <li key={`${field}-${message}`}>
                <span className="f-mono">{field}</span>: {message}
              </li>
            ))}
          </ul>
        )}

        <CaseStudyFormFields fieldErrors={fieldErrors} />

        <div
          className="mt-8 flex items-center justify-end gap-3 border-t pt-6"
          style={{ borderColor: "var(--line)" }}
        >
          <button type="button" className="btn-ghost text-sm" onClick={onClose}>
            Cancel
          </button>
          <button type="submit" className="btn-primary text-sm" disabled={pending}>
            {pending ? "Creating…" : "Create case study"}
          </button>
        </div>
      </form>
    </ShipmentModalShell>
  );
}
