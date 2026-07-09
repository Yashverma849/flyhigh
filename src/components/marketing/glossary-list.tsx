"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Check, ChevronDown, Filter } from "lucide-react";
import { SectionLabel } from "@/components/shared/section-label";
import {
  GLOSSARY,
  GLOSSARY_CATEGORIES,
  type GlossaryCategory,
  type GlossaryEntry,
} from "@/server/db/seed/glossary";

type FilterValue = "all" | GlossaryCategory;

const FILTER_OPTIONS: { value: FilterValue; label: string }[] = [
  { value: "all", label: "All terms" },
  ...GLOSSARY_CATEGORIES.map((category) => ({ value: category, label: category })),
];

const SCROLL_SPEED = 0.4;

function termAnchor(term: string) {
  return term.toLowerCase().replace(/[^a-z0-9]/g, "-");
}

function normalizeWheelDelta(delta: number, deltaMode: number, containerWidth: number): number {
  if (delta === 0) return 0;

  switch (deltaMode) {
    case WheelEvent.DOM_DELTA_LINE:
      return delta * 32;
    case WheelEvent.DOM_DELTA_PAGE:
      return delta * containerWidth * 0.85;
    default:
      return delta * 1.15;
  }
}

function getHorizontalWheelDelta(e: WheelEvent, containerWidth: number): number {
  const deltaX = normalizeWheelDelta(e.deltaX, e.deltaMode, containerWidth);
  const deltaY = normalizeWheelDelta(e.deltaY, e.deltaMode, containerWidth);
  return deltaX + deltaY;
}

function getEntriesForFilter(filter: FilterValue): GlossaryEntry[] {
  const entries =
    filter === "all"
      ? [...GLOSSARY]
      : GLOSSARY.filter((entry) => entry.category === filter);

  return entries.sort((a, b) => a.term.localeCompare(b.term));
}

