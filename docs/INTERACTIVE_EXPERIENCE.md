# Interactive experience OfertaStudio

## Status i zakres

Etap 5 wprowadził produkcyjny fundament opcjonalnej warstwy WebGL, etap 6 zbudował proceduralny świat i sekwencję Chaos → Structure, a etap 7 podłączył ten sam system do finalnego Hero na `/`. Laboratorium `/experience-lab` pozostaje nieindeksowanym miejscem do deterministycznego testowania obu sekwencji.

Warstwa bazuje na Three.js i React Three Fiber. Nie używa modeli zewnętrznych, tekstur, postprocessingu, systemu cząstek, shaderów ani bibliotek smooth scroll. HTML, metadata, nawigacja, CTA i cała treść sprzedażowa pozostają niezależne od canvasu. Pełny język sceny opisuje [CONVERSION_LANDSCAPE.md](./CONVERSION_LANDSCAPE.md), a produkcyjne użycie w otwarciu strony [HOMEPAGE_HERO.md](./HOMEPAGE_HERO.md).

## The Conversion Landscape

Świat wizualny przedstawia przejście:

> chaos → diagnoza → struktura → transformacja → system → efekt

To przestrzenna metafora pracy OfertaStudio. Rozproszone moduły stopniowo przechodzą w regularną architekturę informacji. Grid pokazuje reguły i relacje, geometryczne moduły reprezentują treść, ofertę i interfejs, a kontrolowany ruch kamery prowadzi przez kolejne stany procesu.

Warstwa experience ma:

- ułatwiać zrozumienie procesu porządkowania sprzedaży internetowej,
- budować rozpoznawalny, precyzyjny język wizualny,
- wzmacniać rytm narracji, ale nie zastępować informacji,
- degradować się do spójnego statycznego kadru bez utraty treści.

Nie jest miejscem na przypadkowe obiekty, Web3 aesthetic, gaming UI, intensywny bloom, parallax dla samego efektu ani stockowe modele 3D.

## Podział DOM i WebGL

| Warstwa                      | Odpowiedzialność                                   | Renderowanie                  |
| ---------------------------- | -------------------------------------------------- | ----------------------------- |
| Root layout, header, footer  | semantyka, nawigacja, landmarki                    | Server Components             |
| Treść strony i CTA           | kompletna narracja, linki, formularze, SEO         | Server Components / DOM       |
| `ExperienceCanvas`           | detekcja możliwości, lazy mount, scroll i fallback | mała granica Client Component |
| `ExperienceRenderer` i scena | canvas, kamera, światło, geometria                 | lazy-loaded client subtree    |
| `WebGLFallback`              | statyczna kompozycja dostępna bez WebGL i JS       | HTML + CSS                    |

Canvas ma `aria-hidden="true"`, `tabIndex={-1}` i `pointer-events: none`. Nie bierze udziału w kolejności tabulacji. Ewentualna treść przekazana jako `children` jest osobną warstwą DOM nad sceną i może pozostać interaktywna.

Root layout, `PageShell`, `SiteHeader`, `SiteFooter` i route `/experience-lab` pozostają serwerowe. Import R3F występuje dopiero w lazy-loaded `ExperienceRenderer`.

## Przepływ danych

```text
natywny scroll
  → normalizeScrollProgress (0–1)
  → targetProgressRef + lokalne --experience-progress dla motion DOM
  → ScrollSceneController + damping
  → dampedProgressRef
  → SceneSequenceController + CameraRig
  → stan sceny + pozycja / target / FOV / roll
```

Odczyt scrolla nie zapisuje bezpośrednio pozycji kamery. Listener jest pasywny, a pomiary są koaleskowane przez pojedynczy `requestAnimationFrame`. Wygładzanie i renderowanie odbywa się we wspólnej pętli R3F.

## Architektura komponentów

### `ExperienceCanvas`

Publiczna granica experience. Odpowiada za:

- stabilne miejsce w layoucie bez layout shift,
- renderowanie fallbacku już w HTML,
- detekcję WebGL, viewportu, DPR, touch i `prefers-reduced-motion`,
- wybór quality tier,
- lazy import ciężkiego renderera z `ssr: false`,
- mount sceny dopiero w pobliżu viewportu przez `IntersectionObserver`,
- normalizację scrolla i subtelny pointer input,
- obsługę błędu runtime oraz utraty kontekstu,
- cleanup obserwatorów, listenerów i zaplanowanej klatki.

