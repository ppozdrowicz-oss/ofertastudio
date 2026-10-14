# OfertaStudio.pl — production readiness, 2026-10-09

## EXECUTIVE STATUS

**NO-GO dla produkcji.** Zrealizowano bezpieczną prezentację obuwia, migrację do katalogu głównego z zachowaniem historii, rzeczywisty build Netlify, działający staging oraz test formularza z potwierdzeniem zapisu przez API. Nadal brakuje rzeczywistych danych administratora, decyzji o retencji/odbiorcach i akceptacji kompletnej informacji o prywatności. Nie zastąpiono ich fikcyjnymi danymi ani domniemaną zgodą.

| Warunek                                                | Wynik                                                                               |
| ------------------------------------------------------ | ----------------------------------------------------------------------------------- |
| Wiarygodność prezentacji obuwia                        | PASS przez bezpieczną adaptację; nie przez naprawę geometrii zdjęć                  |
| Zatwierdzona informacja o prywatności i dane biznesowe | BLOCKED — P-01–P-06 w `PRIVACY_DRAFT.md`                                            |
| Rzeczywisty zapis w Netlify Forms                      | PASS z zastrzeżeniem: test został zapisany w Spam; brak dowodu dostarczenia e-maila |
| Build lokalny i rzeczywisty runtime Netlify            | PASS po dodaniu jawnego adaptera Next.js                                            |
| Testy i osiem szerokości                               | PASS; szczegóły poniżej                                                             |
| Zachowana produkcja i rollback                         | PASS; main, backup i opublikowany deploy pozostały bez zmian                        |
| Finalna autoryzacja produkcji                          | Nieudzielona w tej fazie; wymagany osobny krok po zamknięciu blokad                 |

Nie zmieniono zatwierdzonego hero, rodzin fontów, kolorów, kolejności sekcji ani portfolio. Wszystkie 15 oryginalnych plików WebP zachowano bez zmian.

## SNEAKER

Oba pliki mają 2600 × 2600 px. Analiza fotograficzna wykazała, że wspólny kwadratowy format nie oznacza zgodności produktu. Dopasowanie cech na podglądzie 1300 px dało 102 dopasowania, 43 inliery, skalę około 1,02786 i obrót −0,6285°. Mediana reszty dopasowania wynosiła 4,69 px, a percentyl 90 — 37,83 px. To diagnostyka, nie dowód wierności produktu.

Widać lokalne różnice w siatce, sznurowaniu i podeszwie. Jedna translacja, skala lub obrót nie naprawia tych różnic. Nie ustalamy pochodzenia fotografii na podstawie samego wyglądu. Nie zastosowano deformacji, generowania detali ani fałszywej rejestracji.

`Comparison.tsx` pokazuje teraz dwa odrębne kadry: „W otoczeniu” i „Na białym tle”. Podpis wyraźnie mówi: „Dwa niezależne ujęcia pokazowe. Nie stanowią pary przed i po retuszu.” Nagłówek i opis odnoszą się do sposobu prezentacji, nie obietnicy retuszu identycznej geometrii.

Desktop/tablet: dwa kwadratowe kadry obok siebie. Mobile: pełne kadry jeden po drugim. Nie ma ruchomej granicy łączącej różne podeszwy. Testy potwierdzają brak nakładania obrazów, brak pozornego suwaka, dostępność obu zdjęć, działanie nawigacji klawiaturą i naturalne przewijanie dotykowe. Pozycje 0/25/50/75/100% są **nieadekwatne do nowej prezentacji**, a nie „zaliczone”.

Ograniczenie plików pozostaje udokumentowane. Powrót do autentycznego suwaka wymaga rzeczywistego źródła i retuszu z tego samego mastera. Obecne dwa niezależne studia nie wymagają wymyślania takiej pary.

## PRIVACY

Przejrzano kod formularza, media, layout, konfigurację i publiczną trasę. Zweryfikowano:

- Netlify Forms: imię/firma, e-mail, wiadomość, opcjonalny link; dodatkowo nazwa formularza i honeypot.
- Brak uploadu plików, własnej bazy i API zapytań, automatycznego pobierania linków oraz własnego logowania treści zapytań.
- Hosting i funkcja Next.js mogą przetwarzać techniczne metadane/logi. Nie deklarujemy niezweryfikowanej retencji dostawcy.
- Fonty i zdjęcia są lokalne. Kod nie integruje analityki, reklamowych pikseli, embedów, reCAPTCHA, cookies ani localStorage/sessionStorage formularza.
- Staging nie ma notification hooks. Produkcyjni odbiorcy i dalsza obsługa materiałów muszą zostać ustaleni przez administratora.

