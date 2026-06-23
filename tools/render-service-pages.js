const fs = require('fs');

const SITE = 'https://ofertastudio.pl';
const OG = `${SITE}/og-default.jpg`;
const ORG = `${SITE}/#organization`;
const WEBSITE = `${SITE}/#website`;
const SKIP_LINK_TARGET = '#main-content';

const serviceLinks = [
  ['Zdjęcia produktowe Allegro', '/zdjecia-produktowe-allegro/'],
  ['Opisy produktów Allegro', '/opisy-produktow-allegro/'],
  ['Optymalizacja oferty Allegro', '/optymalizacja-ofert-allegro/'],
  ['Audyt oferty Allegro', '/audyt-oferty-allegro/'],
  ['Poprawa ogłoszenia OLX', '/oferty-olx/']
];

const pages = [
  {
    file: 'zdjecia-produktowe-allegro/index.html',
    url: '/zdjecia-produktowe-allegro/',
    title: 'Zdjęcia produktowe Allegro — miniatura i galeria | OfertaStudio.pl',
    description: 'Zdjęcia produktowe Allegro poprawione pod miniaturę, galerię i decyzję kupującego. Pokaż produkt szybciej, czytelniej i bez zgadywania.',
    h1: 'Zdjęcia produktowe Allegro, które są czytelne już w miniaturze',
    label: 'Zdjęcia produktowe Allegro',
    eyebrow: 'Zdjęcia produktowe',
    lead: 'Miniatura decyduje, czy kupujący da opisowi szansę. Porządkuję zdjęcie główne i galerię tak, żeby produkt był czytelny na liście, w karcie oferty i na telefonie.',
    heroCta: 'Wyślij zdjęcia — sprawdzę miniaturę i galerię',
    introHeading: 'Miniatura jest pierwszym testem oferty',
    finalCtaTitle: 'Sprawdź, czy zdjęcia pomagają kupującemu zrozumieć produkt',
    finalCtaText: 'Wyślij link albo zdjęcia produktu. Sprawdzę, czy wystarczy poprawa miniatury, czy galeria wymaga nowej kolejności, dodatkowych kadrów albo infografik. Zakres i cena przed startem.',
    serviceType: 'Zdjęcia produktowe, miniatury, galerie i infografiki do ofert Allegro',
    serviceName: 'Zdjęcia produktowe Allegro',
    offerName: 'Foto Start',
    price: '149',
    noteEyebrow: 'Wniosek',
    noteTitle: 'Opis nie nadrobi słabej miniatury',
    noteText: 'Jeżeli produkt na liście ofert jest mały, ciemny albo nie pokazuje zestawu, kupujący może nie dojść do opisu. Dlatego zaczynam od tego, co widać jako pierwsze.',
    noteCta: 'Pokaż produkt do oceny zdjęć',
    sections: {
      deliverables: {
        title: 'Co dostajesz w ramach pracy nad zdjęciami',
        text: 'Zakres zależy od materiałów wejściowych. Celem jest komplet obrazów, które mają jasne zadania: kliknięcie, zrozumienie zestawu, detal, skala, zastosowanie i parametry.'
      },
      mistakes: {
        title: 'Co psuje odbiór zdjęć na Allegro',
        text: 'Najczęściej nie chodzi o brak ładnych kadrów, tylko o brak informacji widocznych w odpowiednim momencie.'
      },
      fit: {
        title: 'Kiedy warto zacząć właśnie od zdjęć',
        text: 'Ten zakres ma największy sens, gdy kupujący musi zobaczyć produkt, wariant albo komplet zanim zacznie czytać opis.'
      },
      process: { title: 'Jak układam miniaturę i galerię' },
      prepare: {
        title: 'Co wysłać do oceny zdjęć',
        text: 'Na start wystarczy link do oferty, obecne zdjęcia albo pliki producenta. Jeśli brakuje kadru, którego nie da się uczciwie zastąpić grafiką, dostaniesz jasną informację.'
      },
      attention: {
        title: 'Kryteria dobrej galerii produktowej',
        text: 'Sprawdzam nie tylko estetykę, ale też czytelność na mobile, kolejność zdjęć, zgodność z opisem i to, czy każdy kadr odpowiada na realne pytanie kupującego.'
      },
      aftercare: {
        title: 'Jak używać galerii po wdrożeniu',
        text: 'Zdjęcia powinny pozostać spójne przy kolejnych wariantach i aktualizacjach produktu. Warto pilnować, czy nowe materiały nie rozbijają logiki galerii.'
      },
      faq: { title: 'FAQ o zdjęciach produktowych Allegro' },
      related: {
        title: 'Gdy problem nie kończy się na zdjęciach',
        text: 'Jeśli po galerii nadal brakuje tytułu, opisu albo pełnej logiki oferty, przejdź do powiązanego zakresu albo zacznij od audytu.'
      }
    },
    intro: [
      'Na Allegro zdjęcie główne pracuje zanim kupujący pozna opis, parametry i pełną galerię. Musi jasno pokazać, co jest sprzedawane, jaki jest wariant i dlaczego warto kliknąć właśnie tę ofertę.',
      'Galeria nie powinna być zbiorem podobnych ujęć. Każdy kadr ma mieć funkcję: produkt, zestaw, detal, skala, zastosowanie, parametr albo informacja, której klient nie powinien szukać w tekście.',
      'Nie każda realizacja wymaga sesji od zera. Często można zacząć od zdjęć bazowych, materiałów producenta albo obecnej oferty. Jeśli potrzebne są brakujące ujęcia, wskazuję je przed wyceną.'
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
      href: '/realizacje/#metabo',
      title: 'Przykład: elektronarzędzie z jednego zdjęcia do pełnej galerii',
      cta: 'Zobacz case: Metabo',
      text: 'W case study Metabo punktem wyjścia było pojedyncze zdjęcie zestawu. Galeria została rozpisana tak, aby kupujący zobaczył zawartość, detale, walizkę, oznaczenia i sposób użycia bez szukania informacji w opisie. To dobry przykład sytuacji, w której zdjęcia przejmują część pracy sprzedawcy.'
    },
    faq: [
      ['Czy muszę mieć gotowe zdjęcia?', 'Nie zawsze. Możesz wysłać link do oferty, obecne zdjęcia, pliki producenta albo materiał roboczy. Po sprawdzeniu wskażę, czy da się pracować na tym materiale.'],
      ['Czy robisz zdjęcia od zera?', 'Jeżeli produkt wymaga fizycznej sesji, zakres ustalamy osobno. Często praca polega jednak na uporządkowaniu istniejących zdjęć, przygotowaniu miniatury, galerii i infografik.'],
      ['Czy możesz poprawić zdjęcia producenta?', 'Tak, jeśli materiał pozwala uczciwie pokazać produkt. Zdjęcia producenta mogą być bazą, ale zwykle trzeba ułożyć je w logiczną galerię i dopowiedzieć brakujące informacje.'],
      ['Czy wystarczy samo zdjęcie główne?', 'Czasem tak. Jeśli jednak miniatura obiecuje coś, czego galeria nie rozwija, lepiej poprawić też kolejność zdjęć i brakujące kadry.'],
      ['Czy przygotowujesz zdjęcia także do OLX?', 'Tak, ale OLX wymaga innego akcentu: bardziej liczy się realny stan produktu, komplet, odbiór i zaufanie niż katalogowy wygląd galerii.'],
      ['Czy obiecujesz wzrost sprzedaży?', 'Nie. Poprawiam czytelność miniatury, galerii i informacji wizualnych. Wynik sprzedaży zależy też od ceny, konkurencji, opinii, sezonu, dostępności i samego produktu.']
    ]
  },
  {
    file: 'opisy-produktow-allegro/index.html',
    url: '/opisy-produktow-allegro/',
    title: 'Opisy produktów Allegro — tytuł i opis do wklejenia | OfertaStudio.pl',
    description: 'Opisy produktów Allegro pisane pod pytania kupującego: tytuł, lead, korzyści, parametry i FAQ gotowe do wdrożenia w ofercie.',
    h1: 'Opisy produktów Allegro, które zamykają pytania przed zakupem',
    label: 'Opisy produktów Allegro',
    eyebrow: 'Tytuł i opis Allegro',
    lead: 'Opis nie ma być długi. Ma wyjaśnić, dla kogo jest produkt, co oznaczają parametry i które wątpliwości kupującego trzeba zamknąć przed decyzją.',
    heroCta: 'Wyślij opis — pokażę, co skrócić i dopowiedzieć',
    introHeading: 'Dobry opis skraca drogę od pytania do decyzji',
    finalCtaTitle: 'Zamień chaotyczny opis w tekst gotowy do wdrożenia',
    finalCtaText: 'Wyślij obecny opis, link do oferty albo materiały producenta. Sprawdzę, co trzeba skrócić, przesunąć, dopowiedzieć i jak ułożyć tytuł oraz FAQ.',
    serviceType: 'Tytuły, opisy produktów, korzyści, parametry i FAQ do ofert Allegro',
    serviceName: 'Opisy produktów Allegro',
    offerName: 'Tekst Start',
    price: '79',
    noteEyebrow: 'Wniosek',
    noteTitle: 'Długi opis nie znaczy lepszy opis',
    noteText: 'Kupujący szuka odpowiedzi, nie ściany tekstu. Najważniejsze jest to, czy opis szybko tłumaczy zastosowanie, wariant, komplet i ograniczenia produktu.',
    noteCta: 'Wyślij opis do diagnozy',
    sections: {
      deliverables: {
        title: 'Co klient otrzymuje w tekście',
        text: 'Materiał ma być gotowy do wdrożenia albo jasny do dalszej pracy: tytuł, układ opisu, korzyści, parametry, FAQ i wskazówki do galerii.'
      },
      mistakes: {
        title: 'Co sprawia, że opis nie pomaga w decyzji',
        text: 'Najczęściej problemem nie jest brak tekstu, tylko zła kolejność informacji, kopiowanie producenta i brak odpowiedzi na realne pytania.'
      },
      fit: {
        title: 'Kiedy poprawa opisu ma największy sens',
        text: 'Ten zakres jest właściwy, gdy zdjęcia są wystarczające, ale tekst nie wyjaśnia produktu, nie porządkuje parametrów albo nie odpowiada na wątpliwości.'
      },
      process: { title: 'Jak powstaje tytuł, opis i FAQ' },
      prepare: {
        title: 'Co wysłać przed pisaniem',
        text: 'Nie potrzebujesz długiego briefu. Wystarczy obecna oferta, opis producenta, zdjęcia i podstawowe dane, których nie wolno dopowiadać na siłę.'
      },
      attention: {
        title: 'Kryteria dobrego opisu Allegro',
        text: 'Sprawdzam, czy tekst mówi językiem kupującego, czy działa na mobile i czy wspiera zdjęcia zamiast powtarzać przypadkową specyfikację.'
      },
      aftercare: {
        title: 'Jak rozwijać opis po publikacji',
        text: 'Po wdrożeniu warto obserwować pytania klientów. Jeśli wracają te same wątpliwości, opis lub FAQ wymagają doprecyzowania.'
      },
      faq: { title: 'FAQ o opisach produktów Allegro' },
      related: {
        title: 'Gdy sam tekst nie wystarczy',
        text: 'Jeśli opis ujawnia braki w zdjęciach, parametrach albo całej logice oferty, przejdź do galerii, optymalizacji lub audytu.'
      }
    },
    intro: [
      'Opis produktu Allegro powinien działać jak rozmowa z kupującym, który ma mało czasu. Najpierw musi zrozumieć, co to jest, dla kogo jest i czym różni się od podobnych ofert.',
      'Zamiast kopiować dane producenta, porządkuję informacje w kolejności decyzji: tytuł, krótkie otwarcie, zastosowanie, korzyści, parametry, zestaw, ograniczenia i FAQ.',
      'Nie obiecuję wzrostu sprzedaży z samego tekstu. Celem jest mniejszy chaos informacyjny: opis ma zamykać pytania, których kupujący nie powinien zadawać dopiero w wiadomości.'
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
      ['Naturalny tytuł oferty', 'Tytuł powinien pomagać znaleźć produkt i od razu go zrozumieć. Upychanie słów kluczowych utrudnia decyzję i może wyglądać mniej profesjonalnie.'],
      ['Język korzyści', 'Nie wystarczy napisać, że produkt jest solidny. Trzeba pokazać, z czego to wynika i jak ta cecha przekłada się na użycie.'],
      ['Skanowanie na mobile', 'Bloki muszą być krótkie, a śródtytuły konkretne. Kupujący na telefonie powinien znaleźć parametry i odpowiedzi bez przewijania ściany tekstu.'],
      ['Zgodność z galerią', 'Opis i zdjęcia powinny wzajemnie się wzmacniać. Jeżeli tekst mówi o czymś ważnym, galeria powinna to pokazać albo przynajmniej nie zaprzeczać przekazowi.']
    ],
    aftercare: [
      ['Sprawdź pytania po publikacji', 'Po wdrożeniu opisu warto obserwować, czy klienci nadal pytają o te same rzeczy. Jeżeli tak, sekcje FAQ, parametry albo opis zastosowania wymagają doprecyzowania.'],
      ['Nie kopiuj tekstu bez kontroli', 'Opis przygotowany dla jednego produktu może być dobrym wzorem, ale nie powinien być mechanicznie powielany na całą kategorię. Każdy wariant ma inne cechy i ograniczenia.'],
      ['Aktualizuj tytuł przy zmianie wariantu', 'Jeśli zmienia się model, rozmiar, komplet lub ważny parametr, tytuł oferty też powinien zostać sprawdzony. Nieaktualny tytuł przyciąga niewłaściwe oczekiwania.'],
      ['Porównuj opis z galerią', 'Po dodaniu nowych zdjęć sprawdź, czy tekst nadal odpowiada temu, co widać w ofercie. Czasem jedno nowe ujęcie pozwala skrócić akapit albo przenieść informację do infografiki.'],
      ['Pilnuj tonu marki sprzedawcy', 'Opis powinien być konkretny, ale nie musi brzmieć tak samo w każdej kategorii. Produkty techniczne wymagają innego akcentu niż kosmetyki albo produkty lifestyle.'],
      ['Zostaw miejsce na realne dane', 'Jeżeli nie masz potwierdzonej informacji, nie wpisuj jej na siłę. Lepiej oznaczyć brak danych do uzupełnienia niż tworzyć obietnicę, której sprzedawca nie może obronić.']
    ],
    deliverables: [
      ['Tytuł oferty', 'Propozycja tytułu z główną frazą, ważnymi parametrami i językiem kupującego, bez upychania słów kluczowych kosztem czytelności.'],
      ['Opis sprzedażowy', 'Treść otwierająca ofertę, która wyjaśnia, co to za produkt, dla kogo jest i dlaczego warto czytać dalej.'],
      ['Sekcja korzyści', 'Przełożenie cech technicznych na praktyczne sytuacje: co klient zyskuje, czego unika i w jakim zastosowaniu produkt ma sens.'],
      ['Parametry w czytelnym układzie', 'Uporządkowane dane techniczne, zawartość zestawu, kompatybilność, normy albo ograniczenia przedstawione w sposób łatwy do skanowania.'],
      ['FAQ do oferty', 'Zestaw pytań i odpowiedzi, które zamykają typowe wątpliwości przed zakupem, bez obietnic niemożliwych do potwierdzenia.'],
      ['Rekomendacje do zdjęć', 'Jeśli tekst wymaga pokazania cechy w galerii, wskazuję, jaki kadr lub infografika powinny uzupełnić opis.']
    ],
    mistakes: [
      ['Opis jest kopią specyfikacji', 'Parametry są potrzebne, ale bez interpretacji klient nie wie, co oznaczają w praktyce. Sama tabela nie pokazuje, co produkt daje i dla kogo jest.'],
      ['Tytuł jest przeładowany', 'Frazy są dodane mechanicznie, przez co tytuł wygląda nienaturalnie i gorzej tłumaczy produkt na liście ofert.'],
      ['Brakuje czytelnego układu', 'Długi tekst bez śródtytułów i krótkich sekcji jest trudny do czytania, szczególnie na telefonie. Kupujący skanuje, a nie analizuje każde zdanie.'],
      ['Korzyści są ogólne', 'Sformułowania typu wysoka jakość albo solidne wykonanie nie mówią nic konkretnego. Opis powinien pokazać, z czego ta jakość wynika.'],
      ['Opis obiecuje za dużo', 'Deklaracje bez pokrycia mogą obniżyć zaufanie i naruszać zasady marketplace. Lepiej pokazać realną przewagę niż pisać najwięcej i najlepiej.'],
      ['FAQ nie odpowiada na realne pytania', 'Sekcja FAQ bywa dopisana na końcu, ale nie wynika z produktu. Dobre FAQ dotyczy kompatybilności, zastosowania, zestawu, montażu albo ograniczeń.']
    ],
    process: [
      ['Analiza produktu i obecnej oferty', 'Sprawdzam tytuł, opis, parametry, zdjęcia i konkurencyjne wyniki. Szukam tego, czego kupujący może nie zrozumieć albo czego oferta nie mówi wystarczająco wcześnie.'],
      ['Mapa informacji', 'Układam kolejność treści: co musi pojawić się w tytule, co w pierwszym ekranie opisu, co w sekcji korzyści, a co w parametrach i FAQ.'],
      ['Pisanie treści', 'Przygotowuję tytuł oferty i opis w krótkich sekcjach. Język jest konkretny, sprzedażowy, ale bez sztucznych obietnic i tekstu lanego tylko po to, żeby zwiększyć objętość.'],
      ['Kontrola wdrożenia', 'Na końcu sprawdzam, czy tekst da się wygodnie wkleić do oferty i czy nie wymaga dodatkowych zdjęć, infografik albo doprecyzowania parametrów.']
    ],
    caseStudy: {
      href: '/realizacje/#spawalnictwo',
      title: 'Przykład: produkt techniczny wymagający jasnych argumentów',
      cta: 'Zobacz case: Spawalnictwo',
      text: 'W przykładzie z drutem spawalniczym ważne były parametry, pochodzenie produktu i czytelne pokazanie opakowania. Taki typ produktu pokazuje, dlaczego opis nie może być tylko katalogiem danych. Treść powinna wyjaśnić, co oznaczają parametry i dlaczego kupujący ma im zaufać.'
    },
    faq: [
      ['Czy dostanę gotowy tekst do wklejenia?', 'Tak. Materiał przygotowuję tak, aby dało się go przenieść do oferty. Ostateczne formatowanie zależy od edytora Allegro i ustawień sprzedawcy.'],
      ['Czy poprawiasz tylko opis, czy też tytuł?', 'Mogę poprawić sam opis, ale zwykle sprawdzam też tytuł, bo to on ustawia pierwsze oczekiwanie kupującego i wpływa na zrozumienie oferty.'],
      ['Czy możesz pisać na podstawie materiałów producenta?', 'Tak, ale nie kopiuję ich bezmyślnie. Materiały producenta traktuję jako bazę danych, którą trzeba przełożyć na język decyzji zakupowej.'],
      ['Czy opis musi być długi?', 'Nie. Opis ma być kompletny i łatwy do skanowania. Krótszy tekst może działać lepiej, jeśli odpowiada na właściwe pytania w dobrej kolejności.'],
      ['Czy działasz też z opisami OLX?', 'Tak, ale OLX wymaga prostszego i bardziej bezpośredniego języka: stan, komplet, odbiór, kontakt i najważniejsze ograniczenia powinny być widoczne szybko.'],
      ['Czy obiecujesz wzrost sprzedaży?', 'Nie. Poprawiam jakość tytułu, opisu i układu informacji. Sprzedaż zależy też od ceny, konkurencji, opinii, dostępności, sezonu i samego produktu.']
    ]
  },
  {
    file: 'optymalizacja-ofert-allegro/index.html',
    url: '/optymalizacja-ofert-allegro/',
    title: 'Optymalizacja oferty Allegro — zdjęcia, tytuł i opis | OfertaStudio.pl',
    description: 'Optymalizacja oferty Allegro, gdy zdjęcia, tytuł, parametry i opis muszą działać razem. Najpierw diagnoza, potem zakres zmian.',
    h1: 'Optymalizacja oferty Allegro, gdy zdjęcia, tytuł i opis muszą działać razem',
    label: 'Optymalizacja oferty Allegro',
    eyebrow: 'Pełna poprawa oferty Allegro',
    lead: 'Oferta działa dopiero wtedy, gdy zdjęcia, tytuł, parametry i opis mówią jednym językiem. Ten zakres porządkuje całą ścieżkę zrozumienia produktu, nie tylko jeden element.',
    heroCta: 'Wyślij ofertę — sprawdzę pełny zakres zmian',
    introHeading: 'Cała oferta musi mówić jednym językiem',
    finalCtaTitle: 'Sprawdź, czy oferta potrzebuje spójnego kierunku',
    finalCtaText: 'Wyślij link do oferty. Sprawdzę, czy wystarczy jedna poprawka, czy miniatura, galeria, tytuł, parametry i opis powinny zostać ułożone razem.',
    serviceType: 'Poprawa zdjęcia głównego, galerii, tytułu, opisu i układu oferty Allegro',
    serviceName: 'Optymalizacja oferty Allegro',
    offerName: 'Pełny zakres — wycena po analizie',
    price: '199',
    noteEyebrow: 'Wniosek',
    noteTitle: 'Jeden dobry element nie uratuje niespójnej oferty',
    noteText: 'Mocna miniatura traci sens, jeśli galeria nie rozwija informacji, a opis mówi innym językiem niż zdjęcia. W pełnej optymalizacji układam całość jako jeden system.',
    noteCta: 'Zacznij od sprawdzenia całej oferty',
    sections: {
      deliverables: {
        title: 'Co obejmuje optymalizacja oferty Allegro',
        text: 'Zakres jest dobierany po analizie. Może obejmować miniaturę, galerię, tytuł, opis, parametry, FAQ i plan wdrożenia dla jednej lub kilku ofert.'
      },
      mistakes: {
        title: 'Gdzie oferta rozpada się na osobne elementy',
        text: 'Pełna optymalizacja ma sens, gdy problem nie leży tylko w zdjęciu lub opisie, ale w braku wspólnego kierunku między elementami.'
      },
      fit: {
        title: 'Kiedy wybrać pełną optymalizację',
        text: 'To zakres dla sprzedawcy, który chce poprawić całą ofertę, przygotować wzór pod serię albo uporządkować kategorię produktów.'
      },
      process: { title: 'Jak porządkuję całą ofertę' },
      prepare: {
        title: 'Co wysłać do optymalizacji',
        text: 'Najlepiej zacząć od linku do aktywnej oferty. Dodatkowe zdjęcia, dane produktu i pytania klientów pomagają szybciej ocenić zakres.'
      },
      attention: {
        title: 'Elementy, które muszą działać razem',
        text: 'Sprawdzam kolejność kontaktu kupującego z ofertą: lista wyników, miniatura, tytuł, galeria, parametry, opis i FAQ.'
      },
      aftercare: {
        title: 'Jak utrzymać spójność po zmianach',
        text: 'Po wdrożeniu warto stosować tę samą logikę przy wariantach i kolejnych produktach, żeby seria ofert nie wróciła do przypadkowego układu.'
      },
      faq: { title: 'FAQ o optymalizacji oferty Allegro' },
      related: {
        title: 'Jeśli potrzebujesz tylko jednego elementu',
        text: 'Pełna optymalizacja nie zawsze jest konieczna. Jeśli problem jest punktowy, możesz przejść do zdjęć, opisu albo zacząć od audytu.'
      }
    },
    intro: [
      'Optymalizacja oferty Allegro jest potrzebna wtedy, gdy pojedyncza poprawka nie wystarczy. Produkt może mieć niezłe zdjęcia, poprawny tytuł i opis, ale nadal być trudny do szybkiego zrozumienia, jeśli każdy element akcentuje coś innego.',
      'Praca zaczyna się od sprawdzenia pełnej ścieżki: jak oferta wygląda na liście, co obiecuje miniatura, czy tytuł porządkuje wariant, czy galeria rozwija informacje i czy opis odpowiada na pytania zamiast powtarzać specyfikację.',
      'Nie chodzi o agresywne hasła ani gwarancje wyników. Chodzi o uporządkowanie elementów, które sprzedawca realnie kontroluje: prezentacji, kompletności informacji, kolejności argumentów i materiałów gotowych do wdrożenia.'
    ],
    fit: [
      ['Oferta ma ruch, ale nie przekonuje', 'Jeżeli produkt jest oglądany, a pytania lub zakupy nie idą w parze z potencjałem, warto sprawdzić, czy prezentacja wyjaśnia wartość wystarczająco szybko.'],
      ['Produkt jest porównywany parametrami', 'W kategoriach technicznych klient zestawia warianty, normy, moc, wymiary, kompatybilność i zawartość zestawu. Poprawa oferty pomaga pokazać te dane w logicznym porządku.'],
      ['Masz dobre elementy, ale brak spójności', 'Czasem zdjęcia, opis i tytuł są osobno poprawne, ale nie tworzą jednej historii. Usługa porządkuje je tak, żeby pracowały razem.'],
      ['Nie wiesz, od czego zacząć', 'Pełna poprawa oferty ma sens, gdy problem jest rozproszony: miniatura, galeria, opis i parametry wymagają wspólnej decyzji, a nie pojedynczej kosmetycznej zmiany.']
    ],
    prepare: [
      ['Link do oferty', 'Najlepiej zacząć od działającej oferty, bo można ocenić nie tylko treść, ale też kolejność informacji, zdjęcia, tytuł i kontekst kategorii.'],
      ['Informacje o produkcie', 'Potrzebne są dane, których nie da się wywnioskować ze zdjęć: warianty, materiały, ograniczenia, komplet, zastosowanie i przewagi nad podobnymi modelami.'],
      ['Materiały wizualne', 'Obecne zdjęcia, grafiki lub pliki producenta pozwalają ustalić, czy da się z nich zbudować lepszą galerię, czy trzeba przygotować brakujące ujęcia.'],
      ['Priorytet biznesowy', 'Warto określić, czy najważniejsza jest poprawa jednej oferty, przygotowanie wzoru pod serię, czy sprawdzenie procesu na wybranym produkcie.'],
      ['Granice obietnic', 'Jeżeli produktu nie można reklamować w określony sposób, trzeba to uwzględnić przed pisaniem i projektowaniem. Poprawa oferty nie powinna tworzyć ryzyka komunikacyjnego.']
    ],
    attention: [
      ['Zgodność tytułu z treścią', 'Tytuł przyciąga kliknięcie, ale opis i galeria muszą potwierdzić obietnicę. Niespójność szybko obniża zaufanie.'],
      ['Parametry i filtry', 'Dane w ofercie powinny wspierać wyszukiwanie i porównywanie. Braki w parametrach mogą sprawić, że klient nie znajdzie produktu w oczekiwanym filtrze.'],
      ['Hierarchia argumentów', 'Najważniejsze informacje powinny pojawić się wcześnie. Jeśli przewaga produktu jest ukryta na końcu opisu, wielu kupujących do niej nie dotrze.'],
      ['Rola miniatury', 'Miniatura nie musi mówić wszystkiego, ale musi jasno pokazać produkt i powód kliknięcia. To pierwszy etap porządkowania całej oferty.'],
      ['Spójność po wdrożeniu', 'Po zmianach oferta nie może wyglądać jak kilka osobnych poprawek. Zdjęcia, tytuł i opis powinny mieć jeden kierunek i ten sam poziom konkretu.']
    ],
    aftercare: [
      ['Wdrażaj zmiany w całości', 'Jeśli zmienisz tylko opis, a galeria nadal pokazuje stary układ informacji, efekt może być niespójny. Oferta działa najlepiej, gdy elementy wspierają się nawzajem.'],
      ['Obserwuj, gdzie pojawiają się pytania', 'Pytania kupujących po wdrożeniu są dobrym testem. Jeżeli dotyczą danych, które miały być jasne, trzeba wrócić do kolejności zdjęć, parametrów lub FAQ.'],
      ['Pilnuj parametrów przy wariantach', 'Gdy dodajesz nowy wariant produktu, nie zakładaj, że stary układ pasuje automatycznie. Wariant może wymagać innego tytułu, zdjęcia głównego albo infografiki.'],
      ['Nie poprawiaj wszystkiego naraz bez celu', 'Po pierwszym uporządkowaniu warto zachować kierunek zmian i unikać przypadkowych eksperymentów. Każda kolejna poprawka powinna odpowiadać na konkretną barierę.'],
      ['Porównuj ofertę z kategorią', 'Kategoria Allegro zmienia się wraz z konkurencją. Co pewien czas warto sprawdzić, czy miniatura, kolejność informacji i sposób pokazania produktu nadal są czytelne.'],
      ['Twórz standard dla serii', 'Jeśli poprawa dotyczy jednego produktu z większej kategorii, warto potraktować ją jako wzór: kolejność zdjęć, styl opisu i zasady tytułów mogą uporządkować kolejne oferty.']
    ],
    deliverables: [
      ['Diagnoza oferty', 'Analiza tego, jak oferta wygląda na tle kategorii: miniatura, tytuł, galeria, opis, parametry, kolejność informacji i potencjalne bariery zakupowe.'],
      ['Nowy kierunek prezentacji', 'Rekomendacja, które elementy powinny zostać zmienione najpierw i jaki zakres ma największy sens dla konkretnego produktu.'],
      ['Tytuł oferty', 'Propozycja tytułu dopasowanego do języka kupującego i najważniejszych cech produktu, bez sztucznego przeładowania frazami.'],
      ['Galeria i infografiki', 'Układ zdjęć oraz propozycje materiałów wizualnych, które pokazują produkt, zestaw, detale, zastosowanie i przewagi.'],
      ['Opis i FAQ', 'Treść oferty ułożona w blokach: korzyści, parametry, scenariusze użycia, zawartość zestawu i odpowiedzi na typowe pytania.'],
      ['Plan wdrożenia', 'Praktyczna lista zmian do publikacji, tak aby sprzedawca wiedział, co zmienić i w jakiej kolejności.']
    ],
    mistakes: [
      ['Poprawa ogranicza się do tytułu', 'Sam tytuł nie naprawi oferty, jeśli zdjęcie główne jest słabe, galeria nie tłumaczy produktu, a opis nie odpowiada na pytania kupującego.'],
      ['Galeria nie prowadzi przez decyzję', 'Zdjęcia są dodane przypadkowo. Brakuje kolejności: najpierw produkt, potem detale, zastosowanie, parametry i elementy, które zamykają obawy.'],
      ['Parametry są niepełne', 'W Allegro parametry pomagają filtrować i porównywać produkty. Braki mogą ograniczać widoczność albo powodować, że klient nie znajduje informacji w oczekiwanym miejscu.'],
      ['Oferta mówi językiem producenta', 'Opis jest poprawny technicznie, ale nie tłumaczy, co produkt daje kupującemu. Sprzedawca zna produkt, klient dopiero próbuje go zrozumieć.'],
      ['Brakuje wyróżnika', 'Produkt może być dobry, ale oferta nie pokazuje, dlaczego warto wybrać właśnie ten wariant, zestaw, materiał, normę albo konfigurację.'],
      ['Zmiany są robione bez priorytetów', 'Sprzedawca poprawia losowe elementy, zamiast zacząć od tych, które są najbardziej widoczne i najszybciej wpływają na zrozumienie oferty.']
    ],
    process: [
      ['Mini audyt i wybór zakresu', 'Najpierw sprawdzam ofertę i wskazuję, co realnie blokuje jej czytelność. Dopiero po tym ustalany jest zakres, termin i cena płatnej realizacji.'],
      ['Analiza kategorii i intencji', 'Patrzę na sposób prezentacji podobnych produktów, język tytułów, typowe pytania kupujących i to, jak oferta może lepiej odpowiadać na intencję wyszukiwania.'],
      ['Przebudowa elementów oferty', 'Przygotowuję rekomendowane zmiany w miniaturze, galerii, tytule, opisie i FAQ. Każdy element ma pracować z pozostałymi, a nie istnieć osobno.'],
      ['Przekazanie gotowego materiału', 'Otrzymujesz komplet do wdrożenia lub jasną listę zmian. Jeśli coś wymaga dodatkowych zdjęć albo danych produktu, jest to opisane wprost.']
    ],
    caseStudy: {
      href: '/realizacje/#narzedzia',
      title: 'Przykład: narzędzie wymagające pokazania parametrów',
      cta: 'Zobacz case: Narzędzia',
      text: 'Case klucza dynamometrycznego pokazuje, że poprawa oferty technicznej nie polega na dekoracji. Ważne są ujęcia walizki, głowicy, skali Nm i zestawu informacji, które pozwalają kupującemu szybko ocenić zastosowanie produktu.'
    },
    faq: [
      ['Czy optymalizacja oznacza budowę oferty od zera?', 'Nie zawsze. Można poprawić istniejącą ofertę albo przygotować komplet materiałów od początku, zależnie od jakości obecnych zdjęć, treści i danych produktu.'],
      ['Czy wystarczy link do oferty?', 'Tak. Link jest najlepszym punktem startu, bo pokazuje miniaturę, tytuł, galerię, opis, parametry i kontekst kategorii w jednym miejscu.'],
      ['Czy poprawiasz tylko opis, czy całą ofertę?', 'Zakres zależy od diagnozy. Optymalizacja może objąć miniaturę, galerię, infografiki, tytuł, opis, parametry, FAQ i plan wdrożenia.'],
      ['Czy muszę mieć nowe zdjęcia?', 'Nie zawsze. Czasem wystarczy uporządkować obecne materiały. Jeśli brakuje zdjęcia zestawu, detalu, skali albo zastosowania, wskażę to przed wyceną.'],
      ['Ile produktów mogę przesłać do analizy?', 'Możesz zacząć od jednej oferty albo małej serii. Przy większej liczbie produktów najpierw warto wybrać reprezentatywne przykłady.'],
      ['Czy obiecujesz wzrost sprzedaży?', 'Nie. Optymalizacja poprawia prezentację i zrozumiałość oferty, ale wynik zależy też od ceny, konkurencji, opinii, sezonu, dostępności i popytu.']
    ]
  },
  {
    file: 'audyt-oferty-allegro/index.html',
    url: '/audyt-oferty-allegro/',
    title: 'Audyt oferty Allegro — diagnoza i 3 poprawki | OfertaStudio.pl',
    description: 'Audyt oferty Allegro dla sprzedawców, którzy nie wiedzą, co blokuje ofertę. Wyślij link i otrzymaj 3 konkretne poprawki na start.',
    h1: 'Audyt oferty Allegro — sprawdź, gdzie kupujący traci zrozumienie',
    label: 'Audyt oferty Allegro',
    eyebrow: 'Mini audyt',
    lead: 'Nie poprawiaj oferty od środka. Najpierw zobacz, na którym etapie kupujący gubi sens produktu: miniatura, tytuł, galeria, parametry czy opis.',
    heroCta: 'Wyślij link — wskażę 3 poprawki',
    introHeading: 'Audyt zaczyna się od miejsca, w którym kupujący przestaje rozumieć ofertę',
    finalCtaTitle: 'Zacznij od diagnozy, nie od zgadywania zakresu',
    finalCtaText: 'Wyślij link, zdjęcia albo krótki opis produktu. Dostaniesz 3 konkretne poprawki i kierunek dalszej pracy. Płatny zakres ustalamy dopiero po tej odpowiedzi.',
    serviceType: 'Audyt miniatury, tytułu, galerii, opisu i konkurencji oferty Allegro',
    serviceName: 'Audyt oferty Allegro',
    offerName: 'Mini audyt',
    price: '0',
    noteEyebrow: 'Wniosek',
    noteTitle: 'Nie zaczynaj od poprawiania wszystkiego',
    noteText: 'Oferta może tracić uwagę przez jeden widoczny problem albo kilka drobnych luk. Audyt ma oddzielić priorytet od kosmetyki i wskazać pierwszy rozsądny krok.',
    noteCta: 'Wyślij link do mini audytu',
    sections: {
      deliverables: {
        title: 'Co dostajesz po audycie oferty',
        text: 'Audyt nie jest długim raportem dla samego raportu. Ma dać priorytety: co poprawić najpierw, dlaczego i jaki zakres ma sens.'
      },
      mistakes: {
        title: 'Jakie sygnały wykrywa audyt',
        text: 'Szukam miejsc, w których kupujący musi zgadywać, porównywać ręcznie albo przewijać dalej, żeby zrozumieć podstawowe informacje.'
      },
      fit: {
        title: 'Dla kogo audyt jest najlepszym startem',
        text: 'To właściwy krok, gdy nie wiesz, czy problem leży w zdjęciach, tytule, opisie, galerii, parametrach czy całej logice oferty.'
      },
      process: { title: 'Jak wygląda szybka diagnoza oferty' },
      prepare: {
        title: 'Co wysłać do mini audytu',
        text: 'Najlepszy jest link do aktywnej oferty. Jeśli oferta jeszcze nie istnieje, wystarczą zdjęcia produktu, szkic treści albo opis sytuacji.'
      },
      attention: {
        title: 'Kryteria diagnozy oferty Allegro',
        text: 'Patrzę na ofertę oczami kupującego: najpierw lista wyników, potem miniatura, tytuł, galeria, opis, parametry i pytania, które zostają bez odpowiedzi.'
      },
      aftercare: {
        title: 'Jak wykorzystać wnioski z audytu',
        text: 'Po audycie nie trzeba robić wszystkiego naraz. Najpierw warto wdrożyć zmianę, która najbardziej blokuje zrozumienie produktu.'
      },
      faq: { title: 'FAQ o audycie oferty Allegro' },
      related: {
        title: 'Co zrobić po audycie',
        text: 'Jeśli audyt pokaże konkretny problem, możesz przejść do zdjęć, opisu, pełnej optymalizacji albo przygotowania ogłoszenia OLX.'
      }
    },
    intro: [
      'Sprzedawcy często widzą, że oferta nie pracuje tak, jak powinna, ale nie wiedzą, czy winna jest miniatura, opis, tytuł, galeria, parametry czy porównanie z konkurencją.',
      'Audyt porządkuje ten moment niepewności. Sprawdzam, co kupujący widzi jako pierwsze, czego musi się domyślać i które informacje pojawiają się za późno, żeby pomóc w decyzji.',
      'Efektem są 3 konkretne poprawki na start oraz rekomendacja dalszego zakresu. Jeżeli wystarczy samodzielna zmiana, audyt powinien to pokazać zamiast sztucznie rozszerzać zlecenie.'
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
      ['Uzupełniaj brakujące materiały', 'Część wniosków może wymagać dodatkowych zdjęć, parametrów albo informacji o zestawie. Bez tych danych nie warto udawać pełnej poprawy oferty.'],
      ['Wracaj do checklisty przed publikacją', 'Ta sama checklista przydaje się przy kolejnych ofertach: miniatura, tytuł, galeria, opis, parametry, FAQ i pytania, które kupujący może mieć przed kontaktem.'],
      ['Nie traktuj audytu jak wyroku', 'Audyt jest punktem decyzyjnym. Ma pomóc wybrać zakres pracy, a nie zamykać drogę do testowania lepszego tytułu, galerii albo innego układu opisu.']
    ],
    deliverables: [
      ['Ocena miniatury', 'Sprawdzenie, czy zdjęcie główne jest czytelne na liście ofert, pokazuje produkt i nie ginie obok konkurencji.'],
      ['Ocena tytułu', 'Weryfikacja, czy tytuł zawiera ważne informacje, jest naturalny, zrozumiały i dopasowany do sposobu szukania produktu.'],
      ['Ocena galerii', 'Sprawdzenie, czy zdjęcia prowadzą przez decyzję, czy pokazują detale, zastosowanie, skalę, zawartość zestawu i istotne parametry.'],
      ['Ocena opisu', 'Wskazanie, czy opis odpowiada na pytania kupującego, czy tylko powtarza dane producenta albo ukrywa najważniejsze argumenty.'],
      ['Lista priorytetów', 'Krótka checklista zmian: co poprawić najpierw, co może poczekać i jaki zakres pracy ma największy sens.'],
      ['Rekomendacja kolejnego kroku', 'Wskazanie, czy wystarczy poprawka tytułu, nowa galeria, opis, pełne uporządkowanie oferty albo przygotowanie brakujących materiałów.']
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
      cta: 'Zobacz case: BHP',
      text: 'W case study rękawic BHP ważne były norma, detal lateksu, wnętrze i zastosowanie. To dobry przykład dla audytu, bo pokazuje, że jedna ciemna fotografia może ukryć informacje, których kupujący potrzebuje przed zakupem.'
    },
    faq: [
      ['Czy wystarczy link do oferty?', 'Tak. Link do aktywnej oferty zwykle wystarczy, żeby sprawdzić miniaturę, tytuł, galerię, opis, parametry i podstawowy kontekst kategorii.'],
      ['Co jeśli nie mam gotowej oferty?', 'Możesz wysłać zdjęcia produktu, szkic treści albo opis pomysłu. Wtedy audyt pokaże, jakie materiały warto przygotować przed publikacją.'],
      ['Czy audyt obejmuje konkurencję?', 'Tak, w praktycznym zakresie. Sprawdzam, jak oferta wypada na tle typowych wyników w kategorii i co może utrudniać kliknięcie lub zrozumienie produktu.'],
      ['Ile produktów mogę przesłać do analizy?', 'Na start najlepiej wysłać jedną ofertę albo kilka reprezentatywnych przykładów. Przy większej liczbie produktów warto najpierw wybrać typowe problemy.'],
      ['Czy po audycie muszę zamawiać płatną usługę?', 'Nie. Audyt ma pomóc wybrać rozsądny kolejny krok. Jeśli wystarczy samodzielna poprawka, wnioski powinny to jasno pokazać.'],
      ['Czy obiecujesz wzrost sprzedaży?', 'Nie. Audyt wskazuje bariery w prezentacji oferty, ale wynik zależy też od ceny, konkurencji, opinii, sezonu, dostępności i jakości produktu.']
    ]
  },
  {
    file: 'oferty-olx/index.html',
    url: '/oferty-olx/',
    title: 'Poprawa ogłoszenia OLX — zdjęcia i opis oferty OLX | OfertaStudio.pl',
    description: 'Poprawa ogłoszenia OLX: konkretny opis, zdjęcia, stan produktu, komplet i warunki odbioru pokazane tak, żeby budować zaufanie przed kontaktem.',
    h1: 'Poprawa ogłoszenia OLX — konkret, zaufanie i mniej niejasnych pytań',
    label: 'Poprawa ogłoszenia OLX',
    eyebrow: 'OLX',
    lead: 'Na OLX wygrywa konkret i zaufanie, nie katalogowy opis. Porządkuję zdjęcia, tytuł i treść ogłoszenia tak, żeby kupujący szybko widział stan, komplet, sposób odbioru i powód kontaktu.',
    heroCta: 'Wyślij ogłoszenie — sprawdzę, co budzi niepewność',
    introHeading: 'Ogłoszenie OLX musi odpowiedzieć zanim kupujący napisze pierwszą wiadomość',
    finalCtaTitle: 'Sprawdź, czy ogłoszenie daje wystarczająco dużo zaufania',
    finalCtaText: 'Wyślij link albo zdjęcia realnego produktu. Sprawdzę, czy ogłoszenie jasno pokazuje stan, komplet, warunki odbioru i najważniejsze ograniczenia.',
    serviceType: 'Zdjęcia, tytuł i opis ogłoszenia OLX',
    serviceName: 'Poprawa ogłoszenia OLX',
    offerName: 'Oferta Start',
    price: '199',
    noteEyebrow: 'Wniosek',
    noteTitle: 'OLX nie potrzebuje katalogowej narracji',
    noteText: 'Kupujący chce szybko ustalić, czy produkt istnieje, w jakim jest stanie, co jest w zestawie i czy warto pisać. Treść ma skracać rozmowę, nie ją komplikować.',
    noteCta: 'Pokaż ogłoszenie do diagnozy',
    sections: {
      deliverables: {
        title: 'Co obejmuje poprawa ogłoszenia OLX',
        text: 'Zakres skupia się na zaufaniu przed kontaktem: tytule, zdjęciach, opisie stanu, komplecie, warunkach odbioru i pytaniach, które zwykle pojawiają się w wiadomościach.'
      },
      mistakes: {
        title: 'Co budzi niepewność w ogłoszeniu',
        text: 'Na OLX problemem bywa nie brak ozdobnego tekstu, tylko zbyt mało konkretów, niejasne zdjęcia i informacje, które kupujący musi wyciągać w rozmowie.'
      },
      fit: {
        title: 'Kiedy warto poprawić ogłoszenie OLX',
        text: 'Ten zakres jest przydatny przy produktach używanych, technicznych, droższych albo takich, gdzie stan, komplet i sposób odbioru wpływają na jakość zapytań.'
      },
      process: { title: 'Jak porządkuję ogłoszenie OLX' },
      prepare: {
        title: 'Co wysłać do poprawy ogłoszenia',
        text: 'Najlepiej przesłać link, zdjęcia realnego produktu, informacje o stanie, komplecie, cenie, odbiorze i powtarzalnych pytaniach kupujących.'
      },
      attention: {
        title: 'Kryteria wiarygodnego ogłoszenia',
        text: 'Sprawdzam, czy ogłoszenie brzmi naturalnie, pokazuje realny produkt i nie ukrywa informacji, które i tak pojawią się w pierwszej wiadomości.'
      },
      aftercare: {
        title: 'Jak utrzymać aktualność ogłoszenia',
        text: 'Na OLX opis powinien szybko reagować na zmianę ceny, rezerwację, brak elementu zestawu, nowe zdjęcia albo powtarzalne pytania.'
      },
      faq: { title: 'FAQ o poprawie ogłoszenia OLX' },
      related: {
        title: 'Jeśli ogłoszenie ma trafić też na Allegro',
        text: 'OLX i Allegro wymagają innego języka. Jeśli sprzedajesz równolegle, sprawdź też zdjęcia, opis albo pełną optymalizację oferty Allegro.'
      }
    },
    intro: [
      'OLX działa inaczej niż Allegro. Kupujący często nie szuka rozbudowanej karty produktu, tylko konkretnej odpowiedzi: co sprzedajesz, w jakim stanie, co jest w zestawie i czy warunki kontaktu są jasne.',
      'Poprawa ogłoszenia polega na uporządkowaniu zdjęć, tytułu i opisu tak, żeby zmniejszyć niepewność przed pierwszą wiadomością. Ważne są realne zdjęcia, stan produktu, komplet, odbiór, wysyłka i ograniczenia.',
      'Nie chodzi o długi opis ani o katalogową prezentację. Dobre ogłoszenie OLX jest krótkie, uczciwe i konkretne, dzięki czemu kupujący szybciej rozumie, czy warto pisać.'
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
      href: '/realizacje/#gardena',
      title: 'Przykład: produkt dom i ogród pokazany w kontekście użycia',
      cta: 'Zobacz case: Gardena',
      text: 'Case pistoletu ogrodowego dobrze pokazuje różnicę między samym zdjęciem produktu a prezentacją zastosowania. W OLX takie kontekstowe ujęcie może budować zaufanie, bo kupujący szybciej widzi realne użycie i skalę przedmiotu.'
    },
    faq: [
      ['Czy oferta OLX różni się od oferty Allegro?', 'Tak. Na OLX większe znaczenie ma zaufanie do ogłoszenia, jasny stan produktu, kontakt i lokalny kontekst sprzedaży. Allegro częściej wymaga pełniejszej struktury marketplace.'],
      ['Czy wystarczy link do ogłoszenia?', 'Tak. Link pozwala sprawdzić tytuł, pierwsze zdjęcie, galerię, opis, stan produktu i informacje, których kupujący może szukać przed wiadomością.'],
      ['Czy muszę mieć gotowe zdjęcia?', 'Nie zawsze. Możesz wysłać obecne zdjęcia albo zdjęcia robocze. Jeśli brakuje kadru pokazującego stan, komplet lub detal, wskażę to przed wyceną.'],
      ['Czy dostanę opis gotowy do wklejenia?', 'Tak, jeśli taki zakres wybierzemy. Materiał może obejmować tytuł, opis, kolejność informacji, FAQ i rekomendacje zdjęć.'],
      ['Czy możesz poprawić ogłoszenie na bazie materiałów producenta?', 'Tak, ale przy OLX zwykle warto dodać elementy realnego produktu: stan, komplet, zdjęcia własne, odbiór, wysyłkę i ograniczenia.'],
      ['Czy obiecujesz wzrost sprzedaży?', 'Nie. Poprawa ogłoszenia zwiększa konkret i wiarygodność komunikacji, ale wynik zależy też od ceny, lokalizacji, konkurencji, sezonu i popytu.']
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
    description: 'Praktyczne studio poprawy ofert Allegro i OLX: zdjęcia, opisy, tytuły, układ informacji i materiały gotowe do wdrożenia.',
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

function offerCatalog() {
  return {
    '@type': 'OfferCatalog',
    name: 'Pakiety OfertaStudio.pl',
    itemListElement: [
      {
        '@type': 'Offer',
        name: 'Mini audyt',
        price: '0',
        priceCurrency: 'PLN',
        url: `${SITE}/#pakiety`
      },
      {
        '@type': 'Offer',
        name: 'Tekst Start',
        price: '79',
        priceCurrency: 'PLN',
        description: 'Cena startowa za lekki zakres pracy dla jednej oferty.',
        url: `${SITE}/#pakiety`
      },
      {
        '@type': 'Offer',
        name: 'Foto Start',
        price: '149',
        priceCurrency: 'PLN',
        description: 'Cena startowa za lekki zakres pracy dla jednego produktu.',
        url: `${SITE}/#pakiety`
      },
      {
        '@type': 'Offer',
        name: 'Oferta Start',
        price: '199',
        priceCurrency: 'PLN',
        description: 'Cena startowa za szybkie uporządkowanie jednej oferty.',
        url: `${SITE}/#pakiety`
      },
      {
        '@type': 'Offer',
        name: 'Studio Start',
        price: '499',
        priceCurrency: 'PLN',
        description: 'Cena startowa za podstawowy standard dla małej serii produktów.',
        url: `${SITE}/#pakiety`
      },
      {
        '@type': 'Offer',
        name: 'Abonament',
        price: '1490',
        priceCurrency: 'PLN',
        description: 'Cena startowa za miesiąc stałej obsługi ofert.',
        url: `${SITE}/#pakiety`
      }
    ]
  };
}

function schemaFor(page) {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      organization(),
      {
        '@type': 'Service',
        '@id': `${SITE}${page.url}#service`,
        name: page.serviceName,
        serviceType: page.serviceType,
        provider: { '@id': ORG },
        areaServed: { '@type': 'Country', name: 'Polska' },
        url: `${SITE}${page.url}`,
        description: page.intro[0],
        offers: offerCatalog()
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${SITE}${page.url}#breadcrumb`,
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Strona główna', item: `${SITE}/` },
          { '@type': 'ListItem', position: 2, name: page.label, item: `${SITE}${page.url}` }
        ]
      },
      {
        '@type': 'FAQPage',
        '@id': `${SITE}${page.url}#faq`,
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
      <article class="card service-card">
        <h3>${escapeHtml(title)}</h3>
        <p>${escapeHtml(text)}</p>
      </article>`).join('');
}

function processSteps(items) {
  return items.map(([title, text]) => `
      <article class="card service-card step">
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
  const links = serviceLinks.filter(([, href]) => href !== currentUrl);
  if (currentUrl !== '/audyt-oferty-allegro/') {
    links.sort(([, firstHref], [, secondHref]) =>
      Number(secondHref === '/audyt-oferty-allegro/') - Number(firstHref === '/audyt-oferty-allegro/'));
  }
  return links
    .map(([label, href]) => `<a class="link-chip" href="${href}">${escapeHtml(label)}</a>`)
    .join('');
}

function sectionTitle(page, key, fallback) {
  return page.sections?.[key]?.title || fallback;
}

function sectionText(page, key, fallback) {
  return page.sections?.[key]?.text || fallback;
}

function render(page) {
  const slug = page.url.replace(/\//g, '-').replace(/^-|-$/g, '');
  const schema = JSON.stringify(schemaFor(page), null, 2);
  const intro = page.intro.map(text => `<p>${escapeHtml(text)}</p>`).join('\n        ');
  const isAudit = page.url === '/audyt-oferty-allegro/';
  const isOlx = page.url === '/oferty-olx/';
  const diagnosticHref = isAudit || isOlx ? '/#kontakt' : '/audyt-oferty-allegro/';
  const diagnosticLabel = isAudit ? page.heroCta : isOlx ? 'Zacznij od szybkiej diagnozy ogłoszenia OLX' : 'Zacznij od audytu oferty Allegro';
  return `<!DOCTYPE html>
<html lang="pl" data-theme="light">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${escapeHtml(page.title)}</title>
<meta name="description" content="${escapeHtml(page.description)}">
<link rel="canonical" href="${SITE}${page.url}">
<meta name="robots" content="index, follow">
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
<meta name="theme-color" content="#0F172A">
<link rel="icon" href="/favicon.ico" sizes="any">
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
<link rel="manifest" href="/site.webmanifest">
<script type="application/ld+json">
${schema}
</script>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="preload" as="style" href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@400;600;700&display=swap">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@400;600;700&display=swap" media="print" onload="this.media='all'">
<noscript><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@400;600;700&display=swap"></noscript>
<link rel="stylesheet" href="/site-system.css">
<link rel="stylesheet" href="/service-style.css">
<script src="/analytics.js" defer></script>
</head>
<body>
<a class="skip-link" href="${SKIP_LINK_TARGET}">Przejdź do treści</a>
<div class="grid-bg"></div>
<div data-site-header></div>

<main id="main-content" class="service-wrap service-main" tabindex="-1">
  <nav data-site-breadcrumb data-breadcrumb-current="${escapeHtml(page.label)}"></nav>

  <section class="service-hero">
    <div class="service-hero-content">
      <div class="eyebrow">${escapeHtml(page.eyebrow)}</div>
      <h1 class="service-title">${escapeHtml(page.h1)}</h1>
      <p class="service-lead">${escapeHtml(page.lead)}</p>
      <div class="service-actions">
        <a class="btn btn-p" href="/#kontakt" data-event="hero_cta_click" data-location="hero">${escapeHtml(page.heroCta)}</a>
        <a class="btn btn-s" href="${page.caseStudy.href}" data-event="case_study_click" data-location="hero">${escapeHtml(page.caseStudy.cta)}</a>
      </div>
    </div>
    <aside class="card service-card service-note">
      <div class="eyebrow">${escapeHtml(page.noteEyebrow || 'Najpierw diagnoza')}</div>
      <h2>${escapeHtml(page.noteTitle || 'Zanim wybierzesz zakres, sprawdź, od czego zacząć')}</h2>
      <p>${escapeHtml(page.noteText || 'Wyślij link, zdjęcia albo krótki opis produktu. Dostaniesz konkret, nie ogólne porady, a zakres i cenę poznasz przed startem.')}</p>
      <div class="service-actions">
        <a class="btn btn-p" href="${diagnosticHref}" data-event="mini_audit_click" data-location="hero">${escapeHtml(page.noteCta || diagnosticLabel)}</a>
      </div>
    </aside>
  </section>

  <section class="service-section" aria-labelledby="service-about">
    <div class="card service-card">
      <div class="eyebrow">Problem i rozwiązanie</div>
      <h2 id="service-about">${escapeHtml(page.introHeading)}</h2>
      ${intro}
    </div>
  </section>

  <section class="service-section" aria-labelledby="service-deliverables">
    <div class="s-head c">
      <div class="eyebrow">Zakres</div>
      <h2 class="s-title" id="service-deliverables">${escapeHtml(sectionTitle(page, 'deliverables', 'Co obejmuje usługa'))}</h2>
      <p class="muted">${escapeHtml(sectionText(page, 'deliverables', 'Zakres i cena są potwierdzane przed startem. Poniższe elementy pokazują, co zwykle wymaga uporządkowania przy tej usłudze.'))}</p>
    </div>
    <div class="service-grid">
      ${cards(page.deliverables)}
    </div>
  </section>

  <section class="service-section" aria-labelledby="service-mistakes">
    <div class="s-head c">
      <div class="eyebrow">Błędy</div>
      <h2 class="s-title" id="service-mistakes">${escapeHtml(sectionTitle(page, 'mistakes', 'Co najczęściej osłabia ofertę'))}</h2>
      <p class="muted">${escapeHtml(sectionText(page, 'mistakes', 'To problemy, które najczęściej osłabiają ofertę, zanim kupujący zdąży zapytać o szczegóły produktu.'))}</p>
    </div>
    <div class="service-grid">
      ${cards(page.mistakes)}
    </div>
  </section>

  <section class="service-section" aria-labelledby="service-fit">
    <div class="s-head c">
      <div class="eyebrow">Dla kogo</div>
      <h2 class="s-title" id="service-fit">${escapeHtml(sectionTitle(page, 'fit', 'Dla kogo jest ta usługa'))}</h2>
      <p class="muted">${escapeHtml(sectionText(page, 'fit', 'Nie każda oferta wymaga tego samego działania. Ten zakres jest najbardziej przydatny w poniższych sytuacjach.'))}</p>
    </div>
    <div class="service-grid">
      ${cards(page.fit)}
    </div>
  </section>

  <section class="service-section process" aria-labelledby="service-process">
    <div class="s-head c">
      <div class="eyebrow">Proces</div>
      <h2 class="s-title" id="service-process">${escapeHtml(sectionTitle(page, 'process', 'Jak wygląda proces'))}</h2>
    </div>
    <div class="service-grid">
      ${processSteps(page.process)}
    </div>
  </section>

  <section class="card service-card" aria-labelledby="service-case">
    <div class="eyebrow">Przykład</div>
    <h2 id="service-case">${escapeHtml(page.caseStudy.title)}</h2>
    <p>${escapeHtml(page.caseStudy.text)}</p>
    <div class="service-actions">
      <a class="btn btn-s" href="${page.caseStudy.href}" data-event="case_study_click" data-location="service_page">${escapeHtml(page.caseStudy.cta)}</a>
    </div>
  </section>

  <section class="card service-card" aria-labelledby="service-prepare">
    <div class="eyebrow">Przygotowanie</div>
    <h2 id="service-prepare">${escapeHtml(sectionTitle(page, 'prepare', 'Co warto przygotować przed kontaktem'))}</h2>
    <p>${escapeHtml(sectionText(page, 'prepare', 'Bez briefu i bez zgadywania. Na start wystarczy link, zdjęcia albo krótki opis; poniższe informacje pomagają szybciej ustalić sensowny zakres.'))}</p>
    <ul class="service-list">
      ${listItems(page.prepare)}
    </ul>
  </section>

  <section class="service-section" aria-labelledby="service-attention">
    <div class="s-head c">
      <div class="eyebrow">Kryteria</div>
      <h2 class="s-title" id="service-attention">${escapeHtml(sectionTitle(page, 'attention', 'Na co zwracam uwagę'))}</h2>
      <p class="muted">${escapeHtml(sectionText(page, 'attention', 'Każda usługa ma inne akcenty, ale cel jest wspólny: oferta ma być bardziej czytelna, konkretna i łatwiejsza do podjęcia decyzji.'))}</p>
    </div>
    <div class="service-grid">
      ${cards(page.attention)}
    </div>
  </section>

  <section class="service-section" aria-labelledby="service-aftercare">
    <div class="s-head c">
      <div class="eyebrow">Po wdrożeniu</div>
      <h2 class="s-title" id="service-aftercare">${escapeHtml(sectionTitle(page, 'aftercare', 'Jak korzystać z przygotowanych zmian'))}</h2>
      <p class="muted">${escapeHtml(sectionText(page, 'aftercare', 'Dobra podstrona produktu nie kończy się na jednorazowej publikacji. Po wdrożeniu warto pilnować kilku rzeczy, żeby oferta nie wróciła do starego chaosu.'))}</p>
    </div>
    <div class="service-grid">
      ${cards(page.aftercare)}
    </div>
  </section>

  <section class="service-section" id="faq" aria-labelledby="service-faq">
    <div class="s-head c">
      <div class="eyebrow">FAQ</div>
      <h2 class="s-title" id="service-faq">${escapeHtml(sectionTitle(page, 'faq', 'Mini-FAQ tej usługi'))}</h2>
    </div>
    <div class="faq-wrap faq-wrap--centered">
      ${faqItems(page.faq, slug)}
    </div>
  </section>

  <section class="card service-card" aria-labelledby="related-services">
    <div class="eyebrow">Powiązane usługi</div>
    <h2 id="related-services">${escapeHtml(sectionTitle(page, 'related', 'Wybierz następny krok dla swojej oferty'))}</h2>
    <p>${escapeHtml(sectionText(page, 'related', 'Jeśli problem leży w innym elemencie oferty, przejdź do konkretnego zakresu albo zacznij od audytu i trzech najważniejszych poprawek.'))}</p>
    <div class="links">
      ${relatedLinks(page.url)}
      <a class="link-chip" href="/realizacje/">Zobacz efekty przed/po w realizacjach</a>
      <a class="link-chip" href="/#pakiety">Porównaj pakiety poprawy ofert</a>
    </div>
  </section>

  <section class="card service-card service-cta" aria-labelledby="service-final-cta">
    <div class="eyebrow">Następny krok</div>
    <h2 id="service-final-cta">${escapeHtml(page.finalCtaTitle)}</h2>
    <p class="muted">${escapeHtml(page.finalCtaText)}</p>
    <div class="service-actions">
      <a class="btn btn-p" href="/#kontakt" data-event="mini_audit_click" data-location="service_final">${escapeHtml(page.heroCta)}</a>
      <a class="btn btn-s" href="${page.caseStudy.href}" data-event="case_study_click" data-location="service_final">${escapeHtml(page.caseStudy.cta)}</a>
    </div>
  </section>
</main>

<div data-site-footer></div>
<script src="/site-components.js" defer></script>
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
