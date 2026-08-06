import type { LucideIcon } from "lucide-react";
import type { ComponentPropsWithoutRef } from "react";

import { cn } from "@/lib/cn";

const variantClassNames = {
  accent: "border-accent-border bg-accent-surface text-accent-foreground",
  neutral: "border-border bg-surface-muted text-foreground",
  outline: "border-border-control bg-transparent text-foreground",
  primary: "border-primary-border bg-primary-surface text-primary",
} as const;

const sizeClassNames = {
  large: "size-14 [&_svg]:size-6",
  medium: "size-11 [&_svg]:size-5",
  small: "size-9 [&_svg]:size-4",
} as const;

export type IconBoxProps = Omit<
  ComponentPropsWithoutRef<"span">,
  "children"
> & {
  accessibleLabel?: string;
  icon: LucideIcon;
  size?: keyof typeof sizeClassNames;
  variant?: keyof typeof variantClassNames;
};

export function IconBox({
  accessibleLabel,
  className,
  icon: Icon,
  size = "medium",
  variant = "neutral",
  ...props
}: IconBoxProps) {
  return (
    <span
      aria-label={accessibleLabel}
      aria-hidden={accessibleLabel ? undefined : true}
      className={cn(
        "inline-flex shrink-0 items-center justify-center rounded-[var(--radius-control)] border",
        variantClassNames[variant],
        sizeClassNames[size],
        className,
      )}
      role={accessibleLabel ? "img" : undefined}
      {...props}
    >
      <Icon aria-hidden="true" strokeWidth={1.8} />
    </span>
  );
}
