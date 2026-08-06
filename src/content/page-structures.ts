import { routes } from "../config/routes.ts";
import type {
  PageSectionPlan,
  ServicePageSectionPlan,
} from "../types/content.ts";

export const homepageSections = [
  {
    id: "hero",
    order: 1,
    name: "Hero",
    purpose:
      "Natychmiast wyjaśnić, czym jest OfertaStudio i jaki zakres problemu obejmuje.",
    keyMessage:
      "Łączymy stronę, sklep i prezentację oferty w jeden system wspierający sprzedaż online.",
    contentFormat:
      "Nagłówek, krótkie doprecyzowanie, dwa CTA i oszczędny motyw wizualny.",
    ctaIds: ["project-conversation", "view-projects"],
    linkedHrefs: [routes.contact, routes.projects],
    conversionRole: "Orientacja i rozpoczęcie głównej ścieżki konwersji.",
  },
  {
    id: "proof",
    order: 2,
    name: "Krótki proof bar",
    purpose:
      "Szybko pokazać zakres praktycznych specjalizacji bez niezweryfikowanych liczb.",
    keyMessage:
      "Strategia, UX, Shoper, marketplace i treści produktowe pracują razem.",
    contentFormat:
      "Zweryfikowane kompetencje lub fakty; docelowo prawdziwe logotypy i dowody.",
    ctaIds: [],
    linkedHrefs: [],
    conversionRole:
      "Zmniejszenie obawy przed przypadkowym wykonawcą jednej kompetencji.",
  },
  {
    id: "service-pillars",
    order: 3,
    name: "Główne obszary usług",
    purpose:
      "Pozwolić użytkownikowi wybrać jeden z pięciu zrozumiałych punktów wejścia.",
    keyMessage:
      "Możesz zacząć od konkretnego kanału albo od diagnozy całego systemu.",
    contentFormat:
      "Pięć filarów z problemem klienta, krótkim zakresem i linkiem opisowym.",
    ctaIds: [],
    linkedHrefs: [
      routes.websites,
      routes.stores,
      routes.marketplace,
      routes.productPresentation,
      routes.auditsDevelopment,
    ],
    conversionRole:
      "Segmentacja ruchu według potrzeby, nie znajomości terminologii branżowej.",
  },
  {
    id: "client-problems",
    order: 4,
    name: "Problemy klientów",
    purpose:
      "Pomóc użytkownikowi rozpoznać własną sytuację przed wyborem usługi.",
    keyMessage:
      "Niespójna strona, sklep i oferta to zwykle jeden problem prezentacji sprzedażowej.",
    contentFormat:
      "Krótkie scenariusze problemowe z kierunkiem dalszej ścieżki.",
    ctaIds: ["need-guidance"],
    linkedHrefs: [routes.brief],
    conversionRole:
      "Konwersja osób, które nie potrafią jeszcze nazwać potrzebnego zakresu.",
  },
  {
    id: "shoper-specialization",
    order: 5,
    name: "Specjalizacja Shoper",
    purpose:
      "Wyeksponować platformową kompetencję odróżniającą studio od ogólnej agencji.",
    keyMessage:
      "Znamy Shoper od konfiguracji po szablon, mobile, UX i dalszą opiekę.",
    contentFormat:
      "Konkretny zakres specjalizacji i trzy typowe sytuacje właściciela sklepu.",
    ctaIds: ["free-diagnosis"],
    linkedHrefs: [routes.shoperStores, routes.shoperAudit],
    conversionRole:
      "Zwiększenie trafności i zaufania ruchu zainteresowanego Shoperem.",
  },
  {
    id: "process",
    order: 6,
    name: "Sposób pracy",
    purpose:
      "Pokazać odpowiedzialność, etapy i rolę klienta bez przeładowania szczegółami.",
    keyMessage:
      "Najpierw diagnozujemy i porządkujemy zakres, potem projektujemy i wdrażamy.",
    contentFormat: "Pięć kroków procesu z rezultatem każdego etapu.",
    ctaIds: [],
    linkedHrefs: [routes.process],
    conversionRole:
      "Redukcja ryzyka projektowego i obawy przed chaotyczną współpracą.",
  },
  {
    id: "projects",
    order: 7,
    name: "Wybrane realizacje",
    purpose:
      "Udowodnić sposób myślenia i jakość pracy na prawdziwych przykładach.",
    keyMessage:
      "Pokazujemy problem, decyzje i efekt — nie tylko końcowy obraz.",
    contentFormat:
      "Maksymalnie kilka zweryfikowanych projektów z kategorią i zakresem.",
    ctaIds: ["view-projects"],
    linkedHrefs: [routes.projects],
    conversionRole: "Dowód kompetencji przed przejściem do kontaktu.",
  },
  {
    id: "outcomes",
    order: 8,
    name: "Efekty współpracy",
    purpose:
      "Przetłumaczyć zakres usług na rezultaty operacyjne i sprzedażowe.",
    keyMessage:
      "Rezultatem jest większa czytelność, spójność i kontrola rozwoju kanałów.",
    contentFormat:
      "Korzyści oparte na dostarczanych elementach, bez gwarancji i fikcyjnych procentów.",
    ctaIds: [],
    linkedHrefs: [routes.offer],
    conversionRole:
      "Uzasadnienie wartości szerszej niż samo wykonanie techniczne.",
  },
  {
    id: "audiences",
    order: 9,
    name: "Dla kogo pracujemy",
    purpose:
      "Potwierdzić dopasowanie dla sześciu kluczowych sytuacji biznesowych.",
    keyMessage:
      "Dobieramy zakres do dojrzałości firmy, kanałów i materiałów, które już posiada.",
    contentFormat: "Segmenty opisane przez sytuację i potrzebny punkt wejścia.",
    ctaIds: ["need-guidance"],
    linkedHrefs: [routes.brief],
    conversionRole:
      "Samokwalifikacja użytkownika i ograniczenie nietrafnych zapytań.",
  },
  {
    id: "collaboration-models",
    order: 10,
    name: "Oferta i modele współpracy",
    purpose: "Wyjaśnić różnicę między projektem, audytem i stałą opieką.",
    keyMessage:
      "Zakres może być jednorazowym wdrożeniem, diagnozą albo zaplanowanym rozwojem.",
    contentFormat:
      "Trzy modele z zasadą wyceny, typowym zakresem i ograniczeniami.",
    ctaIds: ["project-conversation"],
    linkedHrefs: [routes.offer, routes.ecosystemCare],
    conversionRole: "Urealnienie oczekiwań przed formularzem lub rozmową.",
  },
  {
    id: "audit",
    order: 11,
    name: "Audyt lub diagnoza",
    purpose:
      "Dać bezpieczny punkt wejścia osobie z działającym, ale nierozpoznanym problemem.",
    keyMessage:
      "Jeśli nie wiesz, co poprawić najpierw, zacznij od krótkiej diagnozy potrzeb.",
    contentFormat:
      "Rozróżnienie bezpłatnej kwalifikacji od płatnego, pogłębionego audytu.",
    ctaIds: ["free-diagnosis"],
    linkedHrefs: [routes.brief, routes.auditsDevelopment],
    conversionRole:
      "Obniżenie progu wejścia bez rozdawania pełnego audytu za darmo.",
  },
  {
    id: "faq",
    order: 12,
    name: "FAQ",
    purpose:
      "Odpowiedzieć na powtarzalne bariery dotyczące zakresu, ceny i współpracy.",
    keyMessage:
      "Zakres i odpowiedzialności ustalamy przed wyceną i rozpoczęciem pracy.",
    contentFormat:
      "Pięć do ośmiu konkretnych pytań z linkami do właściwych podstron.",
    ctaIds: ["contact"],
    linkedHrefs: [routes.contact, routes.offer],
    conversionRole: "Usunięcie ostatnich obiekcji przed kontaktem.",
  },
  {
    id: "final-cta",
    order: 13,
    name: "Końcowe CTA",
    purpose: "Zamknąć stronę jednym jasnym kolejnym krokiem.",
    keyMessage: "Opowiedz nam o projekcie, celu i obecnej sytuacji.",
    contentFormat: "Krótki komunikat, główne CTA i pomocniczy link do briefu.",
    ctaIds: ["project-conversation", "need-guidance"],
    linkedHrefs: [routes.contact, routes.brief],
    conversionRole: "Główna konwersja po przejściu pełnej narracji strony.",
  },
] as const satisfies readonly PageSectionPlan[];

