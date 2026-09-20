# OfertaStudio 2.0 — Problem Explorer

## Zakres

Wdrożenie briefu właściciela z 19 września 2026. Edycja istniejącej statycznej strony głównej; bez zmiany routingu Next.js, cen, domeny ani odbiorcy powiadomień Netlify.

Narracja: hero → rozpoznanie problemu → możliwe przyczyny / sprawdzenie / rozwiązanie / rezultat → pokaz przed/po → zakres (w tym Shoper) → cztery etapy → ceny → checklista → studio → FAQ → kontakt.

## Źródła i zmienione pliki

- `public/ofertastudio/problems.js`: jedyny redagowany model 10 problemów i zatwierdzonych historii.
- `public/ofertastudio/problem-view.js`: wspólne renderowanie diagnozy i escaping.
- `scripts/build-homepage.mjs`: generuje oznaczone fragmenty `index.html`: slajdy, pierwszą diagnozę, select i prawdziwe historie. Uruchamia się przed buildem. Nie edytować ręcznie fragmentów `generated:*`.
- `public/ofertastudio/explorer.js`: interakcje, hash, powiązanie formularza, checklista i hooki.
- `public/ofertastudio/explorer.css`: karuzela i diagnoza, bazujące na istniejących zielonych tokenach.
- `public/ofertastudio/app.js`: istniejące menu, porównanie, dialogi, pakiety, sticky CTA oraz obsługa formularza.
- `public/ofertastudio/index.html`: narracja, semantyka, formularz i wygenerowane treści.
- `public/ofertastudio/styles.css`: usunięte nieużywane style starych kart problemów.
- `package.json`: generowanie i sprawdzanie statycznych treści.
- `scripts/check-homepage-browser.mjs`: powtarzalna regresja w przeglądarce.
- Dokumentacja: `HOMEPAGE_EXPLORER.md`, `HOMEPAGE_DEPLOYMENT.md`, `ROADMAP.md`, `INFORMATION_ARCHITECTURE.md`, `SEO_CONTENT_MAP.md`, `CONTENT_GUIDELINES.md`.

Po zmianie danych uruchom `npm run homepage:generate`. `npm run homepage:check` wykrywa rozbieżność modelu i HTML. Treść wszystkich slajdów jest w początkowym dokumencie, bez pobierania danych. Bez JavaScriptu pozostają natywne przewijanie kart, formularz i treści; przyciski wymagające JavaScriptu są ukryte.

## UX i dostępność

Karuzela nie ma autoplay ani zależności. Karty mają scroll snap; desktop pokazuje 86% szerokości kontenera, telefon 88vw. Natywny swipe i poziomy trackpad pozostają pod kontrolą przeglądarki. Mysz może przeciągać zawartość, a dwa opisane przyciski i klawisze strzałek przełączają slajdy. Home / End wybierają pierwszy / ostatni. Numer, linia postępu i `aria-live` komunikują pozycję. Slajdy mają `role=group`, opis „slajd” i nazwę z numerem oraz tytułem. Tab prowadzi do CTA aktywnego slajdu; Enter otwiera diagnozę z przeniesieniem fokusu na nagłówek. Brak pułapki fokusu.

Ruch przycisków trwa 500 ms. Reduced motion wyłącza animację przewijania i paska postępu. Resize zachowuje aktywny problem. Zmiana hasha, bezpośrednie wejście oraz historia przeglądarki odtwarzają właściwy stan. `#shoper` należy do problemu; zakres usługi ma `#sklepy-shoper`.

## Formularz

Pola Netlify zachowane: `form-name`, `url`, `problem`, `message`, `email`, `package`, `bot-field`. Dodano statyczne pole ukryte `problem-id`, aby wykrywanie formularzy widziało je podczas deployu. `problem` zawiera czytelny tytuł, `problem-id` stabilny identyfikator. Wybranie scenariusza pokazuje jego nazwę i ukrywa powtórne pytanie. „Zmień problem” przywraca select i focus. Kliknięcie pakietu nie nadpisuje rozpoznanego problemu. Błąd POST zachowuje dane; potwierdzony sukces resetuje wybór. Nie zmieniano prywatnego odbiorcy powiadomień ani nie publikowano jego adresu.

