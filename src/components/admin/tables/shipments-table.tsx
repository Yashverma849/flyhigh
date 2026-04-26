"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ChevronLeft, ChevronRight, Edit3, Eye, Filter, MoreHorizontal, Search } from "lucide-react";
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

type Props = { shipments: Shipment[] };

export function ShipmentsTable({ shipments }: Props) {
  const [filter, setFilter] = useState<(typeof STATUSES)[number]>("All");
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase();
    return shipments.filter((s) => {
      const matchStatus = filter === "All" || s.status === filter;
      const matchSearch =
        term === "" ||
        s.id.toLowerCase().includes(term) ||
        (s.customerName ?? "").toLowerCase().includes(term);
      return matchStatus && matchSearch;
    });
  }, [shipments, filter, search]);

  return (
    <>
      <div className="mb-6 flex flex-wrap items-center gap-3">
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
        <div className="relative max-w-sm flex-1">
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
        <button type="button" className="btn-ghost flex items-center gap-2 text-sm">
          <Filter size={13} /> More filters
        </button>
        <div className="caption ml-auto" style={{ color: "var(--ash)" }}>
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
                      >
                        <Edit3 size={13} />
                      </button>
                      <button
                        type="button"
                        className="rounded p-1.5 hover:bg-[var(--surface-tint-6)]"
                        aria-label="More"
                      >
                        <MoreHorizontal size={13} />
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

// Re-export so prototype-style access keeps working.
export { formatDate };
