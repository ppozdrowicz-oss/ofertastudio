# Motion system OfertaStudio

## Cel

Ruch OfertaStudio ma być precyzyjny, spokojny i funkcjonalny. Pokazuje relację między stanami, prowadzi uwagę i wyjaśnia transformację. Nie może opóźniać dostępu do treści, utrudniać scrolla ani być warunkiem zrozumienia strony.

System łączy krótkie przejścia DOM z tłumionym ruchem kamery WebGL. Obie warstwy mają wspólną zasadę: szybka odpowiedź na intencję użytkownika i łagodne domknięcie zmiany.

## Ruch DOM

Źródłem wartości są tokeny w `src/styles/globals.css`:

| Token                |                          Wartość | Zastosowanie                                    |
| -------------------- | -------------------------------: | ----------------------------------------------- |
| `--duration-instant` |                           100 ms | stan active i natychmiastowa informacja zwrotna |
| `--duration-fast`    |                           160 ms | hover, focus i niewielka zmiana opacity         |
| `--duration-normal`  |                           240 ms | dropdown, panel i mała zmiana stanu             |
| `--duration-slow`    |                           360 ms | wyjątkowe przejście większej powierzchni        |
| `--ease-standard`    |     `cubic-bezier(0.2, 0, 0, 1)` | standardowy ruch interfejsu                     |
| `--ease-emphasized`  | `cubic-bezier(0.2, 0.8, 0.2, 1)` | kontrolowane wejście ważnego elementu           |

Klasa `transition-interactive` łączy dozwolone właściwości: kolor, tło, obramowanie, cień, opacity i transform. Nie animujemy layoutu bez wyraźnej potrzeby. Element interaktywny reaguje natychmiast; animacja nie opóźnia fokusu ani aktywacji.

## Damping WebGL

WebGL używa interpolacji niezależnej od liczby klatek:

```text
factor = 1 - exp(-damping × delta)
value = current + (target - current) × factor
```

`delta` jest ograniczone do `1/20 s`, aby powrót do karty przeglądarki lub chwilowy spadek wydajności nie wywołał gwałtownego skoku.

Centralne parametry w `src/lib/experience/motion.ts`:

| Parametr                | Wartość | Rola                                         |
| ----------------------- | ------: | -------------------------------------------- |
| `scrollDamping`         |     5,4 | stabilizuje progres sceny                    |
| `cameraDamping`         |     4,8 | prowadzi pozycję, target, FOV i roll         |
| `pointerDamping`        |     7,2 | szybko, ale miękko wygasza reakcję wskaźnika |
| `maxFrameDelta`         |  0,05 s | ogranicza skok po wolnej klatce              |
| `reducedMotionProgress` |    0,92 | statyczny kadr uporządkowanego systemu       |

Nie dodajemy lokalnych wartości damping w pojedynczych scenach bez aktualizacji systemu i uzasadnienia.

## Scroll

Projekt zachowuje natywny scroll. Lenis nie został dodany, ponieważ fundament nie wymaga scroll-jackingu ani osobnej pętli. Pozostają nienaruszone:

- linki kotwicowe,
- przewijanie klawiaturą,
- przewijanie dotykowe i bezwładność systemowa,
- historia przeglądarki,
- globalne `scroll-padding-top` dla sticky headera.

CSS `scroll-behavior: smooth` dotyczy wyłącznie nawigacji do kotwic i jest wyłączany dla reduced motion.

Scroll-driven experience stosuje cztery kroki:

1. pasywny listener zgłasza potrzebę pomiaru,
2. pojedynczy RAF koaleskuje zdarzenia i wylicza progres `0–1`,
3. `ScrollSceneController` tłumi zmianę w pętli R3F,
4. scena konsumuje tylko tłumiony stan.

Nie wolno zapisywać `window.scrollY` bezpośrednio do transformacji obiektu lub kamery.

## Semantic scene progress

Globalny progres narracji i lokalny progres Conversion Landscape mają oddzielne odpowiedzialności. `src/lib/experience/progress.ts` opisuje przyszłą narrację całej strony, a `scene-timeline.ts` tłumaczy progres laboratorium na cztery stany:

- `establishing` — `0–0,18`,
- `chaos` — `0,18–0,42`,
- `ordering` — `0,42–0,78`,
- `structure` — `0,78–1`.

Timeline wylicza również `structureProgress`, `signalProgress`, `focusProgress` i `chaosWeight`. `ChaosStructureSequence` aktualizuje jeden współdzielony ref przed renderowaniem obiektów. Dzięki temu kamera, moduły, grid i sygnały nie interpretują granic niezależnie.

Transformacja struktury korzysta z okna `0,40–0,90`. Moduły otrzymują małe, deterministyczne opóźnienie zależne od głębokości i kolumny. Smoothstep kontroluje lokalny przebieg, a globalny damping progressu zapewnia fizycznie wiarygodne domknięcie bez dodatkowego spring engine.

## Ruch kamery

`CameraRig` korzysta wyłącznie z centralnych danych `src/lib/experience/camera-path.ts`. Nie przechowuje własnych keyframes. Trajektorie `wide` i `compact` mają po cztery punkty odpowiadające ujęciom:

1. establishing,
2. approach,
3. passage,
4. reveal.

Każdy punkt zawiera:

