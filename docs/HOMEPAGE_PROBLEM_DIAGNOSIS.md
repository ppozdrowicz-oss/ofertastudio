# Homepage — Problem Storytelling i Mini Diagnosis

## 1. Cel strategiczny

Rozdział odpowiada na pytanie: „dlaczego działająca technicznie strona, sklep albo oferta może nie wspierać sprzedaży?”. Nie straszy awarią i nie przedstawia diagnozy jako automatycznego audytu. Pokazuje, że prezentacja, użyteczność, treść i kolejny krok są częściami jednego systemu, a decyzję o zakresie prac poprzedza rozpoznanie zależności oraz priorytetów.

Po tym rozdziale użytkownik powinien rozumieć trzy rzeczy:

1. pojedynczy objaw może wynikać z problemu w innym miejscu ścieżki,
2. nie każdy przypadek wymaga pełnej przebudowy,
3. bezpiecznym pierwszym krokiem jest pokazanie obecnego rozwiązania do kwalifikacyjnej diagnozy.

## 2. Relacja z Hero

Hero i rozdział Problem → Diagnosis są dziećmi jednego `ExperienceCanvas` w `HomeStory`. Nie ma drugiego kontekstu WebGL, resetu kamery ani niezależnego listenera scrolla. Pięciofazowa ścieżka Hero jest pierwszym fragmentem centralnej ścieżki `homepage`; po stanie `handoff` kamera przechodzi do spokojniejszej, analitycznej choreografii.

DOM pozostaje warstwą znaczenia. Canvas wizualizuje utratę relacji, obserwację, klasyfikowanie oraz stan pośrednio uporządkowany, ale nie przechowuje nazw problemów ani wniosków.

## 3. Problem Intro

- **Eyebrow:** „To, że działa, nie znaczy, że działa dobrze”.
- **Headline:** „Technicznie działa. Ale czy pomaga sprzedawać?”.
- **Lead:** wyjaśnia, że strona, sklep, produkt i oferta są dla klienta jednym doświadczeniem, a nie niezależnymi realizacjami.

Headline jest pierwszym `h2` po głównym `h1`. Sekcja ma szeroki, spokojny rytm i nie korzysta z alarmowego koloru ani ikon ostrzeżeń. WebGL zaczyna w tym czasie odchodzić od pełnej regularności Hero.

## 4. Finalne problemy

Źródłem danych jest `src/content/home-problem-diagnosis.ts`. Model zawiera sześć problemów i odpowiadające im domeny sceny:

| Indeks | Domena sceny  | Kategoria | Problem                                                              |
| -----: | ------------- | --------- | -------------------------------------------------------------------- |
|     01 | `shoper`      | Shoper    | Sklep działa, ale nadal wygląda jak gotowy szablon.                  |
|     02 | `mobile`      | Mobile    | Wersja mobilna mieści treść, lecz utrudnia najważniejsze działania.  |
|     03 | `product`     | Produkt   | Karta produktu zawiera informacje bez czytelnej hierarchii.          |
|     04 | `marketplace` | Allegro   | Oferta Allegro jest kompletna, lecz nie pokazuje przewagi produktu.  |
|     05 | `website`     | Strona    | Strona buduje pierwsze wrażenie, ale nie prowadzi jasno do kontaktu. |
|     06 | `ecosystem`   | System    | Strona, sklep i marketplace pokazują tę samą firmę w różny sposób.   |

Treści nie zawierają statystyk, gwarancji ani diagnoz przypisanych do konkretnego klienta. `content:check` kontroluje liczbę elementów, unikalne identyfikatory, indeksy, kompletność treści oraz pokrycie wszystkich domen sceny.

## 5. Hierarchia treści i design Problem Field

Problem Field jest editorialną listą, nie siatką kart ostrzegawczych. Na szerokim ekranie nagłówek pozostaje w lewej kolumnie, a indeksowane problemy płyną naturalnie po prawej. Na mobile wszystkie elementy pozostają w jednym, czytelnym flow.

Każdy element zawiera:

- indeks dekoracyjny,
- kategorię,
- krótki nagłówek problemu,
- jedno wyjaśnienie skutku dla orientacji albo decyzji użytkownika,
- `data-scene-domain` wiążące treść z istniejącym językiem sceny.

