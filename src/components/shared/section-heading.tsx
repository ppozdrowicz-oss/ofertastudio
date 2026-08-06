import type { ReactNode } from "react";

import { cn } from "@/lib/cn";

type HeadingLevel = 1 | 2 | 3;
type HeadingSize = "h1" | "h2" | "h3" | "hero";

const headingTags = {
  1: "h1",
  2: "h2",
  3: "h3",
} as const;

const sizeClassNames = {
  h1: "text-h1",
  h2: "text-h2",
  h3: "text-h3",
  hero: "text-hero",
} as const;

const widthClassNames = {
  narrow: "max-w-[var(--measure-narrow)]",
  standard: "max-w-[var(--measure-copy)]",
  wide: "max-w-[var(--measure-wide)]",
} as const;

const toneClassNames = {
  default: {
    description: "text-muted-foreground",
    eyebrow: "text-primary",
    highlight: "text-primary",
    title: "text-foreground",
  },
  inverse: {
    description: "text-surface-inverse-muted-foreground",
    eyebrow: "text-accent",
    highlight: "text-accent",
    title: "text-surface-inverse-foreground",
  },
} as const;

export type SectionHeadingProps = {
  action?: ReactNode;
  align?: "center" | "left";
  className?: string;
  description?: string;
  eyebrow?: string;
  highlight?: string;
  level?: HeadingLevel;
  size?: HeadingSize;
  title: string;
  titleId?: string;
  tone?: keyof typeof toneClassNames;
  width?: keyof typeof widthClassNames;
};

function HighlightedTitle({
  className,
  highlight,
  title,
}: {
  className: string;
  highlight?: string;
  title: string;
}) {
  if (!highlight) {
    return title;
  }

  const highlightIndex = title.indexOf(highlight);

  if (highlightIndex === -1) {
    return title;
  }

  const before = title.slice(0, highlightIndex);
  const after = title.slice(highlightIndex + highlight.length);

  return (
    <>
      {before}
      <span className={className}>{highlight}</span>
      {after}
    </>
  );
}

export function SectionHeading({
  action,
  align = "left",
  className,
  description,
  eyebrow,
  highlight,
  level = 2,
  size = "h2",
  title,
  titleId,
  tone = "default",
  width = "standard",
}: SectionHeadingProps) {
  const Heading = headingTags[level];
  const toneClasses = toneClassNames[tone];

  return (
    <div
      className={cn(
        "grid gap-6",
        align === "center"
          ? "justify-items-center text-center"
          : Boolean(action) && "md:grid-cols-[minmax(0,1fr)_auto] md:items-end",
        className,
      )}
    >
      <div
        className={cn(
          "min-w-0",
          widthClassNames[width],
          align === "center" && "mx-auto",
        )}
      >
        {eyebrow && (
          <p
            className={cn(
              "text-overline font-bold uppercase",
              toneClasses.eyebrow,
            )}
          >
            {eyebrow}
          </p>
        )}
        <Heading
          className={cn(
            "font-semibold text-balance",
            sizeClassNames[size],
            toneClasses.title,
            eyebrow && "mt-4",
          )}
          id={titleId}
        >
          <HighlightedTitle
            className={toneClasses.highlight}
            highlight={highlight}
            title={title}
          />
        </Heading>
        {description && (
          <p
            className={cn(
              "mt-5 text-lead text-pretty",
              toneClasses.description,
            )}
          >
            {description}
          </p>
        )}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}
