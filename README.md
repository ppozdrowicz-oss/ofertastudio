# OfertaStudio

Nowa wersja strony usługowej OfertaStudio — butikowego studia sprzedaży internetowej działającego zgodnie z ideą „Od produktu do skutecznej sprzedaży w internecie”. Projekt ma docelowo prezentować ofertę, budować zaufanie i pozyskiwać wartościowe zapytania od firm rozwijających sprzedaż online.

Fundament techniczny, strategia marki, architektura informacji i produkcyjny design system Flat Modern Premium są ukończone. Minimalna strona startowa pozostaje techniczna, a pełny zestaw tokenów i komponentów prezentuje nieindeksowana trasa `/design-system`. Następny etap obejmuje globalny nagłówek, nawigację i stopkę.

## Stack

- Next.js 16 z App Routerem i domyślnymi Server Components,
- React 19,
- TypeScript w trybie `strict`,
- Tailwind CSS 4 i CSS Custom Properties,
- ESLint z regułami Next.js oraz kontrolą kolejności importów,
- Prettier z sortowaniem klas Tailwind CSS,
- Lucide React dla spójnych ikon,
- `next/font` z rodziną Inter i obsługą polskich znaków.

Wersje zależności są przypięte w `package.json` i `package-lock.json`, aby instalacje były powtarzalne.

## Wymagania lokalne

- Node.js 22 lub nowszy,
- npm 10 lub nowszy.

Nie należy używać w tym repozytorium innego menedżera pakietów ani dodawać kolejnego lockfile.

## Instalacja i uruchomienie

```bash
npm install
npm run dev
```

Aplikacja będzie dostępna domyślnie pod adresem `http://localhost:3000`.

## Dostępne skrypty

| Skrypt                  | Działanie                                                     |
| ----------------------- | ------------------------------------------------------------- |
| `npm run dev`           | Uruchamia lokalne środowisko deweloperskie Next.js.           |
| `npm run build`         | Tworzy produkcyjny build aplikacji przez backend Webpack.     |
| `npm run start`         | Uruchamia wcześniej utworzony build produkcyjny.              |
| `npm run lint`          | Sprawdza cały projekt przez ESLint i nie dopuszcza ostrzeżeń. |
| `npm run typecheck`     | Uruchamia TypeScript bez emitowania plików.                   |
| `npm run content:check` | Sprawdza integralność tras, treści i relacji domenowych.      |
| `npm run design:check`  | Sprawdza komponenty, importy, tokeny i kontrast kolorów.      |
| `npm run format`        | Formatuje obsługiwane pliki przez Prettier.                   |
| `npm run format:check`  | Sprawdza formatowanie bez zapisywania zmian.                  |

Przed przekazaniem każdej zmiany należy uruchomić kolejno:

```bash
npm run format:check
npm run lint
npm run typecheck
npm run content:check
npm run design:check
npm run build
```

## Struktura projektu

```text
src/
  app/                  # routing, layout, metadata i pliki specjalne App Routera
  components/
    layout/             # prymitywy układu, np. Container i Section
    sections/           # kompozycje sekcji stron
    shared/             # reużywalne komponenty domenowe
    ui/                 # małe, wielokrotnego użytku elementy interfejsu
  config/               # stabilna konfiguracja aplikacji i marki
  content/              # typowana treść niezależna od JSX
  lib/                  # małe, niezależne narzędzia
  styles/               # globalne style, tokeny i konfiguracja warstwy CSS
  types/                # współdzielone kontrakty domenowe treści i nawigacji
public/
  images/
    brand/              # przyszłe, zatwierdzone zasoby marki
    services/           # przyszłe materiały dotyczące usług
    projects/           # przyszłe materiały realizacji i case studies
    placeholders/       # wyłącznie kontrolowane zasoby robocze
docs/                   # strategia marki, IA, konwersja, SEO i dokumentacja techniczna
scripts/
  check-content.ts      # walidacja integralności modelu treści
  check-design-system.ts # walidacja komponentów, importów i kontrastu
```

Katalog `hooks` należy dodać dopiero wtedy, gdy pojawi się rzeczywista współdzielona logika kliencka. W `shared` umieszczamy wyłącznie wzorce domenowe z realnymi konsumentami. Nie tworzymy pustych warstw ani barrel exports na zapas.

## Zasady dalszego rozwoju

- Server Components są domyślne; granicę `"use client"` dodajemy możliwie nisko i tylko dla realnej interakcji.
- Treści strony przechowujemy poza komponentami prezentacyjnymi w typowanych modułach `src/content`.
- Adresy, CTA, nawigacja i dane kontaktowe mają pojedyncze źródła w `src/config`; relacje sprawdza `npm run content:check`.
- Nie wdrażamy planowanej podstrony bez sprawdzenia jej roli w [`docs/INFORMATION_ARCHITECTURE.md`](docs/INFORMATION_ARCHITECTURE.md) i intencji w [`docs/SEO_CONTENT_MAP.md`](docs/SEO_CONTENT_MAP.md).
- Nowe podstrony korzystają ze wspólnego layoutu, tokenów i komponentów, ale otrzymują własne semantyczne sekcje i metadata.
- Komponenty mają jedną odpowiedzialność, jawne typy i dostępne zachowanie klawiaturowe.
- Stylowanie opiera się na tokenach CSS i Tailwind CSS; nie wprowadzamy lokalnych, przypadkowych wartości imitujących osobny design system.
- Każdą zmianę UI sprawdzamy na `/design-system` i przez `npm run design:check`.
- Nie dodajemy zależności, klientowego JavaScriptu, abstrakcji ani eksportów zbiorczych bez konkretnej potrzeby.
- Finalne widoki nie mogą zawierać lorem ipsum, generycznych placeholderów ani niezweryfikowanych obietnic marketingowych.
- Szczegółowe wytyczne dla kolejnych sesji znajdują się w [`AGENTS.md`](AGENTS.md), decyzje techniczne w [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md), zasady wizualne w [`docs/DESIGN_SYSTEM.md`](docs/DESIGN_SYSTEM.md), a reguły języka w [`docs/CONTENT_GUIDELINES.md`](docs/CONTENT_GUIDELINES.md).
