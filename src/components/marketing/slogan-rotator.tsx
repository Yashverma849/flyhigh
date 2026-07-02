"use client";

import { useEffect, useState } from "react";

const SLOGANS = [
  "PRECISION LOGISTICS FOR DEMANDING CORRIDORS",
  "MOVING IMPOSSIBLE-ON-PAPER SHIPMENTS SINCE 2017",
  "MUMBAI HOUSE WITH A WORLDWIDE CORRIDOR NETWORK",
  "EDITORIAL PRECISION IN GLOBAL AIR & OCEAN FREIGHT",
];

export function SloganRotator() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % SLOGANS.length);
        setIsTransitioning(false);
      }, 500); // Duration of the exit slide/fade
    }, 4500); // Timing between changes

    return () => clearInterval(timer);
  }, []);

  const nextIndex = (currentIndex + 1) % SLOGANS.length;

  return (
    <div className="fade-up s1 mb-6 caption h-5 overflow-hidden relative text-[10px] md:text-[11px] tracking-[0.22em] text-[var(--brass)] font-bold select-none">
      <div
        className="flex flex-col transition-transform duration-500 ease-in-out"
        style={{
          transform: isTransitioning ? "translateY(-100%)" : "translateY(0)",
        }}
      >
        <div
          className={`h-5 flex items-center gap-2 transition-opacity duration-500 ${
            isTransitioning ? "opacity-0" : "opacity-100"
          }`}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-[var(--cargo)] animate-pulse shrink-0" />
          <span>{SLOGANS[currentIndex]}</span>
        </div>
        <div
          className={`h-5 flex items-center gap-2 transition-opacity duration-500 ${
            isTransitioning ? "opacity-100" : "opacity-0"
          }`}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-[var(--cargo)] animate-pulse shrink-0" />
          <span>{SLOGANS[nextIndex]}</span>
        </div>
      </div>
    </div>
  );
}