Najważniejsze propsy:

- `enabled` — całkowicie wyłącza warstwę experience i pozostawia ewentualne `children` jako zwykły DOM,
- `forceFallback` — wymusza statyczny wariant,
- `layout="panel" | "hero"` — wybiera techniczny panel albo pełną kompozycję bez dublowania canvasu,
- `sequence="conversion" | "hero"` — wybiera centralny timeline i camera path,
- `mode="scroll" | "static" | "manual"` — wybiera długi tor narracji, pojedynczy kadr albo sterowanie laboratorium,
- `progress` — ręczna wartość `0–1` używana tylko w trybie manual,
- `motionPreference="auto" | "reduced"` — testuje statyczny wariant bez zmiany preferencji systemowej,
- `showDiagnostics` — pokazuje techniczne dane wyłącznie w laboratorium,
- `children` — opcjonalna, semantyczna warstwa DOM.

### `ExperienceRenderer`

Tworzy `Canvas`, ustawia kamerę startową, limit DPR, antialiasing i tryb pętli. Dla reduced motion używa `frameloop="demand"`; dla pełnego ruchu korzysta z jednej pętli R3F. Kolory sceny odczytuje z semantycznych CSS Custom Properties.

### `ExperienceScene`

Cienka kompozycja kontrolerów i elementów sceny. Nie zawiera logiki routingu, treści ani UI.

### `ScrollSceneController`

Tłumi zmianę `targetProgressRef` i zapisuje wynik do `dampedProgressRef`. Reduced motion ustawia stały, czytelny kadr.

### `CameraRig`

Konsumuje centralną trajektorię z `camera-path.ts`. Sekwencja Conversion ma po cztery ujęcia, a Hero po pięć: arrival, recognition, approach, opening oraz handoff. Obie posiadają osobne kompozycje `wide` i `compact`. Rig kontroluje pozycję, cel, FOV i minimalny roll. Pointer influence jest ograniczony przez quality tier, tłumiony i wyłączony dla touch oraz reduced motion.

### `ConversionLandscape`

Cienka kompozycja proceduralnego świata. Łączy `LandscapeField`, `SpatialGrid`, `SpatialModules`, `SignalField` i `FocusObject`. Dane generuje deterministycznie na podstawie jednego seeda i aktywnego quality tier. Jedna współdzielona geometria box oraz instancing ograniczają zasoby i draw calls.

### `SceneSequenceController`

Tłumaczy damped progress wybranej sekwencji na semantyczne wartości `structureProgress`, `signalProgress`, `focusProgress` i `chaosWeight`. Aktualizuje jeden ref przed renderowaniem obiektów i nie wywołuje React state update na klatkę. Hero startuje od uporządkowanego świata, a laboratorium zachowuje pełne Chaos → Structure.

### `Atmosphere`, `Lighting`, `PerformanceController`

Małe moduły odpowiedzialne odpowiednio za tło i fog, kontrolowane światło oraz DPR, invalidację i utratę kontekstu WebGL.

### `WebGLFallback`

Statyczny, dekoracyjny układ CSS oparty na tych samych tokenach co scena. Jest obecny przed pobraniem renderera, przy braku WebGL, w stanie błędu i po wymuszeniu fallbacku. Nie pokazuje użytkownikowi technicznego komunikatu o braku WebGL.

## Model scrolla

|      Zakres | Identyfikator    | Rola docelowa                            |
| ----------: | ---------------- | ---------------------------------------- |
| `0.00–0.15` | `hero`           | orientacja i wejście w świat             |
| `0.15–0.30` | `chaos`          | rozproszone dane i niespójna prezentacja |
| `0.30–0.45` | `diagnosis`      | wykrywanie relacji i priorytetów         |
| `0.45–0.65` | `transformation` | porządkowanie oraz przebudowa            |
| `0.65–0.82` | `services`       | moduły pracujące jako jeden system       |
| `0.82–1.00` | `conversion`     | stabilny kierunek i następny krok        |

