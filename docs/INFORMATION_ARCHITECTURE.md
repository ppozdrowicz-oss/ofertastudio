# Architektura informacji OfertaStudio

## Cel i zasada organizacji

Architektura prowadzi użytkownika od sytuacji biznesowej do właściwego zakresu, dowodu i następnego kroku. Pięć filarów obejmuje cały katalog kompetencji, ale tylko trzy najbardziej rozpoznawalne obszary są eksponowane bezpośrednio w głównym menu. Pozostałe pozostają łatwo dostępne przez „Ofertę”, stronę główną, stopkę i linkowanie kontekstowe.

Rejestr tras w `src/config/routes.ts` jest źródłem adresów, a `src/content/page-registry.ts` opisuje planowane strony i ich metadata. Obecność adresu w rejestrze nie oznacza, że widok został już wdrożony.

## Finalna mapa witryny

```text
/
├── strony-internetowe
│   ├── strony-firmowe
│   ├── landing-page
│   ├── modernizacja-strony
│   └── opieka-nad-strona
├── sklepy-internetowe
│   ├── sklepy-shoper
│   ├── konfiguracja-shopera
│   ├── personalizacja-szablonu-shoper
│   ├── rozwoj-i-ux-sklepu
│   └── opieka-nad-sklepem
├── allegro-i-marketplace
│   ├── tworzenie-ofert-allegro
│   ├── optymalizacja-ofert-allegro
│   └── oferty-olx
├── prezentacja-produktu
│   ├── zdjecia-produktowe
│   ├── grafiki-produktowe
│   └── opisy-produktowe
├── audyty-i-rozwoj
│   ├── audyt-strony-internetowej
│   ├── audyt-sklepu-internetowego
│   ├── audyt-shopera
│   ├── audyt-ofert-allegro
│   ├── konsultacja-sprzedazy-online
│   └── stala-opieka-i-rozwoj
├── realizacje
│   └── [slug]
├── oferta
├── jak-pracujemy
├── o-nas
├── kontakt
├── brief
├── polityka-prywatnosci
└── polityka-cookies
```

Mapa obejmuje 35 adresów statycznych i jeden wzorzec dynamiczny realizacji. Na etapie 2 działa techniczna strona `/` oraz własna strona 404. Pozostałe adresy są kontraktem dla kolejnych etapów; nie utworzono kilkudziesięciu pustych widoków.

## Hierarchia usług

### 1. Strony internetowe

- strony firmowe i usługowe,
- landing page,
- modernizacja strony,
- opieka nad stroną.

Filar odpowiada na szeroką intencję „tworzenie stron internetowych” i pomaga wybrać wariant. Strona firmowa nie duplikuje filaru: skupia się na prezentacji firmy, usługach, wiarygodności i pozyskiwaniu zapytań.

### 2. Sklepy internetowe i Shoper

- sklepy Shoper,
- konfiguracja Shopera,
- personalizacja szablonu Shoper,
- rozwój i UX sklepu,
- opieka nad sklepem.

Konfiguracja płatności, dostaw, domen i aplikacji jest zakresem strony „Konfiguracja Shopera”, a nie zbiorem osobnych podstron. „Szablony Shoper” i „modyfikacja szablonu” zostały połączone w naturalniejszą usługę „Personalizacja szablonu Shoper”. UX i rozwój istniejącego sklepu tworzą jeden zakres wdrożeniowy, ponieważ zwykle wynikają z tej samej diagnozy.

### 3. Allegro i marketplace

- tworzenie ofert Allegro,
- optymalizacja ofert Allegro,
- oferty OLX.

Audyt Allegro należy do filaru „Audyt i rozwój”, ale jest dostępny również z submenu Allegro. Zdjęcia i opisy dla Allegro nie otrzymują osobnych stron kanałowych. Ich intencje są obsługiwane na stronach zdjęć i opisów produktowych z sekcjami zastosowań dla marketplace. Ogranicza to powielanie treści i kanibalizację.

### 4. Prezentacja produktu

- zdjęcia produktowe i obróbka,
- grafiki produktowe oraz infografiki,
- opisy i treści produktowe.

Filar pokazuje komplet galerii sprzedażowej i łączy materiały dla sklepu, strony oraz marketplace. Podstrony odpowiadają odrębnym kompetencjom produkcyjnym.

