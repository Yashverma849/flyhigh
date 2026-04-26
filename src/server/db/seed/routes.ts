export type Route = {
  from: string;
  to: string;
  mode: "Sea" | "Air" | "Road";
  days: number;
  rate: number;
};

export const ROUTES = [
  { from: "Mumbai (BOM)", to: "Rotterdam (RTM)", mode: "Sea", days: 21, rate: 142000 },
  { from: "Mumbai (BOM)", to: "Dubai (DXB)", mode: "Air", days: 2, rate: 38500 },
  { from: "Chennai (MAA)", to: "Mombasa (MBA)", mode: "Sea", days: 14, rate: 98000 },
  { from: "Delhi (DEL)", to: "Frankfurt (FRA)", mode: "Air", days: 3, rate: 52000 },
  { from: "Mundra (IXY)", to: "Lagos (LOS)", mode: "Sea", days: 28, rate: 168000 },
  { from: "Kolkata (CCU)", to: "Singapore (SIN)", mode: "Sea", days: 9, rate: 78000 },
  { from: "Bangalore (BLR)", to: "London (LHR)", mode: "Air", days: 2, rate: 64500 },
  { from: "Hyderabad (HYD)", to: "Tokyo (NRT)", mode: "Air", days: 4, rate: 58200 },
] as const;
