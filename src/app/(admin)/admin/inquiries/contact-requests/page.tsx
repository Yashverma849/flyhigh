import type { Metadata } from "next";
import { ContactRequestsPageClient } from "@/components/admin/inquiries/contact-requests-page-client";
import { getAllContactSubmissions } from "@/server/queries/inquiries";

export const metadata: Metadata = { title: "Inquiries · Contact requests" };

export default async function AdminContactRequestsPage() {
  let contacts: Awaited<ReturnType<typeof getAllContactSubmissions>> = [];

  try {
    contacts = await getAllContactSubmissions();
  } catch {
    contacts = [];
  }

  return <ContactRequestsPageClient contacts={contacts} />;
}
