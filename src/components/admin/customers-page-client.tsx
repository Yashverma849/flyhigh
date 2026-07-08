"use client";

import { useMemo, useState } from "react";
import { Award, Download, Edit3, Plus, Trash2 } from "lucide-react";
import { exportCustomersCsv } from "@/lib/export-csv";
import { formatINRLarge } from "@/lib/utils";
import { NewCustomerModal } from "@/components/admin/new-customer-modal";
import { EditCustomerModal } from "@/components/admin/edit-customer-modal";
import { DeleteCustomerModal } from "@/components/admin/delete-customer-modal";
import type { CustomerRow, TierSummary } from "@/server/queries/dashboard";

type Tier = "platinum" | "gold" | "silver";

const TIER_LABEL: Record<Tier, string> = {
  platinum: "Platinum",
  gold: "Gold",
  silver: "Silver",
};

const TIER_COLOR: Record<Tier, string> = {
  platinum: "var(--bone)",
  gold: "var(--brass)",
  silver: "var(--ash)",
};

function tierRevenueShare(tierRevenue: number, totalRevenue: number) {
  if (totalRevenue === 0) return "₹0 · 0% of revenue";
  const pct = Math.round((tierRevenue / totalRevenue) * 100);
  return `${formatINRLarge(tierRevenue)} · ${pct}% of revenue`;
}

const ALL = "All";

type ColumnFilters = {
  tier: string;
  since: string;
  shipments: string;
  revenue: string;
  health: string;
};

function uniqueSorted(values: string[]) {
  return [...new Set(values.filter(Boolean))].sort((a, b) => a.localeCompare(b));
}

function uniqueNumericSorted(values: number[]) {
  return [...new Set(values)].sort((a, b) => a - b).map(String);
}

function FilterSelect({
  label,
  value,
  options,
  onChange,
  formatOption,
}: {
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
  formatOption?: (value: string) => string;
}) {
  return (
    <label className="flex min-w-[9rem] flex-col gap-1.5">
      <span className="caption" style={{ color: "var(--ash)" }}>
        {label}
      </span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="rounded-md border bg-transparent px-3 py-2 text-sm focus:border-[var(--cargo)] focus:outline-none"
        style={{ borderColor: "var(--line)", color: "var(--bone)" }}
      >
        <option value={ALL}>{ALL}</option>
        {options.map((o) => (
          <option key={o} value={o}>
            {formatOption ? formatOption(o) : o}
          </option>
        ))}
      </select>
    </label>
  );
}

type Props = {
  customers: CustomerRow[];
  tierSummary: TierSummary[];
};

