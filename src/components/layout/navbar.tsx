"use client";

import type { Route } from "next";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  ChevronDown,
  Clock,
  Globe,
  Lock,
  MapPin,
  Menu,
  Search,
  X,
} from "lucide-react";
import { Logo } from "@/components/shared/svg";
import { SERVICES } from "@/server/db/seed/services";
import { INDUSTRIES } from "@/server/db/seed/industries";
import { ROUTES, ROUTE_REGIONS } from "@/server/db/seed/routes";

type Mega =
  | { kind: "services" }
  | { kind: "industries" }
  | { kind: "routes" }
  | { kind: "tools" }
  | { kind: "insights" }
  | null;

const navLinks = [
  { href: "/" as const, label: "Home" },
  { href: "/about" as const, label: "About" },
  { href: "/services" as const, label: "Services", mega: "services" as const },
  { href: "/industries" as const, label: "Industries", mega: "industries" as const },
  { href: "/routes" as const, label: "Routes", mega: "routes" as const },
  { href: "/tools" as const, label: "Tools", mega: "tools" as const },
  { href: "/insights" as const, label: "Insights", mega: "insights" as const },
  { href: "/contact" as const, label: "Contact" },
];

const TOOL_LINKS = [
  {
    href: "/tools/transit-time",
    title: "Transit-time estimator",
    desc: "Realistic transit days per lane.",
  },
  { href: "/tools/incoterms", title: "Incoterms 2020", desc: "Eleven terms, plain English." },
  { href: "/tools/hs-code", title: "HS code lookup", desc: "Indian ITC-HS classifications." },
  { href: "/tools/documents", title: "Documents required", desc: "Paperwork by mode and region." },
  { href: "/resources/faq", title: "FAQ", desc: "What clients ask weekly." },
  { href: "/resources/glossary", title: "Glossary", desc: "Twenty-seven freight terms." },
];

function ScrambleText({ text, trigger = 0 }: { text: string; trigger?: number }) {
  const [displayText, setDisplayText] = useState("");

  useEffect(() => {
    let active = true;
    const chars = text.split("");

    // Initialize current character codes starting at 'A' (65) or 'a' (97)
    let currentCodes = chars.map((char) => {
      if (char === " " || /[^a-zA-Z]/.test(char)) {
        return char.charCodeAt(0);
      }
      return char === char.toUpperCase() ? 65 : 97;
    });

    const targetCodes = chars.map((char) => char.charCodeAt(0));

    const interval = setInterval(() => {
      if (!active) return;

      let done = true;
      currentCodes = currentCodes.map((code, index) => {
        const target = targetCodes[index];
        if (target !== undefined && code < target) {
          done = false;
          return code + 1; // Increment code sequentially
        }
        return code;
      });

      setDisplayText(String.fromCharCode(...currentCodes));

      if (done) {
        clearInterval(interval);
      }
    }, 30);

    return () => {
      active = false;
      clearInterval(interval);
    };
  }, [text, trigger]);

  return <>{displayText}</>;
}

