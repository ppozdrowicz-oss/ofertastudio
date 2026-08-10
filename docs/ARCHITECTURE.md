# Architektura OfertaStudio

## Stack i założenia bazowe

Projekt jest aplikacją Next.js 16 z App Routerem, Reactem 19 i TypeScriptem w trybie `strict`. Warstwę prezentacji budują Tailwind CSS 4 oraz CSS Custom Properties. Opcjonalną warstwę przestrzenną tworzą Three.js i React Three Fiber. ESLint odpowiada za reguły frameworka, TypeScriptu i importów, a Prettier za spójne formatowanie kodu, CSS, JSON i Markdown.

Aplikacja jest obecnie statycznym serwisem usługowym. Nie ma CMS, bazy danych, uwierzytelniania ani zewnętrznych integracji. Takie elementy mogą zostać dodane dopiero po potwierdzeniu rzeczywistego wymagania biznesowego.

Lokalny development korzysta z domyślnego Turbopacka. Produkcyjny skrypt używa oficjalnego przełącznika `next build --webpack`, ponieważ środowisko wykonawcze projektu blokuje lokalny port IPC procesu PostCSS uruchamianego przez Turbopack. Z tego samego powodu konfiguracja wyłącza procesowy `experimental.useTypeScriptCli`, korzysta z programatycznego API TypeScript i wykonuje build Webpacka w procesie głównym. Pełny typecheck nadal działa osobno i w trakcie buildu. Są to ustawienia wykonawcze, nie zmiana architektury aplikacji; można je ponownie zweryfikować po zmianie środowiska CI lub aktualizacji narzędzi.

## Struktura katalogów

```text
src/
  app/                  # route'y, layout, metadata i pliki specjalne
  components/
    experience/         # izolowana granica WebGL, scena i kontrolery
    layout/             # prymitywy i produkcyjna rama globalna strony
    navigation/         # kontrolowana granica klientowa menu
    sections/           # kompozycje sekcji o znaczeniu dla widoku
    ui/                 # małe prymitywy interfejsu
    shared/             # współdzielone komponenty domenowe i kompozycyjne
  config/               # konfiguracja serwisu niezależna od konkretnej strony
  content/              # typowane modele i treści widoków
  hooks/                # wyłącznie współdzielone hooki z realnymi konsumentami
  lib/                  # małe funkcje pomocnicze, w tym czyste modele experience
  styles/               # globalne style i tokeny
  types/                # wyłącznie współdzielone typy domenowe
public/
  images/
    brand/
    services/
    projects/
    placeholders/
docs/
scripts/                # lokalne kontrole integralności treści
```

Katalog `types` zawiera współdzielone kontrakty domenowe treści, usług, nawigacji i realizacji. Prymitywy współdzielone przez kilka domen znajdują się w `types/core.ts`, co zapobiega cyklicznym zależnościom typów. Katalog `shared` ma realnych konsumentów: zawiera komponenty domenowe i kompozycyjne zbudowane na prymitywach UI. Katalog `hooks` nie istnieje, ponieważ logika nawigacji i experience pozostaje blisko swoich pojedynczych konsumentów. Pliki `index.ts` tworzymy tylko wtedy, gdy stabilizują publiczny interfejs niewielkiego modułu, a nie jako domyślną warstwę każdego katalogu.

## Podział komponentów

- **UI** — małe, dostępne elementy z ograniczonym zestawem wariantów, bez wiedzy o konkretnej stronie. Przykład: `Button` i `ButtonLink` ze wspólnym systemem wariantów.
- **Layout** — prymitywy kontrolujące szerokość i rytm kompozycji. Przykłady: `Container`, `Section`.
- **Sections** — semantyczne fragmenty widoku składające UI, layout i treść; mogą znać model konkretnej sekcji.
- **Shared** — większe elementy domenowe używane na wielu stronach, np. karta realizacji, jeśli pojawi się co najmniej dwóch realnych konsumentów.
- **Experience** — odseparowane elementy progresywnego WebGL: granica canvasu, kamera, kontrolery jakości, atmosfera i procedury sceny. Nie przechowują treści ani routingu.
- **Route** — plik `page.tsx` kompozytuje sekcje i definiuje sprawy właściwe dla adresu. Nie powinien zawierać rozbudowanej implementacji wizualnej.

Komponenty przyjmują standardowe atrybuty HTML, kiedy ma to sens, zachowują semantykę i nie dublują natywnego elementu bez korzyści. Wspólne warianty powinny wynikać z design systemu, a nie z pojedynczego widoku.

## Server Components i Client Components

Wszystkie komponenty są domyślnie Server Components. Pozwala to ograniczyć JavaScript wysyłany do przeglądarki i utrzymać prosty model renderowania treści. Projekt ma dwie jawne, rozłączne granice klientowe:

