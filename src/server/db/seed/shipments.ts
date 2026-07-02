import type { ShipmentMode, ShipmentStatus } from "@/lib/constants";

export type ShipmentSeed = {
  id: string;
  origin: string;
  destination: string;
  mode: ShipmentMode | "Sea" | "Air";
  status: ShipmentStatus;
  eta: string;
  valueInr: number;
  customer: string;
};

export const SHIPMENTS_SEED: ReadonlyArray<ShipmentSeed> = [
  {
    id: "FH-2403-001892",
    origin: "Mumbai",
    destination: "Rotterdam",
    mode: "Sea",
    status: "In Transit",
    eta: "Apr 18",
    valueInr: 1420000,
    customer: "Lumin Pharma",
  },
  {
    id: "FH-2403-001891",
    origin: "Delhi",
    destination: "Frankfurt",
    mode: "Air",
    status: "Delivered",
    eta: "Mar 02",
    valueInr: 520000,
    customer: "Aurelle Couture",
  },
  {
    id: "FH-2403-001890",
    origin: "Chennai",
    destination: "Mombasa",
    mode: "Sea",
    status: "Customs",
    eta: "Apr 12",
    valueInr: 980000,
    customer: "Helix Energy",
  },
  {
    id: "FH-2403-001889",
    origin: "Bangalore",
    destination: "London",
    mode: "Air",
    status: "Booked",
    eta: "Apr 24",
    valueInr: 645000,
    customer: "Saraf Diamonds",
  },
  {
    id: "FH-2403-001888",
    origin: "Mundra",
    destination: "Lagos",
    mode: "Sea",
    status: "In Transit",
    eta: "May 02",
    valueInr: 1680000,
    customer: "Godrej Locks",
  },
  {
    id: "FH-2403-001887",
    origin: "Kolkata",
    destination: "Singapore",
    mode: "Sea",
    status: "Delivered",
    eta: "Feb 28",
    valueInr: 780000,
    customer: "ITC Hotels",
  },
  {
    id: "FH-2403-001886",
    origin: "Hyderabad",
    destination: "Tokyo",
    mode: "Air",
    status: "In Transit",
    eta: "Apr 10",
    valueInr: 582000,
    customer: "Cyient Aerospace",
  },
  {
    id: "FH-2403-001885",
    origin: "Mumbai",
    destination: "Dubai",
    mode: "Air",
    status: "Delivered",
    eta: "Mar 22",
    valueInr: 385000,
    customer: "Tanishq",
  },
];
