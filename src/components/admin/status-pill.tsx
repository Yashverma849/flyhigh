import type { ShipmentStatus } from "@/lib/constants";

const variantClass: Record<ShipmentStatus, string> = {
  Booked: "chip chip-brass",
  "In Transit": "chip chip-cargo",
  Customs: "chip chip-bone",
  Delivered: "chip chip-sage",
  Exception: "chip chip-rust",
};

const dotColor: Record<ShipmentStatus, string> = {
  Booked: "var(--brass)",
  "In Transit": "var(--cargo)",
  Customs: "var(--bone)",
  Delivered: "var(--sage)",
  Exception: "var(--rust)",
};

export function StatusPill({ status }: { status: ShipmentStatus }) {
  return (
    <span className={variantClass[status]}>
      <span className="h-1.5 w-1.5 rounded-full" style={{ background: dotColor[status] }} />
      {status}
    </span>
  );
}
