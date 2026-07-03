"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import { SERVICES } from "@/server/db/seed/services";

export function ServicesSlider() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  const checkScroll = () => {
    if (containerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = containerRef.current;
      setCanScrollLeft(scrollLeft > 5);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 5);
    }
  };

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener("scroll", checkScroll);
      checkScroll();
      window.addEventListener("resize", checkScroll);
    }
    return () => {
      if (container) {
        container.removeEventListener("scroll", checkScroll);
      }
      window.removeEventListener("resize", checkScroll);
    };
  }, []);

  useEffect(() => {
    if (isHovered) return;

    const interval = setInterval(() => {
      if (containerRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = containerRef.current;
        const firstChild = containerRef.current.children[0] as HTMLElement;
        const cardWidth = firstChild ? firstChild.clientWidth + 24 : clientWidth * 0.45;

        if (scrollLeft >= scrollWidth - clientWidth - 10) {
          containerRef.current.scrollTo({
            left: 0,
            behavior: "smooth",
          });
        } else {
          containerRef.current.scrollBy({
            left: cardWidth,
            behavior: "smooth",
          });
        }
      }
    }, 4000);

    return () => clearInterval(interval);
  }, [isHovered]);

  const scroll = (direction: "left" | "right") => {
    if (containerRef.current) {
      const { clientWidth } = containerRef.current;
      const scrollAmount = direction === "left" ? -clientWidth * 0.75 : clientWidth * 0.75;
      containerRef.current.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div 
      className="relative w-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Slider controls positioned in top right of section parent (positioned relative to section header container) */}
      <div className="absolute -top-24 right-4 z-20 flex items-center gap-3 md:right-8">
        <button
          onClick={() => scroll("left")}
          disabled={!canScrollLeft}
          className={`flex h-11 w-11 items-center justify-center rounded-full border transition-all duration-300 ${
            canScrollLeft
              ? "border-brass text-bone hover:bg-cargo hover:border-cargo hover:text-white"
              : "border-line text-ash opacity-40 cursor-not-allowed"
          }`}
          aria-label="Previous services"
        >
          <ChevronLeft size={20} />
        </button>
        <button
          onClick={() => scroll("right")}
          disabled={!canScrollRight}
          className={`flex h-11 w-11 items-center justify-center rounded-full border transition-all duration-300 ${
            canScrollRight
              ? "border-brass text-bone hover:bg-cargo hover:border-cargo hover:text-white"
              : "border-line text-ash opacity-40 cursor-not-allowed"
          }`}
          aria-label="Next services"
        >
          <ChevronRight size={20} />
        </button>
      </div>

      {/* Horizontal Sliding Window Container */}
      <div
        ref={containerRef}
        className="no-scrollbar flex w-full gap-6 overflow-x-auto pb-8 snap-x snap-mandatory scroll-smooth"
        style={{ paddingLeft: "1px", paddingRight: "1px" }}
      >
        {SERVICES.map((s, i) => {
          // Odd: index 0, 2, 4 (fade-down)
          // Even: index 1, 3, 5 (fade-up)
          const isOdd = i % 2 === 0;
          const animationClass = isOdd ? "fade-down" : "fade-up";

          return (
            <Link
              key={s.id}
              href={`/services/${s.slug}`}
              className={`tile group lift block p-8 text-left snap-start shrink-0 w-[85vw] md:w-[45vw] lg:w-[30vw] min-w-[280px] select-none relative overflow-hidden ${animationClass}`}
              style={{
                background: "var(--ink)",
                animationDelay: `${i * 0.15}s`,
              }}
              data-cursor={`OPEN ${s.tag}`}
            >
              {/* Background Image on Hover */}
              <div 
                className="absolute inset-0 bg-cover bg-center transition-all duration-700 ease-in-out opacity-0 group-hover:opacity-[0.85] pointer-events-none z-0 scale-100 group-hover:scale-[1.04]"
                style={{
                  backgroundImage: `url(${[
                    "/services_ocean_1783068767313.png",
                    "/services_air_1783068810326.png",
                    "/services_borders_1783068829815.png",
                    "/services_storage_1783068868308.png",
                    "/services_ground_1783068889262.png",
                    "/services_cabinet_1783068927669.png"
                  ][i]})`,
                  filter: "grayscale(10%) contrast(95%)",
                }}
              />

              {/* Dark Overlay Filter on Hover to make white text highly visible */}
              <div className="absolute inset-0 bg-black/65 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-0" />

              <div className="relative z-10 flex flex-col h-full justify-between">
                <div>
                  <div className="mb-12">
                    <span 
                      className="f-mono text-sm tracking-widest font-semibold transition-colors duration-300 text-cargo group-hover:text-white"
                    >
                      {["OCEAN", "AIR", "BORDERS", "STORAGE", "GROUND", "CABINET"][i]}
                    </span>
                  </div>
                  
                  <h3 className="f-display mb-3 text-[30px] md:text-[34px] leading-tight min-h-[72px] flex items-end transition-colors duration-300 text-bone group-hover:text-white">
                    {s.name}
                  </h3>
                  
                  <p className="mb-6 text-sm leading-relaxed min-h-[48px] transition-colors duration-300 text-ash group-hover:text-white/80">
                    {s.short}
                  </p>
                </div>
                
                <div
                  className="flex items-center justify-between border-t pt-6 transition-colors duration-300 border-line group-hover:border-white/10"
                >
                  <div className="flex items-center gap-4 text-xs">
                    <span className="transition-colors duration-300 text-ash group-hover:text-white/60">
                      <span className="f-mono transition-colors duration-300 text-brass group-hover:text-white/80">
                        {s.eta}
                      </span>{" "}
                      eta
                    </span>
                    <span className="transition-colors duration-300 text-ash group-hover:text-white/60">
                      <span className="f-mono transition-colors duration-300 text-brass group-hover:text-white/80">
                        {s.coverage}
                      </span>
                    </span>
                  </div>
                  <ArrowUpRight
                    size={20}
                    className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-colors duration-300 text-cargo group-hover:text-white"
                  />
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
