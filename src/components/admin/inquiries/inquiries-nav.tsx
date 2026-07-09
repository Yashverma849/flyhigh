"use client";

import type { Route } from "next";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FileText, MessageSquare } from "lucide-react";

export const INQUIRIES_SECTIONS = [
  {
    id: "quotation-requests",
    label: "Quotation requests",
    icon: FileText,
    href: "/admin/inquiries/quotation-requests" as Route,
  },
  {
    id: "contact-requests",
    label: "Contact requests",
    icon: MessageSquare,
    href: "/admin/inquiries/contact-requests" as Route,
  },
] as const;

export function InquiriesNav() {
  const pathname = usePathname();

  return (
    <nav className="lg:col-span-3">
      <ul className="space-y-1">
        {INQUIRIES_SECTIONS.map((section) => {
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
