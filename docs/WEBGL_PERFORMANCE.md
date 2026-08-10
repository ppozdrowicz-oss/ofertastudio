# WebGL performance OfertaStudio

## Cel budżetu

Warstwa 3D jest progresywnym rozszerzeniem strony usługowej. Nie może opóźniać HTML, nawigacji ani głównego CTA. Jej koszt jest uzasadniony wyłącznie wtedy, gdy wzmacnia narrację „chaos → system → efekt”.

Budżety w tym dokumencie są limitami projektowymi, nie deklaracją wyników na wszystkich urządzeniach. Finalny Hero wykorzystuje aktualną scenę bez nowych assetów, geometrii i efektów postprocessingu. Czas GPU oraz stabilność FPS nadal wymagają pomiaru na reprezentatywnych urządzeniach, nie tylko w środowisku deweloperskim.

## Strategia ładowania

1. `ExperienceCanvas` renderuje w pierwszym HTML lekki fallback CSS, a `HeroContent` dostarcza pełne copy i CTA bez oczekiwania na renderer.
2. Moduł zawierający `@react-three/fiber` oraz Three.js jest importowany dynamicznie z `ssr: false`.
3. `IntersectionObserver` montuje renderer dopiero w pobliżu viewportu (`rootMargin: 25%`).
4. Brak WebGL, jawne wyłączenie lub błąd nie inicjuje sceny.
5. Po opuszczeniu obszaru renderer może zostać odmontowany; R3F zwalnia scenę i renderer, a lokalne listenery są usuwane.

Ciężka część nie może zostać zaimportowana do root layoutu, headera, stopki ani wspólnego `PageShell`.

## Quality tiers

| Parametr               | High | Medium |  Low | Fallback |
| ---------------------- | ---: | -----: | ---: | -------: |
| Minimalny DPR          |    1 |      1 |    1 |        — |
| Maksymalny DPR         |    2 |    1,5 | 1,25 |        — |
| Moduły instancjonowane |   72 |     48 |   24 |        0 |
| Poziomy Field          |   14 |     10 |    7 |        0 |
| Signals                |   24 |     16 |    8 |        0 |
| Głębokość landscape    |   20 |     17 |   12 |        — |
| Kolumny                |    8 |      6 |    4 |        — |
| Podziały grida         |   30 |     22 |   14 |        0 |
| Antialias              |  tak |    tak |  nie |      nie |
| Cząstki                |    0 |      0 |    0 |        0 |
| Postprocessing         |  nie |    nie |  nie |      nie |
| Pointer influence      | 0,28 |   0,18 |    0 |        0 |

### Reguły wyboru

- `FALLBACK`: brak bezpiecznego kontekstu WebGL, błąd runtime albo jawne wyłączenie.
- `LOW`: reduced motion, touch, szerokość poniżej 768 px albo wysokość poniżej 560 px.
- `HIGH`: co najmniej 1280 × 720 px, brak touch i brak reduced motion.
- `MEDIUM`: pozostałe wspierane viewporty.

DPR jest dodatkowo ograniczany przez rzeczywisty `devicePixelRatio`. Nie używamy user-agent sniffingu i nie wpisujemy osobnych arbitralnych DPR w komponentach scen.

## Budżet Conversion Landscape

Etap 6 zastępuje testowy grid i płaszczyznę właściwym systemem proceduralnym. Aktualna scena ma:

- jedną współdzieloną `BoxGeometry` dla Field, Modules, markerów i Focus Object,
- jedną lekką geometrię linii dla autorskiego grida,
- jedną lekką geometrię linii dla Signal Field,
- sześć materiałów współdzielonych według roli,
- trzy światła bez cieni,
- zero tekstur, modeli, cząstek, render targetów i efektów postprocessingu,
- materiały standardowe bez własnego GLSL.

Statyczny inwentarz maksymalnego aktywnego kadru:

