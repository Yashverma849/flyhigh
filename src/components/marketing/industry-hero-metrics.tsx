"use client";

type Stat = { l: string; v: string };

export function IndustryHeroMetrics({ stats }: { stats: Stat[] }) {
  return (
    <div
      className="mt-auto w-full min-w-0 max-w-full border-t pt-6 pb-4 sm:pt-8 sm:pb-6 lg:pt-10 lg:pb-8"
      style={{ borderColor: "rgba(255,255,255,0.12)" }}
    >
      <div className="grid min-w-0 grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4 lg:gap-8">
        {stats.map((stat) => (
          <div key={stat.l} className="min-w-0 text-center">
            <div className="caption text-[9px] sm:text-[10px]" style={{ color: "var(--brass)" }}>
              {stat.l}
            </div>
            <div className="f-display tabular mt-1.5 text-xl sm:mt-2 sm:text-2xl md:text-3xl">
              {stat.v}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
