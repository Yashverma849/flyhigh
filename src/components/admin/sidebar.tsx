"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { signOut } from "next-auth/react";
import {
  BarChart3,
  ChevronRight,
  FileText,
  Inbox,
  LayoutDashboard,
  LogOut,
  Package,
  Settings,
  Users,
} from "lucide-react";
import { Logo } from "@/components/shared/svg";

const NAV = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard, href: "/admin" as const },
  { id: "shipments", label: "Shipments", icon: Package, href: "/admin/shipments" as const },
  { id: "customers", label: "Customers", icon: Users, href: "/admin/customers" as const },
  { id: "inquiries", label: "Inquiries", icon: Inbox, href: "/admin/inquiries" as const },
  { id: "content", label: "Content / CMS", icon: FileText, href: "/admin/content" as const },
  { id: "analytics", label: "Analytics", icon: BarChart3, href: "/admin/analytics" as const },
  { id: "settings", label: "Settings", icon: Settings, href: "/admin/settings" as const },
];

type Props = {
  user?: { name?: string | null; email?: string | null; image?: string | null } | null;
  roleLabel?: string;
  location?: string;
};

export function AdminSidebar({ user, roleLabel = "Staff", location = "Mumbai" }: Props) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(true);

  const isActive = (href: string) =>
    href === "/admin" ? pathname === "/admin" : pathname.startsWith(href);

  return (
    <aside
      onMouseEnter={() => setCollapsed(false)}
      onMouseLeave={() => setCollapsed(true)}
      className={`${collapsed ? "w-[72px]" : "w-[260px]"} sticky top-0 flex h-screen flex-shrink-0 flex-col border-r transition-all duration-300`}
      style={{ borderColor: "var(--line)", background: "var(--ink-2)" }}
    >
      <div
        className="flex items-center justify-between border-b p-5"
        style={{ borderColor: "var(--line)" }}
      >
        <Link href="/" className="group flex items-center gap-2.5">
          <div style={{ color: "var(--bone)" }}>
            <Logo size={28} />
          </div>
          {!collapsed && (
            <div>
              <div className="f-display text-lg leading-none">Flyhigh</div>
              <div className="caption mt-0.5" style={{ color: "var(--cargo)" }}>
                COCKPIT
              </div>
            </div>
          )}
        </Link>
      </div>

      <nav className="flex-1 space-y-1 p-3">
        {NAV.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href);
          return (
            <Link
              key={item.id}
              href={item.href}
              className="flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-sm transition-colors"
              style={{
                background: active ? "var(--ink-3)" : "transparent",
                color: active ? "var(--bone)" : "var(--ash)",
                borderLeft: active ? "2px solid var(--cargo)" : "2px solid transparent",
              }}
            >
              <Icon size={16} />
              {!collapsed && <span>{item.label}</span>}
              {!collapsed && active && <ChevronRight size={14} className="ml-auto opacity-50" />}
            </Link>
          );
        })}
      </nav>

      <div className="border-t p-3" style={{ borderColor: "var(--line)" }}>
        <div
          className={`flex items-center gap-3 rounded-md p-3 ${collapsed ? "justify-center" : ""}`}
          style={{ background: "var(--surface-tint-2)" }}
        >
          {user?.image ? (
            <div className="h-8 w-8 flex-shrink-0 rounded-full overflow-hidden border" style={{ borderColor: "var(--line)" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={user.image} alt={user.name || "User"} className="h-full w-full object-cover" />
            </div>
          ) : (
            <div
              className="f-mono flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full text-xs"
              style={{ background: "var(--cargo)", color: "var(--ink)" }}
            >
              {(user?.name ?? user?.email ?? "U").slice(0, 2).toUpperCase()}
            </div>
          )}
          {!collapsed && (
            <>
              <div className="min-w-0 flex-1">
                <div className="truncate text-sm">{user?.name ?? user?.email ?? "User"}</div>
                <div className="caption truncate" style={{ color: "var(--ash)" }}>
                  {roleLabel} · {location}
                </div>
              </div>
              <button
                type="button"
                onClick={() => signOut({ callbackUrl: "/login" })}
                aria-label="Sign out"
                className="cursor-pointer opacity-50 hover:opacity-100 focus:outline-none"
              >
                <LogOut size={14} />
              </button>
            </>
          )}
        </div>
      </div>
    </aside>
  );
}
