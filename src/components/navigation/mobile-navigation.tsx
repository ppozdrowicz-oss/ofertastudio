import { ChevronDown, X } from "lucide-react";
import Link from "next/link";
import type { MouseEvent, RefObject, SyntheticEvent } from "react";

import { BrandMark } from "@/components/layout/brand-mark";
import { Button, ButtonLink } from "@/components/ui/button";
import { TextLink } from "@/components/ui/text-link";
import { routes } from "@/config/routes";
import { cn } from "@/lib/cn";
import { isPathActive } from "@/lib/navigation-state";
import type { Cta } from "@/types/content";
import type { NavigationItem } from "@/types/navigation";

export type MobileNavigationProps = {
  closeButtonRef: RefObject<HTMLButtonElement | null>;
  cta: Cta;
  dialogRef: RefObject<HTMLDialogElement | null>;
  items: readonly NavigationItem[];
  onClose: (restoreFocus?: boolean) => void;
  onNavigate: () => void;
  onToggleSection: (itemId: string) => void;
  openSectionIds: ReadonlySet<string>;
  pathname: string;
};

export function MobileNavigation({
  closeButtonRef,
  cta,
  dialogRef,
  items,
  onClose,
  onNavigate,
  onToggleSection,
  openSectionIds,
  pathname,
}: MobileNavigationProps) {
  function handleBackdropClick(event: MouseEvent<HTMLDialogElement>): void {
    if (event.target === event.currentTarget) {
      onClose();
    }
  }

  function handleCancel(event: SyntheticEvent<HTMLDialogElement>): void {
    event.preventDefault();
    onClose();
  }

  return (
    <dialog
      aria-labelledby="mobile-navigation-title"
      className="m-0 ml-auto h-dvh max-h-dvh w-full max-w-[28rem] overflow-hidden bg-transparent p-0 text-foreground backdrop:bg-foreground/55 xl:hidden"
      id="mobile-navigation"
      onCancel={handleCancel}
      onClick={handleBackdropClick}
      ref={dialogRef}
    >
      <div className="flex h-dvh min-w-0 flex-col border-l border-border bg-surface shadow-overlay">
        <div className="flex min-h-[var(--header-height-mobile)] items-center justify-between gap-4 border-b border-border px-[var(--container-gutter)]">
          <BrandMark />
          <Button
            aria-label="Zamknij menu"
            ref={closeButtonRef}
            size="icon"
            variant="ghost"
            onClick={() => onClose()}
          >
            <X aria-hidden="true" />
          </Button>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-[var(--container-gutter)] py-6">
          <h2
            className="text-overline font-bold text-muted-foreground uppercase"
            id="mobile-navigation-title"
          >
            Menu
          </h2>
          <nav aria-label="Nawigacja mobilna" className="mt-4">
            <ul className="grid gap-1">
              {items.map((item) => {
                const isActive = isPathActive(pathname, item.href);
                const isExact = pathname === item.href;

                if (item.kind === "link") {
                  return (
                    <li key={item.id}>
                      <Link
                        aria-current={isExact ? "page" : undefined}
                        className={cn(
                          "transition-interactive flex min-h-12 items-center rounded-[var(--radius-control)] border-l-2 px-3 text-body font-semibold",
                          isActive
                            ? "border-primary bg-primary-surface text-primary"
                            : "border-transparent text-foreground hover:bg-surface-muted",
                        )}
                        href={item.href}
                        onClick={onNavigate}
                      >
                        {item.label}
                      </Link>
                    </li>
                  );
                }

                const isOpen = openSectionIds.has(item.id);
                const panelId = `mobile-navigation-${item.id}`;

                return (
                  <li className="border-b border-border py-1" key={item.id}>
                    <div
                      className={cn(
                        "grid grid-cols-[minmax(0,1fr)_3rem] rounded-[var(--radius-control)] border-l-2",
                        isActive
                          ? "border-primary bg-primary-surface"
                          : "border-transparent",
                      )}
                    >
                      <Link
                        aria-current={isExact ? "page" : undefined}
                        className={cn(
                          "transition-interactive flex min-h-12 min-w-0 items-center rounded-l-[var(--radius-control)] px-3 text-body font-semibold hover:text-primary",
                          isActive ? "text-primary" : "text-foreground",
                        )}
                        href={item.href}
                        onClick={onNavigate}
                      >
                        {item.label}
                        {isActive && (
                          <span className="sr-only"> — bieżąca sekcja</span>
                        )}
                      </Link>
                      <button
                        aria-controls={panelId}
                        aria-expanded={isOpen}
                        aria-label={`${isOpen ? "Zwiń" : "Rozwiń"} sekcję ${item.label}`}
                        className="transition-interactive grid min-h-12 place-items-center rounded-r-[var(--radius-control)] hover:bg-surface-strong"
                        onClick={() => onToggleSection(item.id)}
                        type="button"
                      >
                        <ChevronDown
                          aria-hidden="true"
                          className={cn(
                            "transition-interactive size-5",
                            isOpen && "rotate-180",
                          )}
                        />
                      </button>
                    </div>
                    {isOpen && (
                      <ul className="mt-1 grid gap-1 pb-2 pl-3" id={panelId}>
                        {item.children.map((child) => {
                          const isChildExact = pathname === child.href;
                          const isChildActive = isPathActive(
                            pathname,
                            child.href,
                          );

                          return (
                            <li key={child.id}>
                              <Link
                                aria-current={isChildExact ? "page" : undefined}
                                className={cn(
                                  "transition-interactive block min-h-11 rounded-[var(--radius-control)] border-l-2 px-3 py-2.5 text-body-sm",
                                  isChildActive
                                    ? "border-primary bg-primary-surface font-semibold text-primary"
                                    : "border-transparent text-muted-foreground hover:bg-surface-muted hover:text-foreground",
                                )}
                                href={child.href}
                                onClick={onNavigate}
                              >
                                {child.label}
                              </Link>
                            </li>
                          );
                        })}
                      </ul>
                    )}
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="mt-6 border-t border-border pt-6">
            <ButtonLink
              fullWidth
              href={cta.href}
              size="large"
              onClick={onNavigate}
            >
              {cta.label}
            </ButtonLink>
            <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2">
              <TextLink
                href={routes.contact}
                onClick={onNavigate}
                variant="muted"
              >
                Kontakt
              </TextLink>
              <TextLink
                href={routes.brief}
                onClick={onNavigate}
                variant="muted"
              >
                Brief projektu
              </TextLink>
            </div>
          </div>
        </div>
      </div>
    </dialog>
  );
}
