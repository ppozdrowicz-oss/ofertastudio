import { Check, LayoutTemplate } from "lucide-react";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { SectionHeading } from "@/components/shared/section-heading";
import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { IconBox } from "@/components/ui/icon-box";
import { routes } from "@/config/routes";
import { foundationPageContent } from "@/content/foundation-page";
import { serviceGroups } from "@/content/service-groups";

export function TechnicalFoundation() {
  return (
    <Section
      aria-labelledby="foundation-title"
      spacing="compact"
      variant="muted"
    >
      <Container size="wide">
        <SectionHeading
          description="Każdy element niżej korzysta z produkcyjnych komponentów. Otwórz przykładową podstronę, aby sprawdzić aktywny filar i breadcrumbs."
          eyebrow="Punkt kontroli"
          size="h2"
          title="Warstwa globalna działa jako jeden system"
          titleId="foundation-title"
          width="wide"
        />
        <div className="mt-10 grid gap-4 lg:grid-cols-12">
          <Card className="lg:col-span-7" variant="highlighted">
            <CardContent className="pt-[var(--space-card-padding)]">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <IconBox icon={LayoutTemplate} size="large" variant="primary" />
                <Badge variant="success">Etap 4 gotowy</Badge>
              </div>
              <h2 className="mt-8 text-h3 font-semibold">
                Header, menu, podstrona i stopka
              </h2>
              <p className="mt-4 max-w-[var(--measure-copy)] text-body-lg text-muted-foreground">
                Nawigacja desktopowa i mobilna korzystają z jednego źródła
                danych, a każda opublikowana pozycja prowadzi do działającej
                trasy technicznej.
              </p>
              <ButtonLink
                className="mt-8"
                href={routes.shoperConfiguration}
                leadingIcon={<Check aria-hidden="true" />}
                variant="outline"
              >
                Sprawdź podstronę z breadcrumbs
              </ButtonLink>
            </CardContent>
          </Card>

          <Card className="lg:col-span-5">
            <CardContent className="pt-[var(--space-card-padding)]">
              <p className="text-overline font-bold text-primary uppercase">
                Pięć filarów oferty
              </p>
              <ul
                aria-label="Główne filary usług OfertaStudio"
                className="mt-5 flex flex-wrap gap-2"
              >
                {serviceGroups.map((group, index) => (
                  <li key={group.id}>
                    <Badge variant={index === 0 ? "accent" : "neutral"}>
                      {group.name}
                    </Badge>
                  </li>
                ))}
              </ul>
              <p className="mt-8 border-t border-border pt-6 text-body-sm text-muted-foreground">
                {foundationPageContent.nextStep}
              </p>
            </CardContent>
          </Card>
        </div>
      </Container>
    </Section>
  );
}
