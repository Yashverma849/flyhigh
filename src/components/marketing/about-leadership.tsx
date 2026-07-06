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
  const isHoveredRef = useRef(false);
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

  const setProgressValue = useCallback((value: number) => {
    const clamped = Math.min(1, Math.max(0, value));
    progressRef.current = clamped;
    setProgress(clamped);
  }, []);

  const syncPageScroll = useCallback((value: number) => {
    const section = sectionRef.current;
    if (!section) return;
    const scrollDistance = section.offsetHeight - window.innerHeight;
    if (scrollDistance <= 0) return;
    const targetY = section.offsetTop + value * scrollDistance;
    window.scrollTo({ top: targetY, behavior: "auto" });
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
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [measure, team, isDesktop]);

  useEffect(() => {
    if (!isDesktop) return;

    const onScroll = () => {
      if (isHoveredRef.current) return;

      const section = sectionRef.current;
      if (!section) return;

      const scrollDistance = section.offsetHeight - window.innerHeight;
      if (scrollDistance <= 0) return;

      const nextProgress = (window.scrollY - section.offsetTop) / scrollDistance;
      setProgressValue(nextProgress);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isDesktop, setProgressValue, maxScroll]);

  useEffect(() => {
    if (!isDesktop) return;

    const onWheel = (e: WheelEvent) => {
      if (!isHoveredRef.current) return;

      const section = sectionRef.current;
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const pinned = rect.top <= 0 && rect.bottom >= window.innerHeight;
      if (!pinned) return;

      const scrollDistance = section.offsetHeight - window.innerHeight;
      if (scrollDistance <= 0) return;

      const current = progressRef.current;
      const next = current + e.deltaY / scrollDistance;

      if ((current <= 0 && e.deltaY < 0) || (current >= 1 && e.deltaY > 0)) {
        return;
      }

      e.preventDefault();
      const clamped = Math.min(1, Math.max(0, next));
      setProgressValue(clamped);
      syncPageScroll(clamped);
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    return () => window.removeEventListener("wheel", onWheel);
  }, [isDesktop, setProgressValue, syncPageScroll, maxScroll]);

  const translateX = -progress * maxScroll;
  const sectionHeight =
    isDesktop && maxScroll > 0 ? `calc(100vh + ${maxScroll}px)` : undefined;

  return (
    <section
      ref={sectionRef}
      className="relative border-t py-16 lg:py-0"
      style={{ borderColor: "var(--line)", height: sectionHeight }}
    >
      <div className="lg:sticky lg:top-0 lg:flex lg:h-screen lg:flex-col lg:justify-center lg:overflow-hidden lg:py-16">
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
            onMouseEnter={() => {
              isHoveredRef.current = true;
            }}
            onMouseLeave={() => {
              isHoveredRef.current = false;
            }}
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
      </div>
    </section>
  );
}
