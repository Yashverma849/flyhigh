import Link from "next/link";
import { Mail, MapPin, Phone, Send } from "lucide-react";
import { CompassSvg, Logo } from "@/components/shared/svg";
import { SERVICES } from "@/server/db/seed/services";
import { INDUSTRIES } from "@/server/db/seed/industries";
import { ROUTES } from "@/server/db/seed/routes";

const companyLinks = [
  { label: "About the house", href: "/about" },
  { label: "Offices & gateways", href: "/offices" },
  { label: "Careers", href: "/careers" },
  { label: "Newsroom & press", href: "/newsroom" },
  { label: "Compliance", href: "/compliance" },
  { label: "Contact", href: "/contact" },
] as const;

const resourceLinks = [
  { label: "Insights", href: "/insights" },
  { label: "Case studies", href: "/case-studies" },
  { label: "Glossary", href: "/resources/glossary" },
  { label: "FAQ", href: "/resources/faq" },
  { label: "Track shipment", href: "/track" },
  { label: "Get a quote", href: "/quote" },
] as const;

const toolLinks = [
  { label: "Transit-time estimator", href: "/tools/transit-time" },
  { label: "Incoterms 2020", href: "/tools/incoterms" },
  { label: "HS code lookup", href: "/tools/hs-code" },
  { label: "Documents required", href: "/tools/documents" },
] as const;

const legalLinks = [
  { label: "Privacy policy", href: "/legal/privacy" },
  { label: "Standard trading conditions", href: "/legal/terms" },
  { label: "Cookie policy", href: "/legal/cookies" },
] as const;

const certifications = ["IATA", "FIATA", "FICCI", "ISO 9001", "AEO-T2", "WCA"];

