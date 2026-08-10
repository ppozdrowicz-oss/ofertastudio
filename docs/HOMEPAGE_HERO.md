# Homepage Hero OfertaStudio

## 1. Cel strategiczny

Hero jest pierwszym rozdziałem narracji OfertaStudio, a nie demonstracją technologii. Ma w pierwszym widoku wyjaśnić zakres marki, zbudować poczucie precyzji i poprowadzić do rozmowy albo sprawdzenia realizacji. Conversion Landscape wspiera znaczenie przestrzenią, hierarchią i ruchem, ale pełna informacja pozostaje w HTML.

Sekwencja doświadczenia ma pięć etapów: `arrival → recognition → approach → opening → handoff`. Użytkownik widzi treść natychmiast; scroll rozwija kadr i przekazuje stronę do następnego rozdziału bez blokowania natywnego przewijania.

## 2. Finalny headline

> Tworzymy strony, sklepy i oferty, które pomagają sprzedawać.

Ten wariant jest bardziej konkretny niż abstrakcyjne „cyfrowe środowisko sprzedaży”, nazywa trzy rozpoznawalne obszary pracy i zachowuje rezultat biznesowy bez gwarantowania wyniku. Fraza wspiera pozycjonowanie butikowego studia sprzedaży internetowej, ale nie próbuje zastąpić podstron właściwych dla intencji SEO.

## 3. Finalny lead

> Od strony firmowej i sklepu Shoper po prezentację produktu i ofertę Allegro. Projektujemy sposób, w jaki firma wygląda, działa i sprzedaje w internecie.

Lead pokazuje zakres przez cztery czytelne punkty odniesienia, a drugie zdanie scala je w jedną kompetencję. Nie jest katalogiem wszystkich usług i nie zawiera keyword stuffingu.

## 4. CTA

- Primary: `Porozmawiajmy o projekcie` → `/kontakt`.
- Secondary: `Zobacz realizacje` → `/realizacje`.

Identyfikatory pochodzą z `src/config/ctas.ts`, a Hero odczytuje je z `src/content/home-hero.ts`. Linki są renderowane serwerowo jako `ButtonLink`, działają bez JavaScriptu i nie używają kotwic zastępczych.

## 5. Hierarchia treści

1. eyebrow z pozycjonowaniem marki,
2. pojedynczy `h1`,
3. lead,
4. dwie akcje,
5. dyskretny competence strip,
6. dekoracyjny sygnał przewijania.

Elementy pozostają w jednym przepływie DOM. Nie istnieją osobne kopie mobile i desktop ani tekst renderowany w canvasie.

## 6. Layout

`HomeHero` umieszcza serwerowy `HeroContent` nad dekoracyjnym `ExperienceCanvas`. Track ma `132svh` poniżej 768 px i `140svh` od 768 px. Wewnątrz znajduje się sticky kadr o wysokości `100svh` pomniejszonej o token wysokości headera. Daje to krótką choreografię bez 300–500 vh scroll-jackingu.

Treść korzysta z szerokiego kontenera design systemu, ale zachowuje maksymalnie `46rem`. Lokalny, kontrolowany scrim chroni kontrast; nie jest efektem glass ani próbą maskowania przypadkowej kompozycji.

## 7. Kompozycja desktopowa

Od 768 px copy zajmuje maksymalnie 62% viewportu. Kamera i target są celowo przesunięte tak, aby Focus Object pozostawał po prawej stronie tekstu. Headline używa istniejącego tokenu `text-hero`, a CTA pozostają w jednym zawijającym wierszu. Kompetencje tworzą cienki sygnał przy dolnej części bloku, nie osobną sekcję proof.

Niski desktop (`max-height: 700px`) otrzymuje krótsze odstępy, mniejszy lead oraz ukryty competence strip i scroll cue. H1 i CTA pozostają widoczne oraz funkcjonalne.

## 8. Kompozycja mobile

