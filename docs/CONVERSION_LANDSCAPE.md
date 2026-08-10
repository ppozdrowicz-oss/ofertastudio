# The Conversion Landscape

## 1. Koncept

The Conversion Landscape jest proceduralnym środowiskiem 3D OfertaStudio. Nie imituje naturalnego krajobrazu ani interfejsu konkretnego klienta. Łączy topografię informacji, modularną architekturę, strukturę danych i światło studia produktowego.

Pierwsza wdrożona narracja pokazuje zmianę:

> kontrolowany chaos → porządkowanie → czytelny system

Etap 6 dostarczył rozpoznawalny język sceny. Etap 7 wykorzystuje ten sam system w finalnym Hero: nie tworzy równoległego świata ani nowej sceny, lecz dodaje osobną semantyczną sekwencję i centralną choreografię wejścia.

## 2. Powiązanie z marką

OfertaStudio porządkuje sposób, w jaki firma wygląda, działa, prezentuje produkty i prowadzi użytkownika do decyzji. Scena wizualizuje tę pracę, a nie listę narzędzi:

- rozproszone moduły oznaczają niespójne kanały, treści i priorytety,
- przerwane sygnały oznaczają nieczytelne relacje,
- transformacja w rytmiczną strukturę oznacza diagnozę i projektowanie systemu,
- obiekt skupienia oznacza odzyskaną hierarchię oraz następny krok,
- własny grid pokazuje reguły, według których elementy zaczynają współpracować.

Znaczenie biznesowe zawsze pozostaje również w DOM. WebGL jest warstwą przestrzeni, zmiany i relacji.

## 3. Visual grammar

Scena korzysta z czterech klas elementów. Ich odpowiedzialności są stabilne, dzięki czemu przyszłe sceny usługowe nie wymagają nowego silnika.

### 4. Field

`LandscapeField` tworzy bazową topografię z segmentowanych, instancjonowanych poziomów. Nie jest naturalnym terrainem. Kontrolowane przerwy i lekkie przesunięcia sugerują kolejne warstwy procesu.

Każdy poziom ma przypisaną strefę `foreground`, `middle` albo `background`. Strefa jest częścią danych proceduralnych i może w przyszłości sterować kontrastem albo rolą narracyjną bez zmiany geometrii bazowej.

### 5. Modules

`SpatialModules` reprezentują fragmenty cyfrowego systemu: strony, katalog, kartę produktu, kanał marketplace, content lub obszar audytu. Na tym etapie są abstrakcyjnymi bryłami, nie atrapami screenshotów.

Każdy moduł posiada:

- stabilny identyfikator,
- pozycję, rotację i skalę stanu chaos,
- pozycję, rotację i skalę stanu structure,
- głębokość,
- ważność,
- wariację,
- ton `base`, `elevated` albo `accent`,
- kontrolowane opóźnienie transformacji.

Wszystkie moduły jednego tieru są renderowane jednym `InstancedMesh`.

### 6. Signals

`SignalField` przedstawia przepływ informacji i zależności. Używa jednego `LineSegments` i jednego instancjonowanego zestawu prostokątnych markerów. Nie korzysta z chmury cząstek ani dekoracyjnych traili.

W chaosie połączenia są celowo skrócone i lekko rozłączone. Wraz z porządkowaniem docierają do właściwych modułów. Marker przesuwa się wyłącznie w funkcji semantycznego progresu; nie ma nieskończonej dekoracyjnej animacji czasowej.

### 7. Focus Object

`FocusObject` jest jedyną rozbudowaną formą hierarchiczną. Składa się z czterech instancji tej samej geometrii i dwóch współdzielonych materiałów. W stanie końcowym zbiera uwagę kamery oraz światła. Nie jest modelem produktu ani ekranem interfejsu.

## 8. Procedural generation

