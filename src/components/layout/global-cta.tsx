import { ArrowRight } from "lucide-react";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { CtaPanel } from "@/components/shared/cta-panel";
import { ButtonLink } from "@/components/ui/button";
import { getCta } from "@/config/ctas";
import { type GlobalCtaConfig, globalCtaConfig } from "@/config/layout";
import { cn } from "@/lib/cn";

export type GlobalCtaProps = Partial<GlobalCtaConfig> & {
  className?: string;
};

export function GlobalCta({
  className,
  description = globalCtaConfig.description,
  eyebrow = globalCtaConfig.eyebrow,
  primaryCtaId = globalCtaConfig.primaryCtaId,
  secondaryCtaId = globalCtaConfig.secondaryCtaId,
  title = globalCtaConfig.title,
  variant = globalCtaConfig.variant,
}: GlobalCtaProps) {
  const primaryCta = getCta(primaryCtaId);
  const secondaryCta = secondaryCtaId ? getCta(secondaryCtaId) : undefined;

  return (
    <Section
      as="div"
      className={cn("border-t border-border", className)}
      data-component="global-cta"
      spacing="compact"
    >
      <Container size="wide">
        <CtaPanel
          description={description}
          eyebrow={eyebrow}
          primaryAction={
            <ButtonLink
              className="max-w-full text-center whitespace-normal"
              href={primaryCta.href}
              size="large"
              trailingIcon={<ArrowRight aria-hidden="true" />}
              variant={variant === "strong" ? "secondary" : "primary"}
            >
              {primaryCta.label}
            </ButtonLink>
          }
          secondaryAction={
            secondaryCta ? (
              <ButtonLink
                className="max-w-full text-center whitespace-normal"
                href={secondaryCta.href}
                size="large"
                variant="outline"
              >
                {secondaryCta.label}
              </ButtonLink>
            ) : undefined
          }
          title={title}
          variant={variant}
        />
      </Container>
    </Section>
  );
}
