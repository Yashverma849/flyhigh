import Link from "next/link";
import { ArrowDown, ArrowRight, ArrowUpRight, Quote as QuoteIcon, Star } from "lucide-react";
import { SectionLabel } from "@/components/shared/section-label";
import { Pill } from "@/components/shared/pill";
import { Marquee } from "@/components/shared/marquee";
import { CompassSvg, Horizon, RouteMap } from "@/components/shared/svg";
import { QuietTrust } from "@/components/marketing/quiet-trust";
import { SERVICES } from "@/server/db/seed/services";
import { STATS } from "@/server/db/seed/stats";
import { ROUTES } from "@/server/db/seed/routes";
import { TESTIMONIALS } from "@/server/db/seed/testimonials";
import { formatINR } from "@/lib/utils";

const tickerRoutes = [
  ["MUMBAI", "ROTTERDAM", "21D"],
  ["DELHI", "FRANKFURT", "3D"],
  ["MUNDRA", "LAGOS", "28D"],
  ["CHENNAI", "MOMBASA", "14D"],
  ["BANGALORE", "LONDON", "2D"],
  ["KOLKATA", "SINGAPORE", "9D"],
  ["HYDERABAD", "TOKYO", "4D"],
  ["PUNE", "DUBAI", "1D"],
] as const;

const coverage = [
  { n: "EUROPE", v: "32 ports" },
  { n: "AFRICA", v: "21 ports" },
  { n: "GULF", v: "18 ports" },
  { n: "AMERICAS", v: "24 ports" },
  { n: "ASIA-PAC", v: "47 ports" },
  { n: "OCEANIA", v: "9 ports" },
] as const;

