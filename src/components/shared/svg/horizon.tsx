import type { CSSProperties } from "react";

// Cinematic maritime horizon SVG used in the hero. Star positions are
// deterministic (seeded) so server and client render identically.
const STAR_COUNT = 60;
const STARS = Array.from({ length: STAR_COUNT }, (_, i) => {
  const seed = (i + 1) * 9301;
  const a = (seed % 1440) / 1;
  const b = ((seed * 49297) % 380) / 1;
  const r = ((seed % 80) / 100) * 0.8 + 0.3;
  const o = ((seed % 60) / 100) * 0.6 + 0.2;
  // Deterministic per-star phase offsets (SSR-safe — no Math.random)
  const dur = 4 + ((seed * 7) % 50) / 10;
  const delay = -((seed * 13) % 90) / 10;
  return { cx: a, cy: b, r, opacity: o, dur, delay };
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

      {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => {
        const baseOpacity = 0.4 - i * 0.04;
        return (
          <ellipse
            key={i}
            cx="950"
            cy={460 + i * 18}
            rx={120 - i * 8}
            ry={3 - i * 0.2}
            fill="var(--cargo)"
            opacity={baseOpacity}
            className="hz-ripple"
            style={
              {
                "--row-o": baseOpacity,
                animationDelay: `${i * 0.45}s`,
              } as CSSProperties
            }
          />
        );
      })}
      {/* Sun-glint sparkles — hardcoded bone color so they read as bright in both themes */}
      <ellipse
        cx="938"
        cy="468"
        rx="6"
        ry="0.8"
        fill="#efe7d6"
        opacity="0"
        className="hz-glint"
        style={{ animationDelay: "0s" }}
      />
      <ellipse
        cx="966"
        cy="486"
        rx="4"
        ry="0.6"
        fill="#efe7d6"
        opacity="0"
        className="hz-glint"
        style={{ animationDelay: "1.8s" }}
      />
      <ellipse
        cx="945"
        cy="510"
        rx="3"
        ry="0.5"
        fill="#efe7d6"
        opacity="0"
        className="hz-glint"
        style={{ animationDelay: "3.2s" }}
      />

      {/* Container ship */}
      <g transform="translate(620, 410)">
        <g className="hz-ship-bob">
          {/* Mirrored hull reflection in water (faint) */}
          <g transform="translate(0, 68) scale(1, -1)" opacity="0.18">
            <rect x="0" y="0" width="280" height="34" fill="var(--ink)" />
            <rect x="240" y="-10" width="40" height="44" fill="var(--ink)" />
          </g>
          <rect x="0" y="0" width="280" height="34" fill="var(--ink)" />
          <rect x="240" y="-10" width="40" height="44" fill="var(--ink)" />
          <rect x="265" y="-22" width="10" height="14" fill="var(--ink)" />
          {Array.from({ length: 11 }, (_, i) => i).map((i) => (
            <g key={i} transform={`translate(${5 + i * 22}, -16)`}>
              <rect width="20" height="16" fill="var(--ink)" stroke="var(--ink-3)" strokeWidth="0.5" />
            </g>
          ))}
          <line x1="0" y1="2" x2="280" y2="2" stroke="var(--brass)" strokeWidth="0.5" opacity="0.4" />
          {/* Lit portholes (warm cargo glow with subtle flicker) */}
          <rect className="hz-porthole" x="244" y="-4" width="2.5" height="2.5" fill="var(--cargo)" />
          <rect className="hz-porthole" x="250" y="-4" width="2.5" height="2.5" fill="var(--cargo)" style={{ animationDelay: "-2s" }} />
          <rect className="hz-porthole" x="256" y="-4" width="2.5" height="2.5" fill="var(--cargo)" style={{ animationDelay: "-4s" }} />
          <rect className="hz-porthole" x="244" y="2" width="2.5" height="2.5" fill="var(--cargo)" style={{ animationDelay: "-1s" }} />
          <rect className="hz-porthole" x="250" y="2" width="2.5" height="2.5" fill="var(--cargo)" style={{ animationDelay: "-3s" }} />
          <rect className="hz-porthole" x="256" y="2" width="2.5" height="2.5" fill="var(--cargo)" style={{ animationDelay: "-5s" }} />
          {/* Bow wave / foam */}
          <path
            d="M -6 30 Q 6 26 18 30 Q 30 34 42 30"
            stroke="var(--bone)"
            strokeOpacity="0.35"
            strokeWidth="0.7"
            fill="none"
          />
          <path
            d="M -2 34 Q 8 31 18 34"
            stroke="var(--bone)"
            strokeOpacity="0.2"
            strokeWidth="0.5"
            fill="none"
          />
          {/* Funnel steam — hardcoded bone so it reads as light vapor in both themes */}
          <ellipse className="hz-steam" cx="270" cy="-22" rx="3" ry="2" fill="#efe7d6" opacity="0" />
          <ellipse
            className="hz-steam"
            cx="270"
            cy="-22"
            rx="2.5"
            ry="1.5"
            fill="#efe7d6"
            opacity="0"
            style={{ animationDelay: "-2.5s" }}
          />
        </g>
      </g>

      {/* Distant ship */}
      <g transform="translate(180, 442)" opacity="0.5">
        <g className="hz-ship-distant">
          <rect x="0" y="0" width="80" height="10" fill="var(--ink)" />
          <rect x="65" y="-4" width="14" height="14" fill="var(--ink)" />
        </g>
      </g>

      {/* Cargo plane — slow right-to-left transit (~75s cycle, ~63s on-screen).
          Outer <g> positions the start; inner <g> receives the CSS translateX
          keyframe with scaleX(-1) to mirror the silhouette so it faces left
          (transform-box: fill-box keeps the local origin sane). */}
      <g transform="translate(0, 120)" opacity="0.55">
        <g className="hz-plane">
          {/* Trailing contrail */}
          <line
            className="hz-contrail"
            x1="-2"
            y1="6"
            x2="-160"
            y2="2"
            stroke="var(--brass)"
            strokeWidth="0.6"
            strokeOpacity="0.55"
            strokeDasharray="3 5"
            strokeLinecap="round"
          />
          {/* Wide-body cargo silhouette (~120px) */}
          <g fill="var(--brass)">
            <path d="M 0 6 Q 4 3 14 3 L 96 3 Q 110 3 118 6 Q 110 9 96 9 L 14 9 Q 4 9 0 6 Z" />
            <path d="M 96 3 L 110 -4 L 114 3 Z" />
            <path d="M 50 5 L 86 -8 L 92 -8 L 60 7 Z" />
            <path d="M 50 7 L 86 20 L 92 20 L 60 9 Z" />
            <ellipse cx="74" cy="11" rx="3.5" ry="1.6" />
            <ellipse cx="78" cy="14" rx="3" ry="1.4" />
          </g>
        </g>
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

      {/* Stars (deterministic seeded positions for SSR) — drift slowly as a
          field, each star twinkles on its own seeded period. */}
      <g className="hz-starfield">
        {STARS.map((s, i) => (
          <circle
            key={i}
            cx={s.cx}
            cy={s.cy}
            r={s.r}
            fill="var(--bone)"
            opacity={s.opacity}
            className="hz-star"
            style={
              {
                "--star-o": s.opacity,
                animationDuration: `${s.dur}s`,
                animationDelay: `${s.delay}s`,
              } as CSSProperties
            }
          />
        ))}
      </g>
    </svg>
  );
}