Dane powstają w `src/lib/experience/procedural.ts`. Generator korzysta z deterministycznego PRNG z seedem `0x0f3a6d`. Surowe `Math.random()` nie występuje w renderowaniu ani konfiguracji sceny.

Generator tworzy osobno:

- moduły wraz z dwoma stanami transformacji,
- poziomy Field,
- relacje Signal Field.

Dane są memoizowane według parametrów quality tier. Ten sam seed i kontrakt wejściowy zawsze zwracają ten sam układ, co umożliwia stabilne testy, debugowanie i porównania wizualne.

Jedna współdzielona `BoxGeometry` obsługuje Field, Modules, markery i Focus Object. Grid oraz sygnały mają po jednej lekkiej `BufferGeometry` linii.

## 9. Grid

`SpatialGrid` nie używa `GridHelper` ani nieskończonej siatki tutorialowej. Geometria składa się z:

- podłużnych rails definiujących kierunek,
- poprzecznych, celowo rozdzielonych odcinków,
- przerwy w osi centralnej, która pozostawia przestrzeń narracyjną,
- kolorów wierzchołków przechodzących od `experience.grid` do `experience.gridMinor` wraz z głębią.

Grid ma jeden draw call. Jego opacity rośnie subtelnie wraz ze `structureProgress`, ale pozostaje elementem pomocniczym.

## 10. Materials

Scena ma sześć materiałów:

1. moduły — `MeshStandardMaterial` z kolorami instancji,
2. Field — matowy materiał głębi,
3. elevated — jaśniejsza powierzchnia Focus Object,
4. accent — limonkowy marker hierarchii,
5. grid — transparentny `LineBasicMaterial` z kolorami wierzchołków,
6. signals — transparentny `LineBasicMaterial`.

Materiały i wspólna geometria są tworzone raz dla aktywnej palety. Ich lifecycle jest jawnie domykany przy unmount. Nie ma tekstur, HDRI ani oddzielnego materiału dla każdego modułu.

Kolory pochodzą wyłącznie z tokenów `--experience-*` odczytywanych z design systemu. Komponenty sceny nie zawierają wartości HEX.

## 11. Lighting

Oświetlenie nawiązuje funkcjonalnie do studia produktowego:

- jedno światło hemisphere zapewnia czytelną bazę i rozdzielenie od podłoża,
- jedno kierunkowe światło neutralne modeluje powierzchnie,
- jedno słabsze światło kierunkowe accent podkreśla kierunek transformacji.

Scena nie używa cieni. Nie ma dynamicznych shadow maps ani wielu punktowych źródeł światła. W sekwencji Hero intensywność dwóch świateł kierunkowych reaguje w małym zakresie na `focusProgress`, dzięki czemu dominantę widać wyraźniej podczas approach i opening bez dodatkowego światła ani draw calla.

## 12. Atmosphere

Głębię tworzą kompozycja, perspektywa, skala, kontrast, światło i natywny fog sceny. Tło oraz fog wykorzystują semantyczne tokeny experience.

Etap 6 celowo nie dodaje własnego GLSL. Standardowy materiał i fog osiągają wymagany efekt bez dodatkowego programu, wariantów shaderów ani ryzyka kompilacji na mobile. Nie ma postprocessingu, bloom, depth of field ani volumetric raymarchingu.

## 13. Chaos state

Stan chaos jest zaprojektowany, nie losowy:

- moduły zachowują ogólny kierunek głębi, ale tracą wspólny rytm,
- wysokość, rotacja i odstępy są kontrolowanie nierówne,
- sygnały urywają się przed właściwym celem,
- obiekt skupienia znajduje się poza osią główną,
- grid jest widoczny słabiej.

Użytkownik nadal widzi intencjonalną kompozycję, a nie awarię albo przypadkowy bałagan.

## 14. Structure state

W stanie structure:

