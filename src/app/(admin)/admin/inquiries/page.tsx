import type { Route } from "next";
import { redirect } from "next/navigation";

export default function AdminInquiriesIndexPage() {
  redirect("/admin/inquiries/quotation-requests" as Route);
}
