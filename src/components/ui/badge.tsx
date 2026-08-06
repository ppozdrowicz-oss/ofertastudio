import type { ComponentPropsWithoutRef } from "react";

import { cn } from "@/lib/cn";

const variantClassNames = {
  accent: "border-accent-border bg-accent-surface text-accent-foreground",
  information: "border-info-border bg-info-surface text-info-foreground",
  neutral: "border-border bg-surface-muted text-muted-foreground",
  primary: "border-primary-border bg-primary-surface text-secondary-foreground",
  success: "border-success-border bg-success-surface text-success-foreground",
  warning: "border-warning-border bg-warning-surface text-warning-foreground",
} as const;

export type BadgeProps = ComponentPropsWithoutRef<"span"> & {
  variant?: keyof typeof variantClassNames;
};

export function Badge({
  className,
  variant = "neutral",
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex min-h-6 items-center gap-1.5 rounded-[var(--radius-round)] border px-2.5 py-1 text-caption font-semibold whitespace-nowrap",
        variantClassNames[variant],
        className,
      )}
      {...props}
    />
  );
}