`PRIVACY_DRAFT.md` zawiera pełną strukturę polskiego dokumentu, zweryfikowany przepływ, źródła urzędowe/dostawcy i pola P-01–P-06. Proponowane podstawy prawne rozróżniają działania przed zawarciem umowy i uzasadniony interes; nie dodano zbędnej obowiązkowej zgody marketingowej. Retencja, administrator, odbiorcy i mechanizm transferów nie zostały wymyślone. Kwalifikację prawną i aktualne warunki Netlify trzeba potwierdzić dla rzeczywistej działalności; wątpliwości wymagają przeglądu prawnego.

Publiczne `/prywatnosc` uczciwie opisuje podgląd i fakty techniczne, bez nazw „do uzupełnienia” udających prawdziwego administratora. To **nie jest zatwierdzona polityka produkcyjna**. `privacyNotice.approved` pozostaje `false`.

Prawdziwe zapytania wymagają Netlify, flagi włączenia i zatwierdzenia dokumentu w kodzie. Tryb testowy działa tylko poza kontekstem `production` i dopuszcza jawnie oznaczone dane syntetyczne. Walidacja testowa jest ochroną interfejsu, nie uwierzytelnianiem endpointu Netlify. Publiczny staging nie powinien przyjmować danych klientów.

## NETLIFY FORMS

