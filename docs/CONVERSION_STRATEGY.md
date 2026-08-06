# Strategia konwersji OfertaStudio

## Rola strony

Strona ma kwalifikować potrzeby, budować wiarygodność i prowadzić do rozmowy o właściwym zakresie. Nie powinna wymuszać natychmiastowej wyceny bez kontekstu ani obiecywać wyniku sprzedażowego, którego nie da się zagwarantować.

## Cele biznesowe

1. Pozyskiwać dopasowane zapytania o strony, sklepy, Shoper, marketplace i prezentację produktu.
2. Zwiększać udział projektów łączących więcej niż jedną kompetencję studia.
3. Budować pozycję OfertaStudio jako partnera od sprzedaży internetowej, a nie wyłącznie ofert Allegro.
4. Ułatwiać wejście klientom z niejasnym problemem przez krótki brief diagnostyczny.
5. Tworzyć podstawę do stałej opieki i etapowego rozwoju po wdrożeniu.

## Konwersje

### Główne

- wysłanie zapytania o konkretny projekt przez `/kontakt`,
- przesłanie briefu kwalifikacyjnego przez `/brief`,
- umówienie kolejnego kroku po zakwalifikowaniu zapytania.

### Pomocnicze

- przejście z usługi do adekwatnej realizacji,
- przejście do szczegółowego audytu,
- zapoznanie się z procesem lub modelem współpracy,
- użycie danych kontaktowych po zapoznaniu się z ofertą,
- powrót z case study do powiązanej usługi.

## Segmenty konwersyjne

| Segment                        | Punkt wejścia                       | Najważniejsza bariera                                        | Preferowany krok                               |
| ------------------------------ | ----------------------------------- | ------------------------------------------------------------ | ---------------------------------------------- |
| Lokalne firmy usługowe         | Strony firmowe                      | Brak treści, niejasny koszt i obawa przed szablonem.         | Rozmowa o projekcie.                           |
| Małe i średnie firmy handlowe  | Sklepy internetowe lub audyt sklepu | Ryzyko zmian w działającym kanale i skala katalogu.          | Diagnoza albo rozmowa zależnie od gotowości.   |
| Właściciele Shopera            | Shoper lub audyt Shopera            | Nie wiedzą, czy problemem jest konfiguracja, szablon czy UX. | Bezpłatna diagnoza kwalifikacyjna.             |
| Sprzedawcy Allegro i OLX       | Allegro lub audyt ofert             | Oczekiwanie gwarancji, niejasny zakres katalogu.             | Diagnoza na podstawie reprezentatywnych ofert. |
| Firmy rozpoczynające online    | Konsultacja sprzedaży               | Nie potrafią wybrać kanału ani przygotować specyfikacji.     | Opis sytuacji w prostym briefie.               |
| Firmy z niespójnym ekosystemem | Audyt i rozwój                      | Skala zmian i brak właściciela priorytetów.                  | Rozmowa o diagnozie i etapowym planie.         |

## System CTA

| Id                     | Komunikat                      | Adres         | Zastosowanie                                                                               |
| ---------------------- | ------------------------------ | ------------- | ------------------------------------------------------------------------------------------ |
| `project-conversation` | Porozmawiajmy o projekcie      | `/kontakt`    | Główne CTA witryny dla użytkownika, który potrafi opisać projekt lub zakres.               |
| `free-diagnosis`       | Zacznij od bezpłatnej diagnozy | `/brief`      | Krótka kwalifikacja problemu; nie jest pełnym audytem ani darmową konsultacją wdrożeniową. |
| `view-projects`        | Zobacz realizacje              | `/realizacje` | Dowód przed decyzją i drugorzędne CTA w hero lub usługach.                                 |
| `contact`              | Skontaktuj się                 | `/kontakt`    | Neutralny link w FAQ, stopce i miejscach bez narracji projektowej.                         |
| `need-guidance`        | Opisz swoją sytuację           | `/brief`      | Dla osoby, która nie zna nazwy usługi albo jest na początku decyzji.                       |

### Zasady użycia

