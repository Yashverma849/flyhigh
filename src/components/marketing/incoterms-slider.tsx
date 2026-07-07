"use client";

import { useEffect, useRef } from "react";
import { HoverSlidingCard } from "@/components/marketing/hover-sliding-card";
import styles from "@/components/marketing/hover-sliding-card.module.css";

export type IncotermCard = {
  code: string;
  name: string;
  modes: ("Any" | "Sea")[];
  riskTransfer: string;
  buyerPays: string;
  sellerPays: string;
  whenToUse: string;
};

const SCROLL_SPEED = 0.45;

function IncotermCardItem({ term }: { term: IncotermCard }) {
  return (
    <HoverSlidingCard
      id={term.code.toLowerCase()}
      header={
        <>
          <span className="f-display text-3xl" style={{ color: "var(--cargo)" }}>
            {term.code}
          </span>
          <span className={styles.title}>{term.name}</span>
        </>
      }
    >
      <dl className="space-y-3 text-sm">
        <div>
          <dt className="caption" style={{ color: "var(--brass)" }}>
            RISK TRANSFER
          </dt>
          <dd className="mt-1" style={{ color: "var(--bone)" }}>
            {term.riskTransfer}
          </dd>
        </div>
        <div>
          <dt className="caption" style={{ color: "var(--brass)" }}>
            SELLER PAYS
          </dt>
          <dd className="mt-1" style={{ color: "var(--bone)" }}>
            {term.sellerPays}
          </dd>
        </div>
        <div>
          <dt className="caption" style={{ color: "var(--brass)" }}>
            BUYER PAYS
          </dt>
          <dd className="mt-1" style={{ color: "var(--bone)" }}>
            {term.buyerPays}
          </dd>
        </div>
        <div>
          <dt className="caption" style={{ color: "var(--brass)" }}>
            WHEN TO USE
          </dt>
          <dd className="mt-1" style={{ color: "var(--ash)" }}>
            {term.whenToUse}
          </dd>
        </div>
      </dl>
    </HoverSlidingCard>
  );
}

export function IncotermsSlider({ items }: { items: IncotermCard[] }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const offsetRef = useRef(0);
  const pausedRef = useRef(false);
  const loopWidthRef = useRef(0);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const measure = () => {
      loopWidthRef.current = track.scrollWidth / 2;
    };

    measure();

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const step = () => {
      const loopWidth = loopWidthRef.current;
      if (!pausedRef.current && loopWidth > 0) {
        offsetRef.current += SCROLL_SPEED;
        if (offsetRef.current >= loopWidth) {
          offsetRef.current = 0;
        }
        track.style.transform = `translate3d(-${offsetRef.current}px, 0, 0)`;
      }
      rafRef.current = requestAnimationFrame(step);
    };

    rafRef.current = requestAnimationFrame(step);

    const observer = new ResizeObserver(measure);
    observer.observe(track);

    return () => {
      observer.disconnect();
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [items.length]);

  const loop = [...items, ...items];

  return (
    <div
      className="relative z-10 pt-2"
      style={{ overflowX: "clip", overflowY: "visible" }}
      onPointerEnter={() => {
        pausedRef.current = true;
      }}
      onPointerLeave={() => {
        pausedRef.current = false;
      }}
    >
      <div
        ref={trackRef}
        className="flex w-max gap-6 will-change-transform"
        aria-label="Incoterms carousel"
      >
        {loop.map((term, index) => (
          <div key={`${term.code}-${index}`} className="w-[300px] shrink-0">
            <IncotermCardItem term={term} />
          </div>
        ))}
      </div>
    </div>
  );
}
