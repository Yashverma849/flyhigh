import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SectionLabel } from "@/components/shared/section-label";
import { Pill } from "@/components/shared/pill";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { JsonLd } from "@/components/shared/json-ld";
import { ROUTES } from "@/server/db/seed/routes";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import { formatINR } from "@/lib/utils";

export const metadata: Metadata = pageMetadata({
  title: "Transit-time estimator",
  description:
    "Realistic transit days for ocean and air corridors out of Indian gateways. Based on the lanes Flyhigh actually books, not theoretical schedules.",
  path: "/tools/transit-time",
  keywords: [
    "transit time India to Europe",
    "Mumbai to Rotterdam transit",
    "air freight transit time India",
    "ocean freight transit calculator",
  ],
});

const breadcrumbs = [
  { name: "Home", href: "/" },
  { name: "Tools", href: "/tools" },
  { name: "Transit-time estimator", href: "/tools/transit-time" },
];

export default function TransitTimePage() {
  const grouped = ROUTES.reduce<Record<string, (typeof ROUTES)[number][]>>((acc, r) => {
    (acc[r.region] ??= []).push(r);
    return acc;
  }, {});

  return (
    <>
      <JsonLd data={breadcrumbJsonLd(breadcrumbs)} />

      <section className="pt-32 pb-16">
        <div className="mx-auto max-w-[1440px] px-6 md:px-8">
          <Breadcrumbs items={breadcrumbs} className="mb-8" />
          <SectionLabel num="01">TRANSIT TIME</SectionLabel>
          <h1 className="f-display mt-6 text-[56px] leading-[0.88] tracking-tighter md:text-[88px]">
            How long{" "}
            <span className="f-display-it" style={{ color: "var(--cargo)" }}>
              actually
            </span>
            ?
          </h1>
          <p className="mt-6 max-w-2xl text-lg" style={{ color: "var(--ash)" }}>
            Realistic transit days based on lanes we run weekly. Add 2-3 days at origin and 1-2 at
            destination for typical clearance. Premium / express services compress the air numbers
            by 30-50%.
          </p>
        </div>
      </section>

      {Object.entries(grouped).map(([region, lanes]) => (
        <section key={region} className="py-16" style={{ background: "transparent" }}>
          <div className="mx-auto max-w-[1440px] px-6 md:px-8">
            <h2 className="f-display mb-8 text-3xl">{region}</h2>
            <div
              className="rounded-2xl border"
              style={{ borderColor: "var(--line)", background: "var(--ink)" }}
            >
              {lanes.map((r) => (
                <Link
                  key={r.slug}
                  href={`/routes/${r.slug}`}
                  className="grid grid-cols-2 items-center gap-4 border-b p-5 transition-colors last:border-b-0 hover:bg-[var(--surface-tint-2)] md:grid-cols-12"
                  style={{ borderColor: "var(--line-2)" }}
                >
                  <div className="text-sm md:col-span-5">
                    <span className="font-medium">
                      {r.fromCity} → {r.toCity}
                    </span>
                    <div className="caption mt-1 text-[10px]" style={{ color: "var(--ash)" }}>
                      {r.fromCode} → {r.toCode}
                    </div>
                  </div>
                  <div className="md:col-span-2">
                    <Pill kind={r.mode === "Air" ? "cargo" : "brass"}>{r.mode}</Pill>
                  </div>
                  <div className="f-mono text-sm md:col-span-2">{r.days} days</div>
                  <div className="f-mono text-sm md:col-span-2" style={{ color: "var(--ash)" }}>
                    {r.freqWeekly}× / wk
                  </div>
                  <div
                    className="f-display tabular text-right text-base md:col-span-1 md:text-lg"
                    style={{ color: "var(--cargo)" }}
                  >
                    {formatINR(r.rate)}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      ))}

      <section className="py-24" style={{ background: "var(--ink-2)" }}>
        <div className="mx-auto max-w-[1440px] px-6 md:px-8">
          <div
            className="hero-glow relative overflow-hidden rounded-3xl p-12 md:p-16"
            style={{ border: "1px solid var(--line)" }}
          >
            <div className="relative z-10 grid items-center gap-12 lg:grid-cols-2">
              <div>
                <h2 className="f-display mb-6 text-[44px] leading-[0.95] tracking-tight md:text-[56px]">
                  Need a precise quote?
                </h2>
                <p className="text-lg" style={{ color: "var(--ash)" }}>
                  Indicative is the start. Send the brief — origin, destination, mode, weight,
                  volume — and we&apos;ll come back with three real prices in 27 minutes.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row lg:justify-end">
                <Link href="/quote" className="btn-primary">
                  Get a quote <ArrowRight size={14} />
                </Link>
                <Link href="/routes" className="btn-ghost">
                  All routes
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
