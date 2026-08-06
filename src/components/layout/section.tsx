import type { HTMLAttributes } from "react";

import { cn } from "@/lib/cn";

const spacingClassNames = {
  compact: "py-[var(--space-section-sm)]",
  default: "py-[var(--space-section-md)]",
  spacious: "py-[var(--space-section-lg)]",
} as const;

const variantClassNames = {
  default: "bg-background text-foreground",
  muted: "bg-surface-muted text-foreground",
  strong: "bg-surface-inverse text-surface-inverse-foreground",
} as const;

type SectionElement = "aside" | "div" | "section";

export type SectionProps = HTMLAttributes<HTMLElement> & {
  as?: SectionElement;
  spacing?: keyof typeof spacingClassNames;
  variant?: keyof typeof variantClassNames;
};

export function Section({
  as: Component = "section",
  className,
  spacing = "default",
  variant = "default",
  ...props
}: SectionProps) {
  return (
    <Component
      className={cn(
        variantClassNames[variant],
        spacingClassNames[spacing],
        className,
      )}
      {...props}
    />
  );
}
