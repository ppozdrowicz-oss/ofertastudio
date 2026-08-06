import type { ComponentPropsWithoutRef } from "react";

import { cn } from "@/lib/cn";

const spacingClassNames = {
  compact: "py-12 sm:py-16",
  default: "py-16 sm:py-20 lg:py-24",
} as const;

type SectionProps = ComponentPropsWithoutRef<"section"> & {
  spacing?: keyof typeof spacingClassNames;
};

export function Section({
  className,
  spacing = "default",
  ...props
}: SectionProps) {
  return (
    <section className={cn(spacingClassNames[spacing], className)} {...props} />
  );
}
