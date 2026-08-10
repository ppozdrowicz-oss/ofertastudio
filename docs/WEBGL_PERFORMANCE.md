# WebGL performance OfertaStudio

## Cel budżetu

Warstwa 3D jest progresywnym rozszerzeniem strony usługowej. Nie może opóźniać HTML, nawigacji ani głównego CTA. Jej koszt jest uzasadniony wyłącznie wtedy, gdy wzmacnia narrację „chaos → system → efekt”.

Budżety w tym dokumencie są limitami projektowymi, nie deklaracją wyników na wszystkich urządzeniach. Rzeczywiste pomiary finalnego hero zostaną wykonane po integracji z pełnym widokiem i zatwierdzonymi assetami.

## Strategia ładowania

1. `ExperienceCanvas` renderuje na serwerze lekki fallback CSS i pełną treść DOM.
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
| Kolumny                |    8 |      6 |    4 |        — |
| Podziały grida         |   32 |     24 |   16 |        0 |
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

## Budżet prototypu

Aktualna scena ma:

- jedną instancjonowaną geometrię box zamiast osobnego mesha dla każdego modułu,
- maksymalnie 72 instancje,
- jedną płaszczyznę i jeden grid helper,
- dwa proste źródła kierunkowe/punktowe oraz ambient bez cieni,
- zero tekstur, modeli, cząstek, render targetów i efektów postprocessingu,
- materiały standardowe bez własnego GLSL,
- docelowo nie więcej niż pięć podstawowych draw calls dla prototypu.

Instancjonowane boxy mają niewielką liczbę trójkątów. Geometryczny język ma wynikać z kompozycji i światła, nie z wysokiego polygon count.

### Pomiar builda etapu 5

Produkcyjny build Next.js 16.3.0 z 10 sierpnia 2026 potwierdził separację chunków:

- HTML `/` i `/design-system` nie preładuje trzech ciężkich chunków zawierających Three.js/R3F,
- HTML `/experience-lab` również ich nie preładuje; dynamiczny import następuje dopiero po hydratacji i wejściu kontenera w strefę `IntersectionObserver`,
- trzy współdzielone chunki WebGL mają łącznie 882 276 B bez kompresji i około 232 924 B po zagregowanym gzip,
- route wrapper `/experience-lab` ma 10 774 B bez kompresji.

To pomiar referencyjny bieżącego builda, a nie gwarancja stałych nazw lub rozmiarów chunków. Koszt jest akceptowalny dla izolowanego laboratorium, ale pozostaje realnym budżetem do kontroli przed integracją z publicznym homepage.

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

- 100 instancji w High,
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
- Layout rezerwuje wysokość przez tokeny `--experience-track-height` i `--experience-static-height`, więc pojawienie się canvasu nie przesuwa treści.

## Mobile

Mobile nie jest pomniejszonym desktopem. Strategia obejmuje:

- tier Low od pierwszego wykrycia możliwości,
- DPR maksymalnie 1,25,
- brak antialiasingu i pointer influence,
- 24 instancje oraz uproszczony grid,
- natywny touch scroll,
- tę samą treść i CTA w DOM,
- brak canvasu, jeśli bezpieczny kontekst nie powstanie.

Należy sprawdzać co najmniej 320, 390, 768, 1024, 1280, 1440 i 1920 px. Kluczowe są brak poziomego overflow, stabilny sticky kadr i nieprzykrywanie nawigacji.

## Shadery

W etapie 5 shader nie został dodany. Fog, światło i depth tint osiągnięto standardowymi mechanizmami Three.js, więc własny GLSL nie wnosił wystarczającej wartości względem kosztu utrzymania.

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

Pełna kontrola etapu obejmuje również `format:check`, `lint`, `typecheck`, `content:check`, `design:check`, build produkcyjny, uruchomienie produkcyjnego serwera i HTTP smoke test `/`, `/design-system` oraz `/experience-lab`.

Przed finalną publikacją sceny potrzebny będzie profil rzeczywistych FPS, czasu GPU, pamięci i bundle na reprezentatywnych urządzeniach. Etap fundamentu nie deklaruje niezmierzonych wyników.
