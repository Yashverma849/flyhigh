"use client";

import { useCallback, useEffect, useRef } from "react";

export type DestinationReference = {
  region: string;
  required: string[];
};

type Props = {
  regions: DestinationReference[];
  className?: string;
};

const SCROLL_SPEED = 0.45;

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

export function DestinationReferenceWindow({ regions, className = "" }: Props) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const offsetRef = useRef(0);
  const pausedRef = useRef(false);
  const loopWidthRef = useRef(0);
  const rafRef = useRef<number | null>(null);

  const measure = useCallback(() => {
    const track = trackRef.current;
    if (!track) return 0;
    const loop = track.scrollWidth / 2;
    loopWidthRef.current = loop;
    return loop;
  }, []);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const track = trackRef.current;
    if (!track || !wrapper) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      pausedRef.current = true;
    }

    measure();

    const step = () => {
      const loopWidth = loopWidthRef.current;
      if (!pausedRef.current && loopWidth > 0) {
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
  }, [regions.length, measure]);

  const handlePointerEnter = () => {
    pausedRef.current = true;
  };

  const handlePointerLeave = () => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!prefersReduced) pausedRef.current = false;
  };

  const duplicated = [...regions, ...regions];

  return (
    <div
      ref={wrapperRef}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      className={`relative overflow-x-clip rounded-2xl ${className}`}
      style={{
        border: "1px solid var(--line)",
        background: "var(--ink)",
      }}
      aria-label="Destination document requirements"
    >
      <div
        ref={trackRef}
        className="flex w-max gap-px will-change-transform"
        style={{ background: "var(--line)" }}
      >
        {duplicated.map((region, i) => (
          <article
            key={`${region.region}-${i}`}
            className="flex w-[min(85vw,320px)] shrink-0 flex-col p-6 md:w-[360px] md:p-8"
            style={{ background: "var(--ink)" }}
          >
            <h3 className="f-display text-xl tracking-tight md:text-2xl">{region.region}</h3>
            <ul
              className="mt-4 space-y-1.5 text-sm leading-relaxed md:text-base"
              style={{ color: "var(--ash)" }}
            >
              {region.required.map((item) => (
                <li key={item}>· {item}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </div>
  );
}
