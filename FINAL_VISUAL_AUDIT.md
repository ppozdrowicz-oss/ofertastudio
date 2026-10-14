# OfertaStudio.pl — final visual audit

Audyt lokalny: 8–9 października 2026. Aplikacja: `/home/roland/ofertastudio-next/studio`.

## EXECUTIVE SUMMARY

Zachowano zatwierdzony projekt, kolejność sekcji, fonty, kolory, symbol i wordmark **OfertaStudio.pl**. Poprawki dotyczą potwierdzonych problemów kadrowania, podpisów, fokusu, wiarygodności opisu zdjęć i doboru rozdzielczości. Nie zmieniono oryginalnych fotografii ani konstrukcji suwaka.

Interfejs nadaje się do dalszego lokalnego odbioru. **NO-GO dla publikacji**: brakuje zatwierdzonych danych firmy/polityki prywatności i potwierdzenia obsługi Netlify Forms. Para sneakersa nie spełnia wymogu wiernego zachowania geometrii między źródłem a retuszem. Dokładne ograniczenia opisano poniżej. Nie wykonano push, wdrożenia ani zmian DNS.

## BASELINE

- Bezpieczny checkpoint przed korektami: `0ef57c084be7e231e7a3bb64f0012d0cf9dbe94a`.
- Gałąź robocza: `refine/final-visual-audit-2026-10-08`; źródłowe `main` nie zostało przestawione.
- Zastano zintegrowane 15 fotografii i poprawny współdzielony wordmark. Zachowano je w checkpointcie; nie nadpisano wcześniejszej pracy.
- 122 bazowe PNG: `qa/screenshots/final-audit/baseline/`. Zrzuty obejmują całą stronę, sekcje, wszystkie etapy studia, suwak 0/25/50/75/100% i cztery możliwości usługi.
- Wymiary: 375×812, 390×844, 430×932, 768×1024, 1024×900, 1280×900, 1440×1000, 1920×1080.
- Wyjściowa kompozycja hero była poprawna. Potwierdzono skok skali źródłowego flakonu, kolizję jego tła z opisem etapu, podpis na krawędzi flakonu przy 768 px oraz błędne zawijanie podpisu zegarka.
- Przeglądano rzeczywisty Chromium, pełne strony, osobne sekcje i powiększenia fotografii. Testy bazowe działały przez istniejący skrypt deweloperski na 3100; końcowe przez `next build` + `next start` na osobnym lokalnym porcie 3101.

## ISSUES IDENTIFIED

| Priorytet / miejsce          | Defekt i przyczyna                                                                                              | Najmniejsza skuteczna korekta / wynik                                                                                                          |
| ---------------------------- | --------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| P1 · studio, etap 01         | Źródłowy flakon jest mniejszy od kolejnych etapów; wspólny kwadratowy plik nie oznacza wspólnej geometrii kadru | Zmierzona jednolita skala, niewielki obrót/przesunięcie płótna w CSS. Duży skok usunięty; lokalne różnice źródła pozostają                     |
| P1 · studio, opis            | Nieprzezroczyste tło źródła wchodziło pod opis po prawej                                                        | Przycięcie pustej części tła do granicy kolumny; niewielkie przesunięcie całego płótna na średnim desktopie. Flakon pozostaje cały             |
| P1 · sneaker                 | Sznurówki, siatka i fragmenty podeszwy różnią się lokalnie                                                      | Problem plików. Nie zastosowano pozornego wyrównania; potrzebna spójna para z jednego mastera                                                  |
| P1 · wiarygodność            | „Wybrane realizacje” mogło sugerować zlecenia od widocznych marek                                               | „Prezentacje pokazowe” oraz informacja, że widoczne marki nie oznaczają współpracy                                                             |
| P1 · kontakt / publikacja    | Brak zatwierdzonego administratora i finalnej polityki; Netlify delivery niepotwierdzone                        | Zachowany uczciwy tryb podglądu, formularz domyślnie wyłączony. Blokada publikacji pozostaje                                                   |
| P2 · hero 768 px             | Pionowy podpis stykał się z prawą krawędzią flakonu                                                             | Zmiana wyłącznie odstępu podpisu od prawej krawędzi, bez ruchu produktu i nagłówka                                                             |
| P2 · zegarek, mobile         | Selektor `:last-child` ograniczał szerokość jedynego podpisu; linia podpisu dochodziła do zdjęcia               | Selektor dla drugiego sąsiadującego podpisu. Jedyny podpis ma naturalną szerokość i prawidłowe wyrównanie                                      |
| P2 · możliwości / klawiatura | Globalny offset obrysu fokusu zachodził na opis rozwiniętej usługi                                              | Lokalny offset 2 px na przycisku akordeonu                                                                                                     |
| P2 · studio 03–05            | Etapy, zwłaszcza 04/05, wizualnie podobne                                                                       | Potwierdzono różne pliki i brak filtrów dla fotografii. Pozostawiono rzeczywiste różnice; silniejszy efekt wymaga prawdziwych eksportów etapów |
| P2 · obrazy / sieć           | Hero i finał studia pobierały dwa warianty tego samego zdjęcia na desktopie                                     | Wspólne `sizes`; jeden wariant finału. Pozostałe etapy otrzymują odpowiednią ostrość, bez obniżania quality                                    |

