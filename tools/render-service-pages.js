const fs = require('fs');

const SITE = 'https://ofertastudio.pl';
const OG = `${SITE}/og-default.jpg`;
const ORG = `${SITE}/#organization`;
const WEBSITE = `${SITE}/#website`;
const SKIP_LINK_TARGET = '#main-content';

const serviceLinks = [
  ['Zdjęcia produktowe Allegro', '/zdjecia-produktowe-allegro/'],
  ['Opisy produktów Allegro', '/opisy-produktow-allegro/'],
  ['Optymalizacja ofert Allegro', '/optymalizacja-ofert-allegro/'],
  ['Audyt oferty Allegro', '/audyt-oferty-allegro/'],
  ['Oferty OLX', '/oferty-olx/']
];

const pages = [
  {
    file: 'zdjecia-produktowe-allegro/index.html',
    url: '/zdjecia-produktowe-allegro/',
    robots: 'noindex, follow',
    title: 'Zdjęcia produktowe Allegro — miniatury i galerie SEO | OfertaStudio.pl',
    description: 'Zdjęcia produktowe Allegro: miniatury, galerie i infografiki bez wysyłki produktu. Wyślij link lub zdjęcia i zapytaj o Foto Pack od 249 zł.',
    h1: 'Zdjęcia produktowe Allegro: miniatura, packshot, galeria i infografika',
    label: 'Zdjęcia produktowe Allegro',
    eyebrow: 'Zdjęcia produktowe',
    lead: 'Dobre zdjęcia produktowe Allegro nie są tylko ładnym obrazkiem. Miniatura ma zatrzymać wzrok na liście ofert, packshot ma jasno pokazać produkt, galeria ma odpowiedzieć na pytania kupującego, a infografika ma skrócić drogę od zainteresowania do decyzji.',
    cta: 'Zapytaj o zdjęcia produktowe',
    serviceType: 'Zdjęcia produktowe, miniatury, galerie i infografiki do ofert Allegro',
    serviceName: 'Zdjęcia produktowe Allegro',
    offerName: 'Foto Pack',
    price: '249',
    intro: [
      'W Allegro kupujący często podejmuje pierwszą decyzję, zanim przeczyta opis. Widzi miniaturę, cenę, nazwę produktu i kilka ofert obok siebie. Jeżeli zdjęcie główne jest ciemne, przeładowane albo nie pokazuje najważniejszej cechy, oferta może zostać pominięta mimo dobrego produktu i uczciwej ceny.',
      'Usługa obejmuje przygotowanie lub uporządkowanie materiałów wizualnych do oferty: od zdjęcia głównego, przez logiczną galerię, po infografiki produktowe. Pracuję na tym, co realnie pomaga sprzedawcy: czytelność w miniaturze, skala produktu, zawartość zestawu, ważne detale, zastosowanie i parametry widoczne bez szukania w opisie.',
      'Nie każda realizacja wymaga wysyłki produktu. W wielu przypadkach można zacząć od obecnych zdjęć, zdjęć producenta, linku do oferty albo materiałów bazowych. Jeśli brakuje ujęć, które są niezbędne do pokazania produktu uczciwie, informuję o tym przed wyceną i wskazuję, czego dokładnie potrzeba.',
      'Celem nie jest stworzenie przypadkowej galerii z dziesięciu podobnych kadrów. Każdy obraz powinien mieć zadanie: zatrzymać uwagę, wyjaśnić cechę, pokazać detal, potwierdzić kompatybilność albo zmniejszyć niepewność kupującego.'
    ],
    fit: [
      ['Masz produkt techniczny', 'Największy sens ma to przy produktach, których wartości nie da się pokazać jednym zwykłym zdjęciem: narzędziach, BHP, akcesoriach, częściach, zestawach i produktach z parametrami.'],
      ['Kupujący dopytuje o detale', 'Jeżeli klienci pytają o wymiary, kompatybilność, zawartość zestawu, materiał albo zastosowanie, to znak, że galeria nie wykonuje swojej pracy wystarczająco wcześnie.'],
      ['Miniatura ginie w kategorii', 'Jeżeli na liście wyników konkurencja wygląda wyraźniej, a Twój produkt wymaga powiększenia zdjęcia, warto zacząć od zdjęcia głównego i kadru w miniaturze.'],
      ['Masz materiały producenta', 'Zdjęcia katalogowe mogą być punktem wyjścia, ale zwykle wymagają ułożenia w sprzedażową historię: co widać najpierw, co wyjaśnia detal, a co potwierdza wartość zestawu.']
    ],
    prepare: [
      ['Link do obecnej oferty', 'Pozwala zobaczyć produkt w realnym kontekście Allegro: tytuł, zdjęcie główne, galerię, opis i to, jak oferta wygląda obok podobnych wyników.'],
      ['Zdjęcia bazowe lub pliki producenta', 'Nie muszą być idealne, ale powinny pokazywać produkt możliwie ostro i bez ukrywania ważnych elementów. Na ich podstawie oceniam, co da się poprawić.'],
      ['Informacje o zestawie', 'Przy produktach wieloelementowych ważne jest, co dokładnie kupujący otrzymuje. Brak tej informacji często wymusza dodatkową infografikę albo osobne zdjęcie zawartości.'],
      ['Najważniejsze parametry', 'Warto przygotować wymiary, normy, moc, materiał, kompatybilność lub inne dane, które kupujący porównuje w kategorii. Dzięki temu grafiki nie są dekoracją, tylko argumentem.'],
      ['Ograniczenia produktu', 'Jeżeli produkt ma warunki użycia, warianty albo elementy, których nie wolno obiecać, lepiej wiedzieć o tym przed projektowaniem galerii. To chroni zaufanie do oferty.']
    ],
    attention: [
      ['Czytelność na telefonie', 'Infografika, która wygląda dobrze na dużym monitorze, może być nieczytelna na ekranie telefonu. Dlatego sprawdzam, czy teksty, ikony i detale mają sens w małym formacie.'],
      ['Pierwszy kadr galerii', 'Po miniaturze kupujący zwykle otwiera galerię. Pierwszy kadr po zdjęciu głównym powinien natychmiast rozwinąć najważniejszy argument, a nie powtarzać ten sam widok.'],
      ['Uczciwość prezentacji', 'Obróbka nie może ukrywać cech produktu ani sugerować czegoś, czego klient nie dostanie. Dobra grafika wzmacnia zrozumienie, ale nie zastępuje prawdziwych informacji.'],
      ['Kolejność zdjęć', 'Galeria powinna mieć rytm: najpierw produkt, potem zestaw, detale, zastosowanie i parametry. Chaotyczna kolejność zmusza kupującego do samodzielnego składania informacji.'],
      ['Spójność stylu', 'Różne zdjęcia mogą mieć inne zadania, ale powinny wyglądać jak część jednej oferty. Spójne kadry i infografiki budują większe zaufanie niż przypadkowa mieszanka materiałów.']
    ],
    aftercare: [
      ['Sprawdź miniaturę wśród konkurencji', 'Po wdrożeniu nie oceniaj zdjęcia głównego tylko na stronie produktu. Otwórz listę wyników i zobacz, czy miniatura jest czytelna między innymi ofertami, bo tam najczęściej zaczyna się decyzja.'],
      ['Porównaj galerię na telefonie', 'Materiały wizualne powinny działać w małym formacie. Jeśli infografika wymaga powiększania, a detal staje się nieczytelny, warto uprościć tekst albo rozbić informację na osobne kadry.'],
      ['Zbieraj pytania kupujących', 'Jeżeli po publikacji nadal pojawiają się te same pytania, potraktuj je jak sygnał do kolejnej poprawki galerii. Dobre zdjęcia powinny ograniczać niepewność, a nie tylko wyglądać profesjonalnie.'],
      ['Pilnuj spójności nowych produktów', 'Gdy dodajesz kolejne warianty, trzymaj podobny układ: zdjęcie główne, detale, zastosowanie, parametry i zestaw. Spójna kategoria wygląda wiarygodniej niż zbiór przypadkowych realizacji.'],
      ['Nie przesadzaj z opisami na grafikach', 'Infografiki powinny skracać decyzję, a nie zastępować cały opis produktu. Jeśli na jednym obrazie jest zbyt dużo tekstu, kupujący może pominąć najważniejszą informację.'],
      ['Aktualizuj materiały po zmianach produktu', 'Jeżeli zmienia się opakowanie, skład zestawu, wariant albo ważny parametr, galeria powinna zostać zaktualizowana. Nieaktualne zdjęcia obniżają zaufanie szybciej niż brak dodatkowego efektu wizualnego.']
    ],
    deliverables: [
      ['Miniatura do listy ofert', 'Projekt zdjęcia głównego nastawiony na czytelność produktu w małym kafelku, z jasnym pokazaniem bryły, koloru, zestawu albo najważniejszego wyróżnika.'],
      ['Packshot produktu', 'Czyste ujęcie produktu na neutralnym tle, przydatne jako zdjęcie główne lub początek galerii, bez zbędnych elementów rozpraszających uwagę.'],
      ['Galeria sprzedażowa', 'Układ zdjęć prowadzący kupującego przez decyzję: widok ogólny, detale, zastosowanie, zawartość zestawu, wymiary, oznaczenia lub elementy techniczne.'],
      ['Infografika produktowa', 'Prosty kadr z opisanymi parametrami, funkcjami, normami, kompatybilnością lub zawartością zestawu, przygotowany tak, aby był czytelny na desktopie i mobile.'],
      ['Rekomendacja brakujących ujęć', 'Lista zdjęć, których brakuje w obecnej ofercie, wraz z uzasadnieniem, po co są potrzebne i jakie pytanie kupującego mają zamknąć.'],
      ['Formaty do publikacji', 'Materiały przygotowane z myślą o marketplace, bez przypadkowego kadrowania, utraty ostrości i chaosu między zdjęciem głównym a pozostałą galerią.']
    ],
    mistakes: [
      ['Miniatura wygląda jak zwykłe zdjęcie z telefonu', 'Produkt jest widoczny, ale nie wyróżnia się na tle konkurencji. Brakuje kontrastu, czytelnego kadru i jasnego pokazania, co dokładnie jest sprzedawane.'],
      ['Galeria powtarza ten sam kadr', 'Kupujący przewija zdjęcia, ale nie dostaje nowych informacji. Kilka podobnych ujęć nie zastąpi detalu, skali, zastosowania i zawartości zestawu.'],
      ['Parametry są tylko w opisie', 'W wielu kategoriach technicznych klient chce widzieć średnicę, normę, moc, typ złącza albo kompatybilność od razu w galerii. Sam tekst bywa za późno.'],
      ['Zdjęcie główne pokazuje zbyt wiele naraz', 'Miniatura z wieloma elementami może wyglądać bogato na dużym ekranie, ale na liście ofert zamienia się w nieczytelny obrazek.'],
      ['Brak kontekstu użycia', 'Kupujący nie rozumie rozmiaru, sposobu montażu albo realnego zastosowania. W efekcie musi dopowiadać sobie informacje, zamiast dostać je z galerii.'],
      ['Niespójny styl zdjęć', 'Każde zdjęcie wygląda jak z innej oferty. To obniża zaufanie, szczególnie gdy produkt konkuruje z lepiej ułożonymi galeriami.']
    ],
    process: [
      ['Analiza obecnych materiałów', 'Sprawdzam miniaturę, aktualną galerię, zdjęcia producenta, konkurencyjne oferty i to, jakie pytania mogą pojawić się przed zakupem. Na tym etapie ustalam, czy wystarczą obecne materiały, czy potrzebne są dodatkowe ujęcia.'],
      ['Plan galerii', 'Układam kolejność zdjęć i funkcję każdego kadru. Oddzielam zdjęcie główne od ujęć wyjaśniających, detali, infografik i zdjęć kontekstowych, aby galeria prowadziła kupującego logicznie.'],
      ['Przygotowanie grafik', 'Tworzę lub porządkuję miniaturę, packshoty, detale i infografiki. Dbam o spójny styl, czytelny kontrast, odpowiedni kadr oraz brak elementów, które utrudniają decyzję.'],
      ['Kontrola publikacyjna', 'Na końcu sprawdzam, czy materiały mają sens jako komplet: czy pierwsze zdjęcie przyciąga uwagę, czy kolejne odpowiadają na pytania i czy oferta nie wymaga dodatkowego doprecyzowania w opisie.']
    ],
    caseStudy: {
      href: '/realizacje/#elektronarzedzia',
      title: 'Przykład: elektronarzędzie z jednego zdjęcia do pełnej galerii',
      text: 'W case study Metabo punktem wyjścia było pojedyncze zdjęcie zestawu. Galeria została rozpisana tak, aby kupujący zobaczył zawartość, detale, walizkę, oznaczenia i sposób użycia bez szukania informacji w opisie. To dobry przykład sytuacji, w której zdjęcia przejmują część pracy sprzedawcy.'
    },
    faq: [
      ['Czy muszę wysyłać produkt do zdjęć?', 'Nie zawsze. Często wystarczą dobre zdjęcia bazowe, pliki producenta albo obecna oferta. Jeśli potrzebna jest fizyczna sesja, zakres trzeba ustalić osobno.'],
      ['Czy przygotowujesz tylko zdjęcie główne?', 'Tak, jeśli problemem jest głównie miniatura. Zwykle rekomenduję jednak sprawdzić całą galerię, bo mocne pierwsze zdjęcie powinno prowadzić do kolejnych informacji.'],
      ['Czy infografiki pasują do każdej kategorii?', 'Nie w każdej kategorii muszą wyglądać tak samo, ale w produktach technicznych, BHP, narzędziach, akcesoriach i zestawach często bardzo pomagają uporządkować decyzję.'],
      ['Czy zdjęcia będą zgodne z zasadami Allegro?', 'Materiały przygotowuję z myślą o czytelności i zasadach marketplace. Jeśli dana kategoria wymaga prostszego tła, projekt jest dopasowany do tego ograniczenia.'],
      ['Co jeśli obecne zdjęcia są słabe?', 'Wtedy wskazuję, co da się poprawić, a czego nie warto udawać obróbką. Czasem lepsza jest krótka lista brakujących ujęć niż przerabianie materiału, który nie pokazuje produktu uczciwie.']
    ]
  },
  {
    file: 'opisy-produktow-allegro/index.html',
    url: '/opisy-produktow-allegro/',
    robots: 'noindex, follow',
    title: 'Opisy produktów Allegro — tytuł SEO i treść oferty | OfertaStudio.pl',
    description: 'Opisy produktów Allegro: tytuł SEO, korzyści, parametry i FAQ gotowe do wklejenia. Wyślij ofertę i zapytaj o Tekst Pack od 179 zł.',
    h1: 'Opisy produktów Allegro: copywriting, tytuł SEO i struktura bloków',
    label: 'Opisy produktów Allegro',
    eyebrow: 'Copywriting Allegro',
    lead: 'Opis produktu Allegro powinien pomagać kupującemu podjąć decyzję, a nie tylko powtarzać dane techniczne. Dobry tekst łączy tytuł SEO, korzyści, parametry, odpowiedzi na obawy i strukturę bloków, którą da się wygodnie przenieść do oferty.',
    cta: 'Zapytaj o opis produktu',
    serviceType: 'Tytuły SEO, opisy produktów, korzyści, parametry i FAQ do ofert Allegro',
    serviceName: 'Opisy produktów Allegro',
    offerName: 'Tekst Pack',
    price: '179',
    intro: [
      'W wielu ofertach opis jest traktowany jak miejsce na kopiuj-wklej z katalogu producenta. Problem polega na tym, że kupujący nie szuka tam tylko specyfikacji. Chce zrozumieć, czy produkt pasuje do jego sytuacji, czym różni się od podobnych modeli i czy nie będzie żałował zakupu.',
      'Copywriting do Allegro musi pracować razem z tytułem, zdjęciem głównym i galerią. Tytuł SEO pomaga dopasować ofertę do zapytań, ale opis powinien rozwinąć obietnicę z miniatury: pokazać zastosowanie, wyjaśnić parametry, uporządkować zestaw i odpowiedzieć na pytania, które najczęściej blokują kliknięcie w przycisk zakupu.',
      'Usługa polega na przygotowaniu treści w strukturze bloków. Zamiast jednego długiego akapitu powstaje logiczny układ: krótkie otwarcie, najważniejsze korzyści, parametry w czytelnej formie, scenariusze użycia, zawartość zestawu, FAQ i rekomendacje do galerii, jeśli tekst ujawnia brakujące zdjęcia.',
      'Nie obiecuję magicznej sprzedaży z samego opisu, bo wynik zależy też od ceny, konkurencji, opinii i dostępności. Dobrze napisany opis zmniejsza jednak chaos informacyjny. Kupujący szybciej rozumie produkt, a sprzedawca nie musi odpowiadać na te same pytania w wiadomościach.'
    ],
    fit: [
      ['Masz opis od producenta', 'Katalogowy opis bywa poprawny, ale rzadko jest napisany językiem decyzji zakupowej. Usługa ma sens, gdy chcesz przełożyć dane techniczne na argumenty zrozumiałe dla klienta.'],
      ['Tytuł nie zbiera intencji', 'Jeżeli tytuł zawiera przypadkowe słowa albo pomija ważny wariant produktu, klient może nie rozpoznać, że oferta odpowiada na jego wyszukiwanie.'],
      ['Klienci pytają o podstawy', 'Pytania o zawartość zestawu, kompatybilność, zastosowanie albo sposób użycia często pokazują, że opis nie wyprzedza wątpliwości kupującego.'],
      ['Oferta ma dużo informacji', 'Im bardziej techniczny produkt, tym większe ryzyko chaosu. Tekst pomaga ułożyć dane w kolejności, w której klient faktycznie podejmuje decyzję.']
    ],
    prepare: [
      ['Obecny opis lub szkic', 'Nawet słaby opis jest przydatny, bo pokazuje, jakie informacje są już dostępne i gdzie giną najważniejsze argumenty.'],
      ['Dane techniczne', 'Parametry, materiały, normy, warianty i kompatybilność powinny być jasne przed pisaniem, żeby tekst nie musiał dopowiadać niepotwierdzonych rzeczy.'],
      ['Zdjęcia lub link do galerii', 'Tekst musi pasować do tego, co klient widzi. Jeżeli opis mówi o detalu, którego nie ma w galerii, warto dodać rekomendację zdjęcia.'],
      ['Najczęstsze pytania klientów', 'Jeżeli sprzedawca dostaje powtarzalne pytania, można zamienić je w FAQ i sekcje opisu, które ograniczą niejasności przed zakupem.'],
      ['Ograniczenia i wyłączenia', 'Warto wskazać, czego produkt nie robi, do czego nie pasuje albo kiedy wymaga dodatkowych elementów. Uczciwy opis często zwiększa zaufanie bardziej niż ogólnikowa obietnica.']
    ],
    attention: [
      ['Pierwsze zdania opisu', 'Początek nie może być pustym sloganem. Powinien szybko powiedzieć, co to za produkt, dla kogo jest i jaki problem rozwiązuje.'],
      ['Naturalny tytuł SEO', 'Tytuł powinien łączyć frazę docelową z czytelnością. Upychanie słów kluczowych utrudnia decyzję i może wyglądać mniej profesjonalnie.'],
      ['Język korzyści', 'Nie wystarczy napisać, że produkt jest solidny. Trzeba pokazać, z czego to wynika i jak ta cecha przekłada się na użycie.'],
      ['Skanowanie na mobile', 'Bloki muszą być krótkie, a śródtytuły konkretne. Kupujący na telefonie powinien znaleźć parametry i odpowiedzi bez przewijania ściany tekstu.'],
      ['Zgodność z galerią', 'Opis i zdjęcia powinny wzajemnie się wzmacniać. Jeżeli tekst mówi o czymś ważnym, galeria powinna to pokazać albo przynajmniej nie zaprzeczać przekazowi.']
    ],
    aftercare: [
      ['Sprawdź pytania po publikacji', 'Po wdrożeniu opisu warto obserwować, czy klienci nadal pytają o te same rzeczy. Jeżeli tak, sekcje FAQ, parametry albo opis zastosowania wymagają doprecyzowania.'],
      ['Nie kopiuj tekstu bez kontroli', 'Opis przygotowany dla jednego produktu może być dobrym wzorem, ale nie powinien być mechanicznie powielany na całą kategorię. Każdy wariant ma inne cechy i ograniczenia.'],
      ['Aktualizuj tytuł przy zmianie wariantu', 'Jeśli zmienia się model, rozmiar, komplet lub ważny parametr, tytuł SEO też powinien zostać sprawdzony. Nieaktualny tytuł przyciąga niewłaściwe oczekiwania.'],
      ['Porównuj opis z galerią', 'Po dodaniu nowych zdjęć sprawdź, czy tekst nadal odpowiada temu, co widać w ofercie. Czasem jedno nowe ujęcie pozwala skrócić akapit albo przenieść informację do infografiki.'],
      ['Pilnuj tonu marki sprzedawcy', 'Opis powinien być konkretny, ale nie musi brzmieć tak samo w każdej kategorii. Produkty techniczne wymagają innego akcentu niż kosmetyki albo produkty lifestyle.'],
      ['Zostaw miejsce na realne dane', 'Jeżeli nie masz potwierdzonej informacji, nie wpisuj jej na siłę. Lepiej oznaczyć brak danych do uzupełnienia niż tworzyć obietnicę, której sprzedawca nie może obronić.']
    ],
    deliverables: [
      ['Tytuł SEO', 'Propozycja tytułu z główną frazą, ważnymi parametrami i językiem kupującego, bez upychania słów kluczowych kosztem czytelności.'],
      ['Opis sprzedażowy', 'Treść otwierająca ofertę, która wyjaśnia, co to za produkt, dla kogo jest i dlaczego warto czytać dalej.'],
      ['Sekcja korzyści', 'Przełożenie cech technicznych na praktyczne sytuacje: co klient zyskuje, czego unika i w jakim zastosowaniu produkt ma sens.'],
      ['Parametry w strukturze', 'Uporządkowane dane techniczne, zawartość zestawu, kompatybilność, normy albo ograniczenia przedstawione w sposób łatwy do skanowania.'],
      ['FAQ do oferty', 'Zestaw pytań i odpowiedzi, które zamykają typowe wątpliwości przed zakupem, bez obietnic niemożliwych do potwierdzenia.'],
      ['Rekomendacje do zdjęć', 'Jeśli tekst wymaga pokazania cechy w galerii, wskazuję, jaki kadr lub infografika powinny uzupełnić opis.']
    ],
    mistakes: [
      ['Opis jest kopią specyfikacji', 'Parametry są potrzebne, ale bez interpretacji klient nie wie, co oznaczają w praktyce. Sama tabela nie zastępuje argumentów sprzedażowych.'],
      ['Tytuł SEO jest przeładowany', 'Frazy są dodane mechanicznie, przez co tytuł wygląda nienaturalnie i gorzej tłumaczy produkt na liście ofert.'],
      ['Brakuje struktury bloków', 'Długi tekst bez śródtytułów i krótkich sekcji jest trudny do czytania, szczególnie na telefonie. Kupujący skanuje, a nie analizuje każde zdanie.'],
      ['Korzyści są ogólne', 'Sformułowania typu wysoka jakość albo solidne wykonanie nie mówią nic konkretnego. Opis powinien pokazać, z czego ta jakość wynika.'],
      ['Opis obiecuje za dużo', 'Deklaracje bez pokrycia mogą obniżyć zaufanie i naruszać zasady marketplace. Lepiej pokazać realną przewagę niż pisać najwięcej i najlepiej.'],
      ['FAQ nie odpowiada na realne pytania', 'Sekcja FAQ bywa dopisana na końcu, ale nie wynika z produktu. Dobre FAQ dotyczy kompatybilności, zastosowania, zestawu, montażu albo ograniczeń.']
    ],
    process: [
      ['Analiza produktu i obecnej oferty', 'Sprawdzam tytuł, opis, parametry, zdjęcia i konkurencyjne wyniki. Szukam tego, czego kupujący może nie zrozumieć albo czego oferta nie mówi wystarczająco wcześnie.'],
      ['Mapa informacji', 'Układam kolejność treści: co musi pojawić się w tytule, co w pierwszym ekranie opisu, co w sekcji korzyści, a co w parametrach i FAQ.'],
      ['Pisanie treści', 'Przygotowuję tytuł SEO i opis w blokach. Język jest konkretny, sprzedażowy, ale bez sztucznych obietnic i bez tekstu lanego tylko po to, żeby zwiększyć objętość.'],
      ['Kontrola wdrożenia', 'Na końcu sprawdzam, czy tekst da się wygodnie wkleić do oferty i czy nie wymaga dodatkowych zdjęć, infografik albo doprecyzowania parametrów.']
    ],
    caseStudy: {
      href: '/realizacje/#spawalnictwo',
      title: 'Przykład: produkt techniczny wymagający jasnych argumentów',
      text: 'W przykładzie z drutem spawalniczym ważne były parametry, pochodzenie produktu i czytelne pokazanie opakowania. Taki typ produktu pokazuje, dlaczego opis nie może być tylko katalogiem danych. Treść powinna wyjaśnić, co oznaczają parametry i dlaczego kupujący ma im zaufać.'
    },
    faq: [
      ['Czy przygotowujesz tylko opis, bez zdjęć?', 'Tak. Tekst Pack może obejmować sam tytuł, opis, parametry, sekcje korzyści i FAQ. Jeśli widzę problem w galerii, dodaję krótką rekomendację.'],
      ['Czy opis jest gotowy do wklejenia?', 'Tak, materiał jest układany tak, aby dało się go łatwo przenieść do oferty. Ostateczne formatowanie zależy od edytora Allegro i ustawień sprzedawcy.'],
      ['Czy używasz słów kluczowych?', 'Tak, ale bez upychania fraz. Tytuł i opis mają brzmieć naturalnie i pomagać kupującemu, a nie wyglądać jak lista słów.'],
      ['Czy można poprawić istniejący opis?', 'Tak. Możesz wysłać obecny opis, a ja uporządkuję tytuł, strukturę informacji, korzyści, parametry i pytania klienta.'],
      ['Czy opis może być krótki?', 'Może, jeśli produkt jest prosty i galeria dobrze tłumaczy ofertę. Ważniejsza od długości jest kompletność informacji oraz to, czy tekst pomaga kupującemu podjąć decyzję.']
    ]
  },
  {
    file: 'optymalizacja-ofert-allegro/index.html',
    url: '/optymalizacja-ofert-allegro/',
    robots: 'noindex, follow',
    title: 'Optymalizacja ofert Allegro — zdjęcia, opis, tytuł SEO | OfertaStudio.pl',
    description: 'Optymalizacja ofert Allegro: miniatura, galeria, opis i tytuł SEO w jednym procesie. Wyślij link i zapytaj o Ofertę Pro od 399 zł.',
    h1: 'Optymalizacja ofert Allegro: miniatura, galeria, opis i algorytm Allegro',
    label: 'Optymalizacja ofert Allegro',
    eyebrow: 'Oferta Pro',
    lead: 'Optymalizacja ofert Allegro polega na uporządkowaniu całej prezentacji produktu: zdjęcia głównego, galerii, tytułu SEO, opisu, parametrów i argumentów sprzedażowych. Chodzi o to, żeby kupujący szybciej rozumiał produkt, a oferta była spójna z tym, czego szuka w marketplace.',
    cta: 'Zapytaj o optymalizację',
    serviceType: 'Optymalizacja zdjęcia, galerii, tytułu SEO i opisu oferty Allegro',
    serviceName: 'Optymalizacja ofert Allegro',
    offerName: 'Oferta Pro',
    price: '399',
    intro: [
      'Allegro to środowisko porównywania. Kupujący widzi wiele podobnych ofert, filtruje po cenie, patrzy na miniaturę, tytuł, parametry, opinie i dostępność. Jeśli oferta nie tłumaczy wartości produktu szybko, nawet dobry produkt może przegrać z gorzej dobranym, ale lepiej pokazanym konkurentem.',
      'Optymalizacja nie oznacza dopisania kilku słów kluczowych. Algorytm Allegro i zachowanie kupujących wymagają spójności: tytuł powinien odpowiadać na zapytanie, miniatura powinna być czytelna, parametry powinny być kompletne, galeria powinna rozwijać argumenty, a opis powinien porządkować decyzję.',
      'W praktyce praca zaczyna się od diagnozy. Sprawdzam, co kupujący widzi najpierw, gdzie oferta traci uwagę, które informacje są ukryte, a które elementy wyglądają przypadkowo. Dopiero potem powstaje rekomendowany zakres: sama miniatura, tekst, galeria albo pełna przebudowa oferty.',
      'Dobra optymalizacja jest uczciwa wobec produktu. Nie chodzi o obiecywanie wyników sprzedaży ani o agresywne hasła. Chodzi o poprawienie tych elementów, które sprzedawca realnie kontroluje: prezentacji, kompletności informacji, hierarchii argumentów i jakości materiałów.',
      'Ważne jest też oddzielenie problemów oferty od problemów samego biznesu. Jeśli produkt ma niekonkurencyjną cenę, długi czas dostawy albo mało opinii, sama treść tego nie naprawi. Optymalizacja może jednak sprawić, że kupujący szybciej zrozumie, co kupuje, jakie ma warianty i dlaczego warto rozważyć właśnie tę ofertę.'
    ],
    fit: [
      ['Oferta ma ruch, ale nie przekonuje', 'Jeżeli produkt jest oglądany, a pytania lub zakupy nie idą w parze z potencjałem, warto sprawdzić, czy prezentacja wyjaśnia wartość wystarczająco szybko.'],
      ['Produkt jest porównywany parametrami', 'W kategoriach technicznych klient zestawia warianty, normy, moc, wymiary, kompatybilność i zawartość zestawu. Optymalizacja pomaga pokazać te dane w logicznym porządku.'],
      ['Masz dobre elementy, ale brak spójności', 'Czasem zdjęcia, opis i tytuł są osobno poprawne, ale nie tworzą jednej historii. Usługa porządkuje je tak, żeby pracowały razem.'],
      ['Nie wiesz, od czego zacząć', 'Pełna optymalizacja ma sens, gdy problem jest rozproszony: miniatura, galeria, opis i parametry wymagają wspólnej decyzji, a nie pojedynczej kosmetycznej poprawki.']
    ],
    prepare: [
      ['Link do oferty', 'Najlepiej zacząć od działającej oferty, bo można ocenić nie tylko treść, ale też kolejność informacji, zdjęcia, tytuł i kontekst kategorii.'],
      ['Informacje o produkcie', 'Potrzebne są dane, których nie da się wywnioskować ze zdjęć: warianty, materiały, ograniczenia, komplet, zastosowanie i przewagi nad podobnymi modelami.'],
      ['Materiały wizualne', 'Obecne zdjęcia, grafiki lub pliki producenta pozwalają ustalić, czy da się z nich zbudować lepszą galerię, czy trzeba przygotować brakujące ujęcia.'],
      ['Priorytet biznesowy', 'Warto określić, czy najważniejsza jest poprawa jednej oferty, przygotowanie wzoru pod serię, czy sprawdzenie procesu na wybranym produkcie.'],
      ['Granice obietnic', 'Jeżeli produktu nie można reklamować w określony sposób, trzeba to uwzględnić przed pisaniem i projektowaniem. Optymalizacja nie powinna tworzyć ryzyka komunikacyjnego.']
    ],
    attention: [
      ['Zgodność tytułu z treścią', 'Tytuł przyciąga kliknięcie, ale opis i galeria muszą potwierdzić obietnicę. Niespójność szybko obniża zaufanie.'],
      ['Parametry i filtry', 'Dane w ofercie powinny wspierać wyszukiwanie i porównywanie. Braki w parametrach mogą sprawić, że klient nie znajdzie produktu w oczekiwanym filtrze.'],
      ['Hierarchia argumentów', 'Najważniejsze informacje powinny pojawić się wcześnie. Jeśli przewaga produktu jest ukryta na końcu opisu, wielu kupujących do niej nie dotrze.'],
      ['Rola miniatury', 'Miniatura nie musi mówić wszystkiego, ale musi jasno pokazać produkt i powód kliknięcia. To pierwszy etap całej optymalizacji.'],
      ['Spójność po wdrożeniu', 'Po zmianach oferta nie może wyglądać jak kilka osobnych poprawek. Zdjęcia, tytuł i opis powinny mieć jeden kierunek i ten sam poziom konkretu.']
    ],
    aftercare: [
      ['Wdrażaj zmiany w całości', 'Jeśli zmienisz tylko opis, a galeria nadal pokazuje stary układ informacji, efekt może być niespójny. Optymalizacja działa najlepiej, gdy elementy wspierają się nawzajem.'],
      ['Obserwuj, gdzie pojawiają się pytania', 'Pytania kupujących po wdrożeniu są dobrym testem. Jeżeli dotyczą danych, które miały być jasne, trzeba wrócić do kolejności zdjęć, parametrów lub FAQ.'],
      ['Pilnuj parametrów przy wariantach', 'Gdy dodajesz nowy wariant produktu, nie zakładaj, że stary układ pasuje automatycznie. Wariant może wymagać innego tytułu, zdjęcia głównego albo infografiki.'],
      ['Nie poprawiaj wszystkiego naraz bez celu', 'Po pierwszej optymalizacji warto zachować kierunek zmian i unikać przypadkowych eksperymentów. Każda kolejna poprawka powinna odpowiadać na konkretną barierę.'],
      ['Porównuj ofertę z kategorią', 'Kategoria Allegro zmienia się wraz z konkurencją. Co pewien czas warto sprawdzić, czy miniatura, cena informacji i sposób pokazania produktu nadal są czytelne.'],
      ['Twórz standard dla serii', 'Jeśli optymalizacja dotyczy jednego produktu z większej kategorii, warto potraktować ją jako wzór: kolejność zdjęć, styl opisu i zasady tytułów mogą uporządkować kolejne oferty.']
    ],
    deliverables: [
      ['Diagnoza oferty', 'Analiza tego, jak oferta wygląda na tle kategorii: miniatura, tytuł, galeria, opis, parametry, kolejność informacji i potencjalne bariery zakupowe.'],
      ['Nowy kierunek prezentacji', 'Rekomendacja, które elementy powinny zostać zmienione najpierw i jaki zakres ma największy sens dla konkretnego produktu.'],
      ['Tytuł SEO', 'Propozycja tytułu dopasowanego do języka kupującego i najważniejszych cech produktu, bez sztucznego przeładowania frazami.'],
      ['Galeria i infografiki', 'Układ zdjęć oraz propozycje materiałów wizualnych, które pokazują produkt, zestaw, detale, zastosowanie i przewagi.'],
      ['Opis i FAQ', 'Treść oferty ułożona w blokach: korzyści, parametry, scenariusze użycia, zawartość zestawu i odpowiedzi na typowe pytania.'],
      ['Plan wdrożenia', 'Praktyczna lista zmian do publikacji, tak aby sprzedawca wiedział, co zmienić i w jakiej kolejności.']
    ],
    mistakes: [
      ['Optymalizacja ogranicza się do tytułu', 'Sam tytuł SEO nie naprawi oferty, jeśli zdjęcie główne jest słabe, galeria nie tłumaczy produktu, a opis nie odpowiada na pytania kupującego.'],
      ['Galeria nie prowadzi przez decyzję', 'Zdjęcia są dodane przypadkowo. Brakuje kolejności: najpierw produkt, potem detale, zastosowanie, parametry i elementy, które zamykają obawy.'],
      ['Parametry są niepełne', 'W Allegro parametry pomagają filtrować i porównywać produkty. Braki mogą ograniczać widoczność albo powodować, że klient nie znajduje informacji w oczekiwanym miejscu.'],
      ['Oferta mówi językiem producenta', 'Opis jest poprawny technicznie, ale nie tłumaczy, co produkt daje kupującemu. Sprzedawca zna produkt, klient dopiero próbuje go zrozumieć.'],
      ['Brakuje wyróżnika', 'Produkt może być dobry, ale oferta nie pokazuje, dlaczego warto wybrać właśnie ten wariant, zestaw, materiał, normę albo konfigurację.'],
      ['Zmiany są robione bez priorytetów', 'Sprzedawca poprawia losowe elementy, zamiast zacząć od tych, które są najbardziej widoczne i najszybciej wpływają na zrozumienie oferty.']
    ],
    process: [
      ['Mini audyt i wybór zakresu', 'Najpierw sprawdzam ofertę i wskazuję, co realnie blokuje jej czytelność. Dopiero po tym ustalany jest zakres, termin i cena płatnej realizacji.'],
      ['Analiza kategorii i intencji', 'Patrzę na sposób prezentacji podobnych produktów, język tytułów, typowe pytania kupujących i to, jak oferta może lepiej odpowiadać na intencję wyszukiwania.'],
      ['Przebudowa elementów oferty', 'Przygotowuję rekomendowane zmiany w miniaturze, galerii, tytule SEO, opisie i FAQ. Każdy element ma pracować z pozostałymi, a nie istnieć osobno.'],
      ['Przekazanie gotowego materiału', 'Otrzymujesz komplet do wdrożenia lub jasną listę zmian. Jeśli coś wymaga dodatkowych zdjęć albo danych produktu, jest to opisane wprost.']
    ],
    caseStudy: {
      href: '/realizacje/#narzedzia',
      title: 'Przykład: narzędzie wymagające pokazania parametrów',
      text: 'Case klucza dynamometrycznego pokazuje, że optymalizacja oferty technicznej nie polega na dekoracji. Ważne są ujęcia walizki, głowicy, skali Nm i zestawu informacji, które pozwalają kupującemu szybko ocenić zastosowanie produktu.'
    },
    faq: [
      ['Czy optymalizacja oznacza budowę oferty od zera?', 'Nie zawsze. Można poprawić istniejącą ofertę albo przygotować komplet materiałów od początku, zależnie od jakości obecnych zdjęć i treści.'],
      ['Czy można zacząć od jednej oferty?', 'Tak. Jedna oferta często wystarcza, żeby sprawdzić proces i wypracować styl dla kolejnych produktów.'],
      ['Czy obejmuje to zdjęcia i opisy?', 'Tak, jeśli taki zakres zostanie wybrany. Optymalizacja może obejmować miniaturę, galerię, infografiki, tytuł, opis, parametry i FAQ.'],
      ['Czy optymalizacja uwzględnia algorytm Allegro?', 'Tak, ale praktycznie: przez tytuł, parametry, kompletność informacji i dopasowanie oferty do tego, jak kupujący szuka oraz porównuje produkty.'],
      ['Czy to daje pewność wzrostu sprzedaży?', 'Nie. OfertaStudio poprawia elementy prezentacji produktu, ale wynik zależy też od ceny, konkurencji, historii konta, opinii, sezonu i popytu.']
    ]
  },
  {
    file: 'audyt-oferty-allegro/index.html',
    url: '/audyt-oferty-allegro/',
    robots: 'noindex, follow',
    title: 'Audyt oferty Allegro — miniatura, tytuł i galeria | OfertaStudio.pl',
    description: 'Audyt oferty Allegro: sprawdzę miniaturę, tytuł, galerię, opis i konkurencję. Wyślij link i odbierz bezpłatny mini audyt przed zmianami.',
    h1: 'Audyt oferty Allegro: checklista tego, co sprawdzamy przed zmianami',
    label: 'Audyt oferty Allegro',
    eyebrow: 'Mini audyt',
    lead: 'Audyt oferty Allegro to szybka diagnoza prezentacji produktu: miniatury, tytułu, galerii, opisu, parametrów i podstawowych barier zakupowych. Zamiast zgadywać, co poprawić, dostajesz checklistę elementów, które naprawdę wpływają na zrozumienie oferty.',
    cta: 'Odbierz mini audyt',
    serviceType: 'Audyt miniatury, tytułu, galerii, opisu i konkurencji oferty Allegro',
    serviceName: 'Audyt oferty Allegro',
    offerName: 'Start',
    price: '0',
    intro: [
      'Sprzedawcy często czują, że oferta nie działa, ale nie wiedzą, od czego zacząć. Problem może leżeć w miniaturze, tytule, braku parametrów, zdjęciach, opisie, cenie, konkurencji albo w kilku drobnych rzeczach naraz. Audyt porządkuje ten chaos i wskazuje pierwszy rozsądny krok.',
      'Audyt nie jest raportem dla samego raportu. Ma odpowiedzieć na praktyczne pytanie: co kupujący widzi, czego nie rozumie i gdzie oferta nie pomaga mu podjąć decyzji. Dlatego sprawdzam zarówno elementy wizualne, jak i tekstowe oraz strukturę informacji.',
      'Podstawowy mini audyt może zacząć się od linku do oferty, zdjęcia produktu albo krótkiego opisu pomysłu. Jeśli oferta jeszcze nie istnieje, audyt może wskazać, jakie materiały warto przygotować przed publikacją, aby nie budować strony produktu w ciemno.',
      'To dobre rozwiązanie, gdy nie wiesz, czy potrzebujesz zdjęć, opisu, pełnej optymalizacji czy tylko kilku poprawek. Audyt zmniejsza ryzyko zamawiania zakresu, który nie rozwiązuje głównego problemu.',
      'Najważniejsze w audycie jest nazwanie przyczyny, a nie wyliczenie przypadkowych sugestii. Jeżeli miniatura jest dobra, ale opis nie tłumaczy zastosowania, wnioski powinny kierować do tekstu. Jeżeli opis jest wystarczający, ale galeria nie pokazuje detali, priorytetem są zdjęcia. Dzięki temu sprzedawca nie wydaje czasu i budżetu na poprawki, które wyglądają efektownie, ale nie odpowiadają na realną barierę.',
      'Audyt jest też przydatny wtedy, gdy sprzedawca sam przygotowuje materiały i potrzebuje zewnętrznego spojrzenia przed publikacją. Krótka diagnoza pozwala uniknąć utrwalania błędów w kolejnych ofertach i ułatwia podjęcie decyzji bez presji.'
    ],
    fit: [
      ['Nie wiesz, gdzie jest problem', 'Audyt jest dobrym pierwszym krokiem, gdy oferta wygląda poprawnie, ale nie masz pewności, czy blokuje ją miniatura, opis, galeria, parametry czy ogólna logika prezentacji.'],
      ['Planujesz większą zmianę', 'Zanim zamówisz pełną przebudowę, warto sprawdzić, czy największy problem rzeczywiście wymaga dużego zakresu, czy wystarczy kilka konkretnych poprawek.'],
      ['Masz nowy produkt', 'Jeżeli oferta dopiero ma powstać, audyt może działać jak checklista przygotowania materiałów: jakie zdjęcia, dane i argumenty będą potrzebne przed publikacją.'],
      ['Chcesz porównać się z kategorią', 'Audyt pomaga zobaczyć, czy oferta odpowiada na standardy kategorii i czy kupujący dostaje informacje w podobnym lub lepszym porządku niż u konkurencji.']
    ],
    prepare: [
      ['Link lub projekt oferty', 'Może to być aktywna aukcja, szkic, screeny albo materiał przed publikacją. Ważne, żeby było widać, jak kupujący spotka się z produktem.'],
      ['Zdjęcia produktu', 'Jeżeli oferta nie istnieje, zdjęcia pozwalają ocenić, czy materiał bazowy nadaje się do miniatury, galerii i ewentualnych infografik.'],
      ['Krótki opis celu', 'Wystarczy informacja, czy chcesz poprawić jedną ofertę, sprawdzić nowy produkt, przygotować serię czy zrozumieć, dlaczego obecna prezentacja nie przekonuje.'],
      ['Najważniejsze dane', 'Parametry, warianty, komplet, ograniczenia i zastosowanie pomagają ocenić, czy oferta pokazuje to, co klient musi wiedzieć przed decyzją.'],
      ['Pytania od klientów', 'Jeżeli pewne pytania powtarzają się w wiadomościach, są mocnym sygnałem, że oferta nie zamyka konkretnej obawy.']
    ],
    attention: [
      ['Pierwsze wrażenie z listy', 'Sprawdzam, czy miniatura i tytuł mówią wystarczająco dużo, żeby kliknięcie miało sens wśród podobnych wyników.'],
      ['Kompletność informacji', 'Audyt wykrywa, czy kupujący musi zgadywać kluczowe rzeczy: wymiary, wariant, kompatybilność, zawartość zestawu albo sposób użycia.'],
      ['Ryzyko niezrozumienia produktu', 'Czasem oferta opisuje produkt poprawnie, ale zbyt późno tłumaczy jego zastosowanie. Wtedy klient może zrezygnować zanim dotrze do dobrych argumentów.'],
      ['Priorytet poprawki', 'Nie wszystkie zmiany są równie ważne. Audyt ma oddzielić rzeczy pilne od tych, które można zrobić później albo pominąć.'],
      ['Czy potrzebna jest płatna realizacja', 'Jeżeli wystarczy samodzielna poprawka, wnioski powinny to pokazać. Audyt nie ma sztucznie zwiększać zakresu pracy.']
    ],
    aftercare: [
      ['Zacznij od priorytetu numer jeden', 'Po audycie nie trzeba poprawiać wszystkiego naraz. Najpierw warto wykonać zmianę, która najbardziej wpływa na zrozumienie produktu albo kliknięcie w ofertę.'],
      ['Zapisz decyzje do kolejnych ofert', 'Jeżeli audyt pokazuje powtarzalny problem, na przykład słabe zdjęcie główne albo zbyt ogólny opis, potraktuj go jako zasadę dla następnych produktów.'],
      ['Oddziel problemy produktu od problemów oferty', 'Audyt dotyczy prezentacji. Jeśli produkt ma ograniczenia cenowe, dostępnościowe albo konkurencyjne, warto ich nie mieszać z oceną zdjęć i treści.'],
      ['Uzupełniaj brakujące materiały', 'Część wniosków może wymagać dodatkowych zdjęć, parametrów albo informacji o zestawie. Bez tych danych nie warto udawać pełnej optymalizacji.'],
      ['Wracaj do checklisty przed publikacją', 'Ta sama checklista przydaje się przy kolejnych ofertach: miniatura, tytuł, galeria, opis, parametry, FAQ i pytania, które kupujący może mieć przed kontaktem.'],
      ['Nie traktuj audytu jak wyroku', 'Audyt jest punktem decyzyjnym. Ma pomóc wybrać zakres pracy, a nie zamykać drogę do testowania lepszego tytułu, galerii albo innego układu opisu.']
    ],
    deliverables: [
      ['Ocena miniatury', 'Sprawdzenie, czy zdjęcie główne jest czytelne na liście ofert, pokazuje produkt i nie ginie obok konkurencji.'],
      ['Ocena tytułu', 'Weryfikacja, czy tytuł zawiera ważne informacje, jest naturalny, zrozumiały i dopasowany do sposobu szukania produktu.'],
      ['Ocena galerii', 'Sprawdzenie, czy zdjęcia prowadzą przez decyzję, czy pokazują detale, zastosowanie, skalę, zawartość zestawu i istotne parametry.'],
      ['Ocena opisu', 'Wskazanie, czy opis odpowiada na pytania kupującego, czy tylko powtarza dane producenta albo ukrywa najważniejsze argumenty.'],
      ['Lista priorytetów', 'Krótka checklista zmian: co poprawić najpierw, co może poczekać i jaki zakres pracy ma największy sens.'],
      ['Rekomendacja kolejnego kroku', 'Wskazanie, czy wystarczy poprawka tytułu, nowa galeria, opis, pełna optymalizacja albo przygotowanie brakujących materiałów.']
    ],
    mistakes: [
      ['Audyt jest zbyt ogólny', 'Komentarz typu poprawić zdjęcia nic nie daje. Sprzedawca potrzebuje wiedzieć, które zdjęcie, dlaczego i co ma się na nim znaleźć.'],
      ['Ocena pomija konkurencję', 'Oferta może wyglądać dobrze osobno, ale przegrywać na liście wyników. Audyt powinien brać pod uwagę kontekst kategorii.'],
      ['Brakuje priorytetów', 'Lista dwudziestu poprawek bez kolejności paraliżuje. Dobre wnioski pokazują, co ma największy wpływ na zrozumienie produktu.'],
      ['Skupienie tylko na wyglądzie', 'Estetyka jest ważna, ale oferta musi też tłumaczyć parametry, kompatybilność, zastosowanie i ograniczenia produktu.'],
      ['Pomijanie mobile', 'Kupujący często ogląda ofertę na telefonie. Zbyt drobne infografiki, długie bloki tekstu i nieczytelne miniatury tracą wtedy sens.'],
      ['Brak decyzji po audycie', 'Audyt powinien kończyć się jasnym wyborem: co poprawić, co zostawić i jaki zakres ewentualnej realizacji ma uzasadnienie.']
    ],
    process: [
      ['Wysyłasz link lub materiały', 'Możesz przesłać gotową ofertę, zdjęcia produktu albo opis pomysłu. Nie potrzebuję długiego briefu, aby wskazać pierwsze bariery.'],
      ['Sprawdzam ofertę checklistą', 'Patrzę na miniaturę, tytuł, galerię, opis, parametry, czytelność na mobile i podstawowy kontekst konkurencji.'],
      ['Otrzymujesz wnioski', 'Dostajesz konkretną informację, co poprawić i dlaczego. Bez ogólników i bez tworzenia sztucznej potrzeby większego zlecenia.'],
      ['Decydujesz o dalszym zakresie', 'Jeśli chcesz działać dalej, zakres, termin i cena są ustalane przed startem. Płatna realizacja nie zaczyna się bez akceptacji.']
    ],
    caseStudy: {
      href: '/realizacje/#bhp',
      title: 'Przykład: BHP i oferta z brakującymi informacjami wizualnymi',
      text: 'W case study rękawic BHP ważne były norma, detal lateksu, wnętrze i zastosowanie. To dobry przykład dla audytu, bo pokazuje, że jedna ciemna fotografia może ukryć informacje, których kupujący potrzebuje przed zakupem.'
    },
    faq: [
      ['Czy audyt jest tylko dla gotowych ofert?', 'Nie. Możesz wysłać też zdjęcia produktu, projekt oferty albo pomysł. Wtedy audyt pokaże, co warto przygotować przed publikacją.'],
      ['Czy muszę mieć dane sprzedażowe?', 'Nie. Dane mogą pomóc, ale podstawowy audyt opiera się na tym, co widzi kupujący: zdjęcie, tytuł, galeria, opis i konkurencja.'],
      ['Czy audyt obejmuje konkurencję?', 'Tak, w praktycznym zakresie. Sprawdzam, jak oferta wypada na tle typowych wyników w kategorii i co może utrudniać kliknięcie.'],
      ['Co jeśli nie mam linku do oferty?', 'Możesz zaznaczyć w formularzu, że nie masz gotowej oferty, i opisać produkt. Link nie jest wymagany, jeśli jesteś na wcześniejszym etapie.'],
      ['Czy audyt daje gotowy plan działania?', 'Tak, celem audytu jest wskazanie priorytetów. Po nim powinno być jasne, czy potrzebujesz zdjęć, opisu, pełnej optymalizacji czy tylko pojedynczych poprawek.']
    ]
  },
  {
    file: 'oferty-olx/index.html',
    url: '/oferty-olx/',
    robots: 'noindex, follow',
    title: 'Oferty OLX — zdjęcia i treść ogłoszenia | OfertaStudio.pl',
    description: 'Oferty OLX: zdjęcia, tytuł i treść ogłoszenia, które budują zaufanie na mobile. Wyślij produkt i zapytaj o przygotowanie oferty OLX.',
    h1: 'Poprawa ofert OLX: zdjęcia, tytuł i treść ogłoszenia pod specyfikę OLX',
    label: 'Oferty OLX',
    eyebrow: 'OLX',
    lead: 'Poprawa ofert OLX różni się od pracy nad Allegro. Na OLX liczy się szybkie zaufanie, jasny stan produktu, konkretna treść ogłoszenia, dobry kontakt i zdjęcia, które pokazują realny przedmiot bez przesadnego marketingu.',
    cta: 'Zapytaj o ofertę OLX',
    serviceType: 'Zdjęcia, tytuł i treść ogłoszenia OLX',
    serviceName: 'Oferty OLX',
    offerName: 'Oferta Pro',
    price: '399',
    intro: [
      'OLX działa inaczej niż Allegro. Kupujący częściej porównuje lokalnie, pyta o stan, odbiór, szczegóły i wiarygodność sprzedającego. Oferta musi szybko odpowiedzieć na pytanie, czy produkt jest wart kontaktu, a nie tylko wyglądać jak opis katalogowy.',
      'Na Allegro ważna jest struktura marketplace, parametry i algorytm. Na OLX duże znaczenie ma konkret: co sprzedajesz, w jakim stanie, co jest w zestawie, czy zdjęcia pokazują realny produkt i czy opis nie ukrywa informacji, o które kupujący zaraz zapyta w wiadomości.',
      'Usługa obejmuje poprawę zdjęć, tytułu i treści ogłoszenia. W zależności od produktu może to oznaczać lepszą kolejność zdjęć, dopisanie informacji o stanie, uporządkowanie zalet, usunięcie niejasności, dodanie pytań i odpowiedzi albo przygotowanie ogłoszenia od zera.',
      'Nie chodzi o to, żeby ogłoszenie OLX było długie. Powinno być kompletne, uczciwe i szybkie do przeczytania. Kupujący ma zrozumieć produkt, stan, sposób kontaktu i powód, dla którego warto napisać właśnie do Ciebie.',
      'Dobrze przygotowane ogłoszenie OLX zmniejsza liczbę rozmów z osobami, które nie pasują do oferty. Jeżeli w treści są jasno opisane stan, komplet, odbiór, ograniczenia i najważniejsze cechy, kontaktują się częściej osoby, które rozumieją warunki. To oszczędza czas sprzedawcy i poprawia jakość zapytań.',
      'W praktyce oznacza to mniej zgadywania po obu stronach. Kupujący szybciej wie, czy warto pisać, a sprzedawca może prowadzić konkretniejszą rozmowę.'
    ],
    fit: [
      ['Sprzedajesz produkt wymagający zaufania', 'Przy droższych, używanych albo technicznych produktach kupujący chce szybko zobaczyć stan, detale i konkrety. Ogłoszenie musi ograniczać niepewność.'],
      ['Masz dużo pytań w wiadomościach', 'Jeżeli kupujący ciągle pytają o te same rzeczy, opis powinien zostać przebudowany tak, aby odpowiadał na nie jeszcze przed kontaktem.'],
      ['Zdjęcia nie pokazują stanu', 'Na OLX zdjęcia powinny być uczciwe i praktyczne. Zbyt katalogowe albo zbyt przypadkowe kadry mogą utrudnić zaufanie do ogłoszenia.'],
      ['Chcesz odróżnić OLX od Allegro', 'Ten sam produkt może wymagać innego języka. OLX częściej potrzebuje bezpośredniego opisu, informacji logistycznych i jasnego tonu kontaktowego.']
    ],
    prepare: [
      ['Zdjęcia realnego produktu', 'Najlepiej przygotować kilka kadrów pokazujących przód, tył, detale, komplet i ewentualne ślady użycia. Nie trzeba ukrywać stanu, trzeba go jasno pokazać.'],
      ['Informacje o stanie', 'Warto podać, czy produkt jest nowy, używany, po zwrocie, niekompletny, testowany albo wymaga doprecyzowania. To wpływa na treść ogłoszenia.'],
      ['Dane o odbiorze lub wysyłce', 'Kupujący na OLX często pyta o logistykę. Informacje o odbiorze, wysyłce, lokalizacji albo sposobie kontaktu mogą skrócić rozmowę.'],
      ['Cena i zakres negocjacji', 'Jeśli cena jest stała albo podlega rozmowie, dobrze wiedzieć to przed pisaniem. Ton ogłoszenia może wtedy lepiej zarządzać oczekiwaniami.'],
      ['Najczęstsze obawy', 'Jeżeli produkt ma typowe pytania, na przykład o zgodność, uszkodzenia, komplet lub montaż, warto uwzględnić je w opisie i zdjęciach.']
    ],
    attention: [
      ['Pierwsze zdjęcie ogłoszenia', 'Na OLX pierwsze zdjęcie ma budować wiarygodność, nie tylko efekt wizualny. Powinno jasno pokazać realny produkt i zachęcić do dalszego sprawdzenia.'],
      ['Ton komunikacji', 'Opis powinien brzmieć naturalnie i konkretnie. Zbyt marketingowy język może nie pasować do charakteru OLX i budzić dystans.'],
      ['Informacje o stanie', 'Uczciwe wskazanie ograniczeń często zwiększa jakość kontaktów. Kupujący wie, czego się spodziewać, a sprzedawca unika przypadkowych rozmów.'],
      ['Czytelność na mobile', 'Ogłoszenie musi dać się szybko przeczytać na telefonie. Krótkie sekcje, konkretne dane i sensowna kolejność są ważniejsze niż długi opis.'],
      ['Różnica wobec Allegro', 'Na Allegro klient częściej oczekuje struktury marketplace. Na OLX częściej potrzebuje potwierdzenia, że produkt istnieje, jest jasno opisany i warto napisać do sprzedawcy.']
    ],
    aftercare: [
      ['Aktualizuj stan produktu', 'Jeżeli produkt został zarezerwowany, zmienił cenę, stracił element zestawu albo pojawiło się nowe zdjęcie, opis OLX powinien zostać szybko poprawiony.'],
      ['Notuj powtarzalne pytania', 'Wiadomości kupujących pokazują, czego brakuje w ogłoszeniu. Jeżeli kilka osób pyta o to samo, warto dodać tę informację do opisu lub zdjęć.'],
      ['Nie ukrywaj ograniczeń', 'Na OLX zaufanie jest kluczowe. Jasne pokazanie wady, śladu użycia albo braku elementu może zmniejszyć liczbę nietrafionych kontaktów i sporów.'],
      ['Testuj pierwsze zdjęcie', 'Jeśli ogłoszenie ma mało wejść albo słabe zainteresowanie, pierwszym elementem do sprawdzenia jest zwykle zdjęcie główne i tytuł, nie długi opis.'],
      ['Dopasuj ton do produktu', 'Inaczej pisze się ogłoszenie lokalne na używany sprzęt, a inaczej ofertę nowego produktu dla firmy. Styl powinien być naturalny dla sytuacji sprzedaży.'],
      ['Utrzymuj porządek w serii ogłoszeń', 'Jeżeli publikujesz kilka podobnych produktów, trzymaj podobną strukturę: stan, komplet, zastosowanie, odbiór, kontakt i ważne ograniczenia. Kupujący szybciej porównuje oferty.']
    ],
    deliverables: [
      ['Tytuł ogłoszenia', 'Propozycja tytułu, który jasno opisuje produkt, wariant, zastosowanie albo najważniejszą cechę bez sztucznego przeładowania frazami.'],
      ['Opis OLX', 'Treść ogłoszenia ułożona pod szybkie czytanie: co to za produkt, stan, zawartość, zastosowanie, odbiór lub wysyłka oraz najważniejsze pytania.'],
      ['Układ zdjęć', 'Rekomendacja kolejności fotografii: pierwsze zdjęcie, detale, skala, ewentualne ślady użycia, zestaw i elementy, które budują zaufanie.'],
      ['Lista brakujących informacji', 'Wskazanie danych, które warto dodać, aby ograniczyć przypadkowe pytania i nieporozumienia w wiadomościach.'],
      ['Poprawa języka sprzedaży', 'Usunięcie ogólników, dopisanie konkretów i uporządkowanie treści tak, aby nie brzmiała jak przypadkowa notatka.'],
      ['Wersja gotowa do publikacji', 'Materiał przygotowany tak, żeby można było przenieść go do ogłoszenia i ewentualnie dostosować do finalnych danych produktu.']
    ],
    mistakes: [
      ['Opis jest zbyt lakoniczny', 'Kupujący musi dopytywać o podstawowe informacje: stan, wymiary, komplet, kompatybilność, odbiór albo powód sprzedaży. To wydłuża kontakt i obniża zaufanie.'],
      ['Zdjęcia nie pokazują realnego stanu', 'Na OLX przesadnie katalogowy wygląd może działać gorzej niż uczciwe zdjęcia produktu, detali i ewentualnych śladów użycia.'],
      ['Tytuł jest za ogólny', 'Samo sprzedam wiertarkę albo fotelik dziecięcy nie pomaga w filtrowaniu i nie mówi, dlaczego ogłoszenie jest warte kliknięcia.'],
      ['Brakuje informacji logistycznych', 'Kupujący chce wiedzieć, czy możliwy jest odbiór, wysyłka, komplet akcesoriów albo szybki kontakt. Brak tych informacji generuje przypadkowe rozmowy.'],
      ['Treść brzmi niewiarygodnie', 'Zbyt mocne hasła, brak konkretów i pomijanie ograniczeń produktu mogą wywołać podejrzenie, szczególnie przy droższych rzeczach.'],
      ['Oferta wygląda jak z Allegro', 'OLX wymaga bardziej bezpośredniego, praktycznego stylu. Zbyt katalogowy opis może nie odpowiedzieć na pytania typowe dla kupującego z ogłoszenia.']
    ],
    process: [
      ['Analiza ogłoszenia lub produktu', 'Sprawdzam obecne zdjęcia, tytuł, opis i pytania, które kupujący może zadać przed kontaktem. Jeśli ogłoszenia jeszcze nie ma, wystarczy opis produktu i materiały.'],
      ['Ustalenie informacji zaufania', 'Wybieram elementy, które powinny być widoczne: stan, komplet, zastosowanie, ograniczenia, sposób odbioru, wysyłka, kontakt i ważne detale.'],
      ['Przygotowanie treści i zdjęć', 'Układam opis oraz rekomendowaną kolejność zdjęć. W razie potrzeby wskazuję, które kadry trzeba dodać, aby ogłoszenie było uczciwe i kompletne.'],
      ['Finalna wersja do publikacji', 'Otrzymujesz uporządkowany tekst i wskazówki do galerii. Ogłoszenie ma być gotowe do szybkiego skanowania na telefonie.']
    ],
    caseStudy: {
      href: '/realizacje/#dom-ogrod',
      title: 'Przykład: produkt dom i ogród pokazany w kontekście użycia',
      text: 'Case pistoletu ogrodowego dobrze pokazuje różnicę między samym zdjęciem produktu a prezentacją zastosowania. W OLX takie kontekstowe ujęcie może budować zaufanie, bo kupujący szybciej widzi realne użycie i skalę przedmiotu.'
    },
    faq: [
      ['Czy oferta OLX różni się od oferty Allegro?', 'Tak. Na OLX większe znaczenie ma zaufanie do ogłoszenia, jasny stan produktu, kontakt i lokalny kontekst sprzedaży. Allegro częściej wymaga bardziej uporządkowanej struktury marketplace.'],
      ['Czy można przygotować ogłoszenie bez gotowego linku?', 'Tak. Wystarczą zdjęcia produktu, informacje o stanie, cenie, lokalizacji lub sposobie odbioru oraz to, co chcesz podkreślić.'],
      ['Czy opis powinien być długi?', 'Nie. Powinien być kompletny, ale szybki do przeczytania. Najważniejsze informacje muszą pojawić się wcześnie, szczególnie na mobile.'],
      ['Czy warto pokazywać wady produktu?', 'Tak, jeśli produkt jest używany lub ma ograniczenia. Uczciwe pokazanie stanu zmniejsza liczbę nietrafionych zapytań i buduje zaufanie.'],
      ['Czy przygotowujesz też zdjęcia do OLX?', 'Mogę przygotować układ galerii, obróbkę istniejących zdjęć, rekomendacje ujęć lub komplet materiałów, zależnie od jakości zdjęć wejściowych.']
    ]
  }
];

