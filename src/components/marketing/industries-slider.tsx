"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { INDUSTRIES } from "@/server/db/seed/industries";

const SLIDES = INDUSTRIES.slice(0, 8);
const AUTO_INTERVAL = 5000;

export function IndustriesSlider() {
  const [current, setCurrent] = useState(0);
  const [prev, setPrev] = useState<number | null>(null);
  const [direction, setDirection] = useState<"next" | "prev">("next");
  const [animating, setAnimating] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const goto = useCallback(
    (idx: number, dir: "next" | "prev") => {
      if (animating) return;
      setDirection(dir);
      setPrev(current);
      setCurrent(idx);
      setAnimating(true);
      setTimeout(() => {
        setPrev(null);
        setAnimating(false);
      }, 620);
    },
    [animating, current]
  );

  const next = useCallback(() => {
    goto((current + 1) % SLIDES.length, "next");
  }, [current, goto]);

  const goBack = useCallback(() => {
    goto((current - 1 + SLIDES.length) % SLIDES.length, "prev");
  }, [current, goto]);

  // Auto-advance
  useEffect(() => {
    timerRef.current = setTimeout(next, AUTO_INTERVAL);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [current, next]);

  const slide = SLIDES[current]!;
  const prevSlide = prev !== null ? SLIDES[prev] : null;

  // Animation keyframes via inline styles
  const enterStyle: React.CSSProperties = {
    animation: animating
      ? `industries-enter-${direction} 620ms cubic-bezier(0.22,1,0.36,1) forwards`
      : "none",
  };
  const exitStyle: React.CSSProperties = {
    animation: animating && prevSlide
      ? `industries-exit-${direction} 620ms cubic-bezier(0.22,1,0.36,1) forwards`
      : "none",
    position: "absolute",
    inset: 0,
  };

  return (
    <div className="relative w-full overflow-hidden rounded-2xl" style={{ border: "1px solid var(--line)" }}>
      {/* Keyframe injector */}
      <style>{`
        @keyframes industries-enter-next {
          from { opacity: 0; transform: translateX(60px) rotate(1.5deg); }
          to   { opacity: 1; transform: translateX(0)   rotate(0deg); }
        }
        @keyframes industries-exit-next {
          from { opacity: 1; transform: translateX(0)    rotate(0deg); }
          to   { opacity: 0; transform: translateX(-60px) rotate(-1.5deg); }
        }
        @keyframes industries-enter-prev {
          from { opacity: 0; transform: translateX(-60px) rotate(-1.5deg); }
          to   { opacity: 1; transform: translateX(0)     rotate(0deg); }
        }
        @keyframes industries-exit-prev {
          from { opacity: 1; transform: translateX(0)    rotate(0deg); }
          to   { opacity: 0; transform: translateX(60px) rotate(1.5deg); }
        }
      `}</style>

      {/* Slide area */}
      <div className="relative" style={{ minHeight: "420px" }}>

        {/* Exiting slide */}
        {prevSlide && (
          <div
            key={`prev-${prev}`}
            className="pointer-events-none flex"
            style={exitStyle}
          >
            <SlideCard industry={prevSlide} />
          </div>
        )}

        {/* Entering slide */}
        <div
          key={`slide-${current}`}
          className="flex"
          style={enterStyle}
        >
          <SlideCard industry={slide} />
        </div>
      </div>

      {/* Controls bar */}
      <div
        className="flex items-center justify-between border-t px-6 py-4"
        style={{ borderColor: "var(--line)", background: "var(--ink-2)" }}
      >
        {/* Dot indicators */}
        <div className="flex items-center gap-2">
          {SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => goto(i, i > current ? "next" : "prev")}
              className="transition-all duration-300"
              style={{
                width: i === current ? "24px" : "6px",
                height: "6px",
                borderRadius: "3px",
                background: i === current ? "var(--cargo)" : "var(--line)",
              }}
              aria-label={`Go to ${SLIDES[i]!.name}`}
            />
          ))}
        </div>

        {/* Counter + arrows */}
        <div className="flex items-center gap-4">
          <span className="f-mono text-xs" style={{ color: "var(--ash)" }}>
            {String(current + 1).padStart(2, "0")} / {String(SLIDES.length).padStart(2, "0")}
          </span>
          <button
            onClick={goBack}
            className="flex h-9 w-9 items-center justify-center rounded-full border transition-all duration-300 hover:border-cargo hover:bg-cargo hover:text-white"
            style={{ borderColor: "var(--line)", color: "var(--bone)" }}
            aria-label="Previous industry"
          >
            <ChevronLeft size={16} />
          </button>
          <button
            onClick={next}
            className="flex h-9 w-9 items-center justify-center rounded-full border transition-all duration-300 hover:border-cargo hover:bg-cargo hover:text-white"
            style={{ borderColor: "var(--line)", color: "var(--bone)" }}
            aria-label="Next industry"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}

function SlideCard({ industry: ind }: { industry: (typeof SLIDES)[number] }) {
  return (
    <div className="flex w-full flex-col md:flex-row" style={{ minHeight: "420px" }}>
      {/* Image panel */}
      <div
        className="relative flex-shrink-0 overflow-hidden md:w-1/2"
        style={{ minHeight: "240px" }}
      >
        <img
          src={ind.image}
          alt={ind.name}
          className="absolute inset-0 h-full w-full object-cover"
          style={{ filter: "grayscale(15%) contrast(105%)" }}
        />
        {/* Gradient overlay */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to right, transparent 60%, var(--ink-2) 100%), linear-gradient(to top, var(--ink-2) 0%, transparent 40%)",
          }}
        />
        {/* Tag */}
        <span
          className="f-mono absolute left-5 top-5 rounded px-2 py-1 text-[11px] tracking-widest"
          style={{ background: "var(--ink)/80", color: "var(--cargo)", border: "1px solid var(--cargo)" }}
        >
          {ind.tag}
        </span>
      </div>

      {/* Content panel */}
      <div
        className="flex flex-1 flex-col justify-between p-8 md:p-10"
        style={{ background: "var(--ink-2)" }}
      >
        <div>
          <h3
            className="f-display mb-4 text-[28px] leading-tight md:text-[34px]"
            style={{ color: "var(--bone)" }}
          >
            {ind.name}
          </h3>
          <p className="mb-6 text-sm font-bold leading-relaxed md:text-base" style={{ color: "var(--ash)" }}>
            {ind.short}
          </p>
          <p className="text-sm leading-relaxed" style={{ color: "var(--ash)" }}>
            {ind.desc}
          </p>
        </div>

        {/* Stats row */}
        <div className="mt-8 flex flex-wrap gap-6 border-t pt-6" style={{ borderColor: "var(--line)" }}>
          {ind.stats.slice(0, 3).map((stat) => (
            <div key={stat.l}>
              <div className="f-display text-[22px] leading-none" style={{ color: "var(--cargo)" }}>
                {stat.v}
              </div>
              <div className="f-mono mt-1 text-[10px] tracking-widest" style={{ color: "var(--ash)" }}>
                {stat.l}
              </div>
            </div>
          ))}
          <Link
            href={`/industries/${ind.slug}`}
            className="ml-auto flex items-center gap-1.5 self-end text-xs transition-colors"
            style={{ color: "var(--cargo)" }}
          >
            Learn more <ArrowRight size={12} />
          </Link>
        </div>
      </div>
    </div>
  );
}
