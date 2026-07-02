import type { Route } from "next";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { JsonLd } from "@/components/shared/json-ld";
import { breadcrumbJsonLd, type Crumb } from "@/lib/seo";

type Props = {
  items: Crumb[];
  className?: string;
};

export function Breadcrumbs({ items, className }: Props) {
  if (items.length === 0) return null;
  const first = items[0];
  const crumbs: Crumb[] =
    first && first.href === "/" ? items : [{ name: "Home", href: "/" }, ...items];

  return (
    <>
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
      <nav
        aria-label="Breadcrumb"
        className={`caption flex flex-wrap items-center gap-1 text-[10px] ${className ?? ""}`}
      >
        {crumbs.map((c, i) => {
          const last = i === crumbs.length - 1;
          return (
            <span key={c.href} className="flex items-center gap-1">
              {last ? (
                <span aria-current="page" style={{ color: "var(--bone)" }}>
                  {c.name}
                </span>
              ) : (
                <Link href={c.href as Route} className="u-link" style={{ color: "var(--ash)" }}>
                  {c.name}
                </Link>
              )}
              {!last && <ChevronRight size={10} style={{ color: "var(--brass)" }} />}
            </span>
          );
        })}
      </nav>
    </>
  );
}
