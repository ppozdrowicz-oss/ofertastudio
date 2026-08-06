import { ArrowRight } from "lucide-react";
import Link from "next/link";
import type { ComponentPropsWithoutRef } from "react";

import { cn } from "@/lib/cn";

const variantClassNames = {
  arrow:
    "font-semibold text-foreground no-underline hover:text-primary [&_svg]:transition-transform [&_svg]:duration-[var(--duration-fast)] [&_svg]:ease-[var(--ease-standard)] motion-safe:hover:[&_svg]:translate-x-0.5",
  muted:
    "text-muted-foreground underline decoration-border-strong underline-offset-4 hover:text-foreground hover:decoration-foreground",
  standalone:
    "font-semibold text-primary no-underline hover:text-primary-hover",
  standard:
    "text-primary underline decoration-primary/35 underline-offset-4 hover:text-primary-hover hover:decoration-primary-hover",
} as const;

export type TextLinkProps = ComponentPropsWithoutRef<typeof Link> & {
  variant?: keyof typeof variantClassNames;
};

export function TextLink({
  children,
  className,
  variant = "standard",
  ...props
}: TextLinkProps) {
  return (
    <Link
      className={cn(
        "transition-interactive inline-flex min-h-6 items-center gap-1.5 rounded-[var(--radius-small)]",
        variantClassNames[variant],
        className,
      )}
      {...props}
    >
      <span>{children}</span>
      {variant === "arrow" && (
        <ArrowRight aria-hidden="true" className="size-4 shrink-0" />
      )}
    </Link>
  );
}
