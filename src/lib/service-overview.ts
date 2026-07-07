import type { LucideIcon } from "lucide-react";
import type { Service } from "@/server/db/seed/services";

export type ServiceOverview = {
  slug: string;
  name: string;
  tag: string;
  icon: LucideIcon;
  image: string;
  short: string;
  desc: string;
  eta: string;
  coverage: string;
  features: string[];
};

function firstSentence(text: string): string {
  const match = text.match(/^[^.!?]+[.!?]/);
  return match ? match[0] : text;
}

export function toServiceOverview(service: Service): ServiceOverview {
  return {
    slug: service.slug,
    name: service.name,
    tag: service.tag,
    icon: service.icon,
    image: service.image,
    short: service.short,
    desc: firstSentence(service.desc),
    eta: service.eta,
    coverage: service.coverage,
    features: service.features.slice(0, 4),
  };
}