const escapeHtml = text => String(text)
  .replace(/&/g, '&amp;')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;');

function organization() {
  return {
    '@type': 'Organization',
    '@id': ORG,
    name: 'OfertaStudio.pl',
    url: `${SITE}/`,
    logo: { '@type': 'ImageObject', url: OG, width: 1200, height: 630 },
    email: 'kontakt@ofertastudio.pl',
    telephone: '+48791162938',
    address: { '@type': 'PostalAddress', addressCountry: 'PL' }
  };
}

function website() {
  return {
    '@type': 'WebSite',
    '@id': WEBSITE,
    name: 'OfertaStudio.pl',
    url: `${SITE}/`,
    inLanguage: 'pl-PL',
    publisher: { '@id': ORG }
  };
}

function schemaFor(page) {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      organization(),
      website(),
      {
        '@type': 'Service',
        '@id': `${SITE}${page.url.replace(/\/$/, '')}#service`,
        name: page.serviceName,
        serviceType: page.serviceType,
        provider: { '@id': ORG },
        areaServed: { '@type': 'Country', name: 'Polska' },
        url: `${SITE}${page.url}`,
        description: page.intro[0],
        offers: {
          '@type': 'Offer',
          name: page.offerName,
          price: page.price,
          priceCurrency: 'PLN',
          url: `${SITE}/#pakiety`
        }
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${SITE}${page.url.replace(/\/$/, '')}#breadcrumb`,
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Strona główna', item: `${SITE}/` },
          { '@type': 'ListItem', position: 2, name: page.label, item: `${SITE}${page.url}` }
        ]
      },
      {
        '@type': 'FAQPage',
        '@id': `${SITE}${page.url.replace(/\/$/, '')}#faq`,
        mainEntity: page.faq.map(([name, text]) => ({
          '@type': 'Question',
          name,
          acceptedAnswer: { '@type': 'Answer', text }
        }))
      }
    ]
  };
}