- moduły wracają do rzędów i czytelnych odstępów,
- pionowa skala buduje hierarchię,
- sygnały łączą właściwe elementy,
- grid odzyskuje czytelność,
- Focus Object znajduje się na osi ujawnienia,
- kamera pokazuje system jako całość lub jego priorytetowy fragment zależnie od proporcji.

## 15. Transition rules

Sekwencja ma cztery ciągłe zakresy:

| Zakres      | Stan         | Funkcja                                    |
| ----------- | ------------ | ------------------------------------------ |
| `0–0.18`    | establishing | ustanowienie skali i kierunku              |
| `0.18–0.42` | chaos        | pokazanie niespójności bez losowego hałasu |
| `0.42–0.78` | ordering     | etapowe odzyskiwanie relacji i rytmu       |
| `0.78–1`    | structure    | stabilizacja systemu i hierarchii          |

`structureProgress` ma własne, miękkie okno `0.40–0.90`. Moduły otrzymują deterministyczne opóźnienie zależne od głębokości i kolumny. Scroll wskazuje stan docelowy, globalny damping wygładza progres, a instancje interpolują transformacje w pętli R3F. Nie ma `setState` na klatkę.

## 16. Camera choreography

Kamera ma jedno źródło prawdy w `src/lib/experience/camera-path.ts`. Każda sekwencja ma trajektorie `wide` i `compact`. Sekwencja `conversion` realizuje cztery ujęcia:

1. `establishing`,
2. `approach`,
3. `passage`,
4. `reveal`.

Każda klatka definiuje progres, pozycję, target, FOV i minimalny roll. Segmenty wykorzystują smoothstep, a `CameraRig` dodaje niezależny od FPS damping. Roll nie przekracza `0.02 rad`.

Hero realizuje pięć ujęć: `arrival`, `recognition`, `approach`, `opening` i `handoff`. Jego ścieżka nie nadpisuje ani nie duplikuje ścieżki Chaos → Structure. `CameraRig` wybiera dane na podstawie typowanego identyfikatora sekwencji, nie zawiera kopii keyframes i dodaje wyłącznie mały, tłumiony wpływ pointera.

Hero używa gotowego, uporządkowanego świata. `structureProgress` zaczyna się od `0.86`, Focus Object od `0.76`, a Signals od `0.68`. Wraz ze scrollem wartości dochodzą do jednego; pierwsze wejście buduje pewność i hierarchię zamiast odtwarzać chaos.

## 17. Mobile adaptation

Mobile używa trajektorii `compact`, mniejszej liczby elementów i krótszej głębi. Finalny kadr nie próbuje kopiować desktopowego passage: pozostaje wcześniej na osi Z, aby jednocześnie zachować widoczne moduły oraz Focus Object.

Programowy audyt kadrowania obejmuje szerokości `320`, `360`, `390`, `768`, `1024`, `1280`, `1366`, `1440` i `1920`. Dla Conversion Landscape sprawdza progresy `0`, `0.35`, `0.65` i `1`, a dla Hero `0`, `0.35`, `0.50`, `0.70` i `1`. Waliduje pozycję Focus Object w NDC, minimalny udział widocznych modułów oraz pozostawienie strefy copy na wide i umieszczenie dominanty niżej na compact.

Touch wyłącza pointer influence. WebGL nie jest wyłączany wyłącznie na podstawie szerokości; o degradacji decydują rzeczywiste możliwości i quality tier.

## 18. Quality tiers

| Parametr       | High | Medium |  Low | Fallback |
| -------------- | ---: | -----: | ---: | -------: |
| Moduły         |   72 |     48 |   24 |        0 |
| Poziomy Field  |   14 |     10 |    7 |        0 |
| Signals        |   24 |     16 |    8 |        0 |
| Głębokość      |   20 |     17 |   12 |        — |
| DPR max        |  2.0 |    1.5 | 1.25 |        — |
| Antialias      |  tak |    tak |  nie |      nie |
| Pointer        | 0.28 |   0.18 |    0 |        0 |
| Postprocessing |  nie |    nie |  nie |      nie |

