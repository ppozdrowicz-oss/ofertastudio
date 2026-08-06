# Design system OfertaStudio

## Status i zakres

Design system w wersji 1.1 jest produkcyjnym fundamentem interfejsu dla etapów 4–14. Obejmuje tokeny, typografię, layout, globalną nawigację, komponenty, stany interakcji, zasady dostępności i techniczną stronę `/design-system`.

System jest projektowany jako jasny. Nie zawiera niekompletnego dark mode ani przełącznika motywu. Ciemna powierzchnia `strong` służy wyłącznie do kontrolowanej zmiany rytmu sekcji i paneli CTA.

## Zasady Flat Modern Premium

1. Hierarchię budują typografia, proporcje i odstępy, nie dekoracje.
2. Jasne powierzchnie są rozdzielane precyzyjnym obramowaniem; cień oznacza uniesienie lub interakcję.
3. Kobalt wskazuje decyzję i interakcję. Limonkowy akcent wspiera orientację, ale nie konkuruje z głównym CTA.
4. Promienie są umiarkowane. Pełne zaokrąglenie jest zarezerwowane dla badge’y i małych wskaźników.
5. Ruch jest krótki, funkcjonalny i opcjonalny. Interfejs nie animuje każdej sekcji podczas przewijania.
6. Każdy element ma rolę: wyjaśnia strukturę, buduje zaufanie albo wskazuje następny krok.

## Paleta kolorystyczna

### Surowa paleta

| Rodzina | Wartości kluczowe                                                           | Rola                                                         |
| ------- | --------------------------------------------------------------------------- | ------------------------------------------------------------ |
| Neutral | `#ffffff`, `#f7f9fc`, `#eff3f8`, `#d7dee8`, `#7d899a`, `#526071`, `#111827` | Tła, powierzchnie, tekst, obramowania i kontrolki.           |
| Cobalt  | `#eef0ff`, `#cbd1ff`, `#5364ff`, `#3646e8`, `#2d3bc8`, `#2430a8`            | Marka, CTA, linki, focus i aktywne stany.                    |
| Lime    | `#f1f9d2`, `#bed66a`, `#9ac515`, `#293800`                                  | Wskaźniki, badge, małe pola ikonowe i elementy informacyjne. |
| Inverse | `#111a2a`, `#1b273b`, `#344259`, `#bbc5d4`, `#f8fafc`                       | Sekcje i panele o mocnym kontraście.                         |

Surowe wartości są zdefiniowane wyłącznie w `src/styles/globals.css`. Komponenty używają tokenów semantycznych.

### Tokeny semantyczne

| Token                   | Wartość   | Zastosowanie                                                     |
| ----------------------- | --------- | ---------------------------------------------------------------- |
| `--background`          | `#f7f9fc` | Główne, lekko chłodne tło strony.                                |
| `--foreground`          | `#111827` | Tekst podstawowy i mocne elementy informacyjne.                  |
| `--surface`             | `#ffffff` | Karty, kontrolki i czyste powierzchnie.                          |
| `--surface-muted`       | `#eff3f8` | Sekcje alternatywne i karty wyciszone.                           |
| `--surface-strong`      | `#e7ecf4` | Hover, aktywne neutralne powierzchnie i mocniejsze rozdzielenie. |
| `--surface-inverse`     | `#111a2a` | Kontrolowane sekcje strong i panele CTA.                         |
| `--border`              | `#d7dee8` | Subtelne granice kart i sekcji.                                  |
| `--border-strong`       | `#aeb9c8` | Mocniejsze separatory.                                           |
| `--border-control`      | `#7d899a` | Granice pól i przycisków outline spełniające kontrast UI.        |
| `--muted-foreground`    | `#526071` | Tekst drugorzędny, opisy i podpisy.                              |
| `--primary`             | `#3646e8` | Główne CTA, linki i aktywne elementy.                            |
| `--primary-hover`       | `#2d3bc8` | Hover głównej akcji.                                             |
| `--primary-active`      | `#2430a8` | Stan active głównej akcji.                                       |
| `--primary-surface`     | `#eef0ff` | Wyróżniona jasna powierzchnia.                                   |
| `--secondary`           | `#eef0ff` | Akcja pomocnicza i badge primary.                                |
| `--accent`              | `#9ac515` | Mały, mocny akcent informacyjny.                                 |
| `--accent-surface`      | `#f1f9d2` | Tło badge’a lub pola ikony.                                      |
| `--focus-ring`          | `#5364ff` | Globalny, trzy-pikselowy focus ring.                             |
| `--disabled`            | `#edf0f4` | Powierzchnia wyłączonej kontrolki.                               |
| `--disabled-foreground` | `#7b8593` | Tekst stanu disabled.                                            |

