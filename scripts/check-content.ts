import { contactConfig } from "../src/config/contact.ts";
import { ctas } from "../src/config/ctas.ts";
import { navigationConfig } from "../src/config/navigation.ts";
import { dynamicRoutePatterns, routes } from "../src/config/routes.ts";
import { siteConfig } from "../src/config/site.ts";
import { audiences } from "../src/content/audiences.ts";
import { conversionPaths } from "../src/content/conversion-paths.ts";
import { faqs } from "../src/content/faqs.ts";
import { plannedPages } from "../src/content/page-registry.ts";
import {
  homepageSections,
  servicePageSections,
} from "../src/content/page-structures.ts";
import { processSteps } from "../src/content/process.ts";
import { projects } from "../src/content/projects.ts";
import { serviceGroups } from "../src/content/service-groups.ts";
import { services } from "../src/content/services.ts";
import { isPathActive } from "../src/lib/navigation-state.ts";
import {
  getBreadcrumbItems,
  renderedSiteHrefs,
} from "../src/lib/route-registry.ts";
import type { SitePath } from "../src/types/content.ts";
import type { NavigationItem } from "../src/types/navigation.ts";

const errors: string[] = [];

function check(condition: boolean, message: string): void {
  if (!condition) {
    errors.push(message);
  }
}

function findDuplicates(values: readonly string[]): string[] {
  const seen = new Set<string>();
  const duplicates = new Set<string>();

  for (const value of values) {
    if (seen.has(value)) {
      duplicates.add(value);
    }

    seen.add(value);
  }

  return [...duplicates].sort();
}

function checkUnique(label: string, values: readonly string[]): void {
  const duplicates = findDuplicates(values);
  check(
    duplicates.length === 0,
    `${label}: zduplikowane wartości: ${duplicates.join(", ")}`,
  );
}

