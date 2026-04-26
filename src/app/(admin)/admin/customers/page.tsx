import type { Metadata } from "next";
import { Award, Download, MoreHorizontal, Plus } from "lucide-react";

export const metadata: Metadata = { title: "Customers" };

type Tier = "Platinum" | "Gold" | "Silver";

const TIER_COLOR: Record<Tier, string> = {
  Platinum: "var(--bone)",
  Gold: "var(--brass)",
  Silver: "var(--ash)",
};

const customers: Array<{
  name: string;
  tier: Tier;
  since: string;
  shipments: number;
  revenue: string;
  contact: string;
  health: number;
}> = [
  { name: "TATA Steel Global", tier: "Platinum", since: "2018", shipments: 412, revenue: "₹4.8 Cr", contact: "Anil Mehrotra", health: 96 },
  { name: "Reliance Petrochem", tier: "Platinum", since: "2019", shipments: 380, revenue: "₹4.2 Cr", contact: "Priya Bhanushali", health: 94 },
  { name: "Lumin Pharma", tier: "Gold", since: "2021", shipments: 184, revenue: "₹1.9 Cr", contact: "Dr. Kavita Iyer", health: 88 },
  { name: "Aurelle Couture", tier: "Gold", since: "2022", shipments: 96, revenue: "₹1.4 Cr", contact: "Mira Saraf", health: 92 },
  { name: "Helix Energy", tier: "Gold", since: "2020", shipments: 142, revenue: "₹2.1 Cr", contact: "Rajesh Khanna", health: 78 },
  { name: "Saraf Diamonds", tier: "Silver", since: "2023", shipments: 64, revenue: "₹0.8 Cr", contact: "Hiren Saraf", health: 82 },
  { name: "Godrej Locks", tier: "Gold", since: "2019", shipments: 218, revenue: "₹2.4 Cr", contact: "Sandeep Naik", health: 90 },
  { name: "ITC Hotels", tier: "Silver", since: "2022", shipments: 78, revenue: "₹0.9 Cr", contact: "Vivek Subramaniam", health: 85 },
  { name: "Cyient Aerospace", tier: "Gold", since: "2020", shipments: 156, revenue: "₹1.7 Cr", contact: "Lakshmi Rao", health: 91 },
  { name: "Tanishq", tier: "Platinum", since: "2018", shipments: 304, revenue: "₹3.6 Cr", contact: "Jyotiraditya Singh", health: 97 },
];

export default function AdminCustomersPage() {
  return (
    <div>
      <div className="mb-8 flex items-end justify-between">
        <div>
          <div className="caption mb-2" style={{ color: "var(--cargo)" }}>
            02 · ROSTER
          </div>
          <h1 className="f-display text-4xl">Customers</h1>
          <p className="mt-2 text-sm" style={{ color: "var(--ash)" }}>
            284 active accounts · 12 platinum · 41 gold · 231 silver
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button type="button" className="btn-ghost flex items-center gap-2 text-sm">
            <Download size={13} /> Export
          </button>
          <button type="button" className="btn-primary text-sm">
            Add customer <Plus size={14} />
          </button>
        </div>
      </div>

      {/* Tier KPIs */}
      <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-3">
        {(
          [
            { tier: "PLATINUM", count: 12, revenue: "₹38.4 Cr · 56% of revenue", color: "var(--bone)" },
            { tier: "GOLD", count: 41, revenue: "₹22.8 Cr · 33% of revenue", color: "var(--brass)" },
            { tier: "SILVER", count: 231, revenue: "₹7.6 Cr · 11% of revenue", color: "var(--ash)" },
          ] as const
        ).map((t) => (
          <div
            key={t.tier}
            className="rounded-md border p-6"
            style={{ borderColor: "var(--line)", background: "var(--ink-2)" }}
          >
            <div className="mb-3 flex items-center justify-between">
              <div className="caption" style={{ color: "var(--ash)" }}>
                {t.tier}
              </div>
              <Award size={14} style={{ color: t.color }} />
            </div>
            <div className="f-display text-3xl">{t.count}</div>
            <div className="caption mt-2" style={{ color: "var(--ash)" }}>
              {t.revenue}
            </div>
          </div>
        ))}
      </div>

      <div
        className="overflow-hidden rounded-md border"
        style={{ borderColor: "var(--line)", background: "var(--ink-2)" }}
      >
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead style={{ background: "var(--ink-3)" }}>
              <tr>
                {[
                  "Customer",
                  "Tier",
                  "Customer since",
                  "Shipments",
                  "Revenue (12mo)",
                  "Primary contact",
                  "Account health",
                  "",
                ].map((h) => (
                  <th
                    key={h || "actions"}
                    className="caption px-6 py-4 text-left font-normal"
                    style={{ color: "var(--ash)" }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {customers.map((c) => (
                <tr
                  key={c.name}
                  className="border-t transition-colors hover:bg-[var(--surface-tint-2)]"
                  style={{ borderColor: "var(--line)" }}
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div
                        className="f-mono flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-md text-[11px]"
                        style={{ background: "var(--ink-3)", color: "var(--brass)" }}
                      >
                        {c.name
                          .split(" ")
                          .map((w) => w[0])
                          .slice(0, 2)
                          .join("")}
                      </div>
                      <div>{c.name}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className="caption tracking-wider"
                      style={{ color: TIER_COLOR[c.tier] }}
                    >
                      ● {c.tier.toUpperCase()}
                    </span>
                  </td>
                  <td className="f-mono tabular px-6 py-4" style={{ color: "var(--ash)" }}>
                    {c.since}
                  </td>
                  <td className="f-mono tabular px-6 py-4">{c.shipments}</td>
                  <td className="f-mono tabular px-6 py-4">{c.revenue}</td>
                  <td className="px-6 py-4" style={{ color: "var(--ash)" }}>
                    {c.contact}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div
                        className="h-1.5 w-20 rounded-full"
                        style={{ background: "var(--ink-3)" }}
                      >
                        <div
                          className="h-full rounded-full"
                          style={{
                            width: `${c.health}%`,
                            background:
                              c.health > 90
                                ? "var(--sage)"
                                : c.health > 80
                                  ? "var(--brass)"
                                  : "var(--cargo)",
                          }}
                        />
                      </div>
                      <span className="f-mono tabular text-xs">{c.health}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <button
                      type="button"
                      className="opacity-50 hover:opacity-100"
                      aria-label="Customer actions"
                    >
                      <MoreHorizontal size={14} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
