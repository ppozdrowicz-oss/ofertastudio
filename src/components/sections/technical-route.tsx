import { ArrowLeft } from "lucide-react";

import { Container } from "@/components/layout/container";
import { PageShell } from "@/components/layout/page-shell";
import { Section } from "@/components/layout/section";
import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Notice } from "@/components/ui/notice";
import { routes } from "@/config/routes";
import { getBreadcrumbItems } from "@/lib/route-registry";
import type { PageRegistryEntry, PageType } from "@/types/content";

const pageTypeLabels = {
  about: "Studio",
  brief: "Kwalifikacja projektu",
  contact: "Kontakt",
  home: "Strona główna",
  legal: "Informacje prawne",
  offer: "Oferta",
  process: "Proces współpracy",
  "project-index": "Realizacje",
  service: "Usługa",
  "service-group": "Filar usług",
} as const satisfies Record<PageType, string>;

function getStatusDescription(page: PageRegistryEntry): string {
  if (page.type === "legal") {
    return "Trasa i układ są gotowe. Wiążąca treść prawna zostanie opublikowana dopiero po potwierdzeniu danych firmy, narzędzi oraz zakresu przetwarzania danych.";
  }

  if (page.type === "contact" || page.type === "brief") {
    return "Trasa i warstwa nawigacyjna działają. Produkcyjny formularz oraz potwierdzony sposób kontaktu powstaną w etapie 11 — bez publikowania fikcyjnych danych.";
  }

  if (page.type === "project-index") {
    return "Trasa i układ są gotowe. Realizacje pojawią się wyłącznie po otrzymaniu prawdziwych materiałów i potwierdzeniu zakresu case study.";
  }

  return "Trasa, metadata, breadcrumbs i globalny layout są gotowe. Finalna treść oraz widok marketingowy powstaną w odpowiednim etapie roadmapy.";
}

export type TechnicalRouteProps = {
  page: PageRegistryEntry;
};

export function TechnicalRoute({ page }: TechnicalRouteProps) {
  const showGlobalCta = !["brief", "contact", "legal"].includes(page.type);

  return (
    <PageShell
      breadcrumbs={getBreadcrumbItems(page.href)}
      header={{
        eyebrow: `${pageTypeLabels[page.type]} · widok techniczny`,
        lead: getStatusDescription(page),
        title: page.name,
        variant: "compact",
      }}
      showGlobalCta={showGlobalCta}
    >
      <Section spacing="compact" variant="muted">
        <Container size="content">
          <Card variant="bordered">
            <CardHeader>
              <div className="flex flex-wrap items-center justify-between gap-4">
                <Badge variant="information">Trasa aktywna</Badge>
                <span className="text-caption text-muted-foreground">
                  Etap 4 z 14
                </span>
              </div>
              <CardTitle className="mt-6" as="h2">
                Globalny layout działa na tej podstronie
              </CardTitle>
              <CardDescription>
                Ten techniczny widok zabezpiecza nawigację przed błędami 404,
                ale nie udaje gotowej podstrony sprzedażowej.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Notice title="Zakres obecnego etapu" variant="information">
                Header, menu, breadcrumbs, globalne CTA i stopka korzystają z
                centralnych danych. Treść właściwa dla tej strony zostanie
                zaprojektowana zgodnie z roadmapą.
              </Notice>
              <ButtonLink
                className="mt-8"
                href={routes.home}
                leadingIcon={<ArrowLeft aria-hidden="true" />}
                variant="outline"
              >
                Wróć na stronę główną
              </ButtonLink>
            </CardContent>
          </Card>
        </Container>
      </Section>
    </PageShell>
  );
}