| Tier   | Draw calls | Trójkąty | Instancje | Geometrie | Materiały | Tekstury | Światła | Shadow maps |
| ------ | ---------: | -------: | --------: | --------: | --------: | -------: | ------: | ----------: |
| High   |          7 |     1368 |       114 |         3 |         6 |        0 |       3 |           0 |
| Medium |          7 |      936 |        78 |         3 |         6 |        0 |       3 |           0 |
| Low    |          7 |      516 |        43 |         3 |         6 |        0 |       3 |           0 |

Wartości wynikają z rzeczywistych liczebności instancji i 12 trójkątów współdzielonego boxa. Linie nie zwiększają licznika trójkątów. Jest to inwentarz konstrukcyjny, nie pomiar czasu GPU. `/experience-lab` pokazuje dodatkowo bieżące `renderer.info.render` oraz `renderer.info.memory`, gdy renderer działa.

Audyt runtime w Chromium dla deterministycznych kadrów potwierdził 7 draw calls oraz odpowiednio 516, 936 i 1368 trójkątów dla Low, Medium i High. `renderer.info` raportował 3 geometrie, 4 skompilowane programy i 1 teksturę wewnętrzną renderera. Sama scena nadal nie ładuje ani nie tworzy żadnej tekstury. Wartości pozostały identyczne po wymuszeniu fallbacku i ponownym montażu canvasu przy szerokościach 390, 768, 1440 i 1920 px; kontekst nie był utracony, a liczba zasobów nie rosła. Jest to kontrola lifecycle i budżetu, nie miarodajny pomiar czasu GPU na urządzeniu użytkownika.

### Zgodność Three.js i React Three Fiber

Three.js jest świadomie przypięte do `0.182.0`, a odpowiadające typy do `0.182.0`. Aktualne stabilne React Three Fiber `9.7.0` nadal tworzy `THREE.Clock`; od Three.js r183 ta klasa emituje ostrzeżenie deprecacji na każdy mount canvasu. Wersja r182 zachowuje wszystkie używane API, spełnia peer dependency R3F (`three >=0.156`) i usuwa ostrzeżenie bez przechodzenia na niestabilny kanał R3F 10. Decyzję należy ponownie zweryfikować, gdy stabilny R3F zastąpi Clock przez Timer.

### Pomiar builda finalnego Hero — etap 7

Produkcyjny build Next.js 16.3.0 z 10 sierpnia 2026 potwierdził separację chunków:

- HTML `/` zawiera H1, lead, oba CTA i fallback, a nie zawiera rendererowego canvasu,
- HTML `/`, `/design-system` i `/experience-lab` nie preładowuje ciężkich chunków Three.js/R3F; dynamiczny import następuje po hydratacji i wejściu kontenera w strefę `IntersectionObserver`,
- pięć współdzielonych chunków dynamicznej części WebGL ma łącznie 899 421 B bez kompresji i 241 573 B po zagregowanym gzip,
- klientowa granica `ExperienceCanvas` ładowana z homepage ma 14 059 B bez kompresji i 4 631 B gzip,
- własny route chunk homepage ma 265 B bez kompresji i 208 B gzip; treść oraz kompozycja Hero pozostają serwerowe,
- względem referencyjnego builda etapu 6 dynamiczna część wzrosła o 17 145 B raw i 8 649 B gzip, głównie przez obsługę drugiej sekwencji, ścieżkę kamery i tryb Hero laba.

To pomiar referencyjny bieżącego builda, a nie gwarancja stałych nazw lub rozmiarów chunków. Ciężki koszt jest odseparowany od SSR treści, ale pozostaje realnym kosztem sieciowym publicznego pierwszego widoku i wymaga dalszego monitorowania.

## Hero i Core Web Vitals

### LCP

