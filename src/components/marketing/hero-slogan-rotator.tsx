"use client";

import { useEffect, useState } from "react";

const SLOGANS = [
  {
    part1: "Worldwide",
    italic: "freight, ",
    part2: "refined.",
  },
  {
    part1: "Impossible",
    italic: "routes, ",
    part2: "resolved.",
  },
];

export function HeroSloganRotator() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [animationState, setAnimationState] = useState<"visible" | "exit" | "enter">("visible");

  useEffect(() => {
    const timer = setInterval(() => {
      // 1. Start exit transition (fade down out)
      setAnimationState("exit");

      // 2. After transition completes (600ms), switch slogan and snap to entering state
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % SLOGANS.length);
        setAnimationState("enter");

        // 3. Immediately trigger visible transition in the next render tick
        const frame = requestAnimationFrame(() => {
          setAnimationState("visible");
        });
        return () => cancelAnimationFrame(frame);
      }, 600);
    }, 5500); // 5.5s delay between slogan rotations

    return () => clearInterval(timer);
  }, []);

  const current = SLOGANS[currentIndex];
  if (!current) return null;

  return (
    <span className="hero-slogan-container block">
      <span className={`hero-slogan-item block state-${animationState}`}>
        {current.part1}
        <br />
        <span className="f-display-it" style={{ color: "var(--cargo)" }}>
          {current.italic}
        </span>
        <span style={{ color: "var(--bone)" }}>{current.part2}</span>
      </span>
    </span>
  );
}
