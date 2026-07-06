import type { LucideIcon } from "lucide-react";
import type { Industry } from "@/server/db/seed/industries";
import { SERVICES } from "@/server/db/seed/services";

export type IndustryOverview = {
  slug: string;
  name: string;
  tag: string;
  icon: LucideIcon;
  image: string;
  short: string;
  desc: string;
  stats: { l: string; v: string }[];
  challenges: string[];
  capabilities: string[];
  servicesLine: string;
};

function firstSentence(text: string): string {
  const match = text.match(/^[^.!?]+[.!?]/);
  return match ? match[0] : text;
}

export function toIndustryOverview(industry: Industry): IndustryOverview {
  const servicesLine = industry.relatedServices
    .map((id) => SERVICES.find((s) => s.id === id)?.name)
    .filter(Boolean)
    .join(" · ");

  return {
    slug: industry.slug,
    name: industry.name,
    tag: industry.tag,
    icon: industry.icon,
    image: industry.image,
    short: industry.short,
    desc: firstSentence(industry.desc),
    stats: industry.stats,
    challenges: industry.challenges.slice(0, 3),
    capabilities: industry.capabilities.slice(0, 4),
    servicesLine,
  };
}
