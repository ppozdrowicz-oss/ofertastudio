import { ChevronRight } from "lucide-react";
import Link from "next/link";

import type { SitePath } from "@/types/content";

export type BreadcrumbItem = {
  label: string;
  href?: SitePath;
};

export type BreadcrumbProps = {
  items: readonly BreadcrumbItem[];
  label?: string;
  tone?: "default" | "inverse";
};

export function Breadcrumb({
  items,
  label = "Okruszki nawigacyjne",
  tone = "default",
}: BreadcrumbProps) {
  const isInverse = tone === "inverse";

  return (
    <nav aria-label={label}>
      <ol className="flex min-w-0 flex-wrap items-center gap-x-2 gap-y-1 text-body-sm">
        {items.map((item, index) => {
          const isCurrent = index === items.length - 1;

          return (
            <li
              className="flex min-w-0 items-center gap-2"
              key={`${item.label}-${index}`}
            >
              {index > 0 && (
                <ChevronRight
                  aria-hidden="true"
                  className={
                    isInverse
                      ? "size-4 shrink-0 text-surface-inverse-border"
                      : "size-4 shrink-0 text-border-control"
                  }
                />
              )}
              {isCurrent || !item.href ? (
                <span
                  aria-current={isCurrent ? "page" : undefined}
                  className={
                    isInverse
                      ? "break-words text-surface-inverse-foreground"
                      : "break-words text-foreground"
                  }
                >
                  {item.label}
                </span>
              ) : (
                <Link
                  className={
                    isInverse
                      ? "transition-interactive rounded-[var(--radius-small)] text-surface-inverse-muted-foreground underline decoration-transparent underline-offset-4 hover:text-surface-inverse-foreground hover:decoration-surface-inverse-muted-foreground"
                      : "transition-interactive rounded-[var(--radius-small)] text-muted-foreground underline decoration-transparent underline-offset-4 hover:text-foreground hover:decoration-border-control"
                  }
                  href={item.href}
                >
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
