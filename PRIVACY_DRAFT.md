# Projekt informacji o prywatności OfertaStudio.pl

> Aktualizacja 2026-10-14: poniższy dokument zachowuje historyczny projekt z 2026-10-09. Właściciel potwierdził administratora: **Piotr Pozdrowicz, osoba fizyczna**, kontakt: **pozdrowicz@gmail.com**. Aktualna treść jest zaimplementowana w `src/content/privacy.ts` i na `/prywatnosc`. Bieżące ustalenia, retencja do decyzji i bramki publikacji: [FINAL_PRIVACY_AND_STAGING_READINESS.md](FINAL_PRIVACY_AND_STAGING_READINESS.md). Stare oznaczenia braków P-01/P-02 poniżej nie opisują już aktualnego stanu. Zatwierdzenie całego dokumentu nadal jest wymagane.

**Status: niezatwierdzony projekt wewnętrzny, 2026-10-09. Nie publikować jako finalnej polityki.** Brakuje tożsamości administratora, kontaktu i decyzji dotyczących retencji. Nie zakładamy, że działalność jest zarejestrowaną firmą. Publiczna trasa `/prywatnosc` zawiera wyłącznie prawdziwą informację o podglądzie i zweryfikowanych funkcjach.

## Zweryfikowany przepływ danych

| Element                | Ustalenie z kodu / konfiguracji                                                                                                                                                        |
| ---------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Pola                   | `name`, `email`, `message`, opcjonalne `productLink`; techniczne `form-name` i puste pole honeypot `website`                                                                           |
| Wysyłka                | HTTPS POST, URL-encoded do `/__forms.html`; odbiorca techniczny Netlify Forms; brak własnej bazy lub API formularza                                                                    |
| Wykrywanie             | Ukryta definicja HTML w `public/__forms.html`, nazwa `product-enquiry`; właściwe pola dla adaptera Next.js                                                                             |
| Pliki                  | Brak uploadu i brak automatycznego pobierania adresów URL. Aplikacja wysyła tekst linku. Późniejszą obsługę materiałów przez studio musi opisać administrator                          |
| Antyspam               | Honeypot po stronie aplikacji i Netlify. Dostawca dokumentuje filtrowanie Akismet. Brak reCAPTCHA                                                                                      |
| Przechowywanie lokalne | Brak localStorage/sessionStorage dla treści formularza. Po błędzie treść zostaje w bieżącym formularzu                                                                                 |
| Logi                   | Brak własnego logowania treści zapytań. Hosting/Forms mogą przetwarzać IP, metadane HTTP, czas żądania i logi techniczne                                                               |
| Cookies / analityka    | Kod aplikacji nie ustawia cookies, nie integruje analityki ani pikseli reklamowych; brak profilowania marketingowego                                                                   |
| Zewnętrzne zasoby      | Fonty i fotografie lokalne; brak osadzonych filmów, map, czatów i zewnętrznych skryptów marketingowych                                                                                 |
| E-mail / webhooks      | W izolowanym stagingu API zwróciło zero notification hooks. Nie skonfigurowano powiadomień. Produkcyjni odbiorcy wymagają potwierdzenia                                                |
| Włączenie              | Prawdziwe zapytania wymagają Netlify, `CONTACT_FORM_ENABLED=true` i zatwierdzenia dokumentu w `src/content/privacy.ts`                                                                 |
| Testy                  | `CONTACT_FORM_TEST_MODE=true` poza kontekstem `production`; interfejs dopuszcza wyłącznie oznaczone dane syntetyczne. To zabezpieczenie UI, nie kontrola dostępu do endpointu dostawcy |

