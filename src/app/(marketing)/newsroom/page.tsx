import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import { SectionLabel } from "@/components/shared/section-label";
import { Pill } from "@/components/shared/pill";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { JsonLd } from "@/components/shared/json-ld";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = pageMetadata({
  title: "Newsroom & press",
  description:
    "Press releases, leadership announcements, and partnership news from Flyhigh. For media enquiries: flyhighfreightservices@gmail.com.",
  path: "/newsroom",
  keywords: ["Flyhigh news", "freight industry press", "logistics announcements"],
});

const breadcrumbs = [
  { name: "Home", href: "/" },
  { name: "Newsroom", href: "/newsroom" },
];

const ANNOUNCEMENTS = [
  {
    date: "2026-04-12",
    tag: "PARTNERSHIP",
    title: "Flyhigh joins the World Cargo Alliance — extends global agent reach to 192 countries",
    blurb:
      "Membership of WCA grants Flyhigh's clients direct routing through 14,000 vetted forwarder offices worldwide.",
  },
  {
    date: "2026-03-08",
    tag: "OPERATIONS",
    title: "New bonded warehouse opens at Mundra — 28,000 sq.ft. of climate-controlled DG storage",
    blurb:
      "The facility doubles Flyhigh's bonded chemical-storage footprint, with IMDG-compliant racking for Classes 3, 6, and 8.",
  },
  {
    date: "2026-02-04",
    tag: "AWARD",
    title: "Best India-Europe Forwarder 2025 — STAT Trade Times",
    blurb:
      "Recognition for the Cape-routing redundancy programme deployed during the 2024-25 Red Sea disruption.",
  },
  {
    date: "2025-11-30",
    tag: "LEADERSHIP",
    title: "Priya Bhatt joins Flyhigh as Head of Cool Chain",
    blurb:
      "Priya brings 18 years from a global pharma cool-chain integrator. The cool-chain desk now operates as a dedicated profit centre.",
  },
  {
    date: "2025-09-15",
    tag: "TECHNOLOGY",
    title: "Live shipment portal launches — temperature, location, and ETA updates per minute",
    blurb:
      "Built in-house, available to every client at no additional charge. Sub-minute polling on cool-chain shipments.",
  },
  {
    date: "2025-08-02",
    tag: "MILESTONE",
    title: "Flyhigh crosses 50,000 cleared shipments since founding",
    blurb:
      "From a single-desk operation in 2017 to seven gateways and 184 staff. The compounding curve continues.",
  },
];

export default function NewsroomPage() {
  return (
    <>

      <section className="pt-32 pb-12">
        <div className="site-gutter">
          <Breadcrumbs items={breadcrumbs} />
          <SectionLabel num="01">NEWSROOM</SectionLabel>
          <h1 className="f-display mt-6 max-w-4xl text-[64px] leading-[0.88] tracking-tighter md:text-[110px]">
            What we&apos;re
            <br />
            <span className="f-display-it" style={{ color: "var(--cargo)" }}>
              building
            </span>
            .
          </h1>
          <p className="mt-8 max-w-2xl text-lg" style={{ color: "var(--ash)" }}>
            Partnerships, awards, leadership, and the milestones we mark publicly.
          </p>
        </div>
      </section>

      <section className="py-12">
        <div className="site-gutter">
          {ANNOUNCEMENTS.map((a) => (
            <article
              key={a.title}
              className="group lift mb-8 rounded-2xl p-8"
              style={{ border: "1px solid var(--line)", background: "var(--ink)" }}
            >
              <div className="mb-4 flex items-center gap-3">
                <Pill kind="cargo">{a.tag}</Pill>
                <time className="caption" dateTime={a.date} style={{ color: "var(--brass)" }}>
                  {formatDate(a.date)}
                </time>
              </div>
              <h2 className="f-display mb-3 text-3xl leading-tight tracking-tight">{a.title}</h2>
              <p className="text-base leading-relaxed" style={{ color: "var(--ash)" }}>
                {a.blurb}
              </p>
              <a
                href={`mailto:flyhighfreightservices@gmail.com?subject=${encodeURIComponent("Press enquiry — " + a.title)}`}
                className="caption mt-6 inline-flex items-center gap-2 transition-colors group-hover:text-[var(--cargo)]"
                style={{ color: "var(--brass)" }}
              >
                PRESS ENQUIRY <ArrowUpRight size={12} />
              </a>
            </article>
          ))}
        </div>
      </section>

      <section className="py-24" style={{ background: "var(--ink-2)" }}>
        <div className="site-gutter">
          <div
            className="rounded-3xl p-12 md:p-16"
            style={{ border: "1px solid var(--line)", background: "var(--ink)" }}
          >
            <SectionLabel num="—">PRESS CONTACT</SectionLabel>
            <h2 className="f-display mt-4 mb-6 text-4xl">Speak to comms.</h2>
            <p className="mb-6 text-lg" style={{ color: "var(--ash)" }}>
              For interviews, commentary on freight, and image library access:
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <a href="mailto:flyhighfreightservices@gmail.com" className="btn-primary">
                flyhighfreightservices@gmail.com
              </a>
              <a href="tel:+919322627766" className="btn-ghost">
                +91 9322627766
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
