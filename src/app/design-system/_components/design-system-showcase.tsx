import { ArrowLeft, ArrowRight, Check, Mail, Search } from "lucide-react";
import type { ReactNode } from "react";

import { Container } from "@/components/layout/container";
import { Section, type SectionProps } from "@/components/layout/section";
import { CtaPanel } from "@/components/shared/cta-panel";
import { FeatureList } from "@/components/shared/feature-list";
import { ProcessStep } from "@/components/shared/process-step";
import { SectionHeading } from "@/components/shared/section-heading";
import { ServiceCard } from "@/components/shared/service-card";
import { Badge } from "@/components/ui/badge";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Button, ButtonLink } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Divider } from "@/components/ui/divider";
import {
  Checkbox,
  FieldDescription,
  FieldError,
  FormField,
  Input,
  Label,
  Radio,
  Select,
  Textarea,
} from "@/components/ui/form";
import { IconBox } from "@/components/ui/icon-box";
import { Notice } from "@/components/ui/notice";
import { TextLink } from "@/components/ui/text-link";
import { iconRegistry } from "@/config/icons";
import { routes } from "@/config/routes";
import { processSteps } from "@/content/process";
import { serviceGroups } from "@/content/service-groups";

type ShowcaseSectionProps = {
  children: ReactNode;
  description: string;
  id: string;
  index: number;
  spacing?: SectionProps["spacing"];
  title: string;
  variant?: "default" | "muted";
};

function ShowcaseSection({
  children,
  description,
  id,
  index,
  spacing = "default",
  title,
  variant = "default",
}: ShowcaseSectionProps) {
  return (
    <Section
      aria-labelledby={`${id}-title`}
      id={id}
      spacing={spacing}
      variant={variant}
    >
      <Container size="wide">
        <SectionHeading
          description={description}
          eyebrow={String(index).padStart(2, "0")}
          title={title}
          titleId={`${id}-title`}
        />
        <div className="mt-10 lg:mt-14">{children}</div>
      </Container>
    </Section>
  );
}

const colorTokens = [
  {
    className: "bg-background",
    label: "Tło",
    textClassName: "text-foreground",
    token: "--background",
  },
  {
    className: "bg-surface",
    label: "Powierzchnia",
    textClassName: "text-foreground",
    token: "--surface",
  },
  {
    className: "bg-surface-muted",
    label: "Powierzchnia muted",
    textClassName: "text-foreground",
    token: "--surface-muted",
  },
  {
    className: "bg-surface-inverse",
    label: "Powierzchnia strong",
    textClassName: "text-surface-inverse-foreground",
    token: "--surface-inverse",
  },
  {
    className: "bg-primary",
    label: "Primary",
    textClassName: "text-primary-foreground",
    token: "--primary",
  },
  {
    className: "bg-primary-surface",
    label: "Primary surface",
    textClassName: "text-secondary-foreground",
    token: "--primary-surface",
  },
  {
    className: "bg-accent",
    label: "Accent",
    textClassName: "text-accent-foreground",
    token: "--accent",
  },
  {
    className: "bg-accent-surface",
    label: "Accent surface",
    textClassName: "text-accent-foreground",
    token: "--accent-surface",
  },
] as const;

const functionalColors = [
  {
    className: "border-success-border bg-success-surface",
    dotClassName: "bg-success-strong",
    label: "Success",
    textClassName: "text-success-foreground",
  },
  {
    className: "border-warning-border bg-warning-surface",
    dotClassName: "bg-warning-strong",
    label: "Warning",
    textClassName: "text-warning-foreground",
  },
  {
    className: "border-danger-border bg-danger-surface",
    dotClassName: "bg-danger-strong",
    label: "Error",
    textClassName: "text-danger-foreground",
  },
  {
    className: "border-info-border bg-info-surface",
    dotClassName: "bg-info-strong",
    label: "Information",
    textClassName: "text-info-foreground",
  },
] as const;

