# Fotografie do editorial showcase

> Historical document. The complete sneaker/perfume offer collections supersede this earlier heterogeneous showcase. See [OFFER_CAROUSEL_IMPLEMENTATION.md](OFFER_CAROUSEL_IMPLEMENTATION.md) for the current implementation.

Stan 2026-10-11: **brakuje wszystkich ośmiu dedykowanych zdjęć**. W aktualnym projekcie i nowych katalogach roboczych nie znaleziono odpowiedniego `watch-detail`/makro. Dostępne 15 WebP pozostaje bez zmian. Nie generowano zdjęć ani rzekomych projektów klientów.

Karuzela jest gotowa technicznie. W lokalnym podglądzie i stagingu wykorzystuje jawnie opisane packshoty do sprawdzenia geometrii; nie przedstawia ich jako makro, ciemnego światła reklamowego czy fotografii atmosferycznej. W kontekście `production` oraz przy włączonym indeksowaniu podglądy są wykluczone. Przy mniej niż trzech rzeczywistych ujęciach pozostaje zatwierdzona statyczna galeria; pełną prezentację ośmiu możliwości umożliwi komplet poniższych fotografii.

## Wspólna specyfikacja

- Katalog docelowy: `public/media/showcase/`. Nazwy poniżej są specyfikacją, **nie istniejącymi plikami**. Katalog zawiera wyłącznie README do czasu dostarczenia zdjęć.
- Zalecany master web: **3000 × 2000 px, 3:2**, sRGB, WebP wysokiej jakości (lub po uzgodnieniu inny obsługiwany format). Bez upscalingu, znaku wodnego, tekstu UI i metadanych lokalizacji.
- Desktop pokazuje cały kadr 3:2. Tablet ma ramę 4:3. Mobile ma ramę 4:5: przy `object-fit: cover` widoczne jest około 53% szerokości poziomego mastera. Istotny detal powinien mieścić się w centralnych **45% szerokości**. Pozycję cropu można dostroić osobno dla mobile i desktop.
- W zbliżeniu wolno świadomie wyjść poza cały kontur przedmiotu. Nie wolno ucinać istotnego detalu przypadkowo ani zmieniać tożsamości produktu. Gdy centralne 45% nie wystarcza, potrzebna jest nowa kompozycja mastera, nie deformacja obrazu.
- Zdjęcia powinny wypełniać kadr prawdziwym tłem fotograficznym. Preferowane tła kryjące; przezroczystość nie jest wymagana. Nie stosujemy blend modes ani filtrów CSS, aby symulować inne oświetlenie.
- Osiem fotografii ma mieć różne cele. Nie dostarczaj ponownie ośmiu izolowanych packshotów na białym tle.

## Brakujące materiały

