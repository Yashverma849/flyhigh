"use client";

import { MessageSquare, X } from "lucide-react";
import type { Quote } from "@/server/db/schema";

export function formatMode(mode: Quote["mode"]) {
  return mode.charAt(0).toUpperCase() + mode.slice(1);
}

export function preview(text: string, max = 72) {
  const trimmed = text.replace(/\s+/g, " ").trim();
  if (trimmed.length <= max) return trimmed;
  return `${trimmed.slice(0, max)}…`;
}

export function DetailModal({
  title,
  onClose,
  children,
}: {
  title: string;
  onClose: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <button
        type="button"
        className="absolute inset-0 bg-black/60"
        aria-label="Close"
        onClick={onClose}
      />
      <div
        className="relative z-10 max-h-[85vh] w-full max-w-lg overflow-y-auto rounded-2xl border p-6 shadow-2xl"
        style={{ borderColor: "var(--line)", background: "var(--ink-2)" }}
      >
        <div className="mb-6 flex items-start justify-between gap-4">
          <div className="flex items-center gap-2">
            <MessageSquare size={18} style={{ color: "var(--cargo)" }} />
            <h3 className="f-display text-xl">{title}</h3>
          </div>
          <button type="button" onClick={onClose} className="opacity-60 hover:opacity-100">
            <X size={18} />
          </button>
        </div>
        <div className="space-y-4">{children}</div>
      </div>
    </div>
  );
}

export function DetailRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="caption mb-1" style={{ color: "var(--brass)" }}>
        {label}
      </div>
      <div className="text-sm">{children}</div>
    </div>
  );
}
