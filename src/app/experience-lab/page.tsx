import type { Metadata } from "next";

import { ExperienceCanvas } from "@/components/experience/experience-canvas";
import { Container } from "@/components/layout/container";
import { PageShell } from "@/components/layout/page-shell";
import { Section } from "@/components/layout/section";
import { SectionHeading } from "@/components/shared/section-heading";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Notice } from "@/components/ui/notice";
import { TextLink } from "@/components/ui/text-link";
import {
  type ExperienceSceneId,
  experienceSceneRanges,
} from "@/lib/experience/progress";

export const metadata: Metadata = {
  description:
    "Techniczne laboratorium warstwy WebGL i systemu ruchu OfertaStudio.",
  robots: {
    follow: false,
    googleBot: {
      follow: false,
      index: false,
    },
    index: false,
    nocache: true,
  },
  title: "Experience lab",
};

const sceneLabels = {
  chaos: "Chaos",
  conversion: "Efekt",
  diagnosis: "Diagnoza",
  hero: "Orientacja",
  services: "System",
  transformation: "Transformacja",
} as const satisfies Record<ExperienceSceneId, string>;

export default function ExperienceLabPage() {
  return (
    <PageShell showGlobalCta={false}>
      <Section spacing="compact" variant="strong">
        <Container size="wide">
          <SectionHeading
            description="Izolowane środowisko do sprawdzania progresywnego WebGL, scroll progress, jakości renderowania i eleganckiej degradacji. To narzędzie techniczne, nie finalne hero strony głównej."
            eyebrow="OfertaStudio · etap 5"
            level={1}
            size="hero"
            title="The Conversion Landscape"
            tone="inverse"
            width="wide"
          />
          <div className="mt-8 flex flex-wrap gap-3">
            <Badge variant="accent">WebGL prototype</Badge>
            <Badge variant="neutral">Noindex</Badge>
            <Badge variant="primary">Progressive enhancement</Badge>
          </div>
        </Container>
      </Section>

      <Section spacing="compact">
        <Container size="wide">
          <Notice title="Treść pozostaje poza canvasem" variant="information">
            Poniższa scena jest dekoracyjna. Nazwy etapów, zasady działania i
            informacje diagnostyczne pozostają w semantycznym HTML, dzięki czemu
            strona zachowuje sens bez WebGL oraz JavaScriptu.
          </Notice>
          <div className="mt-8">
            <ExperienceCanvas showDiagnostics>
              <div className="grid h-full content-start p-[var(--space-card-padding)] sm:p-10 lg:grid-cols-12 lg:p-14">
                <div className="max-w-[var(--measure-copy)] lg:col-span-7">
                  <p className="text-overline font-bold tracking-[var(--letter-spacing-overline)] text-experience-muted uppercase">
                    Prototype scene · data architecture
                  </p>
                  <h2 className="mt-4 text-h2 font-semibold text-balance text-experience-foreground">
                    Od rozproszonych modułów do czytelnego systemu
                  </h2>
                  <p className="mt-5 max-w-[var(--measure-narrow)] text-body-lg text-experience-muted">
                    Przewiń stronę. Kamera podąża za tłumionym stanem sceny, a
                    nie za surową wartością scrolla. Ruch wskaźnika jest mały,
                    opcjonalny i nie przechwytuje interakcji.
                  </p>
                </div>
              </div>
            </ExperienceCanvas>
          </div>
        </Container>
      </Section>

      <Section variant="muted">
        <Container size="wide">
          <SectionHeading
            description="Jeden progres 0–1 jest dzielony na jawne zakresy. Kolejne etapy mogą podmieniać zawartość sceny bez zmiany kontraktu kontrolera scrolla."
            eyebrow="Scroll model"
            title="Sześć etapów jednej narracji"
          />
          <ol className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {experienceSceneRanges.map((range, index) => (
              <li key={range.id}>
                <Card className="h-full" variant="bordered">
                  <CardHeader>
                    <div className="flex items-center justify-between gap-4">
                      <Badge variant={index === 5 ? "accent" : "primary"}>
                        {String(index + 1).padStart(2, "0")}
                      </Badge>
                      <span className="text-caption text-muted-foreground">
                        {range.start.toFixed(2)}–{range.end.toFixed(2)}
                      </span>
                    </div>
                    <CardTitle>{sceneLabels[range.id]}</CardTitle>
                    <CardDescription>
                      Zakres gotowy do powiązania z treścią DOM i osobnym stanem
                      sceny.
                    </CardDescription>
                  </CardHeader>
                </Card>
              </li>
            ))}
          </ol>
        </Container>
      </Section>

      <Section>
        <Container size="wide">
          <div className="grid gap-10 lg:grid-cols-12 lg:items-start">
            <div className="lg:col-span-5">
              <SectionHeading
                description="High, Medium i Low ograniczają DPR oraz liczbę instancji bez zmiany treści. Brak kontekstu WebGL przełącza warstwę na statyczną kompozycję CSS."
                eyebrow="Graceful degradation"
                title="Fallback jest częścią systemu"
              />
              <div className="mt-8 grid gap-4">
                <Card variant="highlighted">
                  <CardHeader>
                    <CardTitle as="h3">Reduced motion</CardTitle>
                    <CardDescription>
                      Kamera otrzymuje jeden stabilny kadr, pointer influence
                      jest wyłączony, a renderer działa na żądanie.
                    </CardDescription>
                  </CardHeader>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle as="h3">Native scroll</CardTitle>
                    <CardDescription>
                      Nie zastosowano Lenisa ani scroll-jackingu. Anchory,
                      klawiatura i zachowanie mobilne pozostają natywne.
                    </CardDescription>
                  </CardHeader>
                </Card>
                <ExperienceCanvas enabled={false}>
                  <Notice
                    title="Warstwa całkowicie wyłączona"
                    variant="neutral"
                  >
                    Ustawienie enabled=false nie uruchamia detekcji, fallbacku
                    ani renderera. Semantyczna treść pozostaje zwykłym DOM.
                  </Notice>
                </ExperienceCanvas>
              </div>
            </div>
            <div className="lg:col-span-7">
              <ExperienceCanvas forceFallback mode="static">
                <div className="flex h-full items-start p-[var(--space-card-padding)] sm:p-10">
                  <div className="max-w-[var(--measure-narrow)]">
                    <p className="text-overline font-bold text-experience-muted uppercase">
                      Forced fallback
                    </p>
                    <h2 className="mt-3 text-h3 font-semibold text-experience-foreground">
                      Ten kadr nie wymaga WebGL
                    </h2>
                    <p className="mt-4 text-body text-experience-muted">
                      Geometryczne tło korzysta z tych samych semantycznych
                      tokenów co scena i zachowuje stały rozmiar bez layout
                      shift.
                    </p>
                  </div>
                </div>
              </ExperienceCanvas>
            </div>
          </div>
          <div className="mt-10 border-t border-border pt-6">
            <TextLink href="/design-system" variant="arrow">
              Wróć do design systemu
            </TextLink>
          </div>
        </Container>
      </Section>
    </PageShell>
  );
}
