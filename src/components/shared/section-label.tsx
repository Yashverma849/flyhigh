type Props = {
  children: React.ReactNode;
  num?: string;
  onDark?: boolean;
};

export function SectionLabel({ children, num, onDark }: Props) {
  return (
    <div
      className="caption flex items-center gap-3"
      style={onDark ? { color: "rgba(255,255,255,0.8)" } : undefined}
    >
      {num && (
        <span className="f-mono text-[10px]" style={{ color: "var(--cargo)" }}>
          {num}
        </span>
      )}
      <span>{children}</span>
      <span className="h-px w-12" style={{ background: "var(--brass)" }} />
    </div>
  );
}