Nie znaleziono P0 w wykonanym zakresie testów. Nie jest to gwarancja braku problemów na niebadanych urządzeniach.

## CORRECTIONS IMPLEMENTED

1. **Rejestracja źródła perfum:** `media.perfumeSource.registration` przechowuje transformację podobieństwa. `ProductImage` przekazuje ją przez zmienną CSS. Płótno studia ma jawne kwadratowe wymiary, aby procentowe przesunięcia były niezależne od proporcji sekcji. Nie ma deformacji perspektywy, filtrów jasności ani modyfikacji oryginału.
2. **Czytelny opis:** wspólne zmienne określają szerokość opisu i pozycję obrazu; przycięcie dotyczy wyłącznie kontekstu źródła. Sprawdzone osobno przy 768/1024/1280/1920 px i w stanach 01/05, po zakończeniu przejścia.
3. **Trzy lokalne poprawki CSS:** podpis hero na tablecie, selektor podpisu zegarka, offset fokusu akordeonu.
4. **Uczciwe opisy:** centralna etykieta prezentacji pokazowych i informacja o markach. Bez fikcyjnych klientów, wyników, opinii lub danych firmy.
5. **Spójne warianty Next Image:** finalny flakon współdzieli kandydat obrazu pomiędzy hero, studiem i capability. Nie dodano bibliotek runtime.

Iteracja 1 rozwiązała problemy kadru i podpisów. Podczas porównania odrzucono wariant automatycznych wymiarów, który zmniejszał produkt w studiu, oraz obrys fokusu przecinający numer usługi. Iteracja 2 przywróciła zatwierdzoną skalę przez kwadratowe płótno i właściwy obrys. Trzeci etap był weryfikacją i dokumentacją; nie dodawano zmian dla samego „polerowania”.

## PERFUME SEQUENCE

Wszystkie pięć plików ma 3200×3200 px, różne sumy SHA-256 i poprawne przypisanie etapów. Źródło jest nieprzezroczyste; cztery kolejne pliki mają kanał alfa. Żaden rzeczywisty etap nie korzysta z filtrów CSS dla dawnych makiet.

Analiza `scripts/audit-photography.py`: SIFT, dopasowanie Lowe 0,7, RANSAC z progiem 4 px, płótno analityczne 1300×1300. Estymowana transformacja źródło→finał: skala **1,169046**, obrót **0,2176°**, przesunięcie względem środka **+0,1801% / −0,9324%**. 64/88 dopasowań to inliery; mediana reszt dla wszystkich dopasowań 2,41 px, percentyl 90: 7,83 px. Estymacja dotyczy dopasowanych cech, nie jest pomiarem całej sylwetki ani certyfikatem identyczności produktu.

| Para              | Średnia bezwzględna różnica RGB na wspólnych nieprzezroczystych pikselach (0–255) | SSIM RGB przy 800 px |
| ----------------- | --------------------------------------------------------------------------------: | -------------------: |
| Izolacja → retusz |                                                                             11,31 |                0,905 |
| Retusz → światło  |                                                                             15,15 |                0,877 |
| Światło → finał   |                                                                              9,51 |                0,938 |