### 5. Audyt i rozwój

- audyt strony internetowej,
- audyt sklepu internetowego,
- audyt Shopera,
- audyt ofert Allegro,
- konsultacja sprzedaży online,
- stała opieka i rozwój ekosystemu.

Filar jest punktem wejścia dla klienta z istniejącym rozwiązaniem albo niejasnym problemem. Opieka nad pojedynczą stroną lub sklepem pozostaje przy odpowiednim kanale; „stała opieka i rozwój” dotyczy współpracy wielokanałowej lub strategicznego backlogu.

## Nawigacja desktopowa

Główny poziom ma sześć pozycji oraz jedno CTA:

1. **Strony** — megamenu:
   - Strony internetowe,
   - Strony firmowe,
   - Landing page,
   - Modernizacja strony,
   - Opieka nad stroną.
2. **Sklepy i Shoper** — megamenu:
   - Sklepy internetowe,
   - Sklepy Shoper,
   - Konfiguracja Shopera,
   - Personalizacja szablonu,
   - Rozwój i UX sklepu,
   - Opieka nad sklepem,
   - Audyt sklepu.
3. **Allegro** — mniejsze submenu:
   - Allegro i marketplace,
   - Tworzenie ofert Allegro,
   - Optymalizacja ofert Allegro,
   - Audyt ofert Allegro,
   - Oferty OLX,
   - Zdjęcia, grafiki i opisy.
4. **Realizacje**.
5. **Oferta** — submenu:
   - Pełna oferta,
   - Prezentacja produktu,
   - Audyt i rozwój,
   - Jak pracujemy.
6. **O nas**.

**CTA nagłówka:** „Porozmawiajmy o projekcie” prowadzące do `/kontakt`.

Wybrano CTA rozmowy, ponieważ pasuje do projektu, audytu i stałej współpracy, a jednocześnie jest bardziej partnerskie niż „Wyceń projekt”. „Kontakt” nie jest osobną pozycją głównego menu, ponieważ identyczny cel realizuje stale widoczne CTA. Link pozostaje w stopce i innych kontekstach.

## Nawigacja mobilna

- Zachowuje tę samą kolejność i te same etykiety co desktop.
- Pozycje „Strony”, „Sklepy i Shoper”, „Allegro” i „Oferta” rozwijają listy w akordeonie.
- Kliknięcie etykiety nadrzędnej musi umożliwiać wejście na stronę filaru; kontrolka rozwijająca powinna być oddzielnie dostępna dla klawiatury i czytnika ekranu.
- Otwarty może być jeden lub więcej paneli — decyzja wizualna należy do etapu 4, ale stan nie może blokować dostępu do linków.
- CTA „Porozmawiajmy o projekcie” jest widoczne w stałej części panelu albo bezpośrednio po liście głównej, przed linkami prawnymi.
- Zamknięcie działa przez przycisk, klawisz `Escape` i powrót fokusu do elementu otwierającego.
- Kontakt i brief są dostępne również jako linki pomocnicze.

## Stopka

Stopka porządkuje linki w trzech grupach:

- **Usługi:** wszystkie pięć filarów,
- **Studio:** realizacje, oferta, proces, o nas, kontakt i brief,
- **Informacje prawne:** polityka prywatności i polityka cookies.

Stopka zapewnia alternatywną drogę do filarów, które nie są samodzielnymi pozycjami w głównym menu.

## Breadcrumbs

- Nie pokazujemy breadcrumbs na stronie głównej.
- Filar: `Strona główna → Strony internetowe`.
- Usługa: `Strona główna → Strony internetowe → Strony firmowe`.
- Audyt dostępny z kilku menu zachowuje jednego rodzica kanonicznego: `Strona główna → Audyt i rozwój → Audyt sklepu internetowego`.
- Realizacja: `Strona główna → Realizacje → Nazwa projektu`.
- Etykiety są nazwami stron, a nie surowymi fragmentami URL.
- Ostatni element wskazuje bieżącą stronę i nie musi być linkiem.
- Dane strukturalne breadcrumbs zostaną wdrożone w etapie 12; widoczna nawigacja powstanie wraz z layoutem i podstronami.

## Zależności i linkowanie wewnętrzne

