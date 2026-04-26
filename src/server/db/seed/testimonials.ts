export type Testimonial = {
  name: string;
  role: string;
  quote: string;
  rating: number;
  location: string;
};

export const TESTIMONIALS: ReadonlyArray<Testimonial> = [
  {
    name: "Anika Mehta",
    role: "Head of Supply Chain, Lumin Pharma",
    quote:
      "Their cool-chain pharma desk runs like a Swiss watch. We've moved 240 cool-chain consignments without a single excursion.",
    rating: 5,
    location: "Mumbai",
  },
  {
    name: "Joel Carvalho",
    role: "Procurement Director, Helix Energy",
    quote:
      "Out-of-gauge wind turbine blades from Mundra to Mombasa. Permits, escorts, route surveys — handled end to end. Flyhigh treats every kilo like first class.",
    rating: 5,
    location: "Bengaluru",
  },
  {
    name: "Ritu Saxena",
    role: "VP Logistics, Aurelle Couture",
    quote:
      "Most freight forwarders quote and forget. Flyhigh sends a daily film reel of our shipment with photographs. Refined is the only word.",
    rating: 5,
    location: "New Delhi",
  },
];
