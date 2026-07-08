"use client";

import { Bell, ChevronRight, Search } from "lucide-react";
import { usePathname } from "next/navigation";

const labels: Record<string, string> = {
  "": "dashboard",
  shipments: "shipments",
  customers: "customers",
  content: "content",
  analytics: "analytics",
  settings: "settings",
};

const settingsLabels: Record<string, string> = {
  profile: "profile",
  team: "team",
  notifications: "notifications",
  security: "security",
  general: "general",
};

export function AdminTopbar() {
  const pathname = usePathname();
  const segments = pathname.replace(/^\/admin\/?/, "").split("/").filter(Boolean);
  const segment = segments[0] ?? "";
  const settingsSegment = segments[1];
  const active = labels[segment] ?? "dashboard";
  const settingsActive = settingsSegment ? settingsLabels[settingsSegment] : null;

  return (
    <div
      className="sticky top-0 z-20 border-b"
      style={{
        borderColor: "var(--line)",
        background: "var(--surface-translucent)",
        backdropFilter: "blur(12px)",
      }}
    >
      <div className="flex items-center justify-between px-8 py-3.5">
        <div className="flex items-center gap-3 text-sm" style={{ color: "var(--ash)" }}>
          <span>Cockpit</span>
          <ChevronRight size={12} />
          <span style={{ color: "var(--bone)" }} className="capitalize">
            {active}
          </span>
          {settingsActive && (
            <>
              <ChevronRight size={12} />
              <span style={{ color: "var(--bone)" }} className="capitalize">
                {settingsActive}
              </span>
            </>
          )}
        </div>
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search size={14} className="absolute top-1/2 left-3 -translate-y-1/2 opacity-50" />
            <input
              className="w-64 rounded-md border bg-transparent py-2 pr-4 pl-9 text-sm focus:outline-none"
              placeholder="Search shipments, customers…"
              style={{ borderColor: "var(--line)", color: "var(--bone)" }}
              aria-label="Search"
            />
          </div>
          <button
            type="button"
            className="relative flex h-9 w-9 items-center justify-center rounded-md hover:bg-[var(--surface-tint-6)]"
            aria-label="Notifications"
          >
            <Bell size={15} />
            <span
              className="absolute top-2 right-2 h-1.5 w-1.5 rounded-full"
              style={{ background: "var(--cargo)" }}
            />
          </button>
          <div className="caption" style={{ color: "var(--ash)" }}>
            v3.4.1
          </div>
        </div>
      </div>
    </div>
  );
}
