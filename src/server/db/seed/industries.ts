import {
  Pill,
  Cog,
  Shirt,
  Cpu,
  Snowflake,
  FlaskConical,
  Shield,
  Wine,
  Film,
  type LucideIcon,
} from "lucide-react";

export type Industry = {
  id: string;
  slug: string;
  name: string;
  tag: string;
  icon: LucideIcon;
  short: string;
  desc: string;
  challenges: string[];
  capabilities: string[];
  caseStudySlug?: string;
  relatedServices: string[];
  image: string;
  stats: { l: string; v: string }[];
};

export const INDUSTRIES: ReadonlyArray<Industry> = [
  {
    id: "pharma",
    slug: "pharmaceuticals",
    name: "Pharmaceuticals & Life Sciences",
    tag: "PHARMA",
    icon: Pill,
    short: "GDP-validated cool chain · CRT-15 to deep-frozen · CDSCO clearance",
    desc: "From Mumbai's pharma corridor to forty-seven import gateways. Active-cool ULDs, validated lanes, and customs brokers who can read a CDSCO query at 2 a.m.",
    challenges: [
      "Sub-30°C maintenance across humid transhipment hubs",
      "Lane-level temperature excursions and live alarms",
      "Origin CDSCO and destination FDA / EMA documentation",
      "Stability data alignment with CRT-15, CRT-25, and 2-8°C corridors",
    ],
    capabilities: [
      "GDP-validated air corridors (Envirotainer, va-Q-tec)",
      "Bonded cool storage at BOM, DEL, HYD",
      "Real-time temperature telemetry per shipment",
      "ATA Carnet for clinical trial samples",
      "DG handling for IATA categories 6.2 and 9",
      "CHAS-licensed brokers on every Indian gateway",
    ],
    relatedServices: ["air", "warehouse", "customs"],
    image:
      "https://images.unsplash.com/photo-1583912267550-90c8c08bba2b?w=1600&q=80&auto=format&fit=crop",
    stats: [
      { l: "TEMP. EXCURSIONS / 1000", v: "0.4" },
      { l: "GDP LANES", v: "23" },
      { l: "MEAN CLEARANCE", v: "4h 12m" },
      { l: "DESK STAFF", v: "9" },
    ],
  },
  {
    id: "automotive",
    slug: "automotive",
    name: "Automotive & EV",
    tag: "AUTO",
    icon: Cog,
    short: "JIT inbound · Battery DG · After-market reverse flows",
    desc: "OEMs and tier-one suppliers move with us — engines, transmissions, EV battery packs (UN3480/3481), and the impossible aftermarket SKUs nobody else will touch.",
    challenges: [
      "Lithium battery (Class 9) air corridor compliance",
      "JIT alignment with assembly-line takt times",
      "ODC / heavy-lift for stamping dies and tooling",
      "Reverse logistics for warranty and recall flows",
    ],
    capabilities: [
      "UN3480 / UN3481 lithium battery handling",
      "Multi-axle ODC trailers for dies & moulds",
      "Bonded warehousing at automotive clusters (Pune, Chennai)",
      "Milk-run and JIT inbound coordination",
      "Reverse-flow management with quality holds",
      "Spare-parts kitting and labelling",
    ],
    relatedServices: ["sea", "road", "warehouse"],
    image:
      "https://images.unsplash.com/photo-1581094288338-2314dddb7ece?w=1600&q=80&auto=format&fit=crop",
    stats: [
      { l: "OEM ACCOUNTS", v: "14" },
      { l: "JIT ON-TIME", v: "99.7%" },
      { l: "DG BATTERIES / MO", v: "3.1k" },
      { l: "BONDED HUBS", v: "5" },
    ],
  },
  {
    id: "apparel",
    slug: "apparel-textiles",
    name: "Apparel & Textiles",
    tag: "FASHION",
    icon: Shirt,
    short: "Runway-grade carnet · Sample air · Container consolidation",
    desc: "From Tirupur knitwear consolidation to Milan runway carnets. We move samples by air at sample speed, and bulk by sea without surprises at the discharge port.",
    challenges: [
      "Compressed sample-to-shelf cycles",
      "Multi-vendor consolidation across Tamil Nadu and Gujarat",
      "Customs valuation queries on free samples",
      "Returns logistics from European retail",
    ],
    capabilities: [
      "ATA Carnet for runway and trade-show pieces",
      "Multi-pickup consolidation across South India",
      "Hanger-loaded GOH containers",
      "Pre-shipment QC inspection coordination",
      "Returns reverse-logistics with credit notes",
      "EXW to DDP terms worldwide",
    ],
    relatedServices: ["air", "sea", "customs"],
    image:
      "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=1600&q=80&auto=format&fit=crop",
    stats: [
      { l: "GOH CONTAINERS / YR", v: "2.4k" },
      { l: "CARNETS / YR", v: "180+" },
      { l: "VENDOR PICKUPS", v: "1,100" },
      { l: "RETURN CYCLE", v: "11 days" },
    ],
  },
  {
    id: "electronics",
    slug: "electronics-semiconductors",
    name: "Electronics & Semiconductors",
    tag: "TECH",
    icon: Cpu,
    short: "AOG-grade air · ESD-safe handling · Bonded MEIS warehousing",
    desc: "Wafers, capital equipment, and finished goods. ESD-safe handling, vibration-controlled lanes, and an AOG desk for the parts that stop production lines.",
    challenges: [
      "ESD-sensitive cargo across humid transhipments",
      "Vibration tolerances on lithography and metrology tools",
      "MEIS / SEIS scheme alignment with customs",
      "AOG-style urgency for fab spares",
    ],
    capabilities: [
      "ESD-safe packaging audits & lane validation",
      "Air-ride and shock-monitored road transport",
      "Bonded warehousing under MEIS schemes",
      "AOG desk with 4-hour wheels-up SLA",
      "Cleanroom cross-dock at BOM and BLR",
      "Component-level kitting for fab consumables",
    ],
    relatedServices: ["air", "road", "warehouse"],
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1600&q=80&auto=format&fit=crop",
    stats: [
      { l: "AOG SHIPMENTS / MO", v: "47" },
      { l: "WHEELS-UP SLA", v: "4h" },
      { l: "ESD AUDITS", v: "Quarterly" },
      { l: "FAB CLIENTS", v: "6" },
    ],
  },
  {
    id: "perishables",
    slug: "perishables-cold-chain",
    name: "Perishables & Cold Chain",
    tag: "COLD",
    icon: Snowflake,
    short: "Reefer ocean · Pre-cooled air · Phytosanitary speed",
    desc: "Mangoes to Tokyo, prawns to Brussels, flowers to Amsterdam. Pre-cooled cargo, validated reefer corridors, and customs brokers who treat phytosanitary windows like missile launches.",
    challenges: [
      "Origin pre-cooling and farm-gate first-mile",
      "Phytosanitary documentation timing windows",
      "Reefer plug continuity across transhipments",
      "Last-mile temperature continuity to retailer DCs",
    ],
    capabilities: [
      "Reefer FCL with pre-trip inspection records",
      "Pre-cooled air ULDs with temp loggers",
      "Phytosanitary and APEDA certification handling",
      "Cold cross-dock at BOM, COK, MAA",
      "Last-mile reefer trucking",
      "Live shipment temperature dashboard",
    ],
    relatedServices: ["sea", "air", "road", "warehouse"],
    image:
      "https://images.unsplash.com/photo-1542838132-92c53300491e?w=1600&q=80&auto=format&fit=crop",
    stats: [
      { l: "REEFER LANES", v: "31" },
      { l: "TEMP COMPLIANCE", v: "99.8%" },
      { l: "REJECTION RATE", v: "0.3%" },
      { l: "MANGO TONNES / SEASON", v: "4,200" },
    ],
  },
  {
    id: "chemicals",
    slug: "chemicals-hazardous",
    name: "Chemicals & Hazardous Goods",
    tag: "HAZMAT",
    icon: FlaskConical,
    short: "IMDG · IATA DGR · MSDS-driven routing",
    desc: "Class 3 to Class 9 — handled by people who can recite the IMDG amendment cycle from memory. We don't just move DG; we route around the gateways that can't.",
    challenges: [
      "Vessel cut-off and segregation rule complexity",
      "Airline DG embargoes and corridor changes",
      "Origin and destination DG declaration accuracy",
      "Tank container and ISO-tank availability",
    ],
    capabilities: [
      "IMDG-compliant FCL & LCL booking",
      "IATA DGR-certified packing & paperwork",
      "ISO-tank and flexitank coordination",
      "Bonded DG warehousing (Mumbai, Mundra)",
      "Emergency response phone-a-friend network",
      "MSDS-driven lane selection",
    ],
    relatedServices: ["sea", "air", "warehouse", "road"],
    image:
      "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=1600&q=80&auto=format&fit=crop",
    stats: [
      { l: "DG MOVES / MO", v: "640" },
      { l: "IATA-CERT STAFF", v: "21" },
      { l: "ISO-TANK FLEET ACCESS", v: "1,200" },
      { l: "ZERO-INCIDENT YRS", v: "9" },
    ],
  },
  {
    id: "defence",
    slug: "defence-aerospace",
    name: "Defence & Aerospace",
    tag: "DEFENCE",
    icon: Shield,
    short: "ITAR-aware · MoD logistics · AOG aerospace lifts",
    desc: "Strategic cargo for Indian and allied programmes — AOG lifts for civil aviation, controlled-goods movement under End-Use Certificates, and the discretion of a maison.",
    challenges: [
      "Export control (DGFT, BIS, ITAR-aware) compliance",
      "End-Use Certificate and SCOMET licensing",
      "AOG-class urgency on engine and rotables",
      "Charter coordination for outsized airframe parts",
    ],
    capabilities: [
      "DGFT / SCOMET licence assistance",
      "ITAR-aware route planning (we don't carry ITAR ourselves)",
      "Charter brokerage (B747F, AN-124)",
      "AOG desk with MRO coordination",
      "Bonded MRO warehousing",
      "Discreet handling and named couriers",
    ],
    relatedServices: ["air", "carnet", "customs"],
    image:
      "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=1600&q=80&auto=format&fit=crop",
    stats: [
      { l: "CHARTERS / YR", v: "12" },
      { l: "AOG MEAN-TIME-TO-WHEELS-UP", v: "3h 40m" },
      { l: "SCOMET FILINGS / YR", v: "60+" },
      { l: "DEFENCE CLIENTS", v: "3" },
    ],
  },
  {
    id: "wine-spirits",
    slug: "wine-spirits-luxury",
    name: "Wine, Spirits & Luxury",
    tag: "LUXURY",
    icon: Wine,
    short: "Temperature-stable lanes · Excise · White-glove last mile",
    desc: "Bordeaux to Bandra, single-malts to Singapore. Temperature-stable ocean lanes, excise paperwork that doesn't bottleneck dispatch, and last-mile that respects the bottle.",
    challenges: [
      "Wine-degradation risk in heat-stressed transit",
      "Origin and destination excise & duty complexity",
      "Glass breakage and theft exposure",
      "DDP delivery to private cellars and retail",
    ],
    capabilities: [
      "Insulated-container lane validation",
      "EX1 / EX5 excise documentation",
      "All-risk marine insurance with breakage cover",
      "Bonded wine warehousing (BOM)",
      "White-glove cellar delivery",
      "Customs valuation defence on rare lots",
    ],
    relatedServices: ["sea", "warehouse", "road"],
    image:
      "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=1600&q=80&auto=format&fit=crop",
    stats: [
      { l: "BREAKAGE RATE", v: "0.06%" },
      { l: "BONDED PALLETS", v: "1,800" },
      { l: "PRIVATE CELLARS", v: "120" },
      { l: "RARE-LOT MOVES", v: "Monthly" },
    ],
  },
  {
    id: "entertainment",
    slug: "films-entertainment",
    name: "Films & Entertainment",
    tag: "MEDIA",
    icon: Film,
    short: "Production gear · Carnet shoots · Wardrobe & set freight",
    desc: "From Mumbai studios to international shoot locations — cameras, lighting rigs, costumes, props, and set pieces moved on tight production schedules with carnet paperwork that doesn't slip.",
    challenges: [
      "Carnet timing aligned with shoot windows",
      "Production-grade equipment under temperature & shock controls",
      "Customs valuation on production gear and props",
      "Wardrobe and prop returns within carnet validity",
    ],
    capabilities: [
      "ATA Carnet for production equipment",
      "Air freight for shoot-day calls",
      "Sea consolidation for set builds",
      "Insulated transport for sensitive optics",
      "Pre-cleared returns to home studio",
      "Discreet handling for talent travel cargo",
    ],
    relatedServices: ["air", "carnet", "road"],
    image:
      "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=1600&q=80&auto=format&fit=crop",
    stats: [
      { l: "PRODUCTIONS / YR", v: "—" },
      { l: "CARNET SHOOTS", v: "—" },
      { l: "STUDIO ACCOUNTS", v: "—" },
      { l: "REGIONS COVERED", v: "—" },
    ],
  },
];

export const getIndustryBySlug = (slug: string) => INDUSTRIES.find((i) => i.slug === slug);
