import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { AboutCharter } from "@/components/marketing/about-charter";
import { AboutTimeline } from "@/components/marketing/about-timeline";
import { AboutLeadership } from "@/components/marketing/about-leadership";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "About the house",
  description:
    "Flyhigh, founded in Mumbai in 2017 — a freight forwarding maison built like an atelier. Nine industry desks, seven gateways, and 184 staff.",
  path: "/about",
  keywords: [
    "about Flyhigh",
    "Mumbai freight forwarder",
    "logistics company India",
    "freight forwarder founded 2017",
  ],
});

const team = [
  { name: "Rahul Kapoor", role: "Founder & Managing Director", years: 22 },
  { name: "Sahana Iyer", role: "Director, Air & Pharma", years: 18 },
  { name: "Faisal Khan", role: "Director, Sea Freight", years: 24 },
  { name: "Meera D'Souza", role: "Head of Customs", years: 16 },
  { name: "Dev Singh", role: "Head of Warehousing", years: 14 },
  { name: "Anand Pillai", role: "Director, Africa Desk", years: 12 },
  { name: "Priya Bose", role: "Head of Compliance", years: 19 },
  { name: "Vivek Shah", role: "CTO", years: 11 },
];

export default function AboutPage() {
  return (
    <>
      <Breadcrumbs
        items={[
          { name: "Home", href: "/" },
          { name: "About", href: "/about" },
        ]}
      />
      <section className="hero-section relative overflow-hidden min-h-[100svh]">
        <div className="absolute inset-0 z-0">
          <img
            src="/aboutus%20hero.png"
            alt=""
            className="h-full w-full object-cover"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to right, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.55) 45%, rgba(0,0,0,0.72) 100%), linear-gradient(to top, var(--ink) 0%, transparent 35%)",
            }}
          />
        </div>
        <div className="site-gutter relative z-10 flex min-h-[100svh] flex-col pt-32 pb-20 lg:pt-40 lg:pb-24">
          <div className="grid flex-1 gap-8 lg:grid-cols-12">
            <div className="lg:col-span-5 lg:self-start">
              <h1 className="f-display text-[64px] leading-[0.88] tracking-tighter md:text-[110px]">
                A house for
                <br />
                <span className="f-display-it" style={{ color: "var(--cargo)" }}>
                  refined
                </span>
                <br />
                freight.
              </h1>
            </div>
            <div className="lg:col-span-7 lg:self-end lg:pt-0">
              <p className="text-xl leading-relaxed md:text-2xl" style={{ color: "var(--bone)" }}>
                Flyhigh was founded in Mumbai in 2017 with a small premise: that freight forwarding
                deserves the care of a tailoring atelier. Our first consignment was eighteen tonnes
                of textile machinery, Mumbai to Lagos. The hardest part wasn&apos;t the ocean — it
                was finding a Lagos broker who would treat a stranger&apos;s cargo like their own.
                So we built one.
              </p>
              <p className="mt-6 text-lg leading-relaxed" style={{ color: "var(--ash)" }}>
                Today, we operate worldwide through agents we have personally met. We have desks in
                cities most forwarders cannot pronounce. And we still close every quarter with a
                paper ledger.
              </p>
            </div>
          </div>
        </div>
      </section>

      <AboutCharter />

      <AboutTimeline />

      <AboutLeadership team={team} />

      <section className="relative overflow-hidden py-32 text-center">
        <div className="absolute inset-0 z-0">
          <img
            src="/cta%201.png"
            alt=""
            className="h-full w-full object-cover"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to top, var(--ink) 0%, rgba(0,0,0,0.55) 50%, var(--ink) 100%)",
            }}
          />
        </div>
        <div className="site-gutter relative z-10">
          <h2 className="f-display text-[64px] leading-[0.9] tracking-tighter text-white md:text-[100px]">
            Want to{" "}
            <span className="f-display-it" style={{ color: "var(--cargo)" }}>
              work
            </span>{" "}
            with us?
          </h2>
          <div className="mt-12 flex justify-center gap-4">
            <Link href="/quote" className="btn-primary px-8 py-4 text-base" data-cursor="QUOTE">
              Request a quote <ArrowRight size={16} />
            </Link>
            <Link
              href="/contact"
              className="btn-ghost px-8 py-4 text-base"
              style={{ color: "white", borderColor: "rgba(255,255,255,0.2)" }}
            >
              Get in touch
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
