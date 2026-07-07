"use client";

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";

const REVEAL_TRANSITION =
  "opacity 550ms cubic-bezier(0.22, 1, 0.36, 1), transform 550ms cubic-bezier(0.22, 1, 0.36, 1)";

export type ScrollRevealVariant = "slide-left" | "slide-right" | "fade";

function hiddenTransform(variant: ScrollRevealVariant): string {
  switch (variant) {
    case "slide-right":
      return "translate3d(56px, 0, 0)";
    case "fade":
      return "translate3d(0, 20px, 0)";
    default:
      return "translate3d(-56px, 0, 0)";
  }
}

type ScrollRevealProps = {
  children: ReactNode;
  variant?: ScrollRevealVariant;
  staggerIndex?: number;
  className?: string;
  style?: CSSProperties;
  as?: "div" | "article" | "section";
};

export function ScrollReveal({
  children,
  variant = "slide-left",
  staggerIndex = 0,
  className = "",
  style,
  as: Tag = "div",
}: ScrollRevealProps) {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;

        const reveal = () => setVisible(true);

        if (prefersReduced) {
          reveal();
        } else {
          window.setTimeout(reveal, staggerIndex * 70);
        }

        observer.disconnect();
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [staggerIndex]);

  return (
    <Tag
      ref={ref as never}
      className={className}
      style={{
        ...style,
        opacity: visible ? 1 : 0,
        transform: visible ? "translate3d(0, 0, 0)" : hiddenTransform(variant),
        transition: REVEAL_TRANSITION,
      }}
    >
      {children}
    </Tag>
  );
}
