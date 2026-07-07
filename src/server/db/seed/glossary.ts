export type GlossaryCategory =
  | "Customs & documents"
  | "Ocean freight"
  | "Air freight"
  | "Cold chain"
  | "Commercial & specialised";

export type GlossaryEntry = {
  term: string;
  short: string;
  long: string;
  category: GlossaryCategory;
  see?: string[];
};

export const GLOSSARY_CATEGORIES: GlossaryCategory[] = [
  "Customs & documents",
  "Ocean freight",
  "Air freight",
  "Cold chain",
  "Commercial & specialised",
];

export const GLOSSARY: ReadonlyArray<GlossaryEntry> = [
  {
    term: "AOG",
    short: "Aircraft on Ground",
    category: "Air freight",
    long: "An aircraft grounded by a missing or failed part. AOG-class urgency means wheels-up within hours, often by named courier or charter.",
    see: ["Charter"],
  },
  {
    term: "ATA Carnet",
    short: "Temporary admission document",
    category: "Customs & documents",
    long: "An international customs document that lets goods cross borders duty-free for up to a year, provided they return. Used heavily for fashion, art, professional equipment, and trade-show cargo.",
    see: ["FICCI", "Customs Clearance"],
  },
  {
    term: "BAF",
    short: "Bunker Adjustment Factor",
    category: "Ocean freight",
    long: "Sea-freight fuel surcharge that adjusts for bunker fuel price changes. Reset monthly by carriers; sits on top of base ocean rate.",
  },
  {
    term: "Bill of Lading",
    short: "Shipping contract & title document",
    category: "Customs & documents",
    long: "The legal contract between shipper and carrier for ocean freight. Acts as evidence of contract, receipt of goods, and document of title.",
    see: ["Air Waybill"],
  },
  {
    term: "Bonded Warehouse",
    short: "Customs-supervised storage",
    category: "Customs & documents",
    long: "Storage facility where imported goods may be held without payment of duty. Duty becomes payable only on release for home consumption.",
  },
  {
    term: "Break Bulk",
    short: "Non-containerised general cargo",
    category: "Ocean freight",
    long: "Cargo loaded individually rather than in containers — bagged, palletised, or as separate units. Used for project cargo, heavy lift, and oversized goods.",
  },
  {
    term: "CHA",
    short: "Customs House Agent",
    category: "Customs & documents",
    long: "An Indian-licensed customs broker authorised to file declarations on behalf of importers and exporters. Now formally called Customs Broker (CB) under the 2018 regulations.",
  },
  {
    term: "Charter",
    short: "Full-aircraft or full-vessel hire",
    category: "Air freight",
    long: "Renting an entire aircraft or ship for a specific movement. Used for project cargo, AOG, time-critical shipments, or cargo too large for scheduled capacity.",
  },
  {
    term: "Cool Chain",
    short: "Temperature-controlled logistics",
    category: "Cold chain",
    long: "End-to-end temperature management for pharmaceuticals, perishables, and biologicals — covering origin pre-cooling, transit, transhipment dwell, and last-mile.",
    see: ["GDP", "CRT-15"],
  },
  {
    term: "CRT-15",
    short: "Controlled Room Temperature 15-25°C",
    category: "Cold chain",
    long: "Pharmaceutical storage and transit standard for products that must remain between 15°C and 25°C. Most oral solids and many injectables are CRT-15.",
  },
  {
    term: "DDP",
    short: "Delivered Duty Paid",
    category: "Commercial & specialised",
    long: "Incoterm where the seller bears all costs and risks to deliver goods to the buyer's named destination, including all duties and taxes.",
    see: ["Incoterms"],
  },
  {
    term: "DG / Dangerous Goods",
    short: "Hazardous cargo",
    category: "Commercial & specialised",
    long: "Cargo classified under IMO (sea), IATA (air), or ADR (road) regulations as hazardous — Classes 1 (explosive) through 9 (miscellaneous).",
  },
  {
    term: "EUR.1",
    short: "Movement certificate (EU origin proof)",
    category: "Customs & documents",
    long: "A movement certificate that proves preferential origin for goods entering the European Union under a preferential trade agreement, allowing reduced or zero duty.",
  },
  {
    term: "FCL",
    short: "Full Container Load",
    category: "Ocean freight",
    long: "An ocean shipment that fills a single container (20', 40', or 40'HC) by one shipper for one consignee. Cheaper per cubic metre than LCL above breakeven volume.",
  },
  {
    term: "FICCI",
    short: "Federation of Indian Chambers of Commerce",
    category: "Customs & documents",
    long: "The Indian guarantor body for ATA Carnets. We are FICCI panel members, meaning we can issue and accept carnets.",
  },
  {
    term: "FSC",
    short: "Fuel Surcharge",
    category: "Air freight",
    long: "Air-freight fuel surcharge, indexed to jet fuel prices. Distinct from BAF, which applies to sea.",
  },
  {
    term: "GDP",
    short: "Good Distribution Practice",
    category: "Cold chain",
    long: "EU and WHO standard for maintaining the quality and integrity of pharmaceuticals through the supply chain. GDP-validated lanes have documented temperature control end-to-end.",
  },
  {
    term: "GOH",
    short: "Garments on Hanger",
    category: "Ocean freight",
    long: "An ocean-container fit-out that allows fashion garments to be shipped on hangers rather than packed flat, preserving drape and reducing pressing on arrival.",
  },
  {
    term: "HS Code",
    short: "Harmonized System tariff code",
    category: "Customs & documents",
    long: "An international six-digit nomenclature for classifying traded products. National extensions (eight or ten digits) determine duty rates.",
  },
  {
    term: "IMDG",
    short: "International Maritime Dangerous Goods Code",
    category: "Commercial & specialised",
    long: "The IMO-published rulebook for moving dangerous goods by sea. Covers packing, labelling, segregation, and stowage.",
  },
  {
    term: "Incoterms",
    short: "International Commercial Terms",
    category: "Commercial & specialised",
    long: "ICC-published rules defining the responsibilities of buyers and sellers in international trade — who pays for what, who carries risk, and where the handover happens.",
    see: ["DDP"],
  },
  {
    term: "LCL",
    short: "Less than Container Load",
    category: "Ocean freight",
    long: "An ocean shipment that does not fill a container; consolidated with other shippers' cargo into one container. Charged per cubic metre or per kilogram, whichever is greater.",
    see: ["FCL"],
  },
  {
    term: "ODC",
    short: "Over-Dimensional Cargo",
    category: "Commercial & specialised",
    long: "Cargo that exceeds standard road or container dimensions. Requires permits, route survey, escorts, and often multi-axle trailers.",
  },
  {
    term: "PAAR",
    short: "Pre-Arrival Assessment Report",
    category: "Customs & documents",
    long: "Nigerian customs document that must be issued before a vessel arrives. Without PAAR, cargo cannot clear at Apapa or Tin Can Island.",
  },
  {
    term: "Reefer",
    short: "Refrigerated container or trailer",
    category: "Cold chain",
    long: "A temperature-controlled shipping container or road trailer, typically capable of -25°C to +25°C. Powered at origin, on board, and at destination — continuity matters.",
  },
  {
    term: "SOB",
    short: "Shipped on Board",
    category: "Ocean freight",
    long: "Notation on a bill of lading confirming that goods have been physically loaded onto a named vessel — distinct from 'received for shipment'.",
  },
  {
    term: "SONCAP",
    short: "Standards Organisation of Nigeria Conformity Assessment",
    category: "Customs & documents",
    long: "Pre-shipment conformity certification required for many goods entering Nigeria. Issued at origin after inspection and documentation review.",
  },
  {
    term: "ULD",
    short: "Unit Load Device",
    category: "Air freight",
    long: "Aircraft container or pallet — the standardised loading units used inside cargo aircraft. Active-cool ULDs maintain temperature without external power for 100+ hours.",
  },
];
