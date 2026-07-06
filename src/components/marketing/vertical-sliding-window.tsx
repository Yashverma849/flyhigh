"use client";

import { useCallback, useEffect, useRef } from "react";

export type SlidingWindowItem = {
  n: string;
  title?: string;
  body: string;
  image?: string;
};

type Props = {
  items: SlidingWindowItem[];
  direction: "up" | "down";
  className?: string;
};

const SCROLL_SPEED = 0.6;

function normalizeWheelDelta(delta: number, deltaMode: number, containerHeight: number): number {
  if (delta === 0) return 0;

  switch (deltaMode) {
    case WheelEvent.DOM_DELTA_LINE:
      return delta * 28;
    case WheelEvent.DOM_DELTA_PAGE:
      return delta * containerHeight * 0.85;
    default:
      return delta * 1.1;
  }
}

export function VerticalSlidingWindow({ items, direction, className = "" }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const pausedRef = useRef(false);
  const scrollPosRef = useRef(0);
  const loopHeightRef = useRef(0);
  const rafRef = useRef<number | null>(null);
  const activeRef = useRef(false);

  const measure = useCallback(() => {
    const el = containerRef.current;
    if (!el) return 0;
    const loop = el.scrollHeight / 2;
    loopHeightRef.current = loop;
    return loop;
  }, []);

  const stopLoop = useCallback(() => {
    activeRef.current = false;
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
  }, []);

  const startLoop = useCallback(() => {
    const el = containerRef.current;
    if (!el) return;

    const loop = measure();
    if (loop <= el.clientHeight) return;

    if (direction === "down" && scrollPosRef.current === 0) {
      scrollPosRef.current = loop;
      el.scrollTop = loop;
    }

    if (activeRef.current) return;
    activeRef.current = true;

    const step = () => {
      if (!activeRef.current) return;

      const node = containerRef.current;
      const loopHeight = loopHeightRef.current;

      if (node && !pausedRef.current && loopHeight > node.clientHeight) {
        if (direction === "up") {
          scrollPosRef.current += SCROLL_SPEED;
          if (scrollPosRef.current >= loopHeight) scrollPosRef.current = 0;
        } else {
          scrollPosRef.current -= SCROLL_SPEED;
          if (scrollPosRef.current <= 0) scrollPosRef.current = loopHeight;
        }
        node.scrollTop = scrollPosRef.current;
      }

      rafRef.current = requestAnimationFrame(step);
    };

    rafRef.current = requestAnimationFrame(step);
  }, [direction, measure]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      pausedRef.current = true;
      return;
    }

    const init = () => {
      measure();
      startLoop();
    };

    init();
    const frame = requestAnimationFrame(init);

    const handleWheel = (e: WheelEvent) => {
      pausedRef.current = true;

      const loop = loopHeightRef.current;
      if (loop <= el.clientHeight) return;

      const delta = normalizeWheelDelta(e.deltaY, e.deltaMode, el.clientHeight);
      if (delta === 0) return;

      const maxScroll = loop * 2 - el.clientHeight;
      const next = Math.min(maxScroll, Math.max(0, el.scrollTop + delta));
      if (Math.abs(next - el.scrollTop) < 1) return;

      e.preventDefault();
      e.stopPropagation();
      el.scrollTop = next;
      scrollPosRef.current = next % loop;
    };

    el.addEventListener("wheel", handleWheel, { passive: false });

    const observer = new ResizeObserver(() => {
      measure();
      if (!activeRef.current) startLoop();
    });
    observer.observe(el);
    const track = el.firstElementChild;
    if (track) observer.observe(track);

    return () => {
      cancelAnimationFrame(frame);
      el.removeEventListener("wheel", handleWheel);
      observer.disconnect();
      stopLoop();
    };
  }, [items.length, direction, measure, startLoop, stopLoop]);

  const handleMouseEnter = () => {
    pausedRef.current = true;
  };

  const handleMouseLeave = () => {
    const el = containerRef.current;
    if (el) {
      const loop = loopHeightRef.current;
      scrollPosRef.current = loop > 0 ? el.scrollTop % loop : el.scrollTop;
    }
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!prefersReduced) pausedRef.current = false;
  };

  const handleScroll = () => {
    if (!pausedRef.current) return;
    const el = containerRef.current;
    if (el) scrollPosRef.current = el.scrollTop;
  };

  const duplicated = [...items, ...items];

  return (
    <div
      ref={containerRef}
      onPointerEnter={handleMouseEnter}
      onPointerLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onScroll={handleScroll}
      className={`no-scrollbar relative min-h-0 overflow-y-auto ${className}`}
      style={{
        border: "1px solid var(--line)",
        borderRadius: "1rem",
        height: "min(58vh, 560px)",
      }}
    >
      <div className="flex flex-col gap-3 p-2.5 sm:gap-4 sm:p-3">
        {duplicated.map((item, i) => (
          <article
            key={`${item.n}-${i}`}
            className="shrink-0 overflow-hidden"
            style={{
              border: "1px solid var(--line)",
              borderRadius: i % items.length === 1 ? "0 0 1.25rem 0" : "0.625rem",
              background: "var(--surface-tint-2)",
            }}
          >
            <div
              className="relative w-full overflow-hidden"
              style={{
                aspectRatio: "16/10",
                background: "var(--ink-2)",
                borderBottom: "1px solid var(--line)",
              }}
            >
              {item.image ? (
                <img
                  src={item.image}
                  alt=""
                  className="h-full w-full object-cover"
                  style={{ filter: "grayscale(12%) contrast(96%)" }}
                  draggable={false}
                />
              ) : null}
            </div>

            <div className="grid grid-cols-[2rem_1fr] gap-2 p-3 sm:grid-cols-[2.5rem_1fr] sm:gap-3 sm:p-4">
              <span className="f-mono text-[10px] tracking-widest sm:text-xs" style={{ color: "var(--cargo)" }}>
                {item.n}
              </span>
              <div>
                {item.title && <div className="mb-1 text-sm font-semibold sm:text-base">{item.title}</div>}
                <p
                  className="text-xs leading-relaxed sm:text-sm"
                  style={{ color: item.title ? "var(--ash)" : undefined }}
                >
                  {item.body}
                </p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
