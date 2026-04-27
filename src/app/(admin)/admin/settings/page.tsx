import type { Metadata } from "next";
import { Bell, CreditCard, Lock, Settings as SettingsIcon, User, Users } from "lucide-react";
import { auth } from "@/auth";

export const metadata: Metadata = { title: "Settings" };

const SECTIONS = [
  { id: "profile", label: "Profile", icon: User },
  { id: "team", label: "Team & roles", icon: Users },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "billing", label: "Billing", icon: CreditCard },
  { id: "security", label: "Security", icon: Lock },
  { id: "general", label: "General", icon: SettingsIcon },
];

export default async function AdminSettingsPage() {
  const session = await auth();
  const user = session?.user;

  return (
    <div className="space-y-8">
      <header>
        <div className="caption mb-2" style={{ color: "var(--cargo)" }}>
          06 · CONFIG
        </div>
        <h1 className="f-display text-4xl">Settings</h1>
        <p className="mt-2 text-sm" style={{ color: "var(--ash)" }}>
          Profile, team, notifications, and billing — all configuration in one place.
        </p>
      </header>

      <div className="grid gap-8 lg:grid-cols-12">
        <nav className="lg:col-span-3">
          <ul className="space-y-1">
            {SECTIONS.map((s, i) => {
              const Icon = s.icon;
              return (
                <li key={s.id}>
                  <button
                    type="button"
                    className="flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-sm transition-colors"
                    style={{
                      background: i === 0 ? "var(--ink-3)" : "transparent",
                      color: i === 0 ? "var(--bone)" : "var(--ash)",
                    }}
                  >
                    <Icon size={14} />
                    {s.label}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="lg:col-span-9">
          <section
            className="rounded-md border p-8"
            style={{ borderColor: "var(--line)", background: "var(--ink-2)" }}
          >
            <h2 className="f-display mb-1 text-2xl">Profile</h2>
            <p className="caption mb-8" style={{ color: "var(--ash)" }}>
              Your account & contact preferences.
            </p>

            <div className="grid gap-6 md:grid-cols-2">
              <Field label="Name" defaultValue={user?.name ?? ""} />
              <Field label="Email" defaultValue={user?.email ?? ""} type="email" disabled />
              <Field label="Phone" placeholder="+91 9322627766" />
              <Field label="Role" defaultValue="Operations" disabled />
            </div>

            <div
              className="mt-8 flex items-center justify-between border-t pt-6"
              style={{ borderColor: "var(--line)" }}
            >
              <div className="caption" style={{ color: "var(--ash)" }}>
                Changes auto-save.
              </div>
              <div className="flex gap-3">
                <button type="button" className="btn-ghost text-sm">
                  Cancel
                </button>
                <button type="button" className="btn-primary text-sm">
                  Save changes
                </button>
              </div>
            </div>
          </section>

          <section
            className="mt-6 rounded-md border p-8"
            style={{ borderColor: "var(--line)", background: "var(--ink-2)" }}
          >
            <h2 className="f-display mb-1 text-2xl">Danger zone</h2>
            <p className="caption mb-6" style={{ color: "var(--ash)" }}>
              Sign out of every device or close your account.
            </p>
            <div className="flex gap-3">
              <button type="button" className="btn-ghost text-sm">
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
          </section>
        </div>
      </div>
    </div>
  );
}

function Field({
  label,
  defaultValue,
  placeholder,
  type = "text",
  disabled = false,
}: {
  label: string;
  defaultValue?: string;
  placeholder?: string;
  type?: string;
  disabled?: boolean;
}) {
  return (
    <div>
      <label className="caption mb-2 block" style={{ color: "var(--brass)" }}>
        {label}
      </label>
      <input
        type={type}
        defaultValue={defaultValue}
        placeholder={placeholder}
        disabled={disabled}
        className="input disabled:opacity-50"
      />
    </div>
  );
}
