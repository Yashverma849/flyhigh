export type CaseStudy = {
  slug: string;
  title: string;
  client: string;
  industry: string;
  industrySlug: string;
  serviceSlug: string;
  region: string;
  challenge: string;
  approach: string;
  outcome: string;
  metrics: { l: string; v: string }[];
  date: string;
  read: string;
  image: string;
  excerpt: string;
};

export const CASE_STUDIES: ReadonlyArray<CaseStudy> = [
  {
    slug: "alphonso-mango-airlift-japan",
    title: "Alphonso mango air-lift to Japan: 4,200 tonnes, zero rejections",
    client: "Premium fruit consortium, Ratnagiri",
    industry: "Perishables & Cold Chain",
    industrySlug: "perishables-cold-chain",
    serviceSlug: "air",
    region: "Asia-Pacific",
    excerpt:
      "Pre-cooled belly-cargo with origin VHT chambers. Phytosanitary windows that landed every shipment within MAFF tolerance.",
    challenge:
      "Japan accepts Indian mangoes only after Vapour Heat Treatment certified by MAFF inspectors. The window from VHT to arrival is 72 hours — miss it, the consignment is destroyed, not just rejected.",
    approach:
      "We co-located our cool-chain desk inside the Maharashtra State Agricultural Marketing Board's VHT facility. Three-shift coordination synced VHT batches with confirmed ANA Cargo capacity out of BOM. Each pallet got a pre-flight temperature logger with cabin-grade calibration.",
    outcome:
      "4,200 tonnes moved across the 2025 season. Zero rejections at NRT. The consortium now treats us as their seasonal logistics partner, not a vendor.",
    metrics: [
      { l: "TONNES MOVED", v: "4,200" },
      { l: "REJECTIONS", v: "0" },
      { l: "VHT-TO-ARRIVAL", v: "62h avg" },
      { l: "TEMP COMPLIANCE", v: "100%" },
    ],
    date: "2025-08-12",
    read: "9 min",
    image:
      "https://images.unsplash.com/photo-1553279768-865429fa0078?w=1600&q=80&auto=format&fit=crop",
  },
  {
    slug: "ev-battery-pack-frankfurt-jit",
    title: "EV battery packs to Frankfurt — JIT inbound, UN3480-class 9",
    client: "European EV OEM via Pune supplier",
    industry: "Automotive & EV",
    industrySlug: "automotive",
    serviceSlug: "air",
    region: "Europe",
    excerpt:
      "UN3480 lithium-ion air corridor with line-side delivery. Production line never paused.",
    challenge:
      "A European EV OEM had committed to a launch date with 90 days of buffer. A Pune-supplied battery pack hit a yield issue, eating the buffer. Air-only would breach UN3480 weight limits per consignment; sea-only would slip the launch.",
    approach:
      "We split the volume across three weekly Lufthansa Cargo allotments out of BOM, each within UN3480 single-shipment limits. Bonded ground feed from Pune, ATLAS pre-arrival at FRA, then milk-run delivery to plant in 6-pallet drops aligned to assembly takt.",
    outcome:
      "Zero line stoppages across the eight-week ramp. The OEM moved us from 'spot' to a one-year preferred-carrier framework.",
    metrics: [
      { l: "PACKS DELIVERED", v: "1,840" },
      { l: "LINE STOPPAGES", v: "0" },
      { l: "ON-TIME-IN-FULL", v: "99.7%" },
      { l: "DG NCRs", v: "0" },
    ],
    date: "2025-06-30",
    read: "7 min",
    image:
      "https://images.unsplash.com/photo-1591868726398-cb1b3b88c84a?w=1600&q=80&auto=format&fit=crop",
  },
  {
    slug: "ata-carnet-paris-fashion-week",
    title: "Paris Fashion Week — 18 carnets, 22 shipments, 0 detentions",
    client: "Indian couture house",
    industry: "Apparel & Textiles",
    industrySlug: "apparel-textiles",
    serviceSlug: "customs",
    region: "Europe",
    excerpt:
      "ATA carnets across 22 movements in seven days, with one back-up flight that paid for itself.",
    challenge:
      "A Mumbai couture house was invited to Paris Fashion Week with five collections. Each collection was a separate carnet; some pieces had to return mid-week for press. Standard freight would not survive the cadence.",
    approach:
      "Eighteen ATA Carnets pre-issued via FICCI, each dimensioned to a single collection. Named couriers on every flight. A pre-booked back-up Air France allotment held in reserve for the press-return movement that always happens.",
    outcome:
      "All 22 movements landed on time. The reserved back-up allotment was used twice. The house has retained us for Milan and New York editions.",
    metrics: [
      { l: "CARNETS ISSUED", v: "18" },
      { l: "MOVEMENTS", v: "22" },
      { l: "DETENTIONS", v: "0" },
      { l: "BACKUP USED", v: "2x" },
    ],
    date: "2025-09-22",
    read: "6 min",
    image:
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=1600&q=80&auto=format&fit=crop",
  },
  {
    slug: "lithography-tool-aog-bangalore",
    title: "AOG-class lithography tool relocation: Bangalore in 41 hours",
    client: "Foundry capacity expansion programme",
    industry: "Electronics & Semiconductors",
    industrySlug: "electronics-semiconductors",
    serviceSlug: "air",
    region: "Asia-Pacific",
    excerpt:
      "Vibration-controlled charter with on-site engineers. Tool was running production in five days.",
    challenge:
      "A foundry expansion in Bangalore needed a metrology tool relocated from Singapore. Vendor support was contingent on factory-certified packing and a vibration-controlled lane — anything else voided the warranty.",
    approach:
      "Cathay Pacific Cargo charter sourced for the BLR slot. Air-ride trailers at both ends. Our ESD-trained crew supervised crating to vendor spec, with shock loggers on every crate. Customs pre-clearance at BLR via SEZ portal.",
    outcome:
      "41 hours from Singapore loading dock to Bangalore cleanroom. Tool was producing wafers within five days. Vendor warranty intact.",
    metrics: [
      { l: "DOOR-TO-DOOR", v: "41h" },
      { l: "SHOCK EVENTS", v: "0 over threshold" },
      { l: "WARRANTY", v: "Maintained" },
      { l: "FAB DOWNTIME", v: "5 days" },
    ],
    date: "2025-04-08",
    read: "8 min",
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1600&q=80&auto=format&fit=crop",
  },
  {
    slug: "wind-turbine-blade-mundra-vietnam",
    title: "65-metre wind turbine blades — Mundra to Vietnam by breakbulk",
    client: "Renewable energy EPC",
    industry: "Project Cargo",
    industrySlug: "automotive",
    serviceSlug: "sea",
    region: "Asia-Pacific",
    excerpt:
      "Heavy-lift breakbulk with route survey and police escort, then port-to-site multimodal.",
    challenge:
      "Twelve 65-metre wind turbine blades were destined for a project site in central Vietnam. No Indian carrier offered direct breakbulk; available capacity was on transhipment routings that would damage the blades.",
    approach:
      "Direct breakbulk vessel chartered Mundra to Hai Phong, with engineered cradles built to OEM spec. Vietnamese authorities engaged six weeks pre-arrival for route survey, road widening at four points, and police escort coordination.",
    outcome:
      "All twelve blades installed within the project window. Zero damage. The EPC has booked us for the next two phases.",
    metrics: [
      { l: "BLADES MOVED", v: "12" },
      { l: "BLADE LENGTH", v: "65m" },
      { l: "DAMAGE INCIDENTS", v: "0" },
      { l: "PHASE-2 CONFIRMED", v: "Yes" },
    ],
    date: "2024-11-04",
    read: "10 min",
    image:
      "https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=1600&q=80&auto=format&fit=crop",
  },
  {
    slug: "vaccine-cool-chain-east-africa",
    title: "East Africa vaccine cool-chain — 18 lanes, 99.8% temp compliance",
    client: "Global health NGO",
    industry: "Pharmaceuticals & Life Sciences",
    industrySlug: "pharmaceuticals",
    serviceSlug: "air",
    region: "Africa",
    excerpt:
      "GDP-validated lanes from Hyderabad to nine African capitals, with last-mile reefer beyond.",
    challenge:
      "A global health NGO needed a single freight forwarder for 18 vaccine lanes across East and Southern Africa. Many destinations had irregular cool-chain integrity beyond the airport.",
    approach:
      "GDP audit of every origin, transhipment, and destination. va-Q-tec passive containers for last-mile beyond airport reefer reach. Real-time loggers with NGO portal access. Local clearance partners pre-vetted in nine countries.",
    outcome:
      "Eighteen lanes operational. Temperature compliance at 99.8% over the first year. The NGO published our partnership in their annual transparency report.",
    metrics: [
      { l: "ACTIVE LANES", v: "18" },
      { l: "TEMP COMPLIANCE", v: "99.8%" },
      { l: "DOSES MOVED", v: "11.2M" },
      { l: "AUDITED COUNTRIES", v: "9" },
    ],
    date: "2025-02-19",
    read: "11 min",
    image:
      "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1600&q=80&auto=format&fit=crop",
  },
];

export const getCaseStudyBySlug = (slug: string) => CASE_STUDIES.find((c) => c.slug === slug);