04/05 są szczególnie podobne, ale nie są duplikatami. Widoczne są rzeczywiste różnice refleksów i opracowania szkła; przejście 650 ms ich nie ukrywa po ustaleniu stanu. Nie dodano sztucznego kontrastu, wad ani „retuszu” filtrami. Drobne różnice krawędzi zakrętki i podstawy pozostają materiałowym ograniczeniem ścisłego geometry lock. Lepszy komplet powinien pochodzić z tego samego mastera.

Przetestowano pięć przycisków, Enter, stan `aria-pressed`, zachowanie fokusu, szybkie przełączanie, natywny scroll i sterowanie mobilne. Reduced motion pozostawia nieprzyklejoną sekcję z przyciskami. Skala końcowego produktu przy 390 px jest zgodna pikselowo z bazą; przy 1440 px zmiana dotyczy praktycznie wyłącznie lepszego wariantu rozdzielczości.

## SNEAKER COMPARISON

Oba oryginały mają 2600×2600 px. Warstwy DOM mają identyczne położenie i rozmiar również po zmianie viewportu. Brak błędu rozciągania po stronie komponentu.

Analiza fotograficzna znalazła 102 dopasowania, z czego tylko 43 spójne z transformacją podobieństwa. Najlepsza estymata: skala 1,02786, obrót −0,6285°, przesunięcie −30,81/−10,81 px przy 1300 px. Mediana reszt 4,69 px, percentyl 90 aż 37,83 px. Oględziny pięty, oczek/sznurówek, siatki i noska potwierdziły lokalne rozbieżności. Nie da się uznać ich za pojedynczy błąd pozycji lub skali. Analiza nie ustala pochodzenia/generatywności plików.

**Nie zastosowano tej transformacji.** Poprawiłaby wybrane cechy kosztem innych. Wymagana jest nowa para eksportów tego samego produktu i kadru, z identycznymi sznurówkami, konturem podeszwy, noskiem i perspektywą. Interakcja działa, ale obecne zdjęcia nie dowodzą wiernej obróbki tego samego ujęcia.

Sprawdzono 0/25/50/75/100%, strzałki/Home/End, przeciąganie myszą, zwolnienie wskaźnika, dotyk przez CDP, pionowe przewijanie i zmianę rozmiaru. Zachowano komponent, maskę i uchwyt. Nie retuszowano zdjęć.

## PORTFOLIO

Obejrzano perfumy, sneaker, zegarek, serum, słuchawki, torebkę, oliwę, świecę, narzędzie i zestaw opakowań we właściwych kompozycjach. Całe istotne kontury pozostają widoczne. Kategorie, asymetria, numeracja i skala różnicują produkty; narzędzie jest jednym z dziesięciu światów.

Białe tła dostarczonych zdjęć są nieprzezroczyste. Zostawiono je jako fotograficzne ramy, w tym mocny kontrast zegarka z ciemną oliwką. Bez blend modes, wycinania metalicznych refleksów ani odtwarzania tarczy. Serum/słuchawki i mała półka produktowa zachowują poprzednią kompozycję. Powtórzenia perfum (produkt → proces → Premium) i zegarka (precyzja → Detal) mają funkcję demonstracyjną; nie zastąpiono ich słabszymi zdjęciami wyłącznie dla odmiany.

## MOBILE

Wszystkie osiem wymaganych szerokości sprawdzono w Chromium; 375/390/430/768 px dodatkowo oceniono wizualnie jako osobne kompozycje. Brak poziomego overflow i błędów ładowania fotografii w testowanych widokach. Zachowano mocne nagłówki, pełną geometrię produktów, mobilne menu i czytelny formularz. Przyciski etapów pozostają dostępne bez polegania na sticky scroll.

Tablet otrzymał tylko korektę podpisu hero i ochronę kolumny opisu studia. Mobilny zegarek ma teraz poprawny jednoliniowy podpis. Nie zmieniono rodzin fontów, systemu nagłówków, CTA ani długości hero. Nie wykonano testów na fizycznych iPhone/Android ani w Safari/Firefox — pozostaje to ograniczeniem zakresu.

