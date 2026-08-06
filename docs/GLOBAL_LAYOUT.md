# Globalny layout OfertaStudio

## Status

Produkcyjny globalny shell został wdrożony w etapie 4. Jest wspólny dla strony głównej, technicznych podstron, `/design-system` i strony 404. Header ani footer nie mogą być kopiowane do poszczególnych route’ów.

## Root layout

`src/app/layout.tsx` pozostaje Server Component i tworzy następującą strukturę:

```text
html[lang="pl"]
└── body
    ├── SkipLink
    ├── SiteHeader
    │   ├── BrandMark
    │   └── MainNavigation (mała granica klientowa)
    ├── zawartość route
    │   └── PageShell
    │       ├── main#main-content
    │       │   ├── PageHeader (opcjonalny)
    │       │   └── treść strony
    │       └── GlobalCta (opcjonalne)
    └── SiteFooter
```

Font, metadata globalne i język pozostają własnością root layoutu. Nie dodajemy globalnego providera bez rzeczywistej potrzeby.

## Server i Client Components

| Element                                | Runtime                  | Uzasadnienie                                                       |
| -------------------------------------- | ------------------------ | ------------------------------------------------------------------ |
| `RootLayout`                           | Server                   | Kompozycja dokumentu i metadata.                                   |
| `SkipLink`                             | Server                   | Natywny link nie wymaga stanu.                                     |
| `SiteHeader`                           | Server                   | Rama headera i marka są statyczne.                                 |
| `MainNavigation`                       | Client                   | `usePathname`, stan dropdownów, natywny dialog i focus management. |
| `DesktopNavigation`                    | klientowa część boundary | Otrzymuje stan i zdarzenia z kontrolera.                           |
| `MobileNavigation`                     | klientowa część boundary | Dialog, akordeon i obsługa zamykania.                              |
| `PageShell`, `PageHeader`, `GlobalCta` | Server                   | Kompozycja zależy od propsów strony, nie od przeglądarki.          |
| `SiteFooter`                           | Server                   | Rok i dane konfiguracyjne powstają bez hydration risk.             |

Jedynym plikiem z dyrektywą `"use client"` jest `MainNavigation`. `SiteHeader` izoluje go dodatkowo przez `Suspense`, zgodnie z zachowaniem `usePathname` opisanym w dokumentacji użytej wersji Next.js.

Wewnętrzny kontroler stanu `MainNavigation` jest kluczowany przez aktualny pathname. Zmiana trasy — również przez historię przeglądarki — odmontowuje poprzedni stan dropdownów, dialogu i akordeonów oraz uruchamia cleanup blokady scrolla.

## Skip link i główna treść

`SkipLink` jest pierwszym interaktywnym elementem `body`. Po focusie pojawia się nad interfejsem i prowadzi do `#main-content`. Każdy route używa `PageShell`, który tworzy dokładnie jeden landmark `main` z tym identyfikatorem oraz `tabIndex={-1}`.

Strona główna nie renderuje breadcrumbs. Podstrony pobierają ich etykiety i rodziców z centralnego rejestru, a nie z przekształcenia fragmentów URL.

## PageShell

`PageShell` odpowiada za:

- `main#main-content`,
- opcjonalny `PageHeader`,
- przekazanie breadcrumbs,
- treść właściwą route,
- opcjonalne globalne CTA przed stopką,
- zachowanie `flex: 1` w globalnym układzie.

Najważniejsze propsy:

- `header` — kontrakt `PageHeader` bez breadcrumbs,
- `breadcrumbs` — centralnie zbudowana lista,
- `showGlobalCta` — domyślnie `true`,
- `globalCta` — nadpisanie treści lub wariantu,
- `mainClassName` — wyjątkowe, uzasadnione rozszerzenie głównego landmarku.

Strony kontaktu, briefu, prawne i 404 wyłączają globalne CTA, aby uniknąć działania prowadzącego do bieżącej strony albo publikowania niegotowej ścieżki.

## PageHeader

Komponent obsługuje:

