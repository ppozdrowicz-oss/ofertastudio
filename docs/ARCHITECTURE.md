# Architektura OfertaStudio

## Stack i założenia bazowe

Projekt jest aplikacją Next.js 16 z App Routerem, Reactem 19 i TypeScriptem w trybie `strict`. Warstwę prezentacji budują Tailwind CSS 4 oraz CSS Custom Properties. ESLint odpowiada za reguły frameworka, TypeScriptu i importów, a Prettier za spójne formatowanie kodu, CSS, JSON i Markdown.

Aplikacja jest obecnie statycznym serwisem usługowym. Nie ma CMS, bazy danych, uwierzytelniania ani zewnętrznych integracji. Takie elementy mogą zostać dodane dopiero po potwierdzeniu rzeczywistego wymagania biznesowego.

Lokalny development korzysta z domyślnego Turbopacka. Produkcyjny skrypt używa oficjalnego przełącznika `next build --webpack`, ponieważ środowisko wykonawcze projektu blokuje lokalny port IPC procesu PostCSS uruchamianego przez Turbopack. Z tego samego powodu konfiguracja wyłącza procesowy `experimental.useTypeScriptCli`, korzysta z programatycznego API TypeScript i wykonuje build Webpacka w procesie głównym. Pełny typecheck nadal działa osobno i w trakcie buildu. Są to ustawienia wykonawcze, nie zmiana architektury aplikacji; można je ponownie zweryfikować po zmianie środowiska CI lub aktualizacji narzędzi.

## Struktura katalogów

```text
src/
  app/                  # route'y, layout, metadata i pliki specjalne
  components/
    layout/             # Container, Section i przyszłe elementy ramy strony
    sections/           # kompozycje sekcji o znaczeniu dla widoku
    ui/                 # małe prymitywy interfejsu
    shared/             # przyszłe komponenty domenowe używane w wielu miejscach
  config/               # konfiguracja serwisu niezależna od konkretnej strony
  content/              # typowane modele i treści widoków
  hooks/                # wyłącznie współdzielone hooki z realnymi konsumentami
  lib/                  # małe funkcje pomocnicze
  styles/               # globalne style i tokeny
  types/                # wyłącznie współdzielone typy domenowe
public/
  images/
    brand/
    services/
    projects/
    placeholders/
docs/
```

Katalogi `shared`, `hooks` i `types` nie istnieją w etapie 1, ponieważ nie mają jeszcze realnej odpowiedzialności. Zostaną utworzone dopiero wraz z pierwszym potrzebnym modułem. To samo dotyczy plików `index.ts`: powstają tylko wtedy, gdy stabilizują publiczny interfejs niewielkiego modułu, a nie jako domyślna warstwa każdego katalogu.

## Podział komponentów

- **UI** — małe, dostępne elementy z ograniczonym zestawem wariantów, bez wiedzy o konkretnej stronie. Przykład: `LinkButton`.
- **Layout** — prymitywy kontrolujące szerokość i rytm kompozycji. Przykłady: `Container`, `Section`.
- **Sections** — semantyczne fragmenty widoku składające UI, layout i treść; mogą znać model konkretnej sekcji.
- **Shared** — większe elementy domenowe używane na wielu stronach, np. karta realizacji, jeśli pojawi się co najmniej dwóch realnych konsumentów.
- **Route** — plik `page.tsx` kompozytuje sekcje i definiuje sprawy właściwe dla adresu. Nie powinien zawierać rozbudowanej implementacji wizualnej.

Komponenty przyjmują standardowe atrybuty HTML, kiedy ma to sens, zachowują semantykę i nie dublują natywnego elementu bez korzyści. Wspólne warianty powinny wynikać z design systemu, a nie z pojedynczego widoku.

## Server Components i Client Components

Wszystkie komponenty są domyślnie Server Components. Pozwala to ograniczyć JavaScript wysyłany do przeglądarki i utrzymać prosty model renderowania treści.

Dyrektywę `"use client"` dodajemy wyłącznie do najniższego komponentu, który potrzebuje:

