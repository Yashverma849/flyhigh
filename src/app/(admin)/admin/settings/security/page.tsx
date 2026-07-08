import type { Metadata } from "next";
import { SecuritySettingsPanel } from "@/components/admin/settings/security-settings-panel";

export const metadata: Metadata = { title: "Settings · Security" };

export default function AdminSettingsSecurityPage() {
  return <SecuritySettingsPanel />;
}