## ACCESSIBILITY

- Jeden `h1`, poprawne landmarki, unikalne identyfikatory i 16 poprawnych celów kotwic.
- Dokładny wordmark w headerze, menu i footerze; etykiety dostępności zachowane.
- Klawiaturowe sterowanie suwakiem, studiem i akordeonem; widoczny fokus. Menu utrzymuje fokus, zamyka się Escape i zwraca go do wyzwalacza.
- Formularz wiąże błędy z polami, ustawia fokus na pierwszym błędzie i zachowuje dane po błędzie. Testowane pending/error/retry/success są mockowane; żadne rzeczywiste zapytanie nie zostało wysłane.
- Axe z tagami WCAG 2 A/AA, 2.1 AA i 2.2 AA: zero automatycznych naruszeń w wykonanych stanach desktop/mobile. Nierozstrzygnięte automatycznie kontrole kontrastu na fotografiach/gradientach wymagają oceny wzrokowej; nie są dowodem pełnej certyfikacji.
- Sprawdzono także nierozstrzygnięte `aria-controls` mobilnego menu: wskazywany `dialog#mobile-menu` istnieje w DOM; test otwarcia, zamknięcia i nawigacji przechodzi. Nie usuwano poprawnej relacji tylko po to, aby wyciszyć wynik „incomplete”.
- Reduced motion usuwa sticky i animowane przejścia zgodnie z istniejącą implementacją.

## PERFORMANCE

Pomiar lokalnego buildu produkcyjnego: trzy świeże konteksty Chromium na profil, DPR 1, wyłączony cache przeglądarki. Cache optymalizatora obrazów na wspólnym serwerze może być rozgrzany. Desktop 1440×1000 bez ograniczeń sieci. Mobile 390×844: CPU ×4, 1,6 Mbps down / 0,75 Mbps up, opóźnienie 150 ms. To pomiary laboratoryjne localhost, nie dane użytkowników produkcyjnych.

| Profil             | LCP — trzy próbki     | CLS — największa próbka | Najdłuższy z badanych EventTiming | Transfer zasobów przed interakcją |
| ------------------ | --------------------- | ----------------------: | --------------------------------: | --------------------------------: |
| Desktop lokalny    | 400 / 468 / 544 ms    |                0,000523 |                            160 ms |                         646 864 B |
| Mobile ograniczony | 1004 / 1040 / 1116 ms |                0,000146 |                            112 ms |                         396 851 B |

Mediany LCP: 468 ms / 1040 ms. Sumy transferu dotyczą wpisów Resource Timing, bez głównego dokumentu i bez pełnego przewinięcia portfolio. Surowe próbki: `current/performance-desktop.json` i `current/performance-mobile.json`.

W potwierdzonym przebiegu po zmianie `sizes` hero/studio pobierają jeden finalny wariant: 1080 px / 35 033 B desktop oraz 640 px / 17 257 B mobile (encoded body). Usunięto dodatkowy wariant finału 750 px / 22 295 B na desktopie. Pozostałe etapy otrzymują większe warianty: całkowity transfer startowy nie musi maleć. Zachowano `quality=90`; nie poprawiano wyniku kosztem szkła i mikrodetali.

Produkcyjny HTML w zwykłym trybie podglądu: 61 837 B; 9 początkowych plików JS, 192 158 B gzip łącznie. Są to rozmiary lokalnych plików, nie raport field CWV. Nie dodano bibliotek animacji, analityki, CMS ani zewnętrznych fontów. LCP/CLS dotyczą wyłącznie opisanych prób. Najdłuższe próbki EventTiming nie są pomiarem rzeczywistego INP; nie deklarujemy spełnienia field INP.

## VISUAL REGRESSION

