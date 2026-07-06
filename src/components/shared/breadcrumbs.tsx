import { JsonLd } from "@/components/shared/json-ld";
import { breadcrumbJsonLd, type Crumb } from "@/lib/seo";

type Props = {
  items: Crumb[];
};

/** Structured data only — no visible breadcrumb trail. */
export function Breadcrumbs({ items }: Props) {
  if (items.length === 0) return null;
  const first = items[0];
  const crumbs: Crumb[] =
    first && first.href === "/" ? items : [{ name: "Home", href: "/" }, ...items];

  return <JsonLd data={breadcrumbJsonLd(crumbs)} />;
}