Statyczna definicja `public/__forms.html` odpowiada widocznemu formularzowi `product-enquiry`. Wysyłka to URL-encoded POST do `/__forms.html`, zgodnie z [integracją Netlify dla Next.js](https://opennext.js.org/netlify/forms). Pole honeypot pozostaje puste; nie ma plików do testowania.

Weryfikacja rzeczywista, nie mock:

| Dowód                                    | Wynik                                                                                         |
| ---------------------------------------- | --------------------------------------------------------------------------------------------- |
| Rejestracja formularza w API             | `6ac90a851134a40008b2deb8`, `product-enquiry`, wszystkie pięć oczekiwanych pól                |
| Marker wiadomości                        | `RC-2026-10-09T15:39:54.857Z`                                                                 |
| Dane                                     | `TEST TECHNICZNY…`, `test@example.com`, `[TEST OFERTASTUDIO]…`, `https://example.com/product` |
| POST z przeglądarki                      | HTTP 200; ekran „Zapis testowy przyjęty.”                                                     |
| Zapis potwierdzony niezależnie przez API | `6ac90acb66a45471a6736750`, utworzony `2026-10-09T15:39:55.130Z`                              |
| Zgodność treści                          | Marker, testowy e-mail i nazwa zgodne z wysłanym formularzem                                  |
| Klasyfikacja dostawcy                    | **Spam**; zwykła lista zgłoszeń była pusta, rekord odnaleziono przez `?state=spam`            |
| Powiadomienia e-mail                     | Zero hooks; nie skonfigurowano i nie potwierdzono doręczenia                                  |

Nie zmieniano klasyfikacji spamu ani ustawień antyspamowych, żeby uzyskać pozornie lepszy wynik. Test dowodzi odbioru i przechowania przez Forms, **nie** dostarczenia do zwykłej skrzynki ani skuteczności filtrowania przyszłych klientów. Przed uruchomieniem obsługi trzeba ustalić monitorowanie Forms/Spam i ewentualnego e-maila. [Dokumentacja Netlify rozróżnia zgłoszenia zweryfikowane i spam](https://docs.netlify.com/manage/forms/submissions/).

Rzeczywisty staging potwierdził walidację i stan sukcesu. Lokalne testy kontrolowanie symulują pending, odrzucenie, błąd HTTP, nieobsłużoną statyczną odpowiedź 200 i ponowienie. Nie udajemy, że wywołano awarię infrastruktury Netlify. Przy błędzie treść jest zachowana, a sukces nie jest ogłaszany.

## DEPLOYMENT

Adres: <https://staging-ofertastudio-rc-20261009--ofertastudio-staging-20261009.netlify.app>.

- Odizolowany projekt `ofertastudio-staging-20261009`, ID `2d58020a-5de9-4e4c-a18b-110ce37029be`; bez domeny własnej i połączenia Git.
- Źródła z katalogu głównego kandydata `a90aebe` przesłano jako `git archive` do Netlify Build API. Brak `node_modules`, `.next`, `.git`, lokalnych env i artefaktów QA w archiwum.
- Udany build: `6ac90a5dad36738a289cabde`; deploy: `6ac90a5dad36738a289cabe0`; stan `ready`, kontekst `branch-deploy`.
- Netlify wykonało pełny build; adapter `@netlify/plugin-nextjs@5.16.2` wdrożył funkcję `___netlify-server-handler` na Node 22. To działająca aplikacja Next.js, nie statyczny zamiennik.
- `netlify.toml`: base `.`, command `npm run build`, publish `.next`, jawny plugin. Brak starego generatora i przekierowania `/` do `/ofertastudio/index.html`.
- `noindex`, robots `Disallow: /`, pusty sitemap. HTTPS i `/` HTTP 200; brak przekierowania do innej domeny.
- Sześć sprawdzonych tras pomocniczych oraz wszystkie 15 WebP zwracają 200. Przeglądarka dekoduje zdjęcia i nie zgłasza błędów skryptów/hydratacji w przejściu testowym.

Znalezione i rozwiązane problemy wdrożenia:

1. Lokalny Netlify CLI nie rozwiązywał DNS, choć autoryzowany dostęp API działał. Użyto obsługiwanego builda z archiwum źródeł przez API, bez pushowania gałęzi.
2. Pierwszy build uzyskał `ready`, ale bez adaptera opublikował surowe `.next`; root zwracał 404. Dodano jawny plugin. Sam status platformy nie był uznany za sukces.
3. Utworzenie projektu nie zachowało oczekiwanego ustawienia wykrywania Forms. Osobny PATCH ustawił `ignore_html_forms=false`, odpowiedź API to potwierdziła, a kolejny build zarejestrował formularz.
4. Przypisywanie zakresów env wymagałoby wyższego planu. Zastosowano obsługiwane zmienne całego **stagingowego** projektu, bez zmiany planu lub ustawień konta/produkcji.

## QA

| Polecenie / kontrola                                             | Wynik                                                                          |
| ---------------------------------------------------------------- | ------------------------------------------------------------------------------ |
| `npm ci` w migracyjnym katalogu głównym                          | PASS, 416 pakietów; brak wymaganych lokalnych sekretów                         |
| `npm run check`                                                  | PASS: lint, typecheck, 19 testów jednostkowych/DOM, build                      |
| `npm run lint && npm run typecheck` po dodaniu harnessu stagingu | PASS                                                                           |
| `npm run test:e2e -- --config=playwright.production.config.ts`   | PASS, 20/20 w końcowym przebiegu sekwencyjnym                                  |
| `npm run test:e2e -- --config=playwright.staging.config.ts`      | PASS, 1/1; prawdziwy staging i jedna rzeczywista syntetyczna wysyłka           |
| `npm run build && npm run test:build`                            | PASS; 1 h1, 17 instancji zdjęć, 16 kotwic, poprawne metadane i lokalne ścieżki |
| `npm run format:check`                                           | PASS po formatowaniu końcowym                                                  |
| `npm audit --omit=dev`                                           | PASS, zero zgłoszonych podatności produkcyjnych                                |
| `python3 scripts/audit-photography.py`                           | PASS; diagnostyka bez modyfikacji oryginałów                                   |
| Porównanie Git plików `public/media` z checkpointem `0ef57c0`    | Brak zmian plików zdjęć                                                        |

Ujawnione nieudane próby: bezpośredni start Chromium w ograniczonej powłoce był blokowany; test uruchomiono poprawnie przez istniejący runner z oddzielną konfiguracją i lokalnym plikiem env. Pierwsza asercja stagingu używała `innerText`, które wprowadzało nową linię między elementami flex wordmarku mimo poprawnego wyglądu; po oględzinach zrzutu zastosowano dokładny `textContent`, bez zmiany logo. Jeden pośredni przebieg lokalny miał 19/20 przez konflikt plików trace podczas równoległego startu dwóch runnerów. Rozdzielono katalog stagingu i powtórzono pełny suite sekwencyjnie. Nie usunięto testu ani nie osłabiono warunku wydajności.

## VISUAL REGRESSION

Baseline poprzedniego zatwierdzonego wyglądu zachowano w `qa/screenshots/production-readiness/baseline/`. Nowe obrazy i diagnostyka są w `current/`, a rzeczywiste zrzuty wdrożenia w `staging/`. Artefakty są lokalne i ignorowane przez Git.

Sprawdzono 375, 390, 430, 768, 1024, 1280, 1440 i 1920 px lokalnie oraz na stagingu. Brak poziomego overflow. Obie ramy obuwia pokazują pełny produkt. Marka w headerze/footerze jest dokładnie `OfertaStudio.pl`; mobilne menu jest objęte lokalnymi testami.

Porównanie 40 niezmienianych kadrów sekcji (hero, zegarek, editorial, półka, footer × osiem szerokości) nie jest deklarowane jako całkowicie identyczne pikselowo. Siedem z ośmiu hero miało zerową różnicę powyżej progu 8/255; 768 px około 0,44%. Zmiana wysokości sekcji obuwia przesunęła późniejsze sekcje na ułamkowe współrzędne: występują różnice antyaliasingu i kadru ±1 px. Obejrzano reprezentatywne pary i pełne strony; nie wykryto zmiany ich układu, proporcji ani cropów produktów. Surowe wyniki zapisano w `regression.json` i pomocniczym `regression-aligned.json`; nie interpretowano samego procentu różnic jako poprawy.

Zamierzone różnice dotyczą oddzielnych kadrów obuwia oraz prawdziwej informacji o trybie formularza/prywatności. Studio perfum zachowuje pięć zdjęć i wcześniejszą rejestrację. Etapy 04/05 pozostają subtelnie różne na poziomie dostarczonych plików; nie zwiększano różnic sztucznym gradingiem. Biała rama zegarka zachowana jako część zatwierdzonej kompozycji.

## ACCESSIBILITY AND PERFORMANCE

Lokalne axe: zero wykrytych naruszeń WCAG A/AA w badanych stanach 390 i 1440 px, z tagami obejmującymi WCAG 2.2 AA. Pozostają elementy wymagające oględzin wskazane jako `incomplete`; nie jest to pełny certyfikat dostępności. Testy obejmują focus, Escape i pułapkę fokusu menu, aktywację etapów i usług klawiaturą, reduced motion, powiązane komunikaty walidacji i touch scrolling. Usunięty suwak nie zostawia nieczynnego kontrolera.

Ostatnie lokalne pomiary trzech prób na urządzenie:

| Profil                                  | LCP        | CLS            |
| --------------------------------------- | ---------- | -------------- |
| Desktop, localhost, bez throttlingu     | 364–392 ms | 0–0,000523     |
| Mobile 390 px, CPU ×4, 1,6 Mb/s, 150 ms | 904–948 ms | około 0,000146 |

Cache przeglądarki wyłączony, cache optymalizatora obrazów lokalnego serwera może być ciepły. Wyniki są **laboratoryjne**, nie terenowe ani gwarantowane na publicznym hostingu. Brak reprezentatywnego pomiaru INP; pusta lista zdarzeń nie oznacza INP 0. Build: 9 początkowych plików JS, 191 896 bajtów gzip; brak dodanych zależności runtime/motion. Fotografie pozostały oryginalne, hero ma preload, pozostałe obrazy optymalizację i zarezerwowany układ.

## SECURITY

Sekrety API pobrano z istniejącej autoryzacji bez wypisywania ich wartości. Tymczasowe pliki autoryzacji miały uprawnienia 0600 i nie weszły do repozytorium ani archiwum wdrożenia. Lokalny plik opt-in testu jest ignorowany przez Git. Nie wprowadzono usług marketingowych ani fikcyjnych danych osobowych.

Produkcja ma wyłączone zapytania, dopóki nie ma akceptacji dokumentu. Formularz nie pobiera obcych URL, nie przyjmuje plików i ma honeypot. Kod ustawia `X-Content-Type-Options`, `Referrer-Policy` i `Permissions-Policy`. Przyszłe potwierdzenie retencji i uprawnień dostępu do Forms jest decyzją rzeczywistego administratora.

Pozostaje pięć wcześniej opisanych podatności deweloperskiego łańcucha `braces`/lint. `npm audit --omit=dev` jest czysty. Nie zastosowano wymuszonego downgrade'u Next/ESLint ani niezgodnego override'u. To jawnie odnotowane ograniczenie narzędzi, nie naprawa ukryta przez wyłączenie audytu.

## GITHUB

Repozytorium docelowe: `https://github.com/ppozdrowicz-oss/ofertastudio`.

- Remote main i backup: `616591f04a257f567359d02c50e631a3a9bca851`; ponowny fetch potwierdził stan.
- Źródło: `/home/roland/ofertastudio-next/studio`, gałąź `release/readiness-2026-10-09`. Checkpointy `afe1c4f` (obuwie i bramka prawna), `8a75c06` (adapter), następnie harness i dokumentacja tego raportu.
- Kandydat migracyjny: `/home/roland/ofertastudio-next/release-candidate-20261009`, gałąź `staging/ofertastudio-rc-20261009`. `65d2bb6` zachowuje legacy main jako rodzica, `a90aebe` dodaje adapter; kolejne commity synchronizują testy i dokumentację.
- Opublikowane archiwum stagingu odpowiada kodowi `a90aebe`; późniejsze zmiany dotyczą testów/dokumentacji, nie wyglądu ani runtime aplikacji.
- Nie wykonano żadnego push, force-push ani zmiany gałęzi produkcyjnej. Backup nie został naruszony. Końcowe SHA można odczytać przez `git log -1 --oneline` w obu katalogach; końcowa kontrola obejmuje czysty stan obu drzew roboczych i zgodność ich drzew plików.
- Kontrola Netlify po stagingu potwierdziła niezmieniony produkcyjny deploy `6abab84676b6a700081aeca5`, legacy commit, domenę `ofertastudio.pl` i HTTPS 200 ze starą stroną.

## REMAINING ACTIONS

1. Użytkownik: rzeczywista nazwa osoby/podmiotu będącego administratorem, adres kontaktowy, publiczny e-mail, reguły retencji oraz faktyczni odbiorcy/dalsza obsługa materiałów. Nie zakładamy zarejestrowanej firmy.
2. Uzupełnienie projektu dokumentu, potwierdzenie stosownych warunków powierzenia/transferów i akceptacja **całego** tekstu przez użytkownika. Dopiero potem finalna publiczna strona prywatności i włączenie klientów.
3. Decyzja o monitorowaniu Forms/Spam i ewentualnej skrzynce powiadomień. Zapis testowy jest potwierdzony, ale e-mail nie był skonfigurowany ani testowany.
4. Oddzielna finalna zgoda na produkcję po zamknięciu powyższych punktów. Dostęp do GitHub/Netlify nie jest obecnie blokadą stagingu.

## RELEASE PROCEDURE

Szczegółowe polecenia, kontrola konkurencyjnych zmian main, konfiguracja istniejącego site, weryfikacja domeny i jawny rollback są w [RELEASE.md](RELEASE.md).

Wydanie zachowuje historię: odświeżenie origin/main → przegląd różnic → ewentualny zwykły merge nowych zmian → testy → dopiero po zgodzie zwykły `git push origin HEAD:main` z przygotowanej gałęzi. Produkcja musi używać istniejącego site i domeny, aplikacji w katalogu głównym oraz zatwierdzonych env/treści.

Rollback: przywrócenie zachowanego legacy deploya **w istniejącym projekcie Netlify**, sprawdzenie domeny, a następnie zwykły commit odwracający odpowiednie commity wydania i normalny push. Bez resetu main, force-push, kasowania backupu lub zmiany DNS.

## FILES CHANGED

- `src/components/experiences/Comparison.tsx`, odpowiednie style w `src/app/globals.css`, `src/content/site.ts` i `src/content/media.ts`: uczciwa prezentacja obuwia.
- `src/content/privacy.ts`, `src/lib/contact.ts`, `Contact.tsx`, `ContactForm.tsx`, `/prywatnosc` i `.env.example`: zweryfikowane informacje, tryby formularza i blokada niezakończonej akceptacji.
- `netlify.toml`: jawny adapter Next.js.
- Testy jednostkowe i browserowe, `scripts/verify-staging.mjs`, `playwright.staging.config.ts`, `tests/staging.spec.ts`: regresja i rzeczywisty test stagingu oddzielony od domyślnego suite.
- `PRIVACY_DRAFT.md`, `PRODUCTION_READINESS.md`, `RELEASE.md`, `README.md`, `ASSETS.md`, `QA.md`: fakty, ograniczenia, procedury i dowody.