### Kolory funkcjonalne

Każda funkcja posiada powierzchnię, tekst, obramowanie i mocny akcent:

| Funkcja     | Surface   | Foreground | Border    | Strong    |
| ----------- | --------- | ---------- | --------- | --------- |
| Success     | `#e9f8ef` | `#166534`  | `#a8ddba` | `#17834b` |
| Warning     | `#fff7d6` | `#704a00`  | `#e8c96b` | `#b77900` |
| Error       | `#fff0f0` | `#8e1b1b`  | `#e7a7a7` | `#c83232` |
| Information | `#ecf4ff` | `#174a8b`  | `#a9c7ee` | `#2563b8` |

Kolor nigdy nie jest jedynym nośnikiem informacji. Komunikaty wykorzystują również ikonę, tekst i odpowiednią semantykę.

## Kontrola kontrastu

Kontrast jest obliczany automatycznie przez `npm run design:check` na podstawie rzeczywistych wartości w CSS. Współczynnik dla tekstu wynosi minimum 4,5:1, a dla focus ringów i granic kontrolek minimum 3:1.

| Para                        |   Wynik |
| --------------------------- | ------: |
| Tekst podstawowy / tło      | 16,82:1 |
| Tekst outline / surface     | 17,74:1 |
| Tekst / muted surface       | 15,92:1 |
| Tekst wyciszony / tło       |  6,09:1 |
| Badge neutral / muted       |  5,76:1 |
| Tekst CTA / primary         |  6,57:1 |
| Link primary / tło          |  6,23:1 |
| Tekst / secondary           |  9,58:1 |
| Tekst / accent surface      | 11,58:1 |
| Tekst / accent strong       |  6,25:1 |
| Focus ring / jasne tło      |  4,30:1 |
| Focus ring / strong         |  3,85:1 |
| Granica kontrolki / surface |  3,55:1 |
| Success                     |  6,50:1 |
| Warning                     |  7,32:1 |
| Error                       |  8,17:1 |
| Information                 |  7,93:1 |
| Tekst podstawowy / strong   | 16,66:1 |
| Tekst wyciszony / strong    | 10,00:1 |

## Typografia

### Rodzina i wagi

Zachowano **Inter** ładowany przez `next/font` jako jedną rodzinę globalną. Font obsługuje polskie znaki, jest czytelny przy małych rozmiarach i działa jako font zmienny bez przesunięcia layoutu.

Stosowane wagi:

- 400 — tekst i opisy,
- 500 — kontrolowane wyróżnienia,
- 600 — nagłówki, przyciski i ważne etykiety,
- 700 — overline oraz krótkie oznaczenia.

### Skala

