type Props = {
  className?: string;
  wheelRotation?: number;
};

export function TruckSvg({ className, wheelRotation = 0 }: Props) {
  return (
    <svg
      viewBox="0 0 50 100"
      className={className}
      fill="none"
      stroke="var(--cargo)"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {/* Background shading/glow for wheels */}
      <rect x="7" y="16" width="6" height="32" rx="1" fill="var(--ink-3)" stroke="none" opacity="0.3" />
      <rect x="37" y="16" width="6" height="32" rx="1" fill="var(--ink-3)" stroke="none" opacity="0.3" />

      {/* Rear wheels (Left) */}
      <rect x="7" y="20" width="5" height="10" rx="1" fill="var(--ink-2)" />
      <rect x="7" y="34" width="5" height="10" rx="1" fill="var(--ink-2)" />

      {/* Rear wheels (Right) */}
      <rect x="38" y="20" width="5" height="10" rx="1" fill="var(--ink-2)" />
      <rect x="38" y="34" width="5" height="10" rx="1" fill="var(--ink-2)" />

      {/* Front wheels */}
      <rect x="7" y="70" width="5" height="10" rx="1" fill="var(--ink-2)" />
      <rect x="38" y="70" width="5" height="10" rx="1" fill="var(--ink-2)" />

      {/* Side Mirrors */}
      <path d="M 12,72 L 6,72 L 6,75 L 12,75" />
      <path d="M 38,72 L 44,72 L 44,75 L 38,75" />

      {/* Chassis connector (under container/cab) */}
      <rect x="21" y="58" width="8" height="10" fill="var(--ink-3)" opacity="0.5" />

      {/* Main Cargo Container */}
      <rect x="12" y="10" width="26" height="50" rx="2" fill="var(--ink-2)" />
      
      {/* Container roof ridges (detailed look) */}
      <line x1="16" y1="12" x2="16" y2="58" opacity="0.3" />
      <line x1="20" y1="12" x2="20" y2="58" opacity="0.3" />
      <line x1="25" y1="10" x2="25" y2="60" strokeWidth="1" /> {/* Door division line */}
      <line x1="30" y1="12" x2="30" y2="58" opacity="0.3" />
      <line x1="34" y1="12" x2="34" y2="58" opacity="0.3" />

      {/* Container back door locking bars (Top view back bars) */}
      <path d="M 19,10 L 19,13 M 31,10 L 31,13" strokeWidth="1.5" />
      <path d="M 22,10 L 22,13 M 28,10 L 28,13" strokeWidth="1.5" />

      {/* Cab (Cabin) */}
      <path
        d="M 12,60 L 12,78 C 12,82 15,85 19,85 L 31,85 C 35,85 38,82 38,78 L 38,60 Z"
        fill="var(--ink-2)"
      />
      
      {/* Cab Windshield */}
      <path
        d="M 15,74 C 15,74 20,77 25,77 C 30,77 35,74 35,74"
        strokeWidth="1.5"
      />
      
      {/* Hood grill */}
      <line x1="20" y1="81" x2="30" y2="81" opacity="0.6" />
      <line x1="22" y1="83" x2="28" y2="83" opacity="0.6" />

      {/* Sunroof/Cab Details */}
      <rect x="18" y="63" width="14" height="7" rx="1" opacity="0.3" />
    </svg>
  );
}
