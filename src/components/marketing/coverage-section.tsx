"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { SectionLabel } from "@/components/shared/section-label";
import { CountUp } from "@/components/shared/count-up";

const COVERAGE_STATS = [
  { n: "EUROPE",   v: 31, label: "active ports" },
  { n: "AFRICA",   v: 18, label: "corridors" },
  { n: "GULF",     v: 12, label: "gateways" },
  { n: "AMERICAS", v: 24, label: "trade lanes" },
  { n: "ASIA-PAC", v: 47, label: "agent offices" },
  { n: "OCEANIA",  v: 8,  label: "ports" },
];

// Right-side text blocks — each animates in one by one
const TEXT_LINES = [
  { type: "label" },
  { type: "heading" },
  { type: "body" },
  { type: "grid" },
];

export function CoverageSection() {
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
      className="relative py-16 overflow-hidden"
      style={{ background: "var(--ink-2)" }}
    >
      <div className="site-gutter">
        <div className="grid items-center gap-12 lg:grid-cols-2">

          {/* ── LEFT: Image slides in from the left ── */}
          <div
            className="relative overflow-hidden rounded-2xl"
            style={{
              aspectRatio: "4/3",
              border: "1px solid var(--line)",
              opacity: visible ? 1 : 0,
              transform: visible ? "translateX(0)" : "translateX(-80px)",
              transition: "opacity 800ms cubic-bezier(0.22,1,0.36,1), transform 800ms cubic-bezier(0.22,1,0.36,1)",
            }}
          >
            <img
              src="https://images.unsplash.com/photo-1494412651409-8963ce7935a7?w=1400&q=80&auto=format&fit=crop"
              alt="Global freight network — shipping containers at port"
              className="h-full w-full object-cover"
              style={{ filter: "grayscale(15%) contrast(108%)" }}
            />
            {/* Gradient overlay bottom */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(to top, var(--ink-2) 0%, transparent 50%), linear-gradient(to right, var(--ink-2) 0%, transparent 40%)",
              }}
            />
            {/* Floating stat badge */}
            <div
              className="absolute bottom-6 left-6 rounded-xl p-4"
              style={{
                background: "var(--ink)/90",
                border: "1px solid var(--line)",
                backdropFilter: "blur(12px)",
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(16px)",
                transition: "opacity 600ms 600ms, transform 600ms 600ms cubic-bezier(0.22,1,0.36,1)",
              }}
            >
              <div className="f-display text-[40px] leading-none" style={{ color: "var(--cargo)" }}>
                <CountUp target={94} />
              </div>
              <div className="f-mono mt-1 text-[10px] tracking-widest" style={{ color: "var(--ash)" }}>
                COUNTRIES SERVED
              </div>
            </div>
          </div>

          {/* ── RIGHT: Text lines stagger in from the right ── */}
          <div>

            {/* Heading */}
            <div
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateX(0)" : "translateX(60px)",
                transition: "opacity 600ms 200ms cubic-bezier(0.22,1,0.36,1), transform 600ms 200ms cubic-bezier(0.22,1,0.36,1)",
              }}
            >
              <h2 className="f-display mt-4 mb-6 text-[44px] leading-[0.95] tracking-tight md:text-[60px]">
                Everywhere
                <br />
                <span className="f-display-it" style={{ color: "var(--cargo)" }}>
                  most don&apos;t.
                </span>
              </h2>
            </div>

            {/* Body copy */}
            <div
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateX(0)" : "translateX(60px)",
                transition: "opacity 600ms 320ms cubic-bezier(0.22,1,0.36,1), transform 600ms 320ms cubic-bezier(0.22,1,0.36,1)",
              }}
            >
              <p className="mb-8 text-base leading-relaxed md:text-lg" style={{ color: "var(--ash)" }}>
                Our agent network was built backwards — starting with the impossible inland-Africa
                lanes, the Persian Gulf hinterlands, and the niche European corridors that bigger
                forwarders skip. The easy lanes were added later.
              </p>
              <Link href="/routes" className="btn-link mb-8 inline-flex">
                View all trade lanes →
              </Link>
            </div>

            {/* Coverage grid — each cell staggers */}
            <div
              className="grid grid-cols-3 gap-px mt-4"
              style={{ background: "var(--line)" }}
            >
              {COVERAGE_STATS.map((r, i) => (
                <div
                  key={r.n}
                  className="p-5"
                  style={{
                    background: "var(--ink-2)",
                    opacity: visible ? 1 : 0,
                    transform: visible ? "translateX(0)" : "translateX(50px)",
                    transition: `opacity 500ms ${420 + i * 70}ms cubic-bezier(0.22,1,0.36,1), transform 500ms ${420 + i * 70}ms cubic-bezier(0.22,1,0.36,1)`,
                  }}
                >
                  <div
                    className="f-mono text-[10px] tracking-widest"
                    style={{ color: "var(--brass)" }}
                  >
                    {r.n}
                  </div>
                  <div
                    className="f-display mt-1 text-[28px] leading-none"
                    style={{ color: "var(--cargo)" }}
                  >
                    <CountUp target={r.v} />
                  </div>
                  <div
                    className="mt-0.5 text-[10px]"
                    style={{ color: "var(--ash)" }}
                  >
                    {r.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
