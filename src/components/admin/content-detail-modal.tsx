"use client";

import type { Route } from "next";
import Link from "next/link";
import { ShipmentModalShell } from "@/components/admin/shipment-modal-shell";

type Detail = {
  title: string;
  eyebrow: string;
  fields: Array<{ label: string; value: string }>;
  previewHref?: string;
  imageUrl?: string;
};

type Props = {
  detail: Detail | null;
  onClose: () => void;
};

export function ContentDetailModal({ detail, onClose }: Props) {
  if (!detail) return null;

  return (
    <ShipmentModalShell
      open
      onClose={onClose}
      eyebrow={detail.eyebrow}
      title={detail.title}
      titleId="content-detail-title"
    >
      <div className="modal-scroll flex-1 overflow-y-auto px-6 py-6 md:px-8">
        {detail.imageUrl && (
          <div
            className="mb-6 aspect-[16/9] rounded-md border bg-cover bg-center"
            style={{
              borderColor: "var(--line)",
              backgroundImage: `url(${detail.imageUrl})`,
            }}
          />
        )}

        <div className="space-y-4">
          {detail.fields.map((field) => (
            <div key={field.label}>
              <div className="caption mb-1.5" style={{ color: "var(--brass)" }}>
                {field.label}
              </div>
              <div className="text-sm leading-relaxed" style={{ color: "var(--ash)" }}>
                {field.value}
              </div>
            </div>
          ))}
        </div>

        <p className="caption mt-6" style={{ color: "var(--ash)" }}>
          Marketing pages, case studies, and media assets are catalogued here. Insight posts can
          be fully edited from the Insights posts tab.
        </p>

        <div
          className="mt-8 flex items-center justify-end gap-3 border-t pt-6"
          style={{ borderColor: "var(--line)" }}
        >
          <button type="button" className="btn-ghost text-sm" onClick={onClose}>
            Close
          </button>
          {detail.previewHref && (
            <Link href={detail.previewHref as Route} target="_blank" className="btn-primary text-sm">
              Open live page
            </Link>
          )}
        </div>
      </div>
    </ShipmentModalShell>
  );
}