```text
Strona główna
├── pięć filarów
│   ├── usługi szczegółowe
│   │   ├── adekwatne realizacje
│   │   ├── maksymalnie trzy usługi uzupełniające
│   │   └── kontakt, brief albo właściwy audyt
│   └── audyt lub konsultacja, gdy problem jest niejasny
└── realizacje
    ├── użyte usługi
    └── następny krok konwersji
```

Reguły:

- strona główna linkuje bezpośrednio do wszystkich filarów,
- filar linkuje do każdej własnej usługi i do jednego logicznego wejścia diagnostycznego,
- usługa linkuje do potwierdzonych realizacji i najwyżej trzech uzupełnień z uzasadnieniem,
- realizacja linkuje do usług rzeczywiście wykonanych w projekcie,
- audyt linkuje do usług wdrożeniowych, które mogą realizować rekomendacje,
- przyszły artykuł linkuje do jednej podstawowej usługi zgodnej z intencją i, jeśli potrzebne, do materiału wspierającego,
- FAQ linkuje opisowym tekstem tylko wtedy, gdy pełna odpowiedź znajduje się na innej stronie,
- każda strona oferuje drogę powrotną przez breadcrumbs lub nawigację oraz jeden następny krok.

## Struktura strony głównej

Na etapie 2 powstaje tylko model informacyjny. Finalny widok zostanie zaprojektowany później.

|   # | Sekcja               | Cel                                                    | Najważniejszy komunikat                                                     | Typ treści                                            | CTA i połączenia                   | Rola w konwersji                             |
| --: | -------------------- | ------------------------------------------------------ | --------------------------------------------------------------------------- | ----------------------------------------------------- | ---------------------------------- | -------------------------------------------- |
|   1 | Hero                 | Natychmiast wyjaśnić kategorię i zakres.               | Łączymy stronę, sklep i prezentację oferty w jeden system sprzedaży online. | H1, lead, dwa CTA, oszczędny motyw.                   | Rozmowa; realizacje.               | Orientacja i start głównej ścieżki.          |
|   2 | Krótki proof bar     | Pokazać praktyczne specjalizacje bez fikcyjnych liczb. | Strategia, UX, Shoper, marketplace i treści pracują razem.                  | Zweryfikowane kompetencje; docelowo prawdziwe dowody. | Bez CTA.                           | Redukcja obawy przed przypadkowym wykonawcą. |
|   3 | Główne obszary usług | Dać pięć zrozumiałych punktów wejścia.                 | Możesz zacząć od kanału albo diagnozy systemu.                              | Pięć kart filarów opisanych problemem.                | Linki do pięciu filarów.           | Segmentacja według potrzeby.                 |
|   4 | Problemy klientów    | Pomóc rozpoznać własną sytuację.                       | Niespójne kanały bywają jednym problemem prezentacji.                       | Krótkie scenariusze.                                  | „Opisz swoją sytuację” → `/brief`. | Przechwycenie niezdecydowanych.              |
|   5 | Specjalizacja Shoper | Wyeksponować wyróżniającą kompetencję.                 | Znamy konfigurację, szablon, mobile, UX i opiekę.                           | Zakres oraz typowe scenariusze.                       | Diagnoza; Shoper; audyt Shopera.   | Zaufanie ruchu platformowego.                |
|   6 | Sposób pracy         | Wyjaśnić odpowiedzialność i etapy.                     | Najpierw diagnozujemy, potem projektujemy i wdrażamy.                       | Pięć kroków z rezultatem.                             | `/jak-pracujemy`.                  | Redukcja ryzyka współpracy.                  |
|   7 | Wybrane realizacje   | Pokazać prawdziwy dowód pracy.                         | Pokazujemy problem, decyzje i efekt, nie tylko obraz.                       | Kilka zweryfikowanych case studies.                   | „Zobacz realizacje”.               | Dowód przed kontaktem.                       |
|   8 | Efekty współpracy    | Przełożyć zakres na wartość.                           | Rezultatem jest czytelność, spójność i kontrola rozwoju.                    | Korzyści bez gwarancji i fikcyjnych procentów.        | Link do oferty.                    | Uzasadnienie wartości projektu.              |
|   9 | Dla kogo pracujemy   | Potwierdzić dopasowanie segmentów.                     | Zakres zależy od dojrzałości, kanałów i materiałów.                         | Sześć sytuacji biznesowych.                           | „Opisz swoją sytuację”.            | Samokwalifikacja.                            |
|  10 | Modele współpracy    | Rozróżnić projekt, audyt i opiekę.                     | Możesz wybrać wdrożenie, diagnozę lub rozwój.                               | Trzy modele, zasady wyceny i granice.                 | Rozmowa; oferta; stała opieka.     | Urealnienie oczekiwań.                       |
|  11 | Audyt lub diagnoza   | Zapewnić bezpieczne wejście przy niejasnym problemie.  | Krótka diagnoza pomaga wybrać pierwszy krok.                                | Różnica między kwalifikacją a płatnym audytem.        | Diagnoza; filar audytów.           | Obniżenie progu wejścia.                     |
|  12 | FAQ                  | Usunąć bariery zakresu, ceny i procesu.                | Zakres i odpowiedzialności ustalamy przed wyceną.                           | 5–8 konkretnych pytań.                                | Kontakt; oferta.                   | Ostatnie wyjaśnienia przed konwersją.        |
|  13 | Końcowe CTA          | Zamknąć narrację jednym krokiem.                       | Opowiedz nam o projekcie, celu i obecnej sytuacji.                          | Krótki komunikat i dwa poziomy CTA.                   | Rozmowa; opis sytuacji.            | Główna konwersja po pełnej narracji.         |

