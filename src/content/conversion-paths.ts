import { routes } from "../config/routes.ts";
import type { ConversionPath } from "../types/content.ts";

export const conversionPaths = [
  {
    id: "needs-website",
    name: "Klient potrzebuje strony",
    intent:
      "Zbudować pierwszą profesjonalną stronę albo zastąpić obecną wersję.",
    steps: [
      routes.home,
      routes.websites,
      routes.companyWebsites,
      routes.projects,
      routes.contact,
    ],
    barriers: [
      "brak gotowej treści i zakresu",
      "obawa przed generycznym szablonem",
      "niejasny koszt oraz rola klienta",
    ],
    trustSignals: [
      "realizacja o podobnym zakresie",
      "jasny proces i odpowiedzialności",
      "przykład struktury strony oraz elementów wyceny",
    ],
    primaryCtaId: "project-conversation",
    secondaryCtaId: "view-projects",
    requiredInformation: [
      "cel strony",
      "zakres usług firmy",
      "stan obecnych treści i materiałów",
      "oczekiwany termin oraz kontekst budżetowy",
    ],
  },
  {
    id: "shoper-owner",
    name: "Klient ma sklep Shoper",
    intent: "Uruchomić, skonfigurować albo poprawić działający sklep Shoper.",
    steps: [
      routes.home,
      routes.stores,
      routes.shoperAudit,
      routes.projects,
      routes.brief,
    ],
    barriers: [
      "ryzyko zmian w działającym sklepie",
      "niepewność, czy problem dotyczy konfiguracji, szablonu czy UX",
      "obawa o ograniczenia platformy",
    ],
    trustSignals: [
      "konkretna specjalizacja Shoper",
      "audyt rozdzielający rodzaje problemów",
      "proces kontroli i bezpiecznego wdrożenia",
    ],
    primaryCtaId: "free-diagnosis",
    secondaryCtaId: "view-projects",
    requiredInformation: [
      "adres i etap rozwoju sklepu",
      "obecny szablon i modyfikacje",
      "najważniejsze problemy operacyjne lub UX",
      "aplikacje oraz integracje istotne dla zakresu",
    ],
  },
  {
    id: "allegro-seller",
    name: "Sprzedawca Allegro",
    intent:
      "Poprawić istniejącą ofertę albo przygotować nowy standard dla katalogu.",
    steps: [
      routes.home,
      routes.marketplace,
      routes.allegroAudit,
      routes.allegroOfferOptimization,
      routes.brief,
    ],
    barriers: [
      "oczekiwanie gwarantowanego wzrostu sprzedaży",
      "niejasna skala katalogu i dostępność materiałów",
      "brak rozróżnienia między audytem a wykonaniem zmian",
    ],
    trustSignals: [
      "przykłady galerii i opis decyzji",
      "jasny rezultat audytu",
      "spójny proces zdjęć, grafik i treści",
    ],
    primaryCtaId: "free-diagnosis",
    secondaryCtaId: "view-projects",
    requiredInformation: [
      "linki do reprezentatywnych ofert",
      "liczba produktów i wariantów",
      "dostępne zdjęcia, grafiki i dane produktowe",
      "zakres publikacji po stronie klienta lub studia",
    ],
  },
  {
    id: "unsure-need",
    name: "Klient nie wie, czego potrzebuje",
    intent: "Uporządkować problem i wybrać pierwszy sensowny krok.",
    steps: [routes.home, routes.brief, routes.salesConsulting, routes.contact],
    barriers: [
      "brak języka do opisania problemu",
      "obawa przed sprzedażą zbyt dużego zakresu",
      "niepewność, jakie materiały przygotować",
    ],
    trustSignals: [
      "krótki brief problemowy zamiast technicznej specyfikacji",
      "jasne rozróżnienie diagnozy od pełnego audytu",
      "rekomendacja następnego kroku bez gwarantowanych wyników",
    ],
    primaryCtaId: "need-guidance",
    secondaryCtaId: "contact",
    requiredInformation: [
      "obecna sytuacja",
      "najważniejszy cel biznesowy",
      "kanały i materiały już dostępne",
      "największa trudność z perspektywy właściciela",
    ],
  },
  {
    id: "ongoing-partnership",
    name: "Klient szuka stałej współpracy",
    intent: "Zapewnić rozwój i wsparcie jednego kanału albo całego ekosystemu.",
    steps: [
      routes.offer,
      routes.auditsDevelopment,
      routes.ecosystemCare,
      routes.contact,
    ],
    barriers: [
      "niejasna dostępność i czas reakcji",
      "obawa przed abonamentem bez konkretnego zakresu",
      "brak zasad priorytetyzacji zadań",
    ],
    trustSignals: [
      "jawny model backlogu i priorytetów",
      "zakres odpowiedzialności oraz wyłączenia",
      "ustalony sposób raportowania i akceptacji prac",
    ],
    primaryCtaId: "project-conversation",
    secondaryCtaId: "contact",
    requiredInformation: [
      "obsługiwane kanały i technologie",
      "typowa liczba oraz rodzaj zadań",
      "oczekiwana dostępność",
      "obecni dostawcy i podział odpowiedzialności",
    ],
  },
] as const satisfies readonly ConversionPath[];
