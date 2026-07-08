import { SettingsNav } from "@/components/admin/settings/settings-nav";

export default function AdminSettingsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="space-y-8">
      <header>
        <h1 className="f-display text-4xl">Settings</h1>
        <p className="mt-2 text-sm" style={{ color: "var(--ash)" }}>
          Profile, team, notifications, and security — all configuration in one place.
        </p>
      </header>

      <div className="grid gap-8 lg:grid-cols-12">
        <SettingsNav />
        <div className="lg:col-span-9">{children}</div>
      </div>
    </div>
  );
}
