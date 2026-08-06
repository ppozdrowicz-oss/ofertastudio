import type { ComponentPropsWithoutRef } from "react";

import { cn } from "@/lib/cn";

const strengthClassNames = {
  strong: "border-border-strong",
  subtle: "border-border",
} as const;

export type DividerProps = ComponentPropsWithoutRef<"div"> & {
  orientation?: "horizontal" | "vertical";
  strength?: keyof typeof strengthClassNames;
};

export function Divider({
  className,
  orientation = "horizontal",
  strength = "subtle",
  ...props
}: DividerProps) {
  return (
    <div
      aria-orientation={orientation}
      className={cn(
        orientation === "horizontal"
          ? "w-full border-t"
          : "h-full min-h-6 border-l",
        strengthClassNames[strength],
        className,
      )}
      role="separator"
      {...props}
    />
  );
}
