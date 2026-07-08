"use client";

import React, { useState, useEffect, useRef } from "react";

type Props = {
  isFlipped: boolean;
  front: React.ReactNode;
  back: React.ReactNode;
};

export function FlipCard({ isFlipped, front, back }: Props) {
  const [height, setHeight] = useState<number | undefined>(undefined);
  const frontRef = useRef<HTMLDivElement>(null);
  const backRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const activeRef = isFlipped ? backRef : frontRef;
    
    // Initial measurement
    if (activeRef.current) {
      setHeight(activeRef.current.offsetHeight);
    }

    // Dynamic resize observer for layout shifts
    const observer = new ResizeObserver((entries) => {
      for (let entry of entries) {
        const h = entry.borderBoxSize?.[0]?.blockSize ?? entry.contentRect.height;
        if (h > 0) {
          setHeight(h);
        }
      }
    });

    if (activeRef.current) {
      observer.observe(activeRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [isFlipped]);

  return (
    <div
      className="w-full relative transition-[height] duration-500 ease-in-out"
      style={{
        perspective: "1200px",
        height: height ? `${height}px` : "auto",
      }}
    >
      <div
        className="w-full h-full relative"
        style={{
          transformStyle: "preserve-3d",
          transition: "transform 1200ms cubic-bezier(0.4, 0, 0.2, 1)",
          transform: isFlipped ? "rotateY(180deg) rotateZ(180deg)" : "rotateY(0deg) rotateZ(0deg)",
        }}
      >
        {/* FRONT PANEL */}
        <div
          ref={frontRef}
          className="w-full absolute top-0 left-0"
          style={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            zIndex: isFlipped ? 1 : 2,
            pointerEvents: isFlipped ? "none" : "auto",
          }}
        >
          {front}
        </div>

        {/* BACK PANEL */}
        <div
          ref={backRef}
          className="w-full absolute top-0 left-0"
          style={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            transform: "rotateY(180deg) rotateZ(180deg)",
            zIndex: isFlipped ? 2 : 1,
            pointerEvents: isFlipped ? "auto" : "none",
          }}
        >
          {back}
        </div>
      </div>
    </div>
  );
}