Statyczny inwentarz maksymalnego aktywnego kadru:

| Tier   | Draw calls | Trójkąty | Geometrie | Materiały | Tekstury | Światła | Shadow maps |
| ------ | ---------: | -------: | --------: | --------: | -------: | ------: | ----------: |
| High   |          7 |     1368 |         3 |         6 |        0 |       3 |           0 |
| Medium |          7 |      936 |         3 |         6 |        0 |       3 |           0 |
| Low    |          7 |      516 |         3 |         6 |        0 |       3 |           0 |

Wartości są wyliczone z faktycznej struktury instancji. Panel laboratorium odczytuje dodatkowo `renderer.info`, ponieważ frustum i moment pomiaru mogą zmienić rzeczywisty wynik pojedynczej klatki.

Audyt przeglądarkowy potwierdził 7 draw calls i zgodną liczbę trójkątów we wszystkich tierach. Runtime pokazał 3 geometrie, 4 programy oraz 1 wewnętrzną teksturę Three.js/R3F; Conversion Landscape nie posiada własnych tekstur. Powtórny mount po przejściu przez fallback nie zwiększył tych wartości dla 390, 768, 1440 ani 1920 px.

## 19. Accessibility

- Canvas jest dekoracyjny, ma `aria-hidden`, `tabIndex={-1}` i `pointer-events: none`.
- Ważna treść, nawigacja i CTA pozostają w DOM.
- Reduced motion ustawia statyczny kadr `0.92` dla sekwencji Conversion i `0.70` dla Hero, wyłącza travel oraz pointer i zatrzymuje czasowy przepływ markerów.
- Brak WebGL, błąd sceny lub utrata kontekstu przywraca dopracowany CSS fallback.
- Canvas nie przechwytuje scrolla, klawiatury ani fokusu.

## 20. Użycie w finalnym Hero

Finalny Hero korzysta z istniejących ról bez zmiany ich znaczenia:

- **Field** utrzymuje skalę i prowadzi perspektywę pod handoff,
- **Modules** pokazują już uporządkowane kanały cyfrowego systemu,
- **Signals** budzą relacje wraz z recognition i approach,
- **Focus Object** jest jedną dominantą przestrzenną oraz punktem choreografii światła.

Kompozycja `wide` przesuwa dominantę na prawą stronę względem serwerowego copy. Kompozycja `compact` prowadzi ją pod blok treści i ogranicza głębokość. Lokalny scrim DOM chroni kontrast, ale scena jest komponowana tak, aby jasna geometria nie przechodziła pod headline.

Hero używa własnej pięciofazowej mapy semantycznej, ale tego samego `ExperienceCanvas`, `ExperienceScene`, `CameraRig`, quality systemu, zasobów i pętli R3F. Ten podział pozwala zachować jedną gramatykę oraz różne funkcje narracyjne bez rozrzucania warunków po komponentach geometrii.

## 21. Rozbudowa w etapach 8–10

Nowa scena lub reprezentacja filaru powinna:

1. przypisać istniejącym rolom Field, Module, Signal i Focus konkretne znaczenie,
2. użyć centralnego timeline i camera path albo jawnie rozszerzyć te modele,
3. zachować deterministyczne dane,
4. użyć współdzielonej geometrii oraz materiałów, gdy forma jest wspólna,
5. zdefiniować budżet High, Medium, Low i fallback przed dodaniem assetu,
6. mieć osobny kadr compact, jeśli jedna trajektoria nie zachowuje hierarchii,
7. nie przenosić treści sprzedażowej do canvasu,
8. przejść audyt semantycznych progresów właściwych dla sekwencji w wymaganych proporcjach,
9. nie dodawać shaderów ani postprocessingu bez wykazanej korzyści i pomiaru,
10. zostać pokazana w `/experience-lab` przed integracją z publicznym widokiem.