Źródła: [Netlify Forms dla Next.js](https://opennext.js.org/netlify/forms), [ustawienia formularzy](https://docs.netlify.com/manage/forms/setup/), [ochrona przed spamem](https://docs.netlify.com/manage/forms/spam-filters/). Wynik rzeczywistego testu stagingu jest osobno dokumentowany w `PRODUCTION_READINESS.md`.

## Pola wymagające faktów i zatwierdzenia

| Identyfikator | Brakująca informacja                                                                                                               | Status                                                      |
| ------------- | ---------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------- |
| P-01          | Nazwa osoby/podmiotu będącego administratorem oraz właściwy adres kontaktowy                                                       | Oczekuje na użytkownika                                     |
| P-02          | Publiczny e-mail w sprawach danych; identyfikatory rejestrowe wyłącznie jeśli rzeczywiście dotyczą działalności                    | Oczekuje na użytkownika                                     |
| P-03          | Retencja zapytań bez zamówienia, materiałów produktowych, korespondencji, logów i kopii; sposób usuwania danych z Forms i skrzynki | Oczekuje na decyzję administratora                          |
| P-04          | Osoby/usługi z dostępem do zapytań, dostawca poczty, konfiguracja powiadomień, ewentualne dalsze narzędzia pracy nad zdjęciami     | Oczekuje na użytkownika                                     |
| P-05          | Warunki umowne Netlify/DPA właściwe dla konta, lista procesorów i mechanizm transferu mający zastosowanie w dniu wydania           | Do potwierdzenia w dokumentacji konta i przeglądzie prawnym |
| P-06          | Akceptacja kompletnej treści poniżej po uzupełnieniu P-01–P-05                                                                     | Brak; nie uznawać za udzieloną                              |

## Projekt do uzupełnienia i zatwierdzenia

### 1. Administrator i kontakt

Administratorem danych związanych z korzystaniem z OfertaStudio.pl jest **[P-01]**. W sprawach danych możesz skontaktować się pod adresem **[P-02]**. Dane identyfikacyjne mają wskazywać rzeczywistego administratora; sama marka OfertaStudio.pl nie zastępuje jego tożsamości.

### 2. Jakie dane przetwarzamy

Gdy przesyłasz zapytanie, otrzymujemy podane imię lub nazwę firmy, e-mail, treść wiadomości i ewentualny link do produktu lub zdjęcia. Nie wymagamy numeru telefonu ani adresu zamieszkania w formularzu. Formularz nie przesyła plików zdjęciowych; nie pobiera też automatycznie zawartości linków. Nie przesyłaj szczególnych kategorii danych ani cudzych danych osobowych, jeśli nie są potrzebne do zapytania.

Przy połączeniu ze stroną dostawca hostingu może przetwarzać dane techniczne, np. adres IP, czas i parametry żądania oraz informacje o przeglądarce. Rzeczywisty zakres logów i ich retencję należy potwierdzić dla używanego planu hostingu.

### 3. Cele i podstawy

Proponowana kwalifikacja do zatwierdzenia: przygotowanie oferty na żądanie osoby, która może zawrzeć umowę, opiera się na art. 6 ust. 1 lit. b RODO. Obsługa pozostałej korespondencji, w tym kontaktu z przedstawicielem firmy, może opierać się na prawnie uzasadnionym interesie prowadzenia korespondencji biznesowej (lit. f). Bezpieczeństwo i ograniczanie spamu wymagają osobnej oceny uzasadnionego interesu. Nie wprowadzamy zgody marketingowej, ponieważ strona nie prowadzi marketingowej bazy zgód.

Jeśli późniejsze zamówienie powoduje obowiązek wystawienia/przechowywania dokumentów, odrębna informacja powinna określić właściwy obowiązek prawny i okres retencji. Nie dopisujemy tutaj niepotwierdzonej księgowości, CRM ani automatyzacji.

### 4. Odbiorcy i Netlify

Hosting i techniczną obsługę formularza zapewnia Netlify, Inc. Dostawca przetwarza dane zgodnie z właściwą umową i warunkami powierzenia. Do danych mogą mieć dostęp upoważnione osoby administratora oraz faktycznie wykorzystywani dostawcy wskazani w **[P-04]**. Nie należy deklarować wysyłki e-mail, jeśli odbiorca i integracja nie są skonfigurowane.

Dokumentacja Netlify opisuje filtrowanie spamu przez Akismet. Aktualną listę podprocesorów i ich lokalizacje należy zweryfikować w [Netlify Trust Center](https://www.netlify.com/trust-center/).

### 5. Transfery poza EOG

Nie deklarujemy wyłącznego przetwarzania w UE. [DPA Netlify z 9 czerwca 2026](https://www.netlify.com/pdf/netlify-dpa.pdf) przewiduje transfery poza EOG. Sekcja 14 opisuje EU–US Data Privacy Framework oraz mechanizmy zastępcze, w tym standardowe klauzule umowne. W finalnym dokumencie trzeba wskazać mechanizm faktycznie stosowany na podstawie obowiązującej umowy i aktualnego statusu dostawcy; **[P-05]** nie jest jeszcze potwierdzone. Administrator musi zapewnić sposób uzyskania informacji o stosowanych zabezpieczeniach.

### 6. Okresy przechowywania

Zapytania niezakończone zamówieniem: **[P-03 — konkretny okres lub obiektywne kryterium]**. Materiały produktowe i korespondencja związane z realizacją: **[P-03]**. Logi i kopie techniczne: **[P-03 / ustalenia z dostawcą]**. Nie zakładamy automatycznego usuwania przez Netlify; ustalone okresy muszą mieć rzeczywistą procedurę wykonania także w poczcie i kopiach.

### 7. Twoje prawa

W granicach właściwych przepisów możesz żądać dostępu do danych, ich sprostowania, usunięcia lub ograniczenia przetwarzania. Przy przetwarzaniu opartym na uzasadnionym interesie możesz wnieść sprzeciw z przyczyn dotyczących swojej sytuacji. Prawo do przenoszenia ma zastosowanie przy spełnieniu ustawowych warunków, w szczególności do automatycznego przetwarzania na podstawie umowy lub zgody. Jeśli w przyszłości wprowadzimy przetwarzanie na podstawie zgody, będziesz mógł ją wycofać bez wpływu na wcześniejsze zgodne z prawem działania. Możesz złożyć skargę do Prezesa UODO. Sposób kontaktu w celu realizacji praw: **[P-02]**.

### 8. Dobrowolność, automatyczne decyzje, cookies

Przesłanie zapytania jest dobrowolne. Dane kontaktowe i opis umożliwiają odpowiedź; link do produktu jest opcjonalny. Kod strony nie podejmuje decyzji o skutkach prawnych w sposób wyłącznie zautomatyzowany ani nie profiluje użytkowników marketingowo. Automatyczny filtr antyspamowy może odrzucić zgłoszenie; należy zapewnić rzeczywisty alternatywny kontakt **[P-02]**.

Aplikacja nie ustawia cookies analitycznych ani reklamowych. Nie korzysta z zewnętrznych fontów, pikseli czy embedów. Nie dodano banera zgód dla nieistniejących trackerów. Zmiana funkcji lub konfiguracji hostingu wymaga aktualizacji tej informacji.

### 9. Bezpieczeństwo i aktualizacje

Połączenie ze stroną i formularzem wykorzystuje HTTPS. Dostęp do zapytań powinien być ograniczony do upoważnionych osób. Szczegóły tej organizacji i cyklu usuwania muszą odpowiadać **[P-03/P-04]**. Nie obiecujemy absolutnego bezpieczeństwa ani nieweryfikowanych certyfikatów administratora. Datę obowiązywania należy nadać przy zatwierdzeniu finalnej wersji.

## Podstawa przeglądu i akceptacja

Przygotowano strukturę według art. 5, 6, 13, 15–22 i 44–49 [RODO — EUR-Lex](https://eur-lex.europa.eu/eli/reg/2016/679), z pomocniczym dostępem do [pierwotnego tekstu rozporządzenia w urzędowym repozytorium](https://www.legislation.gov.uk/eur/2016/679/pdfs/eur_20160679_2016-05-04_en.pdf). To projekt do zatwierdzenia, nie potwierdzenie zgodności prawnej. Podstawy prawne, retencja, status administratora, zakres dalszej pracy nad zdjęciami i transfery wymagają oceny administratora, a w razie wątpliwości prawnika znającego rzeczywisty proces.

Po uzupełnieniu wszystkich faktów należy przedstawić użytkownikowi kompletny tekst do akceptacji. Dopiero po akceptacji zastąpić treść podglądową `/prywatnosc`, zapisać wersję/dokumentację zgody w repozytorium i ustawić `privacyNotice.approved=true`. Samo ustawienie zmiennej środowiskowej nie zatwierdza dokumentu.
