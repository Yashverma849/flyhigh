import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Award, Compass, ShieldCheck } from "lucide-react";
import { SectionLabel } from "@/components/shared/section-label";
import { Pill } from "@/components/shared/pill";
import { CompassSvg } from "@/components/shared/svg";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { TIMELINE } from "@/server/db/seed/timeline";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "About the house",
  description:
    "Flyhigh, founded in Mumbai in 2017 — a freight forwarding maison built like an atelier. Eight industry desks, seven gateways, and 184 staff.",
  path: "/about",
  keywords: ["about Flyhigh", "Mumbai freight forwarder", "logistics company India", "freight forwarder founded 2017"],
});

const values = [
  {
    t: "Vision",
    b: "To be India's most trusted total-logistics house — the local partner for worldwide needs.",
    icon: Compass,
  },
  {
    t: "Mission",
    b: "Reliable, safe, affordable services delivered with the precision of an atelier and the reach of an empire.",
    icon: ShieldCheck,
  },
  {
    t: "Values",
    b: "Customers are the lifeline. Time is the currency. Craft is non-negotiable.",
    icon: Award,
  },
];

const team = [
  { name: "Rahul Kapoor", role: "Founder & Managing Director", years: 22, focus: "Project Cargo" },
  { name: "Sahana Iyer", role: "Director, Air & Pharma", years: 18, focus: "Cool Chain" },
  { name: "Faisal Khan", role: "Director, Sea Freight", years: 24, focus: "FCL/LCL" },
  { name: "Meera D'Souza", role: "Head of Customs", years: 16, focus: "ATA Carnet" },
  { name: "Dev Singh", role: "Head of Warehousing", years: 14, focus: "Cleanroom" },
  { name: "Anand Pillai", role: "Director, Africa Desk", years: 12, focus: "Hinterland" },
  { name: "Priya Bose", role: "Head of Compliance", years: 19, focus: "Trade Law" },
  { name: "Vivek Shah", role: "CTO", years: 11, focus: "Concierge Tech" },
];

