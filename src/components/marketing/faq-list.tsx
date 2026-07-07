"use client";

import { useEffect, useRef, useState } from "react";
import { SectionLabel } from "@/components/shared/section-label";
import { FAQS, FAQ_CATEGORIES } from "@/server/db/seed/faqs";

const SLIDE_TRANSITION =
  "opacity 550ms cubic-bezier(0.22, 1, 0.36, 1), transform 550ms cubic-bezier(0.22, 1, 0.36, 1)";

function slideStyle(visible: boolean) {
  return {
    opacity: visible ? 1 : 0,
    transform: visible ? "translateX(0)" : "translateX(-56px)",
    transition: SLIDE_TRANSITION,
  } as const;
}

export function FaqList() {
  const itemRefs = useRef<Map<string, HTMLElement>>(new Map());
  const [visibleKeys, setVisibleKeys] = useState<Set<string>>(new Set());

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const observers: IntersectionObserver[] = [];

    itemRefs.current.forEach((el, key) => {
      const staggerMatch = key.match(/-(\d+)$/);
      const staggerIndex = staggerMatch ? Number.parseInt(staggerMatch[1]!, 10) : 0;

      const obs = new IntersectionObserver(
        ([entry]) => {
          if (!entry?.isIntersecting) return;

          const reveal = () => {
            setVisibleKeys((prev) => {
              if (prev.has(key)) return prev;
              const next = new Set(prev);
              next.add(key);
              return next;
            });
          };

          if (prefersReduced) {
            reveal();
          } else {
            window.setTimeout(reveal, staggerIndex * 70);
          }

          obs.disconnect();
        },
        { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
      );

      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((observer) => observer.disconnect());
  }, []);

  const setRef = (key: string) => (el: HTMLElement | null) => {
    if (el) itemRefs.current.set(key, el);
    else itemRefs.current.delete(key);
  };

  return (
    <>
      {FAQ_CATEGORIES.map((cat) => {
        const items = FAQS.filter((f) => f.category === cat);
        if (items.length === 0) return null;

        const headerKey = `cat-${cat}`;

        return (
          <div key={cat} className="mb-12">
            <div
              ref={setRef(headerKey)}
              className="mb-6 flex flex-wrap items-center justify-between gap-3"
              style={slideStyle(visibleKeys.has(headerKey))}
            >
              <SectionLabel>{cat.toUpperCase()}</SectionLabel>
              <span className="caption" style={{ color: "var(--ash)" }}>
                {items.length} questions
              </span>
            </div>
            <div className="space-y-3">
              {items.map((f, i) => {
                const itemKey = `${cat}-${i}`;

                return (
                  <details
                    key={f.q}
                    ref={setRef(itemKey)}
                    className="rounded-2xl p-6"
                    style={{
                      border: "1px solid var(--line)",
                      background: "var(--ink)",
                      ...slideStyle(visibleKeys.has(itemKey)),
                    }}
                  >
                    <summary className="cursor-pointer pr-6 font-semibold">{f.q}</summary>
                    <p className="mt-3 text-sm leading-relaxed" style={{ color: "var(--bone)" }}>
                      {f.a}
                    </p>
                  </details>
                );
              })}
            </div>
          </div>
        );
      })}
    </>
  );
}
