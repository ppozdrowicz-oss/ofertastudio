import Link from "next/link";
import type { ComponentPropsWithoutRef } from "react";

import { cn } from "@/lib/cn";

type LinkButtonProps = ComponentPropsWithoutRef<typeof Link>;

export function LinkButton({ className, ...props }: LinkButtonProps) {
  return (
    <Link
      className={cn(
        "inline-flex min-h-11 items-center justify-center gap-2 rounded-[var(--radius-control)] bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary",
        className,
      )}
      {...props}
    />
  );
}
