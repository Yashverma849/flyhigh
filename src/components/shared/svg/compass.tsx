type Props = { size?: number; className?: string };

export function CompassSvg({ size = 60, className }: Props) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className={`compass-spin ${className ?? ""}`}
      aria-hidden="true"
    >
      <circle cx="50" cy="50" r="45" stroke="var(--brass)" strokeWidth="0.6" fill="none" />
      <circle
        cx="50"
        cy="50"
        r="38"
        stroke="var(--brass)"
        strokeWidth="0.4"
        fill="none"
        strokeDasharray="2 3"
      />
      <text x="50" y="14" textAnchor="middle" fontSize="6" fill="var(--brass)" className="f-mono">
        N
      </text>
      <text x="50" y="92" textAnchor="middle" fontSize="6" fill="var(--brass)" className="f-mono">
        S
      </text>
      <text x="90" y="53" textAnchor="middle" fontSize="6" fill="var(--brass)" className="f-mono">
        E
      </text>
      <text x="10" y="53" textAnchor="middle" fontSize="6" fill="var(--brass)" className="f-mono">
        W
      </text>
      <path d="M50 16 L46 50 L50 50 Z" fill="var(--cargo)" />
      <path d="M50 84 L54 50 L50 50 Z" fill="var(--brass)" />
      <circle cx="50" cy="50" r="2" fill="var(--bone)" />
    </svg>
  );
}
