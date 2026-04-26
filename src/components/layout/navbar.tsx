"use client";

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

const links = [
  { href: "/" as const, label: "Home" },
  { href: "/about" as const, label: "About" },
  { href: "/services" as const, label: "Services", dropdown: true },
  { href: "/insights" as const, label: "Insights" },
  { href: "/contact" as const, label: "Contact" },
];

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 24);
    fn();
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

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
            {links.map(({ href, label, dropdown }) => (
              <div
                key={href}
                className="relative"
                onMouseEnter={() => dropdown && setServicesOpen(true)}
                onMouseLeave={() => dropdown && setServicesOpen(false)}
              >
                <Link
                  href={href}
                  className={`relative px-4 py-2 text-sm font-medium transition-colors ${
                    isActive(href) ? "" : "opacity-70 hover:opacity-100"
                  }`}
                >
                  {label}
                  {dropdown && <ChevronDown size={12} className="ml-1 inline opacity-60" />}
                  {isActive(href) && (
                    <span
                      className="absolute right-4 bottom-0 left-4 h-px"
                      style={{ background: "var(--cargo)" }}
                    />
                  )}
                </Link>

                {dropdown && servicesOpen && (
                  <div className="fade-in absolute top-full left-0 z-50 w-[640px] pt-2">
                    <div
                      className="grid grid-cols-2 gap-1 rounded-2xl p-6 shadow-2xl"
                      style={{ background: "var(--ink-2)", border: "1px solid var(--line)" }}
                    >
                      {SERVICES.map((s) => {
                        const Icon = s.icon;
                        return (
                          <Link
                            key={s.id}
                            href={`/services/${s.slug}`}
                            onClick={() => setServicesOpen(false)}
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
                  </div>
                )}
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

        {/* Mobile menu */}
        {open && (
          <div
            className="fade-in mx-6 mt-4 rounded-2xl p-4 lg:hidden"
            style={{ background: "var(--ink-2)", border: "1px solid var(--line)" }}
          >
            {links.map(({ href, label }) => (
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
            <div className="mt-3 grid grid-cols-2 gap-2">
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