Lista jest semantycznym `ol`. Nie wymaga hover, precyzyjnego scrolla ani WebGL.

## 6. Controlled Chaos

Stan fragmented nie oznacza awarii. Istniejące moduły tracą część regularności, Signal Field słabnie, a Focus Object przestaje być jednoznaczną dominantą. Zmiana korzysta z tych samych instancji i materiałów co Hero.

Każdy proceduralny moduł otrzymuje deterministyczną domenę diagnostyczną. Nie dodaje to meshy ani draw calli. CSS fallback pokazuje ten sam sens przez ograniczone przesunięcia kilku powierzchni i osłabienie sygnałów.

## 7. Diagnosis

Diagnoza oznacza identyfikację relacji i priorytetów, nie wykonanie naprawy. Treść opisuje trzy kroki:

1. rozpoznajemy zależności,
2. ustalamy priorytet,
3. wyznaczamy sensowny zakres.

W scenie kamera zwalnia, grid odzyskuje czytelność, sygnały ponownie łączą elementy, a kolejne domeny modułów otrzymują krótkie przestrzenne podkreślenie. Nie ma interfejsu „skanowania”, oceny punktowej, loading bara ani sugestii analizy AI.

## 8. Structure Emerges

Końcowy stan etapu osiąga `structureProgress = 0.78`, a nie pełne `1.00`. Relacje i priorytet są czytelne, lecz system nie jest jeszcze przedstawiony jako rozwiązany. Pozostawia to prawdziwy punkt startu dla transformacji Before → After w etapie 9.

Wynik tekstowy brzmi: „Wiemy, co wymaga zmiany — i czego nie trzeba ruszać”. Jest to wniosek o zakresie, nie obietnica efektu wdrożenia.

## 9. Semantic timeline

Centralne zakresy `homepageStoryRanges`:

| Zakres      | Stan             | Funkcja                                              |
| ----------- | ---------------- | ---------------------------------------------------- |
| `0–0.12`    | `hero`           | istniejąca sekwencja cinematic entry i handoff       |
| `0.12–0.24` | `problem-intro`  | przejście od gotowego systemu do pytania biznesowego |
| `0.24–0.46` | `fragmented`     | kontrolowana utrata rytmu i relacji                  |
| `0.46–0.58` | `observe`        | spokojne zbliżenie do problemów                      |
| `0.58–0.72` | `diagnose`       | wskazywanie zależności                               |
| `0.72–0.82` | `prioritize`     | hierarchia i wybór ważnych obszarów                  |
| `0.82–0.90` | `structured`     | stabilny stan pośredni                               |
| `0.90–0.97` | `mini-diagnosis` | niskoprogowe zaproszenie                             |
| `0.97–1`    | `handoff`        | przygotowanie transformacji                          |

Granice są jednym źródłem semantycznego stanu dla diagnostyki DOM, WebGL i laboratorium. Komponenty geometrii nie zawierają lokalnych progów rozdziału.

## 10. Choreografia kamery

Pierwsze pięć klatek centralnej ścieżki `homepage` jest wyprowadzone z zatwierdzonej ścieżki Hero. Kolejne ujęcia to:

1. `problem-intro`,
2. `fragmented`,
3. `observe`,
4. `diagnose`,
5. `prioritize`,
6. `structured`,
7. `transformation-prep`.

Ruch po Hero ma mniejszą amplitudę i bardziej analityczny charakter. Kamera wykonuje kontrolowane podejście oraz lateralny diagnostic pass, po czym wraca do stabilnego kadru. FOV pozostaje w wąskim zakresie, roll nie przekracza `0.012 rad`, a `wide` i `compact` mają osobne dane kompozycyjne.

## 11. Synchronizacja DOM i WebGL

`ExperienceCanvas` zapisuje jeden znormalizowany progres do refu sceny i lokalnej zmiennej `--experience-progress`. Dodatkowo aktualizuje `data-story-state` bez React `setState` na klatkę. DOM korzysta tylko z subtelnych mapowań CSS; treść nie znika i nie jest warunkowana osiągnięciem progu.

Przejście Hero → Problem jest testowane pod kątem ciągłości `structureProgress`, `focusProgress` i `signalProgress`. Szybki scroll zmienia stan docelowy, a wspólny damping domyka ruch bez pomijania treści DOM.

## 12. Mini Diagnosis

