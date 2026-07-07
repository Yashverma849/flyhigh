import type { Route } from "@/server/db/seed/routes";
import { formatINR } from "@/lib/utils";
import { getRouteHeroImage } from "@/lib/route-hero-image";

export type RouteOverview = {
  slug: string;
  fromCity: string;
  toCity: string;
  mode: Route["mode"];
  region: Route["region"];
  image: string;
  short: string;
  desc: string;
  days: number;
  rate: number;
  freqWeekly: number;
  carriers: string[];
  documents: string[];
};

function firstSentence(text: string): string {
  const match = text.match(/^[^.!?]+[.!?]/);
  return match ? match[0] : text;
}

export function toRouteOverview(route: Route): RouteOverview {
  return {
    slug: route.slug,
    fromCity: route.fromCity,
    toCity: route.toCity,
    mode: route.mode,
    region: route.region,
    image: getRouteHeroImage(route.mode),
    short: route.short,
    desc: firstSentence(route.desc),
    days: route.days,
    rate: route.rate,
    freqWeekly: route.freqWeekly,
    carriers: (route.carriers ?? []).slice(0, 4),
    documents: route.documents.slice(0, 4),
  };
}

export function formatRouteRate(rate: number): string {
  return formatINR(rate);
}
