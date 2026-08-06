import { Check } from "lucide-react";

import { cn } from "@/lib/cn";

export type FeatureListProps = {
  className?: string;
  columns?: 1 | 2;
  items: readonly string[];
  variant?: "bullet" | "check";
};

export function FeatureList({
  className,
  columns = 1,
  items,
  variant = "check",
}: FeatureListProps) {
  return (
    <ul
      className={cn("grid gap-3", columns === 2 && "sm:grid-cols-2", className)}
    >
      {items.map((item) => (
        <li className="flex items-start gap-3 text-body-sm" key={item}>
          {variant === "check" ? (
            <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-[var(--radius-round)] bg-accent-surface text-accent-foreground">
              <Check
                aria-hidden="true"
                className="size-3.5"
                strokeWidth={2.4}
              />
            </span>
          ) : (
            <span
              aria-hidden="true"
              className="mt-2.5 size-1.5 shrink-0 rounded-[var(--radius-round)] bg-primary"
            />
          )}
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}