function GlossaryCategoryFilter({
  value,
  onChange,
}: {
  value: FilterValue;
  onChange: (value: FilterValue) => void;
}) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  const selected = FILTER_OPTIONS.find((option) => option.value === value);

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
    <div ref={rootRef} className="relative w-full sm:ml-auto sm:w-auto sm:min-w-[260px]">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label="Filter glossary by category"
        className="flex w-full items-center gap-2.5 rounded-2xl border px-4 py-3 text-left text-sm transition-all"
        style={{
          borderColor: open ? "var(--cargo)" : "var(--line)",
          background: open ? "var(--cargo-tint-4)" : "var(--ink)",
          color: "var(--bone)",
        }}
      >
        <Filter size={14} className="shrink-0" style={{ color: "var(--ash)" }} aria-hidden />
        <span className="min-w-0 flex-1 font-medium">{selected?.label ?? "All terms"}</span>
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
          aria-label="Glossary categories"
          className="absolute top-[calc(100%+8px)] right-0 z-20 max-h-[min(360px,60vh)] w-full min-w-[260px] overflow-y-auto rounded-2xl border p-2 shadow-[0_20px_50px_rgba(0,0,0,0.35)]"
          style={{
            borderColor: "var(--line)",
            background: "var(--ink-2)",
          }}
        >
          {FILTER_OPTIONS.map((option) => {
            const isSelected = option.value === value;
            const count = getEntriesForFilter(option.value).length;

            return (
              <li key={option.value} role="option" aria-selected={isSelected}>
                <button
                  type="button"
                  onClick={() => {
                    onChange(option.value);
                    setOpen(false);
                  }}
                  className={`flex w-full items-center justify-between gap-3 rounded-xl px-3.5 py-2.5 text-left text-sm transition-colors ${
                    isSelected
                      ? "font-medium text-[var(--bone)]"
                      : "text-[var(--ash)] hover:bg-[var(--surface-tint-2)] hover:text-[var(--bone)]"
                  }`}
                  style={isSelected ? { background: "var(--cargo-tint-10)" } : undefined}
                >
                  <span className="font-medium">{option.label}</span>
                  <span className="flex items-center gap-2">
                    <span className="f-mono text-[10px]" style={{ color: "var(--cargo)" }}>
                      {count}
                    </span>
                    {isSelected && (
                      <Check size={14} className="shrink-0" style={{ color: "var(--cargo)" }} aria-hidden />
                    )}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

function GlossarySlideCard({ entry }: { entry: GlossaryEntry }) {
  const hasSeeAlso = Boolean(entry.see && entry.see.length > 0);

  return (
    <article
      id={termAnchor(entry.term)}
      className="flex h-[440px] w-[min(85vw,320px)] shrink-0 flex-col md:w-[360px]"
      style={{ background: "var(--ink)" }}
    >
      <header
        className="shrink-0 border-b px-6 py-4 md:px-8"
        style={{ borderColor: "var(--line)" }}
      >
        <span className="caption" style={{ color: "var(--brass)" }}>
          {entry.category.toUpperCase()}
        </span>
      </header>

      <div className="shrink-0 px-6 pt-5 md:px-8">
        <h2 className="f-display text-xl tracking-tight md:text-2xl" style={{ color: "var(--cargo)" }}>
          {entry.term}
        </h2>
        <p className="caption mt-2" style={{ color: "var(--ash)" }}>
          {entry.short}
        </p>
      </div>

      <div className="min-h-0 flex-1 overflow-hidden px-6 py-4 md:px-8">
        <p
          className="line-clamp-[7] text-sm leading-relaxed md:text-base"
          style={{ color: "var(--bone)" }}
        >
          {entry.long}
        </p>
      </div>

      <footer
        className="mt-auto shrink-0 border-t px-6 py-4 md:px-8"
        style={{ borderColor: "var(--line)", minHeight: "3.25rem" }}
      >
        {hasSeeAlso ? (
          <div className="caption" style={{ color: "var(--brass)" }}>
            SEE ALSO ·{" "}
            {entry.see!.map((s, i) => (
              <span key={s}>
                <a href={`#${termAnchor(s)}`} className="u-link">
                  {s}
                </a>
                {i < entry.see!.length - 1 && ", "}
              </span>
            ))}
          </div>
        ) : null}
      </footer>
    </article>
  );
}

export function GlossaryList() {
  const [activeFilter, setActiveFilter] = useState<FilterValue>("all");
  const wrapperRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const offsetRef = useRef(0);
  const pausedRef = useRef(false);
  const loopWidthRef = useRef(0);
  const rafRef = useRef<number | null>(null);

  const visibleEntries = getEntriesForFilter(activeFilter);
  const duplicatedEntries = [...visibleEntries, ...visibleEntries];
  const activeLabel =
    activeFilter === "all" ? "ALL TERMS" : activeFilter.toUpperCase();

  const measure = useCallback(() => {
    const track = trackRef.current;
    if (!track) return 0;
    const loop = track.scrollWidth / 2;
    loopWidthRef.current = loop;
    return loop;
  }, []);

  useEffect(() => {
    offsetRef.current = 0;
    if (trackRef.current) {
      trackRef.current.style.transform = "translate3d(0, 0, 0)";
    }
    measure();
  }, [activeFilter, measure, visibleEntries.length]);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const track = trackRef.current;
    if (!track || !wrapper || visibleEntries.length === 0) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    pausedRef.current = prefersReduced;

    measure();

    const step = () => {
      const loopWidth = loopWidthRef.current;
      if (!pausedRef.current && loopWidth > wrapper.clientWidth) {
        offsetRef.current += SCROLL_SPEED;
        if (offsetRef.current >= loopWidth) {
          offsetRef.current = 0;
        }
        track.style.transform = `translate3d(-${offsetRef.current}px, 0, 0)`;
      }
      rafRef.current = requestAnimationFrame(step);
    };

    rafRef.current = requestAnimationFrame(step);

    const handleWheel = (e: WheelEvent) => {
      const loopWidth = loopWidthRef.current;
      if (loopWidth <= wrapper.clientWidth) return;

      const delta = getHorizontalWheelDelta(e, wrapper.clientWidth);
      if (delta === 0) return;

      pausedRef.current = true;
      e.preventDefault();
      e.stopPropagation();

      const next = ((offsetRef.current + delta) % loopWidth + loopWidth) % loopWidth;
      offsetRef.current = next;
      track.style.transform = `translate3d(-${offsetRef.current}px, 0, 0)`;
    };

    wrapper.addEventListener("wheel", handleWheel, { passive: false });

    const observer = new ResizeObserver(measure);
    observer.observe(track);

    return () => {
      wrapper.removeEventListener("wheel", handleWheel);
      observer.disconnect();
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [activeFilter, measure, visibleEntries.length]);

  const handlePointerEnter = () => {
    pausedRef.current = true;
  };

  const handlePointerLeave = () => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!prefersReduced) pausedRef.current = false;
  };

  return (
    <>
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <SectionLabel>{activeLabel}</SectionLabel>
          <p className="caption mt-3" style={{ color: "var(--ash)" }}>
            {visibleEntries.length} {visibleEntries.length === 1 ? "term" : "terms"}
          </p>
        </div>
        <GlossaryCategoryFilter value={activeFilter} onChange={setActiveFilter} />
      </div>

      <div
        ref={wrapperRef}
        onPointerEnter={handlePointerEnter}
        onPointerLeave={handlePointerLeave}
        className="relative overflow-x-clip rounded-2xl"
        style={{
          border: "1px solid var(--line)",
          background: "var(--line)",
        }}
        aria-label="Glossary terms"
      >
        {visibleEntries.length === 0 ? (
          <div className="p-8 text-sm" style={{ background: "var(--ink)", color: "var(--ash)" }}>
            No terms in this category.
          </div>
        ) : (
          <div ref={trackRef} className="flex w-max gap-px will-change-transform">
            {duplicatedEntries.map((entry, i) => (
              <GlossarySlideCard key={`${entry.term}-${i}`} entry={entry} />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