- Porównano 122 odpowiadające sobie PNG. 111 par miało identyczne wymiary; pozostałe różniły się wysokością pełnej strony po dodaniu uczciwego opisu portfolio albo zaokrągleniem 1 px przy ułamkowych pozycjach sekcji.
- Przy progu różnicy kanału >8/255 zmieniło się tylko 0,049–0,348% pikseli hero w zależności od szerokości: etykieta demonstracyjna i podpis tabletowy. Kompozycja i nagłówek pozostały bez zmian.
- Końcowy etap studia: 0% różnicy przy 390 px, 0,157% przy 1440 px. Rejestracja źródła jest zamierzoną większą zmianą; porównano zakrętkę, szkło, podstawę i opis.
- Mobilny zegarek: ok. 0,68% pikseli zmienionych przy 390 px — poprawiony podpis i separator. Zdjęcie nie zmieniło rozmiaru ani pozycji.
- Pary redakcyjne przy 375/390/430/1440/1920 px i stopki przy 375/390/430/768/1440/1920 px są zgodne pikselowo.
- Ogólne zrzuty sticky mogą uchwycić środek przejścia; decydujące są nazwane `stage-button-*` i `studio-stage-*`, przechwycone po osiągnięciu opacity 1. Nie traktowano różnic między chwilowymi stanami jako regresji.
- Pełnostronicowy capture Chromium potrafi pokazać ukryty poza viewportem link „Przejdź do treści” na wysokości aktualnego scrolla. To wymaga odróżnienia od obrazu normalnego viewportu; nie zmieniano mechanizmu dostępności na podstawie tego artefaktu.

Dowody lokalne (celowo poza Git): `baseline/`, `current/`, `iteration-1/`, `regression/`, `regression-summary.json`, `registration-metrics.json`, `asset-metrics.json` w `qa/screenshots/final-audit/`. Sumy SHA-256 wszystkich 15 oryginałów porównano z `original-asset-hashes.json`: **zero zmian**.

## QA

| Wykonane polecenie                                                                                                   | Wynik                                                                                                      |
| -------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| `npm ci`                                                                                                             | Poprawna instalacja zależności z lockfile; bez globalnych aktualizacji                                     |
| `npm run check`                                                                                                      | PASS: lint bez ostrzeżeń, strict typecheck, 17/17 testów logicznych/DOM, produkcyjny build                 |
| `npm run test:e2e`                                                                                                   | Baza: 17/17 testów Chromium, osiem szerokości                                                              |
| `npm run test:e2e -- --config=playwright.production.config.ts`                                                       | PASS: końcowe 20/20 testów w 3,4 min; bez wyjątków/hydration errors/błędów konsoli w sprawdzonych widokach |
| `npm run test:e2e -- --config=playwright.production.config.ts tests/audit.spec.ts --grep 'registered studio canvas'` | PASS: dodatkowy test 768/1024/1280/1920 px, oba skrajne etapy, kwadratowe płótno, brak filtrów             |
| `npm run test:build`                                                                                                 | PASS: 17 instancji obrazów, poprawne pliki, 16 kotwic, wordmarki, metadata, jedna główna treść, noindex    |
| `python3 scripts/audit-photography.py`                                                                               | Wygenerowano metryki, nakładki i szczegóły rejestracji; oryginały nietknięte                               |
| Lokalny skrypt Python/Pillow/NumPy porównujący `baseline/*.png` z `current/*.png`                                    | 122 pary; wyniki w `regression-summary.json`, porównania obok siebie w `regression/`                       |
| `npm audit --omit=dev`                                                                                               | Zero zgłoszonych podatności produkcyjnych                                                                  |

`npm run format:check` i `git diff --check` również zakończyły się poprawnie.

Pierwszy wariant konfiguracji testów produkcyjnych odziedziczył drugi webServer i kolidował na porcie 3100. Naprawiono konfigurację: pojedynczy serwer na 3101, bez ponownego użycia starego procesu. Odnotowano także przejściowy problem brakujących plików zależności oraz ograniczenia rozwiązywania DNS; ponowna instalacja/powtórzenie polecenia zakończyły się poprawnie. Żaden test nie został wyłączony w celu uzyskania zielonego wyniku. Testy laboratoryjne są celowo uruchamiane tylko na buildzie produkcyjnym.

Po testach przeglądarkowych ponownie wykonano zwykły `npm run check` i `npm run test:build`: końcowy build wrócił do domyślnej konfiguracji podglądu z nieaktywnym formularzem i `noindex, nofollow`. Serwer testów produkcyjnych kończy pracę wraz z testami.

