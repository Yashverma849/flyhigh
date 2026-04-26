import {
  Anchor,
  Plane,
  FileCheck2,
  Warehouse,
  Truck,
  Compass,
  type LucideIcon,
} from "lucide-react";

export type Service = {
  id: string;
  slug: string;
  name: string;
  tag: string;
  icon: LucideIcon;
  short: string;
  desc: string;
  features: string[];
  image: string;
  eta: string;
  coverage: string;
};

export const SERVICES: ReadonlyArray<Service> = [
  {
    id: "sea",
    slug: "sea",
    name: "Sea Freight",
    tag: "OCEAN",
    icon: Anchor,
    short: "FCL · LCL · Break Bulk · Special Equipment",
    desc: "Global ocean freight with guaranteed space across major shipping lines. Twenty-foot, forty-foot, and consolidated cargo handled with precision from origin to door.",
    features: [
      "20' & 40' FCL",
      "LCL consolidation",
      "Break bulk & special equipment",
      "Reefer & DG handling",
      "Origin/Dest custom clearance",
      "Door-to-door coverage",
    ],
    image:
      "https://images.unsplash.com/photo-1605281317010-fe5ffe798166?w=1600&q=80&auto=format&fit=crop",
    eta: "12–35 days",
    coverage: "180+ ports",
  },
  {
    id: "air",
    slug: "air",
    name: "Air Freight",
    tag: "AIR",
    icon: Plane,
    short: "Express · Standard · Charter · Perishables",
    desc: "Tail-to-tail and door-to-door air solutions across our agent network in 90+ countries. From courier-fast to full charter, including pharma cool chain and project cargo.",
    features: [
      "Express & deferred",
      "Charter & co-load",
      "Pharma cool-chain",
      "Dangerous goods (IATA)",
      "Live animal",
      "Aircraft-on-Ground (AOG)",
    ],
    image:
      "https://images.unsplash.com/photo-1583500178690-f7fc39ee08e2?w=1600&q=80&auto=format&fit=crop",
    eta: "1–7 days",
    coverage: "90+ countries",
  },
  {
    id: "customs",
    slug: "customs",
    name: "Customs Clearance",
    tag: "BORDERS",
    icon: FileCheck2,
    short: "Documentation · ATA Carnet · Trade Compliance",
    desc: "Licensed customs brokers handling all paperwork, examinations, stuffing/destuffing, and trade compliance. Panel members of FICCI for ATA Carnet shipments.",
    features: [
      "Custom documentation",
      "Carting & receiving",
      "Examination handling",
      "Stuffing/destuffing",
      "ATA Carnet (FICCI panel)",
      "Trade compliance",
    ],
    image:
      "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=1600&q=80&auto=format&fit=crop",
    eta: "Same day",
    coverage: "All Indian ports",
  },
  {
    id: "warehouse",
    slug: "warehouse",
    name: "Warehousing",
    tag: "STORAGE",
    icon: Warehouse,
    short: "Bonded · Cleanroom · Temperature-Controlled",
    desc: "Specialized warehousing as part of an integrated supply chain. Cleanroom and temperature-controlled facilities, with complete value-added services.",
    features: [
      "Bonded warehousing",
      "Cleanroom storage",
      "Temperature controlled",
      "Pick & pack",
      "Kitting & labeling",
      "Inventory dashboards",
    ],
    image:
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1600&q=80&auto=format&fit=crop",
    eta: "On demand",
    coverage: "12 facilities",
  },
  {
    id: "road",
    slug: "road",
    name: "Road Transport",
    tag: "GROUND",
    icon: Truck,
    short: "Own Fleet · Hinterland · Door-to-Door",
    desc: "Round-the-clock cargo pickup with our own fleet of close-body trucks. Hinterland transport for air and sea cargo to and from international gateways.",
    features: [
      "24/7 pickup",
      "Close body trucks",
      "Hinterland transport",
      "Reefer trailers",
      "Multi-axle for ODC",
      "GPS tracked",
    ],
    image:
      "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=1600&q=80&auto=format&fit=crop",
    eta: "1–3 days",
    coverage: "All India",
  },
  {
    id: "project",
    slug: "project",
    name: "Project Cargo",
    tag: "BESPOKE",
    icon: Compass,
    short: "Out-of-Gauge · Heavy Lift · Turnkey",
    desc: "From feasibility to final installation. Out-of-gauge, breakbulk, heavy lift, and engineered transport for energy, infrastructure, and aerospace.",
    features: [
      "Route surveys",
      "Permits & escorts",
      "Heavy lift cranes",
      "Modular shipping",
      "Marine insurance",
      "On-site engineers",
    ],
    image:
      "https://images.unsplash.com/photo-1577937927133-66ef06acdf18?w=1600&q=80&auto=format&fit=crop",
    eta: "Custom",
    coverage: "Worldwide",
  },
];

export const getServiceBySlug = (slug: string) => SERVICES.find((s) => s.slug === slug);
