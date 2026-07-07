"use client";

import { useEffect, useRef, useState } from "react";

const CARD_TRANSITION =
  "transform 1000ms cubic-bezier(0.22, 1, 0.36, 1), opacity 800ms cubic-bezier(0.22, 1, 0.36, 1)";

export function DocumentsSectionVisual({ imageSrc }: { imageSrc: string }) {
  const [active, setActive] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setActive(true);
      return;
    }

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          window.requestAnimationFrame(() => setActive(true));
          obs.disconnect();
        }
      },
      { threshold: 0.2 },
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={rootRef}
      className="relative mx-auto w-full max-w-md overflow-visible py-4 lg:mx-0 lg:max-w-none"
    >
      <div
        className="absolute inset-3 rounded-2xl border md:inset-4"
        style={{
          borderColor: "var(--line)",
          background: "var(--surface-tint-2)",
          opacity: active ? 1 : 0,
          transform: active
            ? "translate(0, 0) rotate(-6deg) scale(1)"
            : "translate(36px, -28px) rotate(5deg) scale(0.96)",
          transition: CARD_TRANSITION,
        }}
        aria-hidden
      />
      <div
        className="relative overflow-hidden rounded-2xl border shadow-[0_24px_60px_rgba(0,0,0,0.18)]"
        style={{
          borderColor: "var(--line)",
          background: "var(--ink)",
          transform: active
            ? "translate(0, 0) rotate(3deg) scale(1)"
            : "translate(-36px, 28px) rotate(-5deg) scale(0.96)",
          transition: `${CARD_TRANSITION}, box-shadow 1000ms cubic-bezier(0.22, 1, 0.36, 1)`,
          transitionDelay: active ? "90ms" : "0ms",
        }}
      >
        <img src={imageSrc} alt="" className="aspect-[4/3] h-full w-full object-cover" />
      </div>
    </div>
  );
}
