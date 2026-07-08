import type { Route } from "next";
import { redirect } from "next/navigation";

export default function AdminSettingsIndexPage() {
  redirect("/admin/settings/profile" as Route);
}
