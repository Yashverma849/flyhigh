"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { ROUTES } from "@/server/db/seed/routes";
import { formatINR } from "@/lib/utils";

export function RoutesTable() {
  const [visibleRows, setVisibleRows] = useState<boolean[]>(
    new Array(8).fill(false)
  );
  const [headerVisible, setHeaderVisible] = useState(false);
  const rowRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    // Observe each row
    rowRefs.current.forEach((el, i) => {
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry?.isIntersecting) {
            // Stagger each row by 80ms
            setTimeout(() => {
              setVisibleRows((prev) => {
                const next = [...prev];
                next[i] = true;
                return next;
              });
            }, i * 80);
            obs.disconnect();
          }
        },
        { threshold: 0.15 }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  // Header fades in after last row finishes (rows × 80ms stagger + 400ms slide)
  useEffect(() => {
    const allDone = visibleRows.every(Boolean);
    if (allDone) {
      const t = setTimeout(() => setHeaderVisible(true), 200);
      return () => clearTimeout(t);
    }
  }, [visibleRows]);

  const rows = ROUTES.slice(0, 8);

  return (
    <div
      ref={sectionRef}
      className="overflow-hidden rounded-2xl"
      style={{ border: "1px solid var(--line)", background: "var(--ink-2)" }}
    >
      {/* Table header — fades in last */}
      <div
        className="grid grid-cols-12 gap-4 border-b p-5 transition-all duration-700"
        style={{
          borderColor: "var(--line)",
          opacity: headerVisible ? 1 : 0,
          transform: headerVisible ? "translateY(0)" : "translateY(-8px)",
          color: "var(--bone)",
        }}
      >
        <div className="f-body font-extrabold col-span-3 text-center text-sm tracking-wider uppercase">Origin → Destination</div>
        <div className="f-body font-extrabold col-span-3 text-center text-sm tracking-wider uppercase">Mode</div>
        <div className="f-body font-extrabold col-span-3 text-center text-sm tracking-wider uppercase">Transit</div>
        <div className="f-body font-extrabold col-span-3 text-center text-sm tracking-wider uppercase">From</div>
      </div>

      {/* Rows — odd slide from left, even slide from right */}
      {rows.map((r, i) => {
        const isOdd = i % 2 === 0; // 0-indexed: 0,2,4... → slide from left
        const visible = visibleRows[i];

        return (
          <Link
            key={r.slug}
            ref={(el) => { rowRefs.current[i] = el; }}
            href={`/routes/${r.slug}`}
            aria-label={`${r.from} to ${r.to} freight details`}
            className="group relative grid grid-cols-12 items-center gap-4 border-b p-5 transition-colors last:border-b-0 hover:bg-[var(--surface-tint-2)]"
            style={{
              borderColor: "var(--line-2)",
              opacity: visible ? 1 : 0,
              transform: visible
                ? "translateX(0)"
                : isOdd
                ? "translateX(-80px)"
                : "translateX(80px)",
              transition:
                "opacity 500ms cubic-bezier(0.22,1,0.36,1), transform 500ms cubic-bezier(0.22,1,0.36,1)",
            }}
          >
            <div className="col-span-3 flex items-center justify-center gap-2 text-sm text-center">
              <span className="font-medium">{r.from}</span>
              <ArrowRight size={12} style={{ color: "var(--cargo)" }} className="flex-shrink-0" />
              <span className="font-medium">{r.to}</span>
            </div>
            <div className="col-span-3 text-center">
              <span className="f-mono text-xs tracking-wide" style={{ color: "var(--bone)" }}>
                {r.mode.toUpperCase()}
              </span>
            </div>
            <div className="f-mono col-span-3 text-center text-sm">{r.days} days</div>
            <div
              className="f-display tabular col-span-3 text-center text-[24px]"
              style={{ color: "var(--cargo)" }}
            >
              {formatINR(r.rate)}
            </div>
            <div className="absolute right-5 flex items-center justify-center">
              <ArrowUpRight
                size={16}
                className="opacity-0 transition-opacity group-hover:opacity-100"
              />
            </div>
          </Link>
        );
      })}
    </div>
  );
}
