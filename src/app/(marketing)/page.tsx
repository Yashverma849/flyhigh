import type { Metadata } from "next";
import Link from "next/link";
import { ArrowDown, ArrowRight, ArrowUpRight, Quote as QuoteIcon, Star } from "lucide-react";
import { Pill } from "@/components/shared/pill";
import { Marquee } from "@/components/shared/marquee";
import { CompassSvg } from "@/components/shared/svg";
import { CoverageSection } from "@/components/marketing/coverage-section";
import { QuietTrust } from "@/components/marketing/quiet-trust";
import { HeroSloganRotator } from "@/components/marketing/hero-slogan-rotator";
import { ManifestoSection } from "@/components/marketing/manifesto-section";
import { ServicesSlider } from "@/components/marketing/services-slider";
import { RoutesTable } from "@/components/marketing/routes-table";
import { IndustriesSlider } from "@/components/marketing/industries-slider";
import { STATS } from "@/server/db/seed/stats";
import { CountUp } from "@/components/shared/count-up";
import { TESTIMONIALS } from "@/server/db/seed/testimonials";
import { pageMetadata } from "@/lib/seo";
import { CtaBackground } from "@/components/marketing/cta-background";

export const metadata: Metadata = pageMetadata({
  title: "Flyhigh — Worldwide Freight, Refined.",
  description:
    "Mumbai-based freight forwarding maison with worldwide reach. Sea, air, customs, warehousing, road, and ATA Carnet — handled with editorial precision.",
  path: "/",
  keywords: [
    "freight forwarding India",
    "Mumbai freight forwarder",
    "ocean freight India",
    "air freight India",
    "customs broker Mumbai",
    "ATA Carnet India",
    "international shipping India",
  ],
});

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


function CompassBadge({
  size,
  compassSize,
  fontSize,
}: {
  size: number;
  compassSize: number;
  fontSize: number;
}) {
  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg
        viewBox="0 0 200 200"
        className="h-full w-full"
        style={{ animation: "orbit 30s linear infinite" }}
        aria-hidden="true"
      >
        <defs>
          <path
            id={`compass-circle-${size}`}
            d="M 100,100 m -85,0 a 85,85 0 1,1 170,0 a 85,85 0 1,1 -170,0"
          />
        </defs>
        <text
          className="f-mono font-bold uppercase"
          style={{ fontSize, letterSpacing: "0.22em", fontWeight: "bold" }}
          fill="var(--brass)"
        >
          <textPath href={`#compass-circle-${size}`}>
            — refined freight · since 2017 · refined freight · since 2017{" "}
          </textPath>
        </text>
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <CompassSvg size={compassSize} />
      </div>
    </div>
  );
}

