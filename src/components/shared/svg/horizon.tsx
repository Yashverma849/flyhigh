// Cinematic maritime horizon SVG used in the hero. Star positions are
// deterministic (seeded) so server and client render identically.
const STAR_COUNT = 60;
const STARS = Array.from({ length: STAR_COUNT }, (_, i) => {
  const seed = (i + 1) * 9301;
  const a = (seed % 1440) / 1;
  const b = ((seed * 49297) % 380) / 1;
  const r = ((seed % 80) / 100) * 0.8 + 0.3;
  const o = ((seed % 60) / 100) * 0.6 + 0.2;
  return { cx: a, cy: b, r, opacity: o };
});

export function Horizon({
  className,
  preserveAspectRatio = "xMidYMid slice",
}: {
  className?: string;
  preserveAspectRatio?: string;
}) {
  return (
    <svg
      viewBox="0 0 1440 720"
      className={className ?? "w-full h-full"}
      preserveAspectRatio={preserveAspectRatio}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="hz-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--ink)" />
          <stop offset="55%" stopColor="var(--ink-3)" />
          <stop offset="80%" stopColor="#3D2918" />
          <stop offset="100%" stopColor="var(--ink)" />
        </linearGradient>
        <linearGradient id="hz-sun" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--cargo)" stopOpacity="0.9" />
          <stop offset="100%" stopColor="var(--rust)" stopOpacity="0.6" />
        </linearGradient>
        <linearGradient id="hz-sea" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--ink-3)" />
          <stop offset="100%" stopColor="var(--ink)" />
        </linearGradient>
        <radialGradient id="hz-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="var(--cargo)" stopOpacity="0.5" />
          <stop offset="100%" stopColor="var(--cargo)" stopOpacity="0" />
        </radialGradient>
      </defs>

      <rect width="1440" height="720" fill="url(#hz-sky)" />
      <circle cx="950" cy="430" r="240" fill="url(#hz-glow)" />
      <circle cx="950" cy="430" r="58" fill="url(#hz-sun)" />
      <line
        x1="0"
        y1="450"
        x2="1440"
        y2="450"
        stroke="var(--brass)"
        strokeOpacity="0.45"
        strokeWidth="0.5"
      />
      <rect y="450" width="1440" height="270" fill="url(#hz-sea)" />

      {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
        <ellipse
          key={i}
          cx="950"
          cy={460 + i * 18}
          rx={120 - i * 8}
          ry={3 - i * 0.2}
          fill="var(--cargo)"
          opacity={0.4 - i * 0.04}
        />
      ))}

      {/* Container ship */}
      <g transform="translate(620, 410)">
        <rect x="0" y="0" width="280" height="34" fill="var(--ink)" />
        <rect x="240" y="-10" width="40" height="44" fill="var(--ink)" />
        <rect x="265" y="-22" width="10" height="14" fill="var(--ink)" />
        {Array.from({ length: 11 }, (_, i) => i).map((i) => (
          <g key={i} transform={`translate(${5 + i * 22}, -16)`}>
            <rect width="20" height="16" fill="var(--ink)" stroke="var(--ink-3)" strokeWidth="0.5" />
          </g>
        ))}
        <line x1="0" y1="2" x2="280" y2="2" stroke="var(--brass)" strokeWidth="0.5" opacity="0.4" />
      </g>

      {/* Distant ship */}
      <g transform="translate(180, 442)" opacity="0.5">
        <rect x="0" y="0" width="80" height="10" fill="var(--ink)" />
        <rect x="65" y="-4" width="14" height="14" fill="var(--ink)" />
      </g>

      {/* Plane */}
      <g transform="translate(220, 180)" opacity="0.7">
        <path d="M0 0 L60 6 L72 4 L80 8 L72 10 L60 8 L0 14 Z" fill="var(--brass)" />
        <line
          x1="0"
          y1="7"
          x2="-30"
          y2="2"
          stroke="var(--brass)"
          strokeWidth="0.5"
          opacity="0.5"
          strokeDasharray="2 3"
        />
      </g>

      {/* Stars (deterministic seeded positions for SSR) */}
      {STARS.map((s, i) => (
        <circle key={i} cx={s.cx} cy={s.cy} r={s.r} fill="var(--bone)" opacity={s.opacity} />
      ))}
    </svg>
  );
}
