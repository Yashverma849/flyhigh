export const SITE = {
  name: "Flyhigh",
  tagline: "Worldwide Freight, Refined.",
  origin: "Mumbai, India",
  email: "concierge@flyhigh.example",
  phone: "+91 22 4000 1100",
} as const;

export const NAV_ITEMS = [
  { href: "/services", label: "Services" },
  { href: "/about", label: "House" },
  { href: "/insights", label: "Journal" },
  { href: "/track", label: "Track" },
  { href: "/contact", label: "Concierge" },
] as const;

export const ADMIN_NAV = [
  { id: "dashboard", label: "Dashboard", href: "/admin" },
  { id: "shipments", label: "Shipments", href: "/admin/shipments" },
  { id: "customers", label: "Customers", href: "/admin/customers" },
  { id: "content", label: "Content / CMS", href: "/admin/content" },
  { id: "analytics", label: "Analytics", href: "/admin/analytics" },
  { id: "settings", label: "Settings", href: "/admin/settings" },
] as const;

export type ShipmentStatus = "Booked" | "In Transit" | "Customs" | "Delivered" | "Exception";
export type ShipmentMode = "sea" | "air" | "road";