export default function HomePage() {
  return (
    <>
      {/* HERO */}
      <section className="hero-section relative overflow-hidden min-h-[100svh]">
        {/* Background Video */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 h-full w-full object-cover pointer-events-none"
        >
          <source src="/herosection.mp4" type="video/mp4" />
        </video>

        <div className="site-gutter relative flex min-h-[100svh] flex-col pt-32 pb-20 lg:pt-40 lg:pb-24">
          {/* Main grid */}
          <div className="grid flex-1 grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-12">
            {/* LEFT: text */}
            <div className="lg:col-span-12">
              <h1
                className="f-display fade-up s2 mb-10 leading-[0.95] tracking-tighter"
                style={{ fontSize: "clamp(2rem, 7vw, 5.5rem)", color: "var(--bone)" }}
              >
                <HeroSloganRotator />
              </h1>

              <p
                className="f-body fade-up s3 mb-8 max-w-xl text-lg leading-relaxed md:text-xl"
                style={{ color: "var(--bone)" }}
              >
                A Mumbai house quietly moving cargo for India&apos;s most demanding clients — across
                continents, ports, and one ocean of impossible-on-paper shipments.
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
          </div>

          {/* Compass Badge in Bottom Right Corner */}
          <div className="absolute right-6 bottom-8 md:right-8 lg:right-12">
            <CompassBadge size={140} compassSize={56} fontSize={13} />
          </div>

          {/* Scroll cue */}
          <div className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 opacity-60">
            <span className="caption text-[10px]">SCROLL</span>
            <ArrowDown size={14} className="float-y" style={{ color: "var(--cargo)" }} />
          </div>
        </div>
      </section>

      {/* TRUST / CLIENTS */}
      <QuietTrust />

      {/* MANIFESTO */}
      <ManifestoSection />

      {/* SERVICES */}
      <section className="border-t py-16" style={{ borderColor: "var(--line)" }}>
        <div className="site-gutter">
          <div className="mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <h2 className="f-display text-[56px] leading-[0.95] tracking-tight md:text-[80px]">
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

          <ServicesSlider />
        </div>
      </section>

      {/* STATS */}
      <section className="relative py-16" style={{ background: "var(--ink-2)" }}>
        <div className="dotted-bg absolute inset-0 opacity-30" />
        <div className="site-gutter relative">
          <div className="grid items-center gap-16 lg:grid-cols-2">
            <div>
              <h2 className="f-display mb-8 text-[56px] leading-[0.95] tracking-tight md:text-[80px]">
                Nine years.
                <br />
                <span className="f-display-it" style={{ color: "var(--cargo)" }}>
                  One ledger.
                </span>
              </h2>
              <p className="mb-10 max-w-xl text-lg leading-relaxed" style={{ color: "var(--ash)" }}>
                Every shipment we have ever cleared, lost, expedited, recovered, or refused lives in
                a single ledger we still update by hand at quarter close. The numbers below are from
                that ledger, not a marketing deck.
              </p>
              <Link href="/about" className="btn-link">
                Read the company story <ArrowRight size={14} />
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-px" style={{ background: "var(--line)" }}>
              {STATS.map((s, i) => (
                <div
                  key={i}
                  className="fade-up p-5 sm:p-8 lg:p-6 xl:p-10 2xl:p-12"
                  style={{ background: "var(--ink-2)", animationDelay: `${i * 0.1}s` }}
                >
                  <div
                    className="f-display tabular mb-3 text-[38px] sm:text-[56px] md:text-[72px] lg:text-[48px] xl:text-[64px] 2xl:text-[80px] leading-none"
                    style={{ color: "var(--cargo)" }}
                  >
                    <CountUp
                      target={s.target}
                      suffix={s.suffix}
                      decimals={s.decimals ?? 0}
                      duration={2400}
                    />
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
      <section className="py-16">
        <div className="site-gutter">
          <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
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

          <RoutesTable />
          <p className="caption mt-4" style={{ color: "var(--ash)" }}>
            INDICATIVE · 1 × 20&apos; DRY CONTAINER · EX-WORKS · EXCLUDES TAXES &amp; SURCHARGES ·{" "}
            <Link href="/routes" className="u-link">
              ALL FIFTEEN LANES →
            </Link>
          </p>
        </div>
      </section>

      {/* INDUSTRIES SURFACE */}
      <section className="py-16" style={{ background: "var(--ink-2)" }}>
        <div className="site-gutter">
          <div className="mb-12 grid gap-8 lg:grid-cols-2 lg:gap-20">
            <div>
              <h2 className="f-display text-[44px] leading-[0.95] tracking-tight md:text-[72px]">
                Eight desks,
                <br />
                <span className="f-display-it" style={{ color: "var(--cargo)" }}>
                  one
                </span>{" "}
                house.
              </h2>
            </div>
            <div className="lg:pt-12">
              <p className="text-lg leading-relaxed" style={{ color: "var(--ash)" }}>
                Pharma cool-chain and lithium-battery air corridors are not the same craft. We run
                dedicated desks for each.
              </p>
              <Link href="/industries" className="btn-link mt-4">
                Explore industries <ArrowRight size={14} />
              </Link>
            </div>
          </div>
          <IndustriesSlider />
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-16">
        <div className="site-gutter">
          <div className="grid gap-px lg:grid-cols-3" style={{ background: "var(--line)" }}>
            {TESTIMONIALS.map((t, i) => (
              <div key={i} className="flex flex-col p-8 lg:p-10" style={{ background: "var(--ink)" }}>
                <QuoteIcon size={28} style={{ color: "var(--cargo)" }} className="mb-6 flex-shrink-0" />
                <blockquote className="f-display mb-8 text-2xl leading-tight text-left flex-1">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <div
                  className="mt-auto flex items-center justify-between border-t pt-6"
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

      <CoverageSection />

      {/* TICKER */}
      <section
        className="w-full min-w-0 overflow-x-clip border-y py-10"
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
              <span style={{ color: "var(--cargo)" }}>•</span>
            </span>
          ))}
        </Marquee>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden py-32 bg-black">
        {/* Background Image Layer */}
        <div className="absolute inset-0 z-0 opacity-40">
          <CtaBackground alt="CTA Background Cargo Plane" />
          <div
            className="absolute inset-0"
            style={{
              background: "linear-gradient(to top, var(--ink) 0%, transparent 60%, var(--ink) 100%)",
            }}
          />
        </div>
        <div className="site-gutter relative z-10 text-center">
          <h2 className="f-display text-[80px] leading-[0.9] tracking-tighter md:text-[140px] text-white">
            Tell us what
            <br />
            you need to{" "}
            <span className="f-display-it" style={{ color: "var(--cargo)" }}>
              move.
            </span>
          </h2>
          <p className="mx-auto mt-8 max-w-2xl text-xl text-neutral-300">
            A single message reaches three people: a planner, a customs broker, and the head of
            operations. You will hear back within ninety minutes — usually under thirty.
          </p>
          <div className="mt-12 flex flex-col justify-center gap-4 sm:flex-row">
            <Link href="/quote" className="btn-primary px-8 py-4 text-base" data-cursor="QUOTE">
              Request a quote <ArrowUpRight size={18} />
            </Link>
            <Link href="/contact" className="btn-ghost px-8 py-4 text-base" data-cursor="CONTACT" style={{ color: "white", borderColor: "rgba(255,255,255,0.2)" }}>
              Speak with a planner
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