## REMAINING ISSUES

1. **P1 / zdjęcia:** dostarczyć spójną parę sneaker-before/after z jednego mastera. Nie potwierdzamy wierności obecnego porównania.
2. **P1 / publikacja:** rzeczywiste dane firmy/administratora, kontakt i zatwierdzona polityka prywatności nadal nie są dostępne. Nie uzupełniano ich fikcją.
3. **P1 / dostarczenie zapytania:** rejestracja i faktyczne odebranie formularza w istniejącym Netlify niezweryfikowane. Testy mockowane nie są potwierdzeniem wysyłki.
4. **P2 / materiał:** pozostałe lokalne różnice geometrii flakonu oraz subtelne 04/05. Dla bezwzględnego geometry lock potrzebne eksporty rzeczywistych etapów z jednego mastera.
5. **Zakres QA:** tylko Chromium i emulowany dotyk. Uzupełnić fizyczne iOS/Android, Safari/Firefox oraz pomiary hostowanego środowiska w późniejszym zadaniu.
6. **Zależności developerskie:** pięć zgłoszeń związanych z upstream `braces` w łańcuchu lintowania, opisanych w historycznym `QA.md`. Nie wykonywano ryzykownego automatycznego downgrade'u frameworkowego presetu.

## PRODUCTION READINESS

**NO-GO dla publicznego wydania w obecnym stanie.** Implementacja i zatwierdzony kierunek wizualny są zachowane, lecz uczciwość porównania fotograficznego oraz dane prawne i działanie formularza wymagają domknięcia. Najnowszy zakres zadania dodatkowo zabrania wdrożenia. Formularz i indeksowanie pozostają domyślnie wyłączone; nie ma fikcyjnej finalnej polityki.

Nie zmieniono repozytorium produkcyjnego, Netlify, domeny ani DNS. Osobny checkout migracyjny `release-20261008` pozostał czysty na historycznym `main` `616591f04a257f567359d02c50e631a3a9bca851`. Ten audyt nie stanowi ponownej weryfikacji live ani autoryzacji publikacji.

## FILES CHANGED

- `src/app/globals.css` — rejestracja i przycięcie kontekstu studia, trzy lokalne poprawki responsywne/fokusu.
- `src/content/media.ts`, `src/components/ProductImage.tsx`, `src/components/experiences/StudioSequence.tsx` — zmierzona rejestracja i współdzielone warianty obrazów.
- `src/content/site.ts`, `src/components/sections/Hero.tsx`, `src/components/sections/Portfolio.tsx` — uczciwe etykiety prezentacji.
- `tests/audit.spec.ts`, `tests/performance.spec.ts`, `tests/qa-paths.ts`, `tests/visual.spec.ts`, `tests/interaction.spec.ts` — stany, klawiatura, osiem szerokości, konsola, pomiary i lokalizacja dowodów.
- `playwright.production.config.ts`, `package.json` — odseparowany lokalny test buildu produkcyjnego.
- `scripts/audit-photography.py` — analiza oryginałów tylko do odczytu.
- `README.md`, `ASSETS.md`, `QA.md`, `RELEASE.md`, `FINAL_VISUAL_AUDIT.md` — dokumentacja obecnego zakresu i ograniczeń.

## GIT STATUS

Gałąź: `refine/final-visual-audit-2026-10-08`.

- Bazowy checkpoint: `0ef57c084be7e231e7a3bb64f0012d0cf9dbe94a`.
- Sprawdzony commit aplikacji i testów: **`ded73c71bb592056fea4d7f56f80675a1c1bdb42`**, `refine: align perfume canvas and validate approved visual experience`.
- Lokalny commit dokumentacyjny zawierający ten raport następuje po nim; nie zmienia kodu ani zdjęć. Jego identyfikator wskazuje `git log -1 --format=%H`.
- Stan po zapisaniu dokumentacji: czysty working tree; zrzuty, raport Playwright i build pozostają ignorowanymi artefaktami lokalnymi.
- Produkcyjne `main`, osobny checkout migracyjny i zdalne repozytorium pozostały nietknięte. Nie przepisano historii i niczego nie wypchnięto.
