import type { Quote } from "@/server/db/schema";

const LABEL: Record<Quote["status"], string> = {
  new: "New",
  contacted: "Contacted",
  quoted: "Quoted",
  won: "Won",
  lost: "Lost",
};

const COLOR: Record<Quote["status"], string> = {
  new: "var(--cargo)",
  contacted: "var(--brass)",
  quoted: "var(--sage)",
  won: "var(--sage)",
  lost: "var(--rust)",
};

export function QuoteStatusPill({ status }: { status: Quote["status"] }) {
  return (
    <span className="chip chip-bone">
      <span className="h-1.5 w-1.5 rounded-full" style={{ background: COLOR[status] }} />
      {LABEL[status]}
    </span>
  );
}
