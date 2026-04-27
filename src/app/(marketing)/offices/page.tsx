import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Mail, MapPin, Phone } from "lucide-react";
import { SectionLabel } from "@/components/shared/section-label";
import { Pill } from "@/components/shared/pill";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { JsonLd } from "@/components/shared/json-ld";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Offices & gateways",
  description:
    "Seven Indian gateways and one global desk. Flyhigh's office, warehouse, and partner footprint at a glance.",
  path: "/offices",
  keywords: [
    "freight forwarder offices India",
    "Mumbai freight office",
    "Delhi customs broker",
    "Chennai freight forwarder",
    "Mundra warehouse",
  ],
});

const breadcrumbs = [
  { name: "Home", href: "/" },
  { name: "Offices", href: "/offices" },
];

const OFFICES = [
  {
    city: "Mumbai",
    role: "HQ · Operations · Customs",
    address: "Flyhigh House, 14 Marine Lines, Mumbai 400020",
    phone: "+91 22 4000 5500",
    email: "mumbai@flyhigh.in",
    gateways: "BOM (Sahar Air), JNPT, Mumbai Port",
    headcount: 84,
  },
  {
    city: "Delhi",
    role: "North India desk · Customs",
    address: "B-7 Connaught Circus, New Delhi 110001",
    phone: "+91 11 4000 5500",
    email: "delhi@flyhigh.in",
    gateways: "DEL (IGI Air), ICD Tughlakabad",
    headcount: 32,
  },
  {
    city: "Chennai",
    role: "South India desk · Project Cargo",
    address: "212 Anna Salai, Chennai 600002",
    phone: "+91 44 4000 5500",
    email: "chennai@flyhigh.in",
    gateways: "MAA (Air), Chennai Port, Kattupalli",
    headcount: 28,
  },
  {
    city: "Bangalore",
    role: "Tech corridor desk",
    address: "5th floor, Prestige Atrium, MG Road, Bengaluru 560001",
    phone: "+91 80 4000 5500",
    email: "bangalore@flyhigh.in",
    gateways: "BLR (Kempegowda Air)",
    headcount: 16,
  },
  {
    city: "Hyderabad",
    role: "Pharma corridor desk",
    address: "Plot 32, HITEC City, Hyderabad 500081",
    phone: "+91 40 4000 5500",
    email: "hyderabad@flyhigh.in",
    gateways: "HYD (Rajiv Gandhi Air)",
    headcount: 14,
  },
  {
    city: "Mundra",
    role: "Bonded warehousing · DG",
    address: "Plot 14, Bonded Zone, Mundra 370421",
    phone: "+91 28 3829 5500",
    email: "mundra@flyhigh.in",
    gateways: "Mundra Port",
    headcount: 6,
  },
  {
    city: "Kolkata",
    role: "East India desk",
    address: "Camac Street, Kolkata 700017",
    phone: "+91 33 4000 5500",
    email: "kolkata@flyhigh.in",
    gateways: "CCU (Air), Kolkata Port, Haldia",
    headcount: 4,
  },
  {
    city: "Dubai",
    role: "Global desk · GCC, Africa, Levant",
    address: "Office 1402, Jumeirah Bay X3 Tower, Cluster X, JLT, Dubai",
    phone: "+971 4 245 8800",
    email: "dubai@flyhigh.in",
    gateways: "DXB (Air), Jebel Ali Port",
    headcount: 8,
  },
];

const PARTNERS = [
  { region: "European Union", count: "47 partners" },
  { region: "United Kingdom", count: "12 partners" },
  { region: "United States", count: "31 partners" },
  { region: "Canada", count: "9 partners" },
  { region: "China & Hong Kong", count: "26 partners" },
  { region: "Southeast Asia", count: "34 partners" },
  { region: "Africa", count: "21 partners" },
  { region: "Latin America", count: "14 partners" },
];

