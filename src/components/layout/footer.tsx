import Link from "next/link";
import { Mail, MapPin, Phone, Send } from "lucide-react";
import { CompassSvg, Logo } from "@/components/shared/svg";
import { SERVICES } from "@/server/db/seed/services";

const companyLinks = [
  { label: "About", href: "/about" },
  { label: "Insights", href: "/insights" },
  { label: "Track", href: "/track" },
  { label: "Quote", href: "/quote" },
  { label: "Contact", href: "/contact" },
  { label: "Console", href: "/admin" },
] as const;

const certifications = ["IATA", "FIATA", "FICCI", "ISO 9001", "C-TPAT"];

export function Footer() {
  return (
    <footer
      className="relative mt-32 overflow-hidden border-t pt-32 pb-10"
      style={{ borderColor: "var(--line)" }}
    >
      <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <CompassSvg size={160} />
      </div>
      <div className="mx-auto max-w-[1440px] px-6 md:px-8">
        <div className="mb-20 grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
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
              className="f-display mb-8 text-[28px] leading-[1.2]"
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
                Flyhigh House, 14 Marine Lines, Mumbai 400020, India
              </p>
              <p className="flex items-center gap-2">
                <Phone size={14} /> +91 22 4000 5500 ·{" "}
                <span className="f-mono">24/7 ops</span>
              </p>
              <p className="flex items-center gap-2">
                <Mail size={14} /> concierge@flyhigh.in
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

          <div className="lg:col-span-3">
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
              <button type="submit" className="btn-primary shrink-0 text-sm" aria-label="Subscribe">
                <Send size={14} />
              </button>
            </form>
            <div className="caption mt-6" style={{ color: "var(--brass)" }}>
              CERTIFICATIONS
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              {certifications.map((c) => (
                <span key={c} className="chip f-mono text-[10px]">
                  {c}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="divider-line mb-6" />
        <div
          className="flex flex-col justify-between gap-4 text-xs md:flex-row"
          style={{ color: "var(--ash)" }}
        >
          <div className="flex flex-wrap items-center gap-6">
            <span className="f-mono">© 2017–2026 Flyhigh Logistics Pvt. Ltd.</span>
            <span>·</span>
            <span>CIN: U63090MH2017PTC290114</span>
            <span>·</span>
            <span>IEC: 0317XXXXXX</span>
          </div>
          <div className="flex gap-4">
            <button type="button" className="u-link">
              Privacy
            </button>
            <button type="button" className="u-link">
              Terms
            </button>
            <button type="button" className="u-link">
              Compliance
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
