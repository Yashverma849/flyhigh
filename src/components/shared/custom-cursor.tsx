"use client";

import { useEffect, useRef, useState } from "react";

export function CustomCursor() {
  const ref = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState("");

  useEffect(() => {
    const move = (e: MouseEvent) => {
      if (ref.current) {
        ref.current.style.transform = `translate(${e.clientX - 20}px, ${e.clientY - 20}px)`;
      }
    };
    const handleEnter = (e: MouseEvent) => {
      const target = (e.target as HTMLElement | null)?.closest("[data-cursor]");
      if (target) setLabel(target.getAttribute("data-cursor") ?? "");
    };
    const handleLeave = (e: MouseEvent) => {
      const target = (e.target as HTMLElement | null)?.closest("[data-cursor]");
      if (target) setLabel("");
    };
    window.addEventListener("mousemove", move, { passive: true });
    document.addEventListener("mouseover", handleEnter);
    document.addEventListener("mouseout", handleLeave);
    return () => {
      window.removeEventListener("mousemove", move);
      document.removeEventListener("mouseover", handleEnter);
      document.removeEventListener("mouseout", handleLeave);
    };
  }, []);

  return (
    <div
      ref={ref}
      className="pointer-events-none fixed top-0 left-0 z-[200] hidden transition-transform duration-100 ease-out md:block"
      style={{ willChange: "transform" }}
      aria-hidden="true"
    >
      <div
        className={`relative transition-all duration-300 ${label ? "scale-100" : "scale-0"}`}
        style={{ width: 80, height: 80, marginLeft: -20, marginTop: -20 }}
      >
        <div
          className="f-mono absolute inset-0 flex items-center justify-center rounded-full text-[10px] font-semibold"
          style={{ background: "var(--cargo)", color: "var(--bone)" }}
        >
          {label}
        </div>
      </div>
      <div
        className={`absolute top-5 left-5 rounded-full transition-all duration-300 ${label ? "opacity-0" : "opacity-100"}`}
        style={{ width: 8, height: 8, background: "var(--bone)", mixBlendMode: "difference" }}
      />
    </div>
  );
}
