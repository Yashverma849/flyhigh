"use client";

import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { updateGeneralSettings, type SettingsActionState } from "@/server/actions/settings";
import {
  SettingsField,
  SettingsFormFooter,
  SettingsPanel,
  SettingsSelect,
} from "@/components/admin/settings/settings-panel";

type Props = {
  timezone: string;
  language: string;
  country: string;
  city: string;
};

const TIMEZONES = [
  { value: "Asia/Kolkata", label: "Asia/Kolkata (IST)" },
  { value: "Asia/Dubai", label: "Asia/Dubai (GST)" },
  { value: "Asia/Singapore", label: "Asia/Singapore (SGT)" },
  { value: "Europe/London", label: "Europe/London (GMT)" },
  { value: "America/New_York", label: "America/New_York (EST)" },
];

const LANGUAGES = [
  { value: "en", label: "English" },
  { value: "hi", label: "Hindi" },
  { value: "mr", label: "Marathi" },
];

const initial: SettingsActionState = { status: "idle" };

export function GeneralSettingsForm({ timezone, language, country, city }: Props) {
  const router = useRouter();
  const [state, formAction, pending] = useActionState(updateGeneralSettings, initial);
  const fieldErrors = state.status === "error" ? state.fieldErrors : undefined;

  useEffect(() => {
    if (state.status === "success") router.refresh();
  }, [state.status, router]);

  return (
    <SettingsPanel title="General" description="Locale, timezone, and workspace defaults.">
      <form action={formAction}>
        {state.status === "error" && state.message && (
          <p
            className="caption mb-6 rounded-md border px-4 py-3"
            style={{ borderColor: "var(--rust)", color: "var(--rust)" }}
          >
            {state.message}
          </p>
        )}
        {state.status === "success" && (
          <p
            className="caption mb-6 rounded-md border px-4 py-3"
            style={{ borderColor: "var(--cargo)", color: "var(--cargo)" }}
          >
            General settings saved.
          </p>
        )}

        <div className="grid gap-6 md:grid-cols-2">
          <SettingsSelect
            label="Timezone"
            name="timezone"
            defaultValue={timezone}
            options={TIMEZONES}
            error={fieldErrors?.timezone?.[0]}
          />
          <SettingsSelect
            label="Language"
            name="language"
            defaultValue={language}
            options={LANGUAGES}
            error={fieldErrors?.language?.[0]}
          />
          <SettingsField
            label="Country"
            name="country"
            defaultValue={country}
            placeholder="India"
            error={fieldErrors?.country?.[0]}
          />
          <SettingsField
            label="City"
            name="city"
            defaultValue={city}
            placeholder="Mumbai"
            error={fieldErrors?.city?.[0]}
          />
        </div>

        <SettingsFormFooter submitLabel="Save changes" pending={pending} />
      </form>
    </SettingsPanel>
  );
}
