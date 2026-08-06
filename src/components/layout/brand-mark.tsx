import Link from "next/link";

import { routes } from "@/config/routes";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/cn";

export type BrandMarkProps = {
  className?: string;
  showDescriptor?: boolean;
  tone?: "default" | "inverse";
};

export function BrandMark({
  className,
  showDescriptor = false,
  tone = "default",
}: BrandMarkProps) {
  const isInverse = tone === "inverse";

  return (
    <Link
      aria-label="OfertaStudio — strona główna"
      className={cn(
        "transition-interactive inline-flex min-h-11 min-w-0 items-center gap-3 rounded-[var(--radius-small)]",
        isInverse ? "text-surface-inverse-foreground" : "text-foreground",
        className,
      )}
      href={routes.home}
    >
      <span
        aria-hidden="true"
        className="grid size-9 shrink-0 place-items-center rounded-[var(--radius-control)] border border-primary-border bg-primary-surface"
      >
        <span className="size-2.5 bg-primary" />
      </span>
      <span className="min-w-0">
        <span className="block text-h4 leading-none font-semibold tracking-[-0.025em]">
          Oferta
          <span className={isInverse ? "text-accent" : "text-primary"}>
            Studio
          </span>
        </span>
        {showDescriptor && (
          <span
            className={cn(
              "mt-1 block text-caption",
              isInverse
                ? "text-surface-inverse-muted-foreground"
                : "text-muted-foreground",
            )}
          >
            {siteConfig.descriptor}
          </span>
        )}
      </span>
    </Link>
  );
}
