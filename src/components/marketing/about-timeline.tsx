"use client";

import { useEffect, useRef, useState } from "react";
import { TruckSvg } from "@/components/shared/svg";
import { TIMELINE } from "@/server/db/seed/timeline";

export function AboutTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const container = containerRef.current;
      const logo = logoRef.current;
      if (!container) return;

      setRotation(window.scrollY * 0.8);

      if (!logo || !window.matchMedia("(min-width: 1024px)").matches) {
        setActiveIndex(null);
        return;
      }

      const truckCenterY = logo.getBoundingClientRect().top + logo.getBoundingClientRect().height / 2;
      const rows = container.querySelectorAll<HTMLElement>(".timeline-row");

      let closestIndex = -1;
      let closestDistance = Infinity;

      rows.forEach((row, index) => {
        const rowRect = row.getBoundingClientRect();
        const rowCenterY = rowRect.top + rowRect.height / 2;
        const distance = Math.abs(rowCenterY - truckCenterY);
        if (distance < closestDistance) {
          closestDistance = distance;
          closestIndex = index;
        }
      });

      const closestRow = rows[closestIndex];
      const rowHeight = closestRow?.getBoundingClientRect().height ?? 0;
      const aligned = closestIndex >= 0 && closestDistance < rowHeight * 0.4;

      setActiveIndex(aligned ? closestIndex : null);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  return (
    <section className="py-32">
      <div className="site-gutter">
        <h2 className="f-display mb-16 text-[56px] leading-[0.95] tracking-tight md:text-[80px]">
          Nine years,
          <br />
          <span className="f-display-it" style={{ color: "var(--brass)" }}>
            one notebook.
          </span>
        </h2>
        <div ref={containerRef} className="relative grid gap-0 lg:grid-cols-12">
          {/* Sticky truck — vertically centered in viewport, aligned to row midlines */}
          <div className="pointer-events-none hidden lg:col-span-2 lg:block">
            <div className="sticky top-1/2 flex -translate-y-1/2 justify-center py-8">
              <div ref={logoRef}>
                <TruckSvg
                  className="h-[5.5rem] w-[11rem] filter drop-shadow-md"
                  wheelRotation={rotation}
                />
              </div>
            </div>
          </div>

          {/* Timeline rows — each row tall enough to meet the truck at viewport center */}
          <div className="flex flex-col gap-5 lg:col-span-10">
            {TIMELINE.map((t, idx) => {
              const isVisible = activeIndex === idx;
              const isHighlighted = activeIndex === null || activeIndex === idx;
              return (
                <div
                  key={t.year}
                  className="timeline-row relative min-h-0 overflow-hidden rounded-2xl transition-all duration-700 ease-out max-lg:!translate-y-0 max-lg:!opacity-100 max-lg:!blur-none lg:min-h-[42vh]"
                  style={{
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible ? "translateY(0)" : "translateY(16px)",
                    filter: isVisible ? "blur(0)" : "blur(4px)",
                    pointerEvents: isVisible ? "auto" : "none",
                  }}
                >
                  <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{
                      backgroundImage: `url(${t.image})`,
                      filter: "grayscale(15%) contrast(95%)",
                    }}
                    aria-hidden="true"
                  />
                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(105deg, rgba(10,10,12,0.92) 0%, rgba(10,10,12,0.78) 45%, rgba(10,10,12,0.45) 100%)",
                    }}
                    aria-hidden="true"
                  />

                  <div className="relative z-10 flex flex-col justify-center gap-4 px-8 py-12 md:px-10 md:py-14 lg:gap-6 lg:px-12 lg:py-16">
                    <div
                      className="f-display tabular text-5xl transition-colors duration-500 md:text-6xl"
                      style={{ color: isHighlighted ? "var(--cargo)" : "var(--ash)" }}
                    >
                      {t.year}
                    </div>
                    <div
                      className="f-display text-3xl leading-tight transition-colors duration-500 md:text-4xl lg:text-[2.75rem]"
                      style={{ color: isHighlighted ? "#f8fafc" : "var(--ash)" }}
                    >
                      {t.title}
                    </div>
                    <div
                      className="max-w-3xl text-lg leading-relaxed transition-colors duration-500 md:text-xl md:leading-relaxed"
                      style={{ color: isHighlighted ? "rgba(248,250,252,0.82)" : "var(--ash-dim)" }}
                    >
                      {t.body}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