export const servicePageSections = [
  {
    id: "hero",
    order: 1,
    name: "Hero usługi",
    requirement: "required",
    purpose: "Nazwać usługę, odbiorcę i oczekiwany kierunek zmiany.",
    contentGuidance:
      "H1, krótkie doprecyzowanie, główne CTA i jedno zdanie kwalifikujące.",
  },
  {
    id: "problem",
    order: 2,
    name: "Problem klienta",
    requirement: "required",
    purpose: "Pokazać realną sytuację, którą rozwiązuje usługa.",
    contentGuidance:
      "Objawy, konsekwencje i moment, w którym warto działać; bez straszenia.",
  },
  {
    id: "outcome",
    order: 3,
    name: "Oczekiwany rezultat",
    requirement: "required",
    purpose: "Przetłumaczyć pracę na konkretny rezultat dla klienta.",
    contentGuidance:
      "Co klient otrzymuje i co będzie mógł zrobić po zakończeniu zakresu.",
  },
  {
    id: "scope",
    order: 4,
    name: "Zakres usługi",
    requirement: "required",
    purpose: "Wyjaśnić elementy, odpowiedzialności i granice oferty.",
    contentGuidance:
      "Grupy prac, dane wejściowe i jawne elementy spoza standardowego zakresu.",
  },
  {
    id: "process",
    order: 5,
    name: "Proces",
    requirement: "required",
    purpose: "Pokazać etapy właściwe dla danej usługi i punkty decyzji.",
    contentGuidance:
      "Od trzech do pięciu kroków; każdy z rezultatem i rolą klienta.",
  },
  {
    id: "differentiators",
    order: 6,
    name: "Wyróżniki OfertaStudio",
    requirement: "required",
    purpose:
      "Wyjaśnić znaczenie połączenia strategii, treści, designu i technologii.",
    contentGuidance:
      "Tylko wyróżniki istotne dla tej usługi, poparte procesem lub dowodem.",
  },
  {
    id: "applications",
    order: 7,
    name: "Przykłady zastosowań",
    requirement: "conditional",
    purpose:
      "Pomóc rozpoznać wariant usługi odpowiedni dla konkretnej sytuacji.",
    contentGuidance:
      "Scenariusze, nie fikcyjne case studies ani generyczne branże.",
    condition:
      "Dodaj, gdy usługa ma co najmniej dwa wyraźnie różne scenariusze zakupu.",
  },
  {
    id: "projects",
    order: 8,
    name: "Powiązane realizacje",
    requirement: "conditional",
    purpose: "Pokazać prawdziwy dowód wykonania podobnego zakresu.",
    contentGuidance:
      "Tylko zweryfikowane projekty z opisanym zakresem i zgodą na publikację.",
    condition:
      "Renderuj wyłącznie, gdy istnieje co najmniej jedna adekwatna realizacja.",
  },
  {
    id: "pricing",
    order: 9,
    name: "Pakiety lub sposób wyceny",
    requirement: "required",
    purpose:
      "Wyjaśnić, od czego zależy inwestycja i co jest potrzebne do wyceny.",
    contentGuidance:
      "Pakiety tylko dla powtarzalnego zakresu; w pozostałych przypadkach model wyceny.",
  },
  {
    id: "faq",
    order: 10,
    name: "FAQ usługi",
    requirement: "required",
    purpose: "Usunąć obiekcje specyficzne dla usługi.",
    contentGuidance:
      "Od trzech do sześciu pytań, bez powtarzania całych sekcji strony.",
  },
  {
    id: "related-services",
    order: 11,
    name: "Powiązane usługi",
    requirement: "required",
    purpose: "Pokazać logiczny następny krok, uzupełnienie lub alternatywę.",
    contentGuidance:
      "Maksymalnie trzy relacje z krótkim uzasadnieniem, dlaczego są istotne.",
  },
  {
    id: "final-cta",
    order: 12,
    name: "Końcowe CTA",
    requirement: "required",
    purpose: "Prowadzić do rozmowy, briefu albo adekwatnego audytu.",
    contentGuidance:
      "Jedno CTA główne i najwyżej jedno pomocnicze, zgodne z dojrzałością intencji.",
  },
] as const satisfies readonly ServicePageSectionPlan[];
