# OfertaStudio

Nowa wersja strony usługowej OfertaStudio — butikowego studia sprzedaży internetowej działającego zgodnie z ideą „Od produktu do skutecznej sprzedaży w internecie”. Projekt ma docelowo prezentować ofertę, budować zaufanie i pozyskiwać wartościowe zapytania od firm rozwijających sprzedaż online.

Etapy 1–5 są ukończone: projekt posiada fundament techniczny, strategię marki, architekturę informacji, produkcyjny design system, kompletny globalny layout oraz izolowany fundament interaktywnej warstwy WebGL. Minimalna strona startowa pozostaje techniczna, komponenty prezentuje nieindeksowana trasa `/design-system`, a progresywne WebGL można bezpiecznie sprawdzać na `/experience-lab`. Następny etap obejmuje finalną stronę główną.

## Stack

- Next.js 16 z App Routerem i domyślnymi Server Components,
- React 19,
- TypeScript w trybie `strict`,
- Tailwind CSS 4 i CSS Custom Properties,
- ESLint z regułami Next.js oraz kontrolą kolejności importów,
- Prettier z sortowaniem klas Tailwind CSS,
- Lucide React dla spójnych ikon,
- Three.js i React Three Fiber dla opcjonalnej, lazy-loadowanej warstwy experience,
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

| Skrypt                     | Działanie                                                     |
| -------------------------- | ------------------------------------------------------------- |
| `npm run dev`              | Uruchamia lokalne środowisko deweloperskie Next.js.           |
| `npm run build`            | Tworzy produkcyjny build aplikacji przez backend Webpack.     |
| `npm run start`            | Uruchamia wcześniej utworzony build produkcyjny.              |
| `npm run lint`             | Sprawdza cały projekt przez ESLint i nie dopuszcza ostrzeżeń. |
| `npm run typecheck`        | Uruchamia TypeScript bez emitowania plików.                   |
| `npm run content:check`    | Sprawdza integralność tras, treści i relacji domenowych.      |
| `npm run design:check`     | Sprawdza komponenty, importy, tokeny i kontrast kolorów.      |
| `npm run experience:check` | Sprawdza progres, quality tiers, fallback i izolację WebGL.   |
| `npm run format`           | Formatuje obsługiwane pliki przez Prettier.                   |
| `npm run format:check`     | Sprawdza formatowanie bez zapisywania zmian.                  |

Przed przekazaniem każdej zmiany należy uruchomić kolejno:

```bash
npm run format:check
npm run lint
npm run typecheck
npm run content:check
npm run design:check
npm run experience:check
npm run build
```

## Struktura projektu

```text
src/
  app/                  # routing, layout, metadata i pliki specjalne App Routera
  components/
    experience/         # izolowana scena, kamera i progresywny fallback WebGL
    layout/             # prymitywy układu, np. Container i Section
    navigation/         # interaktywna nawigacja desktopowa i mobilna
    sections/           # kompozycje sekcji stron
    shared/             # reużywalne komponenty domenowe
    ui/                 # małe, wielokrotnego użytku elementy interfejsu
  config/               # stabilna konfiguracja aplikacji i marki
  content/              # typowana treść niezależna od JSX
  lib/                  # małe, niezależne narzędzia
    experience/         # czyste modele progresu, ruchu, jakości i palety sceny
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
  check-experience.ts   # walidacja architektury i budżetów experience
```

Interakcje nawigacji i WebGL mają dwie osobne, możliwie niskie granice klientowe. Ciężki renderer 3D jest dodatkowo importowany dynamicznie dopiero w pobliżu viewportu. W `shared` umieszczamy wyłącznie wzorce domenowe z realnymi konsumentami. Nie tworzymy pustych warstw ani barrel exports na zapas.

## Zasady dalszego rozwoju

- Server Components są domyślne; granicę `"use client"` dodajemy możliwie nisko i tylko dla realnej interakcji.
- Treści strony przechowujemy poza komponentami prezentacyjnymi w typowanych modułach `src/content`.
- Adresy, CTA, nawigacja i dane kontaktowe mają pojedyncze źródła w `src/config`; relacje sprawdza `npm run content:check`.
- Nie wdrażamy planowanej podstrony bez sprawdzenia jej roli w [`docs/INFORMATION_ARCHITECTURE.md`](docs/INFORMATION_ARCHITECTURE.md) i intencji w [`docs/SEO_CONTENT_MAP.md`](docs/SEO_CONTENT_MAP.md).
- Nowe podstrony korzystają ze wspólnego layoutu, tokenów i komponentów, ale otrzymują własne semantyczne sekcje i metadata.
- `PageShell` tworzy główny landmark i globalne CTA; header oraz footer należą wyłącznie do root layoutu.
- Każda pozycja menu i stopki musi prowadzić do wdrożonej trasy oraz przejść rozszerzony `content:check`.
- Komponenty mają jedną odpowiedzialność, jawne typy i dostępne zachowanie klawiaturowe.
- Stylowanie opiera się na tokenach CSS i Tailwind CSS; nie wprowadzamy lokalnych, przypadkowych wartości imitujących osobny design system.
- Każdą zmianę UI sprawdzamy na `/design-system` i przez `npm run design:check`.
- Nową scenę sprawdzamy na `/experience-lab` i przez `npm run experience:check`; ważna treść zawsze pozostaje w DOM.
- Nie dodajemy zależności, klientowego JavaScriptu, abstrakcji ani eksportów zbiorczych bez konkretnej potrzeby.
- Finalne widoki nie mogą zawierać lorem ipsum, generycznych placeholderów ani niezweryfikowanych obietnic marketingowych.
- Szczegółowe wytyczne dla kolejnych sesji znajdują się w [`AGENTS.md`](AGENTS.md), decyzje techniczne w [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md), zasady wizualne w [`docs/DESIGN_SYSTEM.md`](docs/DESIGN_SYSTEM.md), a reguły języka w [`docs/CONTENT_GUIDELINES.md`](docs/CONTENT_GUIDELINES.md).
