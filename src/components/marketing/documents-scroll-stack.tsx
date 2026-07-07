"use client";

import ScrollStack, { ScrollStackItem } from "@/components/animations/scroll-stack/ScrollStack";
import { DocumentsSplitSection } from "@/components/marketing/documents-split-section";

export type DocumentsScrollSection = {
  title: string;
  image: string;
  docs: { name: string; desc: string }[];
};

type DocumentsScrollStackProps = {
  sections: DocumentsScrollSection[];
};

export function DocumentsScrollStack({ sections }: DocumentsScrollStackProps) {
  return (
    <ScrollStack
      useWindowScroll
      itemDistance={0}
      itemStackDistance={0}
      stackPosition="0%"
      scaleEndPosition="0%"
      baseScale={1}
      itemScale={0}
    >
      {sections.map((section, index) => (
        <ScrollStackItem key={section.title} itemClassName="scroll-stack-card--section">
          <div
            className="min-h-dvh py-16"
            style={{ background: index % 2 === 0 ? "var(--ink-2)" : "var(--ink)" }}
          >
            <div className="site-gutter">
              <DocumentsSplitSection
                title={section.title}
                docs={section.docs}
                imageSrc={section.image}
              />
            </div>
          </div>
        </ScrollStackItem>
      ))}
    </ScrollStack>
  );
}