export function CustomersPageClient({ customers, tierSummary }: Props) {
  const [createOpen, setCreateOpen] = useState(false);
  const [editing, setEditing] = useState<CustomerRow | null>(null);
  const [deleting, setDeleting] = useState<CustomerRow | null>(null);
  const [columnFilters, setColumnFilters] = useState<ColumnFilters>({
    tier: ALL,
    since: ALL,
    shipments: ALL,
    revenue: ALL,
    health: ALL,
  });

  const filterOptions = useMemo(
    () => ({
      tiers: uniqueSorted(customers.map((c) => c.tier)),
      since: [...new Set(customers.map((c) => c.since))]
        .filter(Boolean)
        .sort((a, b) => Number(b) - Number(a)),
      shipments: uniqueNumericSorted(customers.map((c) => c.shipments)),
      revenue: uniqueNumericSorted(customers.map((c) => c.revenueInr)),
      health: uniqueNumericSorted(customers.map((c) => c.health)),
    }),
    [customers],
  );

  const filtered = useMemo(() => {
    return customers.filter((c) => {
      const matchTier = columnFilters.tier === ALL || c.tier === columnFilters.tier;
      const matchSince = columnFilters.since === ALL || c.since === columnFilters.since;
      const matchShipments =
        columnFilters.shipments === ALL || String(c.shipments) === columnFilters.shipments;
      const matchRevenue =
        columnFilters.revenue === ALL || String(c.revenueInr) === columnFilters.revenue;
      const matchHealth =
        columnFilters.health === ALL || String(c.health) === columnFilters.health;
      return matchTier && matchSince && matchShipments && matchRevenue && matchHealth;
    });
  }, [customers, columnFilters]);

  const hasActiveFilters = Object.values(columnFilters).some((v) => v !== ALL);

  function clearFilters() {
    setColumnFilters({
      tier: ALL,
      since: ALL,
      shipments: ALL,
      revenue: ALL,
      health: ALL,
    });
  }

  const totalAccounts = tierSummary.reduce((sum, t) => sum + t.count, 0);
  const totalRevenue = tierSummary.reduce((sum, t) => sum + t.revenueInr, 0);
  const tierCounts = Object.fromEntries(tierSummary.map((t) => [t.tier, t.count])) as Record<
    Tier,
    number
  >;

  function handleExport() {
    if (filtered.length === 0) return;
    exportCustomersCsv(filtered);
  }

  return (
    <>
      <div className="mb-8 flex items-end justify-between">
        <div>
          <h1 className="f-display text-4xl">Customers</h1>
          <p className="mt-2 text-sm" style={{ color: "var(--ash)" }}>
            {totalAccounts} active accounts · {tierCounts.platinum ?? 0} platinum ·{" "}
            {tierCounts.gold ?? 0} gold · {tierCounts.silver ?? 0} silver
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            className="btn-ghost flex items-center gap-2 text-sm"
            onClick={handleExport}
            disabled={filtered.length === 0}
          >
            <Download size={13} /> Export
          </button>
          <button
            type="button"
            className="btn-primary flex items-center gap-2 text-sm"
            onClick={() => setCreateOpen(true)}
          >
            Add customer <Plus size={14} />
          </button>
        </div>
      </div>

      <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-3">
        {tierSummary.map((t) => (
          <div
            key={t.tier}
            className="rounded-md border p-6"
            style={{ borderColor: "var(--line)", background: "var(--ink-2)" }}
          >
            <div className="mb-3 flex items-center justify-between">
              <div className="caption" style={{ color: "var(--ash)" }}>
                {TIER_LABEL[t.tier].toUpperCase()}
              </div>
              <Award size={14} style={{ color: TIER_COLOR[t.tier] }} />
            </div>
            <div className="f-display text-3xl">{t.count}</div>
            <div className="caption mt-2" style={{ color: "var(--ash)" }}>
              {tierRevenueShare(t.revenueInr, totalRevenue)}
            </div>
          </div>
        ))}
      </div>

      <div className="mb-6 flex flex-wrap items-end justify-end gap-3">
        <FilterSelect
          label="Tier"
          value={columnFilters.tier}
          options={filterOptions.tiers}
          onChange={(tier) => setColumnFilters((f) => ({ ...f, tier }))}
          formatOption={(v) => TIER_LABEL[v as Tier] ?? v}
        />
        <FilterSelect
          label="Customer since"
          value={columnFilters.since}
          options={filterOptions.since}
          onChange={(since) => setColumnFilters((f) => ({ ...f, since }))}
        />
        <FilterSelect
          label="Shipments"
          value={columnFilters.shipments}
          options={filterOptions.shipments}
          onChange={(shipments) => setColumnFilters((f) => ({ ...f, shipments }))}
        />
        <FilterSelect
          label="Revenue (12mo)"
          value={columnFilters.revenue}
          options={filterOptions.revenue}
          onChange={(revenue) => setColumnFilters((f) => ({ ...f, revenue }))}
          formatOption={(v) => formatINRLarge(Number(v))}
        />
        <FilterSelect
          label="Account health"
          value={columnFilters.health}
          options={filterOptions.health}
          onChange={(health) => setColumnFilters((f) => ({ ...f, health }))}
        />
        {hasActiveFilters && (
          <button type="button" className="btn-ghost px-3 py-2 text-sm" onClick={clearFilters}>
            Clear filters
          </button>
        )}
        <div className="caption pb-2" style={{ color: "var(--ash)" }}>
          {filtered.length} results
        </div>
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
              {customers.length === 0 ? (
                <tr>
                  <td
                    colSpan={8}
                    className="caption px-6 py-12 text-center"
                    style={{ color: "var(--ash)" }}
                  >
                    No customers yet. Add one or run{" "}
                    <span className="f-mono text-[var(--brass)]">SQL/seed-dummy-data.sql</span>.
                  </td>
                </tr>
              ) : filtered.length === 0 ? (
                <tr>
                  <td
                    colSpan={8}
                    className="caption px-6 py-12 text-center"
                    style={{ color: "var(--ash)" }}
                  >
                    No customers match your filters.
                  </td>
                </tr>
              ) : (
                filtered.map((c) => (
                  <tr
                    key={c.id}
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
                        ● {TIER_LABEL[c.tier].toUpperCase()}
                      </span>
                    </td>
                    <td className="f-mono tabular px-6 py-4" style={{ color: "var(--ash)" }}>
                      {c.since}
                    </td>
                    <td className="f-mono tabular px-6 py-4">{c.shipments}</td>
                    <td className="f-mono tabular px-6 py-4">{formatINRLarge(c.revenueInr)}</td>
                    <td className="px-6 py-4" style={{ color: "var(--ash)" }}>
                      {c.contact ?? "—"}
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
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          className="rounded p-1.5 hover:bg-[var(--surface-tint-6)]"
                          aria-label="Edit customer"
                          onClick={() => setEditing(c)}
                        >
                          <Edit3 size={13} />
                        </button>
                        <button
                          type="button"
                          className="rounded p-1.5 hover:bg-[var(--surface-tint-6)]"
                          aria-label="Delete customer"
                          onClick={() => setDeleting(c)}
                          style={{ color: "var(--rust)" }}
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div
          className="caption flex items-center justify-between border-t px-6 py-4"
          style={{ borderColor: "var(--line)", color: "var(--ash)" }}
        >
          <span>
            Showing {filtered.length} of {customers.length} customers
          </span>
        </div>
      </div>

      <NewCustomerModal open={createOpen} onClose={() => setCreateOpen(false)} />
      <EditCustomerModal customer={editing} onClose={() => setEditing(null)} />
      <DeleteCustomerModal customer={deleting} onClose={() => setDeleting(null)} />
    </>
  );
}
