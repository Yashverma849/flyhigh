import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import type { IndustryOverview } from "@/lib/industry-overview";

type Props = {
  overview: IndustryOverview;
};

export function IndustryOverviewCard({ overview }: Props) {
  return (
    <article
      className="lift relative flex w-[min(520px,calc(100vw-3rem))] shrink-0 snap-start flex-col overflow-hidden rounded-2xl text-white sm:w-[min(520px,calc(100vw-5rem))] lg:w-[min(520px,calc(100vw-9rem))]"
      style={{
        border: "1px solid rgba(255,255,255,0.12)",
      }}
    >
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${overview.image})`,
          filter: "grayscale(12%) contrast(96%)",
        }}
        aria-hidden="true"
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, rgba(10,10,12,0.72) 0%, rgba(10,10,12,0.88) 45%, rgba(10,10,12,0.96) 100%)",
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 flex flex-1 flex-col p-6 sm:p-8">
        <div className="mb-4">
          <span className="f-mono text-[10px] tracking-widest" style={{ color: "var(--cargo)" }}>
            {overview.tag}
          </span>
        </div>

        <h3 className="f-display mb-2 text-2xl leading-tight tracking-tight text-white sm:text-3xl">
          {overview.name}
        </h3>
        <p className="mb-3 text-xs leading-relaxed text-white/75 sm:text-sm">{overview.short}</p>
        <p className="mb-6 text-sm leading-relaxed text-white/90">{overview.desc}</p>

        <div
          className="mb-6 grid grid-cols-2 gap-px"
          style={{ background: "rgba(255,255,255,0.1)" }}
        >
          {overview.stats.map((stat) => (
            <div
              key={stat.l}
              className="p-4"
              style={{ background: "rgba(10,10,12,0.55)", backdropFilter: "blur(8px)" }}
            >
              <div className="caption text-[10px]" style={{ color: "var(--brass)" }}>
                {stat.l}
              </div>
              <div className="f-display mt-1 text-xl text-white sm:text-2xl">{stat.v}</div>
            </div>
          ))}
        </div>

        <div className="mb-6">
          <div className="caption mb-3" style={{ color: "var(--brass)" }}>
            CHALLENGES
          </div>
          <ul className="space-y-2">
            {overview.challenges.map((challenge, i) => (
              <li key={challenge} className="flex items-start gap-3 text-sm leading-relaxed">
                <span className="f-mono shrink-0 text-xs" style={{ color: "var(--cargo)" }}>
                  {(i + 1).toString().padStart(2, "0")}
                </span>
                <span className="text-white/80">{challenge}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mb-6">
          <div className="caption mb-3" style={{ color: "var(--brass)" }}>
            CAPABILITIES
          </div>
          <ul className="space-y-2">
            {overview.capabilities.map((capability) => (
              <li key={capability} className="flex items-start gap-2 text-sm">
                <div
                  className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full"
                  style={{
                    background: "var(--cargo-tint-10)",
                    border: "1px solid var(--cargo)",
                  }}
                >
                  <Check size={9} style={{ color: "var(--cargo)" }} />
                </div>
                <span className="text-white/80">{capability}</span>
              </li>
            ))}
          </ul>
        </div>

        <div
          className="mt-auto flex flex-col gap-4 border-t pt-5 sm:flex-row sm:items-center sm:justify-between"
          style={{ borderColor: "rgba(255,255,255,0.12)" }}
        >
          {overview.servicesLine && (
            <span className="text-xs text-white/65">{overview.servicesLine}</span>
          )}
          <Link
            href={`/industries/${overview.slug}`}
            className="caption u-link flex items-center gap-2"
            style={{ color: "var(--cargo)" }}
          >
            Read full page <ArrowRight size={12} />
          </Link>
        </div>
      </div>
    </article>
  );
}
