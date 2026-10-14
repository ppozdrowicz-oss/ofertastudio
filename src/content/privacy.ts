// Owner identity is declared; approval of the complete policy and operational decisions is separate.
// Keep customer enquiries disabled until documented approval in FINAL_PRIVACY_AND_STAGING_READINESS.md.
export const privacyNotice = { approved: false, revisedAt: "2026-10-14" } as const;

export const dataController = {
  name: "Piotr Pozdrowicz",
  email: "pozdrowicz@gmail.com",
  website: "https://ofertastudio.pl",
} as const;

export const contactPrivacyNotice = `Administratorem Twoich danych osobowych jest ${dataController.name}. Dane przesłane za pośrednictwem formularza wykorzystamy do obsługi zapytania i przygotowania odpowiedzi. Więcej informacji znajdziesz w`;

type PrivacyParagraph =
  string | { text: string; link: { label: string; href: string }; after?: string };
type PrivacySection = {
  id: string;
  title: string;
  paragraphs: readonly PrivacyParagraph[];
  items?: readonly string[];
};

export const privacySections: readonly PrivacySection[] = [
  {
    id: "informacje-ogolne",
    title: "Informacje ogólne",
    paragraphs: [
      "Dokument opisuje przetwarzanie danych związane z korzystaniem z OfertaStudio.pl, w szczególności z obsługą zapytań. Serwis prezentuje fotografię produktową, packshoty, retusz zdjęć oraz opracowanie materiałów wizualnych i prezentacji produktów dla e-commerce.",
      "Informacje odnoszą się do strony i korespondencji. Formularz nie służy do składania zamówień ani dokonywania płatności. Przetwarzanie związane z realizacją uzgodnionej usługi może wymagać dodatkowych informacji, przekazanych przed rozpoczęciem takiego przetwarzania.",
    ],
  },
  {
    id: "administrator",
    title: "Administrator danych osobowych",
    paragraphs: [
      `Administratorem danych osobowych przetwarzanych za pośrednictwem serwisu OfertaStudio.pl jest ${dataController.name}, osoba fizyczna prowadząca serwis internetowy dostępny pod adresem ${dataController.website}.`,
      {
        text: "Kontakt z administratorem w sprawach związanych z przetwarzaniem danych osobowych i realizacją praw wynikających z RODO jest możliwy pod adresem: ",
        link: { label: dataController.email, href: `mailto:${dataController.email}` },
        after: ".",
      },
    ],
  },
  {
    id: "zakres-danych",
    title: "Kategorie danych osobowych",
    paragraphs: [
      "Formularz zawiera poniższe pola. Przetwarzane mogą być również informacje, które dobrowolnie umieścisz w wiadomości lub prześlesz bezpośrednio e-mailem.",
      "Przy połączeniu z hostingiem przekazywane są dane techniczne niezbędne do obsługi żądania, m.in. adres IP, adres żądanej strony oraz nagłówki HTTP zawierające informacje o przeglądarce. Dostawca może rejestrować czas żądania i wynik jego obsługi na potrzeby działania i bezpieczeństwa usługi.",
      "Formularz nie ma przesyłania plików ani pola telefonu, adresu pocztowego czy wyboru pakietu. Link jest przekazywany jako tekst; aplikacja nie pobiera automatycznie jego zawartości. Nie przesyłaj danych wrażliwych, poufnych ani zbędnych danych innych osób. Zdjęcia udostępnione w późniejszej korespondencji mogą zawierać dane osobowe — ogranicz materiały do potrzeb zapytania.",
    ],
    items: [
      "Imię lub firma — informacja, jak zwracać się do nadawcy.",
      "E-mail — adres do udzielenia odpowiedzi.",
      "Co chcesz pokazać? — opis produktu i oczekiwanej usługi.",
      "Link do produktu lub zdjęcia — opcjonalny kontekst zapytania.",
    ],
  },
  {
    id: "cele-i-podstawy",
    title: "Cele i podstawy prawne",
    paragraphs: [
      "Samo wysłanie zapytania nie jest zgodą na marketing. Serwis nie prowadzi newslettera ani nie zbiera zgód marketingowych.",
    ],
    items: [
      "Odpowiedź na korespondencję i obsługa zapytań: art. 6 ust. 1 lit. f RODO. Uzasadnionym interesem jest udzielenie odpowiedzi i prowadzenie korespondencji w sprawie, z którą się zwracasz.",
      "Przygotowanie oferty lub wyceny na Twoje żądanie: art. 6 ust. 1 lit. b RODO, jeżeli dane są niezbędne do podjęcia działań przed zawarciem umowy z Tobą. Kontakt z przedstawicielem innego podmiotu opiera się na interesie w obsłudze korespondencji, a nie automatycznie na tej podstawie umownej.",
      "Działanie i bezpieczeństwo strony, przeciwdziałanie nadużyciom i spamowi: art. 6 ust. 1 lit. f RODO. Interesem jest zapewnienie dostępności serwisu oraz ochrona komunikacji.",
      "Ustalenie, dochodzenie lub obrona roszczeń, gdy jest to potrzebne: art. 6 ust. 1 lit. f RODO. Interesem jest ochrona praw administratora; zachowaniu podlegają tylko dane potrzebne w danej sprawie.",
    ],
  },
  {
    id: "formularz",
    title: "Formularz kontaktowy",
    paragraphs: [
      "Integracja formularza wykorzystuje Netlify Forms. Po włączeniu wysyłki zgłoszenie jest przekazywane do Netlify i może być przechowywane w panelu zgłoszeń. Treść nie jest publikowana na stronie.",
      "Netlify automatycznie sprawdza zgłoszenia przy użyciu filtra Akismet. Formularz ma dodatkowo ukryte pole antyspamowe (honeypot). Nie korzysta z reCAPTCHA. Filtrowanie może również błędnie zakwalifikować prawidłową wiadomość jako spam; alternatywą jest bezpośredni kontakt e-mail z administratorem.",
      "Powiadomienia na skrzynkę administratora są osobną funkcją. W istniejącej konfiguracji produkcyjnej wskazano pozdrowicz@gmail.com; w środowisku testowym powiadomienia nie są skonfigurowane. Nie potwierdzono ich dostarczania dla tej wersji aplikacji. Komunikat przyjęcia formularza nie jest potwierdzeniem doręczenia powiadomienia e-mail.",
    ],
  },
  {
    id: "odbiorcy",
    title: "Odbiorcy danych",
    paragraphs: [
      "Netlify, Inc. zapewnia hosting i techniczną obsługę włączonego formularza. Jego podwykonawcy wspierają m.in. infrastrukturę oraz filtrowanie spamu; Akismet jest usługą Automattic, Inc. Zakres dostępu zależy od używanej funkcji.",
      "Korespondencję kierowaną na pozdrowicz@gmail.com obsługuje Google jako dostawca Gmail. Dotyczy to bezpośrednich e-maili, a także powiadomień z formularza, jeżeli zostaną skonfigurowane. Nie potwierdzono korzystania z Google Workspace; nie przypisujemy tej skrzynce warunków usługi firmowej.",
      "Strona nie zawiera integracji reklamowych, analitycznych, czatu ani zewnętrznych osadzonych treści. Nie udostępnia danych do publicznego przeglądania. Dane mogą zostać przekazane uprawnionym organom, jeżeli wymagają tego przepisy.",
      {
        text: "Informacje o podwykonawcach hostingu: ",
        link: { label: "Netlify Trust Center", href: "https://www.netlify.com/trust-center/" },
        after: ". Lista obejmuje także usługi, z których ta strona nie korzysta.",
      },
      {
        text: "Informacje o obsłudze danych przez dostawcę poczty: ",
        link: {
          label: "Polityka prywatności Google",
          href: "https://policies.google.com/privacy?hl=pl",
        },
        after: ".",
      },
    ],
  },
  {
    id: "transfery",
    title: "Przekazywanie danych poza EOG",
    paragraphs: [
      "Korzystanie z Netlify i Gmail może wiązać się z przetwarzaniem danych poza Europejskim Obszarem Gospodarczym, w tym w USA. Nie zapewniamy, że wszystkie dane pozostają w Unii Europejskiej.",
      "Dokumentacja Netlify przewiduje EU–US Data Privacy Framework dla objętych nim transferów oraz standardowe klauzule umowne Komisji Europejskiej w opisanych w DPA pozostałych przypadkach. Google opisuje korzystanie z decyzji o odpowiednim stopniu ochrony, w tym DPF, oraz z klauzul umownych, gdy są wymagane. Zastosowanie mechanizmu zależy od konkretnej usługi, odbiorcy i warunków transferu; nie jest to zapewnienie o jednym mechanizmie dla wszystkich danych.",
      {
        text: "Szczegóły zabezpieczeń: ",
        link: {
          label: "umowa powierzenia Netlify (DPA, PDF)",
          href: "https://www.netlify.com/pdf/netlify-dpa.pdf",
        },
        after: ".",
      },
      {
        text: "Dla poczty: ",
        link: {
          label: "zasady przesyłania danych Google",
          href: "https://policies.google.com/privacy/frameworks?hl=pl",
        },
        after:
          ". O informacje dotyczące zabezpieczeń i możliwość uzyskania ich kopii możesz zwrócić się także do administratora. Warunki właściwe dla używanych kont wymagają potwierdzenia przed uruchomieniem zapytań klientów.",
      },
    ],
  },
  {
    id: "przechowywanie",
    title: "Okres przechowywania danych",
    paragraphs: [
      "Kryterium przechowywania korespondencji jest czas potrzebny do wyjaśnienia sprawy i udzielenia odpowiedzi, a przy zamawianiu wyceny — do zakończenia uzgodnień. Po ustaniu celu dalsze zachowanie danych wymaga odrębnego uzasadnienia, np. konkretnej potrzeby obrony roszczeń, z uwzględnieniem właściwego terminu ich przedawnienia. Nie uzasadnia to bezterminowego przechowywania wszystkich zapytań.",
      "Nie przyjęto jeszcze jednolitego okresu dla zamkniętych zapytań bez umowy ani harmonogramu usuwania ich kopii z Netlify, skrzynki pocztowej i ewentualnych eksportów. Aplikacja nie ma automatycznego usuwania zgłoszeń. Nie potwierdzono okresów przechowywania logów i kopii technicznych właściwych dla kont dostawców. Te zasady wymagają zatwierdzenia przed uruchomieniem obsługi zapytań klientów.",
      "Możesz zapytać administratora o okres przechowywania danych dotyczących Twojej sprawy lub wystąpić o ich usunięcie. Zakres realizacji żądania zależy od podstawy i celu przetwarzania.",
    ],
  },
  {
    id: "prawa",
    title: "Twoje prawa",
    paragraphs: [
      "W zakresie przewidzianym przez RODO możesz żądać dostępu do danych i ich kopii, sprostowania, usunięcia oraz ograniczenia przetwarzania. Gdy podstawą jest uzasadniony interes, możesz wnieść sprzeciw z przyczyn związanych z Twoją szczególną sytuacją.",
      "Prawo do przenoszenia dotyczy danych dostarczonych przez Ciebie, przetwarzanych automatycznie na podstawie zgody lub umowy, przy spełnieniu warunków RODO. Jeżeli przetwarzanie opiera się na zgodzie, możesz ją wycofać bez wpływu na zgodność wcześniejszego przetwarzania. Bieżąca obsługa zapytań nie jest oparta na zgodzie. Nie wszystkie prawa mają zastosowanie w każdej sytuacji.",
      {
        text: "W sprawie realizacji praw napisz na ",
        link: { label: dataController.email, href: `mailto:${dataController.email}` },
        after:
          ". W razie uzasadnionych wątpliwości co do tożsamości nadawcy administrator może poprosić o informacje niezbędne do jej potwierdzenia.",
      },
      {
        text: "Masz prawo złożyć skargę do Prezesa Urzędu Ochrony Danych Osobowych. Informacje o prawach i składaniu skarg: ",
        link: { label: "Urząd Ochrony Danych Osobowych", href: "https://uodo.gov.pl/pl/493/155" },
        after: ".",
      },
    ],
  },
  {
    id: "dobrowolnosc",
    title: "Dobrowolność podania danych",
    paragraphs: [
      "Kontakt jest dobrowolny. Formularz wymaga imienia lub nazwy firmy, poprawnego e-maila i opisu zapytania; link jest opcjonalny. Są to wymagania działania formularza, a nie ustawowy obowiązek podania danych. Bez adresu do odpowiedzi i informacji o sprawie udzielenie odpowiedzi może być niemożliwe. Nie musisz podawać pełnego nazwiska ani dodatkowych danych w treści wiadomości.",
    ],
  },
  {
    id: "cookies",
    title: "Cookies i podobne technologie",
    paragraphs: [
      "Aplikacja nie zapisuje cookies ani danych w localStorage i sessionStorage. Nie zawiera analityki, pikseli reklamowych, osadzonych map lub filmów ani skryptów śledzących. Fonty i fotografie są pobierane z tego samego serwisu. Wpisana, niewysłana wiadomość pozostaje w pamięci bieżącej strony, bez zapisu w magazynach aplikacji.",
      "Przeglądarka może korzystać ze swojej pamięci podręcznej, aby wyświetlać pliki strony. Nie służy ona w tej aplikacji do identyfikowania użytkownika ani śledzenia go między serwisami. Ustawieniami pamięci podręcznej i autouzupełniania zarządzasz w przeglądarce.",
      "W obecnej aplikacji nie ma opcjonalnych technologii wymagających banera zgód. Ich ewentualne wprowadzenie wymaga uprzedniej oceny, aktualizacji informacji i uzyskania zgody, gdy wymagają tego przepisy. Ustawienia samego hostingu należy ponownie sprawdzić przy wdrożeniu.",
    ],
  },
  {
    id: "automatyczne-decyzje",
    title: "Automatyczne podejmowanie decyzji",
    paragraphs: [
      "Aplikacja nie podejmuje wobec Ciebie wyłącznie automatycznych decyzji wywołujących skutki prawne lub podobnie istotnie na Ciebie wpływających, o których mowa w art. 22 RODO, i nie prowadzi takiego profilowania. Automatyczne filtrowanie spamu porządkuje lub odrzuca wiadomości; nie jest decyzją o zawarciu umowy ani o przyznaniu usługi. W sprawie niedostarczonego zapytania możesz skontaktować się bezpośrednio e-mailem.",
    ],
  },
  {
    id: "bezpieczenstwo",
    title: "Bezpieczeństwo danych",
    paragraphs: [
      "Hosting Netlify udostępnia stronę przez HTTPS. Aplikacja nie umieszcza treści zgłoszeń w adresach URL, publicznych stronach ani własnych logach. Waliduje format i długość pól, stosuje honeypot, a dostęp do zgłoszeń w panelu dostawcy wymaga uwierzytelnienia. Walidacja w przeglądarce nie zastępuje ochrony po stronie dostawcy.",
      "Przy błędzie wysyłki treść pozostaje w formularzu, aby umożliwić ponowną próbę; nie jest zapisywana jako trwała kopia w aplikacji. Nie przesyłaj haseł, dokumentów tożsamości ani innych informacji zbędnych do zapytania. Żaden środek techniczny nie daje gwarancji całkowitego wyeliminowania ryzyka.",
    ],
  },
  {
    id: "aktualizacje",
    title: "Aktualizacje polityki",
    paragraphs: [
      "Dokument może być aktualizowany wraz ze zmianami działania serwisu, sposobu obsługi korespondencji lub przepisów. Aktualna wersja jest dostępna pod adresem /prywatnosc. Data na początku dokumentu oznacza datę jego opracowania lub ostatniej zmiany, a nie datę uzyskania zatwierdzenia prawnego.",
    ],
  },
];
