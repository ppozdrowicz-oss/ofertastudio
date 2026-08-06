import type { ComponentPropsWithoutRef } from "react";

import { cn } from "@/lib/cn";

const widthClassNames = {
  text: "max-w-[var(--container-text)]",
  content: "max-w-[var(--container-content)]",
  default: "max-w-[var(--container-page)]",
  full: "max-w-none",
  wide: "max-w-[var(--container-wide)]",
} as const;

export type ContainerSize = keyof typeof widthClassNames;

export type ContainerProps = ComponentPropsWithoutRef<"div"> & {
  size?: ContainerSize;
};

export function Container({
  className,
  size = "default",
  ...props
}: ContainerProps) {
  return (
    <div
      className={cn(
        "mx-auto w-full px-[var(--container-gutter)]",
        widthClassNames[size],
        className,
      )}
      {...props}
    />
  );
}
