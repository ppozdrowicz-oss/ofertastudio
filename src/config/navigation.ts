import type { NavigationConfig } from "../types/navigation.ts";
import { routes } from "./routes.ts";

const headerNavigation = [
  {
    id: "websites",
    label: "Strony",
    href: routes.websites,
    description: "Projektowanie, modernizacja i rozwój stron internetowych.",
    kind: "menu",
    presentation: "mega",
    context: {
      label: "Strony od struktury do opieki",
      description:
        "Dobieramy zakres do celu strony, dostępnych materiałów i obecnego etapu firmy.",
    },
    groups: [
      {
        id: "website-build",
        label: "Budowa i przebudowa",
        itemIds: [
          "websites-overview",
          "company-websites",
          "landing-pages",
          "website-modernization",
        ],
      },
      {
        id: "website-development",
        label: "Opieka i diagnoza",
        itemIds: ["website-care", "website-audit"],
      },
    ],
    children: [
      {
        id: "websites-overview",
        label: "Strony internetowe",
        href: routes.websites,
        description: "Wybierz właściwy typ strony i model współpracy.",
        kind: "link",
      },
      {
        id: "company-websites",
        label: "Strony firmowe",
        href: routes.companyWebsites,
        description: "Czytelna oferta firmy, wiarygodność i kontakt.",
        kind: "link",
      },
      {
        id: "landing-pages",
        label: "Landing page",
        href: routes.landingPages,
        description: "Jedna strona podporządkowana konkretnemu celowi.",
        kind: "link",
      },
      {
        id: "website-modernization",
        label: "Modernizacja strony",
        href: routes.websiteModernization,
        description: "Uporządkowanie starej strony bez zgadywania zakresu.",
        kind: "link",
      },
      {
        id: "website-care",
        label: "Opieka nad stroną",
        href: routes.websiteCare,
        description: "Bieżące poprawki i kontrolowany rozwój.",
        kind: "link",
      },
      {
        id: "website-audit",
        label: "Audyt strony",
        href: routes.websiteAudit,
        description: "Diagnoza struktury, treści, UX i ścieżek kontaktu.",
        kind: "link",
      },
    ],
  },
  {
    id: "stores",
    label: "Sklepy i Shoper",
    href: routes.stores,
    description: "Uruchomienie, Shoper, UX i dalszy rozwój sklepu.",
    kind: "menu",
    presentation: "mega",
    context: {
      label: "Specjalizacja Shoper",
      description:
        "Łączymy znajomość platformy z UX, treścią i praktyką sprzedaży mobilnej.",
    },
    groups: [
      {
        id: "store-launch",
        label: "Uruchomienie sklepu",
        itemIds: [
          "stores-overview",
          "shoper-stores",
          "shoper-configuration",
          "shoper-template",
        ],
      },
      {
        id: "store-development",
        label: "Rozwój sklepu",
        itemIds: ["store-ux", "store-care", "shoper-audit"],
      },
    ],
    children: [
      {
        id: "stores-overview",
        label: "Sklepy internetowe",
        href: routes.stores,
        description: "Pełny proces od kierunku sprzedaży po wdrożenie.",
        kind: "link",
      },
      {
        id: "shoper-stores",
        label: "Sklepy Shoper",
        href: routes.shoperStores,
        description: "Nowy sklep zaplanowany pod platformę Shoper.",
        kind: "link",
      },
      {
        id: "shoper-configuration",
        label: "Konfiguracja Shopera",
        href: routes.shoperConfiguration,
        description: "Płatności, dostawy, domena i aplikacje.",
        kind: "link",
      },
      {
        id: "shoper-template",
        label: "Personalizacja szablonu",
        href: routes.shoperTemplate,
        description: "Wygląd i układ dopasowane do oferty oraz mobile.",
        kind: "link",
      },
      {
        id: "store-ux",
        label: "Rozwój i UX sklepu",
        href: routes.storeUxDevelopment,
        description: "Usprawnienia istniejącej ścieżki zakupowej.",
        kind: "link",
      },
      {
        id: "store-care",
        label: "Opieka nad sklepem",
        href: routes.storeCare,
        description: "Wsparcie techniczne i przewidywalny backlog zmian.",
        kind: "link",
      },
      {
        id: "shoper-audit",
        label: "Audyt sklepu Shoper",
        href: routes.shoperAudit,
        description:
          "Konfiguracja, szablon, aplikacje i UX w jednej diagnozie.",
        kind: "link",
      },
    ],
  },
  {
    id: "marketplace",
    label: "Allegro",
    href: routes.marketplace,
    description: "Tworzenie, optymalizacja i diagnoza ofert marketplace.",
    kind: "menu",
    presentation: "dropdown",
    children: [
      {
        id: "marketplace-overview",
        label: "Allegro i marketplace",
        href: routes.marketplace,
        description: "Cały system ofert i katalogów produktów.",
        kind: "link",
      },
      {
        id: "allegro-creation",
        label: "Tworzenie ofert Allegro",
        href: routes.allegroOfferCreation,
        description: "Nowa oferta od struktury po materiały.",
        kind: "link",
      },
      {
        id: "allegro-optimization",
        label: "Optymalizacja ofert Allegro",
        href: routes.allegroOfferOptimization,
        description: "Przebudowa istniejących ofert i katalogu.",
        kind: "link",
      },
      {
        id: "allegro-audit",
        label: "Audyt ofert Allegro",
        href: routes.allegroAudit,
        description: "Priorytety zmian przed rozpoczęciem wdrożenia.",
        kind: "link",
      },
      {
        id: "olx-offers",
        label: "Oferty OLX",
        href: routes.olxOffers,
        description: "Czytelny wzorzec ogłoszenia dla usługi lub produktu.",
        kind: "link",
      },
      {
        id: "product-presentation-context",
        label: "Zdjęcia, grafiki i opisy",
        href: routes.productPresentation,
        description: "Materiały do sklepu, strony i marketplace.",
        kind: "link",
      },
    ],
  },
  {
    id: "projects",
    label: "Realizacje",
    href: routes.projects,
    kind: "link",
  },
  {
    id: "offer",
    label: "Oferta",
    href: routes.offer,
    description: "Filary usług, audyty i modele współpracy.",
    kind: "menu",
    align: "right",
    presentation: "dropdown",
    children: [
      {
        id: "offer-overview",
        label: "Pełna oferta",
        href: routes.offer,
        description: "Porównaj projekt, audyt i stały rozwój.",
        kind: "link",
      },
      {
        id: "product-presentation",
        label: "Prezentacja produktu",
        href: routes.productPresentation,
        description: "Zdjęcia, grafiki i treści produktowe.",
        kind: "link",
      },
      {
        id: "audits-development",
        label: "Audyt i rozwój",
        href: routes.auditsDevelopment,
        description: "Diagnoza problemu i uporządkowanie priorytetów.",
        kind: "link",
      },
      {
        id: "process",
        label: "Jak pracujemy",
        href: routes.process,
        description: "Etapy, odpowiedzialności i następny krok.",
        kind: "link",
      },
    ],
  },
  {
    id: "about",
    label: "O nas",
    href: routes.about,
    kind: "link",
  },
] as const;

