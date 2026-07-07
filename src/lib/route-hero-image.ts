import type { Route } from "@/server/db/seed/routes";

const MODE_IMAGES: Record<Route["mode"], string> = {
  Sea: "/services_ocean_1783068767313.png",
  Air: "/services_air_1783068810326.png",
  Road: "/services_ground_1783068889262.png",
};

export function getRouteHeroImage(mode: Route["mode"]): string {
  return MODE_IMAGES[mode];
}
