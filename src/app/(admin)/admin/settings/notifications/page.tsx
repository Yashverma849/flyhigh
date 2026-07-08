import type { Metadata } from "next";
import { NotificationSettingsForm } from "@/components/admin/settings/notification-settings-form";
import { getSettingsContext } from "@/server/queries/settings-page";

export const metadata: Metadata = { title: "Settings · Notifications" };

export default async function AdminSettingsNotificationsPage() {
  const ctx = await getSettingsContext();
  return <NotificationSettingsForm preferences={ctx.notifications} />;
}
