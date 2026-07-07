"use client";

import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { Check, ChevronDown, Filter } from "lucide-react";
import { HS_GROUPS, type HsCodeGroup } from "@/server/db/seed/hs-codes";

const ROW_STAGGER_MS = 120;
const ROW_TRANSITION =
  "opacity 800ms cubic-bezier(0.22, 1, 0.36, 1), transform 800ms cubic-bezier(0.22, 1, 0.36, 1)";

function ChapterFilter({
  value,
  onChange,
}: {
  value: HsCodeGroup["chapter"];
  onChange: (chapter: HsCodeGroup["chapter"]) => void;
}) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  const selected = HS_GROUPS.find((g) => g.chapter === value);

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
    <div ref={rootRef} className="relative w-full sm:ml-auto sm:w-auto sm:min-w-[280px]">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label="Filter by chapter"
        className="flex w-full items-center gap-2.5 rounded-2xl border px-4 py-3 text-left text-sm transition-all"
        style={{
          borderColor: open ? "var(--cargo)" : "var(--line)",
          background: open ? "var(--cargo-tint-4)" : "var(--ink)",
          color: "var(--bone)",
        }}
      >
        <Filter size={14} className="shrink-0" style={{ color: "var(--ash)" }} aria-hidden />
        <span className="min-w-0 flex-1 font-medium">
          {selected ? `${selected.chapter} — ${selected.title}` : value}
        </span>
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
          aria-label="Chapters"
          className="absolute top-[calc(100%+8px)] right-0 z-20 max-h-[min(360px,60vh)] w-full overflow-y-auto rounded-2xl border p-2 shadow-[0_20px_50px_rgba(0,0,0,0.35)]"
          style={{
            borderColor: "var(--line)",
            background: "var(--ink-2)",
          }}
        >
          {HS_GROUPS.map((g) => {
            const isSelected = g.chapter === value;
            return (
              <li key={g.chapter} role="option" aria-selected={isSelected}>
                <button
                  type="button"
                  onClick={() => {
                    onChange(g.chapter);
                    setOpen(false);
                  }}
                  className={`flex w-full items-start justify-between gap-3 rounded-xl px-3.5 py-2.5 text-left text-sm transition-colors ${
                    isSelected
                      ? "font-medium text-[var(--bone)]"
                      : "text-[var(--ash)] hover:bg-[var(--surface-tint-2)] hover:text-[var(--bone)]"
                  }`}
                  style={isSelected ? { background: "var(--cargo-tint-10)" } : undefined}
                >
                  <span>
                    <span className="caption block text-[10px]" style={{ color: "var(--brass)" }}>
                      {g.chapter}
                    </span>
                    <span className="font-medium">{g.title}</span>
                  </span>
                  {isSelected && (
                    <Check size={14} className="mt-0.5 shrink-0" style={{ color: "var(--cargo)" }} aria-hidden />
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

export function HsCodeTable() {
  const [chapter, setChapter] = useState<HsCodeGroup["chapter"]>(HS_GROUPS[0]!.chapter);
  const [visibleRows, setVisibleRows] = useState<boolean[]>([]);
  const [hasBeenInView, setHasBeenInView] = useState(false);
  const tableRef = useRef<HTMLDivElement>(null);

  const group = useMemo(
    () => HS_GROUPS.find((g) => g.chapter === chapter) ?? HS_GROUPS[0]!,
    [chapter],
  );

  useEffect(() => {
    const el = tableRef.current;
    if (!el) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setHasBeenInView(true);
      return;
    }

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setHasBeenInView(true);
          obs.disconnect();
        }
      },
      { threshold: 0.12 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useLayoutEffect(() => {
    if (!hasBeenInView) return;
    setVisibleRows(new Array(group.codes.length).fill(false));
  }, [chapter, hasBeenInView, group.codes.length]);

  useEffect(() => {
    if (!hasBeenInView) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setVisibleRows(new Array(group.codes.length).fill(true));
      return;
    }

    let cancelled = false;
    let frame1 = 0;
    let frame2 = 0;
    const timeouts: number[] = [];

    const startStagger = () => {
      if (cancelled) return;

      group.codes.forEach((_, index) => {
        timeouts.push(
          window.setTimeout(() => {
            if (cancelled) return;
            setVisibleRows((prev) => {
              const next =
                prev.length === group.codes.length
                  ? [...prev]
                  : new Array(group.codes.length).fill(false);
              next[index] = true;
              return next;
            });
          }, index * ROW_STAGGER_MS),
        );
      });
    };

    // Wait for the hidden state to paint before staggering rows in.
    frame1 = window.requestAnimationFrame(() => {
      frame2 = window.requestAnimationFrame(startStagger);
    });

    return () => {
      cancelled = true;
      window.cancelAnimationFrame(frame1);
      window.cancelAnimationFrame(frame2);
      timeouts.forEach(window.clearTimeout);
    };
  }, [chapter, hasBeenInView, group.codes.length]);

  return (
    <>
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <span className="caption" style={{ color: "var(--brass)" }}>
            {group.chapter}
          </span>
          <h2 className="f-display mt-1 text-2xl tracking-tight md:text-3xl">{group.title}</h2>
        </div>
        <ChapterFilter value={chapter} onChange={setChapter} />
      </div>

      <div
        ref={tableRef}
        className="overflow-hidden rounded-2xl border"
        style={{ borderColor: "var(--line)", background: "var(--ink)" }}
      >
        <div
          className="caption hidden grid-cols-3 items-center gap-4 border-b p-4 text-center md:grid"
          style={{ borderColor: "var(--line-2)", color: "var(--ash)" }}
        >
          <div>HS CODE</div>
          <div>DESCRIPTION</div>
          <div>BCD</div>
        </div>

        {group.codes.map((c, index) => {
          const visible = visibleRows[index] ?? false;

          return (
            <div
              key={`${chapter}-${c.hs}`}
              className="grid grid-cols-1 items-center gap-4 border-b p-4 text-center last:border-b-0 md:grid-cols-3"
              style={{
                borderColor: "var(--line-2)",
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(28px)",
                transition: ROW_TRANSITION,
              }}
            >
              <div className="f-mono text-sm" style={{ color: "var(--cargo)" }}>
                {c.hs}
              </div>
              <div className="text-sm">{c.desc}</div>
              <div className="f-mono text-sm">{c.bcd}</div>
            </div>
          );
        })}
      </div>
    </>
  );
}