- `position`,
- `target`,
- `fov`,
- minimalny `roll`,
- pozycję `at` w globalnym progresie.

W obrębie segmentu używany jest smoothstep, a końcowy stan jest dodatkowo tłumiony. Roll nie przekracza `0,02 rad`. Kamera nie wykonuje agresywnych orbit, nie przecina geometrii dla efektu i nie zmienia gwałtownie FOV. Ruch ma wspierać przejście od rozproszenia do porządku.

Kadr `compact` nie jest pomniejszonym desktopem. Ma większy FOV, wyższą pozycję i krótszy passage, aby na wąskim ekranie zachować sylwetkę modułów i Focus Object.

## Pointer interaction

Pointer wpływa wyłącznie na niewielką korektę pozycji i celu kamery:

- High: maksymalna siła 0,28,
- Medium: 0,18,
- Low, touch i reduced motion: 0.

Wartość jest normalizowana do `-1…1`, ograniczona przez tier i osobno tłumiona. Canvas nie przechwytuje kliknięć. Po opuszczeniu obszaru cel pointera wraca do zera.

Nie wprowadzamy globalnego kursora, magnetycznych przycisków ani agresywnego parallax.

## Przejścia scen

Przejście sceny powinno zmieniać najwyżej kilka czytelnych parametrów: układ modułów, kontrast głębi, kierunek światła lub kadr. Nowy etap nie powinien rozpoczynać wielu nieskoordynowanych animacji.

Dozwolone:

- tłumiona pozycja i skala,
- kontrolowane opacity,
- mała rotacja wynikająca z narracji,
- zmiana targetu kamery,
- dyskretna zmiana światła i fog.

Niedozwolone bez osobnego uzasadnienia i budżetu:

- nieskończone dekoracyjne pętle,
- parallax każdego elementu DOM,
- spring z przypadkowymi parametrami,
- szybkie obroty kamery,
- zoom reagujący bezpośrednio na kółko myszy,
- motion blur, ciężki bloom lub depth of field,
- automatyczne animowanie wszystkich sekcji przy scrollu.

## Interpolacja obiektów

Każdy `SpatialModule` ma stan `chaos` i `structure` zawierający pozycję, rotację oraz skalę. Instancje są aktualizowane bezpośrednio przez `instanceMatrix` w pętli R3F. React nie otrzymuje `setState` na klatkę.

Signal Field interpoluje dwa końce linii z przerwanej do pełnej relacji. Markery poruszają się w funkcji progresu narracji, nie czasu. Po zatrzymaniu scrolla scena nie uruchamia dekoracyjnego ruchu bez końca.

Focus Object korzysta z `focusProgress`, aby przejść od przesuniętej, słabiej czytelnej formy do centralnego obiektu hierarchii.

## Scroll velocity

Etap 6 nie wykorzystuje scroll velocity. Natywny scroll i tłumienie progresu zapewniają wystarczającą fizyczność bez zależności od chwilowych pików wejścia. Jest to świadome ograniczenie: velocity nie wpływa obecnie na kamerę, geometrię ani shader.

Jeśli etap 7 wykaże realną potrzebę, velocity może sterować wyłącznie minimalnym opóźnieniem kamery albo intensywnością Signal Field. Wymaga wtedy jednego centralnego źródła, limitu amplitudy, wygaszenia po zatrzymaniu scrolla oraz wartości zero dla reduced motion. Nie może powodować shake, glitch, deformacji sceny ani motion blur.

## Reduced motion

`prefers-reduced-motion: reduce` jest nadrzędne wobec ustawień experience:

- globalne animacje i przejścia CSS mają minimalny czas,
- anchor scroll wraca do zachowania natywnego,
- progres sceny otrzymuje stałą wartość,
- camera travel i pointer influence są wyłączone,
- Canvas działa w trybie `demand`,
- treść nigdy nie jest ukrywana w oczekiwaniu na animację.

Statyczny kadr wykorzystuje progres `0,92`: pokazuje uporządkowany system, zatrzymuje camera travel oraz czasowy przepływ markerów. Nie wygląda jak zepsuta scena i nie usuwa geometrii. Jeśli WebGL jest niedostępny, równoważny rytm zachowuje fallback CSS.

## Synchronizacja DOM i WebGL

DOM jest źródłem znaczenia, a WebGL jego wizualnym wsparciem. Tekst może wskazywać bieżący etap narracji, ale nie może czekać na callback z renderera, aby stać się dostępny. Jeśli później pojawi się synchronizacja aktywnej sekcji:

- progi pochodzą z jednego rejestru zakresów,
- aktualizacja DOM nie następuje co klatkę,
- ARIA live nie ogłasza dekoracyjnego postępu,
- bez JavaScriptu wszystkie sekcje pozostają czytelne.

## Pętle i cleanup

- R3F zarządza jedyną ciągłą pętlą renderowania.
- Listener scrolla używa jednego RAF wyłącznie do koaleskowania pomiarów.
- Nowe sceny nie tworzą własnego `requestAnimationFrame`.
- Listener, `ResizeObserver`, `IntersectionObserver` i listener utraty kontekstu muszą być usuwane przy unmount.
- Reduced motion używa invalidacji zamiast ciągłego renderowania.

Te reguły sprawdza `npm run experience:check`, a naruszenia są traktowane jako błąd architektury, nie optymalizacja „na później”.