- „Porozmawiajmy o projekcie” jest jedynym globalnym CTA nagłówka i podstawowym zakończeniem stron o dojrzałej intencji komercyjnej.
- `/kontakt` służy osobie, która zna cel, ma konkretny projekt lub chce omówić stałą współpracę.
- `/brief` służy kwalifikacji niejasnej potrzeby. Formularz pyta językiem problemów biznesowych, nie wymaga specyfikacji technicznej.
- Strona konkretnego audytu jest właściwym krokiem, gdy użytkownik zna obszar diagnozy i potrzebuje opisu zakresu, rezultatu oraz wyceny audytu.
- „Zobacz realizacje” wspiera decyzję, ale nie zastępuje CTA kontaktowego na końcu narracji.
- W jednej sekcji pokazujemy jedno CTA główne i najwyżej jedno pomocnicze.
- Nie tworzymy nowych synonimów CTA w komponentach; zmiana systemu następuje centralnie w `src/config/ctas.ts`.

## Główne ścieżki użytkowników

### A. Klient potrzebuje strony

**Przebieg:** `/` → `/strony-internetowe` → `/strony-internetowe/strony-firmowe` lub inna właściwa usługa → `/realizacje/[slug]` → `/kontakt`.

- **Intencja:** zbudować pierwszą profesjonalną stronę albo zastąpić obecną.
- **Bariery:** brak treści, obawa przed generycznym szablonem, niejasny koszt i rola klienta.
- **Zaufanie:** adekwatne case study, proces, jawny zakres i czynniki wyceny.
- **Główne CTA:** „Porozmawiajmy o projekcie”.
- **Drugorzędne CTA:** „Zobacz realizacje”.
- **Informacje przed konwersją:** cel strony, usługi firmy, stan materiałów, termin i kontekst budżetowy.

### B. Klient ma sklep Shoper

**Przebieg:** `/` → `/sklepy-internetowe` → konfiguracja, personalizacja, UX, opieka albo audyt Shopera → realizacja → `/brief`.

- **Intencja:** uruchomić, skonfigurować lub poprawić działający sklep.
- **Bariery:** ryzyko zmian, brak diagnozy źródła problemu, ograniczenia platformy.
- **Zaufanie:** konkretna specjalizacja Shoper, kontrolowany proces wdrożenia, jawne ograniczenia platformy.
- **Główne CTA:** „Zacznij od bezpłatnej diagnozy”.
- **Drugorzędne CTA:** „Zobacz realizacje”.
- **Informacje przed konwersją:** adres sklepu, szablon, najważniejsze problemy, aplikacje i integracje.

### C. Sprzedawca Allegro

**Przebieg:** `/` → `/allegro-i-marketplace` → audyt lub tworzenie/optymalizacja ofert → przykłady → `/brief`.

- **Intencja:** poprawić ofertę albo zbudować standard dla katalogu.
- **Bariery:** oczekiwanie gwarantowanego wzrostu, nieznana skala katalogu, mylenie audytu z wykonaniem.
- **Zaufanie:** przykłady galerii, opis decyzji, oddzielony rezultat audytu i spójny proces materiałów.
- **Główne CTA:** „Zacznij od bezpłatnej diagnozy”.
- **Drugorzędne CTA:** „Zobacz realizacje”.
- **Informacje przed konwersją:** linki do ofert, liczba produktów i wariantów, dostępne materiały, odpowiedzialność za publikację.

### D. Klient nie wie, czego potrzebuje

**Przebieg:** `/` → `/brief` → rekomendowana konsultacja lub usługa → `/kontakt`.

- **Intencja:** nazwać problem i znaleźć pierwszy sensowny krok.
- **Bariery:** brak języka technicznego, obawa przed zbyt dużym zakresem, brak wiedzy o potrzebnych materiałach.
- **Zaufanie:** krótki brief problemowy, jawne rozróżnienie kwalifikacji od audytu, rekomendacja bez presji.
- **Główne CTA:** „Opisz swoją sytuację”.
- **Drugorzędne CTA:** „Skontaktuj się”.
- **Informacje przed konwersją:** obecna sytuacja, cel, istniejące kanały i największa trudność.

### E. Klient szuka stałej współpracy

**Przebieg:** usługa lub `/oferta` → `/audyty-i-rozwoj` → `/audyty-i-rozwoj/stala-opieka-i-rozwoj` → `/kontakt`.

