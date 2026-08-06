import { routes } from "../config/routes.ts";
import type { ServiceGroup } from "../types/service.ts";

export const serviceGroups = [
  {
    id: "websites",
    slug: "strony-internetowe",
    name: "Strony internetowe",
    shortName: "Strony",
    summary:
      "Strony firmowe, usługowe i landing page’e projektowane wokół wiarygodności, czytelnej oferty i kontaktu.",
    customerQuestion:
      "Potrzebuję strony, która jasno przedstawia firmę i pozyskuje zapytania.",
    href: routes.websites,
    icon: "websites",
    capabilities: [
      "strony firmowe i usługowe",
      "landing page’e",
      "modernizacje istniejących stron",
      "formularze i lokalne ścieżki kontaktu",
      "opieka oraz rozwój strony",
    ],
    featured: true,
    status: "planned",
    primaryCtaId: "project-conversation",
    seo: {
      title: "Tworzenie stron internetowych dla firm",
      description:
        "Projektujemy strony internetowe, które porządkują ofertę firmy, budują wiarygodność i prowadzą użytkownika do kontaktu.",
      primaryKeyword: "tworzenie stron internetowych",
      intent: "commercial",
      supportingKeywords: [
        "projektowanie stron internetowych",
        "strony internetowe dla firm",
        "profesjonalna strona internetowa",
      ],
      canonical: routes.websites,
      indexable: true,
      cannibalization: {
        risk: "medium",
        note: "Strona filaru odpowiada na szeroką potrzebę i porównuje warianty; strona firmowa koncentruje się na konkretnym typie realizacji.",
      },
    },
  },
  {
    id: "stores-shoper",
    slug: "sklepy-internetowe",
    name: "Sklepy internetowe i Shoper",
    shortName: "Sklepy i Shoper",
    summary:
      "Budowa, konfiguracja i rozwój sklepów ze szczególną znajomością platformy Shoper i potrzeb sprzedaży mobilnej.",
    customerQuestion:
      "Chcę uruchomić albo poprawić sklep i potrzebuję partnera od sprzedaży, nie tylko konfiguracji.",
    href: routes.stores,
    icon: "commerce",
    capabilities: [
      "tworzenie sklepów internetowych",
      "wdrożenia i konfiguracja Shoper",
      "płatności, dostawy, domeny i aplikacje",
      "personalizacja szablonów Shoper",
      "UX i rozwój istniejącego sklepu",
      "stała opieka techniczna",
    ],
    featured: true,
    status: "planned",
    primaryCtaId: "project-conversation",
    seo: {
      title: "Tworzenie sklepów internetowych i wdrożenia Shoper",
      description:
        "Tworzymy i rozwijamy sklepy internetowe: od strategii sprzedaży po konfigurację, UX, treść i wdrożenie Shoper.",
      primaryKeyword: "tworzenie sklepów internetowych",
      intent: "commercial",
      supportingKeywords: [
        "projektowanie sklepów internetowych",
        "wdrożenie sklepu internetowego",
        "sklep internetowy Shoper",
      ],
      canonical: routes.stores,
      indexable: true,
      cannibalization: {
        risk: "medium",
        note: "Filar obejmuje wybór i pełny proces sklepu; podstrony Shoper odpowiadają wyłącznie na intencje platformowe.",
      },
    },
  },
  {
    id: "marketplace",
    slug: "allegro-i-marketplace",
    name: "Allegro i marketplace",
    shortName: "Allegro",
    summary:
      "Tworzenie i optymalizacja ofert oraz katalogów, które prezentują produkt spójnie i ułatwiają decyzję zakupową.",
    customerQuestion:
      "Moje oferty są niespójne lub nie pokazują produktu tak dobrze, jak powinny.",
    href: routes.marketplace,
    icon: "marketplace",
    capabilities: [
      "tworzenie ofert Allegro i OLX",
      "optymalizacja istniejących ofert",
      "audyty ofert i katalogów",
      "przygotowanie większych katalogów produktowych",
      "koordynacja zdjęć, grafik i opisów",
    ],
    featured: true,
    status: "planned",
    primaryCtaId: "free-diagnosis",
    seo: {
      title: "Oferty Allegro i marketplace — tworzenie i optymalizacja",
      description:
        "Tworzymy i optymalizujemy oferty Allegro oraz OLX, łącząc strukturę sprzedażową, zdjęcia, grafiki i opisy.",
      primaryKeyword: "oferty Allegro",
      intent: "commercial",
      supportingKeywords: [
        "tworzenie ofert Allegro",
        "optymalizacja ofert Allegro",
        "obsługa ofert marketplace",
      ],
      canonical: routes.marketplace,
      indexable: true,
      cannibalization: {
        risk: "medium",
        note: "Hub przedstawia pełen system ofert; osobne strony rozdzielają tworzenie od poprawy istniejących publikacji.",
      },
    },
  },
  {
    id: "product-presentation",
    slug: "prezentacja-produktu",
    name: "Prezentacja produktu",
    shortName: "Produkt",
    summary:
      "Zdjęcia, grafiki i opisy tworzone jako jeden system prezentacji produktu dla sklepu, strony i marketplace.",
    customerQuestion:
      "Mam dobry produkt, ale materiały nie pokazują jego wartości i zastosowania.",
    href: routes.productPresentation,
    icon: "camera",
    capabilities: [
      "zdjęcia i obróbka produktowa",
      "grafiki produktowe i infografiki",
      "opisy i treści produktowe",
      "kompletne galerie sprzedażowe",
      "adaptacja materiałów do wielu kanałów",
    ],
    featured: true,
    status: "planned",
    primaryCtaId: "project-conversation",
    seo: {
      title: "Prezentacja produktu — zdjęcia, grafiki i opisy",
      description:
        "Przygotowujemy spójną prezentację produktu: zdjęcia, infografiki, galerie i opisy do sklepów oraz marketplace.",
      primaryKeyword: "prezentacja produktu w internecie",
      intent: "commercial",
      supportingKeywords: [
        "materiały produktowe",
        "galeria produktu",
        "zdjęcia grafiki i opisy produktów",
      ],
      canonical: routes.productPresentation,
      indexable: true,
      cannibalization: {
        risk: "low",
        note: "Hub łączy komplet materiałów, a trzy podstrony odpowiadają na odrębne specjalizacje produkcyjne.",
      },
    },
  },
  {
    id: "audits-development",
    slug: "audyty-i-rozwoj",
    name: "Audyt i rozwój",
    shortName: "Audyt i rozwój",
    summary:
      "Diagnoza problemów, plan usprawnień i stały rozwój strony, sklepu lub całego ekosystemu sprzedaży.",
    customerQuestion:
      "Mam działające kanały sprzedaży, ale nie wiem, co poprawić najpierw i jak połączyć dalsze działania.",
    href: routes.auditsDevelopment,
    icon: "audit",
    capabilities: [
      "audyty stron, sklepów i Shopera",
      "audyty ofert Allegro",
      "konsultacje sprzedaży online",
      "priorytetyzacja usprawnień",
      "stała opieka i rozwój wielu kanałów",
    ],
    featured: true,
    status: "planned",
    primaryCtaId: "free-diagnosis",
    seo: {
      title: "Audyty i rozwój sprzedaży internetowej",
      description:
        "Diagnozujemy strony, sklepy i oferty, ustalamy priorytety zmian oraz wspieramy ich dalszy rozwój.",
      primaryKeyword: "audyt sprzedaży internetowej",
      intent: "commercial",
      supportingKeywords: [
        "audyt e-commerce",
        "konsultacja sprzedaży online",
        "rozwój sprzedaży internetowej",
      ],
      canonical: routes.auditsDevelopment,
      indexable: true,
      cannibalization: {
        risk: "low",
        note: "Filar porównuje obszary diagnozy; strony szczegółowe mają osobny przedmiot, zakres i rezultat audytu.",
      },
    },
  },
] as const satisfies readonly ServiceGroup[];
