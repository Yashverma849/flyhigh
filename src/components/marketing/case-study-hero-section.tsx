import type { Route } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export type CaseStudyHeroItem = {
  href: string;
  title: string;
  blurb: string;
  tag?: string;
  image: string;
};

type Props = {
  items: CaseStudyHeroItem[];
};

export function CaseStudyHeroSection({ items }: Props) {
  if (items.length === 0) return null;

  return (
    <section className="w-full min-w-0 max-w-full overflow-x-hidden py-10 md:py-12">
      <div className="flex flex-col">
        {items.map((item) => (
          <Link
            key={item.href}
            href={item.href as Route}
            className="group relative block min-h-[min(75svh,640px)] overflow-hidden"
            data-cursor="READ"
          >
            <div className="absolute inset-0 z-0">
              <img
                src={item.image}
                alt=""
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(to right, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.55) 50%, rgba(0,0,0,0.35) 100%), linear-gradient(to top, var(--ink) 0%, transparent 40%)",
                }}
              />
            </div>

            <div className="site-gutter relative z-10 flex min-h-[min(75svh,640px)] flex-col justify-center items-center text-center py-16 text-white md:py-20">
              {item.tag && (
                <div className="caption mb-4 text-[10px] tracking-widest" style={{ color: "var(--cargo)" }}>
                  {item.tag}
                </div>
              )}
              <h3 className="f-display max-w-4xl mx-auto text-[clamp(1.75rem,4vw,3.5rem)] leading-[1.05] tracking-tight">
                {item.title}
              </h3>
              <p className="mt-5 max-w-2xl mx-auto text-base leading-relaxed text-white/85 md:text-lg">
                {item.blurb}
              </p>
              <div
                className="caption mt-8 flex items-center justify-center gap-2 transition-colors group-hover:text-[var(--cargo)]"
                style={{ color: "var(--brass)" }}
              >
                Read case study
                <ArrowUpRight
                  size={16}
                  className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
