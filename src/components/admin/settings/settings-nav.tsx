"use client";

import type { Route } from "next";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Bell,
  // Lock,
  Settings as SettingsIcon,
  User,
  Users,
} from "lucide-react";

export const SETTINGS_SECTIONS = [
  { id: "profile", label: "Profile", icon: User, href: "/admin/settings/profile" as Route },
  { id: "team", label: "Team & roles", icon: Users, href: "/admin/settings/team" as Route },
  {
    id: "notifications",
    label: "Notifications",
    icon: Bell,
    href: "/admin/settings/notifications" as Route,
  },
  // { id: "security", label: "Security", icon: Lock, href: "/admin/settings/security" as Route },
  { id: "general", label: "General", icon: SettingsIcon, href: "/admin/settings/general" as Route },
] as const;

export function SettingsNav() {
  const pathname = usePathname();

  return (
    <nav className="lg:col-span-3">
      <ul className="space-y-1">
        {SETTINGS_SECTIONS.map((section) => {
          const Icon = section.icon;
          const active = pathname === section.href;
          return (
            <li key={section.id}>
              <Link
                href={section.href}
                className="flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-sm transition-colors"
                style={{
                  background: active ? "var(--ink-3)" : "transparent",
                  color: active ? "var(--bone)" : "var(--ash)",
                  borderLeft: active ? "2px solid var(--cargo)" : "2px solid transparent",
                }}
              >
                <Icon size={14} />
                {section.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