Headline, lead i CTA są Server Components i znajdują się w pierwszym HTML. WebGL nie jest warunkiem ich widoczności. Font jest ładowany przez `next/font`, a fallback i tło mają docelowy kolor przed inicjalizacją renderera. Najbardziej prawdopodobnym kandydatem LCP pozostaje tekst H1 lub jego blok, nie asset 3D; należy to potwierdzić przez pomiar RUM albo Lighthouse w środowisku wdrożeniowym.

### CLS

Track Hero rezerwuje `132svh` na mobile oraz `140svh` od 768 px. Sticky kadr ma stałą wysokość wynikającą z `svh` i tokenu headera. Fallback, canvas oraz treść są warstwami absolutnymi wewnątrz zarezerwowanego obszaru, dlatego gotowość WebGL nie zmienia layoutu. CTA i competence strip istnieją w SSR.

### INP

Canvas ma `pointer-events: none`; wrapper jedynie zapisuje znormalizowany pointer do refu, gdy tier pozwala na interakcję. Nie ma React `setState` na `pointermove`. Scroll listener jest pasywny, a jeden RAF grupuje pomiary. Header, menu, CTA i touch scroll pozostają niezależne od R3F.

## Budżety dla kolejnych scen

Każdy nowy zakres musi przed implementacją określić:

- liczbę nowych draw calls,
- liczbę instancji i trójkątów w każdym tierze,
- rozmiar oraz format tekstur,
- koszt dodatkowych render passów,
- strategię mobile i reduced motion,
- zachowanie przy utracie kontekstu,
- wariant fallback.

Bez osobnej akceptacji jedna scena nie powinna przekraczać:

- 120 instancji w High,
- 60 instancji w Medium,
- 30 instancji w Low,
- 10 podstawowych draw calls,
- 2 MB skompresowanych assetów pobieranych dla pierwszego kadru,
- jednej dodatkowej tekstury o maksymalnym wymiarze 2048 px w High i 1024 px w Low.

To limity maksymalne, nie cele do wykorzystania. Współdzielona geometria i materiały są preferowane.

## DPR, viewport i resize

- Canvas przyjmuje przedział DPR z aktywnego tieru.
- `PerformanceController` ustawia DPR po utworzeniu renderera i po zmianie jakości.
- Resize obsługuje R3F; warstwa nadrzędna mierzy tylko progres scrolla.
- Zmiana viewportu aktualizuje tier bez ręcznego tworzenia kolejnego renderera poza cyklem React.
- Layout rezerwuje wysokość przez tokeny `--experience-track-height`, `--experience-static-height`, `--home-hero-track-height` i `--home-hero-preview-height`, więc pojawienie się canvasu nie przesuwa treści.

## Mobile

Mobile nie jest pomniejszonym desktopem. Strategia obejmuje:

- tier Low od pierwszego wykrycia możliwości,
- DPR maksymalnie 1,25,
- brak antialiasingu i pointer influence,
- 24 moduły, 7 poziomów Field, 8 Signals i uproszczony grid,
- osobne trajektorie kamery `compact` dla Conversion i Hero oraz krótszą głębię,
- natywny touch scroll,
- tę samą treść i CTA w DOM,
- brak canvasu, jeśli bezpieczny kontekst nie powstanie.

Należy sprawdzać co najmniej 320, 360, 390, 768, 1024, 1280, 1366, 1440 i 1920 px. Kluczowe są brak poziomego overflow, stabilny sticky kadr i nieprzykrywanie nawigacji.

## Shadery

W etapach 5–6 shader nie został dodany. Fog, światło, vertex colors grida i depth tint osiągnięto standardowymi mechanizmami Three.js, więc własny GLSL nie wnosi wystarczającej wartości względem kosztu utrzymania.

Jeżeli później shader stanie się potrzebny:

- uniformy mają nazwy domenowe i jawne typy,
- fragment shader nie wykonuje kosztownych pętli o zmiennej długości,
- liczba wariantów jest ograniczona przez quality tier,
- kod ma fallback do standardowego materiału,
- nie wprowadzamy volumetric raymarchingu bez osobnego profilu GPU,
- kompilacja shaderów nie może blokować dostępu do treści.

