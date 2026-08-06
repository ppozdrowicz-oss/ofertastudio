import type { ReactNode } from "react";

import { Container, type ContainerSize } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { SectionHeading } from "@/components/shared/section-heading";
import { Breadcrumbs } from "@/components/ui/breadcrumb";
import { cn } from "@/lib/cn";
import type { BreadcrumbItem } from "@/types/navigation";

export type PageHeaderProps = {
  breadcrumbs?: readonly BreadcrumbItem[];
  className?: string;
  containerSize?: ContainerSize;
  eyebrow?: string;
  lead?: string;
  primaryAction?: ReactNode;
  secondaryAction?: ReactNode;
  surface?: "default" | "muted" | "strong";
  title: string;
  titleId?: string;
  variant?: "compact" | "standard";
  visual?: ReactNode;
};

export function PageHeader({
  breadcrumbs = [],
  className,
  containerSize = "wide",
  eyebrow,
  lead,
  primaryAction,
  secondaryAction,
  surface = "default",
  title,
  titleId = "page-title",
  variant = "standard",
  visual,
}: PageHeaderProps) {
  const isInverse = surface === "strong";

  return (
    <Section
      as="header"
      className={cn("border-b border-border", className)}
      spacing={variant === "compact" ? "compact" : "default"}
      variant={surface}
    >
      <Container size={containerSize}>
        {breadcrumbs.length > 0 && (
          <Breadcrumbs
            items={breadcrumbs}
            tone={isInverse ? "inverse" : "default"}
          />
        )}
        <div
          className={cn(
            "grid items-end gap-8",
            breadcrumbs.length > 0 && "mt-10",
            Boolean(visual) && "lg:grid-cols-12 lg:gap-12",
          )}
        >
          <div className={cn("min-w-0", Boolean(visual) && "lg:col-span-7")}>
            <SectionHeading
              description={lead}
              eyebrow={eyebrow}
              level={1}
              size={variant === "compact" ? "h1" : "hero"}
              title={title}
              titleId={titleId}
              tone={isInverse ? "inverse" : "default"}
              width="wide"
            />
            {(primaryAction || secondaryAction) && (
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                {primaryAction}
                {secondaryAction}
              </div>
            )}
          </div>
          {visual && <div className="min-w-0 lg:col-span-5">{visual}</div>}
        </div>
      </Container>
    </Section>
  );
}
