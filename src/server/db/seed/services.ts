import {
  Anchor,
  Plane,
  FileCheck2,
  Warehouse,
  Truck,
  BookOpen,
  type LucideIcon,
} from "lucide-react";

export type ServiceFeature = {
  name: string;
  image: string;
};

export type Service = {
  id: string;
  slug: string;
  name: string;
  tag: string;
  icon: LucideIcon;
  short: string;
  desc: string;
  features: ServiceFeature[];
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
      { name: "20' & 40' FCL", image: "/services/sea/fcl.png" },
      { name: "LCL consolidation", image: "/services/sea/lcl.png" },
      { name: "Break bulk & special equipment", image: "/services/sea/breakbulk.png" },
      { name: "Reefer & DG handling", image: "/services/sea/reefer_dg.png" },
      { name: "Origin/Dest custom clearance", image: "/services/sea/custom_clearance.png" },
      { name: "Door-to-door coverage", image: "/services/sea/door_to_door.png" },
    ],
    image: "/services_ocean_1783068767313.png",
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
      { name: "Express & deferred", image: "/services/air/express.png" },
      { name: "Charter & co-load", image: "/services/air/charter.png" },
      { name: "Pharma cool-chain", image: "/services/air/pharma.png" },
      { name: "Dangerous goods (IATA)", image: "/services/air/dangerous_goods.png" },
      { name: "Live animal", image: "/services/air/live_animal.png" },
      { name: "Aircraft-on-Ground (AOG)", image: "/services/air/aog.png" },
    ],
    image: "/services_air_1783068810326.png",
    eta: "1–7 days",
    coverage: "90+ countries",
  },
  {
    id: "customs",
    slug: "customs",
    name: "Customs Clearance",
    tag: "BORDERS",
    icon: FileCheck2,
    short: "Documentation · Brokerage · Trade Compliance",
    desc: "Licensed customs brokers handling all paperwork, examinations, stuffing/destuffing, and trade compliance for both import and export shipments.",
    features: [
      { name: "Custom documentation", image: "/services/customs/documentation.png" },
      { name: "Carting & receiving", image: "/services/customs/carting.png" },
      { name: "Examination handling", image: "/services/customs/examination.png" },
      { name: "Stuffing/destuffing", image: "/services/customs/stuffing.png" },
      { name: "Import & export brokerage", image: "/services/customs/brokerage.png" },
      { name: "Trade compliance", image: "/services/customs/compliance.png" },
    ],
    image: "/services_borders_1783068829815.png",
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
      { name: "Bonded warehousing", image: "/services/warehouse/bonded.png" },
      { name: "Cleanroom storage", image: "/services/warehouse/cleanroom.png" },
      { name: "Temperature controlled", image: "/services/warehouse/temperature.png" },
      { name: "Pick & pack", image: "/services/warehouse/pick_pack.png" },
      { name: "Kitting & labeling", image: "/services/warehouse/kitting.png" },
      { name: "Inventory dashboards", image: "/services/warehouse/inventory.png" },
    ],
    image: "/services_storage_1783068868308.png",
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
      { name: "24/7 pickup", image: "/services/road/pickup.png" },
      { name: "Close body trucks", image: "/services/road/trucks.png" },
      { name: "Hinterland transport", image: "/services/road/hinterland.png" },
      { name: "Reefer trailers", image: "/services/road/reefer_trailers.png" },
      { name: "Multi-axle for ODC", image: "/services/road/odc.png" },
      { name: "GPS tracked", image: "/services/road/gps.png" },
    ],
    image: "/services_ground_1783068889262.png",
    eta: "1–3 days",
    coverage: "All India",
  },
  {
    id: "carnet",
    slug: "carnet",
    name: "ATA Carnet",
    tag: "CARNET",
    icon: BookOpen,
    short: "Import & Export · FICCI Panel · Trade Shows · Samples",
    desc: "Specialist clearance for ATA Carnet shipments — both import and export. Panel members of FICCI, India's Carnet issuing authority. Used for trade shows, exhibitions, professional equipment, and runway samples.",
    features: [
      { name: "Carnet issuance assistance", image: "/services/carnet/issuance.png" },
      { name: "Trade show & exhibition cargo", image: "/services/carnet/exhibition.png" },
      { name: "Professional equipment movement", image: "/services/carnet/equipment.png" },
      { name: "Runway and sample shipments", image: "/services/carnet/runway.png" },
      { name: "Re-export within validity", image: "/services/carnet/reexport.png" },
      { name: "FICCI panel paperwork", image: "/services/carnet/ficci.png" },
    ],
    image: "/services_cabinet_1783068927669.png",
    eta: "Same day",
    coverage: "All Indian ports",
  },
];

export const getServiceBySlug = (slug: string) => SERVICES.find((s) => s.slug === slug);