const typographySamples = [
  { className: "text-display font-semibold", label: "Display" },
  { className: "text-hero font-semibold", label: "Hero" },
  { className: "text-h1 font-semibold", label: "Heading 1" },
  { className: "text-h2 font-semibold", label: "Heading 2" },
  { className: "text-h3 font-semibold", label: "Heading 3" },
  { className: "text-h4 font-semibold", label: "Heading 4" },
  { className: "text-lead", label: "Lead" },
  { className: "text-body-lg", label: "Body large" },
  { className: "text-body", label: "Body" },
  { className: "text-body-sm", label: "Body small" },
  { className: "text-label font-semibold", label: "Label" },
  { className: "text-caption", label: "Caption" },
  {
    className: "text-overline font-bold uppercase",
    label: "Overline",
  },
] as const;

const spacingSamples = [
  { className: "w-1", label: "4", value: "4 px" },
  { className: "w-2", label: "8", value: "8 px" },
  { className: "w-3", label: "12", value: "12 px" },
  { className: "w-4", label: "16", value: "16 px" },
  { className: "w-6", label: "24", value: "24 px" },
  { className: "w-8", label: "32", value: "32 px" },
  { className: "w-12", label: "48", value: "48 px" },
  { className: "w-16", label: "64", value: "64 px" },
] as const;

const containerSamples = [
  { className: "w-1/2", label: "Text", size: "text" },
  { className: "w-2/3", label: "Content", size: "content" },
  { className: "w-5/6", label: "Page", size: "default" },
  { className: "w-full", label: "Wide", size: "wide" },
] as const;

const cardSamples = [
  { label: "Standard", variant: "standard" },
  { label: "Interactive", variant: "interactive" },
  { label: "Highlighted", variant: "highlighted" },
  { label: "Muted", variant: "muted" },
  { label: "Bordered", variant: "bordered" },
] as const;

const showcasedIcons = [
  {
    icon: iconRegistry.websites,
    label: "Strony",
    size: "large",
    variant: "accent",
  },
  {
    icon: iconRegistry.commerce,
    label: "Commerce",
    size: "medium",
    variant: "primary",
  },
  {
    icon: iconRegistry.marketplace,
    label: "Marketplace",
    size: "medium",
    variant: "outline",
  },
  {
    icon: iconRegistry.camera,
    label: "Zdjęcia",
    size: "medium",
    variant: "neutral",
  },
  {
    icon: iconRegistry.content,
    label: "Treści",
    size: "medium",
    variant: "primary",
  },
  {
    icon: iconRegistry.audit,
    label: "Audyt",
    size: "medium",
    variant: "outline",
  },
  {
    icon: iconRegistry.support,
    label: "Wsparcie",
    size: "small",
    variant: "accent",
  },
] as const;

