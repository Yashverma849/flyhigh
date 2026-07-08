"use client";

import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { updateProfile, type SettingsActionState } from "@/server/actions/settings";
import {
  SettingsField,
  SettingsFormFooter,
  SettingsPanel,
} from "@/components/admin/settings/settings-panel";

type Props = {
  name: string;
  email: string;
  phone: string;
  roleLabel: string;
};

const initial: SettingsActionState = { status: "idle" };

export function ProfileSettingsForm({ name, email, phone, roleLabel }: Props) {
  const router = useRouter();
  const [state, formAction, pending] = useActionState(updateProfile, initial);
  const fieldErrors = state.status === "error" ? state.fieldErrors : undefined;

  useEffect(() => {
    if (state.status === "success") router.refresh();
  }, [state.status, router]);

  return (
    <SettingsPanel title="Profile" description="Your account and contact preferences.">
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
            Profile saved.
          </p>
        )}

        <div className="grid gap-6 md:grid-cols-2">
          <SettingsField
            label="Name"
            name="name"
            defaultValue={name}
            error={fieldErrors?.name?.[0]}
          />
          <SettingsField label="Email" defaultValue={email} type="email" disabled />
          <SettingsField
            label="Phone"
            name="phone"
            defaultValue={phone}
            placeholder="+91 9322627766"
            error={fieldErrors?.phone?.[0]}
          />
          <SettingsField label="Role" defaultValue={roleLabel} disabled />
        </div>

        <SettingsFormFooter submitLabel="Save changes" pending={pending} />
      </form>
    </SettingsPanel>
  );
}
