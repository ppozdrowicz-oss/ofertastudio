# OfertaStudio.pl — prywatność i gotowość do stagingu

Data: 2026-10-14. Projekt: `/home/roland/ofertastudio-next/studio`.
Punkt wyjścia: `03bd44ef9dc33aab4138e022647627dcbbe51b2c`, gałąź `feature/complete-offer-collections-2026-10-11`, czyste drzewo robocze.

## Executive summary

Zaimplementowano polską politykę prywatności na `/prywatnosc`, potwierdzoną tożsamość administratora i informację przed wysłaniem formularza. Zachowano projekt strony, fotografie i mechanizm formularza. Nie dodano zgody marketingowej, checkboxa RODO, analityki ani banera cookies.

**Dokument jest projektem do zatwierdzenia przez administratora, nie opinią prawną ani certyfikatem zgodności.** `privacyNotice.approved` pozostaje `false`; techniczna realizacja zadania nie oznacza zgody na uruchomienie zapytań klientów. Nie zatwierdzono retencji. Bieżącego kandydata nie wdrożono ani nie wysłano do GitHub.

| Bramka                     | Wynik     | Znaczenie                                                                                                                           |
| -------------------------- | --------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| Prywatność — implementacja | **PASS**  | Potwierdzone dane, 14 sekcji i notice zgodne z audytem; nierozstrzygnięte decyzje jawnie opisane. Nie jest to zatwierdzenie prawne. |
| Engineering                | **PASS**  | 30/30 unit/DOM, 40/40 browser, lint, typecheck, build, test:build i format; osiem szerokości.                                       |
| Produkcja                  | **NO-GO** | Brak akceptacji całej polityki/retencji, aktualnego stagingu, dowodu odbioru i Gmail oraz zgody na wydanie.                         |

Lokalny kandydat jest przygotowany do osobno autoryzowanego stagingu z danymi syntetycznymi. Poprzednie raporty zachowują wyniki historyczne; ten dokument aktualizuje ustalenia dotyczące administratora, powiadomień i prywatności.

## Verified controller

**DECLARED — potwierdzone przez właściciela:** Piotr Pozdrowicz, osoba fizyczna prowadząca OfertaStudio.pl, kontakt `pozdrowicz@gmail.com`.

Administrator jest osobą, nie adresem e-mail. Publiczny dokument używa dokładnego zatwierdzonego zdania identyfikacyjnego i działającego `mailto:`. Nie dopisano firmy, siedziby, adresu pocztowego, NIP, REGON, KRS ani IOD. Właściciel/prawnik powinien sprawdzić dodatkowe obowiązki identyfikacyjne i informacyjne dotyczące faktycznego oferowania usług, w tym ewentualny adres do doręczeń. Brak takich danych nie został zastąpiony fikcją.

Znaczenie statusów w tym raporcie:

- **CONFIRMED:** kod, lokalny runtime, wskazany odczyt API lub dokumentacja dostawcy; zakres dowodu podano przy ustaleniu.
- **DECLARED:** informacja właściciela, bez dodatkowego uwierzytelniania tożsamości.
- **UNVERIFIED:** brak dowodu dotyczącego danego konta lub działania.
- **RECOMMENDED:** proponowana procedura wymagająca decyzji, nie istniejący mechanizm.

## Privacy page

Pliki: `src/content/privacy.ts`, `src/app/prywatnosc/page.tsx`, wyłącznie selektory `.legal-*` i informacji formularza w `src/app/globals.css`.

Serwerowa trasa `/prywatnosc` zawiera 14 sekcji: zakres dokumentu, administrator, dane, cele/podstawy, formularz, odbiorcy, transfery, retencja, prawa, dobrowolność, cookies, decyzje automatyczne, bezpieczeństwo i aktualizacje. Data opracowania: **14 października 2026**, bez fikcyjnej daty zatwierdzenia. Widoczny status projektu; informacje o faktycznym trybie formularza pochodzą z tego samego modelu co strona główna.

Dodano spis treści z poprawnymi kotwicami, wygodny skład tekstu, działające odnośniki do źródeł i powrót do kontaktu. Nagłówek/stopka i link stopki pozostały niezmienione. Zachowano canonical `/prywatnosc` i `noindex, nofollow`. Nie powstała druga trasa ani redirect.

Nie sugeruje się zgody poprzez wysłanie zapytania. Art. 6 ust. 1 lit. f dotyczy korespondencji, bezpieczeństwa i potrzebnej ochrony roszczeń; lit. b wyłącznie rzeczywiście niezbędnych działań przed umową na żądanie osoby. Kontakt przedstawiciela firmy nie jest automatycznie przypisany do lit. b. Prawa i przenoszenie opisano warunkowo. Spam nie został nazwany decyzją o skutkach z art. 22.

## Contact form

**CONFIRMED — kod, HTML i testy:**

| Pole                                         | Wymagalność i walidacja                       | Cel                                                |
| -------------------------------------------- | --------------------------------------------- | -------------------------------------------------- |
| `name` / Imię lub firma                      | wymagane, 2–120 znaków                        | zwrot do nadawcy; bez wymogu pełnego nazwiska      |
| `email` / E-mail                             | wymagane, format e-mail, HTML `maxlength=254` | odpowiedź / providerowy Reply-To                   |
| `message` / Co chcesz pokazać?               | wymagane, 10–3000 znaków                      | opis zapytania                                     |
| `productLink` / Link do produktu lub zdjęcia | opcjonalne, HTTP(S), HTML `maxlength=2000`    | kontekst; tekst URL, bez automatycznego pobierania |
| `form-name`                                  | ukryte, `product-enquiry`                     | routing Netlify                                    |
| `website`                                    | ukryty honeypot, powinien pozostać pusty      | ochrona antyspamowa                                |