export function DesignSystemShowcase() {
  return (
    <main>
      <Section spacing="compact" variant="strong">
        <Container size="wide">
          <Breadcrumb
            items={[
              { href: "/", label: "Strona techniczna" },
              { label: "Design system" },
            ]}
            tone="inverse"
          />
          <div className="mt-12 grid items-end gap-10 lg:grid-cols-12">
            <SectionHeading
              className="lg:col-span-9"
              description="Produkcyjny zestaw tokenów, komponentów i reguł, który utrzymuje wspólny język interfejsu od 320 px po duże ekrany. Ta strona jest narzędziem roboczym i nie należy do nawigacji marketingowej."
              eyebrow="OfertaStudio · interfejs 1.0"
              highlight="Flat Modern Premium"
              level={1}
              size="hero"
              title="Design system Flat Modern Premium"
              tone="inverse"
              width="wide"
            />
            <div className="lg:col-span-3 lg:justify-self-end">
              <ButtonLink
                href="/"
                leadingIcon={<ArrowLeft aria-hidden="true" />}
                variant="secondary"
              >
                Wróć na start
              </ButtonLink>
            </div>
          </div>
          <nav aria-label="Sekcje design systemu" className="mt-12">
            <ul className="flex flex-wrap gap-x-5 gap-y-3 border-t border-surface-inverse-border pt-6">
              {[
                ["colors", "Kolory"],
                ["typography", "Typografia"],
                ["layout", "Layout"],
                ["actions", "Akcje"],
                ["cards", "Karty"],
                ["forms", "Formularze"],
                ["feedback", "Komunikaty"],
                ["domain", "Komponenty domenowe"],
              ].map(([href, label]) => (
                <li key={href}>
                  <a
                    className="transition-interactive rounded-[var(--radius-small)] text-body-sm font-semibold text-surface-inverse-muted-foreground underline decoration-surface-inverse-border underline-offset-4 hover:text-surface-inverse-foreground"
                    href={`#${href}`}
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </Container>
      </Section>

      <ShowcaseSection
        description="Semantyczna paleta opiera się na chłodnych neutralach, kobalcie i jednym kontrolowanym akcencie limonkowym. Komponenty nie korzystają z surowych wartości."
        id="colors"
        index={1}
        title="Kolory i powierzchnie"
      >
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {colorTokens.map((color) => (
            <div
              className={`${color.className} ${color.textClassName} flex min-h-36 flex-col justify-between rounded-[var(--radius-card)] border border-border p-5`}
              key={color.token}
            >
              <span className="text-label font-semibold">{color.label}</span>
              <code className="text-caption">{color.token}</code>
            </div>
          ))}
        </div>
        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {functionalColors.map((color) => (
            <div
              className={`${color.className} ${color.textClassName} flex min-h-12 items-center gap-3 rounded-[var(--radius-control)] border px-4 py-3`}
              key={color.label}
            >
              <span
                aria-hidden="true"
                className={`${color.dotClassName} size-2.5 rounded-[var(--radius-round)]`}
              />
              <span className="text-body-sm font-semibold">{color.label}</span>
            </div>
          ))}
        </div>
      </ShowcaseSection>

      <ShowcaseSection
        description="Jedna rodzina Inter buduje różnicę przez skalę, rytm i precyzyjny tracking. Rozmiary display i nagłówków są płynne, ale posiadają kontrolowane granice."
        id="typography"
        index={2}
        title="Typografia"
        variant="muted"
      >
        <Card>
          <CardContent className="divide-y divide-border pt-[var(--space-card-padding)]">
            {typographySamples.map((sample) => (
              <div
                className="grid gap-3 py-6 first:pt-0 last:pb-0 lg:grid-cols-[10rem_minmax(0,1fr)] lg:items-baseline"
                key={sample.label}
              >
                <code className="text-caption text-muted-foreground">
                  {sample.label}
                </code>
                <p className={`${sample.className} min-w-0 text-balance`}>
                  Czytelna oferta prowadzi do właściwej decyzji
                </p>
              </div>
            ))}
          </CardContent>
        </Card>
      </ShowcaseSection>

      <ShowcaseSection
        description="Rytm bazuje na wielokrotnościach 4 px. Kontenery ograniczają długość linii, a responsywna siatka przechodzi od jednej kolumny treści do 12 kolumn konstrukcyjnych."
        id="layout"
        index={3}
        title="Odstępy, kontenery i grid"
      >
        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Skala bazowa</CardTitle>
              <CardDescription>
                Małe wartości służą komponentom; większe budują rytm bloków.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              {spacingSamples.map((sample) => (
                <div
                  className="grid grid-cols-[3rem_1fr_auto] items-center gap-3"
                  key={sample.label}
                >
                  <code className="text-caption text-muted-foreground">
                    {sample.label}
                  </code>
                  <span
                    aria-hidden="true"
                    className={`${sample.className} block h-3 min-w-1 rounded-[var(--radius-small)] bg-primary`}
                  />
                  <span className="text-caption text-muted-foreground">
                    {sample.value}
                  </span>
                </div>
              ))}
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Kontenery</CardTitle>
              <CardDescription>
                Text 46 rem, content 68 rem, page 80 rem i wide 92 rem.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {containerSamples.map((sample) => (
                <div key={sample.size}>
                  <div className="flex justify-between gap-4 text-caption text-muted-foreground">
                    <span>{sample.label}</span>
                    <span>{sample.size}</span>
                  </div>
                  <div
                    className={`${sample.className} mt-2 h-3 rounded-[var(--radius-small)] bg-primary`}
                  />
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
        <div className="mt-6 grid grid-cols-4 gap-2 md:grid-cols-8 lg:grid-cols-12">
          {Array.from({ length: 12 }, (_, index) => (
            <div
              className={
                index > 3
                  ? index > 7
                    ? "hidden min-h-20 items-end rounded-[var(--radius-small)] border border-primary-border bg-primary-surface p-2 text-caption text-secondary-foreground lg:flex"
                    : "hidden min-h-20 items-end rounded-[var(--radius-small)] border border-primary-border bg-primary-surface p-2 text-caption text-secondary-foreground md:flex"
                  : "flex min-h-20 items-end rounded-[var(--radius-small)] border border-primary-border bg-primary-surface p-2 text-caption text-secondary-foreground"
              }
              key={index}
            >
              {index + 1}
            </div>
          ))}
        </div>
      </ShowcaseSection>

      <ShowcaseSection
        description="Akcje mają jednoznaczną hierarchię, cel minimum 44 px w standardowym rozmiarze i wspólny focus ring. Link pozostaje linkiem, a operacja pozostaje przyciskiem."
        id="actions"
        index={4}
        title="Przyciski, badge i linki"
        variant="muted"
      >
        <div className="grid gap-6 xl:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Warianty przycisków</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-wrap items-center gap-3">
              <Button trailingIcon={<ArrowRight aria-hidden="true" />}>
                Primary
              </Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="link">Link button</Button>
              <Button disabled>Disabled</Button>
              <Button loading>Zapisywanie</Button>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Rozmiary i ikony</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-wrap items-center gap-3">
              <Button size="small">Small</Button>
              <Button size="medium">Medium</Button>
              <Button size="large">Large</Button>
              <Button aria-label="Szukaj" size="icon" variant="outline">
                <Search aria-hidden="true" />
              </Button>
              <Button leadingIcon={<Mail aria-hidden="true" />}>
                Napisz do nas
              </Button>
            </CardContent>
            <CardFooter>
              <Button fullWidth>Pełna szerokość</Button>
            </CardFooter>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Badge</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-2">
              <Badge>Neutral</Badge>
              <Badge variant="primary">Primary</Badge>
              <Badge variant="accent">Accent</Badge>
              <Badge variant="success">Success</Badge>
              <Badge variant="warning">Warning</Badge>
              <Badge variant="information">Information</Badge>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Linki tekstowe</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-start gap-4">
              <TextLink href="#actions">Link standardowy</TextLink>
              <TextLink href="#actions" variant="muted">
                Link wyciszony
              </TextLink>
              <TextLink href="#actions" variant="arrow">
                Link z kierunkiem
              </TextLink>
              <TextLink href="#actions" variant="standalone">
                Link samodzielny
              </TextLink>
            </CardContent>
          </Card>
        </div>
      </ShowcaseSection>

      <ShowcaseSection
        description="Karty są przede wszystkim powierzchnią i obramowaniem. Cień pojawia się dopiero dla elementu interaktywnego lub uniesionego."
        id="cards"
        index={5}
        title="Karty, nagłówki i separatory"
      >
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
          {cardSamples.map((sample) => (
            <Card
              className="h-full"
              key={sample.variant}
              variant={sample.variant}
            >
              <CardHeader>
                <CardTitle>{sample.label}</CardTitle>
                <CardDescription>
                  Jeden wariant, jedna czytelna odpowiedzialność.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-body-sm">Treść przykładowej karty.</p>
              </CardContent>
            </Card>
          ))}
        </div>
        <Divider className="my-12" />
        <SectionHeading
          action={
            <ButtonLink href="#forms" variant="outline">
              Zobacz formularze
            </ButtonLink>
          }
          description="Kontrolowane wyróżnienie fragmentu tytułu nie wymaga ręcznego dodawania spanów w każdej sekcji."
          eyebrow="Section heading"
          highlight="jedną decyzję"
          title="Każda sekcja prowadzi do jednej decyzji"
          width="wide"
        />
        <div className="mt-12">
          <SectionHeading
            align="center"
            description="Wariant centralny stosujemy oszczędnie, gdy treść nie wymaga asymetrycznej kompozycji."
            eyebrow="Wyrównanie center"
            size="h3"
            title="Hierarchia bez dekoracyjnego nadmiaru"
          />
        </div>
      </ShowcaseSection>

      <ShowcaseSection
        description="Kontrolki są natywne, etykietowane i gotowe na jawne relacje aria-describedby. Stan błędu łączy kolor, komunikat i aria-invalid."
        id="forms"
        index={6}
        title="Formularze"
        variant="muted"
      >
        <Card>
          <CardContent className="grid gap-8 pt-[var(--space-card-padding)] lg:grid-cols-2">
            <div className="grid content-start gap-6">
              <FormField>
                <Label htmlFor="showcase-name" requiredIndicator>
                  Imię i nazwisko
                </Label>
                <Input
                  autoComplete="name"
                  id="showcase-name"
                  placeholder="Jak możemy się do ciebie zwracać?"
                  required
                />
                <FieldDescription>
                  Użyjemy go wyłącznie w odpowiedzi na zapytanie.
                </FieldDescription>
              </FormField>
              <FormField>
                <Label htmlFor="showcase-email-filled">E-mail — filled</Label>
                <Input
                  defaultValue="kontakt@firma.pl"
                  id="showcase-email-filled"
                  type="email"
                />
              </FormField>
              <FormField>
                <Label htmlFor="showcase-success">Adres strony — success</Label>
                <Input
                  defaultValue="https://firma.pl"
                  id="showcase-success"
                  validationState="success"
                  type="url"
                />
                <FieldDescription className="text-success-foreground">
                  Adres ma poprawny format.
                </FieldDescription>
              </FormField>
              <FormField invalid>
                <Label htmlFor="showcase-error">Budżet projektu — error</Label>
                <Input
                  aria-describedby="showcase-error-message"
                  id="showcase-error"
                  validationState="error"
                />
                <FieldError id="showcase-error-message">
                  Podaj zakres lub wybierz „nie wiem”.
                </FieldError>
              </FormField>
              <FormField>
                <Label htmlFor="showcase-disabled">Pole wyłączone</Label>
                <Input
                  defaultValue="Niedostępne"
                  disabled
                  id="showcase-disabled"
                />
              </FormField>
            </div>
            <div className="grid content-start gap-6">
              <FormField>
                <Label htmlFor="showcase-service">Obszar projektu</Label>
                <Select defaultValue="shoper" id="showcase-service">
                  <option value="website">Strona internetowa</option>
                  <option value="shoper">Sklep Shoper</option>
                  <option value="marketplace">Allegro i marketplace</option>
                </Select>
              </FormField>
              <FormField>
                <Label htmlFor="showcase-message">Opisz sytuację</Label>
                <Textarea
                  id="showcase-message"
                  placeholder="Co działa obecnie i co wymaga zmiany?"
                />
              </FormField>
              <fieldset className="grid gap-3">
                <legend className="text-label font-semibold">
                  Preferowany kontakt
                </legend>
                <label className="flex min-h-11 cursor-pointer items-center gap-3 rounded-[var(--radius-control)] border border-border px-3 py-2 text-body-sm">
                  <Radio defaultChecked name="contact-method" value="email" />
                  E-mail
                </label>
                <label className="flex min-h-11 cursor-pointer items-center gap-3 rounded-[var(--radius-control)] border border-border px-3 py-2 text-body-sm">
                  <Radio name="contact-method" value="phone" />
                  Telefon
                </label>
              </fieldset>
              <label className="flex min-h-11 cursor-pointer items-start gap-3 rounded-[var(--radius-control)] border border-border px-3 py-2.5 text-body-sm">
                <Checkbox defaultChecked />
                <span>Potwierdzam zapoznanie się z zakresem przykładu.</span>
              </label>
            </div>
          </CardContent>
        </Card>
      </ShowcaseSection>

      <ShowcaseSection
        description="Komunikat przekazuje sens ikoną, tytułem i tekstem — nigdy wyłącznie kolorem. Breadcrumb zachowuje semantyczną listę i aria-current."
        id="feedback"
        index={7}
        title="Komunikaty i nawigacja kontekstowa"
      >
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="grid gap-3">
            <Notice title="Informacja" variant="information">
              Zakres zostanie potwierdzony przed rozpoczęciem prac.
            </Notice>
            <Notice title="Gotowe" variant="success">
              Dane zostały zapisane i są gotowe do weryfikacji.
            </Notice>
            <Notice title="Wymaga uwagi" variant="warning">
              Brakuje materiałów potrzebnych do przygotowania wyceny.
            </Notice>
            <Notice title="Nie udało się zapisać" variant="error">
              Sprawdź pola oznaczone komunikatem i spróbuj ponownie.
            </Notice>
            <Notice title="Neutralna uwaga">
              Ten element nie wymaga natychmiastowego działania.
            </Notice>
          </div>
          <Card>
            <CardHeader>
              <CardTitle>Breadcrumb</CardTitle>
              <CardDescription>
                Długa nazwa może przejść do kolejnego wiersza bez poszerzania
                strony.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Breadcrumb
                items={[
                  { href: "/", label: "Strona główna" },
                  { href: "/sklepy-internetowe", label: "Sklepy i Shoper" },
                  {
                    label:
                      "Personalizacja i rozwój bardzo rozbudowanego szablonu Shoper",
                  },
                ]}
              />
              <Divider className="my-8" strength="strong" />
              <div className="flex h-12 items-stretch gap-6">
                <span className="text-body-sm text-muted-foreground">
                  Separator pionowy
                </span>
                <Divider orientation="vertical" />
                <span className="text-body-sm">Drugi blok treści</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </ShowcaseSection>

      <ShowcaseSection
        description="Lucide pozostaje jedynym źródłem ikon. Rejestr importuje siedem konkretnych symboli odpowiadających modelowi treści, bez dynamicznego ładowania całej biblioteki."
        id="icons"
        index={8}
        title="Ikony i listy"
        variant="muted"
      >
        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <CardContent className="grid grid-cols-2 gap-6 pt-[var(--space-card-padding)] sm:grid-cols-4">
              {showcasedIcons.map((item) => (
                <div
                  className="flex flex-col items-center gap-3 text-center"
                  key={item.label}
                >
                  <IconBox
                    icon={item.icon}
                    size={item.size}
                    variant={item.variant}
                  />
                  <span className="text-caption text-muted-foreground">
                    {item.label}
                  </span>
                </div>
              ))}
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Listy korzyści i cech</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-8 sm:grid-cols-2">
              <FeatureList
                columns={2}
                items={[
                  "Czytelny zakres usługi",
                  "Jawne odpowiedzialności",
                  "Dostępny następny krok",
                ]}
              />
              <FeatureList
                items={[
                  "Strategia i treść",
                  "Design oraz UX",
                  "Wdrożenie techniczne",
                ]}
                variant="bullet"
              />
            </CardContent>
          </Card>
        </div>
      </ShowcaseSection>

      <ShowcaseSection
        description="Komponenty domenowe prezentują istniejące dane etapu 2. Nie zawierają fikcyjnych metryk, realizacji ani opinii."
        id="domain"
        index={9}
        spacing="spacious"
        title="Proces, usługi i CTA"
      >
        <SectionHeading
          description="Karta kroku pokazuje kolejność, działanie i rezultat bez dodatkowej interakcji."
          eyebrow="ProcessStep"
          size="h3"
          title="Pierwsze trzy etapy współpracy"
        />
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {processSteps.slice(0, 3).map((step) => (
            <ProcessStep key={step.id} step={step} />
          ))}
        </div>
        <Divider className="my-14" />
        <SectionHeading
          description="ServiceCard pobiera nazwę, opis, ikonę i adres z typowanego filaru usług."
          eyebrow="ServiceCard"
          size="h3"
          title="Trzy przykładowe filary"
        />
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {serviceGroups.slice(0, 3).map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
        <div className="mt-14 grid gap-6">
          <CtaPanel
            description="Wersja jasna sprawdza się wewnątrz standardowej sekcji i nie konkuruje z głównym CTA strony."
            eyebrow="CtaPanel · default"
            primaryAction={
              <ButtonLink
                href={routes.contact}
                trailingIcon={<ArrowRight aria-hidden="true" />}
              >
                Porozmawiajmy o projekcie
              </ButtonLink>
            }
            secondaryAction={
              <ButtonLink href={routes.brief} variant="outline">
                Opisz swoją sytuację
              </ButtonLink>
            }
            title="Jeden panel, jeden jasny następny krok"
          />
          <CtaPanel
            description="Wersja strong tworzy świadomą zmianę rytmu bez gradientu, rozmycia i dekoracji bez funkcji."
            eyebrow="CtaPanel · strong"
            primaryAction={
              <ButtonLink href="/" variant="secondary">
                Wróć na stronę techniczną
              </ButtonLink>
            }
            title="Kontrastowa powierzchnia zamyka ważny blok"
            variant="strong"
          />
        </div>
      </ShowcaseSection>

      <ShowcaseSection
        description="Przykład składa się do jednej kolumny na małym ekranie, dwóch na tablecie i asymetrycznej siatki 12-kolumnowej na desktopie."
        id="responsive"
        index={10}
        title="Responsywne układy"
        variant="muted"
      >
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-12">
          <Card className="lg:col-span-7" variant="highlighted">
            <CardHeader>
              <Badge className="w-fit" variant="accent">
                7 / 12 kolumn
              </Badge>
              <CardTitle className="mt-4">
                Główna treść zachowuje priorytet
              </CardTitle>
              <CardDescription>
                Na mobile kolejność DOM pozostaje logiczna i nie zależy od
                położenia wizualnego.
              </CardDescription>
            </CardHeader>
          </Card>
          <Card className="lg:col-span-5">
            <CardHeader>
              <Badge className="w-fit">5 / 12 kolumn</Badge>
              <CardTitle className="mt-4">Kontekst pomocniczy</CardTitle>
              <CardDescription>
                Moduł zachowuje pełną szerokość na ekranach 320 px.
              </CardDescription>
            </CardHeader>
          </Card>
          <Card className="md:col-span-2 lg:col-span-12" variant="bordered">
            <CardContent className="flex flex-col gap-4 pt-[var(--space-card-padding)] sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="font-semibold">Pasek pełnej szerokości</p>
                <p className="mt-1 text-body-sm text-muted-foreground">
                  CTA układa się pionowo, gdy brakuje miejsca.
                </p>
              </div>
              <Button leadingIcon={<Check aria-hidden="true" />} size="large">
                Potwierdź kierunek
              </Button>
            </CardContent>
          </Card>
        </div>
      </ShowcaseSection>
    </main>
  );
}
