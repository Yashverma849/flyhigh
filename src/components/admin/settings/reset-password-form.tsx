"use client";

import { useActionState, useEffect, useRef } from "react";
import { resetPassword, type SettingsActionState } from "@/server/actions/settings";
import {
  SettingsField,
  SettingsFormFooter,
  SettingsPanel,
} from "@/components/admin/settings/settings-panel";

const initial: SettingsActionState = { status: "idle" };

export function ResetPasswordForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [state, formAction, pending] = useActionState(resetPassword, initial);
  const fieldErrors = state.status === "error" ? state.fieldErrors : undefined;

  useEffect(() => {
    if (state.status === "success") {
      formRef.current?.reset();
    }
  }, [state.status]);

  return (
    <SettingsPanel title="Reset password" description="Set a new password for your Cockpit account.">
      <form ref={formRef} action={formAction}>
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
            Password updated successfully.
          </p>
        )}

        <div className="grid gap-6 md:grid-cols-2">
          <SettingsField
            label="New password"
            name="password"
            type="password"
            placeholder="Enter new password"
            error={fieldErrors?.password?.[0]}
          />
          <SettingsField
            label="Confirm new password"
            name="confirmPassword"
            type="password"
            placeholder="Re-enter new password"
            error={fieldErrors?.confirmPassword?.[0]}
          />
        </div>

        <p className="caption mt-4" style={{ color: "var(--ash)" }}>
          Use at least 8 characters with a capital letter, number, and special character.
        </p>

        <SettingsFormFooter submitLabel="Update password" pending={pending} />
      </form>
    </SettingsPanel>
  );
}
