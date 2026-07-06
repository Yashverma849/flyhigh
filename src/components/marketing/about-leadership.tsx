"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export type TeamMember = {
  name: string;
  role: string;
  years: number;
};

function TeamCard({ member }: { member: TeamMember }) {
  return (
    <div className="lift glow-card group w-[78vw] shrink-0 sm:w-[320px] lg:w-[300px] xl:w-[320px]">
      <div
        className="cine-frame relative flex aspect-[3/4] flex-col justify-end overflow-hidden rounded-xl p-5"
        style={{
          background: "linear-gradient(135deg, var(--ink-2), var(--ink-3))",
          border: "1px solid var(--line)",
        }}
      >
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div
            className="f-display text-[80px] tracking-tighter opacity-10"
            style={{ color: "var(--brass)" }}
          >
            {member.name
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </div>
        </div>
        <div className="relative z-10">
          <div className="font-semibold text-lg leading-tight">{member.name}</div>
          <div className="mt-2 text-sm leading-snug" style={{ color: "var(--ash)" }}>
            {member.role}
          </div>
          <div className="caption mt-3" style={{ color: "var(--brass)" }}>
            {member.years} YRS IN CRAFT
          </div>
        </div>
      </div>
    </div>
  );
}

export function AboutLeadership({ team }: { team: ReadonlyArray<TeamMember> }) {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const windowRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef(0);
  const maxScrollRef = useRef(0);
  const [progress, setProgress] = useState(0);
  const [maxScroll, setMaxScroll] = useState(0);
  const [isDesktop, setIsDesktop] = useState(false);

  const measure = useCallback(() => {
    const track = trackRef.current;
    const viewport = windowRef.current;
    if (!track || !viewport) return;
    const nextMax = Math.max(0, track.scrollWidth - viewport.clientWidth);
    maxScrollRef.current = nextMax;
    setMaxScroll(nextMax);
  }, []);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const update = () => setIsDesktop(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    measure();
    const raf = requestAnimationFrame(measure);
    window.addEventListener("resize", measure);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", measure);
    };
  }, [measure, team, isDesktop]);

  useEffect(() => {
    if (!isDesktop) return;

    const onWheel = (e: WheelEvent) => {
      const maxScrollVal = maxScrollRef.current;
      if (maxScrollVal <= 0) return;

      const current = progressRef.current;
      const delta = e.deltaY;
      const next = current + delta / maxScrollVal;

      if ((current <= 0 && delta < 0) || (current >= 1 && delta > 0)) {
        return;
      }

      e.preventDefault();
      const clamped = Math.min(1, Math.max(0, next));
      progressRef.current = clamped;
      setProgress(clamped);
    };

    const element = windowRef.current;
    if (element) {
      element.addEventListener("wheel", onWheel, { passive: false });
    }

    return () => {
      if (element) {
        element.removeEventListener("wheel", onWheel);
      }
    };
  }, [isDesktop]);

  const translateX = -progress * maxScroll;

  return (
    <section
      ref={sectionRef}
      className="relative border-t py-16 lg:py-24"
      style={{ borderColor: "var(--line)" }}
    >
      <div className="site-gutter">
        <h2 className="f-display mb-10 text-[56px] leading-[0.95] tracking-tight md:mb-12 md:text-[80px] lg:mb-14">
          Eight seniors.
          <br />
          <span className="f-display-it" style={{ color: "var(--cargo)" }}>
            One desk each.
          </span>
        </h2>

        <div
          ref={windowRef}
          className="no-scrollbar overflow-x-auto pb-2 lg:cursor-grab lg:overflow-hidden lg:pb-0 lg:active:cursor-grabbing"
        >
          <div
            ref={trackRef}
            className="flex gap-6 will-change-transform max-lg:w-max"
            style={
              isDesktop
                ? { transform: `translate3d(${translateX}px, 0, 0)` }
                : undefined
            }
          >
            {team.map((member) => (
              <TeamCard key={member.name} member={member} />
            ))}
          </div>
        </div>

        {isDesktop && maxScroll > 0 && (
          <div
            className="mt-8 hidden h-px overflow-hidden rounded-full lg:block"
            style={{ background: "var(--line)" }}
            aria-hidden="true"
          >
            <div
              className="h-full origin-left transition-none"
              style={{
                width: `${progress * 100}%`,
                background: "var(--cargo)",
              }}
            />
          </div>
        )}
      </div>
    </section>
  );
}
