export function RouteMap({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 800 400" className={className ?? "h-full w-full"} aria-hidden="true">
      <defs>
        <pattern id="rm-grid" width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M 20 0 L 0 0 0 20" fill="none" stroke="var(--line)" strokeWidth="0.5" />
        </pattern>
      </defs>
      <rect width="800" height="400" fill="url(#rm-grid)" />

      <path
        d="M120 180 Q160 140 220 160 T320 180 Q340 200 320 230 T240 250 Q180 240 140 220 Z"
        fill="var(--brass-tint-6)"
        stroke="var(--brass)"
        strokeWidth="0.6"
      />
      <path
        d="M420 120 Q500 100 580 130 Q640 160 620 220 Q580 260 480 240 Q420 200 420 160 Z"
        fill="var(--brass-tint-6)"
        stroke="var(--brass)"
        strokeWidth="0.6"
      />
      <path
        d="M520 280 Q580 270 620 290 Q650 310 620 340 Q570 350 520 330 Z"
        fill="var(--brass-tint-6)"
        stroke="var(--brass)"
        strokeWidth="0.6"
      />

      <path
        d="M250 220 Q380 100 520 180"
        stroke="var(--cargo)"
        strokeWidth="1.5"
        fill="none"
        strokeDasharray="4 6"
        style={{ animation: "lineDraw 3s ease-out both" }}
      />
      <path
        d="M250 220 Q400 350 580 310"
        stroke="var(--cargo)"
        strokeWidth="1.5"
        fill="none"
        strokeDasharray="4 6"
        style={{ animation: "lineDraw 3s 0.5s ease-out both" }}
      />
      <path
        d="M250 220 Q300 180 480 180"
        stroke="var(--brass)"
        strokeWidth="1.5"
        fill="none"
        strokeDasharray="4 6"
        style={{ animation: "lineDraw 3s 1s ease-out both" }}
      />

      <g>
        <circle cx="250" cy="220" r="4" fill="var(--cargo)" />
        <circle
          cx="250"
          cy="220"
          r="10"
          fill="none"
          stroke="var(--cargo)"
          strokeWidth="1"
          opacity="0.3"
        />
      </g>
      <circle cx="520" cy="180" r="3" fill="var(--brass)" />
      <circle cx="580" cy="310" r="3" fill="var(--brass)" />
      <circle cx="480" cy="180" r="3" fill="var(--brass)" />

      <text x="252" y="240" fontSize="9" fill="var(--bone)" className="f-mono">
        MUMBAI
      </text>
      <text x="525" y="175" fontSize="9" fill="var(--ash)" className="f-mono">
        FRANKFURT
      </text>
      <text x="585" y="305" fontSize="9" fill="var(--ash)" className="f-mono">
        MOMBASA
      </text>
      <text x="485" y="175" fontSize="9" fill="var(--ash)" className="f-mono">
        DUBAI
      </text>
    </svg>
  );
}
