type Props = {
  className?: string;
  wheelRotation?: number;
};

export function TruckSvg({ className, wheelRotation = 0 }: Props) {
  return (
    <svg
      viewBox="0 0 80 40"
      className={className}
      fill="none"
      stroke="var(--cargo)"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {/* Cargo container */}
      <path d="M 4,10 L 50,10 L 50,24 L 4,24 Z" />
      <path d="M 4,14 L 50,14" opacity="0.35" />
      <path d="M 4,18 L 50,18" opacity="0.35" />
      <path d="M 4,22 L 50,22" opacity="0.35" />
      <path d="M 12,13 L 22,13 L 22,21 L 12,21 Z" strokeWidth="1" />

      {/* Cab */}
      <path d="M 50,13 L 62,13 C 65,13 67,15 68,17 L 71,20 L 71,24 L 50,24 Z" />
      <path d="M 50,13 L 62,13 L 66,17 L 66,20 L 50,20 Z" fill="var(--ink-2)" opacity="0.3" />
      <path d="M 53,16 L 60,16 L 64,20 L 53,20 Z" />
      <circle cx="69" cy="21" r="0.8" fill="var(--cargo)" />
      <path d="M 68,24 L 72,24 L 72,26 L 67,26" />

      {/* Wheel wells */}
      <path d="M 9,24 A 5.5,5.5 0 0 1 19,24" />
      <path d="M 22,24 A 5.5,5.5 0 0 1 32,24" />
      <path d="M 57,24 A 5.5,5.5 0 0 1 67,24" />
      <path d="M 4,24 L 9,24 M 19,24 L 22,24 M 32,24 L 57,24 M 67,24 L 68,24" />

      {/* Wheels */}
      <g transform={`translate(14, 26) rotate(${wheelRotation})`}>
        <circle cx="0" cy="0" r="4" />
        <path d="M -4,0 L 4,0 M 0,-4 L 0,4" strokeWidth="0.8" opacity="0.7" />
      </g>
      <g transform={`translate(27, 26) rotate(${wheelRotation})`}>
        <circle cx="0" cy="0" r="4" />
        <path d="M -4,0 L 4,0 M 0,-4 L 0,4" strokeWidth="0.8" opacity="0.7" />
      </g>
      <g transform={`translate(62, 26) rotate(${wheelRotation})`}>
        <circle cx="0" cy="0" r="4" />
        <path d="M -4,0 L 4,0 M 0,-4 L 0,4" strokeWidth="0.8" opacity="0.7" />
      </g>
    </svg>
  );
}
