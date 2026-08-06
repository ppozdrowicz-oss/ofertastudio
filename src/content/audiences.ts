import type { AudienceSegment } from "../types/content.ts";

export const audiences = [
  {
    id: "local-service-businesses",
    name: "Lokalne firmy usługowe",
    summary:
      "Firmy, które potrzebują pierwszej profesjonalnej strony albo chcą zastąpić serwis niespójny z obecną ofertą.",
    primaryProblem:
      "Strona nie buduje wiarygodności, nie wyjaśnia usług albo utrudnia szybki kontakt z urządzenia mobilnego.",
    needs: [
      "czytelna prezentacja usług i obszaru działania",
      "strona firmowa lub modernizacja obecnej",
      "formularz i widoczne dane kontaktowe",
      "fundament lokalnego SEO",
    ],
    purchaseConcerns: [
      "brak gotowych treści i zdjęć",
      "obawa przed ukrytymi kosztami",
      "niepewność, kto będzie aktualizować stronę",
      "ryzyko otrzymania generycznego szablonu",
    ],
    expectedOutcome:
      "Profesjonalna strona, która porządkuje ofertę, wzmacnia wiarygodność i prowadzi do kontaktu.",
    entryPoint: {
      kind: "service",
      id: "company-websites",
    },
    salesArgument:
      "Łączymy strukturę oferty, treść, UX i wdrożenie, dzięki czemu strona nie jest tylko wizytówką.",
    ctaId: "project-conversation",
    priority: "primary",
  },
  {
    id: "small-medium-commerce",
    name: "Małe i średnie firmy handlowe",
    summary:
      "Producenci, dystrybutorzy i sprzedawcy porządkujący katalog produktów oraz sprzedaż w kilku kanałach.",
    primaryProblem:
      "Sklep, katalog i materiały produktowe rozwijały się niezależnie, przez co trudno nimi zarządzać i prezentować ofertę spójnie.",
    needs: [
      "sklep lub rozwój istniejącego kanału",
      "uporządkowana architektura katalogu",
      "lepsze karty i galerie produktów",
      "spójność sklepu, strony i marketplace",
    ],
    purchaseConcerns: [
      "przerwa lub ryzyko podczas zmian w działającym sklepie",
      "niejasny podział odpowiedzialności za dane i integracje",
      "trudność w skalowaniu materiałów na większy katalog",
      "brak mierzalnego zakresu projektu",
    ],
    expectedOutcome:
      "Czytelny system sprzedaży z uporządkowanym katalogiem i materiałami możliwymi do rozwijania.",
    entryPoint: {
      kind: "group",
      id: "stores-shoper",
    },
    salesArgument:
      "Jedno studio może połączyć sklep, UX, materiały produktowe i wdrożenie zamiast rozdzielać je między wykonawców.",
    ctaId: "project-conversation",
    priority: "primary",
  },
  {
    id: "shoper-store-owners",
    name: "Właściciele sklepów Shoper",
    summary:
      "Firmy uruchamiające Shoper albo rozwijające sklep, którego konfiguracja, szablon lub mobile wymagają poprawy.",
    primaryProblem:
      "Sklep działa technicznie, ale bazowy szablon, ustawienia lub ścieżka zakupowa ograniczają jego czytelność i rozwój.",
    needs: [
      "wdrożenie lub konfiguracja Shopera",
      "personalizacja szablonu",
      "poprawa wersji mobilnej i UX",
      "opieka oraz kolejne usprawnienia",
    ],
    purchaseConcerns: [
      "ryzyko uszkodzenia działającego sklepu",
      "ograniczenia platformy i aplikacji",
      "utrata wcześniejszych modyfikacji szablonu",
      "brak wsparcia po wdrożeniu",
    ],
    expectedOutcome:
      "Sklep Shoper dopasowany do marki i procesu sprzedaży, z jasnym planem dalszego rozwoju.",
    entryPoint: {
      kind: "group",
      id: "stores-shoper",
    },
    salesArgument:
      "OfertaStudio łączy praktyczną znajomość Shopera z UX, treścią i prezentacją produktu.",
    ctaId: "free-diagnosis",
    priority: "primary",
  },
  {
    id: "marketplace-sellers",
    name: "Sprzedawcy Allegro i OLX",
    summary:
      "Sprzedawcy, których oferty wymagają lepszej galerii, opisu, struktury albo spójnego standardu dla katalogu.",
    primaryProblem:
      "Oferta pokazuje produkt fragmentarycznie, a zdjęcia, grafiki i opis nie tworzą jednej argumentacji sprzedażowej.",
    needs: [
      "audyt lub optymalizacja istniejących ofert",
      "tworzenie ofert od podstaw",
      "zdjęcia, infografiki i opisy",
      "standard pracy dla większego katalogu",
    ],
    purchaseConcerns: [
      "brak gwarancji wzrostu sprzedaży",
      "duża liczba produktów i koszt skali",
      "ryzyko niespójności między ofertami",
      "niejasna odpowiedzialność za publikację i dane produktowe",
    ],
    expectedOutcome:
      "Czytelne, spójne oferty i materiały, które można konsekwentnie rozwijać w katalogu.",
    entryPoint: {
      kind: "service",
      id: "allegro-audit",
    },
    salesArgument:
      "Zaczynamy od diagnozy i łączymy kompetencje marketplace z produkcją zdjęć, grafik i treści.",
    ctaId: "free-diagnosis",
    priority: "primary",
  },
  {
    id: "online-sales-starters",
    name: "Firmy rozpoczynające sprzedaż internetową",
    summary:
      "Właściciele produktów lub usług, którzy potrzebują wybrać kanał, zakres i kolejność działań przed inwestycją.",
    primaryProblem:
      "Nie wiedzą, czy zacząć od strony, sklepu, marketplace czy materiałów produktowych i jak połączyć te decyzje.",
    needs: [
      "diagnoza modelu i priorytetów",
      "wybór pierwszego kanału sprzedaży",
      "plan treści i materiałów",
      "realistyczna kolejność wdrożenia",
    ],
    purchaseConcerns: [
      "zakup zbyt dużego rozwiązania na start",
      "brak wiedzy technicznej i procesowej",
      "nieprzewidziane zadania po stronie klienta",
      "uzależnienie od jednego wykonawcy",
    ],
    expectedOutcome:
      "Jasny punkt startowy i plan dojścia od produktu lub usługi do działającego kanału sprzedaży.",
    entryPoint: {
      kind: "service",
      id: "sales-consulting",
    },
    salesArgument:
      "Najpierw porządkujemy decyzje i zależności, a dopiero później rekomendujemy zakres wdrożenia.",
    ctaId: "need-guidance",
    priority: "secondary",
  },
  {
    id: "inconsistent-sales-ecosystem",
    name: "Firmy z niespójnym ekosystemem sprzedaży",
    summary:
      "Firmy posiadające stronę, sklep i marketplace rozwijane osobno, bez wspólnej hierarchii treści i standardu prezentacji.",
    primaryProblem:
      "Każdy kanał komunikuje produkt inaczej, a poprawki są reaktywne i nie wynikają ze wspólnego planu.",
    needs: [
      "audyt zależności między kanałami",
      "wspólne zasady treści i prezentacji",
      "priorytety zmian rozłożone w czasie",
      "stała koordynacja rozwoju",
    ],
    purchaseConcerns: [
      "skala i koszt uporządkowania wielu elementów",
      "konieczność współpracy z dotychczasowymi dostawcami",
      "ryzyko dużej przebudowy bez szybkich efektów operacyjnych",
      "brak jasnego właściciela priorytetów",
    ],
    expectedOutcome:
      "Jeden spójny system prezentacji firmy i produktów oraz roadmapa zmian dla wszystkich kanałów.",
    entryPoint: {
      kind: "service",
      id: "ecosystem-care",
    },
    salesArgument:
      "Łączymy strategię, UX, treść, design i technologię, dlatego możemy zarządzać zależnościami między kanałami.",
    ctaId: "project-conversation",
    priority: "secondary",
  },
] as const satisfies readonly AudienceSegment[];