- breadcrumbs,
- eyebrow,
- jeden `h1`,
- lead,
- akcję główną i pomocniczą,
- opcjonalny element wizualny,
- wariant `standard` i `compact`,
- powierzchnie `default`, `muted`, `strong`,
- warianty kontenera.

Nie jest finalnym hero usługi. To baza, którą późniejsze strony mogą zestawiać z własnymi semantycznymi sekcjami.

## GlobalCta

Domyślna treść i identyfikatory CTA znajdują się w `src/config/layout.ts`. Komponent pobiera rzeczywiste linki z `src/config/ctas.ts`, więc nie powiela etykiet ani adresów na stronach.

Warianty:

- `strong` — domyślne, końcowe CTA przed stopką,
- `default` — panel na jasnej powierzchni.

Strona może wyłączyć panel albo jawnie nadpisać tytuł, opis, CTA i wariant. Nadal może użyć wyłącznie zatwierdzonych identyfikatorów CTA.

## Routing techniczny

`src/app/[...slug]/page.tsx` renderuje wszystkie statyczne adresy z centralnego rejestru przez `TechnicalRoute`. Rozwiązanie:

- zapobiega 404 dla linków użytych w headerze i stopce,
- nie tworzy kilkudziesięciu identycznych plików route,
- używa `generateStaticParams`,
- dla nieznanego wpisu wywołuje `notFound()`, więc przypadkowe adresy nadal zwracają 404 bez logowania błędu fallbacku,
- ustawia techniczne placeholdery jako `noindex, follow`,
- zachowuje docelowy model metadata i canonical,
- jasno komunikuje, że finalny widok nie jest jeszcze gotowy.

Status `planned` w modelu treści oznacza nadal brak finalnej treści marketingowej. Nie jest utożsamiany z brakiem działającego routingu.

## Anchory i sticky header

Globalne tokeny:

- `--header-height-mobile: 4.25rem`,
- `--header-height-desktop: 4.75rem` od 1280 px.

`html` otrzymuje `scroll-padding-top`, a elementy z `id` — `scroll-margin-top`. Dzięki temu skip link i linki kotwicowe nie chowają tytułu pod sticky headerem.

## Warstwy

Kontrolowana skala w `globals.css`:

| Token               | Rola                       |
| ------------------- | -------------------------- |
| `--layer-base`      | zwykła treść,              |
| `--layer-header`    | sticky header,             |
| `--layer-dropdown`  | dropdown i megamenu,       |
| `--layer-overlay`   | przyszły overlay,          |
| `--layer-panel`     | przyszły panel,            |
| `--layer-tooltip`   | przyszły tooltip,          |
| `--layer-modal`     | przyszły modal,            |
| `--layer-skip-link` | link pomijający nawigację. |

Natywny modalny `dialog` korzysta z top layer przeglądarki. Nie stosujemy wartości `99999` ani lokalnych z-indexów.

## Globalny spacing i responsywność

- Header korzysta z kontenera `wide` i kontrolowanego guttera.
- PageHeader i GlobalCta domyślnie używają kontenera `wide`.
- Właściwe sekcje nadal samodzielnie wybierają `text`, `content`, `default` albo `wide`.
- Nie nakładamy jednego kontenera na całą stronę, ponieważ utrudniałoby to pełne powierzchnie sekcji.
- Layout działa od 320 px; desktopowa nawigacja włącza się dopiero przy 1280 px.

## Zasady kolejnych stron

1. Każda strona używa globalnego root layoutu automatycznie.
2. Route powinien użyć `PageShell`, a nie tworzyć drugiego `main`.
3. Nie kopiuj `SiteHeader`, `SiteFooter`, breadcrumbs ani globalnego CTA.
4. Breadcrumbs buduj z rejestru tras.
5. Samodzielnie wyłącz `GlobalCta` tylko z powodu intencji lub konfliktu działania.
6. Nowy layout sprawdź od 320 px, przy 1024–1280 px i na szerokim ekranie.
7. Zmianę publicznego kontraktu pokaż na `/design-system` i opisz w inwentarzu.
