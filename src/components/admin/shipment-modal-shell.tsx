"use client";

import { useEffect } from "react";
import { X } from "lucide-react";

type Props = {
  open: boolean;
  onClose: () => void;
  title: string;
  eyebrow: string;
  titleId: string;
  footerNote?: string;
  children: React.ReactNode;
};

export function ShipmentModalShell({
  open,
  onClose,
  title,
  eyebrow,
  titleId,
  footerNote,
  children,
}: Props) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="modal-backdrop fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
    >
      <div
        className="modal-surface relative flex max-h-[92vh] w-full max-w-xl flex-col overflow-hidden rounded-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className="flex shrink-0 items-center justify-between gap-4 px-6 py-5 md:px-8"
          style={{ borderBottom: "1px solid var(--line)", background: "var(--ink)" }}
        >
          <div>
            <div className="caption" style={{ color: "var(--ash)" }}>
              {eyebrow}
            </div>
            <h2 id={titleId} className="f-display mt-1 text-2xl">
              {title}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="rounded-full p-2.5 transition-colors hover:bg-[var(--surface-tint-6)]"
            style={{ border: "1px solid var(--line)" }}
          >
            <X size={18} strokeWidth={1.5} />
          </button>
        </div>
        {children}
        {footerNote && (
          <p
            className="caption shrink-0 px-6 pb-4 md:px-8"
            style={{ color: "var(--ash)" }}
          >
            {footerNote}
          </p>
        )}
      </div>
    </div>
  );
}
