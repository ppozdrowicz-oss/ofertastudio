import type { ReactNode } from "react";

import { GlobalCta, type GlobalCtaProps } from "@/components/layout/global-cta";
import {
  PageHeader,
  type PageHeaderProps,
} from "@/components/layout/page-header";
import { cn } from "@/lib/cn";
import type { BreadcrumbItem } from "@/types/navigation";

export type PageShellProps = {
  breadcrumbs?: readonly BreadcrumbItem[];
  children: ReactNode;
  globalCta?: GlobalCtaProps;
  header?: Omit<PageHeaderProps, "breadcrumbs">;
  mainClassName?: string;
  showGlobalCta?: boolean;
};

export function PageShell({
  breadcrumbs,
  children,
  globalCta,
  header,
  mainClassName,
  showGlobalCta = true,
}: PageShellProps) {
  return (
    <>
      <main
        className={cn("min-w-0 flex-1", mainClassName)}
        id="main-content"
        tabIndex={-1}
      >
        {header && <PageHeader breadcrumbs={breadcrumbs} {...header} />}
        {children}
      </main>
      {showGlobalCta && <GlobalCta {...globalCta} />}
    </>
  );
}
