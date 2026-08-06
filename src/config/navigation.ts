import type { NavigationConfig } from "../types/navigation.ts";
import { routes } from "./routes.ts";

const headerNavigation = [
  {
    id: "websites",
    label: "Strony",
    href: routes.websites,
    kind: "menu",
    children: [
      {
        id: "websites-overview",
        label: "Strony internetowe",
        href: routes.websites,
        description: "Projektowanie, wdrożenia i rozwój stron.",
        kind: "link",
      },
      {
        id: "company-websites",
        label: "Strony firmowe",
        href: routes.companyWebsites,
        kind: "link",
      },
      {
        id: "landing-pages",
        label: "Landing page",
        href: routes.landingPages,
        kind: "link",
      },
      {
        id: "website-modernization",
        label: "Modernizacja strony",
        href: routes.websiteModernization,
        kind: "link",
      },
      {
        id: "website-care",
        label: "Opieka nad stroną",
        href: routes.websiteCare,
        kind: "link",
      },
    ],
  },
  {
    id: "stores",
    label: "Sklepy i Shoper",
    href: routes.stores,
    kind: "menu",
    children: [
      {
        id: "stores-overview",
        label: "Sklepy internetowe",
        href: routes.stores,
        description: "Sprzedaż, Shoper, UX i rozwój sklepu.",
        kind: "link",
      },
      {
        id: "shoper-stores",
        label: "Sklepy Shoper",
        href: routes.shoperStores,
        kind: "link",
      },
      {
        id: "shoper-configuration",
        label: "Konfiguracja Shopera",
        href: routes.shoperConfiguration,
        kind: "link",
      },
      {
        id: "shoper-template",
        label: "Personalizacja szablonu",
        href: routes.shoperTemplate,
        kind: "link",
      },
      {
        id: "store-development",
        label: "Rozwój i UX sklepu",
        href: routes.storeUxDevelopment,
        kind: "link",
      },
      {
        id: "store-care",
        label: "Opieka nad sklepem",
        href: routes.storeCare,
        kind: "link",
      },
      {
        id: "store-audit",
        label: "Audyt sklepu",
        href: routes.storeAudit,
        kind: "link",
      },
    ],
  },
  {
    id: "marketplace",
    label: "Allegro",
    href: routes.marketplace,
    kind: "menu",
    children: [
      {
        id: "marketplace-overview",
        label: "Allegro i marketplace",
        href: routes.marketplace,
        description: "Oferty, optymalizacja i katalogi produktów.",
        kind: "link",
      },
      {
        id: "allegro-creation",
        label: "Tworzenie ofert Allegro",
        href: routes.allegroOfferCreation,
        kind: "link",
      },
      {
        id: "allegro-optimization",
        label: "Optymalizacja ofert Allegro",
        href: routes.allegroOfferOptimization,
        kind: "link",
      },
      {
        id: "allegro-audit",
        label: "Audyt ofert Allegro",
        href: routes.allegroAudit,
        kind: "link",
      },
      {
        id: "olx-offers",
        label: "Oferty OLX",
        href: routes.olxOffers,
        kind: "link",
      },
      {
        id: "product-presentation-context",
        label: "Zdjęcia, grafiki i opisy",
        href: routes.productPresentation,
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
    kind: "menu",
    children: [
      {
        id: "offer-overview",
        label: "Pełna oferta",
        href: routes.offer,
        kind: "link",
      },
      {
        id: "product-presentation",
        label: "Prezentacja produktu",
        href: routes.productPresentation,
        kind: "link",
      },
      {
        id: "audits-development",
        label: "Audyt i rozwój",
        href: routes.auditsDevelopment,
        kind: "link",
      },
      {
        id: "process",
        label: "Jak pracujemy",
        href: routes.process,
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
      id: "services",
      label: "Usługi",
      items: [
        {
          id: "footer-websites",
          label: "Strony internetowe",
          href: routes.websites,
          kind: "link",
        },
        {
          id: "footer-stores",
          label: "Sklepy i Shoper",
          href: routes.stores,
          kind: "link",
        },
        {
          id: "footer-marketplace",
          label: "Allegro i marketplace",
          href: routes.marketplace,
          kind: "link",
        },
        {
          id: "footer-product",
          label: "Prezentacja produktu",
          href: routes.productPresentation,
          kind: "link",
        },
        {
          id: "footer-audits",
          label: "Audyt i rozwój",
          href: routes.auditsDevelopment,
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