Nie ma uploadu, telefonu, adresu, płatności ani wybranego pakietu. Nie dodano tych pól na podstawie oczekiwań ze starszych briefów. Treści dobrowolne i ewentualne zdjęcia w późniejszej korespondencji opisano osobno, bez twierdzenia o uploadzie na stronie.

Przy akcji wysłania widnieje dokładna informacja właściciela: „Administratorem Twoich danych osobowych jest Piotr Pozdrowicz…” z linkiem „Polityce prywatności”. Na mobile informacja poprzedza przycisk również wizualnie. Rozmiar 12 px, zachowany kontrast, bez dodatkowej zgody. Pola, endpoint, walidacja i success/error flow nie zostały przebudowane.

## Netlify Forms

**CONFIRMED — implementacja:** `public/__forms.html` jest statyczną definicją o nazwie `product-enquiry`, z `data-netlify=true`, honeypotem i identycznymi nazwami pól. AJAX POST trafia do `/__forms.html` w `application/x-www-form-urlencoded`. Jest to wzorzec wymagany przez [Netlify dla formularzy JS/SSR](https://docs.netlify.com/manage/forms/setup/). Nie wysyłamy POST do root obsługiwanego przez Next.js.

Kod rozpoznaje błąd HTTP/sieci/timeout 15 s oraz pozorny HTTP 200 zawierający sentinel statycznej definicji. Nie wyświetla wówczas sukcesu i zachowuje wiadomość. Flaga `busy` blokuje równoległe wysyłki w interfejsie. Nie ma trwałego klucza idempotencji: po timeout ponowna próba może utworzyć duplikat, jeśli provider już przyjął wcześniejsze żądanie. Należy porównywać identyfikator testu w panelu, nie zakładać deduplikacji.

**CONFIRMED — dokumentacja dostawcy:** Netlify kieruje zgłoszenia przez Akismet; honeypot jest dodatkową ochroną, reCAPTCHA nie jest używane. [Filtry spamu](https://docs.netlify.com/manage/forms/spam-filters/). To obsługa po stronie dostawcy, nie zewnętrzny skrypt przeglądarki.

**CONFIRMED — odczyt API 2026-10-14, wyłącznie GET:**

- Staging `ofertastudio-staging-20261009`, ID `2d58020a-5de9-4e4c-a18b-110ce37029be`; `ignore_html_forms=false`; zarejestrowany `product-enquiry`, ID `6ac90a851134a40008b2deb8`, zgodne pola. **Zero notification hooks.** Nie ma powiadomień z tego stagingu.
- Istniejąca produkcja `tiny-paletas-35daca`, ID `85ea6f80-1b8c-401e-a120-06c3da0bfa06`, ma aktywny hook `email` / `submission_created`, bez filtra formularza (`form_id=null`), adres zgodny z `pozdrowicz@gmail.com`. To konfiguracja poprzedniej witryny, **nie dowód dostarczenia zgłoszenia z nowego kandydata**. Nie zmieniono hooka.
- W projekcie nie ma innego webhooka/integracji przesyłającej treści zapytań. Hooki GitHub na produkcji dotyczą statusów wdrożeń, nie są śledzeniem odwiedzających.

Pole `name="email"` umożliwia Netlify ustawienie Reply-To; wymaga inspekcji rzeczywistego maila. Powiadomienia dotyczą zweryfikowanych zgłoszeń, a nie każdej pozycji Spam. [Dokumentacja powiadomień](https://docs.netlify.com/manage/forms/notifications/).

**PENDING:** nowy realny test stagingu i Gmail. Historyczny zapis z 2026-10-09 (`6ac90acb66a45471a6736750`) trafił do Spam; nie dowodzi poprawnej klasyfikacji ani doręczenia maila. W tej sesji nie wysłano żadnego rzeczywistego formularza i nie odczytywano treści klientów.

## Third-party services

| Usługa                                                   | Stan / zakres                                                 | Dowód i ograniczenie                                                        |
| -------------------------------------------------------- | ------------------------------------------------------------- | --------------------------------------------------------------------------- |
| Netlify                                                  | CONFIRMED hosting stagingu, formularz zarejestrowany          | GET API, HTTPS 200 starego stagingu; nowa wersja jeszcze lokalna            |
| Automattic / Akismet                                     | CONFIRMED filtr Netlify wg dostawcy                           | dokumentacja i lista podwykonawców; bez własnego skryptu Akismet            |
| Google / Gmail                                           | DECLARED skrzynka kontaktowa; CONFIRMED adres hooka produkcji | brak weryfikacji dostarczenia; nie potwierdzono Workspace ani firmowego DPA |
| Fonty                                                    | CONFIRMED lokalne `@fontsource-variable`                      | runtime żąda tylko własnych plików, brak Google Fonts API                   |
| Analytics, reklamy, captcha, mapy, embed, monitoring SDK | brak aktywnej integracji w aplikacji                          | źródła, zależności i czysty lokalny browser                                 |
| GitHub                                                   | kod i proces wdrażania                                        | formularz nie wysyła danych odwiedzającego do GitHub                        |

Netlify deklaruje transfery i mechanizmy w [DPA z 2026-06-09](https://www.netlify.com/pdf/netlify-dpa.pdf), a [Trust Center](https://www.netlify.com/trust-center/) wymienia Automattic/Akismet w USA oraz podwykonawców infrastruktury. Nie przepisano całej listy jako aktywnych integracji tej strony. Google opisuje DPF i warunkowe SCC w [zasadach przesyłania danych](https://policies.google.com/privacy/frameworks?hl=pl). Polityka nie zapewnia lokalizacji wyłącznie w UE ani jednakowej podstawy dla każdego transferu. **UNVERIFIED:** warunki rzeczywiście zaakceptowane dla kont, adekwatność użycia konsumenckiego Gmail w tym procesie i organizacja dalszej pracy nad materiałami; przegląd właściciela/prawny przed produkcją.

## Cookies

Kod nie używa `document.cookie`, magazynów przeglądarki, trackingu, zewnętrznych skryptów ani iframe. Zależności deweloperskie i narzędzia testowe nie są trackerami strony. Audyt czystego kontekstu Chromium produkcyjnego buildu obejmuje start strony, nawigację do polityki, wypełnienie formularza i przechwycony syntetyczny POST.

| Technologia                         | Obserwacja                                               | Klucz / czas                                                                       | Decyzja                                                 |
| ----------------------------------- | -------------------------------------------------------- | ---------------------------------------------------------------------------------- | ------------------------------------------------------- |
| Cookies / Set-Cookie                | 0 w czterech stanach, brak nagłówka ustawiającego cookie | brak; brak terminu do podania                                                      | brak banera dla tej aplikacji                           |
| localStorage / sessionStorage       | puste przed i po formularzu                              | brak                                                                               | nie utrwalamy wiadomości                                |
| IndexedDB / service workers         | brak baz / rejestracji                                   | brak                                                                               | brak dodatkowego magazynu aplikacji                     |
| Stan formularza                     | pamięć bieżącej strony                                   | do resetu/opuszczenia strony; możliwa obsługa przywracania przez samą przeglądarkę | nie deklarujemy kontroli nad autofill/cache użytkownika |
| HTTP cache / lokalne fonty i obrazy | zasoby funkcjonalne własnego serwisu                     | sterowanie przeglądarką/HTTP, nie identyfikator śledzący                           | nie zidentyfikowano opcjonalnego śledzenia              |
| Hosting i filtrowanie spamu         | poza lokalną przeglądarką                                | retencja kont niepotwierdzona                                                      | odrębne podstawy RODO, weryfikacja na stagingu          |

Końcowy pomiar: 32 żądania, wyłącznie origin lokalnej aplikacji, jeden przechwycony POST, brak błędów JS i danych syntetycznych w console. Ostateczny raport maszynowy: `qa/screenshots/privacy-readiness/current/privacy-runtime.json`.

Przegląd [art. 399 Prawa komunikacji elektronicznej](https://eli.gov.pl/api/acts/DU/2024/1221/text.html) rozróżnia zgodę na zapis/odczyt informacji od wyjątku dla transmisji lub żądanej usługi. **Wniosek implementacyjny:** nie dodawać dekoracyjnego CMP, skoro brak opcjonalnej technologii do zablokowania. Nie jest to uniwersalne zwolnienie przyszłych usług z obowiązku zgody. Pełny hosted runtime (np. wstrzykiwane ustawieniami Netlify snippet-y) trzeba ponownie skontrolować po autoryzowanym wdrożeniu.

## GDPR coverage

Przegląd oparto na [RODO w EUR-Lex](https://eur-lex.europa.eu/eli/reg/2016/679), urzędowej [kopii tekstu UE dostępnej przez legislation.gov.uk](https://www.legislation.gov.uk/eur/2016/679/pdfs/eur_20160679_2016-05-04_en.pdf) oraz informacjach UODO o [obowiązku informacyjnym](https://uodo.gov.pl/pl/493/2254), [prawach](https://uodo.gov.pl/pl/493/155) i [kryteriach przechowywania](https://uodo.gov.pl/pl/676/4260). EUR-Lex zwracał w narzędziu stronę techniczną, dlatego treść przepisów sprawdzono także w urzędowej kopii i UODO. Nie oznacza to formalnego przeglądu wszystkich zobowiązań prowadzącego działalność.

| Obowiązek przejrzystości           | Wdrożenie / nierozstrzygnięte zagadnienie                                           |
| ---------------------------------- | ----------------------------------------------------------------------------------- |
| Tożsamość i kontakt                | sekcja 2; dane właściciela, mailto; dodatkowe obowiązki informacyjne usług do oceny |
| Przedstawiciel / IOD               | nie wskazano fikcyjnej osoby; brak potwierdzenia wyznaczenia / obowiązku            |
| Kategorie danych                   | sekcja 3; faktyczne pola, dane dobrowolne i techniczne                              |
| Cele, podstawy, interesy           | sekcja 4; odrębne lit. b/f, bez domniemania zgody                                   |
| Odbiorcy                           | sekcje 5–6; Netlify, Akismet, Gmail, ograniczenia powiadomień                       |
| Transfery i dostęp do zabezpieczeń | sekcja 7; źródła DPA/Google i kontakt; warunki kont do przeglądu                    |
| Retencja lub kryteria              | sekcja 8; bez fikcji 12 miesięcy / automatycznego usuwania; procedura do decyzji    |
| Prawa / sprzeciw / zgoda / skarga  | sekcja 9; warunki stosowania, UODO i kontakt                                        |
| Dobrowolność i konsekwencje        | sekcja 10; wymagalność interfejsu nie jest ustawowym nakazem                        |
| Automatyczne decyzje               | sekcja 12; brak decyzji art. 22 w aplikacji, spam opisany odrębnie                  |
| Nowe cele                          | sekcje 1 i 14; dodatkowa informacja przed rozpoczęciem odrębnego przetwarzania      |

**Do aprobaty właściciela/prawnika:** dopasowanie podstaw i testu uzasadnionego interesu do rzeczywistego procesu, organizacja praw osób, retencja, role/umowy usługodawców, dodatkowe obowiązki usługowe. Publiczny tekst jasno wskazuje niezatwierdzone ustalenia; nie zawiera pustych pól ani wymyślonych danych.

## Retention

**PENDING / niezatwierdzone.** W repozytorium nie ma kasowania według harmonogramu. Kontrola API ustawień nie ustanawia okresu retencji Netlify/Gmail. Nie uruchomiono żadnego usuwania. Kryteria w projekcie polityki wymagają przełożenia na faktyczną praktykę administratora.

**RECOMMENDED, do decyzji:** zapytania bez umowy usuwać najpóźniej 12 miesięcy po zakończeniu kontaktu, po sprawdzeniu, czy dalszy okres ma konkretną udokumentowaną podstawę. To proponowany maksymalny termin przeglądu, a nie obowiązek trzymania każdego zapytania przez rok. Zbędne dane usuwać wcześniej. Dokumentacja zamówienia/roszczeń wymaga własnych uzasadnionych okresów, nie automatycznej reguły 12 miesięcy.

Wykonalna procedura ręczna:

1. Piotr Pozdrowicz wskazuje osobę odpowiedzialną (może wykonywać ją sam), zatwierdza termin, zakres kont i miesięczny przegląd. W chronionym rejestrze zapisuje datę zamknięcia sprawy i termin następnego przeglądu; nie kopiuje pełnej treści do kolejnej bazy bez potrzeby.
2. Co miesiąc przejrzeć Netlify Forms **Verified i Spam**, korespondencję Gmail oraz ewentualne eksporty CSV/pobrane materiały. Fałszywie oznaczone zgłoszenia wymagają obsługi; nie usuwać ich bez sprawdzenia. Propozycja dla niepotrzebnego spamu/testów: usuwanie podczas najbliższego przeglądu, bez rocznego przechowywania.
3. Przed usunięciem sprawdzić trwające uzgodnienia, żądanie ograniczenia i konkretną potrzebę dowodową. Jeżeli zachowanie jest konieczne, wskazać minimalny zakres, powód i kolejny termin przeglądu.
4. Usunąć odpowiednie rekordy w Netlify, kopie powiadomień i odpowiedzi w Gmail (także kosz, gdy decyzja obejmuje trwałe usunięcie), eksporty i lokalne kopie w zakresie kontroli administratora. Skasowanie w Netlify nie usuwa automatycznie wiadomości Gmail.
5. Zanotować datę, zakres/systemy i wynik, bez pozostawiania zbędnej kopii usuniętych treści. Ustalić z dostawcami cykl kopii zapasowych/logów i sposób wykonania żądań; nie obiecywać natychmiastowego zniknięcia ze wszystkich backupów.
6. Po akceptacji uaktualnić sekcję 8, usunąć opis nierozstrzygniętej procedury i przedłożyć finalny dokument do zatwierdzenia. Dopiero następnie zmienić `privacyNotice.approved` w osobnym zatwierdzonym wydaniu.

## Technical security

Brak własnego endpointu bazodanowego, logowania treści formularza i automatycznego pobierania URL (brak nowego SSRF). Link HTTP(S) jest danymi, nie wykonywanym kodem. Formularz nie przesyła treści metodą GET. Brak uploadu i publicznego API odczytu zgłoszeń. Wiadomości błędów nie pokazują odpowiedzi dostawcy ani danych konta. Nagłówki nosniff, referrer policy i blokada uprawnień kamery/mikrofonu/geolokalizacji pozostają bez zmian.

**Granica ochrony:** flagi trybu testowego/zgody i walidacja są kontrolą interfejsu. Publiczny endpoint Netlify może zostać wywołany bez tego interfejsu; nie jest to uwierzytelnienie ani serwerowa blokada danych rzeczywistych. Staging używać wyłącznie do danych syntetycznych, rozważyć istniejącą ochronę dostępu dostawcy przed udostępnieniem osobom postronnym. `noindex` nie jest kontrolą dostępu. Nie zmieniono ustawień providerowych bez zgody.

Odczyty uwierzytelnionego API wykonano z istniejącym lokalnym poświadczeniem bez wypisywania tokenu. Tymczasowa konfiguracja autoryzacji została usunięta. Repozytorium i artefakty QA nie zawierają tokenu ani treści klientów. Nie twierdzimy, że MFA/uprawnienia administratorów, szyfrowanie danych na dysku lub całościowa zgodność kont zostały sprawdzone.

## Responsive

Zakres: 375, 390, 430, 768, 1024, 1280, 1440, 1920 px. Polityka i formularz sprawdzane w każdym rozmiarze; pełna dotychczasowa galeria także pozostaje w zestawie regresji. E-mail i odnośniki łamią się bez overflow. Spis treści ma odstępy klikalnych pozycji i offset nagłówka. Na mobile informacja przy formularzu ma 12 px i pełną szerokość; poprzedza przycisk. Zmiany CSS ograniczono do dokumentu prawnego i informacji formularza.

## Accessibility

Axe WCAG A/AA, w tym 2.1/2.2, kontrola pojedynczego h1, 14 h2, poprawnych kotwic, klawiatury spisu treści, powrotu do kontaktu i linku stopki. Formularz zachowuje powiązane etykiety/błędy, fokus pierwszego błędnego pola, komunikat role=alert, status sukcesu z fokusem i przejście Tab od linku polityki do przycisku. Bez zgód domyślnych i pułapek klawiatury. Brak nowych animacji; dotychczasowe testy reduced motion pozostają aktywne. Nie deklarujemy certyfikacji czytnikami ekranu ani na fizycznych urządzeniach.

## Performance

Polityka jest renderowana po stronie serwera. Jej pełny tekst nie trafia do chunków JS klienta (sprawdzenie charakterystycznego akapitu); formularz importuje krótką informację. Bez nowych zależności, skryptów zewnętrznych lub zmian pipeline zdjęć.

Końcowe pomiary Chromium na lokalnym `next build` + `next start`, po trzy przebiegi, DPR 1, wyłączony cache przeglądarki; cache optymalizatora obrazów mógł być rozgrzany:

| Pomiar                                            | Desktop, localhost | Mobile 390 px, CPU ×4, 1,6 Mb/s, 150 ms |
| ------------------------------------------------- | ------------------ | --------------------------------------- |
| LCP                                               | 412 / 380 / 428 ms | 924 / 932 / 960 ms                      |
| Końcowy CLS                                       | 0 / 0 / 0          | 0,0001463 / 0,0001459 / 0,0001459       |
| Najdłuższe z próbkowanych zdarzeń interakcji      | 176 / 216 / 184 ms | 88 / 96 / 88 ms                         |
| Obrazy kolekcji pobrane przed wejściem w showcase | 0 / 0 / 0          | 0 / 0 / 0                               |

To pomiary laboratoryjne, nie terenowe Core Web Vitals. Próbkowane zdarzenie 216 ms nie jest wyliczeniem INP; nie deklarujemy osiągnięcia INP ≤200 ms ani wyniku realnych użytkowników. Końcowy zwykły build: 9 początkowych plików skryptów, razem **194 861 B gzip**, HTML homepage **96 675 B**. Nie pogorszono jakości ani źródłowych pikseli zdjęć.

## QA

Końcowe wyniki, 2026-10-14:

| Polecenie                                                      | Wynik                                                                            |
| -------------------------------------------------------------- | -------------------------------------------------------------------------------- |
| `npm ls --depth=0`                                             | PASS; wymagane wersje obecne; istniejące opcjonalne wpisy sharp/emnapi bez zmian |
| `npm audit --omit=dev --json`                                  | 0 zgłoszonych podatności zależności produkcyjnych w momencie kontroli            |
| `npm run lint`                                                 | PASS, zero ostrzeżeń                                                             |
| `npm run typecheck`                                            | PASS                                                                             |
| `npm test`                                                     | **30/30 PASS**, bez pominięć                                                     |
| `npm run test:e2e -- --config=playwright.production.config.ts` | **40/40 PASS**, 0 flaky, 0 skipped, 0 errors; 504,5 s                            |
| `npm run build`                                                | PASS; osobny końcowy build bez flag testowego formularza                         |
| `npm run test:build`                                           | PASS; 16 kotwic, 12 początkowych img, branding, SEO, wymiary, źródła             |
| `npm run format:check`                                         | PASS                                                                             |
| `node --check scripts/verify-staging.mjs`                      | PASS; bez połączenia z hostingiem                                                |
| `git diff --check`                                             | PASS                                                                             |

Playwright użył produkcyjnego buildu w trybie syntetycznych zgłoszeń, wszystkie POST przechwycone lokalnie. Po suite wykonano ponownie zwykły build: 14 sekcji na `/prywatnosc`, właściwe mailto i komunikat „Wysyłka jest wyłączona”. Nie pozostawiono `.next` w trybie testowej wysyłki. Alias `npm run test:production` napotkał ograniczenie uruchamiania procesu w środowisku wykonawczym; powyższe polecenie używa dokładnie tej samej konfiguracji i wykonało pełne 40 testów. Raport: `playwright-report/index.html`, skrót maszynowy `qa/screenshots/privacy-readiness/final-playwright-summary.json`.

Dwie wykryte usterki nowego testu zostały naprawione bez osłabiania asercji: pierwszy dedykowany przebieg (2 PASS / 1 FAIL) miał zbyt szeroki `role=alert`, obejmujący announcer Next.js; zawężono go do `#kontakt`. Pierwszy pełny przebieg (39 PASS / 1 FAIL) zachowywał stan sukcesu React przy nawigacji różniącej się wyłącznie hashem między szerokościami; każdy wariant rozpoczyna teraz świeży dokument. Końcowy pełny przebieg zaliczył wszystkie scenariusze. Nie zmieniano zachowania aplikacji dla naprawy testów.

Nowe pokrycie obejmuje dane administratora, brak domniemanej akceptacji, sekcje/linki, notice bez checkboxa, osiem szerokości, axe, kolejność klawiatury, błędy i fokus, pola POST oraz brak magazynów/third-party/wycieku do console. Dotychczasowe testy zdjęć, karuzeli, lightboxu, touch i reduced-motion pozostają aktywne.

Wykryto również przestarzałe założenia w przygotowanym skrypcie stagingowym: szukał usuniętego akordeonu i tylko 15 obrazów. Zaktualizowano go do czterech usług, trzech kolekcji, 40 plików zdjęć oraz nowej polityki/notice. Zachowano ścisłą listę dozwolonych hostów i wymagany opt-in realnego POST. Sprawdzono składnię; **skrypt nie został wykonany na hostingu**.

## Visual regression

Zapisano **302 screenshoty** w `current/`. Porównano **266** odpowiadających stanów z poprzednim kandydatem; **212 pixel-identical**. Osiem hero i osiem sekcji watch są identyczne pikselowo. Pozostałe wyniki poddano przeglądowi, nie potraktowano automatycznie każdej różnicy jako błędu.

Oczekiwane zmiany: dłuższa polityka i czytelniejsza informacja formularza; wysokość kontaktu +50–72 px, bez pustego bloku. Wpływa to na długość całej strony oraz położenie stopki z zaokrągleniami o 1 px. Drobne różnice galerii obejmują 2–18 pikseli przy krawędziach. Dwa mobile release-capture różnią się widocznością fokusowanego skip-linka ze starego przebiegu; obraz i tekst są takie same. Duże różnice `studio-sticky` wynikają z uchwyconej fazy istniejącego przenikania fotografii; geometria i kontrolki nie uległy zmianie. W `1280-perfume-information` różni się rasteryzacja centralnej fotografii (średnia bezwzględna różnica kanału całego kadru 1,15/255), bez zmiany źródła, treści infografiki, skali czy układu. Inspekcja pary nie wykazała utraty czytelności. Nie przypisujemy tej różnicy do potwierdzonej zmiany źródłowego zdjęcia.

Obejrzano render polityki i treści, informację formularza oraz walidację/error/success na mobile i desktop. Brak clippingu/overflow i nowych nakładających się elementów. Nie zmieniano zatwierdzonego layoutu poza koniecznym miejscem na informację. Dane porównania: `qa/screenshots/privacy-readiness/visual-comparison.json`. Kontrola SHA-256: **40/40 plików WebP identycznych z punktem wejścia**.

## Screenshots

Wszystkie artefakty pod `qa/screenshots/privacy-readiness/` są ignorowane przez Git. Baseline strony to poprzedni, niezmieniony katalog `qa/screenshots/release-candidate/current/` z commitu wejściowego; nie nadpisano go.

- `current/390-privacy-top.png`, `current/1440-privacy-top.png` — pierwszy ekran dokumentu.
- `current/{width}-privacy.png` — pełny dokument dla ośmiu szerokości.
- `current/{width}-privacy-contact.png`, `current/{width}-privacy-notice.png` — formularz i nowa informacja.
- `current/390-privacy-validation.png`, `current/1440-privacy-validation.png` — niepoprawny e-mail.
- `current/{390,1440}-privacy-error.png`, `current/{390,1440}-privacy-success.png` — przechwycone odpowiedzi 503/200; nie są dowodem odbioru Netlify.
- `privacy-all-widths.png` — zestawienie ośmiu szerokości polityki.
- `current/privacy-runtime.json` — żądania bez treści formularza, cookies i magazyny w czterech etapach.
- `netlify-readonly.json`, `production-readonly.json`, `staging-env-readonly.json`, `staging-deploys-readonly.json` — zredukowane dowody GET, bez poświadczeń.
- `source-preservation.json` — wszystkie 40 WebP zgodne z wejściem, bez zmian fotografii.

## Staging plan — wyłącznie po nowej autoryzacji

1. Zatwierdzić osobno **wdrożenie izolowanego stagingu i jeden syntetyczny test**, w tym konfigurację powiadomień na wskazany Gmail. Nie jest do tego potrzebne uruchomienie zapytań klientów. Obecna sesja nie daje zgody na deploy ani push.
2. Źródło: gałąź `feature/complete-offer-collections-2026-10-11`, commit zawierający ten raport o tytule `feat: finalize privacy policy and contact data protection`. Ustalić jego pełny SHA poleceniem `git rev-parse HEAD`, sprawdzić tytuł i czyste drzewo. Nie wysyłać starego checkoutu migracyjnego z 2026-10-09.
3. Jedyny cel: istniejący staging ID **`2d58020a-5de9-4e4c-a18b-110ce37029be`**, bez custom domain i połączenia z Git. Aktualny deploy **`6ac90a5dad36738a289cabe0`** (`branch-deploy`, `ready`) pozostaje bazą rollbacku. URL: `https://staging-ofertastudio-rc-20261009--ofertastudio-staging-20261009.netlify.app`. Odczyt 2026-10-14: HTTPS 200, stary build. Nie używać produkcyjnego ID `85ea6f80-…`.
4. Przygotować `git archive --format=zip --output=/tmp/ofertastudio-privacy-rc.zip <ZWERYFIKOWANY_SHA>`. Archiwum ma `src`, `public`, lockfile, package i konfiguracje w root. Nie dodawać `.git`, `.env*`, node_modules, .next, QA, test-results ani lokalnych poświadczeń. Sprawdzić listę archiwum przed wysłaniem.
5. Zachować build: base `.`, command `npm run build`, publish `.next`, Node **22**; lokalnie testowano **22.23.3**, Next **16.4.0**, React **19.3.0**, TS **6.0.3**. Jawny plugin `@netlify/plugin-nextjs` w `netlify.toml`; historyczny runtime Netlify 5.16.2. Nowy numer adaptera z logu trzeba odnotować i sprawdzić, nie zakładać że automatycznie będzie taki sam.
6. Odczyt API potwierdził na stagingu: `CONTACT_FORM_ENABLED=true`, `CONTACT_FORM_TEST_MODE=true`, `NEXT_PUBLIC_INDEXABLE=false`, kontekst `all`. `NETLIFY=true` nadaje platforma, kontekst deployu musi pozostać `branch-deploy`, nie `production`. `NEXT_PUBLIC_SITE_URL=https://ofertastudio.pl` jest domyślnym canonical; `NEXT_PUBLIC_CONTACT_EMAIL` opcjonalne, nie konfiguruje powiadomień. Wprowadzenie tego adresu zmienia kontakt/stopkę i wymaga osobnego przeglądu. Brak sekretu w runtime aplikacji; token Netlify jest potrzebny wyłącznie narzędziu wdrażającemu, nigdy `NEXT_PUBLIC_*`.
7. Po autoryzacji użyć istniejącego workflow źródłowego: `POST https://api.netlify.com/api/v1/sites/2d58020a-5de9-4e4c-a18b-110ce37029be/builds?branch=staging-ofertastudio-rc-20261009`, body archiwum, Content-Type `application/zip`, autoryzacja z bezpiecznego magazynu. To zleca build Next.js w Netlify; nie wysyłać `.next` jako statycznego serwisu. **Nie wykonano tego żądania w tej sesji.**
8. Monitorować wskazany build/deploy aż do `ready`. Zapisać mapowanie SHA→build→deploy i logi. Potwierdzić root `/`, privacy HTTP 200, 40 plików zdjęć, zasoby Next, brak legacy redirect `/ofertastudio/index.html`, noindex w HTML i `/__forms.html`, robots disallow i pusty sitemap. Noindex nie zabezpiecza dostępu. Powtórzyć audyt cookies/network na hostingu, nie kopiować bez sprawdzenia wyników localhost.
9. W Forms potwierdzić detekcję `product-enquiry` i pola. W **Forms → Submission notifications → Add notification → Email** po autoryzacji ustawić stagingowy odbiór `pozdrowicz@gmail.com` dla tego formularza. Obecnie nie ma takiego hooka. Nie zmieniać produkcyjnego ustawienia, które już istnieje.
10. Wykonać poniższą procedurę E2E. Gdy zawiedzie build/QA, pozostawić produkcję bez zmian, przywrócić poprzedni stagingowy artefakt/źródło przez właściwą kontrolkę brancha. Przywrócenie deployu nie cofa ustawień środowiska/powiadomień — porównać je z zapisanym stanem.

### Staging form test — PENDING

Po nowej autoryzacji i gotowym buildzie:

```bash
STAGING_URL=https://staging-ofertastudio-rc-20261009--ofertastudio-staging-20261009.netlify.app \
RUN_STAGING_FORM_TEST=1 \
npm run test:e2e -- --config=playwright.staging.config.ts
```

Skrypt dopuszcza wyłącznie izolowany host i jeden jawny syntetyczny zapis. Nazwa: `TEST TECHNICZNY PRIVACY-RC-<czas>`, e-mail: `test@example.com`, wiadomość: `[TEST OFERTASTUDIO] PRIVACY-RC-<czas> — syntetyczna próba odbioru na stagingu. Bez danych klienta.`, link `https://example.com/product`. Nie używać danych klienta. Marker pozwala znaleźć dokładnie ten zapis.

Przed wysłaniem: sprawdzić nową politykę, mailto, notice, brak checkboxa, walidację pustych pól i odrzucenie niepoprawnego e-maila; potem HTTP i poprawny status UI. Po wysłaniu:

1. W Netlify Forms znaleźć identyczny marker w Verified; sprawdzić także Spam. Zapisać ID, czas, stan. Jeśli w Spam, wynik zwykłego doręczenia pozostaje niezaliczony — sprawdzić reguły i uzgodnić monitoring. Nie uznawać samego sukcesu HTTP za odbiór.
2. W Gmail właściciela sprawdzić faktyczne powiadomienie (również Spam), nadawcę i ten sam marker. Zanotować czas oraz nagłówek `Reply-To: test@example.com`. Można otworzyć szkic „Odpowiedz” i sprawdzić adresata; nie wysyłać odpowiedzi na syntetyczny, nieobsługiwany adres.
3. Rzeczywista wiadomość Gmail jest osobnym dowodem; API hooka ani UI formularza go nie zastępują. Bez dostępu do skrzynki właściciel musi potwierdzić odbiór i nagłówek.
4. Sprawdzić mobilny formularz, kolejność klawiatury i brak payloadu w console/URL. Błędy 503, timeout i retry testować przez lokalne przechwycenie odpowiedzi, bez wywoływania awarii dostawcy. Sprawdzić blokadę podwójnego kliknięcia; ewentualny retry po niejednoznacznym timeout najpierw porównać z panelem, aby nie mnożyć zgłoszeń.
5. Wynik: osobno HTTP/UI, receipt Verified/Spam, e-mail, Reply-To, liczba rekordów. Uzgodnić usunięcie testu z Forms i Gmail w ramach zaakceptowanej procedury; nie uruchamiać kasowania prawdziwych zgłoszeń.

## Release blockers

1. Zatwierdzenie całej polityki przez Piotra Pozdrowicza; ocena dodatkowych obowiązków informacyjnych i prawnych dotyczących faktycznej działalności.
2. Decyzja i wdrożenie retencji, usuwania kopii, monitoringu Spam oraz obsługi praw; weryfikacja warunków kont Netlify/Gmail i transferów. Brak automatycznego zatwierdzenia 12 miesięcy.
3. Autoryzowany aktualny staging, jego hosted-runtime QA, realny zapis oraz potwierdzone doręczenie do Gmail z Reply-To. Konfiguracja produkcyjnego hooka nie zamyka tej bramki.
4. Osobna zgoda na produkcję, weryfikacja migracji root aplikacji i planu rollbacku przed wydaniem. Nowy frontend nadal ma niezależną historię Git.

### Production / rollback

Odczyt API 2026-10-14: produkcja wciąż `tiny-paletas-35daca`, domena `ofertastudio.pl`, repo `ppozdrowicz-oss/ofertastudio`, branch `main`, dashboard base/cmd/dir unset (konfiguracja plikowa). Opublikowany legacy deploy **`6abab84676b6a700081aeca5`**. Odczyt GitHub refs: `main` i `backup/ofertastudio-legacy-2026-10-08` → **`616591f04a257f567359d02c50e631a3a9bca851`**. Backup jest zachowany.

Dopiero po odrębnej zgodzie: świeży clone aktualnego remote main, zachowanie `.git` i historii, nałożenie zatwierdzonego archiwum w root, usunięcie wyłącznie rozpoznanych legacy plików/redirectów w tym izolowanym clone, przegląd i zwykły commit. Powtórzyć QA i staging po zmianach migracyjnych, ponownie sprawdzić main/backup, uzgodnić produkcyjne env/detekcję formularza, wykonać zwykły fast-forward push. Nigdy force-push niezależnej historii. Dokładny proces historyczny w `RELEASE.md` wymaga aktualnego SHA; jego stary checkout nie jest obecnym kandydatem.

Jeśli przyszłe wydanie zawiedzie, przywrócić poprzedni działający deploy **na tym samym** projekcie Netlify, bez zmiany DNS; potwierdzić HTTPS i root. Zweryfikować osobno przywrócenie zmienionych env/hooków. Następnie odwrócić faktyczne commity migracji zwykłym `git revert` i ponownie zbudować, aby następny push nie przywrócił błędu. Nie resetować main i nie ruszać backupu.

## Git

Gałąź: `feature/complete-offer-collections-2026-10-11`. Release candidate identyfikuje lokalny commit zawierający ten raport, tytuł `feat: finalize privacy policy and contact data protection`, rodzic `03bd44e`. Pełny SHA: `git log -1 --format='%H %s'` po utworzeniu commitu. Hash nie może być wpisany do własnej zawartości commitu.

Pliki kandydata (12):

- `src/content/privacy.ts`
- `src/app/prywatnosc/page.tsx`
- `src/components/forms/ContactForm.tsx`
- `src/app/globals.css` — wyłącznie polityka/notice
- `tests/unit/privacy.test.ts`
- `tests/unit/interactions.test.tsx`
- `tests/release-privacy.spec.ts`
- `tests/qa-paths.ts`
- `scripts/verify-staging.mjs`
- `README.md`
- `PRIVACY_DRAFT.md` — nagłówek aktualizujący stan historyczny
- `FINAL_PRIVACY_AND_STAGING_READINESS.md`

Przed commitem te pliki stanowią cały diff, bez zastanych niezwiązanych zmian. Screenshoty, `.next`, raport Playwright i lokalne dowody API są ignorowane. Po commicie wymagane `git status --short` bez wpisów; wynik i rzeczywisty SHA przekazano w raporcie końcowym sesji.

Zakres: privacy model/route, informacja formularza i jej lokalne style, testy prywatności, ścieżka nowych screenshotów, aktualizacja skryptu przyszłego staging QA, dokumentacja. Wszystkie 40 WebP zachowane bajtowo. Brak zmian w hero, karuzeli, opisach produktów, makro, zależnościach, konfiguracji remote i Netlify.

## Deployment status

**Nie wykonano push, wdrożenia staging/production, zmiany hooków/env/domeny ani DNS.** Wykonane żądania zewnętrzne były wyłącznie odczytami dokumentacji, stron oraz API. Wszystkie lokalne zgłoszenia zostały przechwycone przez testy.