function stripUrlDetails(href: SitePath): SitePath {
  const [path] = href.split(/[?#]/, 1);
  return (path || "/") as SitePath;
}

function isCleanStaticPath(href: SitePath): boolean {
  return (
    href === "/" ||
    /^\/(?:[a-z0-9]+(?:-[a-z0-9]+)*)(?:\/[a-z0-9]+(?:-[a-z0-9]+)*)*$/.test(href)
  );
}

function validateNavigationTree(
  label: string,
  items: readonly NavigationItem[],
  renderableHrefs: ReadonlySet<string>,
): void {
  function visitList(
    sectionLabel: string,
    sectionItems: readonly NavigationItem[],
  ): void {
    checkUnique(
      `${sectionLabel} — identyfikatory`,
      sectionItems.map((item) => item.id),
    );
    checkUnique(
      `${sectionLabel} — adresy`,
      sectionItems.map((item) => item.href),
    );

    for (const item of sectionItems) {
      check(
        item.href.trim().length > 0 && !item.href.includes("#"),
        `${sectionLabel}: element „${item.label}” ma pusty adres albo niedozwolony hash.`,
      );
      check(
        renderableHrefs.has(stripUrlDetails(item.href)),
        `${sectionLabel}: element „${item.label}” prowadzi do niewdrożonego adresu ${item.href}.`,
      );

      if (item.kind === "menu") {
        check(
          item.children.length > 0,
          `${sectionLabel}: menu „${item.label}” nie ma elementów podrzędnych.`,
        );
        visitList(`${sectionLabel} / ${item.label}`, item.children);

        if (item.presentation === "mega") {
          check(
            Boolean(item.groups?.length),
            `${sectionLabel}: megamenu „${item.label}” nie ma logicznych grup.`,
          );
        }

        if (item.groups) {
          checkUnique(
            `${sectionLabel} / ${item.label} — grupy`,
            item.groups.map((group) => group.id),
          );
          const childIds = new Set(item.children.map((child) => child.id));
          const groupedItemIds = item.groups.flatMap((group) => group.itemIds);

          checkUnique(
            `${sectionLabel} / ${item.label} — przypisanie do grup`,
            groupedItemIds,
          );

          for (const groupedItemId of groupedItemIds) {
            check(
              childIds.has(groupedItemId),
              `${sectionLabel}: grupa menu „${item.label}” wskazuje nieznaną pozycję ${groupedItemId}.`,
            );
          }

          for (const child of item.children) {
            check(
              groupedItemIds.includes(child.id),
              `${sectionLabel}: pozycja ${child.id} nie jest przypisana do grupy megamenu.`,
            );
          }
        }
      }
    }
  }

  visitList(label, items);
}

const staticRouteHrefs = Object.values(routes);
const knownHrefs = new Set<string>(staticRouteHrefs);
const renderableHrefs = new Set<string>(renderedSiteHrefs);
const pageIds = new Set(plannedPages.map((page) => page.id));
const pageHrefs = new Set(plannedPages.map((page) => page.href));
const ctaIds = new Set(ctas.map((cta) => cta.id));
const serviceGroupIds = new Set(serviceGroups.map((group) => group.id));
const serviceIds = new Set(services.map((service) => service.id));

checkUnique("Rejestr tras", staticRouteHrefs);
checkUnique("Wszystkie slugi usług i filarów", [
  ...serviceGroups.map((group) => group.slug),
  ...services.map((service) => service.slug),
]);
checkUnique(
  "Identyfikatory stron",
  plannedPages.map((page) => page.id),
);
checkUnique(
  "Adresy stron",
  plannedPages.map((page) => page.href),
);
checkUnique(
  "Identyfikatory filarów",
  serviceGroups.map((group) => group.id),
);
checkUnique(
  "Adresy filarów",
  serviceGroups.map((group) => group.href),
);
checkUnique(
  "Identyfikatory usług",
  services.map((service) => service.id),
);
checkUnique(
  "Slugi usług",
  services.map((service) => service.slug),
);
checkUnique(
  "Adresy usług",
  services.map((service) => service.href),
);
checkUnique(
  "Identyfikatory CTA",
  ctas.map((cta) => cta.id),
);
checkUnique("Wdrożone adresy", renderedSiteHrefs);
checkUnique(
  "Grupy stopki",
  navigationConfig.footer.map((group) => group.id),
);
check(
  isPathActive(routes.shoperStores, routes.stores),
  "Podstrona Shopera nie aktywuje nadrzędnego filaru sklepów.",
);
check(
  isPathActive(routes.landingPages, routes.websites),
  "Landing page nie aktywuje nadrzędnego filaru stron.",
);
check(
  !isPathActive(routes.websites, routes.stores),
  "Aktywny stan filaru obejmuje niepowiązaną trasę.",
);

for (const href of staticRouteHrefs) {
  check(isCleanStaticPath(href), `Trasa ma niepoprawny format: ${href}.`);
  check(
    pageHrefs.has(href),
    `Trasa ${href} nie występuje w rejestrze planowanych stron.`,
  );
  check(
    renderableHrefs.has(href),
    `Trasa ${href} nie ma wdrożonego widoku ani renderera technicznego.`,
  );
}

for (const pattern of Object.values(dynamicRoutePatterns)) {
  check(
    /^\/(?:[a-z0-9-]+\/)*\[[a-z][a-zA-Z]*\]$/.test(pattern),
    `Dynamiczny wzorzec ma niepoprawny format: ${pattern}.`,
  );
  check(
    !knownHrefs.has(pattern),
    `Dynamiczny wzorzec ${pattern} koliduje ze statyczną trasą.`,
  );
}

for (const page of plannedPages) {
  check(
    knownHrefs.has(page.href),
    `Strona ${page.id} używa adresu spoza rejestru tras.`,
  );
  check(
    page.seo.canonical === page.href,
    `Canonical strony ${page.id} nie jest zgodny z jej adresem.`,
  );
  check(
    page.seo.title.trim().length > 0 && page.seo.description.trim().length > 0,
    `Strona ${page.id} nie ma kompletnego modelu metadata.`,
  );

  if (page.parentId) {
    check(
      pageIds.has(page.parentId),
      `Strona ${page.id} ma nieznanego rodzica ${page.parentId}.`,
    );
    check(
      page.parentId !== page.id,
      `Strona ${page.id} wskazuje samą siebie jako rodzica.`,
    );
  }

  if (page.primaryCtaId) {
    check(
      ctaIds.has(page.primaryCtaId),
      `Strona ${page.id} używa nieznanego CTA.`,
    );
  }

  try {
    const breadcrumbs = getBreadcrumbItems(page.href);

    if (page.href === routes.home) {
      check(
        breadcrumbs.length === 0,
        "Strona główna nie powinna posiadać breadcrumbs.",
      );
    } else {
      const currentBreadcrumb = breadcrumbs.at(-1);
      check(
        currentBreadcrumb?.label === page.name && !currentBreadcrumb.href,
        `Breadcrumbs strony ${page.id} nie kończą się centralną etykietą bieżącej strony.`,
      );

      for (const breadcrumb of breadcrumbs.slice(0, -1)) {
        check(
          Boolean(breadcrumb.href && renderableHrefs.has(breadcrumb.href)),
          `Breadcrumbs strony ${page.id} zawierają niewdrożony adres.`,
        );
      }
    }
  } catch (error) {
    errors.push(
      `Breadcrumbs strony ${page.id}: ${error instanceof Error ? error.message : "nieznany błąd"}`,
    );
  }
}

for (const cta of ctas) {
  check(
    renderableHrefs.has(stripUrlDetails(cta.href)),
    `CTA ${cta.id} prowadzi do niewdrożonego adresu ${cta.href}.`,
  );
  check(
    cta.href.trim().length > 0 && !cta.href.includes("#"),
    `CTA ${cta.id} ma pusty lub niedozwolony adres.`,
  );
}

for (const group of serviceGroups) {
  check(
    group.slug === group.href.split("/").at(-1),
    `Slug filaru ${group.id} nie odpowiada adresowi ${group.href}.`,
  );
  check(
    ctaIds.has(group.primaryCtaId),
    `Filar ${group.id} używa nieznanego CTA.`,
  );
  check(
    group.seo.canonical === group.href,
    `Canonical filaru ${group.id} nie odpowiada jego adresowi.`,
  );
  check(
    pageIds.has(`group:${group.id}`),
    `Filar ${group.id} nie ma wpisu w rejestrze stron.`,
  );
}

for (const service of services) {
  const group = serviceGroups.find(
    (candidate) => candidate.id === service.group,
  );

  check(
    serviceGroupIds.has(service.group),
    `Usługa ${service.id} ma nieznany filar.`,
  );
  check(
    service.slug === service.href.split("/").at(-1),
    `Slug usługi ${service.id} nie odpowiada adresowi ${service.href}.`,
  );
  check(
    group ? service.href.startsWith(`${group.href}/`) : false,
    `Adres usługi ${service.id} nie znajduje się pod adresem jej filaru.`,
  );
  check(
    ctaIds.has(service.primaryCtaId),
    `Usługa ${service.id} używa nieznanego CTA.`,
  );
  check(
    service.seo.canonical === service.href,
    `Canonical usługi ${service.id} nie odpowiada jej adresowi.`,
  );
  check(
    pageIds.has(`service:${service.id}`),
    `Usługa ${service.id} nie ma wpisu w rejestrze stron.`,
  );
  checkUnique(
    `Relacje usługi ${service.id}`,
    service.relatedServices.map((relation) => relation.serviceId),
  );

  for (const relation of service.relatedServices) {
    check(
      serviceIds.has(relation.serviceId),
      `Usługa ${service.id} odwołuje się do nieznanej usługi ${relation.serviceId}.`,
    );
    check(
      relation.serviceId !== service.id,
      `Usługa ${service.id} nie może być powiązana sama ze sobą.`,
    );
  }
}

check(
  navigationConfig.header.length <= 7,
  "Nawigacja nagłówka ma więcej niż siedem pozycji głównych.",
);
validateNavigationTree(
  "Nawigacja desktopowa",
  navigationConfig.header,
  renderableHrefs,
);
validateNavigationTree(
  "Nawigacja mobilna",
  navigationConfig.mobile,
  renderableHrefs,
);
check(
  navigationConfig.mobile === navigationConfig.header,
  "Nawigacja desktopowa i mobilna nie korzystają z tego samego źródła danych.",
);

for (const footerGroup of navigationConfig.footer) {
  validateNavigationTree(
    `Stopka: ${footerGroup.label}`,
    footerGroup.items,
    renderableHrefs,
  );
}

check(
  ctaIds.has(navigationConfig.headerCtaId),
  "Nagłówek używa nieznanego głównego CTA.",
);
check(
  ctaIds.has(navigationConfig.mobileCtaId),
  "Menu mobilne używa nieznanego głównego CTA.",
);

checkUnique(
  "Identyfikatory segmentów",
  audiences.map((audience) => audience.id),
);
for (const audience of audiences) {
  const entryExists =
    audience.entryPoint.kind === "group"
      ? serviceGroupIds.has(audience.entryPoint.id)
      : serviceIds.has(audience.entryPoint.id);
  check(entryExists, `Segment ${audience.id} ma nieznany punkt wejścia.`);
  check(
    ctaIds.has(audience.ctaId),
    `Segment ${audience.id} używa nieznanego CTA.`,
  );
}

checkUnique(
  "Identyfikatory kroków procesu",
  processSteps.map((step) => step.id),
);
checkUnique(
  "Kolejność kroków procesu",
  processSteps.map((step) => String(step.order)),
);
for (const [index, step] of processSteps.entries()) {
  check(
    step.order === index + 1,
    `Krok procesu ${step.id} ma niespójną kolejność.`,
  );
}

checkUnique(
  "Identyfikatory FAQ",
  faqs.map((faq) => faq.id),
);
for (const faq of faqs) {
  check(
    faq.question.endsWith("?"),
    `Pytanie FAQ ${faq.id} nie kończy się znakiem zapytania.`,
  );
  for (const serviceId of faq.relatedServiceIds) {
    check(
      serviceIds.has(serviceId),
      `FAQ ${faq.id} wskazuje nieznaną usługę ${serviceId}.`,
    );
  }
  for (const href of faq.relatedPageHrefs) {
    check(
      knownHrefs.has(href),
      `FAQ ${faq.id} wskazuje nieznaną stronę ${href}.`,
    );
  }
}

checkUnique(
  "Identyfikatory sekcji strony głównej",
  homepageSections.map((section) => section.id),
);
checkUnique(
  "Kolejność sekcji strony głównej",
  homepageSections.map((section) => String(section.order)),
);
check(
  homepageSections.length === 13,
  "Model strony głównej nie zawiera 13 sekcji.",
);
for (const [index, section] of homepageSections.entries()) {
  check(
    section.order === index + 1,
    `Sekcja homepage ${section.id} ma niespójną kolejność.`,
  );
  for (const ctaId of section.ctaIds) {
    check(
      ctaIds.has(ctaId),
      `Sekcja homepage ${section.id} używa nieznanego CTA.`,
    );
  }
  for (const href of section.linkedHrefs) {
    check(
      knownHrefs.has(href),
      `Sekcja homepage ${section.id} wskazuje nieznaną stronę.`,
    );
  }
}

checkUnique(
  "Identyfikatory sekcji strony usługi",
  servicePageSections.map((section) => section.id),
);
checkUnique(
  "Kolejność sekcji strony usługi",
  servicePageSections.map((section) => String(section.order)),
);
for (const [index, section] of servicePageSections.entries()) {
  check(
    section.order === index + 1,
    `Sekcja usługi ${section.id} ma niespójną kolejność.`,
  );
}

checkUnique(
  "Identyfikatory ścieżek konwersji",
  conversionPaths.map((path) => path.id),
);
for (const path of conversionPaths) {
  check(
    ctaIds.has(path.primaryCtaId),
    `Ścieżka ${path.id} używa nieznanego głównego CTA.`,
  );
  check(
    ctaIds.has(path.secondaryCtaId),
    `Ścieżka ${path.id} używa nieznanego CTA pomocniczego.`,
  );
  for (const href of path.steps) {
    check(
      knownHrefs.has(href),
      `Ścieżka ${path.id} wskazuje nieznany adres ${href}.`,
    );
  }
}

checkUnique(
  "Identyfikatory realizacji",
  projects.map((project) => project.id),
);
checkUnique(
  "Slugi realizacji",
  projects.map((project) => project.slug),
);
for (const project of projects) {
  check(
    /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(project.slug),
    `Realizacja ${project.id} ma niepoprawny slug.`,
  );
  for (const serviceId of project.relatedServiceIds) {
    check(
      serviceIds.has(serviceId),
      `Realizacja ${project.id} wskazuje nieznaną usługę ${serviceId}.`,
    );
  }
  check(
    ctaIds.has(project.primaryCtaId),
    `Realizacja ${project.id} używa nieznanego CTA.`,
  );
}

check(
  ctaIds.has(siteConfig.primaryCtaId),
  "Konfiguracja witryny używa nieznanego CTA.",
);
check(
  siteConfig.url === "https://ofertastudio.pl",
  "Domena witryny jest niespójna.",
);
check(
  contactConfig.contactHref === routes.contact,
  "Adres kontaktu jest niespójny.",
);
check(contactConfig.briefHref === routes.brief, "Adres briefu jest niespójny.");

for (const [network, href] of Object.entries(contactConfig.socialProfiles)) {
  if (href) {
    check(
      /^https:\/\//.test(href),
      `Profil ${network} nie używa bezpiecznego adresu HTTPS.`,
    );
  }
}

if (contactConfig.status === "requires-confirmation") {
  check(
    contactConfig.email === null,
    "Niepotwierdzony e-mail powinien pozostać pusty.",
  );
  check(
    contactConfig.phone === null,
    "Niepotwierdzony telefon powinien pozostać pusty.",
  );
  check(
    contactConfig.address === null,
    "Niepotwierdzony adres powinien pozostać pusty.",
  );
  check(
    contactConfig.legalName === null,
    "Niepotwierdzona nazwa prawna powinna pozostać pusta.",
  );
  check(
    contactConfig.taxId === null,
    "Niepotwierdzony NIP powinien pozostać pusty.",
  );
}

if (errors.length > 0) {
  console.error(`Walidacja treści nie powiodła się (${errors.length}):`);
  for (const error of errors) {
    console.error(`- ${error}`);
  }
  process.exitCode = 1;
} else {
  console.log("Walidacja treści zakończona pomyślnie.");
  console.log(
    `Sprawdzono: ${plannedPages.length} stron, ${serviceGroups.length} filarów, ${services.length} usług, ${audiences.length} segmentów i ${ctas.length} CTA.`,
  );
}