- `MainNavigation` obsługuje `usePathname`, dropdowny, modalne menu mobilne, blokadę scrolla i focus management;
- `ExperienceCanvas` obsługuje możliwości przeglądarki, lazy mount renderera, scroll, pointer i fallback. Ciężki `ExperienceRenderer` jest dodatkowo importowany dynamicznie z wyłączonym SSR.

`SiteHeader`, root layout, `PageShell`, `SiteFooter` oraz route laboratorium pozostają Server Components.

Dyrektywę `"use client"` dodajemy wyłącznie do najniższego komponentu, który potrzebuje:

- lokalnego stanu lub reducerów,
- obsługi zdarzeń przeglądarki,
- efektów,
- dostępu do API przeglądarki,
- biblioteki działającej tylko po stronie klienta.

Nie oznaczamy całych stron ani layoutu jako klientowe dla wygody. Dane i treści powinny pozostać po stronie serwera, a do klienta przekazujemy możliwie mały, serializowalny kontrakt.

## Warstwa interactive experience

Warstwa „The Conversion Landscape” jest progresywnym rozszerzeniem wybranych widoków. HTML i SEO nie zależą od WebGL. Jej przepływ to: natywny scroll → progres `0–1` → tłumiony stan sceny → `CameraRig`. Scroll nigdy nie zapisuje bezpośrednio transformacji kamery.

Podział modułów:

- `src/components/experience/experience-canvas.tsx` — jedyna jawna granica klientowa, detekcja możliwości, lazy mount i fallback,
- `experience-renderer.tsx` — `Canvas` R3F i konfiguracja renderera,
- `experience-scene.tsx` — cienka kompozycja sceny,
- `camera-rig.tsx` i `scroll-scene-controller.tsx` — ruch kamery i tłumienie progresu,
- `prototype-landscape.tsx`, `atmosphere.tsx`, `lighting.tsx` — proceduralny prototyp wizualny,
- `performance-controller.tsx` — DPR, invalidacja i utrata kontekstu,
- `webgl-fallback.tsx` — statyczna, serwerowo widoczna degradacja,
- `src/lib/experience` — czyste modele ruchu, zakresów, jakości i mapowania tokenów.

R3F zarządza jedyną ciągłą pętlą renderowania. Pojedynczy RAF w `ExperienceCanvas` wyłącznie koaleskuje pomiary scrolla. Nie ma Lenisa, własnego smooth-scroll engine, Drei, shaderów ani postprocessingu. Szczegóły opisują `INTERACTIVE_EXPERIENCE.md`, `MOTION_SYSTEM.md` i `WEBGL_PERFORMANCE.md`.

## Przechowywanie treści

Stałe treści i modele sekcji trafiają do `src/content` jako typowane moduły TypeScript. Konfiguracja całego serwisu, taka jak nazwa, domena, trasy, CTA, nawigacja i dane kontaktowe, znajduje się w `src/config`.

Podział odpowiedzialności:

- `src/config/routes.ts` — pojedyncze źródło statycznych adresów i wzorców dynamicznych,
- `src/config/site.ts` i `contact.ts` — marka, metadata i bezpieczne, niepotwierdzone jeszcze dane firmy,
- `src/config/ctas.ts` — zamknięty system pięciu CTA,
- `src/config/layout.ts` — domyślna treść i CTA panelu globalnego,
- `src/config/navigation.ts` — menu nagłówka, mobile i stopki,
- `src/content/service-groups.ts` i `services.ts` — hierarchia oferty i relacje,
- `src/content/page-registry.ts` — planowane strony, intencje, canonicale i statusy,
- pozostałe moduły `src/content` — segmenty, proces, FAQ, ścieżki, struktury widoków i realizacje,
- `src/types` — wspólne kontrakty tych danych.
- `src/lib/route-registry.ts` — serwerowe połączenie rejestru stron z parametrami technicznych tras i breadcrumbs.

Komponent sekcji odpowiada za prezentację, nie za przechowywanie długich bloków copy. Dane muszą mieć stabilne identyfikatory, jeśli będą używane w listach lub linkach. CMS nie jest planowany bez decyzji biznesowej; jego ewentualne wprowadzenie powinno zachować istniejące kontrakty modeli treści.

Integralność sprawdza `npm run content:check`. Skrypt nie zastępuje TypeScriptu: kontroluje relacje runtime, między innymi duplikaty adresów i slugów, istnienie powiązanych usług, prawidłowe CTA, wdrożenie każdego linku menu i stopki, kompletność grup megamenu, centralne breadcrumbs, rodziców stron i bezpieczne dane kontaktowe.

## Metadata i SEO

