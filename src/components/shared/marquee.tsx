type Props = {
  children: React.ReactNode;
  speed?: number;
  reverse?: boolean;
};

export function Marquee({ children, speed = 40, reverse = false }: Props) {
  const animation = `marquee ${speed}s linear infinite ${reverse ? "reverse" : ""}`.trim();
  return (
    <div className="ticker overflow-hidden">
      <div className="flex" style={{ animation }}>
        <div className="flex shrink-0 gap-12 pr-12">{children}</div>
        <div aria-hidden="true" className="flex shrink-0 gap-12 pr-12">
          {children}
        </div>
      </div>
    </div>
  );
}
