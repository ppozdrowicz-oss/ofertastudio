# OfertaStudio

Nowa wersja strony usługowej OfertaStudio — butikowego studia sprzedaży internetowej działającego zgodnie z ideą „Od produktu do skutecznej sprzedaży w internecie”. Projekt ma docelowo prezentować ofertę, budować zaufanie i pozyskiwać wartościowe zapytania od firm rozwijających sprzedaż online.

Obecny zakres obejmuje wyłącznie fundament techniczny. Minimalna strona startowa potwierdza działanie aplikacji; docelowy serwis i design system powstaną w kolejnych etapach opisanych w [`docs/ROADMAP.md`](docs/ROADMAP.md).

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

| Skrypt                 | Działanie                                                     |
| ---------------------- | ------------------------------------------------------------- |
| `npm run dev`          | Uruchamia lokalne środowisko deweloperskie Next.js.           |
| `npm run build`        | Tworzy produkcyjny build aplikacji przez backend Webpack.     |
| `npm run start`        | Uruchamia wcześniej utworzony build produkcyjny.              |
| `npm run lint`         | Sprawdza cały projekt przez ESLint i nie dopuszcza ostrzeżeń. |
| `npm run typecheck`    | Uruchamia TypeScript bez emitowania plików.                   |
| `npm run format`       | Formatuje obsługiwane pliki przez Prettier.                   |
| `npm run format:check` | Sprawdza formatowanie bez zapisywania zmian.                  |

Przed przekazaniem każdej zmiany należy uruchomić kolejno:

```bash
npm run format:check
npm run lint
npm run typecheck
npm run build
```

## Struktura projektu

```text
src/
  app/                  # routing, layout, metadata i pliki specjalne App Routera
  components/
    layout/             # prymitywy układu, np. Container i Section
    sections/           # kompozycje sekcji stron
    ui/                 # małe, wielokrotnego użytku elementy interfejsu
  config/               # stabilna konfiguracja aplikacji i marki
  content/              # typowana treść niezależna od JSX
  lib/                  # małe, niezależne narzędzia
  styles/               # globalne style, tokeny i konfiguracja warstwy CSS
public/
  images/
    brand/              # przyszłe, zatwierdzone zasoby marki
    services/           # przyszłe materiały dotyczące usług
    projects/           # przyszłe materiały realizacji i case studies
    placeholders/       # wyłącznie kontrolowane zasoby robocze
docs/                   # brief, architektura i roadmapa
```

Katalogi `hooks`, `shared` i `types` należy dodać dopiero wtedy, gdy pojawi się rzeczywista odpowiedzialność, której nie obsługują istniejące moduły. Nie tworzymy pustych warstw ani barrel exports na zapas.

## Zasady dalszego rozwoju

- Server Components są domyślne; granicę `"use client"` dodajemy możliwie nisko i tylko dla realnej interakcji.
- Treści strony przechowujemy poza komponentami prezentacyjnymi w typowanych modułach `src/content`.
- Nowe podstrony korzystają ze wspólnego layoutu, tokenów i komponentów, ale otrzymują własne semantyczne sekcje i metadata.
- Komponenty mają jedną odpowiedzialność, jawne typy i dostępne zachowanie klawiaturowe.
- Stylowanie opiera się na tokenach CSS i Tailwind CSS; nie wprowadzamy lokalnych, przypadkowych wartości imitujących osobny design system.
- Nie dodajemy zależności, klientowego JavaScriptu, abstrakcji ani eksportów zbiorczych bez konkretnej potrzeby.
- Finalne widoki nie mogą zawierać lorem ipsum, generycznych placeholderów ani niezweryfikowanych obietnic marketingowych.
- Szczegółowe wytyczne dla kolejnych sesji znajdują się w [`AGENTS.md`](AGENTS.md), a decyzje architektoniczne w [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md).
