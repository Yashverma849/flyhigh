type Props = { size?: number; className?: string };

export function Logo({ size = 32, className }: Props) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <circle cx="32" cy="32" r="30" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M14 44 L32 14 L50 44"
        stroke="currentColor"
        strokeWidth="2"
        fill="none"
        strokeLinejoin="round"
      />
      <path d="M22 36 L42 36" stroke="var(--cargo)" strokeWidth="2" />
      <circle cx="32" cy="14" r="2.5" fill="var(--cargo)" />
    </svg>
  );
}