## Model podstrony usługi

|   # | Sekcja                    | Status      | Zasada                                                                 |
| --: | ------------------------- | ----------- | ---------------------------------------------------------------------- |
|   1 | Hero usługi               | obowiązkowa | Nazywa usługę, odbiorcę, rezultat i CTA.                               |
|   2 | Problem klienta           | obowiązkowa | Pokazuje objawy i konsekwencje bez straszenia.                         |
|   3 | Oczekiwany rezultat       | obowiązkowa | Wyjaśnia, co klient otrzymuje i może zrobić dalej.                     |
|   4 | Zakres usługi             | obowiązkowa | Rozdziela prace, materiały wejściowe i elementy poza zakresem.         |
|   5 | Proces                    | obowiązkowa | Zawiera 3–5 kroków, rezultat etapu i rolę klienta.                     |
|   6 | Wyróżniki OfertaStudio    | obowiązkowa | Pokazuje tylko przewagi istotne dla tej usługi.                        |
|   7 | Przykłady zastosowań      | warunkowa   | Dodawana przy co najmniej dwóch istotnie różnych scenariuszach zakupu. |
|   8 | Powiązane realizacje      | warunkowa   | Renderowana tylko dla prawdziwej, adekwatnej realizacji.               |
|   9 | Pakiety lub sposób wyceny | obowiązkowa | Pakiety tylko dla powtarzalnego zakresu; inaczej czynniki wyceny.      |
|  10 | FAQ                       | obowiązkowa | 3–6 pytań specyficznych dla usługi.                                    |
|  11 | Powiązane usługi          | obowiązkowa | Maksymalnie trzy relacje z uzasadnieniem.                              |
|  12 | Końcowe CTA               | obowiązkowa | Rozmowa, brief albo właściwy audyt zależnie od intencji.               |

Zakres poszczególnych sekcji może być skrócony, ale ich rola nie powinna być duplikowana w kilku miejscach. Brak realizacji oznacza pominięcie modułu, a nie użycie fikcyjnego placeholdera marketingowego.

## Model realizacji i case study

Każda opublikowana realizacja zawiera:

- nazwę i unikalny slug,
- kategorię główną oraz opcjonalne kategorie dodatkowe,
- krótki opis,
- stan początkowy i problem,
- zakres prac,
- opis procesu,
- zastosowane rozwiązania,
- efekt jakościowy lub potwierdzone dane,
- galerię z opisami alternatywnymi,
- dane „przed i po” tylko wtedy, gdy są dostępne i porównywalne,
- technologię lub platformę,
- opinię klienta wyłącznie za potwierdzoną zgodą,
- rzeczywiście powiązane usługi,
- jedno CTA.

Kategorie:

- strona internetowa,
- sklep internetowy,
- Shoper,
- Allegro,
- zdjęcia produktowe,
- branding sprzedażowy,
- projekt własny.

Projekt w kodzie ma status `planned` albo `published`. Wpis `published` wymaga pełnych danych case study. Tablica realizacji pozostaje pusta do czasu otrzymania prawdziwych materiałów.
