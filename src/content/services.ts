import { routes } from "../config/routes.ts";
import type { Service } from "../types/service.ts";

export const services = [
  {
    id: "company-websites",
    slug: "strony-firmowe",
    name: "Strony firmowe",
    group: "websites",
    summary:
      "Strony, które porządkują ofertę firmy, budują wiarygodność i prowadzą do właściwej formy kontaktu.",
    outcome:
      "Spójna, responsywna baza komunikacji firmy, gotowa do rozwoju treści i lokalnego SEO.",
    scope: [
      "architektura informacji i ścieżki kontaktu",
      "struktura treści usługowych",
      "projekt i wdrożenie responsywne",
      "formularze oraz podstawy SEO",
    ],
    href: routes.companyWebsites,
    icon: "websites",
    featured: true,
    status: "planned",
    primaryCtaId: "project-conversation",
    relatedServices: [
      {
        serviceId: "website-audit",
        relationship: "complement",
        reason:
          "Audyt pomaga ustalić priorytety przed przebudową istniejącej strony.",
      },
      {
        serviceId: "website-care",
        relationship: "next-step",
        reason: "Opieka utrzymuje stronę po uruchomieniu i wspiera jej rozwój.",
      },
    ],
    seo: {
      title: "Strony firmowe, które wspierają sprzedaż i kontakt",
      description:
        "Projektujemy profesjonalne strony firmowe z czytelną ofertą, wersją mobilną i ścieżką pozyskiwania zapytań.",
      primaryKeyword: "strony internetowe dla firm",
      intent: "commercial",
      supportingKeywords: [
        "strona firmowa",
        "profesjonalna strona dla firmy",
        "strona usługowa",
      ],
      canonical: routes.companyWebsites,
      indexable: true,
      cannibalization: {
        risk: "medium",
        note: "Treść musi skupiać się na firmach usługowych i prezentacji oferty, pozostawiając szeroki proces stronie filaru.",
      },
    },
  },
  {
    id: "landing-pages",
    slug: "landing-page",
    name: "Landing page’e",
    shortName: "Landing page",
    group: "websites",
    summary:
      "Skupione strony kampanii, produktu lub usługi prowadzące odbiorcę do jednego jasno określonego działania.",
    outcome:
      "Strona z uporządkowanym argumentem sprzedażowym i mierzalnym punktem konwersji.",
    scope: [
      "hierarchia argumentów i sekcji",
      "copy structure i CTA",
      "responsywny projekt i wdrożenie",
      "przygotowanie pod pomiar konwersji",
    ],
    href: routes.landingPages,
    icon: "websites",
    featured: false,
    status: "planned",
    primaryCtaId: "project-conversation",
    relatedServices: [
      {
        serviceId: "company-websites",
        relationship: "alternative",
        reason:
          "Strona firmowa jest właściwa, gdy potrzebna jest szersza prezentacja firmy.",
      },
      {
        serviceId: "product-graphics",
        relationship: "complement",
        reason:
          "Dedykowane grafiki wzmacniają prezentację produktu lub kampanii.",
      },
    ],
    seo: {
      title: "Projektowanie landing page’y dla usług i produktów",
      description:
        "Tworzymy landing page’e z jasnym komunikatem, spójną strukturą i jednym celem konwersji.",
      primaryKeyword: "tworzenie landing page",
      intent: "commercial",
      supportingKeywords: [
        "projektowanie landing page",
        "strona docelowa kampanii",
        "landing page dla usługi",
      ],
      canonical: routes.landingPages,
      indexable: true,
      cannibalization: {
        risk: "low",
        note: "Odrębna intencja: pojedynczy cel kampanii zamiast pełnej strony firmowej.",
      },
    },
  },
  {
    id: "website-modernization",
    slug: "modernizacja-strony",
    name: "Modernizacja strony internetowej",
    shortName: "Modernizacja strony",
    group: "websites",
    summary:
      "Przebudowa treści, UX i warstwy technicznej strony, która przestała odpowiadać aktualnej ofercie firmy.",
    outcome:
      "Nowa wersja strony zachowująca wartościowe zasoby, ale poprawiająca czytelność, mobilność i kontakt.",
    scope: [
      "ocena istniejącej struktury i treści",
      "nowa architektura informacji",
      "przeprojektowanie kluczowych widoków",
      "migracja i kontrola jakości",
    ],
    href: routes.websiteModernization,
    icon: "support",
    featured: false,
    status: "planned",
    primaryCtaId: "free-diagnosis",
    relatedServices: [
      {
        serviceId: "website-audit",
        relationship: "complement",
        reason: "Audyt może poprzedzić decyzję o zakresie modernizacji.",
      },
      {
        serviceId: "website-care",
        relationship: "next-step",
        reason: "Stała opieka pozwala rozwijać stronę po przebudowie.",
      },
    ],
    seo: {
      title: "Modernizacja i przebudowa strony internetowej",
      description:
        "Modernizujemy istniejące strony: porządkujemy treść, UX, wygląd, wersję mobilną i ścieżki kontaktu.",
      primaryKeyword: "modernizacja strony internetowej",
      intent: "commercial",
      supportingKeywords: [
        "przebudowa strony internetowej",
        "odświeżenie strony firmowej",
        "poprawa starej strony",
      ],
      canonical: routes.websiteModernization,
      indexable: true,
      cannibalization: {
        risk: "medium",
        note: "Strona opisuje wdrożenie zmian; audyt strony pozostaje produktem diagnostycznym bez realizacji.",
      },
    },
  },
  {
    id: "website-care",
    slug: "opieka-nad-strona",
    name: "Opieka nad stroną internetową",
    shortName: "Opieka nad stroną",
    group: "websites",
    summary:
      "Bieżące wsparcie techniczne, aktualizacje i zaplanowany rozwój istniejącej strony.",
    outcome:
      "Stabilna strona i dostęp do partnera, który zna jej kontekst oraz kolejne priorytety.",
    scope: [
      "aktualizacje i poprawki techniczne",
      "zmiany treści oraz nowych sekcji",
      "kontrola działania kluczowych formularzy",
      "planowanie dalszego rozwoju",
    ],
    href: routes.websiteCare,
    icon: "support",
    featured: false,
    status: "planned",
    primaryCtaId: "contact",
    relatedServices: [
      {
        serviceId: "website-audit",
        relationship: "complement",
        reason: "Audyt porządkuje backlog przed rozpoczęciem stałej opieki.",
      },
      {
        serviceId: "ecosystem-care",
        relationship: "alternative",
        reason:
          "Opieka ekosystemowa jest właściwa przy wielu kanałach sprzedaży.",
      },
    ],
    seo: {
      title: "Opieka techniczna nad stroną internetową",
      description:
        "Zapewniamy opiekę nad stroną: aktualizacje, poprawki, rozwój treści i wsparcie techniczne w ustalonym zakresie.",
      primaryKeyword: "opieka nad stroną internetową",
      intent: "commercial",
      supportingKeywords: [
        "obsługa strony internetowej",
        "wsparcie techniczne strony",
        "rozwój strony firmowej",
      ],
      canonical: routes.websiteCare,
      indexable: true,
      cannibalization: {
        risk: "medium",
        note: "Należy odróżnić opiekę nad jednym kanałem od strategicznej opieki nad całym ekosystemem.",
      },
    },
  },
  {
    id: "shoper-stores",
    slug: "sklepy-shoper",
    name: "Sklepy internetowe Shoper",
    shortName: "Sklepy Shoper",
    group: "stores-shoper",
    summary:
      "Kompletne wdrożenia sklepów Shoper obejmujące strukturę sprzedaży, konfigurację, prezentację i uruchomienie.",
    outcome:
      "Gotowy do obsługi sklep z uporządkowanym katalogiem, ścieżką zakupu i konfiguracją operacyjną.",
    scope: [
      "plan sklepu i architektura katalogu",
      "konfiguracja platformy i kluczowych procesów",
      "dostosowanie wyglądu oraz wersji mobilnej",
      "kontrola przed uruchomieniem",
    ],
    href: routes.shoperStores,
    icon: "commerce",
    featured: true,
    status: "planned",
    primaryCtaId: "project-conversation",
    relatedServices: [
      {
        serviceId: "shoper-configuration",
        relationship: "complement",
        reason: "Konfiguracja obejmuje operacyjne ustawienia wdrożenia.",
      },
      {
        serviceId: "shoper-template-customization",
        relationship: "complement",
        reason: "Personalizacja odróżnia sklep od bazowego szablonu.",
      },
      {
        serviceId: "store-care",
        relationship: "next-step",
        reason: "Opieka wspiera sklep po starcie.",
      },
    ],
    seo: {
      title: "Sklep internetowy Shoper — projekt i wdrożenie",
      description:
        "Projektujemy i wdrażamy sklepy Shoper: struktura, konfiguracja, wygląd, wersja mobilna i przygotowanie do sprzedaży.",
      primaryKeyword: "sklep internetowy Shoper",
      intent: "transactional",
      supportingKeywords: [
        "tworzenie sklepu Shoper",
        "wdrożenie Shoper",
        "projekt sklepu Shoper",
      ],
      canonical: routes.shoperStores,
      indexable: true,
      cannibalization: {
        risk: "medium",
        note: "Ta strona obejmuje pełne wdrożenie; konfiguracja i szablon opisują odrębne, węższe zlecenia.",
      },
    },
  },
  {
    id: "shoper-configuration",
    slug: "konfiguracja-shopera",
    name: "Konfiguracja Shopera",
    group: "stores-shoper",
    summary:
      "Ustawienie płatności, dostaw, domeny, regulacji sprzedaży i aplikacji potrzebnych do poprawnego działania sklepu.",
    outcome:
      "Spójnie skonfigurowane procesy zakupowe i operacyjne, sprawdzone przed uruchomieniem.",
    scope: [
      "płatności i metody dostawy",
      "domena, poczta i ustawienia techniczne",
      "aplikacje i integracje dostępne dla zakresu",
      "ustawienia zamówień, komunikatów i dokumentów",
    ],
    href: routes.shoperConfiguration,
    icon: "commerce",
    featured: true,
    status: "planned",
    primaryCtaId: "project-conversation",
    relatedServices: [
      {
        serviceId: "shoper-stores",
        relationship: "complement",
        reason: "Pełne wdrożenie łączy konfigurację z projektem sklepu.",
      },
      {
        serviceId: "shoper-audit",
        relationship: "alternative",
        reason:
          "Audyt jest właściwy, gdy problem konfiguracji nie jest jeszcze rozpoznany.",
      },
    ],
    seo: {
      title: "Konfiguracja sklepu Shoper — płatności, dostawy i domena",
      description:
        "Konfigurujemy Shoper: płatności, dostawy, domenę, aplikacje i ustawienia potrzebne do bezpiecznego uruchomienia sklepu.",
      primaryKeyword: "konfiguracja Shoper",
      intent: "transactional",
      supportingKeywords: [
        "konfiguracja sklepu Shoper",
        "ustawienie płatności Shoper",
        "dostawy i domena Shoper",
      ],
      canonical: routes.shoperConfiguration,
      indexable: true,
      cannibalization: {
        risk: "low",
        note: "Zakres operacyjny nie powinien powtarzać treści o designie i kodzie szablonu.",
      },
    },
  },
  {
    id: "shoper-template-customization",
    slug: "personalizacja-szablonu-shoper",
    name: "Personalizacja szablonu Shoper",
    shortName: "Szablony Shoper",
    group: "stores-shoper",
    summary:
      "Dostosowanie wyglądu i zachowania szablonu do marki, katalogu i realnych potrzeb klientów sklepu.",
    outcome:
      "Spójny wizualnie sklep, który nie wygląda jak bazowy motyw i działa czytelnie na urządzeniach mobilnych.",
    scope: [
      "kierunek wizualny i układ kluczowych elementów",
      "modyfikacje szablonu i komponentów",
      "poprawa widoków mobilnych",
      "kontrola zgodności po wdrożeniu",
    ],
    href: routes.shoperTemplate,
    icon: "commerce",
    featured: true,
    status: "planned",
    primaryCtaId: "project-conversation",
    relatedServices: [
      {
        serviceId: "store-ux-development",
        relationship: "complement",
        reason: "Zmiany UX wskazują, co poza wyglądem wymaga poprawy.",
      },
      {
        serviceId: "product-graphics",
        relationship: "complement",
        reason: "Spójne materiały produktowe uzupełniają warstwę sklepu.",
      },
    ],
    seo: {
      title: "Personalizacja i modyfikacja szablonu Shoper",
      description:
        "Personalizujemy szablony Shoper, poprawiając wygląd, układ, wersję mobilną i spójność sklepu z marką.",
      primaryKeyword: "modyfikacja szablonu Shoper",
      intent: "commercial",
      supportingKeywords: [
        "personalizacja szablonu Shoper",
        "szablony Shoper",
        "zmiana wyglądu sklepu Shoper",
      ],
      canonical: routes.shoperTemplate,
      indexable: true,
      cannibalization: {
        risk: "medium",
        note: "Frazy personalizacja, modyfikacja i szablony są obsługiwane przez jedną stronę, nie przez osobne warianty URL.",
      },
    },
  },
  {
    id: "store-ux-development",
    slug: "rozwoj-i-ux-sklepu",
    name: "Rozwój i UX sklepu internetowego",
    shortName: "Rozwój i UX sklepu",
    group: "stores-shoper",
    summary:
      "Projektowe usprawnienia istniejącego sklepu: nawigacji, kart produktu, wersji mobilnej i ścieżki zakupowej.",
    outcome:
      "Czytelniejszy sklep z priorytetami zmian wynikającymi z problemów użytkownika i celów biznesowych.",
    scope: [
      "architektura kategorii i nawigacji",
      "karty produktu i koszyk",
      "wersja mobilna oraz dostępność",
      "wdrożenie uzgodnionych usprawnień",
    ],
    href: routes.storeUxDevelopment,
    icon: "commerce",
    featured: false,
    status: "planned",
    primaryCtaId: "free-diagnosis",
    relatedServices: [
      {
        serviceId: "store-audit",
        relationship: "complement",
        reason: "Audyt pozwala ustalić kolejność usprawnień.",
      },
      {
        serviceId: "shoper-template-customization",
        relationship: "complement",
        reason: "Na Shoperze część zmian UX wymaga pracy w szablonie.",
      },
      {
        serviceId: "store-care",
        relationship: "next-step",
        reason: "Opieka zapewnia iteracyjny rozwój po większym wdrożeniu.",
      },
    ],
    seo: {
      title: "UX i rozwój sklepu internetowego",
      description:
        "Poprawiamy UX istniejących sklepów: nawigację, karty produktu, koszyk, mobile i kluczowe punkty ścieżki zakupowej.",
      primaryKeyword: "poprawa UX sklepu internetowego",
      intent: "commercial",
      supportingKeywords: [
        "rozwój sklepu internetowego",
        "poprawa sklepu internetowego",
        "UX e-commerce",
      ],
      canonical: routes.storeUxDevelopment,
      indexable: true,
      cannibalization: {
        risk: "medium",
        note: "Strona dotyczy projektów usprawniających; opieka dotyczy ciągłej dostępności i mniejszych zmian.",
      },
    },
  },
  {
    id: "store-care",
    slug: "opieka-nad-sklepem",
    name: "Opieka nad sklepem internetowym",
    shortName: "Opieka nad sklepem",
    group: "stores-shoper",
    summary:
      "Stałe wsparcie techniczne i rozwojowe sklepu, ze szczególnym uwzględnieniem środowiska Shoper.",
    outcome:
      "Uporządkowany backlog, przewidywalna obsługa zmian i partner znający kontekst sklepu.",
    scope: [
      "poprawki i bieżące zmiany",
      "rozwój widoków oraz treści",
      "wsparcie konfiguracji i aplikacji",
      "kontrola działania elementów sprzedażowych",
    ],
    href: routes.storeCare,
    icon: "support",
    featured: false,
    status: "planned",
    primaryCtaId: "contact",
    relatedServices: [
      {
        serviceId: "store-audit",
        relationship: "complement",
        reason: "Audyt może uporządkować pierwszy backlog opieki.",
      },
      {
        serviceId: "ecosystem-care",
        relationship: "alternative",
        reason: "Opieka ekosystemowa obejmuje także stronę i marketplace.",
      },
    ],
    seo: {
      title: "Opieka techniczna nad sklepem internetowym",
      description:
        "Zapewniamy opiekę nad sklepem internetowym: poprawki, konfigurację, rozwój UX i wsparcie platformy Shoper.",
      primaryKeyword: "opieka nad sklepem internetowym",
      intent: "commercial",
      supportingKeywords: [
        "obsługa sklepu internetowego",
        "wsparcie techniczne Shoper",
        "administracja sklepem internetowym",
      ],
      canonical: routes.storeCare,
      indexable: true,
      cannibalization: {
        risk: "medium",
        note: "Zakres musi pozostać kanałowy i techniczny, aby nie dublować wielokanałowej stałej współpracy.",
      },
    },
  },
  {
    id: "allegro-offer-creation",
    slug: "tworzenie-ofert-allegro",
    name: "Tworzenie ofert Allegro",
    group: "marketplace",
    summary:
      "Przygotowanie nowej oferty lub katalogu: struktury, materiałów produktowych, opisu i spójnej publikacji.",
    outcome:
      "Kompletna, czytelna oferta gotowa do publikacji i powielania w uzgodnionym katalogu.",
    scope: [
      "struktura informacji i argumentów",
      "koordynacja zdjęć, grafik i opisów",
      "przygotowanie oferty do publikacji",
      "system dla większego katalogu produktów",
    ],
    href: routes.allegroOfferCreation,
    icon: "marketplace",
    featured: true,
    status: "planned",
    primaryCtaId: "project-conversation",
    relatedServices: [
      {
        serviceId: "product-photos",
        relationship: "complement",
        reason: "Zdjęcia stanowią bazę kompletnej galerii oferty.",
      },
      {
        serviceId: "product-graphics",
        relationship: "complement",
        reason: "Infografiki wyjaśniają cechy i zastosowania produktu.",
      },
      {
        serviceId: "product-descriptions",
        relationship: "complement",
        reason: "Opis uzupełnia wizualną prezentację produktu.",
      },
    ],
    seo: {
      title: "Tworzenie ofert Allegro — zdjęcia, grafiki i opisy",
      description:
        "Tworzymy kompletne oferty Allegro i katalogi produktów, łącząc strukturę sprzedażową, zdjęcia, grafiki i opisy.",
      primaryKeyword: "tworzenie ofert Allegro",
      intent: "transactional",
      supportingKeywords: [
        "profesjonalne oferty Allegro",
        "przygotowanie aukcji Allegro",
        "katalog ofert Allegro",
      ],
      canonical: routes.allegroOfferCreation,
      indexable: true,
      cannibalization: {
        risk: "medium",
        note: "Treść dotyczy budowy od podstaw; optymalizacja obejmuje istniejące oferty i pracę na danych wejściowych.",
      },
    },
  },
  {
    id: "allegro-offer-optimization",
    slug: "optymalizacja-ofert-allegro",
    name: "Optymalizacja ofert Allegro",
    group: "marketplace",
    summary:
      "Przebudowa istniejących ofert pod kątem czytelności, argumentacji, spójności galerii i decyzji zakupowej.",
    outcome:
      "Uporządkowana oferta z konkretną listą zmian oraz wdrożonym, uzgodnionym zakresem materiałów.",
    scope: [
      "analiza aktualnej oferty",
      "hierarchia informacji i argumentów",
      "poprawa galerii, grafik i opisu",
      "ujednolicenie zasad dla katalogu",
    ],
    href: routes.allegroOfferOptimization,
    icon: "marketplace",
    featured: true,
    status: "planned",
    primaryCtaId: "free-diagnosis",
    relatedServices: [
      {
        serviceId: "allegro-audit",
        relationship: "complement",
        reason: "Audyt diagnozuje problemy przed decyzją o wdrożeniu zmian.",
      },
      {
        serviceId: "product-graphics",
        relationship: "complement",
        reason:
          "Grafiki rozwiązują część problemów prezentacji zidentyfikowanych w ofercie.",
      },
      {
        serviceId: "allegro-offer-creation",
        relationship: "alternative",
        reason:
          "Tworzenie od zera jest właściwe, gdy materiału nie warto przebudowywać.",
      },
    ],
    seo: {
      title: "Optymalizacja ofert Allegro i prezentacji produktu",
      description:
        "Optymalizujemy istniejące oferty Allegro: strukturę, galerię, infografiki, opis i spójność katalogu.",
      primaryKeyword: "optymalizacja ofert Allegro",
      intent: "commercial",
      supportingKeywords: [
        "poprawa ofert Allegro",
        "optymalizacja aukcji Allegro",
        "ulepszenie oferty Allegro",
      ],
      canonical: routes.allegroOfferOptimization,
      indexable: true,
      cannibalization: {
        risk: "medium",
        note: "Nie powielać definicji audytu; strona ma pokazywać realizację zmian w istniejącej ofercie.",
      },
    },
  },
  {
    id: "olx-offers",
    slug: "oferty-olx",
    name: "Tworzenie ofert OLX",
    shortName: "Oferty OLX",
    group: "marketplace",
    summary:
      "Czytelne ogłoszenia OLX wykorzystujące właściwą kolejność informacji, zdjęcia i opis dopasowany do kategorii.",
    outcome:
      "Spójny wzorzec ogłoszenia, który można zastosować do uzgodnionej liczby produktów lub usług.",
    scope: [
      "struktura ogłoszenia",
      "dobór i przygotowanie materiałów",
      "opis produktu lub usługi",
      "zasady spójności większego katalogu",
    ],
    href: routes.olxOffers,
    icon: "marketplace",
    featured: false,
    status: "planned",
    primaryCtaId: "project-conversation",
    relatedServices: [
      {
        serviceId: "product-photos",
        relationship: "complement",
        reason: "Dobre zdjęcia poprawiają czytelność ogłoszenia.",
      },
      {
        serviceId: "product-descriptions",
        relationship: "complement",
        reason: "Opis porządkuje parametry, korzyści i warunki zakupu.",
      },
    ],
    seo: {
      title: "Tworzenie profesjonalnych ofert OLX",
      description:
        "Przygotowujemy oferty OLX: strukturę ogłoszenia, dobór zdjęć, opis oraz spójny wzorzec dla katalogu.",
      primaryKeyword: "tworzenie ofert OLX",
      intent: "commercial",
      supportingKeywords: [
        "profesjonalne ogłoszenia OLX",
        "opisy ofert OLX",
        "przygotowanie ogłoszeń OLX",
      ],
      canonical: routes.olxOffers,
      indexable: true,
      cannibalization: {
        risk: "low",
        note: "Odrębna platforma i format; treści nie należy kopiować z podstron Allegro.",
      },
    },
  },
  {
    id: "product-photos",
    slug: "zdjecia-produktowe",
    name: "Zdjęcia produktowe",
    group: "product-presentation",
    summary:
      "Zdjęcia i obróbka pokazujące produkt konsekwentnie w galerii sklepu, strony lub marketplace.",
    outcome:
      "Spójny zestaw zdjęć dopasowany do roli każdego kadru i wymagań uzgodnionych kanałów.",
    scope: [
      "plan ujęć i roli galerii",
      "sesja produktowa w uzgodnionym zakresie",
      "obróbka i przygotowanie plików",
      "warianty do sklepu i marketplace",
    ],
    href: routes.productPhotos,
    icon: "camera",
    featured: true,
    status: "planned",
    primaryCtaId: "project-conversation",
    relatedServices: [
      {
        serviceId: "product-graphics",
        relationship: "next-step",
        reason: "Zdjęcia są bazą infografik produktowych.",
      },
      {
        serviceId: "product-descriptions",
        relationship: "complement",
        reason: "Opis uzupełnia informacje niewidoczne na zdjęciach.",
      },
      {
        serviceId: "allegro-offer-creation",
        relationship: "complement",
        reason: "Kompletna oferta wykorzystuje zdjęcia w zaplanowanej galerii.",
      },
    ],
    seo: {
      title: "Zdjęcia produktowe do sklepu, strony i Allegro",
      description:
        "Tworzymy zdjęcia produktowe i przygotowujemy je do spójnych galerii w sklepach internetowych oraz marketplace.",
      primaryKeyword: "zdjęcia produktowe",
      intent: "commercial",
      supportingKeywords: [
        "fotografia produktowa",
        "zdjęcia produktowe Allegro",
        "zdjęcia do sklepu internetowego",
      ],
      canonical: routes.productPhotos,
      indexable: true,
      cannibalization: {
        risk: "medium",
        note: "Fraza zdjęcia produktowe Allegro jest obsługiwana tutaj przez dedykowaną sekcję, bez osobnego bliźniaczego URL.",
      },
    },
  },
  {
    id: "product-graphics",
    slug: "grafiki-produktowe",
    name: "Grafiki produktowe i infografiki",
    shortName: "Grafiki produktowe",
    group: "product-presentation",
    summary:
      "Grafiki wyjaśniające cechy, warianty, zastosowanie i przewagi produktu w logicznej kolejności galerii.",
    outcome:
      "Czytelny system infografik możliwy do rozwijania dla kolejnych produktów i kanałów.",
    scope: [
      "hierarchia informacji w galerii",
      "infografiki cech i zastosowań",
      "porównania i warianty, gdy są uzasadnione",
      "formaty do sklepu oraz marketplace",
    ],
    href: routes.productGraphics,
    icon: "content",
    featured: true,
    status: "planned",
    primaryCtaId: "project-conversation",
    relatedServices: [
      {
        serviceId: "product-photos",
        relationship: "complement",
        reason: "Fotografia dostarcza materiał do spójnej galerii.",
      },
      {
        serviceId: "product-descriptions",
        relationship: "complement",
        reason:
          "Tekst i grafika powinny używać tej samej hierarchii argumentów.",
      },
      {
        serviceId: "allegro-offer-optimization",
        relationship: "complement",
        reason: "Infografiki mogą wdrażać rekomendacje z optymalizacji oferty.",
      },
    ],
    seo: {
      title: "Grafiki produktowe i infografiki sprzedażowe",
      description:
        "Projektujemy grafiki produktowe i infografiki do sklepów, stron oraz marketplace, porządkując cechy i zastosowania produktu.",
      primaryKeyword: "grafiki produktowe",
      intent: "commercial",
      supportingKeywords: [
        "infografiki produktowe",
        "grafiki na Allegro",
        "galeria sprzedażowa produktu",
      ],
      canonical: routes.productGraphics,
      indexable: true,
      cannibalization: {
        risk: "low",
        note: "Strona obejmuje grafiki i infografiki jako jeden proces, bez wariantów keyword-only.",
      },
    },
  },
  {
    id: "product-descriptions",
    slug: "opisy-produktowe",
    name: "Opisy produktowe",
    group: "product-presentation",
    summary:
      "Treści porządkujące cechy, zastosowania, parametry i argumenty produktu bez sztucznych obietnic.",
    outcome:
      "Czytelny opis oraz schemat treści możliwy do konsekwentnego zastosowania w katalogu.",
    scope: [
      "hierarchia informacji o produkcie",
      "opis korzyści opartych na cechach",
      "parametry i informacje zakupowe",
      "adaptacja do sklepu, strony i marketplace",
    ],
    href: routes.productDescriptions,
    icon: "content",
    featured: true,
    status: "planned",
    primaryCtaId: "project-conversation",
    relatedServices: [
      {
        serviceId: "product-photos",
        relationship: "complement",
        reason: "Opis i zdjęcia wspólnie odpowiadają na pytania kupującego.",
      },
      {
        serviceId: "product-graphics",
        relationship: "complement",
        reason: "Najważniejsze informacje można przenieść do galerii.",
      },
      {
        serviceId: "allegro-offer-creation",
        relationship: "complement",
        reason: "Opis jest częścią kompletnej oferty marketplace.",
      },
    ],
    seo: {
      title: "Opisy produktowe do sklepów i marketplace",
      description:
        "Tworzymy uporządkowane opisy produktów do sklepów internetowych, stron, Allegro i OLX.",
      primaryKeyword: "opisy produktowe",
      intent: "commercial",
      supportingKeywords: [
        "opisy produktów do sklepu",
        "opisy produktów Allegro",
        "tworzenie treści produktowych",
      ],
      canonical: routes.productDescriptions,
      indexable: true,
      cannibalization: {
        risk: "medium",
        note: "Fraza opisy produktów Allegro jest obsługiwana w sekcji kontekstowej; nie powstaje osobna kopia strony.",
      },
    },
  },
  {
    id: "website-audit",
    slug: "audyt-strony-internetowej",
    name: "Audyt strony internetowej",
    group: "audits-development",
    summary:
      "Diagnoza struktury, treści, UX, wersji mobilnej i ścieżek kontaktu istniejącej strony.",
    outcome:
      "Lista obserwacji i priorytetów, która pozwala podjąć decyzję o poprawkach lub modernizacji.",
    scope: [
      "architektura informacji i nawigacja",
      "czytelność oferty i CTA",
      "mobile, dostępność i podstawy techniczne",
      "priorytety rekomendowanych zmian",
    ],
    href: routes.websiteAudit,
    icon: "audit",
    featured: false,
    status: "planned",
    primaryCtaId: "free-diagnosis",
    relatedServices: [
      {
        serviceId: "website-modernization",
        relationship: "next-step",
        reason:
          "Modernizacja wdraża rekomendacje wymagające większej przebudowy.",
      },
      {
        serviceId: "website-care",
        relationship: "next-step",
        reason: "Mniejsze rekomendacje mogą trafić do planu stałej opieki.",
      },
    ],
    seo: {
      title: "Audyt strony internetowej — UX, treść i konwersja",
      description:
        "Audytujemy stronę pod kątem struktury, treści, UX, wersji mobilnej i ścieżek prowadzących do kontaktu.",
      primaryKeyword: "audyt strony internetowej",
      intent: "transactional",
      supportingKeywords: [
        "analiza strony internetowej",
        "audyt UX strony",
        "audyt strony firmowej",
      ],
      canonical: routes.websiteAudit,
      indexable: true,
      cannibalization: {
        risk: "medium",
        note: "Rezultatem jest diagnoza i priorytety, nie wdrożenie modernizacji.",
      },
    },
  },
  {
    id: "store-audit",
    slug: "audyt-sklepu-internetowego",
    name: "Audyt sklepu internetowego",
    group: "audits-development",
    summary:
      "Niezależna od platformy analiza nawigacji, kart produktu, koszyka, mobile i kluczowych punktów sprzedaży.",
    outcome:
      "Priorytety usprawnień sklepu z rozdzieleniem problemów krytycznych, szybkich zmian i większych projektów.",
    scope: [
      "nawigacja, kategorie i wyszukiwanie",
      "karty produktu oraz koszyk",
      "wersja mobilna i czytelność",
      "rekomendacje i kolejność wdrożenia",
    ],
    href: routes.storeAudit,
    icon: "audit",
    featured: true,
    status: "planned",
    primaryCtaId: "free-diagnosis",
    relatedServices: [
      {
        serviceId: "store-ux-development",
        relationship: "next-step",
        reason: "Rozwój i UX obejmuje wdrożenie wybranych rekomendacji.",
      },
      {
        serviceId: "shoper-audit",
        relationship: "alternative",
        reason:
          "Audyt Shoper jest właściwy, gdy potrzebna jest analiza platformowa.",
      },
    ],
    seo: {
      title: "Audyt sklepu internetowego i ścieżki zakupowej",
      description:
        "Analizujemy UX sklepu, kategorie, karty produktu, koszyk i mobile, a następnie porządkujemy priorytety zmian.",
      primaryKeyword: "audyt sklepu internetowego",
      intent: "transactional",
      supportingKeywords: [
        "audyt e-commerce",
        "audyt UX sklepu",
        "analiza sklepu internetowego",
      ],
      canonical: routes.storeAudit,
      indexable: true,
      cannibalization: {
        risk: "high",
        note: "Strona pozostaje platformowo neutralna; audyt Shoper musi koncentrować się na konfiguracji, aplikacjach i ograniczeniach tej platformy.",
      },
    },
  },
  {
    id: "shoper-audit",
    slug: "audyt-shopera",
    name: "Audyt sklepu Shoper",
    shortName: "Audyt Shopera",
    group: "audits-development",
    summary:
      "Analiza sklepu uwzględniająca UX oraz konfigurację, szablon, aplikacje i specyfikę platformy Shoper.",
    outcome:
      "Plan zmian rozdzielający problemy ustawień, szablonu, materiałów i szerszego UX sklepu.",
    scope: [
      "ustawienia i proces zakupowy w Shoper",
      "szablon oraz zachowanie na mobile",
      "aplikacje i elementy platformowe",
      "priorytety zmian z uwzględnieniem ograniczeń",
    ],
    href: routes.shoperAudit,
    icon: "audit",
    featured: true,
    status: "planned",
    primaryCtaId: "free-diagnosis",
    relatedServices: [
      {
        serviceId: "shoper-configuration",
        relationship: "next-step",
        reason: "Konfiguracja wdraża rekomendowane zmiany operacyjne.",
      },
      {
        serviceId: "shoper-template-customization",
        relationship: "next-step",
        reason:
          "Personalizacja wdraża rekomendacje dotyczące wyglądu i układu.",
      },
      {
        serviceId: "store-audit",
        relationship: "alternative",
        reason:
          "Audyt ogólny wystarczy, jeśli platforma nie jest źródłem problemu.",
      },
    ],
    seo: {
      title: "Audyt sklepu Shoper — konfiguracja, UX i szablon",
      description:
        "Audytujemy sklepy Shoper: konfigurację, szablon, aplikacje, wersję mobilną i kluczowe elementy ścieżki zakupu.",
      primaryKeyword: "audyt sklepu Shoper",
      intent: "transactional",
      supportingKeywords: [
        "audyt Shoper",
        "analiza sklepu Shoper",
        "poprawa sklepu Shoper",
      ],
      canonical: routes.shoperAudit,
      indexable: true,
      cannibalization: {
        risk: "high",
        note: "Musi dostarczać wyraźnie platformową analizę, aby uzasadnić odrębność od ogólnego audytu e-commerce.",
      },
    },
  },
  {
    id: "allegro-audit",
    slug: "audyt-ofert-allegro",
    name: "Audyt ofert Allegro",
    group: "audits-development",
    summary:
      "Ocena istniejących ofert i katalogu pod kątem struktury informacji, galerii, opisów oraz spójności prezentacji.",
    outcome:
      "Lista priorytetów wskazująca, co poprawić w pierwszej kolejności i które materiały wymagają przebudowy.",
    scope: [
      "struktura i kompletność informacji",
      "galeria, zdjęcia i infografiki",
      "opisy oraz argumentacja",
      "spójność katalogu i rekomendacje",
    ],
    href: routes.allegroAudit,
    icon: "audit",
    featured: true,
    status: "planned",
    primaryCtaId: "free-diagnosis",
    relatedServices: [
      {
        serviceId: "allegro-offer-optimization",
        relationship: "next-step",
        reason: "Optymalizacja wdraża rekomendacje dla istniejących ofert.",
      },
      {
        serviceId: "allegro-offer-creation",
        relationship: "alternative",
        reason:
          "Nowa oferta jest właściwa, gdy przebudowa nie ma uzasadnienia.",
      },
    ],
    seo: {
      title: "Audyt ofert Allegro — galeria, opis i struktura",
      description:
        "Analizujemy oferty Allegro, ich galerie, opisy i spójność katalogu, a następnie wskazujemy priorytety zmian.",
      primaryKeyword: "audyt oferty Allegro",
      intent: "transactional",
      supportingKeywords: [
        "audyt ofert Allegro",
        "analiza aukcji Allegro",
        "ocena oferty Allegro",
      ],
      canonical: routes.allegroAudit,
      indexable: true,
      cannibalization: {
        risk: "medium",
        note: "Audyt kończy się rekomendacjami; optymalizacja obejmuje wykonanie zmian.",
      },
    },
  },
  {
    id: "sales-consulting",
    slug: "konsultacja-sprzedazy-online",
    name: "Konsultacja sprzedaży online",
    group: "audits-development",
    summary:
      "Rozmowa porządkująca cele, kanały, materiały i kolejność działań przed rozpoczęciem większego projektu.",
    outcome:
      "Uzgodniony kierunek i następny krok bez kupowania przypadkowego zestawu usług.",
    scope: [
      "diagnoza sytuacji i celu",
      "ocena dostępnych kanałów oraz materiałów",
      "priorytety i zależności działań",
      "rekomendacja następnego kroku",
    ],
    href: routes.salesConsulting,
    icon: "audit",
    featured: false,
    status: "planned",
    primaryCtaId: "free-diagnosis",
    relatedServices: [
      {
        serviceId: "ecosystem-care",
        relationship: "next-step",
        reason:
          "Stała współpraca może realizować uzgodnioną, wielokanałową roadmapę.",
      },
      {
        serviceId: "store-audit",
        relationship: "alternative",
        reason:
          "Audyt jest lepszy, gdy głównym problemem jest działający sklep.",
      },
    ],
    seo: {
      title: "Konsultacja sprzedaży internetowej",
      description:
        "Porządkujemy cele, kanały i priorytety sprzedaży online, aby wskazać właściwy zakres dalszych działań.",
      primaryKeyword: "konsultacja sprzedaży internetowej",
      intent: "transactional",
      supportingKeywords: [
        "konsultacje e-commerce",
        "strategia sprzedaży online",
        "doradztwo sprzedaż internetowa",
      ],
      canonical: routes.salesConsulting,
      indexable: true,
      cannibalization: {
        risk: "low",
        note: "Treść dotyczy wyboru kierunku, a nie audytu jednego, istniejącego kanału.",
      },
    },
  },
  {
    id: "ecosystem-care",
    slug: "stala-opieka-i-rozwoj",
    name: "Stała opieka i rozwój sprzedaży online",
    shortName: "Stała opieka i rozwój",
    group: "audits-development",
    summary:
      "Długofalowa współpraca obejmująca priorytety i rozwój kilku powiązanych kanałów sprzedaży.",
    outcome:
      "Spójna roadmapa zamiast niezależnych zmian na stronie, w sklepie i marketplace.",
    scope: [
      "wspólny backlog i priorytety",
      "koordynacja zmian w kilku kanałach",
      "rozwój prezentacji firmy i produktów",
      "cykliczna ocena kolejnych potrzeb",
    ],
    href: routes.ecosystemCare,
    icon: "support",
    featured: false,
    status: "planned",
    primaryCtaId: "contact",
    relatedServices: [
      {
        serviceId: "website-care",
        relationship: "complement",
        reason: "Opieka nad stroną może być częścią szerszej współpracy.",
      },
      {
        serviceId: "store-care",
        relationship: "complement",
        reason: "Opieka nad sklepem może być jednym ze strumieni pracy.",
      },
      {
        serviceId: "sales-consulting",
        relationship: "complement",
        reason: "Konsultacja pomaga ustalić punkt startowy i priorytety.",
      },
    ],
    seo: {
      title: "Stała opieka i rozwój sprzedaży internetowej",
      description:
        "Koordynujemy rozwój strony, sklepu i marketplace w ramach wspólnej roadmapy i ustalonych priorytetów.",
      primaryKeyword: "rozwój sprzedaży internetowej",
      intent: "commercial",
      supportingKeywords: [
        "stała obsługa e-commerce",
        "opieka nad sprzedażą online",
        "rozwój e-commerce",
      ],
      canonical: routes.ecosystemCare,
      indexable: true,
      cannibalization: {
        risk: "high",
        note: "Strona musi dotyczyć wielokanałowej roadmapy; opieka nad stroną i sklepem pozostaje operacyjna oraz kanałowa.",
      },
    },
  },
] as const satisfies readonly Service[];
