import { Check } from "lucide-react";
import { DocumentsSectionVisual } from "@/components/marketing/documents-section-visual";

export function DocumentsSplitSection({
  title,
  docs,
  imageSrc,
}: {
  title: string;
  docs: { name: string; desc: string }[];
  imageSrc: string;
}) {
  return (
    <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
      <DocumentsSectionVisual imageSrc={imageSrc} />

      <div className="text-left">
        <h2 className="f-display text-3xl tracking-tight md:text-4xl">{title}</h2>
        <ul className="mt-8 space-y-6">
          {docs.map((d) => (
            <li key={d.name} className="flex gap-4">
              <div
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full"
                style={{ background: "var(--cargo-tint-10)" }}
              >
                <Check size={14} style={{ color: "var(--cargo)" }} />
              </div>
              <div>
                <div className="font-semibold">{d.name}</div>
                <div className="mt-1 text-sm leading-relaxed" style={{ color: "var(--ash)" }}>
                  {d.desc}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
