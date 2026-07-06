"use client";

import { useEffect, useRef, useState } from "react";
import { TruckSvg } from "@/components/shared/svg";
import { TIMELINE } from "@/server/db/seed/timeline";

export function AboutTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const truckColumnRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [maxReachedIndex, setMaxReachedIndex] = useState(0);
  const [isDesktop, setIsDesktop] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [truckY, setTruckY] = useState(0);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const updateViewport = () => setIsDesktop(mq.matches);
    updateViewport();
    mq.addEventListener("change", updateViewport);
    return () => mq.removeEventListener("change", updateViewport);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const container = containerRef.current;
      if (!container) return;

      setRotation(window.scrollY * 0.8);

      const viewportCenterY = window.innerHeight / 2;
      const containerRect = container.getBoundingClientRect();

      // Reset when timeline is scrolled completely out/below viewport
      if (containerRect.top > viewportCenterY) {
        setMaxReachedIndex(0);
        setActiveIndex(0);
        setTruckY(0);
        return;
      }

      const rows = container.querySelectorAll<HTMLElement>(".timeline-row");
      
      // Calculate truck Y position relative to container
      const truckHeight = 176; // 11rem in pixels (approx height of truck wrapper)
      const totalRange = Math.max(1, containerRect.height - truckHeight);
      const currentOffset = viewportCenterY - containerRect.top;
      const progress = Math.min(1, Math.max(0, currentOffset / totalRange));
      setTruckY(progress * (containerRect.height - truckHeight));

      let closestIndex = 0;
      let closestDistance = Infinity;
      let maxIdx = 0;

      rows.forEach((row, index) => {
        const rowRect = row.getBoundingClientRect();
        const rowCenterY = rowRect.top + rowRect.height / 2;
        
        const distance = Math.abs(rowCenterY - viewportCenterY);
        if (distance < closestDistance) {
          closestDistance = distance;
          closestIndex = index;
        }

        if (rowRect.top <= viewportCenterY) {
          maxIdx = Math.max(maxIdx, index);
        }
      });

      setActiveIndex(closestIndex);
      setMaxReachedIndex((prev) => Math.max(prev, maxIdx));
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [isDesktop]);

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
          {/* Truck column — fixed absolute track while timeline scrolls */}
          <div
            ref={truckColumnRef}
            className="pointer-events-none hidden lg:col-span-2 lg:block relative"
          >
            {/* The vertical timeline track line */}
            <div
              className="absolute left-1/2 top-4 bottom-4 w-px -translate-x-1/2"
              style={{
                background: "linear-gradient(to bottom, var(--line) 0%, var(--brass) 15%, var(--brass) 85%, var(--line) 100%)",
                opacity: 0.5
              }}
            />
            <div
              className="absolute left-1/2 top-0"
              style={{
                transform: `translate3d(-50%, ${truckY}px, 0)`,
              }}
            >
              <TruckSvg
                className="h-[11rem] w-[5.5rem] filter drop-shadow-md"
                wheelRotation={rotation}
              />
            </div>
          </div>

          {/* Timeline rows — each row tall enough to meet the truck at viewport center */}
          <div className="flex flex-col gap-5 lg:col-span-10">
            {TIMELINE.map((t, idx) => {
              const isVisible = !isDesktop || idx <= maxReachedIndex;
              const isHighlighted = !isDesktop || activeIndex === idx;
              return (
                <div
                  key={t.year}
                  className="timeline-row relative min-h-0 overflow-hidden rounded-2xl transition-all duration-700 ease-out lg:min-h-[42vh]"
                  style={
                    isDesktop
                      ? {
                          opacity: isVisible ? 1 : 0,
                          transform: isVisible ? "translateY(0)" : "translateY(16px)",
                          filter: isVisible ? "blur(0)" : "blur(4px)",
                          pointerEvents: isVisible ? "auto" : "none",
                        }
                      : undefined
                  }
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
