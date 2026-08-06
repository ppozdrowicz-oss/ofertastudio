import type { SitePath } from "../types/content.ts";

export const routes = {
  home: "/",
  websites: "/strony-internetowe",
  companyWebsites: "/strony-internetowe/strony-firmowe",
  landingPages: "/strony-internetowe/landing-page",
  websiteModernization: "/strony-internetowe/modernizacja-strony",
  websiteCare: "/strony-internetowe/opieka-nad-strona",
  stores: "/sklepy-internetowe",
  shoperStores: "/sklepy-internetowe/sklepy-shoper",
  shoperConfiguration: "/sklepy-internetowe/konfiguracja-shopera",
  shoperTemplate: "/sklepy-internetowe/personalizacja-szablonu-shoper",
  storeUxDevelopment: "/sklepy-internetowe/rozwoj-i-ux-sklepu",
  storeCare: "/sklepy-internetowe/opieka-nad-sklepem",
  marketplace: "/allegro-i-marketplace",
  allegroOfferCreation: "/allegro-i-marketplace/tworzenie-ofert-allegro",
  allegroOfferOptimization:
    "/allegro-i-marketplace/optymalizacja-ofert-allegro",
  olxOffers: "/allegro-i-marketplace/oferty-olx",
  productPresentation: "/prezentacja-produktu",
  productPhotos: "/prezentacja-produktu/zdjecia-produktowe",
  productGraphics: "/prezentacja-produktu/grafiki-produktowe",
  productDescriptions: "/prezentacja-produktu/opisy-produktowe",
  auditsDevelopment: "/audyty-i-rozwoj",
  websiteAudit: "/audyty-i-rozwoj/audyt-strony-internetowej",
  storeAudit: "/audyty-i-rozwoj/audyt-sklepu-internetowego",
  shoperAudit: "/audyty-i-rozwoj/audyt-shopera",
  allegroAudit: "/audyty-i-rozwoj/audyt-ofert-allegro",
  salesConsulting: "/audyty-i-rozwoj/konsultacja-sprzedazy-online",
  ecosystemCare: "/audyty-i-rozwoj/stala-opieka-i-rozwoj",
  projects: "/realizacje",
  offer: "/oferta",
  process: "/jak-pracujemy",
  about: "/o-nas",
  contact: "/kontakt",
  brief: "/brief",
  privacy: "/polityka-prywatnosci",
  cookies: "/polityka-cookies",
} as const satisfies Record<string, SitePath>;

export const dynamicRoutePatterns = {
  project: "/realizacje/[slug]",
} as const satisfies Record<string, SitePath>;

export type KnownRoute = (typeof routes)[keyof typeof routes];
