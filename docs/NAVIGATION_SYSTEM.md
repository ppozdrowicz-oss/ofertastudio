# System nawigacji OfertaStudio

## Status i cel

System nawigacji został wdrożony w etapie 4. Ma prowadzić od rozpoznawalnego obszaru problemu do właściwej usługi, bez eksponowania całego katalogu na jednym poziomie. Główny nagłówek pokazuje sześć pozycji oraz jedno dominujące CTA.

Źródłami prawdy są:

- `src/config/routes.ts` — adresy,
- `src/config/navigation.ts` — kolejność, etykiety, opisy, grupy i sposób prezentacji menu,
- `src/config/ctas.ts` — etykieta i cel CTA,
- `src/content/page-registry.ts` — centralne nazwy stron, rodzice i metadata,
- `src/lib/route-registry.ts` — wdrożone trasy techniczne i breadcrumbs.

Desktop i mobile korzystają z tej samej tablicy `headerNavigation`. Nie utrzymujemy osobnej kopii struktury mobilnej.

## Nagłówek

Kolejność głównego poziomu:

1. Strony — megamenu,
2. Sklepy i Shoper — megamenu,
3. Allegro — dropdown,
4. Realizacje — link,
5. Oferta — dropdown,
6. O nas — link,
7. Porozmawiajmy o projekcie — CTA do `/kontakt`.

„Kontakt” nie jest dodatkowym linkiem głównego poziomu, ponieważ tę samą intencję realizuje stale widoczne CTA. Pozostaje dostępny w mobile i stopce. Nie dodano top bara: na obecnym etapie nie istnieje potwierdzona informacja, która uzasadniałaby zabieranie miejsca nad nawigacją.

Tekstowy `BrandMark` prowadzi do `/`. Nie udaje finalnego logotypu i może zostać zastąpiony dopiero po zatwierdzeniu identyfikacji marki.

## Megamenu „Strony”

Menu ma dwie grupy:

### Budowa i przebudowa

- Strony internetowe,
- Strony firmowe,
- Landing page,
- Modernizacja strony.

### Opieka i diagnoza

- Opieka nad stroną,
- Audyt strony.

Krótki blok kontekstowy wyjaśnia, że zakres wynika z celu strony, materiałów i etapu firmy. Nie zawiera drugiego dominującego CTA.

## Megamenu „Sklepy i Shoper”

To najważniejszy element platformowy. Menu ma dwie grupy:

### Uruchomienie sklepu

- Sklepy internetowe,
- Sklepy Shoper,
- Konfiguracja Shopera,
- Personalizacja szablonu.

### Rozwój sklepu

- Rozwój i UX sklepu,
- Opieka nad sklepem,
- Audyt sklepu Shoper.

Blok „Specjalizacja Shoper” wyjaśnia połączenie wiedzy o platformie, UX, treści i sprzedaży mobilnej. Audyt ogólny sklepu pozostaje dostępny przez filar „Audyt i rozwój” oraz stopkę; menu Shoper prowadzi do diagnozy platformowej.

## Dropdown „Allegro”

Allegro używa mniejszego dropdownu, ponieważ pozycje tworzą jedną liniową listę, a dodatkowy podział nie skróciłby decyzji:

- Allegro i marketplace,
- Tworzenie ofert Allegro,
- Optymalizacja ofert Allegro,
- Audyt ofert Allegro,
- Oferty OLX,
- Zdjęcia, grafiki i opisy.

Ostatnia pozycja prowadzi do filaru prezentacji produktu. Nie powiela osobnych stron „zdjęcia Allegro” i „opisy Allegro”, zgodnie z decyzją o ograniczeniu kanibalizacji.

## Dropdown „Oferta”

- Pełna oferta,
- Prezentacja produktu,
- Audyt i rozwój,
- Jak pracujemy.

Dropdown udostępnia filary, które nie mieszczą się w głównym poziomie, bez rozbudowywania nagłówka do kilkunastu równorzędnych linków.

## Sterowanie desktopowe

