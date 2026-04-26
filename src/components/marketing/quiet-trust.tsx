"use client";

import { useEffect, useState } from "react";
import { ArrowUpRight, X } from "lucide-react";
import { SectionLabel } from "@/components/shared/section-label";
import { Marquee } from "@/components/shared/marquee";
import { CLIENT_SECTORS, CLIENTS } from "@/server/db/seed/clients";

export function QuietTrust() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open]);

  return (
    <>
      <section
        className="quiet-trust-section cursor-pointer border-y py-20 transition-colors"
        style={{ borderColor: "var(--line)" }}
        onClick={() => setOpen(true)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setOpen(true);
          }
        }}
        role="button"
        tabIndex={0}
        aria-haspopup="dialog"
        aria-expanded={open}
        data-cursor="EXPLORE"
      >
        <div className="mx-auto mb-12 max-w-[1440px] px-6 md:px-8">
          <div className="flex flex-wrap items-start justify-between gap-6">
            <div className="max-w-3xl">
              <SectionLabel num="06">QUIET TRUST</SectionLabel>
              <p className="f-display mt-4 text-2xl md:text-3xl">
                Trusted by India&apos;s most demanding shippers — energy, pharma, fashion,
                jewelry, defense subcontracting.{" "}
                <span className="f-display-it" style={{ color: "var(--cargo)" }}>
                  Names we cannot always print.
                </span>
              </p>
            </div>
            <span className="trust-cue caption">
              EXPLORE BY SECTOR
              <ArrowUpRight size={12} strokeWidth={2.25} />
            </span>
          </div>
        </div>
        <Marquee speed={60}>
          {CLIENTS.map((c, i) => (
            <span
              key={i}
              className="f-display text-3xl md:text-5xl"
              style={{ color: "var(--brass)", letterSpacing: "0.04em" }}
            >
              {c}{" "}
              <span style={{ color: "var(--cargo)" }} className="mx-8">
                ✦
              </span>
            </span>
          ))}
        </Marquee>
      </section>

      {open && <QuietTrustModal onClose={() => setOpen(false)} />}
    </>
  );
}

function QuietTrustModal({ onClose }: { onClose: () => void }) {
  const totalNamed = CLIENT_SECTORS.reduce((n, s) => n + s.companies.length, 0);

  return (
    <div
      className="modal-backdrop fixed inset-0 z-50 flex items-center justify-center p-4 md:p-10"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="quiet-trust-title"
    >
      <div
        className="modal-surface relative max-h-[92vh] w-full max-w-[1180px] overflow-y-auto rounded-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header band */}
        <div
          className="flex items-center justify-between gap-4 px-8 py-5 md:px-14 md:py-6"
          style={{ borderBottom: "1px solid var(--line)" }}
        >
          <SectionLabel num="06">QUIET TRUST · BY SECTOR</SectionLabel>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="rounded-full p-2.5 transition-colors hover:bg-[var(--surface-tint-6)]"
            style={{ border: "1px solid var(--line)" }}
            data-cursor="CLOSE"
          >
            <X size={18} strokeWidth={1.5} />
          </button>
        </div>

        {/* Headline */}
        <div className="px-8 pt-12 pb-10 md:px-14 md:pt-16 md:pb-12">
          <h2
            id="quiet-trust-title"
            className="f-display text-[44px] leading-[0.95] tracking-tight md:text-[72px]"
          >
            Clients we move for,{" "}
            <span className="f-display-it" style={{ color: "var(--cargo)" }}>
              by trade.
            </span>
          </h2>
          <p
            className="mt-6 max-w-2xl text-base leading-relaxed md:text-lg"
            style={{ color: "var(--ash)" }}
          >
            <span className="f-mono tabular" style={{ color: "var(--brass)" }}>
              {String(totalNamed).padStart(2, "0")}
            </span>{" "}
            named accounts across four sectors. Many more move quietly under non-disclosure —
            pharma, fashion, jewelry, and defense subcontracting.
          </p>
        </div>

        {/* Sectors — clean editorial grid, no panel chrome, just typography */}
        <div className="grid gap-x-12 gap-y-12 px-8 pb-12 md:grid-cols-2 md:px-14 md:pb-16">
          {CLIENT_SECTORS.map((sector, idx) => (
            <article
              key={sector.id}
              className="sector-card fade-up pb-6"
              style={{ animationDelay: `${0.05 + idx * 0.06}s` }}
            >
              <div className="mb-4 flex items-baseline justify-between gap-4">
                <span className="caption" style={{ color: "var(--cargo)" }}>
                  {sector.label}
                </span>
                <span
                  className="f-mono tabular text-xs"
                  style={{ color: "var(--brass)" }}
                >
                  {String(sector.companies.length).padStart(2, "0")} CLIENTS
                </span>
              </div>
              <div className="modal-rule mb-5" />
              <ul className="space-y-2">
                {sector.companies.map((c) => (
                  <li
                    key={c}
                    className="f-display text-[26px] leading-[1.2] md:text-[32px]"
                    style={{ color: "var(--bone)", letterSpacing: "-0.015em" }}
                  >
                    {c}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        {/* Withheld footer — italic note, not a panel */}
        <div
          className="px-8 py-10 md:px-14 md:py-12"
          style={{ borderTop: "1px solid var(--line)", background: "var(--surface-tint-2)" }}
        >
          <div className="flex flex-col gap-4 md:flex-row md:items-baseline md:justify-between">
            <span className="caption" style={{ color: "var(--cargo)" }}>
              NAMES WITHHELD
            </span>
            <p
              className="f-display max-w-3xl text-xl leading-snug md:text-2xl md:text-right"
              style={{ color: "var(--ash)" }}
            >
              Pharma · Fashion · Jewelry · Defense subcontracting —
              <span className="f-display-it" style={{ color: "var(--cargo)" }}>
                {" "}
                at clients&apos; request.
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