Mobile nie skaluje ślepo desktopu. Headline korzysta z zakresu `clamp(2.25rem, 11vw, 2.75rem)`, CTA do 640 px zajmują pełną szerokość, a kamera `compact` kadruje dominantę niżej, pod treścią. Mniejszy quality tier ogranicza geometrię, głębię, DPR i wyłącza pointer influence.

Jedna semantyczna wersja treści obsługuje wszystkie szerokości. Jedynie kompozycja CSS oraz centralna trajektoria kamery adaptują się do proporcji.

## 9. Cinematic sequence

|   Progres | Faza        | Rola                                                  |
| --------: | ----------- | ----------------------------------------------------- |
|    0–0.20 | arrival     | gotowy pierwszy kadr, pełna czytelność marki i CTA    |
| 0.20–0.42 | recognition | niewielkie zbliżenie i rozpoznanie hierarchii systemu |
| 0.42–0.66 | approach    | wejście głębiej bez agresywnego zoomu                 |
| 0.66–0.86 | opening     | odsłonięcie relacji, światła i przestrzeni            |
|    0.86–1 | handoff     | otwarty kadr przygotowany na kolejny rozdział strony  |

Hero startuje przy `structureProgress = 0.86` i kończy na pełnej strukturze. Nie zużywa pełnej sekwencji Chaos → Structure przeznaczonej dla dalszej narracji problemowej.

## 10. Choreografia kamery

`src/lib/experience/camera-path.ts` jest jedynym źródłem pięciu keyframes Hero. Każdy opisuje `position`, `target`, `fov`, minimalny `roll` i semantic shot. Istnieją osobne ścieżki `wide` oraz `compact`; obie mają tę samą narrację, ale inne kadrowanie.

Kamera korzysta z smoothstep pomiędzy klatkami oraz tłumienia niezależnego od FPS. FOV zmienia się w wąskim zakresie 44→39 na wide i 51→49 na compact. Roll nie przekracza 0,01 rad w Hero. Pointer dodaje tylko ograniczoną korektę położenia i jest wyłączony na touch, Low i reduced motion.

## 11. Motion DOM

Treść jest w finalnym położeniu od pierwszego renderu. Dopiero przy końcowym zakresie, od około 70% progresu, copy przesuwa się maksymalnie o 12 px i traci nie więcej niż 12% opacity; CTA nie mniej niż 82%, a competence strip nie mniej niż 72%. Scroll cue wygasa w pierwszych 20%.

Nie ma autoplay, animacji liter, ukrywania treści do `ready=true` ani biblioteki timeline. W reduced motion wszystkie transformacje i zmiany opacity są wyłączone.

## 12. Integracja WebGL

Na publicznej stronie `HomeStory` używa `ExperienceCanvas` z `layout="story"` i `sequence="homepage"`. Pierwszy zakres tej sekwencji wyprowadza pięć klatek bezpośrednio z zatwierdzonego camera path Hero. Ciężki `ExperienceRenderer` jest importowany dynamicznie z wyłączonym SSR i montowany przez `IntersectionObserver`. Conversion Landscape używa tej samej geometrii, materiałów, quality tiers, sceny i pętli R3F co laboratorium; Hero i rozdział Problem → Diagnosis mają jeden canvas, CameraRig i progress store.

Izolowany tryb `layout="hero"` oraz `sequence="hero"` pozostaje w `/experience-lab` do deterministycznego audytu samego wejścia. Nie jest drugim publicznym Hero.

Pierwszy render zawiera CSS fallback i całe copy. Po gotowości renderer pojawia się przez krótką zmianę opacity, bez zmiany wymiarów i bez czarnego flasha.

## 13. Competence signal

Lista `Strony / Shoper / E-commerce / Allegro / UX/UI / Produkt` komunikuje rzeczywiste obszary kompetencji bez liczb, nagród, opinii i niepotwierdzonych wyników. Jest zwykłą listą semantyczną; separatory są dekoracyjne. Na niskim viewporcie może zostać ukryta, ponieważ nie zawiera informacji koniecznej do zrozumienia oferty.

