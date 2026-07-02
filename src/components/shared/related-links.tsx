import type { Route } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { SectionLabel } from "@/components/shared/section-label";

export type RelatedItem = {
  href: string;
  title: string;
  blurb: string;
  tag?: string;
};

type Props = {
  num?: string;
  label?: string;
  heading?: string;
  items: RelatedItem[];
};

export function RelatedLinks({
  num = "—",
  label = "RELATED",
  heading = "Keep reading",
  items,
}: Props) {
  if (items.length === 0) return null;
  return (
    <section className="py-24">
      <div className="site-gutter">
        <SectionLabel num={num}>{label}</SectionLabel>
        <h2 className="f-display mt-4 mb-10 text-4xl tracking-tight md:text-5xl">{heading}</h2>
        <div
          className="grid gap-px md:grid-cols-2 lg:grid-cols-3"
          style={{ background: "var(--line)" }}
        >
          {items.map((it) => (
            <Link
              key={it.href}
              href={it.href as Route}
              className="group lift block p-8 text-left"
              style={{ background: "var(--ink)" }}
              data-cursor="OPEN"
            >
              {it.tag && (
                <div className="caption mb-3 text-[10px]" style={{ color: "var(--cargo)" }}>
                  {it.tag}
                </div>
              )}
              <div className="f-display mb-2 text-2xl leading-tight">{it.title}</div>
              <div className="text-sm" style={{ color: "var(--ash)" }}>
                {it.blurb}
              </div>
              <ArrowUpRight
                size={18}
                className="mt-6 opacity-0 transition-opacity group-hover:opacity-100"
                style={{ color: "var(--cargo)" }}
              />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