Zakresy są centralnie zdefiniowane w `src/lib/experience/progress.ts` i walidowane przez `npm run experience:check`. Granice muszą być ciągłe, bez luk i nakładania.

## Ładowanie i progressive enhancement

1. Serwer zwraca pełną treść DOM oraz widoczny fallback CSS.
2. Po hydratacji wykrywane są preferencje i możliwości urządzenia.
3. WebGL nie jest pobierany, jeśli experience jest wyłączone, wymuszono fallback albo przeglądarka nie utworzy bezpiecznego kontekstu.
4. Renderer jest importowany dopiero, gdy kontener zbliży się do viewportu.
5. Po utworzeniu canvasu fallback łagodnie znika.
6. Utrata kontekstu lub błąd renderera przywraca fallback bez naruszenia treści.

Nie ma zależności między widocznością treści a gotowością sceny.

## Quality tiers

| Tier     | Zastosowanie                                     |          DPR | Moduły | Antialias | Pointer |
| -------- | ------------------------------------------------ | -----------: | -----: | --------- | ------: |
| High     | duży viewport bez ograniczeń ruchu               |        `1–2` |     72 | tak       |    0,28 |
| Medium   | laptop / mniejszy desktop                        |      `1–1,5` |     48 | tak       |    0,18 |
| Low      | mobile, touch, niski viewport lub reduced motion |     `1–1,25` |     24 | nie       |       0 |
| Fallback | brak WebGL, błąd lub jawne wyłączenie            | brak canvasu |      0 | nie       |       0 |

Tier wynika z możliwości, nie z user-agent sniffingu. W przyszłości można dodać adaptację na podstawie rzeczywistej wydajności, ale nie wolno destabilizować jakości podczas krótkich spadków FPS.

## Reduced motion i mobile

Przy `prefers-reduced-motion: reduce`:

- scena otrzymuje tier Low,
- progres zostaje ustawiony na stabilny kadr `0.92` dla Conversion albo `0.70` dla Hero,
- travel kamery i pointer influence są wyłączone,
- Canvas renderuje na żądanie,
- treść DOM pozostaje bez zmian,
- natywny scroll nie jest wygładzany.

Urządzenia dotykowe również nie otrzymują pointer parallax. Mobile zachowuje tę samą semantyczną narrację w DOM, ale ogranicza geometrię, DPR, antialiasing i głębokość oraz korzysta z osobnej trajektorii `compact`.

## Warstwy

| Token                               | Wartość | Rola                   |
| ----------------------------------- | ------: | ---------------------- |
| `--layer-experience-background`     |       1 | CSS fallback           |
| `--layer-experience-canvas`         |       2 | dekoracyjny canvas     |
| `--layer-experience-content`        |       3 | treść DOM nad sceną    |
| `--layer-header`                    |      30 | globalny sticky header |
| `--layer-dropdown`                  |      40 | dropdowny i megamenu   |
| `--layer-overlay` / `--layer-panel` | 50 / 60 | mobilna nawigacja      |

Experience działa we własnym kontekście `isolate`, więc nie może przykryć headera, menu ani przyszłego modala.

## Dodawanie kolejnej sceny

Nowa scena musi:

1. wynikać z konkretnego fragmentu narracji i mieć równoważną treść w DOM,
2. korzystać z istniejącego progresu zamiast dodawać własny listener scrolla,
3. używać pętli R3F zamiast osobnego RAF,
4. mieć wariant High, Medium, Low i strategię bez WebGL,
5. wyłączyć lub ograniczyć ruch dla reduced motion i touch,
6. pobierać kolory z tokenów `--experience-*`,
7. posiadać jawny budżet geometrii, tekstur i draw calls,
8. nie przechwytywać fokusu ani interakcji DOM,
9. przejść `typecheck`, `lint`, `design:check`, `experience:check` i build,
10. zostać opisana w dokumentacji oraz inwentarzu.

Finalny Hero jest jedynym produkcyjnym użyciem sceny na tym etapie. Sam fakt istnienia laboratorium i wspólnego silnika nie upoważnia do umieszczenia WebGL na wszystkich podstronach.