## 14. Handoff

Po Hero pojawia się finalny Problem Intro z nagłówkiem:

> Technicznie działa. Ale czy pomaga sprzedawać?

Kamera kończy cinematic entry w otwartym kadrze, po czym ten sam centralny path przechodzi do bardziej analitycznego ruchu. Sekcja DOM kontynuuje problem bez gwałtownego resetu sceny ani `display: none`. Pełny kontrakt rozdziału opisuje `HOMEPAGE_PROBLEM_DIAGNOSIS.md`.

## 15. Fallback

Fallback CSS wykorzystuje te same semantyczne tokeny experience, statyczny grid, powierzchnie, sygnały i Focus Object. Jest widoczny w SSR, bez JavaScriptu, przed inicjalizacją WebGL, po błędzie subtree albo utracie kontekstu. Nie udaje błędu technicznego i nie zmienia wysokości Hero.

## 16. Reduced motion

Hero zatrzymuje się na dedykowanym progresie `0.70`: jest to stabilny kadr opening z czytelną dominantą i uporządkowanym systemem. Camera travel, pointer influence, signal flow oraz motion DOM są wyłączone. Canvas działa na żądanie, a brak WebGL nadal pokazuje równoważną kompozycję CSS.

## 17. Dostępność

- tylko jeden `h1` na homepage i istnieje on w SSR HTML,
- CTA są prawdziwymi linkami z widocznym `focus-visible`,
- canvas ma `aria-hidden`, `tabIndex={-1}` i `pointer-events: none`,
- scroll cue jest dekoracyjny i nie stanowi instrukcji koniecznej do obsługi,
- treść oraz kolejność fokusu nie zależą od WebGL,
- header, skip link, menu i stopka pozostają ponad oraz poza granicą experience,
- reduced motion nie ukrywa informacji.

## 18. Reguły wydajności

- DOM Hero renderuje się serwerowo i jest kandydatem LCP niezależnym od Three.js,
- track rezerwuje rozmiar przed hydratacją, więc inicjalizacja canvasu nie powoduje CLS,
- ciężki renderer jest osobnym dynamicznym chunkiem,
- pointer nie zapisuje React state,
- scroll używa jednego RAF tylko do koaleskowania pomiaru,
- R3F zarządza jedyną pętlą renderowania,
- Hero nie dodaje geometrii, tekstur, materiałów, cieni ani postprocessingu do budżetu Conversion Landscape,
- quality tier ogranicza DPR i szczegółowość przed utworzeniem renderera.

Aktualny build utrzymuje koszt samej granicy `ExperienceCanvas` na około 14.1 kB raw / 4.6 kB gzip; renderer i Three.js pozostają dynamiczne. Szczegóły i ograniczenia pomiaru zapisuje `WEBGL_PERFORMANCE.md`.

## 19. Zasady przyszłych zmian

1. H1, lead i CTA zawsze pozostają w DOM i nie czekają na WebGL.
2. Headline albo CTA zmieniamy w modelu treści i centralnym systemie CTA, nie w JSX.
3. DOM i WebGL korzystają z jednego semantic progress; różne krzywe są dozwolone, drugie źródło progresu nie.
4. Kamera ma jedno źródło keyframes. Nie dodajemy korekt choreografii w komponentach sceny.
5. Mobile może mieć osobny path i kompozycję, ale nie osobny Hero ani zdublowany H1.
6. Nowy efekt musi mieć funkcję narracyjną, budżet High/Medium/Low, reduced motion i fallback.
7. Nie zwiększamy długości tracku bez wykazania korzyści dla zrozumienia.
8. Header, dropdown i menu mobilne zawsze pozostają nad experience layer.
9. Nie publikujemy fikcyjnych proof metrics.
10. Po zmianie sprawdzamy `/`, tryb Hero w `/experience-lab`, wymagane viewporty, kontrast, overflow oraz komplet kontroli projektu.
