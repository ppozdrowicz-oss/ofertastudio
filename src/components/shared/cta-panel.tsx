import type { ReactNode } from "react";

import { cn } from "@/lib/cn";

const variantClassNames = {
  default: {
    container: "border-primary-border bg-primary-surface text-foreground",
    description: "text-muted-foreground",
    eyebrow: "text-primary",
  },
  strong: {
    container:
      "border-surface-inverse-border bg-surface-inverse text-surface-inverse-foreground",
    description: "text-surface-inverse-muted-foreground",
    eyebrow: "text-accent",
  },
} as const;

export type CtaPanelProps = {
  className?: string;
  description: string;
  eyebrow?: string;
  primaryAction: ReactNode;
  secondaryAction?: ReactNode;
  title: string;
  variant?: keyof typeof variantClassNames;
};

export function CtaPanel({
  className,
  description,
  eyebrow,
  primaryAction,
  secondaryAction,
  title,
  variant = "default",
}: CtaPanelProps) {
  const classes = variantClassNames[variant];

  return (
    <aside
      className={cn(
        "grid gap-8 rounded-[var(--radius-panel)] border p-[var(--space-card-padding)] md:grid-cols-[minmax(0,1fr)_auto] md:items-end lg:gap-12",
        classes.container,
        className,
      )}
    >
      <div className="max-w-[var(--measure-copy)]">
        {eyebrow && (
          <p
            className={cn("text-overline font-bold uppercase", classes.eyebrow)}
          >
            {eyebrow}
          </p>
        )}
        <h2
          className={cn(
            "text-h3 font-semibold text-balance",
            eyebrow && "mt-4",
          )}
        >
          {title}
        </h2>
        <p className={cn("mt-4 text-body-lg", classes.description)}>
          {description}
        </p>
      </div>
      <div className="flex flex-col gap-3 sm:flex-row md:flex-col lg:flex-row">
        {primaryAction}
        {secondaryAction}
      </div>
    </aside>
  );
}
