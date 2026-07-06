"use client";

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

type Props = {
  serviceName: string;
  features: string[];
  process: ProcessStep[];
};

export function ServiceDeskSection({ serviceName, features, process }: Props) {
  const capabilityItems: SlidingWindowItem[] = useMemo(
    () =>
      features.map((feature, i) => ({
        n: (i + 1).toString().padStart(2, "0"),
        body: feature,
      })),
    [features],
  );

  const processItems: SlidingWindowItem[] = useMemo(
    () =>
      process.map((step) => ({
        n: step.n,
        title: step.t,
        body: step.b,
      })),
    [process],
  );

  return (
    <section className="w-full min-w-0 max-w-full overflow-x-hidden py-12 md:py-14">
      <div className="site-gutter">
        <div className="grid min-w-0 items-stretch gap-8 lg:grid-cols-[3fr_2fr] lg:gap-12">
          <div className="grid min-w-0 grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-4">
            <div className="flex flex-col gap-3 sm:gap-4">
              <h3 className="f-display text-center text-[clamp(1.125rem,2vw,1.5rem)] leading-tight tracking-tight">
                What this desk handles.
              </h3>
              <VerticalSlidingWindow items={capabilityItems} direction="up" />
            </div>

            <div className="flex flex-col gap-3 sm:gap-4">
              <h3 className="f-display text-center text-[clamp(1.125rem,2vw,1.5rem)] leading-tight tracking-tight">
                From brief to delivery.
              </h3>
              <VerticalSlidingWindow items={processItems} direction="down" />
            </div>
          </div>

          <div className="flex h-full min-w-0 flex-col justify-center text-left lg:sticky lg:top-32">
            <h2 className="f-display text-[clamp(2rem,5vw,4rem)] leading-[0.92] tracking-tight">
              What we take on.
              <br />
              <span className="f-display-it" style={{ color: "var(--cargo)" }}>
                How we move it.
              </span>
            </h2>
            <p className="mt-8 text-base leading-relaxed md:text-lg" style={{ color: "var(--ash)" }}>
              The {serviceName} desk runs on two ledgers — what we take on, and how we move it.
              Capabilities define the cargo, routes, and clearance this team owns. Process is the
              five-stage chain every file follows, from first survey to the photograph at delivery.
            </p>
            <p className="mt-6 text-sm leading-relaxed" style={{ color: "var(--ash)" }}>
              Hover either column to pause. Scroll to read at your pace.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