function cards(items) {
  return items.map(([title, text]) => `
      <article class="card">
        <h3>${escapeHtml(title)}</h3>
        <p>${escapeHtml(text)}</p>
      </article>`).join('');
}

function processSteps(items) {
  return items.map(([title, text]) => `
      <article class="card step">
        <h3>${escapeHtml(title)}</h3>
        <p>${escapeHtml(text)}</p>
      </article>`).join('');
}

function listItems(items) {
  return items.map(([title, text]) => `
        <li><strong>${escapeHtml(title)}</strong> — ${escapeHtml(text)}</li>`).join('');
}

function faqItems(items, slug) {
  return items.map(([q, a], index) => {
    const id = `faq-${slug}-${index + 1}`;
    return `
    <div class="faq-item"><button class="faq-q" onclick="tFaq(this)" aria-expanded="false" aria-controls="${id}"><span>${escapeHtml(q)}</span><span class="faq-icon" aria-hidden="true">+</span></button><div class="faq-a" id="${id}" role="region"><div class="faq-a-inner">${escapeHtml(a)}</div></div></div>`;
  }).join('');
}

function relatedLinks(currentUrl) {
  return serviceLinks
    .filter(([, href]) => href !== currentUrl)
    .map(([label, href]) => `<a class="link-chip" href="${href}">${escapeHtml(label)}</a>`)
    .join('');
}

