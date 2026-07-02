import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, MapPin } from "lucide-react";
import { SectionLabel } from "@/components/shared/section-label";
import { Pill } from "@/components/shared/pill";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { JsonLd } from "@/components/shared/json-ld";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Careers at Flyhigh",
  description:
    "Join a freight maison that treats craft as a competitive advantage. Open roles in operations, customs, sales, and technology — Mumbai, Delhi, Chennai.",
  path: "/careers",
  keywords: [
    "freight forwarding jobs Mumbai",
    "logistics careers India",
    "customs broker jobs",
    "operations manager freight",
    "Flyhigh careers",
  ],
});

const breadcrumbs = [
  { name: "Home", href: "/" },
  { name: "Careers", href: "/careers" },
];

const ROLES = [
  {
    slug: "ops-planner-air",
    title: "Operations Planner — Air Desk",
    location: "Mumbai",
    type: "Full-time",
    team: "Operations",
    posted: "April 2026",
  },
  {
    slug: "customs-broker-licensed",
    title: "Customs Broker (Licensed CB)",
    location: "Mumbai · Mundra",
    type: "Full-time",
    team: "Customs",
    posted: "April 2026",
  },
  {
    slug: "key-account-pharma",
    title: "Key Account Manager — Pharma",
    location: "Hyderabad",
    type: "Full-time",
    team: "Commercial",
    posted: "March 2026",
  },
  {
    slug: "project-cargo-engineer",
    title: "Project Cargo Engineer",
    location: "Mumbai",
    type: "Full-time",
    team: "Project",
    posted: "March 2026",
  },
  {
    slug: "warehouse-supervisor-mundra",
    title: "Warehouse Supervisor — Bonded (DG)",
    location: "Mundra",
    type: "Full-time",
    team: "Operations",
    posted: "February 2026",
  },
  {
    slug: "fullstack-engineer",
    title: "Full-stack Engineer (TypeScript / Postgres)",
    location: "Mumbai · Remote-friendly",
    type: "Full-time",
    team: "Technology",
    posted: "February 2026",
  },
];

const VALUES = [
  {
    title: "Craft over scale",
    body: "We hire slowly, train deliberately, and pay for the difference between competent and great. We have never wanted to be the largest freight company; only the most respected.",
  },
  {
    title: "Honest math",
    body: "Quotes that match invoices. Promises that match performance. Internal scorecards visible to anyone who asks. We optimise for the second decision a client makes about us, not the first.",
  },
  {
    title: "Quiet excellence",
    body: "We don't run press releases for shipments that arrived. We run case studies for shipments that almost didn't. The desk is allowed to disagree with the founder; usually they're right.",
  },
];

export default function CareersPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd(breadcrumbs)} />

      <section className="pt-32 pb-12">
        <div className="mx-auto max-w-[1440px] px-6 md:px-8">
          <Breadcrumbs items={breadcrumbs} className="mb-8" />
          <div className="grid gap-8 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <SectionLabel num="01">CAREERS</SectionLabel>
              <h1 className="f-display mt-6 text-[64px] leading-[0.88] tracking-tighter md:text-[110px]">
                Join the
                <br />
                <span className="f-display-it" style={{ color: "var(--cargo)" }}>
                  desk
                </span>
                .
              </h1>
            </div>
            <div className="lg:col-span-5 lg:pt-32">
              <p className="text-lg leading-relaxed" style={{ color: "var(--ash)" }}>
                We hire for taste as well as competence — for the operator who reads the trade press
                for fun, the broker who can recite the IMDG amendment cycle from memory, the
                engineer who treats a shipment like a state machine.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-[1440px] px-6 md:px-8">
          <SectionLabel num="02">VALUES</SectionLabel>
          <div className="mt-8 grid gap-px md:grid-cols-3" style={{ background: "var(--line)" }}>
            {VALUES.map((v, i) => (
              <div key={v.title} className="p-8" style={{ background: "var(--ink)" }}>
                <div className="caption mb-3" style={{ color: "var(--cargo)" }}>
                  0{i + 1}
                </div>
                <div className="f-display mb-3 text-2xl tracking-tight">{v.title}</div>
                <p className="text-sm leading-relaxed" style={{ color: "var(--ash)" }}>
                  {v.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16" style={{ background: "var(--ink-2)" }}>
        <div className="mx-auto max-w-[1440px] px-6 md:px-8">
          <SectionLabel num="03">OPEN ROLES</SectionLabel>
          <h2 className="f-display mt-4 mb-10 text-4xl">Currently hiring.</h2>
          <div
            className="rounded-2xl border"
            style={{ borderColor: "var(--line)", background: "var(--ink-2)" }}
          >
            {ROLES.map((r) => (
              <a
                key={r.slug}
                href={`mailto:careers@flyhigh.in?subject=${encodeURIComponent("Application — " + r.title)}`}
                className="group grid grid-cols-1 items-center gap-3 border-b p-6 transition-colors last:border-b-0 hover:bg-[var(--surface-tint-2)] md:grid-cols-12"
                style={{ borderColor: "var(--line-2)" }}
              >
                <div className="md:col-span-5">
                  <div className="font-semibold">{r.title}</div>
                  <div className="caption mt-1" style={{ color: "var(--ash)" }}>
                    {r.team} · Posted {r.posted}
                  </div>
                </div>
                <div className="md:col-span-3">
                  <span
                    className="caption flex items-center gap-1.5"
                    style={{ color: "var(--brass)" }}
                  >
                    <MapPin size={11} /> {r.location}
                  </span>
                </div>
                <div className="md:col-span-2">
                  <Pill kind="brass">{r.type.toUpperCase()}</Pill>
                </div>
                <div className="text-right md:col-span-2">
                  <span className="btn-ghost text-xs">
                    Apply <ArrowUpRight size={12} />
                  </span>
                </div>
              </a>
            ))}
          </div>
          <p className="caption mt-4" style={{ color: "var(--ash)" }}>
            Don&apos;t see your role? Email{" "}
            <a href="mailto:careers@flyhigh.in" className="u-link">
              careers@flyhigh.in
            </a>{" "}
            — we always read.
          </p>
        </div>
      </section>

      <section className="py-24">
        <div className="mx-auto max-w-[1440px] px-6 md:px-8">
          <div
            className="hero-glow relative overflow-hidden rounded-3xl p-12 md:p-16"
            style={{ border: "1px solid var(--line)" }}
          >
            <div className="relative z-10 grid items-center gap-12 lg:grid-cols-2">
              <div>
                <h2 className="f-display mb-6 text-[44px] leading-[0.95] tracking-tight md:text-[56px]">
                  Internships & apprenticeships
                </h2>
                <p className="text-lg" style={{ color: "var(--ash)" }}>
                  Twelve-month programmes for freight forwarders in the making. We rotate through
                  ocean, air, customs, and ops.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row lg:justify-end">
                <a href="mailto:apprentice@flyhigh.in" className="btn-primary">
                  Apprenticeship enquiries <ArrowRight size={14} />
                </a>
                <Link href="/about" className="btn-ghost">
                  About the house
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
