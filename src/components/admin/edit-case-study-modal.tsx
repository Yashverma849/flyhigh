"use client";

import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { updateCaseStudy, type CaseStudyActionState } from "@/server/actions/case-studies";
import { CaseStudyFormFields } from "@/components/admin/case-study-form-fields";
import { ShipmentModalShell } from "@/components/admin/shipment-modal-shell";
import type { DbCaseStudy } from "@/server/db/schema";

type Props = {
  study: DbCaseStudy | null;
  onClose: () => void;
};

const initial: CaseStudyActionState = { status: "idle" };

export function EditCaseStudyModal({ study, onClose }: Props) {
  const router = useRouter();
  const [state, formAction, pending] = useActionState(updateCaseStudy, initial);
  const open = study != null;

  useEffect(() => {
    if (state.status === "success") {
      onClose();
      router.refresh();
    }
  }, [state.status, onClose, router]);

  if (!study) return null;

  const fieldErrors = state.status === "error" ? state.fieldErrors : undefined;

  let metricsJson = "";
  try {
    metricsJson = JSON.stringify(study.metrics, null, 2);
  } catch (err) {
    metricsJson = "[]";
  }

  return (
    <ShipmentModalShell
      open={open}
      onClose={onClose}
      eyebrow="EDIT CASE STUDY"
      title={study.title}
      titleId="edit-case-study-title"
    >
      <form
        action={formAction}
        className="modal-scroll flex-1 overflow-y-auto px-6 py-6 md:px-8"
      >
        <input type="hidden" name="id" value={study.id} />

        {state.status === "error" && state.message && (
          <p
            className="caption mb-6 rounded-md border px-4 py-3"
            style={{ borderColor: "var(--rust)", color: "var(--rust)" }}
          >
            {state.message}
          </p>
        )}

        <CaseStudyFormFields
          fieldErrors={fieldErrors}
          defaults={{
            title: study.title,
            slug: study.slug,
            client: study.client,
            industry: study.industry,
            industrySlug: study.industrySlug,
            serviceSlug: study.serviceSlug,
            region: study.region,
            challenge: study.challenge,
            approach: study.approach,
            outcome: study.outcome,
            metricsJson,
            date: study.date,
            read: study.read,
            image: study.image,
            excerpt: study.excerpt,
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
