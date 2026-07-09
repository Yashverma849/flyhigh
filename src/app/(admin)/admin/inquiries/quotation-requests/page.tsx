import type { Metadata } from "next";
import { QuotationRequestsPageClient } from "@/components/admin/inquiries/quotation-requests-page-client";
import { getAllQuotes } from "@/server/queries/inquiries";

export const metadata: Metadata = { title: "Inquiries · Quotation requests" };

export default async function AdminQuotationRequestsPage() {
  let quotes: Awaited<ReturnType<typeof getAllQuotes>> = [];

  try {
    quotes = await getAllQuotes();
  } catch {
    quotes = [];
  }

  return <QuotationRequestsPageClient quotes={quotes} />;
}
