"use client";

import { useEffect, useRef, useState } from "react";

const SEGMENTS = [
  { text: "Most freight forwarders ship boxes. " },
  {
    text: "We ship the things inside them — pharma that cannot warm by half a degree, turbine blades the length of a city block, fashion that must arrive before the runway. ",
    style: { color: "var(--ash)" },
  },
  { text: "We made our peace with two facts: " },
  {
    text: "cargo is human, and time is unforgiving. ",
    className: "italic font-semibold",
    style: { color: "var(--cargo)" },
  },
  { text: "The rest is craft." },
];

const TOTAL_LENGTH = SEGMENTS.reduce((sum, seg) => sum + seg.text.length, 0);

export function ManifestoTyper() {
  const [typedLength, setTypedLength] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const containerRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry?.isIntersecting) {
          setHasStarted(true);
          observer.disconnect(); // Only trigger once
        }
      },
      { threshold: 0.2 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!hasStarted) return;

    let currentLength = 0;
    const interval = setInterval(() => {
      currentLength += 2; // Type 2 characters per tick for a smooth and snappy typing pace
      if (currentLength >= TOTAL_LENGTH) {
        setTypedLength(TOTAL_LENGTH);
        clearInterval(interval);
      } else {
        setTypedLength(currentLength);
      }
    }, 25); // 25ms interval for typing speed

    return () => clearInterval(interval);
  }, [hasStarted]);

  // Render segments up to typedLength
  let charactersShown = 0;
  const renderedElements = [];

  for (let i = 0; i < SEGMENTS.length; i++) {
    const seg = SEGMENTS[i];
    if (!seg) continue;
    
    if (charactersShown >= typedLength) break;

    const remaining = typedLength - charactersShown;
    const visibleText = seg.text.slice(0, remaining);
    charactersShown += seg.text.length;

    renderedElements.push(
      <span key={i} className={seg.className} style={seg.style}>
        {visibleText}
      </span>
    );
  }

  return (
    <span ref={containerRef} className="relative inline">
      {renderedElements}
      {hasStarted && (
        <span
          className="inline-block w-[10px] bg-[var(--cargo)] ml-2 animate-cursor-blink"
          style={{ height: "1.05em", verticalAlign: "-0.1em" }}
        />
      )}
    </span>
  );
}
