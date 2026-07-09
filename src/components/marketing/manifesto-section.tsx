"use client";

import { useEffect, useRef, useState } from "react";
import { SectionLabel } from "@/components/shared/section-label";

const POINTERS = [
  {
    num: "01",
    text: "Most freight forwarders ship boxes.",
    img: "/manifesto_ocean_harbor_1783063499614.png",
    isMuted: false,
  },
  {
    num: "02",
    text: "We ship the things inside them — pharma that cannot warm by half a degree, turbine blades the length of a city block, fashion that must arrive before the runway.",
    img: "/manifesto_turbine_blade_1783063519102.png",
    isMuted: true,
  },
  {
    num: "03",
    text: "We made our peace with two facts: cargo is human, and time is unforgiving.",
    highlightText: "cargo is human, and time is unforgiving.",
    prefixText: "We made our peace with two facts: ",
    img: "/hero_pointer3.png",
    isMuted: false,
  },
  {
    num: "04",
    text: "The rest is craft.",
    img: "/proc_doc.png",
    isMuted: false,
  },
];

export function ManifestoSection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="relative py-32 overflow-hidden transition-all duration-700" 
      style={{ background: "var(--ink-2)" }}
    >
      {/* Background Images Layer */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {POINTERS.map((item, idx) => (
          <div
            key={idx}
            className="absolute inset-0 bg-cover bg-center transition-all duration-1000 ease-in-out"
            style={{
              backgroundImage: `url("${item.img}")`,
              opacity: hoveredIndex === idx ? 0.55 : 0,
              transform: hoveredIndex === idx ? "scale(1.03)" : "scale(1.0)",
              filter: "grayscale(10%) contrast(95%)",
            }}
          />
        ))}
        {/* Persistent dark overlay — keeps text readable over any background image */}
        <div 
          className="absolute inset-0 bg-black/70"
          style={{ opacity: hoveredIndex !== null ? 1 : 0, transition: "opacity 700ms ease" }}
        />
      </div>

      {/* Title of this section left-aligned at top, outside the main centered wrapper */}
      <div className="site-gutter w-full mb-16 md:mb-20 text-left relative z-10">
        <h2
          className="f-display text-[44px] leading-[1.0] tracking-tight md:text-[56px] lg:text-[64px] transition-colors duration-700"
          style={{ color: hoveredIndex !== null ? "#ffffff" : "var(--bone)" }}
        >
          Why this
          <br />
          <span
            className="f-display-it transition-colors duration-700"
            style={{ color: hoveredIndex !== null ? "#e2c27d" : "var(--brass)" }}
          >
            house exists
          </span>
        </h2>
      </div>

      <div className="site-gutter max-w-7xl mx-auto relative z-10">
        {/* Description div container aligned to the full width of the section */}
        <div className="w-full text-left">
          <ol className="space-y-8 md:space-y-12">
            {POINTERS.map((item, idx) => {
              const isEven = (idx + 1) % 2 === 0;
              const transformStart = isEven ? "translateX(80px)" : "translateX(-80px)";
              return (
                <li
                  key={idx}
                  className="flex gap-6 items-start group cursor-pointer transition-all duration-700"
                  style={{
                    opacity: visible ? 1 : 0,
                    transform: visible ? "translateX(0)" : transformStart,
                    transitionDelay: visible ? `${idx * 150}ms` : "0ms",
                  }}
                  onMouseEnter={() => setHoveredIndex(idx)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                <span 
                  className="f-mono text-base md:text-lg lg:text-xl font-semibold mt-2 transition-colors duration-300" 
                  style={{ 
                    color: hoveredIndex === idx ? "#ffffff" : "var(--brass)" 
                  }}
                >
                  {item.num}
                </span>
                
                {idx === 2 ? (
                  <p 
                    className="f-body text-[24px] md:text-[30px] lg:text-[36px] leading-relaxed font-medium transition-all duration-500"
                    style={{ 
                      color: hoveredIndex === idx ? "#ffffff" : "var(--bone)",
                      opacity: hoveredIndex !== null && hoveredIndex !== idx ? 0.35 : 1
                    }}
                  >
                    {item.prefixText}
                    <span
                      className="italic font-semibold transition-colors duration-300"
                      style={{ color: hoveredIndex === idx ? "#ffd97d" : "var(--cargo)" }}
                    >
                      {item.highlightText}
                    </span>
                  </p>
                ) : (
                  <p 
                    className="f-body text-[24px] md:text-[30px] lg:text-[36px] leading-relaxed transition-all duration-500"
                    style={{ 
                      color: hoveredIndex === idx ? "#ffffff" : (item.isMuted ? "var(--ash)" : "var(--bone)"),
                      fontWeight: item.isMuted ? "normal" : "500",
                      opacity: hoveredIndex !== null && hoveredIndex !== idx ? 0.35 : 1
                    }}
                  >
                    {item.text}
                  </p>
                )}
              </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