export function Footer() {
  // Pick a sample of high-traffic routes to surface in the footer for SEO
  const featuredRoutes = ROUTES.slice(0, 8);

  return (
    <footer
      className="relative mt-32 overflow-hidden border-t pt-32 pb-10"
      style={{ borderColor: "var(--line)" }}
    >
      <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <CompassSvg size={160} />
      </div>
      <div className="mx-auto max-w-[1440px] px-6 md:px-8">
        {/* Top row: brand block + sitelink columns */}
        <div className="mb-16 grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <div className="mb-6 flex items-center gap-3">
              <Logo size={48} />
              <div>
                <div className="f-display text-[36px] leading-none">FLYHIGH</div>
                <div className="caption text-[10px]" style={{ color: "var(--brass)" }}>
                  WORLDWIDE FREIGHT, REFINED.
                </div>
              </div>
            </div>
            <p
              className="f-display mb-8 text-[26px] leading-[1.2]"
              style={{ color: "var(--bone)" }}
            >
              <span className="f-display-it" style={{ color: "var(--cargo)" }}>
                &ldquo;
              </span>
              We move
              <br />
              the world&apos;s most
              <br />
              <span className="f-display-it" style={{ color: "var(--brass)" }}>
                precious things
              </span>
              .
              <span className="f-display-it" style={{ color: "var(--cargo)" }}>
                &rdquo;
              </span>
            </p>
            <div className="space-y-2 text-sm" style={{ color: "var(--ash)" }}>
              <p className="flex items-start gap-2">
                <MapPin size={14} className="mt-0.5 shrink-0" />
                Arjun House, Sahar Cargo, Andheri East, Mumbai 400099, India
              </p>
              <p className="flex items-center gap-2">
                <Phone size={14} />
                <a href="tel:+919322627766" className="u-link">
                  +91 9322627766
                </a>{" "}
                · <span className="f-mono">24/7 ops</span>
              </p>
              <p className="flex items-center gap-2">
                <Mail size={14} />{" "}
                <a href="mailto:flyhighfreightservices@gmail.com" className="u-link">
                  flyhighfreightservices@gmail.com
                </a>
              </p>
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="caption mb-4" style={{ color: "var(--brass)" }}>
              SERVICES
            </div>
            {SERVICES.map((s) => (
              <Link
                key={s.id}
                href={`/services/${s.slug}`}
                className="u-link block py-1.5 text-sm"
              >
                {s.name}
              </Link>
            ))}
            <Link
              href="/services"
              className="caption mt-3 block"
              style={{ color: "var(--cargo)" }}
            >
              ALL SERVICES →
            </Link>
          </div>

          <div className="lg:col-span-2">
            <div className="caption mb-4" style={{ color: "var(--brass)" }}>
              INDUSTRIES
            </div>
            {INDUSTRIES.slice(0, 6).map((i) => (
              <Link
                key={i.id}
                href={`/industries/${i.slug}`}
                className="u-link block py-1.5 text-sm"
              >
                {i.name}
              </Link>
            ))}
            <Link
              href="/industries"
              className="caption mt-3 block"
              style={{ color: "var(--cargo)" }}
            >
              ALL INDUSTRIES →
            </Link>
          </div>

          <div className="lg:col-span-2">
            <div className="caption mb-4" style={{ color: "var(--brass)" }}>
              COMPANY
            </div>
            {companyLinks.map(({ label, href }) => (
              <Link key={href} href={href} className="u-link block py-1.5 text-sm">
                {label}
              </Link>
            ))}
          </div>

          <div className="lg:col-span-2">
            <div className="caption mb-4" style={{ color: "var(--brass)" }}>
              RESOURCES
            </div>
            {resourceLinks.map(({ label, href }) => (
              <Link key={href} href={href} className="u-link block py-1.5 text-sm">
                {label}
              </Link>
            ))}
          </div>
        </div>

        {/* Second row: tools, featured routes, newsletter */}
        <div className="mb-16 grid gap-12 border-t pt-12 lg:grid-cols-12" style={{ borderColor: "var(--line-2)" }}>
          <div className="lg:col-span-3">
            <div className="caption mb-4" style={{ color: "var(--brass)" }}>
              TOOLS
            </div>
            {toolLinks.map(({ label, href }) => (
              <Link key={href} href={href} className="u-link block py-1.5 text-sm">
                {label}
              </Link>
            ))}
          </div>

          <div className="lg:col-span-5">
            <div className="caption mb-4" style={{ color: "var(--brass)" }}>
              POPULAR ROUTES
            </div>
            <div className="grid gap-x-4 gap-y-1.5 sm:grid-cols-2">
              {featuredRoutes.map((r) => (
                <Link
                  key={r.slug}
                  href={`/routes/${r.slug}`}
                  className="u-link text-sm"
                >
                  {r.fromCity} → {r.toCity}
                </Link>
              ))}
            </div>
            <Link
              href="/routes"
              className="caption mt-3 block"
              style={{ color: "var(--cargo)" }}
            >
              ALL ROUTES →
            </Link>
          </div>

          <div className="lg:col-span-4">
            <div className="caption mb-4" style={{ color: "var(--brass)" }}>
              NEWSLETTER
            </div>
            <p className="mb-4 text-sm" style={{ color: "var(--ash)" }}>
              Trade-route bulletins, monthly. Read by ports, refused by spam filters.
            </p>
            <form className="flex gap-2">
              <input
                type="email"
                name="email"
                aria-label="Email address"
                className="input text-sm"
                placeholder="your@company.com"
              />
              <button
                type="submit"
                className="btn-primary shrink-0 text-sm"
                aria-label="Subscribe"
              >
                <Send size={14} />
              </button>
            </form>
            <div className="caption mt-6" style={{ color: "var(--brass)" }}>
              CERTIFICATIONS
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              {certifications.map((c) => (
                <Link
                  key={c}
                  href="/compliance"
                  className="chip f-mono text-[10px]"
                >
                  {c}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="divider-line mb-6" />
        <div
          className="flex flex-col justify-between gap-4 text-xs md:flex-row"
          style={{ color: "var(--ash)" }}
        >
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <span className="f-mono">© 2017–2026 Flyhigh Logistics Pvt. Ltd.</span>
            <span className="hidden md:inline">·</span>
            <span>CIN: U63090MH2017PTC290114</span>
            <span className="hidden md:inline">·</span>
            <span>IEC: 0317XXXXXX</span>
          </div>
          <div className="flex flex-wrap gap-4">
            {legalLinks.map(({ label, href }) => (
              <Link key={href} href={href} className="u-link">
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
