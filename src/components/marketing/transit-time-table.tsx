"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { Check, ChevronDown, Filter } from "lucide-react";
import { ROUTES, ROUTE_REGIONS, type Route } from "@/server/db/seed/routes";
import { formatINR } from "@/lib/utils";

const REGIONS_WITH_LANES = ROUTE_REGIONS.filter(
  (region) => ROUTES.some((r) => r.region === region),
);

const ROW_STAGGER_MS = 80;
const ROW_TRANSITION =
  "opacity 500ms cubic-bezier(0.22, 1, 0.36, 1), transform 500ms cubic-bezier(0.22, 1, 0.36, 1)";

function RegionFilter({
  value,
  onChange,
}: {
  value: Route["region"];
  onChange: (region: Route["region"]) => void;
}) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    const handlePointerDown = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  return (
    <div ref={rootRef} className="relative w-full sm:ml-auto sm:w-auto sm:min-w-[240px]">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label="Filter by region"
        className="flex w-full items-center gap-2.5 rounded-2xl border px-4 py-3 text-left text-sm transition-all"
        style={{
          borderColor: open ? "var(--cargo)" : "var(--line)",
          background: open ? "var(--cargo-tint-4)" : "var(--ink)",
          color: "var(--bone)",
        }}
      >
        <Filter size={14} className="shrink-0" style={{ color: "var(--ash)" }} aria-hidden />
        <span className="min-w-0 flex-1 font-medium">{value}</span>
        <ChevronDown
          size={14}
          className="shrink-0 transition-transform duration-200"
          style={{
            color: "var(--ash)",
            transform: open ? "rotate(180deg)" : "rotate(0deg)",
          }}
          aria-hidden
        />
      </button>

      {open && (
        <ul
          role="listbox"
          aria-label="Regions"
          className="absolute top-[calc(100%+8px)] right-0 z-20 w-full overflow-hidden rounded-2xl border p-2 shadow-[0_20px_50px_rgba(0,0,0,0.35)]"
          style={{
            borderColor: "var(--line)",
            background: "var(--ink-2)",
          }}
        >
          {REGIONS_WITH_LANES.map((r) => {
            const selected = r === value;
            return (
              <li key={r} role="option" aria-selected={selected}>
                <button
                  type="button"
                  onClick={() => {
                    onChange(r);
                    setOpen(false);
                  }}
                  className={`flex w-full items-center justify-between gap-3 rounded-xl px-3.5 py-2.5 text-left text-sm transition-colors ${
                    selected
                      ? "font-medium text-[var(--bone)]"
                      : "text-[var(--ash)] hover:bg-[var(--surface-tint-2)] hover:text-[var(--bone)]"
                  }`}
                  style={selected ? { background: "var(--cargo-tint-10)" } : undefined}
                >
                  <span className="font-medium">{r}</span>
                  {selected && <Check size={14} style={{ color: "var(--cargo)" }} aria-hidden />}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

export function TransitTimeTable() {
  const [region, setRegion] = useState<Route["region"]>(REGIONS_WITH_LANES[0]!);
  const [visibleRows, setVisibleRows] = useState<boolean[]>([]);

  const lanes = useMemo(
    () => ROUTES.filter((r) => r.region === region),
    [region],
  );

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduced) {
      setVisibleRows(new Array(lanes.length).fill(true));
      return;
    }

    setVisibleRows(new Array(lanes.length).fill(false));
    const timeouts = lanes.map((_, index) =>
      window.setTimeout(() => {
        setVisibleRows((prev) => {
          const next = [...prev];
          next[index] = true;
          return next;
        });
      }, index * ROW_STAGGER_MS),
    );

    return () => timeouts.forEach(window.clearTimeout);
  }, [region, lanes]);

  return (
    <section className="pb-16 pt-4" style={{ background: "transparent" }}>
      <div className="site-gutter">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="f-display text-3xl">{region}</h2>
          <RegionFilter value={region} onChange={setRegion} />
        </div>
        <div
          className="overflow-hidden rounded-2xl border"
          style={{ borderColor: "var(--line)", background: "var(--ink)" }}
        >
          <div
            className="caption hidden grid-cols-5 items-center gap-4 border-b p-5 text-center md:grid"
            style={{ borderColor: "var(--line-2)", color: "var(--ash)" }}
          >
            <div>ORIGIN → DESTINATION</div>
            <div>MODE</div>
            <div>TRANSIT</div>
            <div>FREQUENCY</div>
            <div>FROM</div>
          </div>
          {lanes.map((r, index) => {
            const visible = visibleRows[index] ?? false;

            return (
              <Link
                key={r.slug}
                href={`/routes/${r.slug}`}
                className="grid grid-cols-1 items-center gap-4 border-b p-5 text-center last:border-b-0 hover:bg-[var(--surface-tint-2)] md:grid-cols-5"
                style={{
                  borderColor: "var(--line-2)",
                  opacity: visible ? 1 : 0,
                  transform: visible ? "translateY(0)" : "translateY(-20px)",
                  transition: ROW_TRANSITION,
                }}
              >
                <div className="m-data-table-cell text-sm">
                  <span className="font-medium">
                    {r.fromCity} → {r.toCity}
                  </span>
                  <div className="caption mt-1 text-[10px]" style={{ color: "var(--ash)" }}>
                    {r.fromCode} → {r.toCode}
                  </div>
                </div>
                <div className="m-data-table-cell">
                  <span
                    className="f-mono text-xs tracking-wide uppercase"
                    style={{ color: r.mode === "Air" ? "var(--cargo)" : "var(--brass)" }}
                  >
                    {r.mode}
                  </span>
                </div>
                <div className="f-mono text-sm">{r.days} days</div>
                <div className="f-mono text-sm" style={{ color: "var(--ash)" }}>
                  {r.freqWeekly}× / week
                </div>
                <div className="f-display tabular text-base md:text-lg" style={{ color: "var(--cargo)" }}>
                  {formatINR(r.rate)}
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