- Próg desktopowy: `1280 px` (`xl`). Poniżej działa wariant mobilny.
- Toggle jest natywnym `button` z `aria-expanded` i `aria-controls`.
- `Enter` i `Space` korzystają z natywnej aktywacji przycisku.
- `Tab` i `Shift + Tab` przechodzą przez rzeczywiste linki w kolejności DOM.
- Przejście fokusu poza aktualny trigger i jego panel zamyka disclosure bez przestawiania fokusu.
- `Escape` zamyka panel i przywraca fokus na trigger.
- Kliknięcie poza nawigacją zamyka panel.
- Kliknięcie linku i zmiana trasy zamykają panel.
- Kontroler interakcji jest kluczowany bieżącym pathname, więc także nawigacja historią resetuje dropdown, dialog i akordeony zamiast przywracać dawny stan po powrocie do URL.
- Ukryte menu nie pozostaje w kolejności fokusu, ponieważ jest usuwane z drzewa renderowania.
- Nie zastosowano ról `menu` i `menuitem`; jest to nawigacja witryny z listami linków, a nie menu aplikacyjne.

Menu jest uruchamiane kliknięciem, więc działa myszą, dotykiem i klawiaturą. Nie zależy od hover.

## Aktywny stan

Aktywny stan jest obliczany przez `usePathname()` i `isPathActive()` tylko w małej granicy klienckiej `MainNavigation`.

- dokładny adres otrzymuje `aria-current="page"`,
- podstrona aktywuje także właściwy filar, np. `/sklepy-internetowe/sklepy-shoper` aktywuje „Sklepy i Shoper”,
- stan ma tło i widoczny znacznik liniowy lub obramowanie, więc nie opiera się wyłącznie na kolorze,
- aktywny trigger filaru zawiera dodatkową nazwę dla czytnika ekranu.

## Nawigacja mobilna

Wariant mobilny jest prawostronnym, modalnym panelem opartym na natywnym `<dialog>`:

- nagłówek zawiera wordmark i przycisk zamknięcia,
- główne filary mają oddzielny link do strony nadrzędnej i oddzielny toggle akordeonu,
- można otworzyć więcej niż jedną grupę,
- linki główne mają minimum 48 px, a linki podrzędne minimum 44 px wysokości,
- po liście znajduje się globalne CTA oraz pomocnicze linki do kontaktu i briefu,
- panel ma własny pionowy scroll i nie tworzy poziomego przewijania.

Natywny modal zapewnia focus trap i ukrywa zasłoniętą treść przed interakcją. Podczas otwarcia blokowany jest scroll `body`. `Escape`, backdrop oraz przycisk zamknięcia zamykają panel i przywracają fokus triggerowi. Po wyborze linku panel zamyka się bez przenoszenia fokusu z nowej treści z powrotem do hamburgera.

## Sticky header

- wysokość mobile: `68 px`,
- wysokość desktop: `76 px`,
- pozycja: `sticky; top: 0`,
- warstwa: `--layer-header`,
- oddzielenie: stała cienka granica i subtelny `shadow-surface`,
- brak zmiany wysokości i brak layout shift,
- brak listenera scroll oraz ciężkiego blur.

Stałe, subtelne oddzielenie od pierwszej klatki jest świadomą decyzją: eliminuje dodatkowy Client Component i nie powoduje skoku podczas rozpoczęcia przewijania. `scroll-padding-top` oraz `scroll-margin-top` korzystają z wysokości headera.

## Dodawanie pozycji

1. Dodaj lub wybierz adres w `src/config/routes.ts`.
2. Dodaj wpis strony w rejestrze albo modelu usługi.
3. Dodaj link tylko w `src/config/navigation.ts`.
4. Dla megamenu przypisz identyfikator linku dokładnie do jednej grupy.
5. Nie dodawaj pustego `href`, `#`, nieznanej trasy ani fikcyjnego linku zewnętrznego.
6. Sprawdź etykietę breadcrumb w centralnym rejestrze strony.
7. Uruchom `npm run content:check`, `npm run design:check` i build.
8. Sprawdź desktop, mobile, Escape, focus oraz `/design-system`.

`content:check` wykrywa nieznane i niewdrożone adresy, duplikaty w jednej sekcji, niepełne grupy megamenu, rozbieżne źródła desktop/mobile oraz niepoprawne breadcrumbs.
