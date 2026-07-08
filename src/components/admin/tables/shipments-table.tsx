"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Edit3,
  Eye,
  Search,
  Trash2,
} from "lucide-react";
import { StatusPill } from "@/components/admin/status-pill";
import type { ShipmentStatus } from "@/lib/constants";
import { formatDate, formatINR } from "@/lib/utils";
import type { Shipment } from "@/server/db/schema";

const STATUSES: Array<"All" | ShipmentStatus> = [
  "All",
  "Booked",
  "In Transit",
  "Customs",
  "Delivered",
];

const ALL = "All";

type ColumnFilters = {
  customer: string;
  origin: string;
  destination: string;
  mode: string;
  eta: string;
};

type Props = {
  shipments: Shipment[];
  onEdit: (shipment: Shipment) => void;
  onDelete: (shipment: Shipment) => void;
  onFilteredChange?: (filtered: Shipment[]) => void;
};

function uniqueSorted(values: Array<string | null | undefined>) {
  return [...new Set(values.filter((v): v is string => Boolean(v && v.trim())))]
    .sort((a, b) => a.localeCompare(b));
}

function FilterSelect({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
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
            {o}
          </option>
        ))}
      </select>
    </label>
  );
}

export function ShipmentsTable({ shipments, onEdit, onDelete, onFilteredChange }: Props) {
  const [filter, setFilter] = useState<(typeof STATUSES)[number]>("All");
  const [search, setSearch] = useState("");
  const [columnFilters, setColumnFilters] = useState<ColumnFilters>({
    customer: ALL,
    origin: ALL,
    destination: ALL,
    mode: ALL,
    eta: ALL,
  });

  const filterOptions = useMemo(
    () => ({
      customers: uniqueSorted(shipments.map((s) => s.customerName)),
      origins: uniqueSorted(shipments.map((s) => s.origin)),
      destinations: uniqueSorted(shipments.map((s) => s.destination)),
      modes: uniqueSorted(shipments.map((s) => s.mode.toUpperCase())),
      etas: uniqueSorted(shipments.map((s) => s.eta)),
    }),
    [shipments],
  );

  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase();
    return shipments.filter((s) => {
      const matchStatus = filter === "All" || s.status === filter;
      const matchSearch =
        term === "" ||
        s.id.toLowerCase().includes(term) ||
        (s.customerName ?? "").toLowerCase().includes(term);
      const matchCustomer =
        columnFilters.customer === ALL || s.customerName === columnFilters.customer;
      const matchOrigin = columnFilters.origin === ALL || s.origin === columnFilters.origin;
      const matchDestination =
        columnFilters.destination === ALL || s.destination === columnFilters.destination;
      const matchMode =
        columnFilters.mode === ALL || s.mode.toUpperCase() === columnFilters.mode;
      const matchEta =
        columnFilters.eta === ALL || (s.eta ?? "") === columnFilters.eta;

      return (
        matchStatus &&
        matchSearch &&
        matchCustomer &&
        matchOrigin &&
        matchDestination &&
        matchMode &&
        matchEta
      );
    });
  }, [shipments, filter, search, columnFilters]);

  useEffect(() => {
    onFilteredChange?.(filtered);
  }, [filtered, onFilteredChange]);

  const hasActiveColumnFilters = Object.values(columnFilters).some((v) => v !== ALL);

  function clearColumnFilters() {
    setColumnFilters({
      customer: ALL,
      origin: ALL,
      destination: ALL,
      mode: ALL,
      eta: ALL,
    });
  }

  return (
    <>
      <div className="mb-6 flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
        <div className="flex flex-wrap items-center gap-3">
          <div
            className="flex items-center gap-1 rounded-md border p-1"
            style={{ borderColor: "var(--line)", background: "var(--ink-2)" }}
          >
            {STATUSES.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setFilter(s)}
                className="rounded px-3 py-1.5 text-sm transition-colors"
                style={{
                  background: filter === s ? "var(--cargo)" : "transparent",
                  color: filter === s ? "var(--ink)" : "var(--ash)",
                }}
              >
                {s}
              </button>
            ))}
          </div>
          <div className="relative min-w-[14rem] flex-1 xl:max-w-sm">
            <Search size={14} className="absolute top-1/2 left-3 -translate-y-1/2 opacity-50" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search reference or customer…"
              className="w-full rounded-md border bg-transparent py-2 pr-4 pl-9 text-sm focus:border-[var(--cargo)] focus:outline-none"
              style={{ borderColor: "var(--line)", color: "var(--bone)" }}
              aria-label="Search shipments"
            />
          </div>
        </div>

        <div className="flex flex-wrap items-end justify-end gap-3">
          <FilterSelect
            label="Customer"
            value={columnFilters.customer}
            options={filterOptions.customers}
            onChange={(customer) => setColumnFilters((f) => ({ ...f, customer }))}
          />
          <FilterSelect
            label="Origin"
            value={columnFilters.origin}
            options={filterOptions.origins}
            onChange={(origin) => setColumnFilters((f) => ({ ...f, origin }))}
          />
          <FilterSelect
            label="Destination"
            value={columnFilters.destination}
            options={filterOptions.destinations}
            onChange={(destination) => setColumnFilters((f) => ({ ...f, destination }))}
          />
          <FilterSelect
            label="Mode"
            value={columnFilters.mode}
            options={filterOptions.modes}
            onChange={(mode) => setColumnFilters((f) => ({ ...f, mode }))}
          />
          <FilterSelect
            label="ETA"
            value={columnFilters.eta}
            options={filterOptions.etas}
            onChange={(eta) => setColumnFilters((f) => ({ ...f, eta }))}
          />
          {hasActiveColumnFilters && (
            <button
              type="button"
              className="btn-ghost px-3 py-2 text-sm"
              onClick={clearColumnFilters}
            >
              Clear filters
            </button>
          )}
          <div className="caption pb-2" style={{ color: "var(--ash)" }}>
            {filtered.length} results
          </div>
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
                  "Reference",
                  "Customer",
                  "Origin",
                  "Destination",
                  "Mode",
                  "ETA",
                  "Declared value",
                  "Status",
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
              {filtered.map((s) => (
                <tr
                  key={s.id}
                  className="border-t transition-colors hover:bg-[var(--surface-tint-2)]"
                  style={{ borderColor: "var(--line)" }}
                >
                  <td className="f-mono px-6 py-4 text-xs" style={{ color: "var(--cargo)" }}>
                    <Link href={`/admin/shipments/${s.id}`} className="hover:underline">
                      {s.id}
                    </Link>
                  </td>
                  <td className="px-6 py-4">{s.customerName ?? "—"}</td>
                  <td className="px-6 py-4" style={{ color: "var(--ash)" }}>
                    {s.origin}
                  </td>
                  <td className="px-6 py-4">{s.destination}</td>
                  <td className="caption px-6 py-4" style={{ color: "var(--brass)" }}>
                    {s.mode.toUpperCase()}
                  </td>
                  <td className="f-mono tabular px-6 py-4 text-xs">{s.eta ?? "—"}</td>
                  <td className="f-mono tabular px-6 py-4">
                    {s.valueInr ? formatINR(s.valueInr) : "—"}
                  </td>
                  <td className="px-6 py-4">
                    <StatusPill status={s.status as ShipmentStatus} />
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Link
                        href={`/admin/shipments/${s.id}`}
                        className="rounded p-1.5 hover:bg-[var(--surface-tint-6)]"
                        aria-label="View"
                      >
                        <Eye size={13} />
                      </Link>
                      <button
                        type="button"
                        className="rounded p-1.5 hover:bg-[var(--surface-tint-6)]"
                        aria-label="Edit"
                        onClick={() => onEdit(s)}
                      >
                        <Edit3 size={13} />
                      </button>
                      <button
                        type="button"
                        className="rounded p-1.5 hover:bg-[var(--surface-tint-6)]"
                        aria-label="Delete"
                        onClick={() => onDelete(s)}
                        style={{ color: "var(--rust)" }}
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td
                    colSpan={9}
                    className="px-6 py-12 text-center"
                    style={{ color: "var(--ash)" }}
                  >
                    No shipments match your filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div
          className="caption flex items-center justify-between border-t px-6 py-4"
          style={{ borderColor: "var(--line)", color: "var(--ash)" }}
        >
          <span>
            Showing {filtered.length} of {shipments.length} shipments
          </span>
          <div className="flex items-center gap-2">
            <button
              type="button"
              className="rounded border px-3 py-1 hover:bg-[var(--surface-tint-6)]"
              style={{ borderColor: "var(--line)" }}
              aria-label="Previous page"
            >
              <ChevronLeft size={12} />
            </button>
            <span>Page 1</span>
            <button
              type="button"
              className="rounded border px-3 py-1 hover:bg-[var(--surface-tint-6)]"
              style={{ borderColor: "var(--line)" }}
              aria-label="Next page"
            >
              <ChevronRight size={12} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export { formatDate };
