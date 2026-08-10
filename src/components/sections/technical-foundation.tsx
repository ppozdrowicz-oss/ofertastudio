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
          description="Globalny layout zachowuje pełną treść i nawigację bez WebGL. Conversion Landscape działa wyłącznie w osobnym, nieindeksowanym laboratorium."
          eyebrow="Punkt kontroli"
          size="h2"
          title="DOM i warstwa experience mają osobne odpowiedzialności"
          titleId="foundation-title"
          width="wide"
        />
        <div className="mt-10 grid gap-4 lg:grid-cols-12">
          <Card className="lg:col-span-7" variant="highlighted">
            <CardContent className="pt-[var(--space-card-padding)]">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <IconBox icon={LayoutTemplate} size="large" variant="primary" />
                <Badge variant="success">Etap 6 gotowy</Badge>
              </div>
              <h2 className="mt-8 text-h3 font-semibold">
                Treść, nawigacja i progressive enhancement
              </h2>
              <p className="mt-4 max-w-[var(--measure-copy)] text-body-lg text-muted-foreground">
                Nawigacja desktopowa i mobilna korzystają z jednego źródła
                danych. Canvas nie blokuje HTML, nie przechwytuje fokusu i
                degraduje się do statycznej kompozycji bez utraty informacji.
              </p>
              <ButtonLink
                className="mt-8 max-w-full text-center whitespace-normal"
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