## Tekstury i assety

- Preferujemy geometrię proceduralną i współdzielone bufory.
- Asset musi mieć właściciela, rolę, rozmiar źródłowy i warianty jakości.
- Modele wymagają optymalizacji siatki, usunięcia niewidocznych danych i kompresji uzasadnionej wsparciem przeglądarek.
- Tekstury wymagają poprawnych wymiarów, mipmap i nowoczesnego formatu.
- Nie dodajemy stockowych modeli, dużych HDRI ani dekoracyjnych filmów „na próbę”.
- Asset niewidoczny w pierwszym kadrze jest ładowany dopiero przed swoim zakresem narracji.

## Pętla renderowania i pamięć

- Jedyną ciągłą pętlą jest `useFrame` zarządzane przez R3F.
- Scroll używa jednego RAF do grupowania pomiarów, nie do renderowania.
- Reduced motion przełącza Canvas na `frameloop="demand"`.
- Proceduralne obiekty są deterministyczne i memoizowane.
- Jedna współdzielona geometria i materiały mają jawny cleanup przy unmount; R3F pozostaje właścicielem renderera oraz pętli.
- Listenery `scroll`, `resize` i `webglcontextlost` oraz obserwatory są usuwane przy unmount.
- Utrata kontekstu wywołuje fallback; użytkownik nie otrzymuje technicznego komunikatu.
- Nie przechowujemy WebGL rendererów ani scen w globalnym stanie.

## Awaria i fallback

Fallback jest stanem równorzędnym, nie ekranem błędu. Używa semantycznych tokenów CSS i rezerwuje ten sam obszar co scena. Pojawia się:

- przed lazy loadem,
- bez JavaScriptu,
- bez WebGL,
- przy wymuszonym ograniczeniu,
- po błędzie React subtree,
- po utracie kontekstu.

Treść i akcje znajdują się ponad fallbackiem w DOM. Nie pokazujemy komunikatu „przeglądarka nie wspiera WebGL”, jeśli nie ma działania naprawczego dla użytkownika.

## Kontrola jakości

`npm run experience:check` sprawdza statycznie i jednostkowo:

- ciągłość zakresów 0–1,
- normalizację progresu i damping,
- wybór wszystkich czterech tierów,
- ograniczenie DPR i pointera,
- lazy import i izolację Client Component,
- obecność fallbacku i reduced motion,
- cleanup listenerów i obserwatorów,
- brak WebGL w root layoucie,
- noindex laboratorium,
- brak dodatkowych pętli RAF.
- deterministyczność generatora i unikalność identyfikatorów,
- limity draw calls, trójkątów, materiałów i tekstur,
- cztery centralne trajektorie kamery — po `wide` i `compact` dla Conversion oraz Hero — i bezpieczny roll,
- 81 deterministycznych kombinacji kadru dla dziewięciu viewportów i semantycznych progresów obu sekwencji,
- serwerowe H1, centralne CTA, wspólny progres CSS/WebGL oraz integrację trybu Hero w laboratorium.

Pełna kontrola etapu obejmuje również `format:check`, `lint`, `typecheck`, `content:check`, `design:check`, build produkcyjny, uruchomienie produkcyjnego serwera i HTTP smoke test `/`, `/design-system` oraz `/experience-lab`.

W bieżącym środowisku nie ma zainstalowanego browser runnera ani wykonywalnej przeglądarki, dlatego po etapie 7 nie wykonano świeżego profilu FPS, czasu GPU, konsoli WebGL ani ponownego pomiaru `renderer.info`. Hero nie zmienia konstrukcyjnego budżetu sceny, ale dane runtime z etapu 6 pozostają wyłącznie pomiarem referencyjnym. Przed wdrożeniem wymagany jest profil na reprezentatywnym mobile oraz desktopie; dokument nie deklaruje niezmierzonych wyników.