## Analityka

`document` emituje `CustomEvent('ofertastudio:analytics')`. `detail` zawiera tylko `event` i opcjonalnie `problem_id`. Zdarzenia: `problem_carousel_view`, `problem_slide_view`, `problem_select`, `problem_detail_open`, `solution_cta_click`, `pricing_view`, `form_start`, `form_submit`, `checklist_copy`. `form_submit` oznacza odpowiedź 2xx, nie samą próbę. Nie ma dostawcy analityki, cookies, wysyłki sieciowej ani danych wpisanych przez klienta.

## Prawdziwe realizacje i studio

`problemStories` jest puste. Generator publikuje sekcję „Historie problemów” dopiero po dodaniu rzeczywistych, zatwierdzonych danych. Wymagany rekord: `id`, `title`, `problemId`, `diagnosis`, `changes[]`, `before` i `after` z `src`, `alt`, `width`, `height`, `result`, `evidence` oraz `approved: true`. Struktura obejmuje problem → diagnozę → zmiany → przed/po → rezultat. Bez danych nie powstają publiczne atrapy, metryki ani puste SEO landing pages.

Sekcja studia opisuje wyłącznie sposób pracy podany przez właściciela. Prawdziwe zdjęcie, biografia i doświadczenie mogą później uzupełnić tę sekcję; wymagają materiałów oraz zatwierdzenia. Obecne ilustracje i porównanie butelki są pokazowe, nie są realizacjami klienta.

## Weryfikacja

Wymagane kontrole: format, lint, TypeScript, content, design, experience, build oraz `homepage:check`.

Regresja w przeglądarce: `scripts/check-homepage-browser.mjs`. Wymaga Playwright i Chromium w środowisku QA, nie dodaje ich do zależności produkcyjnych. Po `npm run build` uruchom skrypt z `PLAYWRIGHT_MODULE` (ścieżka do zainstalowanego Playwright), opcjonalnym `CHROMIUM_PATH` i `CHROMIUM_ARGS` (JSON z flagami środowiska). Domyślnie uruchamia lokalny build Next na porcie 8124; `BASE_URL` pozwala sprawdzić przygotowany serwer. Testy POST są przechwytywane lokalnie i nie wysyłają wiadomości do właściciela.

Test obejmuje wszystkie 10 slajdów przy 320, 360, 390, 430, 768, 1024, 1280, 1440 i 1920 px; snap, granice kart, CTA, brak poziomego overflow; strzałki, drag, natywne zdarzenia dotyku; bezpośrednie hashe i historię; wybór problemu oraz pakietu; zmianę wyboru; walidację, błąd i sukces formularza; klawiaturę; reduced motion; kopiowanie; menu; sticky; porównanie; FAQ; fallback bez JS; podstawowy budżet zasobów i `/design-system`.

Test nie zastępuje sprawdzenia dostarczenia e-maila ani fizycznego urządzenia z Safari. Nie jest pełnym audytem Lighthouse ani formalną certyfikacją WCAG.

### Wynik końcowy — 20 września 2026

Build i wszystkie wymagane kontrole repozytorium: **PASS**. Regresja Chromium: **18 grup testów PASS**, w tym 90 kombinacji slajd/szerokość. Sprawdzono zrzuty widoków mobilnych i desktopowych. Podstawowy pomiar: 867 elementów DOM, 11 zasobów, około 466 kB transferu w lokalnym teście. Ceny porównano z poprzednim commitem: bez zmian. Nie dodano zależności produkcyjnych ani nowych plików graficznych. Testy formularza nie wysyłały prawdziwych wiadomości.

Następny krok: uzupełnić „Historie problemów” prawdziwą realizacją oraz sekcję studia zatwierdzonym zdjęciem i krótką biografią. Po publikacji warto potwierdzić dostarczenie zgłoszenia z nowym polem `problem-id` w panelu Netlify.
