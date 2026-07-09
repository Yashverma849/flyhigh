"use client";

import { useState } from "react";
import { Mail } from "lucide-react";
import {
  DetailModal,
  DetailRow,
  preview,
} from "@/components/admin/inquiries/inquiry-shared";
import type { ContactSubmission } from "@/server/db/schema";
import { formatDate } from "@/lib/utils";

type Props = {
  contacts: ContactSubmission[];
};

export function ContactRequestsPageClient({ contacts }: Props) {
  const [selectedContact, setSelectedContact] = useState<ContactSubmission | null>(null);

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
              CONTACT
            </div>
            <h2 className="f-display mt-1 text-2xl">Contact requests</h2>
          </div>
          <span className="caption" style={{ color: "var(--brass)" }}>
            {contacts.length} total
          </span>
        </div>

        {contacts.length === 0 ? (
          <div className="caption p-10 text-center" style={{ color: "var(--ash)" }}>
            No contact messages yet.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-[48rem] w-full text-left text-sm">
              <thead>
                <tr
                  className="caption border-b"
                  style={{ borderColor: "var(--line)", color: "var(--brass)" }}
                >
                  <th className="px-4 py-3 font-semibold">NAME</th>
                  <th className="px-4 py-3 font-semibold">EMAIL</th>
                  <th className="px-4 py-3 font-semibold">MESSAGE</th>
                  <th className="px-4 py-3 font-semibold">RECEIVED</th>
                </tr>
              </thead>
              <tbody className="divide-y" style={{ borderColor: "var(--line)" }}>
                {contacts.map((c) => (
                  <tr
                    key={c.id}
                    className="cursor-pointer transition-colors hover:bg-[var(--surface-tint-2)]"
                    onClick={() => setSelectedContact(c)}
                  >
                    <td className="px-4 py-3 font-medium">{c.name}</td>
                    <td className="px-4 py-3">{c.email}</td>
                    <td className="max-w-md px-4 py-3" style={{ color: "var(--ash)" }}>
                      {preview(c.message)}
                    </td>
                    <td className="f-mono px-4 py-3 text-xs tabular-nums">
                      {formatDate(c.createdAt)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {selectedContact && (
        <DetailModal title="Contact message" onClose={() => setSelectedContact(null)}>
          <DetailRow label="Name">{selectedContact.name}</DetailRow>
          <DetailRow label="Email">
            <a
              href={`mailto:${selectedContact.email}`}
              className="u-link inline-flex items-center gap-1"
            >
              <Mail size={12} /> {selectedContact.email}
            </a>
          </DetailRow>
          <DetailRow label="Received">{formatDate(selectedContact.createdAt)}</DetailRow>
          <DetailRow label="Message">
            <p className="whitespace-pre-wrap text-sm leading-relaxed">{selectedContact.message}</p>
          </DetailRow>
        </DetailModal>
      )}
    </>
  );
}