- **Intencja:** zapewnić regularny rozwój jednego kanału albo całego ekosystemu.
- **Bariery:** niejasny czas reakcji, abonament bez zakresu, brak zasad priorytetów.
- **Zaufanie:** jawny backlog, odpowiedzialności i wyłączenia, sposób raportowania i akceptacji.
- **Główne CTA:** „Porozmawiajmy o projekcie”.
- **Drugorzędne CTA:** „Skontaktuj się”.
- **Informacje przed konwersją:** technologie, rodzaj zadań, oczekiwana dostępność i obecny podział odpowiedzialności.

## Bariery i elementy zaufania

| Bariera                                         | Odpowiedź w treści i UX                                                                   |
| ----------------------------------------------- | ----------------------------------------------------------------------------------------- |
| „Nie wiem, czego potrzebuję.”                   | Segmentacja przez problemy, prosty brief i jasna rekomendacja następnego kroku.           |
| „Nie mam gotowych treści lub zdjęć.”            | Wyjaśnienie, które materiały może przygotować studio i co musi dostarczyć klient.         |
| „Nie znam ceny ani zakresu.”                    | Czynniki wyceny, przykładowe granice zakresu i potwierdzenie przed rozpoczęciem.          |
| „Zmiany mogą zaszkodzić działającej sprzedaży.” | Etapy, kopie, środowisko testowe tam, gdzie możliwe, plan publikacji i odpowiedzialności. |
| „Nie chcę kolejnego generycznego wykonawcy.”    | Prawdziwe case studies opisujące problem i decyzje, specjalizacja Shoper i marketplace.   |
| „Czy to zagwarantuje sprzedaż?”                 | Uczciwe rozdzielenie wpływu UX i prezentacji od ceny, popytu, ruchu i operacji klienta.   |
| „Co wydarzy się po wdrożeniu?”                  | Dokumentacja przekazania, wariant opieki i jasno opisany kolejny krok.                    |

Elementy zaufania muszą być prawdziwe: case studies, proces, przykłady zakresu, kompetencje, zasady współpracy, podpisane opinie i potwierdzone dane. Brak logotypów lub liczb nie może być maskowany atrapą.

## Zasady formularzy

- Formularz pyta tylko o dane niezbędne do obsługi danego kroku.
- Każde pole ma widoczną etykietę, opis formatu, czytelny błąd i poprawną obsługę klawiatury.
- Pola opcjonalne są oznaczone; nie wymagamy telefonu, jeśli e-mail wystarczy do pierwszej odpowiedzi.
- `/kontakt` zbiera cel, orientacyjny zakres, etap, preferowany kontakt i bezpieczne dane kontaktowe.
- `/brief` zaczyna od sytuacji i problemu, następnie pyta o kanały, materiały, termin oraz kontekst budżetowy w sposób dopuszczający „nie wiem”.
- Zgody prawne są odrębne od zgód marketingowych i nie są domyślnie zaznaczone.
- Przed wysłaniem użytkownik wie, co stanie się dalej i jaki jest realny sposób odpowiedzi. Czas odpowiedzi zostanie podany dopiero po potwierdzeniu operacyjnym.
- Nie prosimy o hasła, dane dostępowe ani poufne załączniki w formularzu wstępnym.

## Pomiar sukcesu w późniejszym etapie

Analityka zostanie zaprojektowana w etapie 12 po wyborze narzędzia i modelu zgód. Minimalny plan zdarzeń powinien obejmować:

- rozpoczęcie i poprawne wysłanie formularza kontaktowego,
- rozpoczęcie i poprawne wysłanie briefu,
- kliknięcie głównego CTA z lokalizacją komponentu,
- przejście usługa → realizacja oraz realizacja → usługa,
- przejście filar → usługa szczegółowa,
- kliknięcie danych kontaktowych,
- błędy i porzucenie formularza mierzone bez treści pól.

Oceniamy jakość, nie tylko liczbę leadów. Docelowe wskaźniki to udział zapytań kwalifikowanych, kompletność briefu, przejścia do właściwego filaru, skuteczność kontaktu i udział powracających klientów. Nie ustalamy fikcyjnych benchmarków przed zebraniem danych bazowych.
