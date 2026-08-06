import type { ComponentPropsWithoutRef } from "react";

import { cn } from "@/lib/cn";

const variantClassNames = {
  bordered: "border-border-strong bg-transparent",
  highlighted: "border-primary-border bg-primary-surface",
  interactive:
    "border-border bg-surface hover:border-primary-border hover:shadow-raised focus-within:border-primary focus-within:shadow-raised motion-safe:hover:-translate-y-0.5",
  muted: "border-transparent bg-surface-muted",
  standard: "border-border bg-surface",
} as const;

export type CardProps = ComponentPropsWithoutRef<"div"> & {
  variant?: keyof typeof variantClassNames;
};

export function Card({ className, variant = "standard", ...props }: CardProps) {
  return (
    <div
      className={cn(
        "transition-interactive overflow-hidden rounded-[var(--radius-card)] border",
        variantClassNames[variant],
        className,
      )}
      {...props}
    />
  );
}

export function CardHeader({
  className,
  ...props
}: ComponentPropsWithoutRef<"div">) {
  return (
    <div
      className={cn("p-[var(--space-card-padding)] pb-0", className)}
      {...props}
    />
  );
}

type CardTitleElement = "h2" | "h3" | "h4";

export type CardTitleProps = ComponentPropsWithoutRef<"h3"> & {
  as?: CardTitleElement;
};

export function CardTitle({
  as: Component = "h3",
  className,
  ...props
}: CardTitleProps) {
  return (
    <Component
      className={cn(
        "text-h4 font-semibold tracking-[-0.018em] text-balance",
        className,
      )}
      {...props}
    />
  );
}

export function CardDescription({
  className,
  ...props
}: ComponentPropsWithoutRef<"p">) {
  return (
    <p
      className={cn("mt-2 text-body-sm text-muted-foreground", className)}
      {...props}
    />
  );
}

export function CardContent({
  className,
  ...props
}: ComponentPropsWithoutRef<"div">) {
  return (
    <div
      className={cn("p-[var(--space-card-padding)] pt-5", className)}
      {...props}
    />
  );
}

export function CardFooter({
  className,
  ...props
}: ComponentPropsWithoutRef<"div">) {
  return (
    <div
      className={cn(
        "flex items-center gap-3 p-[var(--space-card-padding)] pt-0",
        className,
      )}
      {...props}
    />
  );
}
