import { ArrowRight, Layers3 } from "lucide-react";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { SectionHeading } from "@/components/shared/section-heading";
import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { IconBox } from "@/components/ui/icon-box";
import { foundationPageContent } from "@/content/foundation-page";
import { serviceGroups } from "@/content/service-groups";

export function TechnicalFoundation() {
  return (
    <Section
      aria-labelledby="foundation-title"
      className="flex min-h-dvh items-center"
      spacing="compact"
    >
      <Container size="wide">
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <SectionHeading
              description={foundationPageContent.description}
              eyebrow={foundationPageContent.eyebrow}
              highlight="gotowy"
              level={1}
              size="hero"
              title={foundationPageContent.title}
              titleId="foundation-title"
              width="wide"
            />
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ButtonLink
                href="/design-system"
                size="large"
                trailingIcon={<ArrowRight aria-hidden="true" />}
              >
                Otwórz design system
              </ButtonLink>
            </div>
            <p className="mt-8 max-w-[var(--measure-copy)] border-t border-border pt-6 text-body-sm text-muted-foreground">
              {foundationPageContent.nextStep}
            </p>
          </div>

          <Card className="lg:col-span-5" variant="highlighted">
            <CardContent className="pt-[var(--space-card-padding)]">
              <div className="flex items-center justify-between gap-4">
                <IconBox icon={Layers3} size="large" variant="primary" />
                <Badge variant="success">System gotowy</Badge>
              </div>
              <p className="mt-8 text-overline font-bold text-primary uppercase">
                Pięć filarów oferty
              </p>
              <ul
                aria-label="Główne filary usług OfertaStudio"
                className="mt-4 flex flex-wrap gap-2"
              >
                {serviceGroups.map((group, index) => (
                  <li key={group.id}>
                    <Badge variant={index === 0 ? "accent" : "neutral"}>
                      {group.name}
                    </Badge>
                  </li>
                ))}
              </ul>
              <div
                aria-label="Próbka palety marki"
                className="mt-8 grid grid-cols-4 gap-2"
                role="img"
              >
                <span className="h-14 rounded-[var(--radius-small)] bg-surface-inverse" />
                <span className="h-14 rounded-[var(--radius-small)] bg-primary" />
                <span className="h-14 rounded-[var(--radius-small)] bg-accent" />
                <span className="h-14 rounded-[var(--radius-small)] border border-border bg-surface" />
              </div>
            </CardContent>
          </Card>
        </div>
      </Container>
    </Section>
  );
}
