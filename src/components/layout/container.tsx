import type { ComponentPropsWithoutRef } from "react";

import { cn } from "@/lib/cn";

const widthClassNames = {
  content: "max-w-[var(--container-content)]",
  default: "max-w-[var(--container-page)]",
  wide: "max-w-[var(--container-wide)]",
} as const;

type ContainerProps = ComponentPropsWithoutRef<"div"> & {
  size?: keyof typeof widthClassNames;
};

export function Container({
  className,
  size = "default",
  ...props
}: ContainerProps) {
  return (
    <div
      className={cn(
        "mx-auto w-full px-5 sm:px-6 lg:px-8",
        widthClassNames[size],
        className,
      )}
      {...props}
    />
  );
}
