import type { Metadata } from "next";
import { GeneralSettingsForm } from "@/components/admin/settings/general-settings-form";
import { getSettingsContext } from "@/server/queries/settings-page";

export const metadata: Metadata = { title: "Settings · General" };

export default async function AdminSettingsGeneralPage() {
  const ctx = await getSettingsContext();

  return (
    <GeneralSettingsForm
      timezone={ctx.timezone}
      language={ctx.language}
      country={ctx.country}
      city={ctx.city}
    />
  );
}
