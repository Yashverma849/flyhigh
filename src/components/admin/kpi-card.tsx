import type { LucideIcon } from "lucide-react";
import { TrendingUp, TrendingDown } from "lucide-react";

type Props = {
  label: string;
  value: string;
  delta?: string;
  deltaPositive?: boolean;
  icon?: LucideIcon;
  accent?: string;
};

export function KPICard({ label, value, delta, deltaPositive = true, icon: Icon, accent }: Props) {
  return (
    <div
      className="relative overflow-hidden rounded-md border p-6"
      style={{ borderColor: "var(--line)", background: "var(--ink-2)" }}
    >
      <div className="mb-6 flex items-start justify-between">
        <div className="caption" style={{ color: "var(--ash)" }}>
          {label}
        </div>
        {Icon && (
          <div
            className="flex h-8 w-8 items-center justify-center rounded"
            style={{ background: accent ?? "var(--ink-3)", color: "var(--bone)" }}
          >
            <Icon size={14} />
          </div>
        )}
      </div>
      <div className="f-display tabular text-4xl">{value}</div>
      {delta && (
        <div
          className="mt-3 flex items-center gap-1.5 text-xs"
          style={{ color: deltaPositive ? "var(--sage)" : "var(--rust)" }}
        >
          {deltaPositive ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
          <span>{delta}</span>
          <span style={{ color: "var(--ash)" }}>vs. last month</span>
        </div>
      )}
    </div>
  );
}