- **Headline:** „Nie wiesz, od czego zacząć?”.
- **Lead:** zaproszenie do pokazania strony, sklepu albo oferty.
- **CTA:** centralne `free-diagnosis` — „Zacznij od bezpłatnej diagnozy” prowadzące do `/brief`.

Sekcja nie zawiera atrapy pola URL. Trasa `/brief` jest istniejącym, walidowanym celem. Dopisek jasno określa, że jest to kwalifikacja potrzeby, nie automatyczny audyt ani obietnica wyniku. Globalne CTA pozostaje wyłączone na homepage, ponieważ strona nadal nie ma finalnego zakończenia z późniejszych etapów.

## 13. Handoff do etapu 9

Rozdział kończy komunikat „Diagnoza to dopiero początek”. Kamera stabilizuje system przy `structureProgress = 0.78`, neutralizuje akcenty i pozostawia Focus Object gotowy do dalszej transformacji. Etap 9 powinien rozpocząć się od tego stanu, bez resetu sceny i bez ponownego tłumaczenia problemu.

## 14. Desktop

- Od 1280 px lista wykorzystuje układ 5/7 kolumn z przyklejonym lokalnie nagłówkiem.
- Kamera `wide` zachowuje widoczny Focus Object i przestrzeń dla treści.
- Sekcje nie rozciągają jednego problemu na osobny viewport; użytkownik może je szybko przeskanować.
- Niski viewport 1366 × 768 korzysta z tych samych treści, krótszego widocznego fragmentu listy i natywnego scrolla.

## 15. Mobile i touch

- DOM ma pierwszeństwo, a lista płynie w jednej kolumnie.
- WebGL używa tieru Low, ścieżki `compact`, DPR maksymalnie 1.25, 24 modułów i 8 sygnałów.
- Nie ma sticky choreography przypisanej do pojedynczych problemów ani gesture hijackingu.
- CTA zajmuje pełną szerokość, a wszystkie interaktywne targety korzystają z design systemu.
- Canvas nie odbiera pointer events i nie blokuje touch scrolla.

## 16. Reduced motion

Sekwencja `homepage` używa stałego progresu `0.86`, czyli stanu `structured`. Kamera nie podróżuje, pointer jest wyłączony, markery są nieruchome, a R3F działa w trybie `demand`. DOM pozostaje w naturalnym flow, bez zmian opacity i transform koniecznych do odczytu.

## 17. Fallback i failure mode

Fallback CSS zachowuje Field, Modules, Signals i Focus Object. W zakresie fragmented kilka modułów jest lekko przesuwanych, a sygnały słabną; w diagnozie wracają do czytelnego układu. Brak WebGL, błąd subtree, utrata kontekstu lub brak JavaScriptu nie usuwa żadnego problemu, nagłówka ani CTA.

## 18. Dostępność

- wszystkie problemy istnieją w SSR HTML i są listą uporządkowaną,
- rozdział zachowuje logiczne `h2` i `h3`,
- canvas pozostaje dekoracyjny, `aria-hidden` i bez fokusu,
- CTA jest prawdziwym linkiem do istniejącej trasy,
- znaczenie nie zależy od koloru, ruchu ani aktualnego kadru,
- scroll pozostaje natywny dla kółka, dotyku, Space, PageDown, Home i End,
- treść ma kontrolowany scrim i kontrast niezależny od fazy sceny.

## 19. Wydajność i zasady zmian

Etap 8 nie dodaje geometrii, materiałów, tekstur, świateł, postprocessingu ani zależności. Budżet pozostaje na poziomie 7 draw calli oraz 1368/936/516 trójkątów dla High/Medium/Low. Domena diagnostyczna jest polem istniejących danych proceduralnych, a wyróżnienie zmienia macierze tych samych instancji.

Każda przyszła zmiana musi:

1. aktualizować `home-problem-diagnosis.ts`, zamiast duplikować treść w JSX,
2. zachować różnicę między diagnozą a rozwiązaniem,
3. nie udawać automatycznego audytu bez backendu,
4. rozszerzać centralny timeline i camera path zamiast dodawać drugi system,
5. działać przy szybkim scrollu, reduced motion i fallbacku,
6. zachować naturalny mobile flow,
7. przejść `content:check`, `experience:check` i pełny zestaw kontroli projektu.