function render(page) {
  const slug = page.url.replace(/\//g, '-').replace(/^-|-$/g, '');
  const schema = JSON.stringify(schemaFor(page), null, 2);
  const intro = page.intro.map(text => `<p>${escapeHtml(text)}</p>`).join('\n        ');
  return `<!DOCTYPE html>
<html lang="pl" data-theme="light">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${escapeHtml(page.title)}</title>
<meta name="description" content="${escapeHtml(page.description)}">
<link rel="canonical" href="${SITE}${page.url}">
<meta name="robots" content="${page.robots || 'index, follow'}">
<meta property="og:type" content="website">
<meta property="og:locale" content="pl_PL">
<meta property="og:site_name" content="OfertaStudio.pl">
<meta property="og:url" content="${SITE}${page.url}">
<meta property="og:title" content="${escapeHtml(page.title)}">
<meta property="og:description" content="${escapeHtml(page.description)}">
<meta property="og:image" content="${OG}">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${escapeHtml(page.title)}">
<meta name="twitter:description" content="${escapeHtml(page.description)}">
<meta name="twitter:image" content="${OG}">
<script type="application/ld+json">
${schema}
</script>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@400;600;700&display=swap" media="print" onload="this.media='all'">
<noscript><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@400;600;700&display=swap"></noscript>
<link rel="stylesheet" href="/service-style.css">
<script src="/analytics.js" defer></script>
<link rel="stylesheet" href="/site-system.css">
</head>
<body>
<a class="skip-link" href="${SKIP_LINK_TARGET}">Przejdź do treści</a>
<div class="grid-bg"></div>
<div data-site-header></div>

<main id="main-content" class="wrap main" tabindex="-1">
  <nav data-site-breadcrumb data-breadcrumb-current="${escapeHtml(page.label)}"></nav>

  <section class="hero">
    <div class="hero-box">
      <div class="eyebrow">${escapeHtml(page.eyebrow)}</div>
      <h1>${escapeHtml(page.h1)}</h1>
      <p class="muted">${escapeHtml(page.lead)}</p>
      <div class="btns">
        <a class="btn btn-p" href="/#kontakt" data-event="hero_cta_click" data-location="hero">${escapeHtml(page.cta)}</a>
        <a class="btn btn-s" href="/realizacje/">Zobacz realizacje przed/po</a>
      </div>
    </div>
    <aside class="card note">
      <div class="eyebrow">Mini audyt</div>
      <h2>Zanim wybierzesz zakres, sprawdź co blokuje ofertę</h2>
      <p>Wyślij link, zdjęcia albo krótki opis produktu. Otrzymasz konkretną informację, co warto poprawić i jaki zakres pracy ma sens przed płatną realizacją.</p>
      <div class="btns">
        <a class="btn btn-p" href="/#kontakt" data-event="mini_audit_click" data-location="hero">Odbierz mini audyt</a>
      </div>
    </aside>
  </section>

  <section class="stack" aria-labelledby="service-about">
    <div class="card">
      <div class="eyebrow">Na czym polega usługa</div>
      <h2 id="service-about">${escapeHtml(page.serviceName)} w praktyce</h2>
      ${intro}
    </div>
  </section>

  <section class="faq-section" aria-labelledby="service-fit">
    <div class="s-head c">
      <div class="eyebrow">Dla kogo</div>
      <h2 class="s-title" id="service-fit">Kiedy ten zakres ma sens</h2>
      <p class="muted">Nie każda oferta wymaga tego samego działania. Ten zakres jest najbardziej przydatny w poniższych sytuacjach.</p>
    </div>
    <div class="grid">
      ${cards(page.fit)}
    </div>
  </section>

  <section class="card" aria-labelledby="service-prepare">
    <div class="eyebrow">Przygotowanie</div>
    <h2 id="service-prepare">Co warto przygotować przed kontaktem</h2>
    <p>Im lepszy punkt startowy, tym szybciej można ustalić sensowny zakres. Nie musi to być kompletny brief, ale poniższe informacje pomagają uniknąć zgadywania.</p>
    <ul class="list">
      ${listItems(page.prepare)}
    </ul>
  </section>

  <section class="faq-section" aria-labelledby="service-attention">
    <div class="s-head c">
      <div class="eyebrow">Kryteria</div>
      <h2 class="s-title" id="service-attention">Na co zwracam uwagę</h2>
      <p class="muted">Każda usługa ma inne akcenty, ale cel jest wspólny: oferta ma być bardziej czytelna, konkretna i łatwiejsza do podjęcia decyzji.</p>
    </div>
    <div class="grid">
      ${cards(page.attention)}
    </div>
  </section>

  <section class="faq-section" aria-labelledby="service-deliverables">
    <div class="s-head c">
      <div class="eyebrow">Zakres</div>
      <h2 class="s-title" id="service-deliverables">Co dostajesz</h2>
      <p class="muted">Zakres zawsze jest potwierdzany przed startem. Poniższe elementy pokazują, co zwykle wymaga uporządkowania przy tej usłudze.</p>
    </div>
    <div class="grid">
      ${cards(page.deliverables)}
    </div>
  </section>

  <section class="faq-section" aria-labelledby="service-mistakes">
    <div class="s-head c">
      <div class="eyebrow">Błędy</div>
      <h2 class="s-title" id="service-mistakes">Najczęstsze błędy</h2>
      <p class="muted">To problemy, które najczęściej osłabiają ofertę, zanim kupujący zdąży zapytać o szczegóły produktu.</p>
    </div>
    <div class="grid">
      ${cards(page.mistakes)}
    </div>
  </section>

  <section class="faq-section process" aria-labelledby="service-process">
    <div class="s-head c">
      <div class="eyebrow">Proces</div>
      <h2 class="s-title" id="service-process">Jak wygląda proces</h2>
    </div>
    <div class="grid">
      ${processSteps(page.process)}
    </div>
  </section>

  <section class="card" aria-labelledby="service-case">
    <div class="eyebrow">Przykład</div>
    <h2 id="service-case">${escapeHtml(page.caseStudy.title)}</h2>
    <p>${escapeHtml(page.caseStudy.text)}</p>
    <div class="btns">
      <a class="btn btn-s" href="${page.caseStudy.href}" data-event="case_study_click" data-location="service_page">Zobacz pasujące case study</a>
    </div>
  </section>

  <section class="faq-section" aria-labelledby="service-aftercare">
    <div class="s-head c">
      <div class="eyebrow">Po wdrożeniu</div>
      <h2 class="s-title" id="service-aftercare">Jak korzystać z przygotowanych zmian</h2>
      <p class="muted">Dobra podstrona produktu nie kończy się na jednorazowej publikacji. Po wdrożeniu warto pilnować kilku rzeczy, żeby oferta nie wróciła do starego chaosu.</p>
    </div>
    <div class="grid">
      ${cards(page.aftercare)}
    </div>
  </section>

  <section class="faq-section" id="faq" aria-labelledby="service-faq">
    <div class="s-head c">
      <div class="eyebrow">FAQ</div>
      <h2 class="s-title" id="service-faq">Mini-FAQ tej usługi</h2>
    </div>
    <div class="faq-wrap faq-wrap--centered">
      ${faqItems(page.faq, slug)}
    </div>
  </section>

  <section class="card" aria-labelledby="related-services">
    <div class="eyebrow">Powiązane usługi</div>
    <h2 id="related-services">Zobacz też inne zakresy</h2>
    <p>Jeśli po analizie okaże się, że problem leży w innym elemencie oferty, możesz przejść do powiązanego zakresu bez zaczynania od zera.</p>
    <div class="links">
      ${relatedLinks(page.url)}
      <a class="link-chip" href="/realizacje/">Realizacje</a>
      <a class="link-chip" href="/#pakiety">Pakiety</a>
    </div>
  </section>

  <section class="cta" aria-labelledby="service-final-cta">
    <div class="eyebrow">Następny krok</div>
    <h2 id="service-final-cta">Wyślij ofertę albo zdjęcia produktu</h2>
    <p class="muted">Nie potrzebujesz długiego briefu. Wystarczy link, zdjęcia albo krótki opis sytuacji. Najpierw sprawdzę, co warto poprawić i czy ten zakres rzeczywiście ma sens.</p>
    <div class="btns">
      <a class="btn btn-p" href="/#kontakt" data-event="mini_audit_click" data-location="service_final">Wyślij link do analizy</a>
      <a class="btn btn-s" href="/realizacje/">Zobacz portfolio</a>
    </div>
  </section>
</main>

<div data-site-footer></div>
<script src="/site-components.js"></script>
<script>
function tFaq(btn){
  const it=btn.closest(".faq-item"),op=it.classList.contains("open");
  document.querySelectorAll(".faq-item.open").forEach(i=>{
    if(i!==it){
      i.classList.remove("open");
      i.querySelector(".faq-q").setAttribute("aria-expanded","false");
    }
  });
  it.classList.toggle("open",!op);
  btn.setAttribute("aria-expanded",String(!op));
}
</script>
</body>
</html>
`;
}

for (const page of pages) {
  fs.writeFileSync(page.file, render(page).replace(/[ \t]+$/gm, ''));
}
