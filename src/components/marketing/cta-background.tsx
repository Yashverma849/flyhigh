import type { CSSProperties } from "react";

type Props = {
  alt?: string;
  className?: string;
  imageStyle?: CSSProperties;
};

/** Below-fold decorative CTA background — lazy-loaded to avoid preload warnings. */
export function CtaBackground({
  alt = "",
  className = "h-full w-full object-cover",
  imageStyle,
}: Props) {
  return (
    <img
      src="/cta-bg.png"
      alt={alt}
      className={className}
      style={imageStyle}
      loading="lazy"
      fetchPriority="low"
      decoding="async"
    />
  );
}