export default function HomePage() {
  return (
    <>
      {/* HERO */}
      <section className="hero-glow relative overflow-hidden" style={{ minHeight: "100vh" }}>
        <div className="absolute inset-0 opacity-60">
          <Horizon />
        </div>
        <div className="topo absolute inset-0 opacity-40" />
        <div
          className="relative mx-auto max-w-[1440px] px-6 pt-16 pb-24 md:px-8"
          style={{ minHeight: "100vh" }}
        >
          <div className="flex h-full flex-col" style={{ minHeight: "calc(100vh - 200px)" }}>
            <div className="fade-up s1 mb-8">
              <SectionLabel num="01">A FREIGHT MAISON · SINCE 2017</SectionLabel>
            </div>

            <h1 className="f-display fade-up s2 mb-6 text-[64px] leading-[0.88] tracking-tighter md:text-[120px] lg:text-[160px]">
              Worldwide
              <br />
              <span className="f-display-it" style={{ color: "var(--cargo)" }}>
                freight
              </span>
              ,
              <br />
              <span style={{ color: "var(--bone)" }}>refined.</span>
            </h1>

            <div className="mt-auto flex flex-col justify-between gap-8 pt-12 md:flex-row md:items-end">
              <p
                className="f-body fade-up s3 max-w-xl text-lg leading-relaxed md:text-xl"
                style={{ color: "var(--bone)" }}
              >
                A Mumbai house quietly moving cargo for India&apos;s most demanding clients —
                across 92 countries, 180 ports, and one ocean of impossible-on-paper shipments.
              </p>
              <div className="fade-up s4 flex flex-col gap-3 sm:flex-row">
                <Link href="/quote" className="btn-primary" data-cursor="GET QUOTE">
                  Request a quote <ArrowUpRight size={16} />
                </Link>
                <Link href="/services" className="btn-ghost" data-cursor="EXPLORE">
                  Explore services
                </Link>
              </div>
            </div>

            {/* Hero floating badge */}
            <div className="absolute top-32 right-8 hidden xl:block">
              <div className="relative" style={{ width: 180, height: 180 }}>
                <svg
                  viewBox="0 0 200 200"
                  className="h-full w-full"
                  style={{ animation: "orbit 30s linear infinite" }}
                  aria-hidden="true"
                >
                  <defs>
                    <path
                      id="circle"
                      d="M 100,100 m -75,0 a 75,75 0 1,1 150,0 a 75,75 0 1,1 -150,0"
                    />
                  </defs>
                  <text
                    className="f-mono uppercase"
                    style={{ fontSize: 11, letterSpacing: "0.3em" }}
                    fill="var(--brass)"
                  >
                    <textPath href="#circle">
                      — refined freight · since 2017 · refined freight · since 2017{" "}
                    </textPath>
                  </text>
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <CompassSvg size={64} />
                </div>
              </div>
            </div>

            {/* Scroll cue */}
            <div className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 opacity-60">
              <span className="caption text-[10px]">SCROLL</span>
              <ArrowDown size={14} className="float-y" style={{ color: "var(--cargo)" }} />
            </div>
          </div>
        </div>
      </section>

      {/* TRUST / CLIENTS */}
      <QuietTrust />

      {/* MANIFESTO */}
      <section className="relative py-32" style={{ background: "var(--ink-2)" }}>
        <div className="mx-auto max-w-[1440px] px-6 md:px-8">
          <div className="grid gap-8 lg:grid-cols-12">
            <div className="self-start lg:sticky lg:top-32 lg:col-span-3">
              <SectionLabel num="02">MANIFESTO</SectionLabel>
              <p className="caption mt-6 leading-relaxed" style={{ color: "var(--ash)" }}>
                Why this house exists, in five sentences.
              </p>
            </div>
            <div className="lg:col-span-9">
              <p className="f-display text-[28px] leading-[1.15] tracking-tight md:text-[44px] lg:text-[56px]">
                Most freight forwarders ship boxes.{" "}
                <span style={{ color: "var(--ash)" }}>
                  We ship the things inside them — pharma that cannot warm by half a degree,
                  turbine blades the length of a city block, fashion that must arrive before the
                  runway.
                </span>{" "}
                We made our peace with two facts:{" "}
                <span className="f-display-it" style={{ color: "var(--cargo)" }}>
                  cargo is human, and time is unforgiving.
                </span>{" "}
                The rest is craft.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="border-t py-24" style={{ borderColor: "var(--line)" }}>
        <div className="mx-auto max-w-[1440px] px-6 md:px-8">
          <div className="mb-16 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <SectionLabel num="03">SERVICES</SectionLabel>
              <h2 className="f-display mt-4 text-[56px] leading-[0.95] tracking-tight md:text-[80px]">
                Six disciplines.
                <br />
                <span className="f-display-it" style={{ color: "var(--brass)" }}>
                  One house.
                </span>
              </h2>
            </div>
            <Link href="/services" className="btn-ghost self-start" data-cursor="ALL SERVICES">
              All services <ArrowRight size={14} />
            </Link>
          </div>

          <div
            className="grid gap-px md:grid-cols-2 lg:grid-cols-3"
            style={{ background: "var(--line)" }}
          >
            {SERVICES.map((s, i) => {
              const Icon = s.icon;
              return (
                <Link
                  key={s.id}
                  href={`/services/${s.slug}`}
                  className="tile group lift block p-8 text-left"
                  style={{ background: "var(--ink)" }}
                  data-cursor={`OPEN ${s.tag}`}
                >
                  <div className="mb-12 flex items-start justify-between">
                    <div
                      className="rounded-xl p-3"
                      style={{
                        background: "var(--cargo-tint-10)",
                        border: "1px solid var(--cargo-border-20)",
                      }}
                    >
                      <Icon size={22} style={{ color: "var(--cargo)" }} />
                    </div>
                    <div className="caption text-[10px]" style={{ color: "var(--brass)" }}>
                      0{i + 1}
                    </div>
                  </div>
                  <div className="caption mb-3" style={{ color: "var(--cargo)" }}>
                    {s.tag}
                  </div>
                  <h3 className="f-display mb-3 text-[34px] leading-tight">{s.name}</h3>
                  <p className="mb-6 text-sm leading-relaxed" style={{ color: "var(--ash)" }}>
                    {s.short}
                  </p>
                  <div
                    className="flex items-center justify-between border-t pt-6"
                    style={{ borderColor: "var(--line)" }}
                  >
                    <div className="flex items-center gap-4 text-xs">
                      <span>
                        <span className="f-mono" style={{ color: "var(--brass)" }}>
                          {s.eta}
                        </span>{" "}
                        eta
                      </span>
                      <span>
                        <span className="f-mono" style={{ color: "var(--brass)" }}>
                          {s.coverage}
                        </span>
                      </span>
                    </div>
                    <ArrowUpRight
                      size={20}
                      className="transition-transform group-hover:-translate-y-1 group-hover:translate-x-1"
                      style={{ color: "var(--cargo)" }}
                    />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="relative py-32" style={{ background: "var(--ink-2)" }}>
        <div className="dotted-bg absolute inset-0 opacity-30" />
        <div className="relative mx-auto max-w-[1440px] px-6 md:px-8">
          <div className="grid items-center gap-16 lg:grid-cols-2">
            <div>
              <SectionLabel num="04">BY THE NUMBERS</SectionLabel>
              <h2 className="f-display mt-6 mb-8 text-[56px] leading-[0.95] tracking-tight md:text-[80px]">
                Nine years.
                <br />
                <span className="f-display-it" style={{ color: "var(--cargo)" }}>
                  One ledger.
                </span>
              </h2>
              <p
                className="mb-10 max-w-xl text-lg leading-relaxed"
                style={{ color: "var(--ash)" }}
              >
                Every shipment we have ever cleared, lost, expedited, recovered, or refused lives
                in a single ledger we still update by hand at quarter close. The numbers below are
                from that ledger, not a marketing deck.
              </p>
              <Link href="/about" className="btn-link">
                Read the company story <ArrowRight size={14} />
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-px" style={{ background: "var(--line)" }}>
              {STATS.map((s, i) => (
                <div
                  key={i}
                  className="fade-up p-8 lg:p-12"
                  style={{ background: "var(--ink-2)", animationDelay: `${i * 0.1}s` }}
                >
                  <div
                    className="f-display tabular mb-3 text-[64px] leading-none md:text-[88px]"
                    style={{ color: "var(--cargo)" }}
                  >
                    {s.value}
                  </div>
                  <div className="text-sm" style={{ color: "var(--bone)" }}>
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ROUTE PRICING */}
      <section className="py-32">
        <div className="mx-auto max-w-[1440px] px-6 md:px-8">
          <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <SectionLabel num="05">RATES</SectionLabel>
              <h2 className="f-display mt-4 text-[56px] leading-[0.95] tracking-tight md:text-[80px]">
                Live trade lanes,
                <br />
                <span className="f-display-it" style={{ color: "var(--brass)" }}>
                  indicative rates.
                </span>
              </h2>
            </div>
            <Link href="/quote" className="btn-primary" data-cursor="QUOTE">
              Get exact quote <ArrowRight size={14} />
            </Link>
          </div>

          <div
            className="overflow-hidden rounded-2xl"
            style={{ border: "1px solid var(--line)", background: "var(--ink-2)" }}
          >
            <div
              className="caption grid grid-cols-12 gap-4 border-b p-5"
              style={{ borderColor: "var(--line)" }}
            >
              <div className="col-span-4">ORIGIN → DESTINATION</div>
              <div className="col-span-2">MODE</div>
              <div className="col-span-2">TRANSIT</div>
              <div className="col-span-3 text-right">FROM</div>
              <div className="col-span-1" />
            </div>
            {ROUTES.map((r, i) => (
              <div
                key={i}
                className="group grid grid-cols-12 items-center gap-4 border-b p-5 transition-colors last:border-b-0 hover:bg-[var(--surface-tint-2)]"
                style={{ borderColor: "var(--line-2)" }}
              >
                <div className="col-span-4 flex items-center gap-2 text-sm">
                  <span className="font-medium">{r.from}</span>
                  <ArrowRight size={12} style={{ color: "var(--cargo)" }} />
                  <span className="font-medium">{r.to}</span>
                </div>
                <div className="col-span-2">
                  <Pill kind={r.mode === "Air" ? "cargo" : "brass"}>{r.mode}</Pill>
                </div>
                <div className="f-mono col-span-2 text-sm">{r.days} days</div>
                <div
                  className="f-display tabular col-span-3 text-right text-[24px]"
                  style={{ color: "var(--cargo)" }}
                >
                  {formatINR(r.rate)}
                </div>
                <div className="col-span-1 text-right">
                  <Link
                    href="/quote"
                    aria-label={`Quote ${r.from} to ${r.to}`}
                    className="opacity-0 transition-opacity group-hover:opacity-100"
                  >
                    <ArrowUpRight size={16} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
          <p className="caption mt-4" style={{ color: "var(--ash)" }}>
            INDICATIVE · 1 × 20&apos; DRY CONTAINER · EX-WORKS · EXCLUDES TAXES &amp; SURCHARGES
          </p>
        </div>
      </section>

      {/* TICKER */}
      <section
        className="border-y py-10"
        style={{ borderColor: "var(--line)", background: "var(--ink-2)" }}
      >
        <Marquee speed={50}>
          {tickerRoutes.map(([from, to, days], i) => (
            <span key={i} className="flex items-center gap-12">
              <span className="f-display text-3xl md:text-4xl">{from}</span>
              <ArrowRight size={20} style={{ color: "var(--cargo)" }} />
              <span className="f-display text-3xl md:text-4xl">{to}</span>
              <span className="f-mono text-sm" style={{ color: "var(--brass)" }}>
                {days}
              </span>
              <span style={{ color: "var(--cargo)" }}>✦</span>
            </span>
          ))}
        </Marquee>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-32">
        <div className="mx-auto max-w-[1440px] px-6 md:px-8">
          <SectionLabel num="07">VOICES</SectionLabel>
          <div className="mt-8 grid gap-px lg:grid-cols-3" style={{ background: "var(--line)" }}>
            {TESTIMONIALS.map((t, i) => (
              <div key={i} className="p-8 lg:p-10" style={{ background: "var(--ink)" }}>
                <QuoteIcon size={28} style={{ color: "var(--cargo)" }} className="mb-6" />
                <blockquote className="f-display mb-8 text-2xl leading-tight">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <div
                  className="flex items-center justify-between border-t pt-6"
                  style={{ borderColor: "var(--line)" }}
                >
                  <div>
                    <div className="font-semibold">{t.name}</div>
                    <div className="mt-0.5 text-xs" style={{ color: "var(--ash)" }}>
                      {t.role}
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    {Array.from({ length: t.rating }).map((_, j) => (
                      <Star key={j} size={12} fill="var(--cargo)" stroke="var(--cargo)" />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COVERAGE MAP */}
      <section className="relative py-32" style={{ background: "var(--ink-2)" }}>
        <div className="mx-auto max-w-[1440px] px-6 md:px-8">
          <div className="grid items-center gap-16 lg:grid-cols-2">
            <div
              className="aspect-[4/3] overflow-hidden rounded-2xl"
              style={{ border: "1px solid var(--line)" }}
            >
              <RouteMap />
            </div>
            <div>
              <SectionLabel num="08">COVERAGE</SectionLabel>
              <h2 className="f-display mt-4 mb-6 text-[56px] leading-[0.95] tracking-tight md:text-[72px]">
                Everywhere
                <br />
                <span className="f-display-it" style={{ color: "var(--cargo)" }}>
                  most don&apos;t.
                </span>
              </h2>
              <p
                className="mb-8 text-lg leading-relaxed"
                style={{ color: "var(--ash)" }}
              >
                Our agent network was built backwards — starting with the impossible inland-Africa
                lanes, the Persian Gulf hinterlands, and the niche European corridors that bigger
                forwarders skip. The easy lanes were added later.
              </p>
              <div className="grid grid-cols-3 gap-px" style={{ background: "var(--line)" }}>
                {coverage.map((r, i) => (
                  <div key={i} className="p-5" style={{ background: "var(--ink-2)" }}>
                    <div className="caption text-[10px]" style={{ color: "var(--brass)" }}>
                      {r.n}
                    </div>
                    <div className="f-display mt-1 text-2xl">{r.v}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden py-32">
        <div className="hero-glow absolute inset-0" />
        <div className="relative mx-auto max-w-[1440px] px-6 text-center md:px-8">
          <SectionLabel num="09">
            <span className="mx-auto block">START</span>
          </SectionLabel>
          <h2 className="f-display mt-8 text-[80px] leading-[0.9] tracking-tighter md:text-[140px]">
            Tell us what
            <br />
            you need to{" "}
            <span className="f-display-it" style={{ color: "var(--cargo)" }}>
              move.
            </span>
          </h2>
          <p className="mx-auto mt-8 max-w-2xl text-xl" style={{ color: "var(--ash)" }}>
            A single message reaches three people: a planner, a customs broker, and the head of
            operations. You will hear back within ninety minutes — usually under thirty.
          </p>
          <div className="mt-12 flex flex-col justify-center gap-4 sm:flex-row">
            <Link
              href="/quote"
              className="btn-primary px-8 py-4 text-base"
              data-cursor="QUOTE"
            >
              Request a quote <ArrowUpRight size={18} />
            </Link>
            <Link
              href="/contact"
              className="btn-ghost px-8 py-4 text-base"
              data-cursor="CONTACT"
            >
              Speak with a planner
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
