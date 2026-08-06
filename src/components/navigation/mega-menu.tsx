import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { cn } from "@/lib/cn";
import { isPathActive } from "@/lib/navigation-state";
import type {
  NavigationLinkItem,
  NavigationMenuItem,
} from "@/types/navigation";

type NavigationPanelLinkProps = {
  item: NavigationLinkItem;
  onNavigate: () => void;
  pathname: string;
};

function NavigationPanelLink({
  item,
  onNavigate,
  pathname,
}: NavigationPanelLinkProps) {
  const isExact = pathname === item.href;
  const isActive = isPathActive(pathname, item.href);

  return (
    <Link
      aria-current={isExact ? "page" : undefined}
      className={cn(
        "transition-interactive group/link block rounded-[var(--radius-control)] border-l-2 px-3 py-2.5",
        isActive
          ? "border-primary bg-primary-surface"
          : "border-transparent hover:border-border-strong hover:bg-surface-muted",
      )}
      href={item.href}
      onClick={onNavigate}
    >
      <span className="flex items-center justify-between gap-3 text-label font-semibold text-foreground">
        <span>{item.label}</span>
        <ArrowRight
          aria-hidden="true"
          className="transition-interactive size-4 shrink-0 text-border-control group-hover/link:translate-x-0.5 group-hover/link:text-primary"
        />
      </span>
      {item.description && (
        <span className="mt-1 block text-caption text-muted-foreground">
          {item.description}
        </span>
      )}
    </Link>
  );
}

export type MegaMenuProps = {
  item: NavigationMenuItem;
  onNavigate: () => void;
  panelId: string;
  pathname: string;
};

export function MegaMenu({
  item,
  onNavigate,
  panelId,
  pathname,
}: MegaMenuProps) {
  const childById = new Map(item.children.map((child) => [child.id, child]));
  const isMega = item.presentation === "mega";

  return (
    <div
      className={cn(
        "absolute top-[calc(100%+0.75rem)] z-[var(--layer-dropdown)] rounded-[var(--radius-card)] border border-border bg-surface p-3 text-foreground shadow-overlay",
        isMega ? "w-[min(46rem,calc(100vw-2rem))]" : "w-96",
        item.align === "right" ? "right-0" : "left-0",
      )}
      id={panelId}
    >
      {item.context && (
        <div className="mb-3 grid gap-1 rounded-[var(--radius-control)] border border-accent-border bg-accent-surface px-4 py-3">
          <p className="text-overline font-bold text-accent-foreground uppercase">
            {item.context.label}
          </p>
          <p className="max-w-[var(--measure-copy)] text-caption text-accent-foreground">
            {item.context.description}
          </p>
        </div>
      )}

      {isMega && item.groups ? (
        <div className="grid gap-3 sm:grid-cols-2">
          {item.groups.map((group) => (
            <section aria-labelledby={`${panelId}-${group.id}`} key={group.id}>
              <h3
                className="px-3 py-2 text-overline font-bold text-muted-foreground uppercase"
                id={`${panelId}-${group.id}`}
              >
                {group.label}
              </h3>
              <ul className="grid gap-1">
                {group.itemIds.map((itemId) => {
                  const child = childById.get(itemId);

                  if (!child) {
                    return null;
                  }

                  return (
                    <li key={child.id}>
                      <NavigationPanelLink
                        item={child}
                        onNavigate={onNavigate}
                        pathname={pathname}
                      />
                    </li>
                  );
                })}
              </ul>
            </section>
          ))}
        </div>
      ) : (
        <ul className="grid gap-1">
          {item.children.map((child) => (
            <li key={child.id}>
              <NavigationPanelLink
                item={child}
                onNavigate={onNavigate}
                pathname={pathname}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
