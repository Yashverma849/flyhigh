import type { Metadata } from "next";
import { ProfileSettingsForm } from "@/components/admin/settings/profile-settings-form";
import { getSettingsContext } from "@/server/queries/settings-page";

export const metadata: Metadata = { title: "Settings · Profile" };

export default async function AdminSettingsProfilePage() {
  const ctx = await getSettingsContext();

  return (
    <ProfileSettingsForm
      name={ctx.displayName}
      email={ctx.email}
      phone={ctx.phone}
      roleLabel={ctx.roleLabel}
    />
  );
}
