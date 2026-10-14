export type OfferImage = { src: string; width: number; height: number; alt: string };
export type OfferSlideInsights = {
  why: string;
  buyerValue: string;
  workshop: readonly [string, string, string, ...string[]];
};
export type OfferSlide = {
  id: string;
  index: number;
  title: string;
  subtitle: string;
  description: string;
  commercialPurpose: string;
  insights: OfferSlideInsights;
  image: OfferImage;
  reviewNote?: string;
};
export type OfferCollection = {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  description: string;
  productName: string;
  slides: readonly OfferSlide[];
};

// All 24 supplied masters were decoded: genuine WebP, 2600 × 2600, opaque RGB.
// Keep the entire square image, including embedded information and packaging.
function slide(
  collection: string,
  filename: string,
  content: Omit<OfferSlide, "id" | "index" | "image"> & { alt: string },
): OfferSlide {
  const { alt, ...copy } = content;
  return {
    ...copy,
    id: `${collection}-${filename.replace(/\.webp$/, "")}`,
    index: Number(filename.slice(0, 2)),
    image: {
      src: `/media/offer-carousel/${collection}/${filename}`,
      width: 2600,
      height: 2600,
      alt,
    },
  };
}

export const offerCollections: readonly OfferCollection[] = [
  {
    id: "sneaker",
    title: "Obuwie",
    subtitle: "Osiem ujęć jednego modelu.",
    category: "Obuwie",
    productName: "Nike Air Max 90",
    description:
      "Osiem ujęć jednego modelu. Od sylwetki i materiałów po detal, użytkowanie i dopasowanie.",
    slides: [
      slide("sneaker", "01-main.webp", {
        title: "Pierwsze wrażenie zaczyna się od kadru.",
        subtitle: "Zdjęcie główne",
        description:
          "Czyste tło, wyraźna sylwetka i miękkie światło pozwalają skupić uwagę na modelu Nike Air Max 90.",
        commercialPurpose: "Główny obraz oferty",
        alt: "Nike Air Max 90 — zielono-czarny sneaker z białymi elementami, pokazany w całości na białym tle",
        insights: {
          why: "Neutralne otoczenie eliminuje rozpraszające elementy. Odpowiednia skala produktu i subtelny cień kontaktowy podkreślają jego bryłę bez zaburzania czytelności.",
          buyerValue:
            "Kupujący może szybko ocenić kolorystykę, sylwetkę, proporcje i charakterystyczne detale obuwia.",
          workshop: ["Białe tło", "cień kontaktowy", "wierność kolorów", "kadr"],
        },
      }),
      slide("sneaker", "02-multiview.webp", {
        title: "Jeden model. Kilka punktów widzenia.",
        subtitle: "Różne perspektywy",
        description: "Różne ujęcia przedstawiają konstrukcję buta z kilku perspektyw.",
        commercialPurpose: "Prezentacja z kilku stron",
        alt: "Nike Air Max 90 — kompozycja sneakersa z boku i od tyłu oraz pary butów widzianej z góry",
        insights: {
          why: "Widoki boczne, tylne i górne pokazują elementy niewidoczne na pojedynczej fotografii.",
          buyerValue:
            "Kupujący może dokładniej poznać kształt cholewki, układ sznurowania i wykończenie pięty.",
          workshop: ["Wieloperspektywiczność", "spójność", "proporcje"],
        },
      }),
      slide("sneaker", "03-material-detail.webp", {
        title: "Jakość zaczyna się od szczegółów.",
        subtitle: "Materiał i detal",
        description:
          "Zbliżenie wydobywa splot materiałów, teksturę paneli, sznurowadła i przeszycia.",
        commercialPurpose: "Prezentacja materiałów",
        alt: "Nike Air Max 90 — zbliżenie na zielone sznurowadła, siatkę, przeszycia i białe elementy cholewki",
        insights: {
          why: "Bliski kadr pozwala szczegółowo pokazać różnice pomiędzy powierzchniami i staranność widocznego wykończenia.",
          buyerValue: "Ułatwia dokładniejsze obejrzenie materiałów i konstrukcji przed zakupem.",
          workshop: ["Makrofotografia", "faktura", "ostrość", "czytelność detalu"],
        },
      }),
      slide("sneaker", "04-features.webp", {
        title: "Forma, którą warto zobaczyć z drugiej strony.",
        subtitle: "Dodatkowa perspektywa",
        description:
          "Dodatkowe ujęcie pokazuje sylwetkę modelu Nike Air Max 90 z innej perspektywy.",
        commercialPurpose: "Pokazanie konstrukcji",
        alt: "Nike Air Max 90 — zielony sneaker w bocznym ujęciu, z widocznym układem paneli i podeszwy",
        insights: {
          why: "Zmiana kąta pozwala lepiej przedstawić proporcje cholewki, noska, pięty i podeszwy.",
          buyerValue: "Kupujący otrzymuje pełniejszy obraz przestrzennej konstrukcji produktu.",
          workshop: ["Perspektywa", "geometria", "proporcje"],
        },
      }),
      slide("sneaker", "05-sole-detail.webp", {
        title: "Konstrukcja widoczna z bliska.",
        subtitle: "Detal podeszwy",
        description:
          "Detal pięty i podeszwy podkreśla charakterystyczne elementy modelu Air Max 90.",
        commercialPurpose: "Prezentacja detalu konstrukcyjnego",
        alt: "Nike Air Max 90 — zbliżenie tylnej części buta i podeszwy oraz dodatkowy kadr bieżnika przy nosku",
        insights: {
          why: "Zbliżenie pokazuje przejścia materiałów, profil podeszwy i widoczną komorę Air.",
          buyerValue:
            "Umożliwia dokładniejsze obejrzenie jednego z najbardziej charakterystycznych elementów konstrukcji.",
          workshop: ["Detal", "faktura", "konstrukcja", "światło"],
        },
      }),
      slide("sneaker", "06-lifestyle.webp", {
        title: "Produkt nabiera kontekstu.",
        subtitle: "Lifestyle",
        description: "Zdjęcie pokazuje Nike Air Max 90 noszone w miejskiej stylizacji.",
        commercialPurpose: "Pokazanie produktu w użyciu",
        alt: "Nike Air Max 90 — zielone sneakersy na nogach osoby w czarnych spodniach, na miejskim chodniku",
        insights: {
          why: "Kontekst codziennego użytkowania uzupełnia neutralne fotografie produktowe.",
          buyerValue:
            "Pomaga wyobrazić sobie wygląd obuwia na stopie oraz jego proporcje w zestawieniu z ubraniem.",
          workshop: ["Lifestyle", "kontekst", "światło dzienne"],
        },
      }),
      slide("sneaker", "07-size-guide.webp", {
        title: "Dobry wybór zaczyna się od właściwego rozmiaru.",
        subtitle: "Rozmiary i dopasowanie",
        description: "Plansza łączy instrukcję pomiaru stopy z tabelą rozmiarów.",
        commercialPurpose: "Przedstawienie informacji o rozmiarach",
        alt: "Nike Air Max 90 — plansza doboru rozmiaru: pomiar stopy na kartce i tabela długości stopy w centymetrach względem rozmiaru EU; szczegóły dostępne w powiększeniu",
        insights: {
          why: "Wydzielenie informacji użytkowych do osobnej grafiki pozwala zachować czyste zdjęcia produktu i czytelnie przedstawić dane.",
          buyerValue:
            "Kupujący otrzymuje wskazówki pomiaru i ogólną tabelę męskich rozmiarów Nike. Długość stopy nie jest oznaczeniem CM na pudełku.",
          workshop: ["Infografika", "hierarchia danych", "czytelność"],
        },
      }),
      slide("sneaker", "08-packaging.webp", {
        title: "Kompletna prezentacja. Bez niedomówień.",
        subtitle: "Komplet i opakowanie",
        description: "Para butów oraz opakowanie w jednej uporządkowanej kompozycji.",
        commercialPurpose: "Prezentacja zestawu",
        alt: "Nike Air Max 90 — para zielonych sneakersów i czerwone pudełko Nike, razem na białym tle",
        insights: {
          why: "Wspólne oświetlenie i świadome rozmieszczenie elementów zapewniają wizualną spójność.",
          buyerValue: "Pozwala zobaczyć produkt w parze oraz wygląd przedstawionego opakowania.",
          workshop: ["Kompozycja zestawu", "proporcje", "światło"],
        },
      }),
    ],
  },
  {
    id: "perfume",
    title: "Perfumy",
    subtitle: "Osiem ujęć jednej kompozycji.",
    category: "Perfumy",
    productName: "Valentino Donna Born in Roma Intense",
    description:
      "Osiem ujęć jednej kompozycji. Od packshota po makro, charakter zapachu i ekspozycję premium.",
    slides: [
      slide("perfume", "01-main.webp", {
        title: "Forma, która przyciąga uwagę.",
        subtitle: "Zdjęcie główne",
        description: "Czysty packshot eksponuje kształt flakonu, jego fakturę i kolor.",
        commercialPurpose: "Główny obraz oferty",
        alt: "Flakon Valentino z różowym płynem, geometrycznym szkłem i czarną nakrętką na białym tle",
        insights: {
          why: "Neutralne tło i kontrolowane refleksy pozwalają pokazać transparentne szkło bez zbędnych elementów scenografii.",
          buyerValue:
            "Kupujący może dokładniej obejrzeć flakon, nakrętkę, oznaczenia i kolor produktu.",
          workshop: ["Izolacja", "szkło", "refleksy", "kontrast"],
        },
      }),
      slide("perfume", "02-premium.webp", {
        title: "Światło buduje charakter.",
        subtitle: "Ekspozycja premium",
        description: "Scenografia i kontrolowany kolor tworzą elegancki kontekst reklamowy.",
        commercialPurpose: "Budowanie charakteru prezentacji",
        alt: "Flakon Valentino na różowym kamiennym podeście, w kierunkowym świetle i cieniu",
        insights: {
          why: "Światło i otoczenie podkreślają formę produktu, nie odbierając mu pierwszoplanowej roli.",
          buyerValue: "Pozwala zobaczyć produkt w bardziej emocjonalnej, dopracowanej prezentacji.",
          workshop: ["Art direction", "scenografia", "światło"],
        },
      }),
      slide("perfume", "03-cap-detail.webp", {
        title: "Precyzja zaklęta w szczegółach.",
        subtitle: "Makrofotografia",
        description: "Makrofotografia eksponuje geometrię nakrętki, pierścienia i fakturę flakonu.",
        commercialPurpose: "Prezentacja detali wykończenia",
        alt: "Bliski kadr czarnej geometrycznej nakrętki, faktury etykiety Valentino i szklanych wypustek",
        insights: {
          why: "Bliski kadr pokazuje kontrast pomiędzy matową czernią a połyskiem szkła.",
          buyerValue: "Ułatwia ocenę wykończenia elementów, które trudno dostrzec na miniaturze.",
          workshop: ["Makro", "geometria", "materiały", "kontrast"],
        },
      }),
      slide("perfume", "04-glass-light.webp", {
        title: "Kiedy materiał staje się bohaterem.",
        subtitle: "Materiał i transparentność",
        description: "Światło przechodzące przez szkło wydobywa jego strukturę i głębię koloru.",
        commercialPurpose: "Pokazanie materiału i koloru",
        alt: "Zbliżenie różowego flakonu Valentino z wyraźnymi refleksami na geometrycznych powierzchniach szkła",
        insights: {
          why: "Ekspozycja przezroczystych powierzchni zachowuje czytelne krawędzie i odbicia.",
          buyerValue: "Pozwala dokładniej obejrzeć fakturę oraz kolorystykę flakonu.",
          workshop: ["Transparentność", "refleksy", "załamania światła"],
        },
      }),
      slide("perfume", "05-information.webp", {
        title: "Piękny obraz. Konkretne informacje.",
        subtitle: "Grafika informacyjna",
        description:
          "Elegancka plansza łączy fotografię produktu z uporządkowaną charakterystyką zapachu.",
        commercialPurpose: "Prezentacja informacji produktowych",
        alt: "Plansza Valentino z flakonem i tabelą: nuta głowy — akord wanilii Bourbon, nuta serca — jaśmin, nuta bazy — żywica benzoinowa",
        insights: {
          why: "Hierarchia typografii oddziela nazwę produktu, kompozycję zapachową i informacje o wersji produktu.",
          buyerValue:
            "Kupujący szybciej odnajduje podstawowe informacje o zapachu i jego charakterze.",
          workshop: ["Typografia", "hierarchia informacji", "kompozycja"],
        },
      }),
      slide("perfume", "06-lifestyle.webp", {
        title: "Produkt w odpowiedniej oprawie.",
        subtitle: "Lifestyle",
        description: "Subtelna aranżacja wnętrza nadaje produktowi estetyczny kontekst.",
        commercialPurpose: "Budowanie kontekstu wizualnego",
        alt: "Flakon Valentino na marmurowej powierzchni przy oknie, obok kwiatów i różowej tkaniny",
        insights: {
          why: "Otoczenie, kolory i światło podporządkowano głównemu produktowi.",
          buyerValue: "Pozwala zobaczyć flakon poza neutralnym tłem katalogowym.",
          workshop: ["Lifestyle", "stylizacja", "kompozycja", "światło"],
        },
      }),
      slide("perfume", "07-in-hand.webp", {
        title: "Proporcje, które łatwiej ocenić.",
        subtitle: "Produkt w dłoni",
        description: "Ujęcie flakonu w dłoni wprowadza naturalny punkt odniesienia.",
        commercialPurpose: "Dodatkowa perspektywa produktu",
        alt: "Dłoń trzymająca różowy, geometryczny flakon Valentino na ciepłym, rozmytym tle",
        insights: {
          why: "Kontekst ludzkiej dłoni pomaga pokazać wizualną skalę produktu.",
          buyerValue:
            "Ułatwia orientacyjną ocenę wielkości flakonu, bez zastępowania rzeczywistych wymiarów.",
          workshop: ["Skala wizualna", "proporcje", "detal"],
        },
      }),
      slide("perfume", "08-packaging.webp", {
        title: "Spójność od flakonu po opakowanie.",
        subtitle: "Produkt i opakowanie",
        description: "Flakon i pudełko tworzą kompletną, dopracowaną kompozycję.",
        commercialPurpose: "Prezentacja produktu z opakowaniem",
        alt: "Flakon Valentino i różowe pudełko Born in Roma Intense na kamiennej powierzchni, obok kwiatów",
        insights: {
          why: "Spójne oświetlenie i odpowiednia perspektywa pozwalają czytelnie zaprezentować oba elementy.",
          buyerValue: "Kupujący widzi wygląd produktu i przedstawionego opakowania.",
          workshop: ["Kompozycja", "opakowanie", "refleksy", "światło"],
        },
      }),
    ],
  },
  {
    id: "power-tool",
    title: "Narzędzia",
    subtitle: "Profesjonalny zestaw elektronarzędzi",
    category: "Narzędzia",
    productName: "Milwaukee M18 FUEL",
    description:
      "Osiem ujęć jednego zestawu. Od kompletnej prezentacji po konstrukcję, detale i zastosowanie.",
    slides: [
      slide("power-tool", "01-main.webp", {
        title: "Kompletny zestaw. Jedno spojrzenie.",
        subtitle: "Zdjęcie główne",
        description: "Jedna kompozycja prezentuje oba narzędzia, akumulatory, ładowarkę i walizkę.",
        commercialPurpose: "Główne zdjęcie całego zestawu",
        alt: "Zestaw Milwaukee M18 FUEL na białym tle: wiertarko-wkrętarka z rękojeścią boczną, zakrętarka, dwa akumulatory z oznaczeniem 5.0, ładowarka i czerwona walizka",
        insights: {
          why: "Odpowiednie rozmieszczenie elementów ułatwia identyfikację zawartości zestawu.",
          buyerValue: "Kupujący może szybciej rozpoznać przedstawione komponenty.",
          workshop: ["Packshot zestawu", "kompozycja", "cienie"],
        },
      }),
      slide("power-tool", "02-dual-tools.webp", {
        title: "Dwie konstrukcje. Jeden zestaw.",
        subtitle: "Prezentacja produktów",
        description: "Dwa osobne elektronarzędzia przedstawione w czytelnej kompozycji.",
        commercialPurpose: "Prezentacja dwóch narzędzi z zestawu",
        alt: "Dwa narzędzia Milwaukee bez zamontowanych akumulatorów: wiertarko-wkrętarka z uchwytem wiertarskim i boczną rękojeścią oraz kompaktowa zakrętarka",
        insights: {
          why: "Fotografia eksponuje różnice pomiędzy uchwytem wiertarskim a konstrukcją zakrętarki udarowej.",
          buyerValue: "Ułatwia rozróżnienie obu urządzeń.",
          workshop: ["Perspektywa", "proporcje", "ekspozycja"],
        },
      }),
      slide("power-tool", "03-chuck-detail.webp", {
        title: "Precyzja zaczyna się od detalu.",
        subtitle: "Makro i precyzja",
        description: "Makrofotografia uchwytu wiertarskiego pokazuje wykończenie metalu.",
        commercialPurpose: "Prezentacja detalu technicznego",
        alt: "Makro uchwytu wiertarskiego Milwaukee: metalowe szczęki, fakturowany pierścień i elementy regulacyjne, z boczną rękojeścią w tle",
        insights: {
          why: "Zbliżenie pozwala przedstawić powierzchnie i elementy regulacyjne z większą szczegółowością.",
          buyerValue: "Pozwala lepiej obejrzeć istotne części konstrukcji.",
          workshop: ["Makro", "metal", "ostrość", "refleksy"],
        },
      }),
      slide("power-tool", "04-impact-detail.webp", {
        title: "Forma podporządkowana funkcji.",
        subtitle: "Ergonomia i wykończenie",
        description: "Zbliżenie prezentuje konstrukcję zakrętarki, rękojeść i obudowę.",
        commercialPurpose: "Prezentacja konstrukcji i materiałów",
        alt: "Zakrętarka Milwaukee na ciemnym tle: uchwyt końcówki, spust, faktura rękojeści, zaczep i akumulator z oznaczeniem 5.0 Ah",
        insights: {
          why: "Kadr kieruje uwagę na widoczne elementy techniczne i materiałowe.",
          buyerValue: "Ułatwia dokładniejsze obejrzenie urządzenia.",
          workshop: ["Detal konstrukcyjny", "materiały", "światło"],
        },
      }),
      slide("power-tool", "05-tool-comparison.webp", {
        title: "Różnice, które widać od razu.",
        subtitle: "Grafika informacyjna",
        description: "Porównawcza prezentacja dwóch narzędzi w jednej kompozycji.",
        commercialPurpose: "Wizualne porównanie konstrukcji",
        alt: "Dwudzielna plansza bez danych liczbowych: wiertarko-wkrętarka Milwaukee z lewej i zakrętarka z prawej, na jasnym tle",
        insights: {
          why: "Uporządkowane zestawienie ułatwia porównanie charakterystycznych elementów konstrukcji.",
          buyerValue: "Pomaga rozpoznać różnice wizualne między narzędziami.",
          workshop: ["Zestawienie", "porównanie", "hierarchia"],
        },
      }),
      slide("power-tool", "06-workshop-lifestyle.webp", {
        title: "Produkt w kontekście pracy.",
        subtitle: "Produkt w zastosowaniu",
        description:
          "Poglądowa scena warsztatowa pokazuje elektronarzędzie w otoczeniu związanym z jego zastosowaniem.",
        commercialPurpose: "Prezentacja kontekstu warsztatowego",
        alt: "Zakrętarka udarowa Milwaukee M18 FUEL trzymana w rękawicy; końcówka skierowana ku główce wkrętu osadzonego w drewnianej belce",
        insights: {
          why: "Kontekst warsztatowy uzupełnia neutralne zdjęcia produktowe i pokazuje narzędzie w relacji do obrabianego materiału.",
          buyerValue:
            "Pomaga wyobrazić sobie wielkość narzędzia w dłoni i jego zastosowanie przy pracy z drewnem.",
          workshop: ["Lifestyle techniczny", "scenografia", "kontekst"],
        },
      }),
      slide("power-tool", "07-batteries-charger.webp", {
        title: "Ważne elementy zestawu. Bez domysłów.",
        subtitle: "Zawartość zestawu",
        description: "Dwa akumulatory i ładowarka przedstawione w osobnym kadrze.",
        commercialPurpose: "Prezentacja akumulatorów i ładowarki",
        alt: "Dwa akumulatory Milwaukee M18 REDLITHIUM-ION z widocznym oznaczeniem 5.0 Ah oraz czerwona ładowarka na białym tle",
        insights: {
          why: "Wydzielenie akcesoriów pozwala wyraźniej zaprezentować ich wygląd i oznaczenia.",
          buyerValue: "Ułatwia zidentyfikowanie komponentów systemu zasilania.",
          workshop: ["Packshot akcesoriów", "oznaczenia", "kompozycja"],
        },
      }),
      slide("power-tool", "08-premium-campaign.webp", {
        title: "Technologia w mocnej oprawie.",
        subtitle: "Ekspozycja reklamowa",
        description: "Industrialna scenografia eksponuje kompletny zestaw.",
        commercialPurpose: "Reklamowa prezentacja całego zestawu",
        alt: "Kompletny zestaw Milwaukee M18 FUEL na ciemnym stole: dwa narzędzia, dwa akumulatory, ładowarka i walizka w kierunkowym świetle",
        insights: {
          why: "Kontrolowany kontrast i kierunek światła podkreślają materiały oraz czerwono-czarną kolorystykę.",
          buyerValue: "Pozwala zobaczyć zestaw w efektownej prezentacji premium.",
          workshop: ["Art direction", "kontrast", "materiały"],
        },
      }),
    ],
  },
];
