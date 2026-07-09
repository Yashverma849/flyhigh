"use client";

import { useState } from "react";
import { Mail, Phone } from "lucide-react";
import { QuoteStatusPill } from "@/components/admin/quote-status-pill";
import {
  DetailModal,
  DetailRow,
  formatMode,
} from "@/components/admin/inquiries/inquiry-shared";
import type { Quote } from "@/server/db/schema";
import { formatDate } from "@/lib/utils";

type Props = {
  quotes: Quote[];
};

export function QuotationRequestsPageClient({ quotes }: Props) {
  const [selectedQuote, setSelectedQuote] = useState<Quote | null>(null);

  return (
    <>
      <section
        className="overflow-hidden rounded-md border"
        style={{ borderColor: "var(--line)", background: "var(--ink-2)" }}
      >
        <div
          className="flex items-center justify-between gap-4 border-b p-6"
          style={{ borderColor: "var(--line)" }}
        >
          <div>
            <div className="caption" style={{ color: "var(--ash)" }}>
              QUOTE REQUESTS
            </div>
            <h2 className="f-display mt-1 text-2xl">Quotation requests</h2>
          </div>
          <span className="caption" style={{ color: "var(--brass)" }}>
            {quotes.length} total
          </span>
        </div>

        {quotes.length === 0 ? (
          <div className="caption p-10 text-center" style={{ color: "var(--ash)" }}>
            No quote requests yet.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-[56rem] w-full text-left text-sm">
              <thead>
                <tr
                  className="caption border-b"
                  style={{ borderColor: "var(--line)", color: "var(--brass)" }}
                >
                  <th className="px-4 py-3 font-semibold">CONTACT</th>
                  <th className="px-4 py-3 font-semibold">ROUTE</th>
                  <th className="px-4 py-3 font-semibold">MODE</th>
                  <th className="px-4 py-3 font-semibold">COMPANY</th>
                  <th className="px-4 py-3 font-semibold">STATUS</th>
                  <th className="px-4 py-3 font-semibold">RECEIVED</th>
                </tr>
              </thead>
              <tbody className="divide-y" style={{ borderColor: "var(--line)" }}>
                {quotes.map((q) => (
                  <tr
                    key={q.id}
                    className="cursor-pointer transition-colors hover:bg-[var(--surface-tint-2)]"
                    onClick={() => setSelectedQuote(q)}
                  >
                    <td className="px-4 py-3">
                      <div className="font-medium">{q.contactName}</div>
                      <div className="caption mt-0.5" style={{ color: "var(--ash)" }}>
                        {q.email}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      {q.origin} → {q.destination}
                    </td>
                    <td className="px-4 py-3 capitalize">{formatMode(q.mode)}</td>
                    <td className="px-4 py-3">{q.company ?? "—"}</td>
                    <td className="px-4 py-3">
                      <QuoteStatusPill status={q.status} />
                    </td>
                    <td className="f-mono px-4 py-3 text-xs tabular-nums">
                      {formatDate(q.createdAt)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {selectedQuote && (
        <DetailModal title="Quote request" onClose={() => setSelectedQuote(null)}>
          <DetailRow label="Contact">{selectedQuote.contactName}</DetailRow>
          <DetailRow label="Email">
            <a href={`mailto:${selectedQuote.email}`} className="u-link inline-flex items-center gap-1">
              <Mail size={12} /> {selectedQuote.email}
            </a>
          </DetailRow>
          {selectedQuote.phone && (
            <DetailRow label="Phone">
              <a href={`tel:${selectedQuote.phone}`} className="u-link inline-flex items-center gap-1">
                <Phone size={12} /> {selectedQuote.phone}
              </a>
            </DetailRow>
          )}
          <DetailRow label="Company">{selectedQuote.company ?? "—"}</DetailRow>
          <DetailRow label="Route">
            {selectedQuote.origin} → {selectedQuote.destination}
          </DetailRow>
          <DetailRow label="Mode">{formatMode(selectedQuote.mode)}</DetailRow>
          <DetailRow label="Weight">
            {selectedQuote.weightKg != null ? `${selectedQuote.weightKg} kg` : "—"}
          </DetailRow>
          <DetailRow label="Volume">
            {selectedQuote.volumeCbm != null ? `${selectedQuote.volumeCbm} CBM` : "—"}
          </DetailRow>
          <DetailRow label="Incoterm">{selectedQuote.incoterm ?? "—"}</DetailRow>
          <DetailRow label="Status">
            <QuoteStatusPill status={selectedQuote.status} />
          </DetailRow>
          <DetailRow label="Received">{formatDate(selectedQuote.createdAt)}</DetailRow>
          {selectedQuote.notes && (
            <DetailRow label="Notes">
              <p className="whitespace-pre-wrap text-sm leading-relaxed">{selectedQuote.notes}</p>
            </DetailRow>
          )}
        </DetailModal>
      )}
    </>
  );
}
