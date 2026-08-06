"use client";

import { Menu } from "lucide-react";
import { usePathname } from "next/navigation";
import {
  type PointerEvent as ReactPointerEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import { DesktopNavigation } from "@/components/navigation/desktop-navigation";
import { MobileNavigation } from "@/components/navigation/mobile-navigation";
import { Button, ButtonLink } from "@/components/ui/button";
import { getCta } from "@/config/ctas";
import { navigationConfig } from "@/config/navigation";

type NavigationControllerProps = {
  pathname: string;
};

function NavigationController({ pathname }: NavigationControllerProps) {
  const [openDesktopMenuId, setOpenDesktopMenuId] = useState<string | null>(
    null,
  );
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [openMobileSectionIds, setOpenMobileSectionIds] = useState<
    ReadonlySet<string>
  >(new Set());
  const navigationRootRef = useRef<HTMLDivElement>(null);
  const mobileDialogRef = useRef<HTMLDialogElement>(null);
  const mobileTriggerRef = useRef<HTMLButtonElement>(null);
  const mobileCloseRef = useRef<HTMLButtonElement>(null);
  const headerCta = getCta(navigationConfig.headerCtaId);
  const mobileCta = getCta(navigationConfig.mobileCtaId);

  const closeDesktopMenu = useCallback(() => {
    setOpenDesktopMenuId(null);
  }, []);

  const closeMobileMenu = useCallback((restoreFocus = true) => {
    const dialog = mobileDialogRef.current;

    if (dialog?.open) {
      dialog.close();
    }

    setIsMobileOpen(false);
    setOpenMobileSectionIds(new Set());

    if (restoreFocus) {
      window.requestAnimationFrame(() => mobileTriggerRef.current?.focus());
    }
  }, []);

  const closeAfterNavigation = useCallback(() => {
    closeDesktopMenu();
    closeMobileMenu(false);
  }, [closeDesktopMenu, closeMobileMenu]);

  useEffect(() => {
    const dialog = mobileDialogRef.current;

    if (!isMobileOpen) {
      if (dialog?.open) {
        dialog.close();
      }

      return;
    }

    if (dialog && !dialog.open) {
      dialog.showModal();
      window.requestAnimationFrame(() => mobileCloseRef.current?.focus());
    }
  }, [isMobileOpen]);

  useEffect(() => {
    if (!isMobileOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isMobileOpen]);

  useEffect(() => {
    if (!openDesktopMenuId) {
      return;
    }

    function handleOutsidePointer(event: PointerEvent): void {
      const target = event.target;

      if (
        target instanceof Node &&
        !navigationRootRef.current?.contains(target)
      ) {
        closeDesktopMenu();
      }
    }

    document.addEventListener("pointerdown", handleOutsidePointer);

    return () => {
      document.removeEventListener("pointerdown", handleOutsidePointer);
    };
  }, [closeDesktopMenu, openDesktopMenuId]);

  useEffect(() => {
    const desktopQuery = window.matchMedia("(min-width: 80rem)");

    function handleViewportChange(event: MediaQueryListEvent): void {
      if (event.matches) {
        closeMobileMenu(false);
      } else {
        closeDesktopMenu();
      }
    }

    desktopQuery.addEventListener("change", handleViewportChange);

    return () => {
      desktopQuery.removeEventListener("change", handleViewportChange);
    };
  }, [closeDesktopMenu, closeMobileMenu]);

  function toggleMobileSection(itemId: string): void {
    setOpenMobileSectionIds((current) => {
      const next = new Set(current);

      if (next.has(itemId)) {
        next.delete(itemId);
      } else {
        next.add(itemId);
      }

      return next;
    });
  }

  function handleMobileTriggerPointer(
    event: ReactPointerEvent<HTMLButtonElement>,
  ): void {
    if (event.pointerType === "mouse") {
      closeDesktopMenu();
    }
  }

  return (
    <div
      className="flex min-w-0 flex-1 items-center justify-end gap-3"
      ref={navigationRootRef}
    >
      <DesktopNavigation
        items={navigationConfig.header}
        onClose={closeDesktopMenu}
        onToggle={(itemId) => {
          setOpenDesktopMenuId((current) =>
            current === itemId ? null : itemId,
          );
        }}
        openMenuId={openDesktopMenuId}
        pathname={pathname}
      />
      <ButtonLink
        className="hidden xl:inline-flex"
        href={headerCta.href}
        size="small"
      >
        {headerCta.label}
      </ButtonLink>
      <Button
        aria-controls="mobile-navigation"
        aria-expanded={isMobileOpen}
        aria-label="Otwórz menu"
        className="xl:hidden"
        onClick={() => setIsMobileOpen(true)}
        onPointerDown={handleMobileTriggerPointer}
        ref={mobileTriggerRef}
        size="icon"
        variant="outline"
      >
        <Menu aria-hidden="true" />
      </Button>
      <MobileNavigation
        closeButtonRef={mobileCloseRef}
        cta={mobileCta}
        dialogRef={mobileDialogRef}
        items={navigationConfig.mobile}
        onClose={closeMobileMenu}
        onNavigate={closeAfterNavigation}
        onToggleSection={toggleMobileSection}
        openSectionIds={openMobileSectionIds}
        pathname={pathname}
      />
    </div>
  );
}

export function MainNavigation() {
  const pathname = usePathname();

  return <NavigationController key={pathname} pathname={pathname} />;
}