| Plik                       | Kompozycja i pozycja obiektu                                                                                                                                                               | Format           | Światło i tło                                                                                                      | Kadr mobilny                                                                                                                   | Wierność                                                                                                                 |
| -------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------- | ------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------ |
| `watch-macro.webp`         | Rzeczywiste makro tarczy chronografu: centralnie fragment wskazówek, indeksów i przejście do szczotkowanej stali. Koperta wychodzi świadomie poza brzegi; nie pełny zegarek na białym tle. | 3:2, 3000 × 2000 | Wąskie światło boczne z lewej/góry; kontrolowany kontur metalu, ciemne neutralne otoczenie.                        | Oś wskazówek i wybrany indeks w centralnych 45%; muszą pozostać czytelne w 4:5.                                                | Prawdziwe napisy, położenie wskazówek, liczba indeksów, ryflowanie i szczotkowanie. Bez odtwarzania tarczy generatywnie. |
| `serum-glass.webp`         | Bliski kadr szyjki i pipety z widoczną cieczą lub kroplą; światło przechodzi przez prawdziwe szkło. Pipeta przebiega blisko osi środka.                                                    | 3:2, 3000 × 2000 | Miękki kontur z tyłu/prawej, jasne neutralne tło; kontrolowane odbicia.                                            | Pipeta i kluczowe załamanie światła w centralnych 45%; nie kadrować samego pustego tła.                                        | Zachowane szkło, objętość cieczy, oznaczenia, geometria pipety i fizycznie wiarygodna kropla.                            |
| `headphones-light.webp`    | Słuchawki w kadrze reklamowym: łuk pałąka i jedna lub obie muszle budują rzeźbiarską bryłę. Najważniejsza krzywizna w centrum.                                                             | 3:2, 3000 × 2000 | Wąskie światło boczne/lewy tył, delikatne wypełnienie; tło grafitowe/oliwkowo-czarne.                              | Muszla i połączenie z pałąkiem czytelne przy cropie 4:5; świadome zbliżenie, nie przypadkowe ucięcie.                          | Prawdziwe przeguby, miękkość padów, mat i połysk; bez sztucznych konturów lub zmian konstrukcji.                         |
| `leather-texture.webp`     | Makro skóry, szwu, wykończenia krawędzi i fragmentu okucia torby; szew prowadzi przez środek kadru.                                                                                        | 3:2, 3000 × 2000 | Niskie boczne światło z lewej pokazujące ziarno; skóra wypełnia większość tła, reszta ciepła neutralna.            | Czytelne ziarno i co najmniej kilka prawdziwych ściegów w centrum 4:5.                                                         | Zachować faktyczny wzór skóry, odstępy szwu, krawędź, barwę i oznaczenia okucia. Nie tworzyć fikcyjnej faktury.          |
| `olive-oil-editorial.webp` | Oliwa w kontekście spożywczym: butelka blisko osi, niewielkie naczynie z oliwą niżej; kamień lub drewno stanowią realny plan kompozycji.                                                   | 3:2, 3000 × 2000 | Naturalne światło z lewego boku, neutralne cienie; autentyczny materiał tła.                                       | Butelka/etykieta i próbka koloru oliwy mieszczą się w centralnych 45%, rekwizyty poboczne mogą wyjść poza kadr.                | Barwa płynu zgodna z produktem, czytelna prawdziwa etykieta, prawidłowa refrakcja szkła. Bez wymyślonych oznaczeń.       |
| `candle-atmosphere.webp`   | Naczynie świecy w ciepłej, spokojnej scenie reklamowej; centrum szkła z widocznym woskiem, ewentualnie rzeczywisty płomień.                                                                | 3:2, 3000 × 2000 | Ciepłe boczne światło/punkt praktyczny, miękki cień; ciemne neutralne tło.                                         | Naczynie i główne odbicie mieszczą się w centralnych 45%; płomień nie może zostać przypadkowo obcięty.                         | Zachować ilość wosku, kształt naczynia, etykietę, wiarygodne odbicia i cień. Nie domalowywać efektu palenia jako faktu.  |
| `tool-detail.webp`         | Bliski kadr uchwytu/wrzeciona, pierścienia regulacji i połączenia gumy z metalem. Wybrany mechaniczny detal w środku.                                                                      | 3:2, 3000 × 2000 | Kontrolowane światło z prawej/góry, czytelne różnice materiałów; ciemne neutralne tło.                             | Wybrana funkcja i oznaczenia w centralnych 45%, pozostała bryła może świadomie wyjść poza kadr.                                | Prawdziwa konstrukcja, liczby, przyciski, śruby i geometria szczęk; bez „naprawiania” ich przez generowanie.             |
| `packaging-story.webp`     | Otwarta paczka i produkt w spójnej kompozycji; obiekty układają się po przekątnej wokół środka. Materiał wkładki/opakowania stanowi część narracji.                                        | 3:2, 3000 × 2000 | Miękkie światło z lewego przodu, wspólny naturalny cień; jasna neutralna płaszczyzna lub zatwierdzony kolor marki. | Produkt, istotna część otwartej paczki i oznaczenie mieszczą się w centralnych 45%; rekomponować zdjęcie, jeśli to niemożliwe. | Zgodne logo, typografia, materiał i proporcje opakowania. Nie sugerować współpracy z marką bez potwierdzenia.            |

## Podmiana bez zmiany komponentu

1. Dostarcz i sprawdź fotografię. Zapisz plik w katalogu i pod nazwą z tabeli.
2. W `src/content/showcase.ts` odszukaj wpis o tym samym `id`. Zamień `image: null` na rzeczywisty obiekt, np.:

   ```ts
   image: {
     src: "/media/showcase/watch-macro.webp",
     width: 3000,
     height: 2000,
     alt: "Zbliżenie tarczy chronografu, wskazówek i szczotkowanej stalowej lunety",
   },
   ```

3. Alt i podpisy muszą opisywać dostarczony obraz. Zmodyfikuj `title`, `eyebrow`, `description`, `photographicTechnique`, jeśli rzeczywiste zdjęcie ma inny cel. Zapisz `sourceReference`, jeśli dostępne są prawdziwe dane pochodzenia/praw do publikacji.
4. Dostosuj `imagePosition.desktop` i `.mobile` po obejrzeniu cropów. `backgroundTreatment` opisuje otoczenie ramy, nie nakłada gradingu na zdjęcie.
5. `isStudy` i podpisy podglądowe są wyliczane automatycznie z braku `image`. Nie usuwaj ostrzeżenia ręcznie. Nigdy nie wpisuj ścieżki do nieistniejącego pliku, żeby tylko odblokować prezentację.
6. Uruchom testy, build i osiem rozmiarów zrzutów. Sprawdź wszystkie osiem aktywnych kadrów i błędy wczytywania. Publikacja pozostaje osobną decyzją; ta zmiana nie rozwiązuje brakujących danych prywatności.

Do czasu uzupełnienia modelu użyto wyłącznie istniejących zdjęć `watch`, `serum`, `headphones`, `leather`, `olive`, `candle`, `drill`, `packaging`, bez edycji plików. Start podglądu od skóry ogranicza bezpośrednie powtórzenie zegarka z poprzedniej sekcji. Po dostarczeniu dedykowanych zdjęć domyślna kolejność zaczyna się od precyzji detalu.