| Token Tailwind  | Zakres / rozmiar           | Line height | Tracking   | Zastosowanie                            |
| --------------- | -------------------------- | ----------- | ---------- | --------------------------------------- |
| `text-display`  | `clamp(52px, 7vw, 104px)`  | 0,94        | `-0.058em` | Wyjątkowe, krótkie otwarcia.            |
| `text-hero`     | `clamp(44px, 6vw, 80px)`   | 0,98        | `-0.052em` | Hero strony.                            |
| `text-h1`       | `clamp(40px, 5vw, 68px)`   | 1,02        | `-0.046em` | Tytuł podstrony.                        |
| `text-h2`       | `clamp(32px, 4vw, 56px)`   | 1,06        | `-0.040em` | Główne sekcje.                          |
| `text-h3`       | `clamp(24px, 2.7vw, 36px)` | 1,12        | `-0.030em` | Podsekcje i większe karty.              |
| `text-h4`       | `clamp(18px, 1.8vw, 22px)` | 1,25        | `-0.018em` | Tytuły kart.                            |
| `text-lead`     | `clamp(18px, 1.5vw, 22px)` | 1,55        | normal     | Lead i opis sekcji.                     |
| `text-body-lg`  | 18px                       | 1,70        | normal     | Ważny tekst ciągły.                     |
| `text-body`     | 16px                       | 1,70        | normal     | Tekst podstawowy.                       |
| `text-body-sm`  | 14px                       | 1,60        | normal     | Opisy komponentów i dane pomocnicze.    |
| `text-label`    | 14px                       | 1,35        | `-0.008em` | Etykiety formularzy i akcji.            |
| `text-caption`  | 12px                       | 1,50        | `0.01em`   | Podpisy i metadane.                     |
| `text-overline` | 12px                       | 1,30        | `0.11em`   | Krótkie, wersalikowe oznaczenie sekcji. |

Nagłówki są krótkie, zdaniowe i zapisane bez kropki. `SectionHeading` obsługuje pojedyncze, jawnie wskazane wyróżnienie tekstu. Nie kolorujemy losowych słów w każdej sekcji. Maksymalne miary tekstu to 32 rem dla treści wąskiej, 44 rem dla copy oraz 62 rem dla szerszego wprowadzenia.

## Odstępy

Skala bazuje na wielokrotnościach 4 px. Standardowa skala Tailwind służy małym odległościom, a tokeny semantyczne kontrolują większy rytm:

| Token                   | Wartość                    | Zastosowanie                      |
| ----------------------- | -------------------------- | --------------------------------- |
| `--space-component-gap` | 12px                       | Ikona, etykieta i małe grupy.     |
| `--space-stack-sm`      | 16px                       | Mały stos treści.                 |
| `--space-stack-md`      | 24px                       | Standardowy stos komponentu.      |
| `--space-stack-lg`      | 32px                       | Większy blok treści.              |
| `--space-content-gap`   | `clamp(24px, 3vw, 40px)`   | Odległość między blokami.         |
| `--space-card-padding`  | `clamp(20px, 3vw, 32px)`   | Wewnętrzny padding kart i paneli. |
| `--space-section-sm`    | `clamp(56px, 8vw, 96px)`   | Sekcja compact.                   |
| `--space-section-md`    | `clamp(72px, 10vw, 128px)` | Sekcja standardowa.               |
| `--space-section-lg`    | `clamp(88px, 12vw, 160px)` | Sekcja spacious.                  |
| `--container-gutter`    | `clamp(16px, 4vw, 40px)`   | Margines strony od 320 px wzwyż.  |

Nie wprowadzamy lokalnej wartości, jeśli istniejąca skala lub token semantyczny opisuje tę samą relację.

## Kontenery i grid

`Container` posiada warianty:

- `text` — 46 rem dla długiej treści,
- `content` — 68 rem dla skupionych układów,
- `default` — 80 rem dla standardowej strony,
- `wide` — 92 rem dla rozbudowanych siatek,
- `full` — pełna szerokość z kontrolowanym gutterem.

Siatka konstrukcyjna:

- 320–767 px: jedna kolumna treści, wyjątkowo dwie proste kolumny,
- od 768 px: uproszczone układy 2-kolumnowe lub 8 kolumn konstrukcyjnych,
- od 1024 px: 12 kolumn,
- powyżej 1472 px: treść pozostaje ograniczona kontenerem `wide`.

Nie powstaje osobny grid framework. Używamy CSS Grid i klas Tailwind bez zmiany logicznej kolejności DOM.

## Promienie, obramowania i cienie

### Promienie

| Token              | Wartość | Zastosowanie                       |
| ------------------ | ------: | ---------------------------------- |
| `--radius-small`   |     6px | Focusowalne linki i małe detale.   |
| `--radius-control` |     8px | Przyciski, pola, Notice i IconBox. |
| `--radius-card`    |    12px | Karty.                             |
| `--radius-panel`   |    16px | Duże panele CTA.                   |
| `--radius-round`   |   999px | Badge, status i mały znacznik.     |