export default function OfficesPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd(breadcrumbs)} />

      <section className="pt-32 pb-12">
        <div className="mx-auto max-w-[1440px] px-6 md:px-8">
          <Breadcrumbs items={breadcrumbs} className="mb-8" />
          <div className="grid gap-8 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <SectionLabel num="01">OFFICES & GATEWAYS</SectionLabel>
              <h1 className="f-display mt-6 text-[64px] leading-[0.88] tracking-tighter md:text-[110px]">
                Seven gateways,
                <br />
                <span className="f-display-it" style={{ color: "var(--cargo)" }}>
                  one
                </span>{" "}
                hand.
              </h1>
            </div>
            <div className="lg:col-span-5 lg:pt-32">
              <p className="text-lg leading-relaxed" style={{ color: "var(--ash)" }}>
                Eight Flyhigh offices across India and Dubai, plus 194 vetted partner offices
                worldwide via WCA. The same case manager, regardless of which desk handles the leg.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="mx-auto max-w-[1440px] px-6 md:px-8">
          <div
            className="grid gap-px md:grid-cols-2"
            style={{ background: "var(--line)" }}
          >
            {OFFICES.map((o) => (
              <article
                key={o.city}
                className="p-8"
                style={{ background: "var(--ink)" }}
              >
                <div className="mb-3 flex items-center gap-3">
                  <h2
                    className="f-display text-3xl tracking-tight"
                    style={{ color: "var(--cargo)" }}
                  >
                    {o.city}
                  </h2>
                  <Pill kind="brass">{o.headcount} STAFF</Pill>
                </div>
                <div className="caption mb-5" style={{ color: "var(--ash)" }}>
                  {o.role}
                </div>
                <div className="space-y-2 text-sm" style={{ color: "var(--bone)" }}>
                  <p className="flex items-start gap-2">
                    <MapPin size={14} className="mt-0.5 shrink-0" style={{ color: "var(--brass)" }} />
                    {o.address}
                  </p>
                  <p className="flex items-center gap-2">
                    <Phone size={14} style={{ color: "var(--brass)" }} />{" "}
                    <a href={`tel:${o.phone.replace(/\s/g, "")}`} className="u-link">
                      {o.phone}
                    </a>
                  </p>
                  <p className="flex items-center gap-2">
                    <Mail size={14} style={{ color: "var(--brass)" }} />{" "}
                    <a href={`mailto:${o.email}`} className="u-link">
                      {o.email}
                    </a>
                  </p>
                </div>
                <div
                  className="caption mt-5 border-t pt-3"
                  style={{ borderColor: "var(--line-2)", color: "var(--ash)" }}
                >
                  GATEWAYS · {o.gateways}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16" style={{ background: "var(--ink-2)" }}>
        <div className="mx-auto max-w-[1440px] px-6 md:px-8">
          <SectionLabel num="02">GLOBAL PARTNERS</SectionLabel>
          <h2 className="f-display mt-4 mb-8 text-3xl">Vetted partner network.</h2>
          <p className="mb-10 max-w-3xl text-base" style={{ color: "var(--ash)" }}>
            Through World Cargo Alliance, we have direct routing access into 192 countries via
            partners we have either visited or vetted in writing.
          </p>
          <div
            className="grid gap-px md:grid-cols-2 lg:grid-cols-4"
            style={{ background: "var(--line)" }}
          >
            {PARTNERS.map((p) => (
              <div
                key={p.region}
                className="p-6"
                style={{ background: "var(--ink-2)" }}
              >
                <div className="caption" style={{ color: "var(--brass)" }}>
                  {p.region.toUpperCase()}
                </div>
                <div className="f-display mt-2 text-2xl">{p.count}</div>
              </div>
            ))}
          </div>
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
                  Visit the desk.
                </h2>
                <p className="text-lg" style={{ color: "var(--ash)" }}>
                  Walk-in welcome at every Indian office, by appointment in Dubai. Best to call
                  first — the desk is usually on a shipment.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row lg:justify-end">
                <Link href="/contact" className="btn-primary">
                  Speak with us <ArrowRight size={14} />
                </Link>
                <Link href="/quote" className="btn-ghost">
                  Get a quote
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
