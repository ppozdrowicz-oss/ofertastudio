// Single source for generated HTML, diagnosis, URLs, form and event IDs.
export const problems = [
  {
    id: "malo-klikniec",
    number: "01",
    category: "PIERWSZE WRAŻENIE",
    title: "Moje oferty nie przyciągają uwagi.",
    symptom: "Wyświetlenia są. Kliknięć zdecydowanie mniej.",
    intro:
      "Pierwsza decyzja zapada jeszcze na liście wyników. Sprawdźmy, czy od razu widać, co sprzedajesz i dlaczego warto zajrzeć do oferty.",
    causes: [
      "Produkt ginie w miniaturze.",
      "Tytuł nie mówi jasno, co wyróżnia ofertę.",
      "Prezentacja nie pasuje do tego, czego szuka klient.",
    ],
    checks: [
      "Miniatura i kadr",
      "Czytelność tytułu",
      "Widok na telefonie",
      "Kontekst ofert konkurencji",
    ],
    solutions: [
      "Poprawić kadr i skalę produktu.",
      "Uporządkować tytuł i najważniejsze informacje.",
      "Dopasować prezentację do kanału sprzedaży.",
    ],
    result:
      "Produkt łatwiej zauważyć i rozpoznać. Klient szybciej widzi powód, żeby otworzyć ofertę.",
    cta: "Pokaż swoją ofertę",
    visual: "attention",
    microDiagnosis:
      "Pierwsza decyzja zapada jeszcze na liście wyników. Jeśli oferta nie zatrzyma uwagi tutaj, klient może nawet nie zobaczyć tego, co masz do pokazania dalej.",
    visualQuestion: "Którą ofertę otworzysz?",
    images: {
      before: {
        src: "/ofertastudio/assets/problem-01-before.webp",
        width: 960,
        height: 723,
        alt: "Zegarek pokazany na poduszce w mniej czytelnej prezentacji produktowej.",
      },
      main: {
        src: "/ofertastudio/assets/problem-01-main.webp",
        width: 960,
        height: 960,
        alt: "Ten sam zegarek pokazany na jasnym tle, z wyraźnie wyeksponowanym produktem.",
      },
      detail: {
        src: "/ofertastudio/assets/problem-01-detail.webp",
        width: 960,
        height: 960,
        alt: "Zbliżenie na błękitną tarczę i detale wykończenia zegarka.",
      },
    },
  },
  {
    id: "slabe-zdjecia",
    number: "02",
    category: "PREZENTACJA PRODUKTU",
    title: "Zdjęcia wyglądają gorzej niż u konkurencji.",
    symptom: "Produkt jest dobry, ale w internecie tego nie widać.",
    intro:
      "Zdjęcia mają pokazać to, czego klient nie może obejrzeć na żywo. Zaczniemy od materiałów, które już masz.",
    causes: [
      "Światło i tło odciągają uwagę od produktu.",
      "Brakuje detali, skali albo zastosowania.",
      "Galeria powtarza podobne ujęcia zamiast odpowiadać na pytania.",
    ],
    checks: [
      "Jakość plików źródłowych",
      "Kadr, światło i kolor",
      "Detale produktu",
      "Kolejność zdjęć",
    ],
    solutions: [
      "Opracować dostarczone zdjęcia i tło.",
      "Ułożyć galerię w czytelną historię produktu.",
      "Dodać grafiki z ważnymi informacjami.",
    ],
    result:
      "Klient wyraźniej widzi jakość, szczegóły i zastosowanie. Zdjęcia pomagają ocenić produkt przed zakupem.",
    cta: "Pokaż swoją ofertę",
    visual: "photos",
  },
  {
    id: "wejscia-bez-sprzedazy",
    number: "03",
    category: "DECYZJA ZAKUPOWA",
    title: "Mam wejścia, ale mało sprzedaży.",
    symptom: "Klient wchodzi, ogląda i odchodzi.",
    intro:
      "Oferta zdobywa już uwagę. Problem może pojawiać się później — między zainteresowaniem a decyzją.",
    causes: [
      "Klient nie rozumie przewagi produktu lub nie widzi jakości.",
      "Nie znajduje ważnych informacji i nie wie, który wariant wybrać.",
      "Nie dostaje wystarczającego powodu do zakupu.",
    ],
    checks: [
      "Miniatura i galeria",
      "Kolejność informacji",
      "Opis i argumenty zakupowe",
      "Parametry i zastosowanie",
      "Zaufanie i konkurencja",
    ],
    solutions: [
      "Poprawić zdjęcia i przebudować galerię.",
      "Uporządkować opis, informacje i argumentację.",
      "Dopracować strukturę całej oferty, jeśli tego wymaga.",
    ],
    result:
      "Klient szybciej rozumie produkt, łatwiej znajduje istotne informacje i otrzymuje wyraźniejszy powód do wyboru.",
    cta: "Pokaż swoją ofertę",
    visual: "decision",
  },
  {
    id: "brak-czasu",
    number: "04",
    category: "CZAS",
    title: "Nie mam czasu przygotowywać ofert.",
    symptom: "Każdy nowy produkt oznacza kolejne godziny pracy.",
    intro:
      "Przy większym katalogu pojedyncze poprawki szybko zamieniają się w stałe zadanie. Sprawdzimy, co da się uporządkować i przekazać do realizacji.",
    causes: [
      "Każda oferta powstaje od początku.",
      "Zdjęcia i dane produktów są rozproszone.",
      "Brakuje jednego standardu i kolejności pracy.",
    ],
    checks: [
      "Liczba i rodzaje produktów",
      "Dostępność materiałów",
      "Powtarzalne zadania",
      "Priorytety publikacji",
    ],
    solutions: [
      "Ustalić standard zdjęć i opisów.",
      "Przygotowywać oferty partiami.",
      "Przejąć uzgodniony zakres w stałej współpracy.",
    ],
    result:
      "Nowe produkty mają spójny sposób prezentacji, a Ty zyskujesz czas na prowadzenie sprzedaży.",
    cta: "Pokaż, co nie działa",
    visual: "time",
  },
  {
    id: "start-allegro",
    number: "05",
    category: "START NA ALLEGRO",
    title: "Chcę zacząć sprzedawać na Allegro.",
    symptom: "Mam produkt, ale nie wiem, jak dobrze zacząć.",
    intro:
      "Nie musisz od razu przygotowywać całego katalogu. Zacznijmy od produktu i materiałów potrzebnych do pierwszej czytelnej oferty.",
    causes: [
      "Nie wiesz, jakie materiały przygotować.",
      "Brakuje tytułu, zdjęć lub uporządkowanych parametrów.",
      "Trudno wybrać produkty na początek.",
    ],
    checks: [
      "Produkty na start",
      "Zdjęcia i dane",
      "Struktura kategorii",
      "Informacje potrzebne kupującym",
    ],
    solutions: [
      "Ustalić zakres pierwszych ofert.",
      "Przygotować tytuły, opisy i galerie.",
      "Wypracować standard dla kolejnych produktów.",
    ],
    result:
      "Masz uporządkowaną ofertę na start i jasny sposób przygotowywania kolejnych produktów.",
    cta: "Pokaż swoją ofertę",
    visual: "allegro",
  },
  {
    id: "shoper",
    number: "06",
    category: "SHOPER",
    title: "Mam Shopera, ale potrzebuję pomocy.",
    symptom: "Sklep działa, ale nie wygląda i nie działa tak, jak powinien.",
    intro:
      "Zamiast dokładać kolejne przypadkowe poprawki, sprawdzimy strukturę sklepu. Ustalimy, co utrudnia zakupy i co warto zmienić w pierwszej kolejności.",
    causes: [
      "Szablon nie oddaje charakteru marki.",
      "Menu i układ utrudniają znalezienie produktów.",
      "Poprawki CSS powodują konflikty, zwłaszcza na telefonie.",
    ],
    checks: [
      "Strona główna i nawigacja",
      "Karta produktu i koszyk",
      "Widok mobilny",
      "Storefront i istniejący CSS",
    ],
    solutions: [
      "Dopracować nagłówek, menu, sekcje i stopkę.",
      "Przygotować własne moduły HTML/CSS oraz poprawki w Visual Editorze.",
      "Uporządkować szablon i ścieżkę zakupową B2B lub B2C.",
    ],
    result:
      "Sklep wygląda spójnie z marką, ułatwia klientom zakupy i ma uporządkowaną podstawę do dalszego rozwoju.",
    cta: "Pokaż, co nie działa",
    visual: "shoper",
  },
  {
    id: "wlasny-sklep",
    number: "07",
    category: "WŁASNY KANAŁ",
    title: "Mam produkty, ale nie mam własnego sklepu.",
    symptom: "Nie chcę opierać całej sprzedaży wyłącznie na marketplace.",
    intro:
      "Własny sklep potrzebuje jasnej oferty i wygodnej drogi do zakupu. Dobierzemy zakres do Twojego katalogu i sposobu sprzedaży.",
    causes: [
      "Klient zna platformę, ale nie zapamiętuje Twojej marki.",
      "Brakuje własnego miejsca dla pełnej oferty.",
      "Nie masz ustalonej struktury i funkcji sklepu.",
    ],
    checks: [
      "Katalog i kategorie",
      "Klienci B2B i B2C",
      "Potrzebne funkcje",
      "Materiały i identyfikacja marki",
    ],
    solutions: [
      "Zaprojektować strukturę i wygląd sklepu.",
      "Przygotować wdrożenie Shoper.",
      "Uporządkować prezentację produktów i nawigację.",
    ],
    result:
      "Twoja marka ma własne miejsce sprzedaży, z czytelną ofertą i zakresem dopasowanym do etapu rozwoju firmy.",
    cta: "Pokaż swoją ofertę",
    visual: "store",
  },
  {
    id: "slaba-strona",
    number: "08",
    category: "STRONA INTERNETOWA",
    title: "Moja strona nie budzi zaufania.",
    symptom: "Firma jest lepsza niż jej obecna strona.",
    intro:
      "Strona powinna wyjaśniać ofertę, budować wiarygodność i prowadzić do kontaktu. Zobaczymy, w którym miejscu przestaje pomagać klientowi.",
    causes: [
      "Nie wiadomo od razu, czym zajmuje się firma.",
      "Wygląd i treści nie pokazują jakości pracy.",
      "Kontakt jest trudny do znalezienia lub użycia na telefonie.",
    ],
    checks: [
      "Pierwszy ekran",
      "Jasność oferty",
      "Prawdziwe dowody i materiały",
      "Nawigacja i formularz",
    ],
    solutions: [
      "Uporządkować treść i hierarchię informacji.",
      "Odświeżyć projekt i wersję mobilną.",
      "Uprościć drogę od poznania oferty do zapytania.",
    ],
    result:
      "Odbiorca rozumie, co oferujesz, znajduje powody do zaufania i wie, jak zrobić kolejny krok.",
    cta: "Pokaż, co nie działa",
    visual: "website",
  },
  {
    id: "niespojna-sprzedaz",
    number: "09",
    category: "SPÓJNOŚĆ MARKI",
    title: "Moja sprzedaż online wygląda niespójnie.",
    symptom: "Allegro, sklep i strona wyglądają jak trzy różne firmy.",
    intro:
      "Każdy kanał ma własne zasady, ale klient powinien rozpoznawać tę samą markę. Poszukamy wspólnego standardu dla zdjęć, treści i wyglądu.",
    causes: [
      "Materiały powstają bez wspólnego kierunku.",
      "Te same produkty mają różne opisy i zdjęcia.",
      "Każdy kanał inaczej przedstawia zalety firmy.",
    ],
    checks: [
      "Allegro, OLX, sklep i strona",
      "Zdjęcia oraz grafiki",
      "Nazwy i opisy",
      "Kolory, typografia i komunikacja",
    ],
    solutions: [
      "Ustalić spójny kierunek wizualny.",
      "Ujednolicić prezentację produktów.",
      "Dopasować wspólne materiały do poszczególnych kanałów.",
    ],
    result:
      "Klient rozpoznaje Twoją markę niezależnie od miejsca kontaktu, a kolejne materiały powstają według jasnych zasad.",
    cta: "Pokaż swoją ofertę",
    visual: "consistency",
  },
  {
    id: "diagnoza",
    number: "10",
    category: "DIAGNOZA",
    title: "Nie wiem, co właściwie jest nie tak.",
    symptom: "Czuję, że coś nie działa, ale nie wiem, od czego zacząć.",
    intro:
      "Nie musisz stawiać diagnozy samodzielnie. Wystarczy link i kilka zdań o tym, co obserwujesz.",
    causes: [
      "Kilka drobnych problemów nakłada się na siebie.",
      "Trudno odróżnić problem prezentacji od ceny, popytu lub ruchu.",
      "Brakuje zewnętrznego spojrzenia i kolejności zmian.",
    ],
    checks: [
      "Oferta oczami klienta",
      "Zdjęcia i najważniejsze informacje",
      "Droga do kontaktu lub zakupu",
      "Kontekst Twojej sprzedaży",
    ],
    solutions: [
      "Wstępnie ocenić jedną ofertę.",
      "Wskazać priorytet i możliwy kierunek zmian.",
      "Zaproponować tylko potrzebny zakres pracy.",
    ],
    result:
      "Wiesz, od czego zacząć, co wymaga dalszego sprawdzenia i jaki pierwszy krok ma sens dla Twojej oferty.",
    cta: "Pokaż, co nie działa",
    visual: "diagnosis",
  },
];
export const problemById = new Map(
  problems.map((problem) => [problem.id, problem]),
);
// Only approved, real projects belong here. Empty means no public section.
// Shape: { id, title, problemId, diagnosis, changes: [], before: {src, alt, width, height},
// after: {src, alt, width, height}, result, evidence, approved: true }.
export const problemStories = [];