- lokalnego stanu lub reducerów,
- obsługi zdarzeń przeglądarki,
- efektów,
- dostępu do API przeglądarki,
- biblioteki działającej tylko po stronie klienta.

Nie oznaczamy całych stron ani layoutu jako klientowe dla wygody. Dane i treści powinny pozostać po stronie serwera, a do klienta przekazujemy możliwie mały, serializowalny kontrakt.

## Przechowywanie treści

Stałe treści i modele sekcji trafiają do `src/content` jako typowane moduły TypeScript. Konfiguracja całego serwisu, taka jak nazwa, domena i domyślne metadata, znajduje się w `src/config`.

Komponent sekcji odpowiada za prezentację, nie za przechowywanie długich bloków copy. Dane muszą mieć stabilne identyfikatory, jeśli będą używane w listach lub linkach. CMS nie jest planowany bez decyzji biznesowej; jego ewentualne wprowadzenie powinno zachować istniejące kontrakty modeli treści.

## Metadata i SEO

- `src/config/site.ts` jest źródłem wspólnych wartości marki i domeny.
- `src/app/layout.tsx` definiuje domyślny tytuł, template, opis, Open Graph, Twitter i dyrektywy robotów.
- `src/app/robots.ts` publikuje bazowy `robots.txt`.
- Każda przyszła podstrona statyczna eksportuje własne `metadata`; `generateMetadata` stosujemy tylko dla danych dynamicznych.
- Po ustaleniu route'ów każda indeksowalna strona otrzyma canonical, unikalny tytuł i opis.
- Dane strukturalne pojawią się w etapie 12 i muszą odzwierciedlać widoczną, zweryfikowaną treść.

## Dodawanie podstron

1. Potwierdź miejsce podstrony w architekturze informacji i jej intencję wyszukiwania.
2. Utwórz segment w `src/app` z możliwie cienkim `page.tsx`.
3. Dodaj typowany model treści w `src/content`, jeśli treść ma więcej niż kilka prostych etykiet.
4. Zbuduj semantyczne sekcje, wykorzystując istniejące tokeny i prymitywy.
5. Dodaj unikalne metadata oraz właściwe linkowanie wewnętrzne.
6. Sprawdź widok od 320 px, klawiaturę, focus, hierarchię nagłówków i preferencję ograniczonego ruchu.
7. Uruchom pełny zestaw kontroli jakości.

Route groups można wprowadzić dopiero, gdy kilka route'ów rzeczywiście współdzieli osobny layout lub organizację. Dynamiczne segmenty wymagają stabilnego źródła slugów i jawnej obsługi braku danych.

## Style i tokeny

`src/styles/globals.css` zawiera neutralne tokeny techniczne: kolory semantyczne, promienie, cień i szerokości kontenerów. `@theme inline` udostępnia je jako narzędzia Tailwind CSS. Finalne wartości zostaną opracowane w etapie 3; komponenty nie powinny zakładać obecnej palety jako identyfikacji marki.

Preferowana kolejność decyzji stylów to: istniejący komponent → istniejący token → uzasadnione rozszerzenie design systemu → dopiero lokalna wartość wyjątkowa. Nie stosujemy przypadkowych gradientów ani niepowiązanych efektów.

## Zależności

- Nowa zależność musi rozwiązywać konkretny problem lepiej niż niewielka implementacja lokalna.
- Przed instalacją sprawdzamy zgodność peer dependencies, wpływ na bundle, aktywność projektu i dostępność.
- Zależności runtime trafiają do `dependencies`, narzędzia wyłącznie buildowe do `devDependencies`.
- Wersje są przypięte, a `package-lock.json` jest jedynym lockfile.
- Nie dodajemy ciężkich bibliotek UI. Ewentualne shadcn/ui z Base UI instalujemy selektywnie, komponent po komponencie, dopiero gdy powstanie rzeczywista potrzeba.
- Po zmianie zależności uruchamiamy `npm install`, kontrolę podatności, lint, typecheck i build; konflikty peer dependencies muszą zostać rozwiązane, nie ukryte flagą wymuszającą.
