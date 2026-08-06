import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { type FocusEvent, type KeyboardEvent, useRef } from "react";

import { MegaMenu } from "@/components/navigation/mega-menu";
import { cn } from "@/lib/cn";
import { isPathActive } from "@/lib/navigation-state";
import type { NavigationItem } from "@/types/navigation";

export type DesktopNavigationProps = {
  items: readonly NavigationItem[];
  onClose: () => void;
  onToggle: (itemId: string) => void;
  openMenuId: string | null;
  pathname: string;
};

export function DesktopNavigation({
  items,
  onClose,
  onToggle,
  openMenuId,
  pathname,
}: DesktopNavigationProps) {
  const triggerRefs = useRef(new Map<string, HTMLButtonElement>());

  function handleEscape(
    event: KeyboardEvent<HTMLLIElement>,
    itemId: string,
  ): void {
    if (event.key !== "Escape" || openMenuId !== itemId) {
      return;
    }

    event.preventDefault();
    event.stopPropagation();
    onClose();
    triggerRefs.current.get(itemId)?.focus();
  }

  function handleDisclosureBlur(
    event: FocusEvent<HTMLLIElement>,
    itemId: string,
  ): void {
    if (openMenuId !== itemId) {
      return;
    }

    const nextTarget = event.relatedTarget;

    if (
      !(nextTarget instanceof Node) ||
      !event.currentTarget.contains(nextTarget)
    ) {
      onClose();
    }
  }

  return (
    <nav aria-label="Główna nawigacja" className="hidden xl:block">
      <ul className="flex items-center gap-0.5">
        {items.map((item) => {
          const isActive = isPathActive(pathname, item.href);
          const isExact = pathname === item.href;

          if (item.kind === "link") {
            return (
              <li key={item.id}>
                <Link
                  aria-current={isExact ? "page" : undefined}
                  className={cn(
                    "transition-interactive relative inline-flex min-h-11 items-center rounded-[var(--radius-control)] px-3 text-label font-semibold",
                    isActive
                      ? "bg-primary-surface text-primary after:absolute after:right-3 after:bottom-1 after:left-3 after:h-0.5 after:bg-primary"
                      : "text-foreground hover:bg-surface-muted hover:text-primary",
                  )}
                  href={item.href}
                  onClick={onClose}
                >
                  {item.label}
                </Link>
              </li>
            );
          }

          const isOpen = openMenuId === item.id;
          const panelId = `desktop-navigation-${item.id}`;

          return (
            <li
              className="relative"
              key={item.id}
              onBlur={(event) => handleDisclosureBlur(event, item.id)}
              onKeyDown={(event) => handleEscape(event, item.id)}
            >
              <button
                aria-controls={panelId}
                aria-expanded={isOpen}
                className={cn(
                  "transition-interactive relative inline-flex min-h-11 items-center gap-1 rounded-[var(--radius-control)] px-3 text-label font-semibold",
                  isActive
                    ? "bg-primary-surface text-primary after:absolute after:right-3 after:bottom-1 after:left-3 after:h-0.5 after:bg-primary"
                    : "text-foreground hover:bg-surface-muted hover:text-primary",
                )}
                onClick={() => onToggle(item.id)}
                ref={(element) => {
                  if (element) {
                    triggerRefs.current.set(item.id, element);
                  } else {
                    triggerRefs.current.delete(item.id);
                  }
                }}
                type="button"
              >
                <span>{item.label}</span>
                {isActive && <span className="sr-only"> — bieżąca sekcja</span>}
                <ChevronDown
                  aria-hidden="true"
                  className={cn(
                    "transition-interactive size-4 shrink-0",
                    isOpen && "rotate-180",
                  )}
                />
              </button>
              {isOpen && (
                <MegaMenu
                  item={item}
                  onNavigate={onClose}
                  panelId={panelId}
                  pathname={pathname}
                />
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