- `src/config/site.ts` jest źródłem wspólnych wartości marki i domeny.
- `src/app/layout.tsx` definiuje domyślny tytuł, template, opis, Open Graph, Twitter i dyrektywy robotów.
- `src/app/robots.ts` publikuje bazowy `robots.txt`.
- `src/content/page-registry.ts` przechowuje zaakceptowane założenia metadata i canonicali przyszłych podstron.
- Każda przyszła podstrona statyczna generuje metadata z właściwego wpisu rejestru; `generateMetadata` stosujemy dla danych dynamicznych lub wspólnego, typowanego helpera.
- Status `planned` oznacza brak finalnej treści. Jeśli trasa jest użyta w globalnej nawigacji, wspólny renderer techniczny zapewnia działający, jawnie opisany widok `noindex`; nie publikujemy linków prowadzących do 404.
- Dane strukturalne pojawią się w etapie 12 i muszą odzwierciedlać widoczną, zweryfikowaną treść.

## Dodawanie podstron

1. Potwierdź miejsce podstrony w `INFORMATION_ARCHITECTURE.md`, intencję w `SEO_CONTENT_MAP.md` i różnicę wobec stron sąsiednich.
2. Dodaj lub zaktualizuj trasę, usługę, relacje i wpis w rejestrze; uruchom `npm run content:check`.
3. Zastąp widok techniczny dedykowanym segmentem w `src/app` z możliwie cienkim `page.tsx`, gdy finalny zakres strony jest gotowy.
4. Dodaj typowany model treści w `src/content`, jeśli treść ma więcej niż kilka prostych etykiet.
5. Zbuduj semantyczne sekcje, wykorzystując istniejące tokeny i prymitywy.
6. Wygeneruj unikalne metadata z modelu i dodaj właściwe linkowanie wewnętrzne.
7. Sprawdź widok od 320 px, klawiaturę, focus, hierarchię nagłówków i preferencję ograniczonego ruchu.
8. Uruchom pełny zestaw kontroli jakości, w tym walidację treści.

Wspólny `src/app/[...slug]/page.tsx` statycznie renderuje znane adresy przez `generateStaticParams`; nieznany URL przechodzi przez jawne `notFound()` i nadal zwraca 404. Route groups można wprowadzić dopiero, gdy kilka finalnych route'ów rzeczywiście współdzieli osobny layout lub organizację. Dynamiczne realizacje wymagają prawdziwego źródła slugów i jawnej obsługi braku danych.

## Style i tokeny

`src/styles/globals.css` zawiera finalne tokeny Flat Modern Premium: surową paletę, kolory semantyczne, pełną typografię, odstępy, kontenery, promienie, cienie i ruch. Zawiera również ograniczony zestaw semantycznych tokenów `--experience-*` oraz warstwy tła, canvasu i treści. `@theme inline` udostępnia potrzebne wartości jako narzędzia Tailwind CSS. Komponenty korzystają z tokenów semantycznych i nie zawierają lokalnych kolorów hex.

Preferowana kolejność decyzji stylów to: istniejący komponent → istniejący token → uzasadnione rozszerzenie design systemu → dopiero lokalna wartość wyjątkowa. Nie stosujemy przypadkowych gradientów ani niepowiązanych efektów.

Techniczna trasa `/design-system` prezentuje publiczne warianty komponentów. `/experience-lab` prezentuje lazy WebGL, model scrolla, quality tiers i wymuszony fallback. Obie mają metadata `noindex, nofollow`, nie znajdują się w nawigacji ani produkcyjnym rejestrze stron. `npm run design:check` sprawdza komponenty i tokeny, a `npm run experience:check` zakresy narracji, budżety jakości, progressive enhancement, cleanup oraz izolację WebGL od root layoutu.

## Zależności

Warstwa experience dodaje trzy jawne pakiety:

- `three` — renderer, geometria, materiały, kamera i matematyka sceny,
- `@react-three/fiber` — deklaratywna integracja Three.js z Reactem i jedna zarządzana pętla renderowania,
- `@types/three` — typy deweloperskie wymagane przez Three.js oraz kontrakty R3F.

`@types/three` ma własne zależności deweloperskie obejmujące typy i pakiet kompatybilności Rapier, ale aplikacja nie importuje silnika fizyki i nie trafia on do chunków runtime. Nie dodano Drei, Lenisa, biblioteki animacyjnej, postprocessingu ani shader toolkit.

- Nowa zależność musi rozwiązywać konkretny problem lepiej niż niewielka implementacja lokalna.
- Przed instalacją sprawdzamy zgodność peer dependencies, wpływ na bundle, aktywność projektu i dostępność.
- Zależności runtime trafiają do `dependencies`, narzędzia wyłącznie buildowe do `devDependencies`.
- Wersje są przypięte, a `package-lock.json` jest jedynym lockfile.
- Nie dodajemy ciężkich bibliotek UI. Ewentualne shadcn/ui z Base UI instalujemy selektywnie, komponent po komponencie, dopiero gdy powstanie rzeczywista potrzeba.
- Po zmianie zależności uruchamiamy `npm install`, kontrolę podatności, lint, typecheck i build; konflikty peer dependencies muszą zostać rozwiązane, nie ukryte flagą wymuszającą.