### Obramowania

- `--border` — neutralny podział powierzchni,
- `--border-strong` — separator o większej wadze,
- `--border-control` — dostępna granica kontrolki,
- `--primary-border` — element wyróżniony,
- funkcjonalne border tokens — statusy i walidacja.

### Cienie

- `shadow-surface` — subtelna powierzchnia, używana oszczędnie,
- `shadow-raised` — karta interaktywna na hover lub focus-within,
- `shadow-overlay` — dropdown, megamenu, mobilny panel albo przyszły dialog.

Standardowa karta opiera się na obramowaniu i nie otrzymuje cienia.

### Warstwy i globalny shell

Globalne komponenty używają semantycznej skali od `--layer-header` i `--layer-dropdown` po `--layer-skip-link`. Sticky header ma stałą wysokość 68 px na mobile i 76 px od 1280 px. Dropdown używa `shadow-overlay`, a modalne menu mobilne korzysta z top layer natywnego `dialog`, nie z przypadkowego z-indexu.

Anchory uwzględniają wysokość headera przez globalne `scroll-padding-top` i `scroll-margin-top`.

## Ikony

- Jedyną biblioteką jest Lucide React.
- `src/config/icons.ts` mapuje siedem nazw z modelu treści na konkretne importy.
- Standardowe rozmiary to 16, 20 i 24 px, a bazowy `strokeWidth` wynosi 1,8.
- Ikona dekoracyjna ma `aria-hidden="true"`.
- Ikona znacząca otrzymuje nazwę przez `accessibleLabel` w `IconBox` albo przez tekst kontrolki.
- Ikona nie pojawia się przy każdym akapicie i nie zastępuje etykiety interakcji.

## Przyciski i linki

`Button` i `ButtonLink` współdzielą funkcję wariantów bez niebezpiecznego polymorphic API.

Warianty:

- `primary` — jedno główne CTA,
- `secondary` — akcja pomocnicza,
- `outline` — akcja o mniejszej wadze,
- `ghost` — akcja w zagęszczonym interfejsie,
- `link` — akcja tekstowa wykonywana przez przycisk.

Rozmiary: `small` 40 px, `medium` 44 px, `large` 48 px oraz `icon` 44 × 44 px. Stan loading zachowuje etykietę, ustawia `aria-busy` i blokuje przycisk. Link nie otrzymuje fałszywego stanu disabled — gdy działanie jest niedostępne, nie renderujemy aktywnego linku.

`TextLink` posiada warianty `standard`, `muted`, `arrow` i `standalone`. Tekst linku zawsze opisuje cel.

## Formularze

Formularze używają natywnych kontrolek i nie wymagają Client Component:

- `Label`,
- `Input`,
- `Textarea`,
- natywny `Select`,
- `Checkbox`,
- `Radio`,
- `FormField`,
- `FieldDescription`,
- `FieldError`.

Stany `default`, `error` i `success` mają jawne obramowanie oraz powierzchnię. Stan filled wynika z wartości kontrolki. Disabled korzysta z osobnych tokenów i zachowuje czytelność.

Etykieta zawsze wskazuje `id` kontrolki. Błąd jest połączony przez `aria-describedby`, a pole otrzymuje `aria-invalid`. Grupy radio używają `fieldset` i `legend`. Gwiazdka wizualna nie zastępuje natywnego `required`.

## Karty, sekcje i nagłówki

`Card` ma pięć ograniczonych wariantów: `standard`, `interactive`, `highlighted`, `muted` i `bordered`. Kompozycję budują `CardHeader`, `CardTitle`, `CardDescription`, `CardContent` i `CardFooter`.

`Section` obsługuje powierzchnie `default`, `muted`, `strong`, semantyczny element oraz rytm `compact`, `default`, `spacious`.

