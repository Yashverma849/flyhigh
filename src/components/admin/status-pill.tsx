import type { ShipmentStatus } from "@/lib/constants";

const styles: Record<ShipmentStatus, { color: string; bg: string; border: string }> = {
  Booked: {
    color: "var(--brass)",
    bg: "rgba(201, 168, 118, 0.06)",
    border: "rgba(201, 168, 118, 0.4)",
  },
  "In Transit": {
    color: "var(--cargo)",
    bg: "rgba(210, 105, 30, 0.06)",
    border: "rgba(210, 105, 30, 0.4)",
  },
  Customs: {
    color: "var(--bone)",
    bg: "rgba(239, 231, 214, 0.06)",
    border: "rgba(239, 231, 214, 0.2)",
  },
  Delivered: {
    color: "var(--sage)",
    bg: "rgba(111, 129, 112, 0.06)",
    border: "rgba(111, 129, 112, 0.4)",
  },
  Exception: {
    color: "var(--rust)",
    bg: "rgba(139, 58, 28, 0.1)",
    border: "rgba(139, 58, 28, 0.5)",
  },
};

export function StatusPill({ status }: { status: ShipmentStatus }) {
  const s = styles[status];
  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold tracking-wide uppercase"
      style={{ color: s.color, background: s.bg, border: `1px solid ${s.border}` }}
    >
      <span className="h-1.5 w-1.5 rounded-full" style={{ background: s.color }} />
      {status}
    </span>
  );
}
