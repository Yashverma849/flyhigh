type Props = {
  children: React.ReactNode;
  num?: string;
};

export function SectionLabel({ children, num }: Props) {
  return (
    <div className="caption flex items-center gap-3">
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
