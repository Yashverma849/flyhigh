export const SITE = {
  name: "Flyhigh",
  legalName: "Flyhigh Logistics Pvt. Ltd.",
  tagline: "Worldwide Freight, Refined.",
  origin: "Mumbai, India",
  email: "concierge@flyhigh.in",
  phone: "+91 22 4000 5500",
  founded: 2017,
  cin: "U63090MH2017PTC290114",
  iec: "0317XXXXXX",
  address: {
    street: "Flyhigh House, 14 Marine Lines",
    city: "Mumbai",
    region: "Maharashtra",
    postal: "400020",
    country: "IN",
  },
  social: {
    linkedin: "https://www.linkedin.com/company/flyhigh-logistics",
    twitter: "https://twitter.com/flyhighfreight",
    instagram: "https://www.instagram.com/flyhigh.freight",
  },
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