`SectionHeading` obsługuje eyebrow, tytuł, opis, lewy lub centralny układ, trzy miary treści, opcjonalne CTA, ton jasny i inverse oraz jedno kontrolowane wyróżnienie fragmentu tytułu.

## Ruch i mikrointerakcje

| Token                | Wartość | Zastosowanie                        |
| -------------------- | ------: | ----------------------------------- |
| `--duration-instant` |  100 ms | Natychmiastowa odpowiedź kontrolki. |
| `--duration-fast`    |  160 ms | Hover, focus, active.               |
| `--duration-normal`  |  240 ms | Menu i mała zmiana stanu.           |
| `--duration-slow`    |  360 ms | Wyjątkowa, większa zmiana układu.   |

Standardowy easing to `cubic-bezier(0.2, 0, 0, 1)`. Karta interaktywna może unieść się o 2 px. Link z kierunkiem przesuwa wyłącznie ikonę o 2 px. Nie stosujemy parallax, automatycznych animacji scroll ani ruchu dekoracyjnego.

Globalne `prefers-reduced-motion: reduce` skraca animacje i wyłącza płynne przewijanie.

## Dostępność

- Globalny focus ring ma 3 px i offset 3 px; nie jest ukrywany.
- Standardowe przyciski i ikonowe cele dotykowe mają minimum 44 px.
- Kolejność DOM pozostaje logiczna niezależnie od siatki.
- Breadcrumb używa `nav`, listy i `aria-current="page"`.
- Notice nie polega wyłącznie na kolorze.
- Kontrolki formularza wspierają etykietę, opis, błąd, `aria-invalid` i `aria-describedby`.
- Dekoracyjne ikony są ukryte przed technologiami asystującymi.
- Teksty i kontrolki spełniają przyjęte minima kontrastu.
- Wszystkie komponenty działają bez myszy. Prymitywy UI nie wymagają JavaScriptu klienckiego; globalna nawigacja używa jednej kontrolowanej granicy klientowej dla stanu, aktywnej trasy, dialogu i zarządzania focusem.

## Responsywność

Każdy nowy widok jest projektowany od 320 px. Obowiązkowe punkty kontroli to 320, 375, 390, 768, 1024, 1280, 1440 i 1920 px.

Zasady:

- tekst i przyciski nie mogą wymuszać szerokości większej niż viewport,
- grupy CTA przechodzą do kolumny, gdy brakuje miejsca,
- breadcrumb może zawijać się na kilka wierszy,
- karty są pełnej szerokości na małym ekranie,
- focus ring nie może być obcięty przez rodzica,
- maksymalna szerokość treści obowiązuje również na 2K i 4K,
- nie zmieniamy kolejności treści wyłącznie dla kompozycji desktopowej.

## Dobre i złe użycie

| Dobre                                           | Złe                                                            |
| ----------------------------------------------- | -------------------------------------------------------------- |
| Jedno primary CTA i pomocniczy link.            | Kilka równorzędnych kobaltowych przycisków.                    |
| Karta z obramowaniem, cień dopiero na hover.    | Duży cień pod każdą powierzchnią.                              |
| Jeden wyróżniony fragment ważnego tytułu.       | Kilka kolorowych słów w każdym nagłówku.                       |
| Limonkowy badge lub mały IconBox.               | Limonkowy duży przycisk główny.                                |
| Ciemna sekcja jako świadoma zmiana rytmu.       | Naprzemiennie ciemna sekcja co drugi blok.                     |
| Treść i zdjęcia oparte na prawdziwym materiale. | Generyczne grafiki SaaS, bloby, kule 3D i sztuczne statystyki. |
| Token semantyczny i wariant komponentu.         | Lokalny hex, przypadkowy odstęp lub kolejna kopia przycisku.   |

## Kontrola zmian

Po każdej zmianie UI należy:

1. sprawdzić stronę `/design-system`,
2. uruchomić `npm run design:check`,
3. uruchomić format, lint, typecheck, content check i build,
4. sprawdzić 320 px oraz co najmniej jeden szeroki viewport,
5. zaktualizować ten dokument i `COMPONENT_INVENTORY.md`, jeśli zmienił się publiczny kontrakt.
