"use client";

import { CountUp } from "@/components/shared/count-up";

type MetricAnimation =
  | { kind: "count"; target: number; suffix?: string; prefix?: string }
  | { kind: "range"; from: number; to: number; suffix?: string }
  | { kind: "static"; value: string };

type MetricItem = {
  label: string;
  animation: MetricAnimation;
};

function parseEta(eta: string): MetricAnimation {
  const rangeMatch = eta.match(/^(\d+)[–-](\d+)\s*(.+)$/);
  if (rangeMatch) {
    return {
      kind: "range",
      from: Number(rangeMatch[1]),
      to: Number(rangeMatch[2]),
      suffix: ` ${rangeMatch[3]}`,
    };
  }
  return { kind: "static", value: eta };
}

function parseCoverage(coverage: string): MetricAnimation {
  const plusMatch = coverage.match(/^(\d+)\+\s*(.+)$/);
  if (plusMatch) {
    return {
      kind: "count",
      target: Number(plusMatch[1]),
      suffix: `+ ${plusMatch[2]}`,
    };
  }

  const countMatch = coverage.match(/^(\d+)\s+(.+)$/);
  if (countMatch) {
    return {
      kind: "count",
      target: Number(countMatch[1]),
      suffix: ` ${countMatch[2]}`,
    };
  }

  return { kind: "static", value: coverage };
}

function buildMetrics(eta: string, coverage: string): MetricItem[] {
  return [
    { label: "TYPICAL ETA", animation: parseEta(eta) },
    { label: "COVERAGE", animation: parseCoverage(coverage) },
    { label: "DESK STAFF", animation: { kind: "count", target: 12, suffix: "+" } },
    { label: "AVAILABILITY", animation: { kind: "count", target: 24, suffix: "/7" } },
  ];
}

function MetricValue({ animation }: { animation: MetricAnimation }) {
  if (animation.kind === "static") {
    return <span>{animation.value}</span>;
  }

  if (animation.kind === "count") {
    return (
      <CountUp
        target={animation.target}
        suffix={animation.suffix}
        prefix={animation.prefix}
        duration={2000}
      />
    );
  }

  return (
    <span>
      <CountUp target={animation.from} duration={2000} />
      {"–"}
      <CountUp target={animation.to} suffix={animation.suffix} duration={2000} />
    </span>
  );
}

export function ServiceHeroMetrics({ eta, coverage }: { eta: string; coverage: string }) {
  const metrics = buildMetrics(eta, coverage);

  return (
    <div
      className="mt-auto w-full min-w-0 max-w-full border-t pt-6 pb-4 sm:pt-8 sm:pb-6 lg:pt-10 lg:pb-8"
      style={{ borderColor: "rgba(255,255,255,0.12)" }}
    >
      <div className="grid min-w-0 grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4 lg:gap-8">
        {metrics.map((m) => (
          <div key={m.label} className="min-w-0 text-center">
            <div className="caption text-[9px] sm:text-[10px]" style={{ color: "var(--brass)" }}>
              {m.label}
            </div>
            <div className="f-display tabular mt-1.5 text-xl sm:mt-2 sm:text-2xl md:text-3xl">
              <MetricValue animation={m.animation} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
