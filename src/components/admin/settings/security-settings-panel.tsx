"use client";

import { signOut } from "next-auth/react";
import { ResetPasswordForm } from "@/components/admin/settings/reset-password-form";
import { SettingsPanel } from "@/components/admin/settings/settings-panel";

export function SecuritySettingsPanel() {
  return (
    <div className="space-y-6">
      <ResetPasswordForm />

      <SettingsPanel title="Security" description="Sessions and account access.">
        <div
          className="rounded-md border px-4 py-4"
          style={{ borderColor: "var(--line)", background: "var(--ink-3)" }}
        >
          <div className="text-sm">Active session</div>
          <p className="caption mt-1" style={{ color: "var(--ash)" }}>
            You are signed in on this device. Sign out everywhere to invalidate all Cockpit
            sessions.
          </p>
          <button
            type="button"
            className="btn-ghost mt-4 text-sm"
            onClick={() => signOut({ callbackUrl: "/login" })}
          >
            Sign out everywhere
          </button>
        </div>
      </SettingsPanel>

      <SettingsPanel title="Danger zone" description="Sign out of every device or close your account.">
        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            className="btn-ghost text-sm"
            onClick={() => signOut({ callbackUrl: "/login" })}
          >
            Sign out everywhere
          </button>
          <button
            type="button"
            className="text-sm"
            style={{
              color: "var(--rust)",
              border: "1px solid var(--rust)",
              padding: "13px 21px",
              borderRadius: 999,
            }}
          >
            Close account
          </button>
        </div>
      </SettingsPanel>
    </div>
  );
}
