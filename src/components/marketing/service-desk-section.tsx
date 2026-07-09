"use client";

import type { ReactNode } from "react";
import { useMemo } from "react";
import {
  VerticalSlidingWindow,
  type SlidingWindowItem,
} from "@/components/marketing/vertical-sliding-window";

type ProcessStep = {
  n: string;
  t: string;
  b: string;
};

type DeskItem = string | { n?: string; t?: string; b: string; image?: string };

type Props = {
  leftHeading: string;
  rightHeading: string;
  leftItems: DeskItem[];
  rightItems: DeskItem[];
  title: ReactNode;
  description: string;
  hint?: string;
};

function toSlidingItems(items: DeskItem[], numbered = false): SlidingWindowItem[] {
  return items.map((item, i) => {
    if (typeof item === "string") {
      return {
        n: (i + 1).toString().padStart(2, "0"),
        body: item,
      };
    }
    return {
      n: item.n || (numbered ? (i + 1).toString().padStart(2, "0") : ""),
      title: item.t,
      body: item.b,
      image: item.image,
    };
  });
}

export function DeskSection({
  leftHeading,
  rightHeading,
  leftItems,
  rightItems,
  title,
  description,
  hint,
}: Props) {
  const leftSlidingItems = useMemo(() => toSlidingItems(leftItems), [leftItems]);
  const rightSlidingItems = useMemo(() => toSlidingItems(rightItems, true), [rightItems]);

  return (
    <section className="w-full min-w-0 max-w-full overflow-x-hidden py-12 md:py-14">
      <div className="site-gutter">
        <div className="grid min-w-0 items-stretch gap-8 lg:grid-cols-[3fr_2fr] lg:gap-12">
          <div className="grid min-w-0 grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-4">
            <div className="flex flex-col gap-3 sm:gap-4">
              <h3 className="f-display text-center text-[clamp(1.125rem,2vw,1.5rem)] leading-tight tracking-tight">
                {leftHeading}
              </h3>
              <VerticalSlidingWindow items={leftSlidingItems} direction="up" />
            </div>

            <div className="flex flex-col gap-3 sm:gap-4">
              <h3 className="f-display text-center text-[clamp(1.125rem,2vw,1.5rem)] leading-tight tracking-tight">
                {rightHeading}
              </h3>
              <VerticalSlidingWindow items={rightSlidingItems} direction="down" />
            </div>
          </div>

          <div className="flex h-full min-w-0 flex-col justify-center text-left lg:sticky lg:top-32">
            <h2 className="f-display text-[clamp(2rem,5vw,4rem)] leading-[0.92] tracking-tight">
              {title}
            </h2>
            <p className="mt-8 text-base leading-relaxed md:text-lg" style={{ color: "var(--ash)" }}>
              {description}
            </p>
            {hint && (
              <p className="mt-6 text-sm leading-relaxed" style={{ color: "var(--ash)" }}>
                {hint}
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

type ServiceDeskProps = {
  serviceName: string;
  features: DeskItem[];
  process: ProcessStep[];
};

export function ServiceDeskSection({ serviceName, features, process }: ServiceDeskProps) {
  return (
    <DeskSection
      leftHeading="What this desk handles."
      rightHeading="From brief to delivery."
      leftItems={features}
      rightItems={process}
      title={
        <>
          What we take on.
          <br />
          <span className="f-display-it" style={{ color: "var(--cargo)" }}>
            How we move it.
          </span>
        </>
      }
      description={`The ${serviceName} desk runs on two ledgers — what we take on, and how we move it. Capabilities define the cargo, routes, and clearance this team owns. Process is the five-stage chain every file follows, from first survey to the photograph at delivery.`}
    />
  );
}
