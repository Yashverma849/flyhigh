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
import { ThemeToggle } from "@/components/shared/theme-toggle";
import { SERVICES } from "@/server/db/seed/services";
import { INDUSTRIES } from "@/server/db/seed/industries";
import { ROUTES, ROUTE_REGIONS } from "@/server/db/seed/routes";

type Mega =
  | { kind: "services" }
  | { kind: "industries" }
  | { kind: "routes" }
  | { kind: "tools" }
  | null;

const navLinks = [
  { href: "/" as const, label: "Home" },
  { href: "/about" as const, label: "About" },
  { href: "/services" as const, label: "Services", mega: "services" as const },
  { href: "/industries" as const, label: "Industries", mega: "industries" as const },
  { href: "/routes" as const, label: "Routes", mega: "routes" as const },
  { href: "/tools" as const, label: "Tools", mega: "tools" as const },
  { href: "/case-studies" as const, label: "Case studies" },
  { href: "/insights" as const, label: "Insights" },
  { href: "/contact" as const, label: "Contact" },
];

const TOOL_LINKS = [
  { href: "/tools/transit-time", title: "Transit-time estimator", desc: "Realistic transit days per lane." },
  { href: "/tools/incoterms", title: "Incoterms 2020", desc: "Eleven terms, plain English." },
  { href: "/tools/hs-code", title: "HS code lookup", desc: "Indian ITC-HS classifications." },
  { href: "/tools/documents", title: "Documents required", desc: "Paperwork by mode and region." },
  { href: "/resources/faq", title: "FAQ", desc: "What clients ask weekly." },
  { href: "/resources/glossary", title: "Glossary", desc: "Twenty-seven freight terms." },
];

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [mega, setMega] = useState<Mega>(null);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 24);
    fn();
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    setOpen(false);
    setMega(null);
  }, [pathname]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(href + "/");

  return (
    <>
      {/* Top utility bar */}
      <div
        className="sticky top-0 z-40 hidden border-b md:block"
        style={{ borderColor: "var(--line-2)", background: "var(--ink)" }}
      >
        <div className="caption mx-auto flex max-w-[1440px] items-center justify-between px-8 py-2">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-2">
              <MapPin size={11} /> Mumbai · India HQ
            </span>
            <span className="flex items-center gap-2">
              <Clock size={11} /> Operations 24/7
            </span>
            <span className="hidden items-center gap-2 lg:flex">
              <Globe size={11} /> 92 country desk
            </span>
          </div>
          <div className="flex items-center gap-6">
            <Link href="/track" className="u-link flex items-center gap-1.5">
              <Search size={11} /> Track shipment
            </Link>
            <Link href="/admin" className="u-link flex items-center gap-1.5">
              <Lock size={11} /> Client console
            </Link>
            <span className="f-mono">+91 22 4000 5500</span>
          </div>
        </div>
      </div>

      {/* Main nav */}
      <header
        className={`sticky top-9 z-40 transition-all duration-500 ${scrolled ? "py-3" : "py-5"}`}
        style={{
          background: scrolled ? "var(--surface-translucent)" : "transparent",
          backdropFilter: scrolled ? "blur(16px)" : "none",
          borderBottom: scrolled ? "1px solid var(--line-2)" : "1px solid transparent",
        }}
        onMouseLeave={() => setMega(null)}
      >
        <div className="mx-auto flex max-w-[1440px] items-center justify-between px-6 md:px-8">
          <Link href="/" className="group flex items-center gap-3" data-cursor="HOME">
            <Logo size={36} />
            <div className="leading-tight">
              <div className="f-display text-[22px] tracking-tight">FLYHIGH</div>
              <div className="caption text-[9px]" style={{ color: "var(--brass)" }}>
                EST. 2017 · MUMBAI
              </div>
            </div>
          </Link>

          <nav className="hidden items-center gap-1 lg:flex">
            {navLinks.map(({ href, label, mega: megaKind }) => (
              <div
                key={href}
                className="relative"
                onMouseEnter={() => megaKind && setMega({ kind: megaKind })}
              >
                <Link
                  href={href}
                  className={`relative px-3 py-2 text-sm font-medium transition-colors xl:px-4 ${
                    isActive(href) ? "" : "opacity-70 hover:opacity-100"
                  }`}
                >
                  {label}
                  {megaKind && <ChevronDown size={12} className="ml-1 inline opacity-60" />}
                  {isActive(href) && (
                    <span
                      className="absolute right-3 bottom-0 left-3 h-px xl:right-4 xl:left-4"
                      style={{ background: "var(--cargo)" }}
                    />
                  )}
                </Link>
              </div>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Link href="/track" className="btn-ghost hidden text-sm sm:flex" data-cursor="TRACK">
              <Search size={14} /> Track
            </Link>
            <ThemeToggle className="hidden sm:inline-flex" />
            <Link href="/quote" className="btn-primary text-sm" data-cursor="QUOTE">
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
          <div className="fade-in absolute top-full right-0 left-0 z-50 hidden lg:block">
            <div className="mx-auto max-w-[1440px] px-6 md:px-8">
              <div
                className="mt-2 rounded-2xl p-8 shadow-2xl"
                style={{ background: "var(--ink-2)", border: "1px solid var(--line)" }}
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
                          <div
                            className="caption mb-3"
                            style={{ color: "var(--brass)" }}
                          >
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
                              ALL {region.toUpperCase()} LANES{" "}
                              <ArrowUpRight size={10} />
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
              </div>
            </div>
          </div>
        )}

        {/* Mobile menu */}
        {open && (
          <div
            className="fade-in mx-6 mt-4 max-h-[80vh] overflow-y-auto rounded-2xl p-4 lg:hidden"
            style={{ background: "var(--ink-2)", border: "1px solid var(--line)" }}
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
            <div
              className="caption mt-4 mb-2"
              style={{ color: "var(--brass)" }}
            >
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
            <div
              className="caption mt-4 mb-2"
              style={{ color: "var(--brass)" }}
            >
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
            <div className="mt-4 flex items-center justify-between">
              <span className="caption" style={{ color: "var(--ash)" }}>
                THEME
              </span>
              <ThemeToggle />
            </div>
          </div>
        )}
      </header>
    </>
  );
}
