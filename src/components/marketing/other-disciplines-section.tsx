"use client";

import { useCallback, useState } from "react";
import type { Route } from "next";
import Link from "next/link";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";

export type DisciplineItem = {
  slug: string;
  name: string;
  tag: string;
  short: string;
  desc: string;
  image: string;
  eta: string;
  coverage: string;
  highlights: string[];
};

type Props = {
  items: DisciplineItem[];
  heading?: string;
  hrefPrefix?: `/services/` | `/industries/` | `/routes/`;
  ctaLabel?: string;
  tablistLabel?: string;
};

const PANEL_HEIGHT = "min-h-[14rem] sm:min-h-[17rem] md:min-h-[19rem]";

export function OtherDisciplinesSection({
  items,
  heading = "Other disciplines",
  hrefPrefix = "/services/",
  ctaLabel = "Open desk",
  tablistLabel = "Other disciplines",
}: Props) {
  const [activeIndex, setActiveIndex] = useState(0);

  const goTo = useCallback(
    (index: number) => {
      if (items.length === 0) return;
      setActiveIndex(((index % items.length) + items.length) % items.length);
    },
    [items.length],
  );

  if (items.length === 0) return null;

  return (
    <section className="w-full min-w-0 max-w-full overflow-x-hidden py-10 md:py-12">
      <div className="site-gutter">
        <h3 className="f-display mb-5 text-4xl">{heading}</h3>

        <div
          className="w-full min-w-0 max-w-full overflow-hidden rounded-2xl"
          style={{ border: "1px solid var(--line)", background: "var(--ink)" }}
        >
          <div
            className="flex items-stretch border-b"
            style={{ borderColor: "var(--line)" }}
            role="tablist"
            aria-label={tablistLabel}
          >
            <div className="no-scrollbar flex min-w-0 flex-1 overflow-x-auto">
              {items.map((item, index) => {
                const isActive = index === activeIndex;
                return (
                  <button
                    key={item.slug}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => setActiveIndex(index)}
                    className="caption shrink-0 border-b-2 px-4 py-3.5 text-[11px] tracking-widest transition-colors sm:px-5 sm:text-xs"
                    style={{
                      borderBottomColor: isActive ? "var(--cargo)" : "transparent",
                      color: isActive ? "var(--cargo)" : "var(--ash)",
                      background: isActive ? "var(--surface-tint-2)" : "transparent",
                    }}
                  >
                    {item.name}
                  </button>
                );
              })}
            </div>

            <div
              className="flex shrink-0 items-center gap-1 border-l px-2"
              style={{ borderColor: "var(--line)" }}
            >
              <button
                type="button"
                onClick={() => goTo(activeIndex - 1)}
                className="flex h-8 w-8 items-center justify-center rounded-full transition-colors hover:text-cargo"
                style={{ color: "var(--bone)" }}
                aria-label="Previous discipline"
              >
                <ChevronLeft size={16} />
              </button>
              <button
                type="button"
                onClick={() => goTo(activeIndex + 1)}
                className="flex h-8 w-8 items-center justify-center rounded-full transition-colors hover:text-cargo"
                style={{ color: "var(--bone)" }}
                aria-label="Next discipline"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>

          <div className={`relative w-full min-w-0 max-w-full ${PANEL_HEIGHT} overflow-hidden`}>
            <div
              className="flex h-full w-full transition-transform duration-500 ease-out"
              style={{
                width: `${items.length * 100}%`,
                transform: `translateX(-${(activeIndex * 100) / items.length}%)`,
              }}
            >
              {items.map((item, index) => {
                const imageOnRight = index % 2 === 1;

                const imageCell = (
                  <div className="relative h-full min-h-0 overflow-hidden">
                    <img
                      src={item.image}
                      alt=""
                      className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-[1.02]"
                      style={{ filter: "grayscale(10%) contrast(96%)" }}
                    />
                  </div>
                );

                const textCell = (
                  <div
                    className="flex h-full min-w-0 flex-col justify-between px-4 py-4 sm:px-6 sm:py-5"
                    style={{ borderColor: "var(--line)" }}
                  >
                    <div>
                      <div className="caption mb-2 text-[10px] tracking-widest" style={{ color: "var(--cargo)" }}>
                        {item.tag}
                      </div>
                      <h4 className="f-display text-lg leading-tight tracking-tight sm:text-xl">
                        {item.name}
                      </h4>
                      <p className="mt-1.5 text-xs font-bold leading-snug sm:text-sm" style={{ color: "var(--ash)" }}>
                        {item.short}
                      </p>
                      <p className="mt-2 line-clamp-2 text-xs leading-relaxed sm:text-sm" style={{ color: "var(--ash)" }}>
                        {item.desc}
                      </p>
                    </div>

                    <div>
                      <ul className="mb-3 flex flex-wrap gap-x-3 gap-y-1">
                        {item.highlights.map((highlight) => (
                          <li
                            key={highlight}
                            className="text-[11px] leading-snug before:mr-1 before:content-['·'] sm:text-xs"
                            style={{ color: "var(--ash)" }}
                          >
                            {highlight}
                          </li>
                        ))}
                      </ul>

                      <div
                        className="caption mb-3 flex flex-wrap gap-x-4 gap-y-1 text-[10px] tracking-widest sm:text-[11px]"
                        style={{ color: "var(--brass)" }}
                      >
                        <span>ETA · {item.eta}</span>
                        <span>COVERAGE · {item.coverage}</span>
                      </div>

                      <div
                        className="caption flex items-center gap-1.5 transition-colors group-hover:text-[var(--cargo)]"
                        style={{ color: "var(--brass)" }}
                      >
                        {ctaLabel}
                        <ArrowUpRight
                          size={13}
                          className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        />
                      </div>
                    </div>
                  </div>
                );

                return (
                  <Link
                    key={item.slug}
                    href={`${hrefPrefix}${item.slug}` as Route}
                    role="tabpanel"
                    aria-hidden={index !== activeIndex}
                    className="group grid h-full min-w-0 shrink-0 grid-cols-1 sm:grid-cols-2"
                    style={{ width: `${100 / items.length}%` }}
                    data-cursor="OPEN"
                  >
                    {imageOnRight ? (
                      <>
                        <div className="h-full border-r" style={{ borderColor: "var(--line)" }}>
                          {textCell}
                        </div>
                        {imageCell}
                      </>
                    ) : (
                      <>
                        {imageCell}
                        <div className="h-full border-l" style={{ borderColor: "var(--line)" }}>
                          {textCell}
                        </div>
                      </>
                    )}
                  </Link>
                );
              })}
            </div>
          </div>

          <div
            className="flex items-center justify-center gap-1.5 border-t py-2"
            style={{ borderColor: "var(--line)" }}
          >
            {items.map((item, index) => (
              <button
                key={item.slug}
                type="button"
                onClick={() => setActiveIndex(index)}
                className="h-1 rounded-full transition-all duration-300"
                style={{
                  width: index === activeIndex ? "1.5rem" : "0.375rem",
                  background: index === activeIndex ? "var(--cargo)" : "var(--line-2)",
                }}
                aria-label={`Show ${item.name}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