export default function AboutPage() {
  return (
    <>
      <section className="relative pt-32 pb-20">
        <div className="mx-auto max-w-[1440px] px-6 md:px-8">
          <Breadcrumbs
            items={[
              { name: "Home", href: "/" },
              { name: "About", href: "/about" },
            ]}
            className="mb-8"
          />
          <div className="grid gap-8 lg:grid-cols-12">
            <div className="fade-up s1 lg:col-span-5">
              <SectionLabel num="01">THE HOUSE</SectionLabel>
              <h1 className="f-display mt-6 text-[64px] leading-[0.88] tracking-tighter md:text-[110px]">
                A house for
                <br />
                <span className="f-display-it" style={{ color: "var(--cargo)" }}>
                  refined
                </span>
                <br />
                freight.
              </h1>
            </div>
            <div className="fade-up s2 lg:col-span-7 lg:pt-32">
              <p
                className="text-xl leading-relaxed md:text-2xl"
                style={{ color: "var(--bone)" }}
              >
                Flyhigh was founded in Mumbai in 2017 with a small premise: that freight
                forwarding deserves the care of a tailoring atelier. Our first consignment was
                eighteen tonnes of textile machinery, Mumbai to Lagos. The hardest part wasn&apos;t
                the ocean — it was finding a Lagos broker who would treat a stranger&apos;s cargo
                like their own. So we built one.
              </p>
              <p className="mt-6 text-lg leading-relaxed" style={{ color: "var(--ash)" }}>
                Today, we operate across 92 countries through agents we have personally met. We
                have desks in cities most forwarders cannot pronounce. And we still close every
                quarter with a paper ledger.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20" style={{ background: "var(--ink-2)" }}>
        <div
          className="mx-auto grid max-w-[1440px] gap-px px-6 md:px-8 lg:grid-cols-3"
          style={{ background: "var(--line)" }}
        >
          {values.map(({ t, b, icon: Icon }) => (
            <div key={t} className="p-10" style={{ background: "var(--ink-2)" }}>
              <Icon size={32} style={{ color: "var(--cargo)" }} className="mb-6" />
              <h3 className="f-display mb-3 text-3xl">{t}</h3>
              <p className="leading-relaxed" style={{ color: "var(--ash)" }}>
                {b}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-32">
        <div className="mx-auto max-w-[1440px] px-6 md:px-8">
          <SectionLabel num="02">CHRONOLOGY</SectionLabel>
          <h2 className="f-display mt-4 mb-16 text-[56px] leading-[0.95] tracking-tight md:text-[80px]">
            Nine years,
            <br />
            <span className="f-display-it" style={{ color: "var(--brass)" }}>
              one notebook.
            </span>
          </h2>
          <div className="grid gap-8 lg:grid-cols-12">
            <div className="hidden lg:col-span-1 lg:block">
              <div className="sticky top-32">
                <CompassSvg size={80} />
              </div>
            </div>
            <div className="lg:col-span-11">
              {TIMELINE.map((t) => (
                <div
                  key={t.year}
                  className="fade-up grid grid-cols-12 gap-6 border-t py-10"
                  style={{ borderColor: "var(--line)" }}
                >
                  <div
                    className="f-display tabular col-span-12 text-4xl md:col-span-2"
                    style={{ color: "var(--cargo)" }}
                  >
                    {t.year}
                  </div>
                  <div className="f-display col-span-12 text-3xl leading-tight md:col-span-4">
                    {t.title}
                  </div>
                  <div
                    className="col-span-12 text-lg leading-relaxed md:col-span-6"
                    style={{ color: "var(--ash)" }}
                  >
                    {t.body}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-t py-32" style={{ borderColor: "var(--line)" }}>
        <div className="mx-auto max-w-[1440px] px-6 md:px-8">
          <SectionLabel num="03">LEADERSHIP</SectionLabel>
          <h2 className="f-display mt-4 mb-16 text-[56px] leading-[0.95] tracking-tight md:text-[80px]">
            Twelve seniors.
            <br />
            <span className="f-display-it" style={{ color: "var(--cargo)" }}>
              One desk each.
            </span>
          </h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {team.map((p) => (
              <div key={p.name} className="lift glow-card group">
                <div
                  className="cine-frame relative mb-4 aspect-[3/4] overflow-hidden rounded-xl"
                  style={{
                    background: "linear-gradient(135deg, var(--ink-2), var(--ink-3))",
                    border: "1px solid var(--line)",
                  }}
                >
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div
                      className="f-display text-[80px] tracking-tighter opacity-20"
                      style={{ color: "var(--brass)" }}
                    >
                      {p.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </div>
                  </div>
                  <div className="absolute right-4 bottom-4 left-4 z-10">
                    <Pill kind="cargo">{p.focus}</Pill>
                  </div>
                </div>
                <div className="font-semibold">{p.name}</div>
                <div className="mt-1 text-sm" style={{ color: "var(--ash)" }}>
                  {p.role}
                </div>
                <div className="caption mt-2" style={{ color: "var(--brass)" }}>
                  {p.years} YRS IN CRAFT
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-32 text-center">
        <div className="mx-auto max-w-[1440px] px-6 md:px-8">
          <h2 className="f-display text-[64px] leading-[0.9] tracking-tighter md:text-[100px]">
            Want to{" "}
            <span className="f-display-it" style={{ color: "var(--cargo)" }}>
              work
            </span>{" "}
            with us?
          </h2>
          <div className="mt-12 flex justify-center gap-4">
            <Link
              href="/quote"
              className="btn-primary px-8 py-4 text-base"
              data-cursor="QUOTE"
            >
              Request a quote <ArrowRight size={16} />
            </Link>
            <Link href="/contact" className="btn-ghost px-8 py-4 text-base">
              Get in touch
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
