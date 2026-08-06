import { Suspense } from "react";

import { BrandMark } from "@/components/layout/brand-mark";
import { Container } from "@/components/layout/container";
import { MainNavigation } from "@/components/navigation/main-navigation";

function NavigationFallback() {
  return <div aria-hidden="true" className="min-h-11 flex-1" />;
}

export function SiteHeader() {
  return (
    <header
      className="sticky top-0 z-[var(--layer-header)] border-b border-border bg-surface shadow-surface"
      data-component="site-header"
      data-state="sticky"
    >
      <Container
        className="flex min-h-[var(--header-height-mobile)] items-center justify-between gap-4 xl:min-h-[var(--header-height-desktop)]"
        size="wide"
      >
        <BrandMark className="shrink-0" />
        <Suspense fallback={<NavigationFallback />}>
          <MainNavigation />
        </Suspense>
      </Container>
    </header>
  );
}
