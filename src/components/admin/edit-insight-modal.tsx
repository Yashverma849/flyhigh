"use client";

import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { updateInsight, type InsightActionState } from "@/server/actions/insights";
import { InsightFormFields } from "@/components/admin/insight-form-fields";
import { ShipmentModalShell } from "@/components/admin/shipment-modal-shell";
import type { InsightRow } from "@/server/db/schema";

type Props = {
  post: InsightRow | null;
  onClose: () => void;
};

const initial: InsightActionState = { status: "idle" };

export function EditInsightModal({ post, onClose }: Props) {
  const router = useRouter();
  const [state, formAction, pending] = useActionState(updateInsight, initial);
  const open = post != null;

  useEffect(() => {
    if (state.status === "success") {
      onClose();
      router.refresh();
    }
  }, [state.status, onClose, router]);

  if (!post) return null;

  const fieldErrors = state.status === "error" ? state.fieldErrors : undefined;

  return (
    <ShipmentModalShell
      open={open}
      onClose={onClose}
      eyebrow="EDIT POST"
      title={post.title}
      titleId="edit-insight-title"
    >
      <form
        key={post.id}
        action={formAction}
        className="modal-scroll flex-1 overflow-y-auto px-6 py-6 md:px-8"
      >
        <input type="hidden" name="id" value={post.id} />

        {state.status === "error" && state.message && (
          <p
            className="caption mb-6 rounded-md border px-4 py-3"
            style={{ borderColor: "var(--rust)", color: "var(--rust)" }}
          >
            {state.message}
          </p>
        )}

        <InsightFormFields
          fieldErrors={fieldErrors}
          defaults={{
            title: post.title,
            slug: post.slug,
            excerpt: post.excerpt,
            bodyMd: post.bodyMd,
            category: post.category,
            heroImage: post.heroImage,
            readMinutes: post.readMinutes,
            publishedAt: post.publishedAt,
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