function NavLinkItem({
  href,
  label,
  megaKind,
  isActive,
  onMouseEnterMega,
  overHero,
}: {
  href: Route;
  label: string;
  megaKind?: "services" | "industries" | "routes" | "tools" | "insights";
  isActive: boolean;
  onMouseEnterMega: () => void;
  overHero: boolean;
}) {
  const [trigger, setTrigger] = useState(0);

  return (
    <div
      className="relative"
      onMouseEnter={() => {
        setTrigger((t) => t + 1);
        onMouseEnterMega();
      }}
    >
      <Link
        href={href}
        className={`relative inline-flex items-center gap-1 rounded-full border border-transparent px-2.5 py-1 text-[11px] font-semibold tracking-wider whitespace-nowrap uppercase opacity-75 transition-all duration-300 hover:opacity-100 hover:shadow-md xl:px-3.5 xl:text-[12px] ${
          overHero
            ? "hover:border-white/10 hover:bg-white/5"
            : "hover:border-black/[0.06] hover:bg-black/[0.04]"
        }`}
      >
        <ScrambleText text={label} trigger={trigger} />
        {megaKind && <ChevronDown size={10} className="shrink-0 opacity-60" />}
      </Link>
    </div>
  );
}

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [overHero, setOverHero] = useState(false);
  const [open, setOpen] = useState(false);
  const [mega, setMega] = useState<Mega>(null);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 24);
    fn();
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    setOverHero(!!document.querySelector(".hero-section"));
  }, [pathname]);

  useEffect(() => {
    setOpen(false);
    setMega(null);
  }, [pathname]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(href + "/");

  const lightNavText = !scrolled && overHero;

  return (
    <>
      {/* Top utility bar */}
      <div
        className="fixed top-0 right-0 left-0 z-40 hidden max-w-full overflow-x-hidden border-b transition-all duration-500 md:block"
        style={{
          borderColor: lightNavText ? "rgba(255, 255, 255, 0.12)" : "var(--line-2)",
          background: "transparent",
          opacity: scrolled ? 0 : 1,
          transform: scrolled ? "translateY(-100%)" : "translateY(0)",
          pointerEvents: scrolled ? "none" : "auto",
          color: lightNavText ? "#e2e8f0" : "var(--bone)",
          "--ash": lightNavText ? "#e2e8f0" : "var(--ash)",
        } as React.CSSProperties}
      >
        <div className="caption flex w-full min-w-0 max-w-full items-center justify-between gap-4 px-6 py-2 font-bold md:px-10 lg:px-14 xl:px-[4.5rem]">
          <div className="flex min-w-0 items-center gap-4 lg:gap-6">
            <span className="flex shrink-0 items-center gap-2">
              <MapPin size={11} /> Mumbai · India HQ
            </span>
            <span className="hidden shrink-0 items-center gap-2 sm:flex">
              <Clock size={11} /> Operations 24/7
            </span>
            <span className="hidden shrink-0 items-center gap-2 xl:flex">
              <Globe size={11} /> Worldwide network
            </span>
          </div>
          <div className="flex shrink-0 items-center gap-4 lg:gap-6">
            <Link href="/track" className="u-link hidden items-center gap-1.5 lg:flex">
              <Search size={11} /> Track shipment
            </Link>
            <Link href="/admin" className="u-link hidden items-center gap-1.5 xl:flex">
              <Lock size={11} /> Client console
            </Link>
            <span className="f-mono hidden text-[10px] sm:inline lg:text-[11px]">+91 9322627766</span>
          </div>
        </div>
      </div>

      {/* Main nav */}
      <header
        className={`fixed right-0 left-0 z-40 transition-all duration-500 ${scrolled ? "top-0 py-3" : "top-0 py-5 md:top-9"}`}
        style={{
          background: scrolled ? "var(--nav-bg)" : "transparent",
          backdropFilter: scrolled ? "blur(16px)" : "none",
          borderBottom: scrolled ? "1px solid var(--line)" : "1px solid transparent",
          color: lightNavText ? "#f8fafc" : "var(--bone)",
          ...(lightNavText ? {
            "--line": "rgba(255, 255, 255, 0.15)",
            "--surface-tint-2": "rgba(255, 255, 255, 0.02)",
            "--cargo": "#BF5700",
          } : {})
        } as React.CSSProperties}
        onMouseLeave={() => setMega(null)}
      >
        <div className="flex w-full min-w-0 max-w-full items-center justify-between gap-2 px-6 md:px-10 lg:gap-3 lg:px-14 xl:px-[4.5rem]">
          <Link href="/" className="group flex min-w-0 shrink items-center gap-2 sm:gap-3" data-cursor="HOME">
            <Logo size={36} />
            <div className="min-w-0 leading-tight">
              <div className="f-display truncate text-[18px] tracking-tight sm:text-[22px]">FLYHIGH</div>
              <div className="caption text-[9px]" style={{ color: lightNavText ? "#c9a876" : "var(--brass)" }}>
                EST. 2017 · MUMBAI
              </div>
            </div>
          </Link>

          <nav className="hidden min-w-0 items-center gap-0.5 lg:flex xl:gap-1.5">
            {navLinks.map(({ href, label, mega: megaKind }) => (
              <NavLinkItem
                key={href}
                href={href}
                label={label}
                megaKind={megaKind}
                isActive={isActive(href)}
                onMouseEnterMega={() => megaKind && setMega({ kind: megaKind })}
                overHero={lightNavText}
              />
            ))}
          </nav>

          <div className="flex shrink-0 items-center gap-2 sm:gap-3">
            <Link href="/quote" className="btn-primary whitespace-nowrap px-3 py-2 text-xs sm:px-4 sm:text-sm" data-cursor="QUOTE">
              Get a quote <ArrowRight size={14} />
            </Link>
            <button
              type="button"
              onClick={() => setOpen(!open)}
              className="p-2 lg:hidden"
              aria-label="Menu"
            >
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mega-menu panels */}
        {mega && (
          <div
            key={mega.kind}
            className="fade-in absolute top-full right-0 left-0 z-50 hidden pt-1 lg:block"
            onMouseEnter={() => setMega(mega)}
          >
            <div className="site-gutter w-full">
              <div
                className="animate-slide-down rounded-2xl p-6 shadow-2xl"
                style={{
                  background: "var(--nav-panel-bg)",
                  backdropFilter: "blur(16px)",
                  border: "1px solid var(--line)",
                  boxShadow: "0 20px 50px rgba(0, 0, 0, 0.15)",
                  color: "var(--cargo)",
                  "--ash": "var(--ash)",
                  "--brass": "var(--brass)",
                  "--line": "var(--line)",
                  "--line-2": "var(--line-2)",
                  "--ink-3": "var(--ink-3)",
                } as React.CSSProperties}
              >
                {mega.kind === "services" && (
                  <div className="grid gap-2 md:grid-cols-3">
                    {SERVICES.map((s) => {
                      const Icon = s.icon;
                      return (
                        <Link
                          key={s.id}
                          href={`/services/${s.slug}`}
                          className="group rounded-xl p-3 text-left transition-colors hover:bg-[var(--ink-3)]"
                        >
                          <div className="flex items-start gap-3">
                            <div
                              className="rounded-lg p-2"
                              style={{ background: "var(--cargo-tint-10)" }}
                            >
                              <Icon size={16} style={{ color: "var(--cargo)" }} />
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center gap-2 text-sm font-semibold">
                                {s.name}
                                <ArrowUpRight
                                  size={12}
                                  className="opacity-0 transition-opacity group-hover:opacity-100"
                                />
                              </div>
                              <div className="mt-0.5 text-xs" style={{ color: "var(--ash)" }}>
                                {s.short}
                              </div>
                            </div>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                )}

                {mega.kind === "industries" && (
                  <div className="grid gap-2 md:grid-cols-4">
                    {INDUSTRIES.map((ind) => {
                      const Icon = ind.icon;
                      return (
                        <Link
                          key={ind.id}
                          href={`/industries/${ind.slug}`}
                          className="group rounded-xl p-3 text-left transition-colors hover:bg-[var(--ink-3)]"
                        >
                          <div className="flex items-start gap-3">
                            <div
                              className="rounded-lg p-2"
                              style={{ background: "var(--cargo-tint-10)" }}
                            >
                              <Icon size={16} style={{ color: "var(--cargo)" }} />
                            </div>
                            <div className="flex-1">
                              <div className="text-sm font-semibold">{ind.name}</div>
                              <div className="mt-0.5 text-xs" style={{ color: "var(--ash)" }}>
                                {ind.tag}
                              </div>
                            </div>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                )}

                {mega.kind === "routes" && (
                  <div className="grid gap-6 md:grid-cols-3">
                    {ROUTE_REGIONS.map((region) => {
                      const lanes = ROUTES.filter((r) => r.region === region).slice(0, 4);
                      if (lanes.length === 0) return null;
                      return (
                        <div key={region}>
                          <div className="caption mb-3" style={{ color: "var(--brass)" }}>
                            {region.toUpperCase()}
                          </div>
                          <div className="space-y-1">
                            {lanes.map((r) => (
                              <Link
                                key={r.slug}
                                href={`/routes/${r.slug}`}
                                className="block rounded-md px-2 py-1 text-sm transition-colors hover:bg-[var(--ink-3)]"
                              >
                                {r.fromCity} → {r.toCity}
                              </Link>
                            ))}
                            <Link
                              href="/routes"
                              className="caption mt-2 inline-flex items-center gap-1 px-2"
                              style={{ color: "var(--cargo)" }}
                            >
                              ALL {region.toUpperCase()} LANES <ArrowUpRight size={10} />
                            </Link>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}

                {mega.kind === "tools" && (
                  <div className="grid gap-2 md:grid-cols-3">
                    {TOOL_LINKS.map((t) => (
                      <Link
                        key={t.href}
                        href={t.href as Route}
                        className="group rounded-xl p-3 text-left transition-colors hover:bg-[var(--ink-3)]"
                      >
                        <div className="flex items-center gap-2 text-sm font-semibold">
                          {t.title}
                          <ArrowUpRight
                            size={12}
                            className="opacity-0 transition-opacity group-hover:opacity-100"
                          />
                        </div>
                        <div className="mt-0.5 text-xs" style={{ color: "var(--ash)" }}>
                          {t.desc}
                        </div>
                      </Link>
                    ))}
                  </div>
                )}

                {mega.kind === "insights" && (
                  <div className="grid gap-4 md:grid-cols-2">
                    <Link
                      href="/case-studies"
                      className="group rounded-xl p-3.5 text-left transition-colors hover:bg-[var(--ink-3)]"
                    >
                      <div className="flex items-center gap-2 text-sm font-semibold">
                        Case Studies
                        <ArrowUpRight
                          size={12}
                          className="opacity-0 transition-opacity group-hover:opacity-100"
                        />
                      </div>
                      <div className="mt-0.5 text-xs" style={{ color: "var(--ash)" }}>
                        Editorial deep-dives into our most challenging logistics operations.
                      </div>
                    </Link>
                    <Link
                      href="/insights"
                      className="group rounded-xl p-3.5 text-left transition-colors hover:bg-[var(--ink-3)]"
                    >
                      <div className="flex items-center gap-2 text-sm font-semibold">
                        Insights & News
                        <ArrowUpRight
                          size={12}
                          className="opacity-0 transition-opacity group-hover:opacity-100"
                        />
                      </div>
                      <div className="mt-0.5 text-xs" style={{ color: "var(--ash)" }}>
                        Logistics briefings, industry news, and trade corridor advisories.
                      </div>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Mobile menu */}
        {open && (
          <div
            className="fade-in mx-6 mt-4 max-h-[80vh] overflow-y-auto rounded-2xl p-4 shadow-2xl lg:hidden"
            style={{
              background: "var(--nav-panel-bg)",
              backdropFilter: "blur(16px)",
              border: "1px solid var(--line)",
              color: "var(--cargo)",
              "--ash": "var(--ash)",
              "--brass": "var(--brass)",
              "--line": "var(--line)",
              "--line-2": "var(--line-2)",
              "--ink-3": "var(--ink-3)",
            } as React.CSSProperties}
          >
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                className="block w-full border-b px-2 py-3 text-left"
                style={{ borderColor: "var(--line-2)" }}
              >
                {label}
              </Link>
            ))}
            <div className="caption mt-4 mb-2" style={{ color: "var(--brass)" }}>
              SERVICES
            </div>
            <div className="grid grid-cols-2 gap-2">
              {SERVICES.map((s) => (
                <Link
                  key={s.id}
                  href={`/services/${s.slug}`}
                  onClick={() => setOpen(false)}
                  className="rounded-lg p-2 text-left text-xs"
                  style={{ background: "var(--ink-3)" }}
                >
                  {s.name}
                </Link>
              ))}
            </div>
            <div className="caption mt-4 mb-2" style={{ color: "var(--brass)" }}>
              INDUSTRIES
            </div>
            <div className="grid grid-cols-2 gap-2">
              {INDUSTRIES.slice(0, 6).map((ind) => (
                <Link
                  key={ind.id}
                  href={`/industries/${ind.slug}`}
                  onClick={() => setOpen(false)}
                  className="rounded-lg p-2 text-left text-xs"
                  style={{ background: "var(--ink-3)" }}
                >
                  {ind.name}
                </Link>
              ))}
            </div>

          </div>
        )}
      </header>
    </>
  );
}