export const navigationConfig = {
  header: headerNavigation,
  mobile: headerNavigation,
  headerCtaId: "project-conversation",
  mobileCtaId: "project-conversation",
  footer: [
    {
      id: "websites",
      label: "Strony internetowe",
      items: [
        {
          id: "footer-websites",
          label: "Strony internetowe",
          href: routes.websites,
          kind: "link",
        },
        {
          id: "footer-company-websites",
          label: "Strony firmowe",
          href: routes.companyWebsites,
          kind: "link",
        },
        {
          id: "footer-landing-pages",
          label: "Landing page",
          href: routes.landingPages,
          kind: "link",
        },
        {
          id: "footer-website-care",
          label: "Opieka nad stroną",
          href: routes.websiteCare,
          kind: "link",
        },
      ],
    },
    {
      id: "stores",
      label: "Sklepy i Shoper",
      items: [
        {
          id: "footer-stores",
          label: "Sklepy internetowe",
          href: routes.stores,
          kind: "link",
        },
        {
          id: "footer-shoper-stores",
          label: "Sklepy Shoper",
          href: routes.shoperStores,
          kind: "link",
        },
        {
          id: "footer-shoper-config",
          label: "Konfiguracja Shopera",
          href: routes.shoperConfiguration,
          kind: "link",
        },
        {
          id: "footer-shoper-template",
          label: "Personalizacja szablonu",
          href: routes.shoperTemplate,
          kind: "link",
        },
        {
          id: "footer-store-care",
          label: "Opieka nad sklepem",
          href: routes.storeCare,
          kind: "link",
        },
      ],
    },
    {
      id: "marketplace-product",
      label: "Allegro i produkt",
      items: [
        {
          id: "footer-marketplace",
          label: "Allegro i marketplace",
          href: routes.marketplace,
          kind: "link",
        },
        {
          id: "footer-allegro-creation",
          label: "Tworzenie ofert Allegro",
          href: routes.allegroOfferCreation,
          kind: "link",
        },
        {
          id: "footer-allegro-optimization",
          label: "Optymalizacja ofert",
          href: routes.allegroOfferOptimization,
          kind: "link",
        },
        {
          id: "footer-product",
          label: "Prezentacja produktu",
          href: routes.productPresentation,
          kind: "link",
        },
      ],
    },
    {
      id: "audits",
      label: "Audyty i rozwój",
      items: [
        {
          id: "footer-audits",
          label: "Audyt i rozwój",
          href: routes.auditsDevelopment,
          kind: "link",
        },
        {
          id: "footer-website-audit",
          label: "Audyt strony",
          href: routes.websiteAudit,
          kind: "link",
        },
        {
          id: "footer-store-audit",
          label: "Audyt sklepu",
          href: routes.storeAudit,
          kind: "link",
        },
        {
          id: "footer-shoper-audit",
          label: "Audyt Shopera",
          href: routes.shoperAudit,
          kind: "link",
        },
      ],
    },
    {
      id: "studio",
      label: "Studio",
      items: [
        {
          id: "footer-projects",
          label: "Realizacje",
          href: routes.projects,
          kind: "link",
        },
        {
          id: "footer-offer",
          label: "Oferta",
          href: routes.offer,
          kind: "link",
        },
        {
          id: "footer-process",
          label: "Jak pracujemy",
          href: routes.process,
          kind: "link",
        },
        {
          id: "footer-about",
          label: "O nas",
          href: routes.about,
          kind: "link",
        },
        {
          id: "footer-contact",
          label: "Kontakt",
          href: routes.contact,
          kind: "link",
        },
        {
          id: "footer-brief",
          label: "Brief projektu",
          href: routes.brief,
          kind: "link",
        },
      ],
    },
    {
      id: "legal",
      label: "Informacje",
      items: [
        {
          id: "footer-privacy",
          label: "Polityka prywatności",
          href: routes.privacy,
          kind: "link",
        },
        {
          id: "footer-cookies",
          label: "Polityka cookies",
          href: routes.cookies,
          kind: "link",
        },
      ],
    },
  ],
} as const satisfies NavigationConfig;
