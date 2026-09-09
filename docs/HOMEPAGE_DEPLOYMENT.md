# Strona główna — wdrożenie OfertaStudio.pl

Na zlecenie właściciela projekt z PR #4 zostaje udostępniony jako strona główna domeny `https://ofertastudio.pl/`.

## Źródła i routing

Ręcznie napisane źródła strony znajdują się w `public/ofertastudio`: `index.html`, `styles.css`, `app.js`, `assets/favicon.svg` i `assets/bottle.webp`. Katalog został przeniesiony z `designs/ofertastudio`; nie jest kopią ani wynikiem kompilacji.

`netlify.toml` używa wymuszonej reguły 200 wyłącznie dla `/`, wskazującej `/ofertastudio/index.html`. Dokument jest serwowany bezpośrednio przez CDN, przed obsługą tras Next.js, z zachowaniem głównego adresu w przeglądarce. `next.config.ts` zawiera równoważną regułę `beforeFiles` dla uruchomienia lokalnego. Próba użycia samego rewrite Next.js na podglądzie Netlify zwracała 404, dlatego wdrożenie korzysta z jawnej reguły CDN. Pozostałe trasy nadal obsługuje Next.js. Pełny HTML ma własny header, footer i jeden `main#main-content`; nie jest osadzany w iframe ani dublowany wewnątrz layoutu React.

Zasoby używają ścieżek `/ofertastudio/...`. Canonical i Open Graph URL wskazują `https://ofertastudio.pl/`. Strona główna jest indeksowalna; istniejące techniczne podstrony zachowują swoje metadata.

Powroty do `/` przez `BrandMark`, `Breadcrumbs` oraz `ButtonLink` używają natywnego przejścia dokumentu. Zapobiega to pobieraniu statycznego HTML jako odpowiedzi React Server Components. Inne linki nadal korzystają z nawigacji Next.js. Publiczne API tych komponentów pozostaje bez zmian.

## Uruchomienie i publikacja

```sh
npm ci
npm run build
npm run start
```

Otwórz `http://localhost:3000/`. Można też sprawdzić sam dokument bez Next.js:

```sh
python3 -m http.server 8080 --directory public
```

W tym wariancie otwórz `http://localhost:8080/ofertastudio/index.html`.

Domena jest obsługiwana przez istniejący projekt Netlify `tiny-paletas-35daca`, powiązany z tym repozytorium. Zachowano istniejące ustawienia budowania w `netlify.toml`, komendę `npm run build`, katalog `.next`, plugin Next.js i przypięte zależności. Publikację uruchamia aktualizacja gałęzi produkcyjnej `main`.

Przed scaleniem należy sprawdzić zestaw kontroli repozytorium, odpowiedź `/`, komplet zasobów i brak regresji podstron na wdrożeniu podglądowym. Po scaleniu należy potwierdzić nową treść i zasoby pod domeną produkcyjną. Wyniki są zapisane w pull requeście.

## Stan funkcji i treści

Formularz `kontakt` korzysta z Netlify Forms. Definicja z `data-netlify="true"` znajduje się w statycznym `public/ofertastudio/index.html`; żądanie POST trafia bezpośrednio na `/ofertastudio/index.html`, zgodnie z wymaganiami adaptera Next.js. Nie wymaga dodatkowej kopii formularza ani własnego backendu.

Zgłoszenie zawiera `form-name`, `url`, `problem`, `message`, `email`, `package` oraz pułapkę antyspamową `bot-field`. Pole `email` umożliwia Netlify ustawienie Reply-To na adres klienta. Kod zachowuje walidację, blokuje ponowną wysyłkę podczas żądania, obsługuje błędy HTTP i limit 20 sekund. Podsumowanie pojawia się po odpowiedzi 2xx. Przy błędzie dane pozostają w formularzu; nie ma automatycznych ponowień. Bez JavaScript działa natywny POST i wymóg podania e-maila.

Wykrywanie formularzy jest włączone w panelu (potwierdzone zrzutem właściciela 9 września 2026). Odbiorcę powiadomień konfiguruje się w Netlify: Project configuration → Notifications → Emails and webhooks → Form submission notifications. Dla `New form submission` należy zapisać `pozdrowicz@gmail.com`, z wyborem `kontakt` lub `Any form`. Adres wpisany w kodzie jako kontakt pomocniczy nie konfiguruje powiadomień. Dostarczenie do Gmaila wymaga osobnego potwierdzenia testowym zgłoszeniem i sprawdzeniem skrzynki.

Po wdrożeniu sprawdź, czy Netlify usunął atrybut `data-netlify` z publicznego HTML i zachował pole `form-name`. Następnie wyślij testowe zgłoszenie, sprawdź Forms → kontakt oraz skrzynkę Gmail (także Spam). Zrzut lub status HTTP sam w sobie nie potwierdza dostarczenia e-maila. Komunikat o danych opisuje faktyczny przepływ przez Netlify i Gmail; pełne dane formalne administratora nadal wymagają uzupełnienia w odrębnym zakresie.

Ceny i zakresy pochodzą z przygotowanego projektu. Wymagają potwierdzenia aktualności oraz informacji netto/brutto przed uruchomieniem sprzedaży. Zdjęcie butelki jest wygenerowanym przykładem pokazowym. Porównanie dotyczy skali i kadru tego samego materiału; nie przedstawia wyników klienta.

Strona korzysta z lokalnych zasobów, bez zewnętrznych fontów, analityki i skryptów. Istniejący system komponentów i WebGL jest nadal dostępny na podstronach oraz w laboratoriach. Przeniesienie statycznego projektu do komponentów React jest niezależne od publikacji pod domeną.

## Typografia, nagłówek i stopka — 9 września 2026

Statyczna strona główna zachowuje zieloną identyfikację. Korzysta z lokalnego Inter Variable (osie `wght` i `opsz`, WOFF2, około 344 KiB) z preload i `font-display: swap`. Źródło: https://github.com/rsms/inter/blob/master/docs/font-files/InterVariable.woff2; licencja SIL OFL jest dołączona w `public/ofertastudio/assets/fonts/Inter-LICENSE.txt`. Font nie wymaga połączenia przeglądarki z Google Fonts. Szeryfowe wyróżnienia nadal korzystają z systemowej Georgii w kursywie.

Tekst podstawowy ma 16 px, informacje pomocnicze 14 px, a drobne oznaczenia 12 px. Rzeczywiste wagi fontu, optical sizing, mocniejszy kontrast i spokojniejszy tracking poprawiają czytelność. Nie wymuszamy wygładzania ani sztucznego pogrubienia. „UHD” opisuje oczekiwaną jakość wizualną, nie rozdzielczość fontu; końcowy raster zależy od ekranu, systemu i powiększenia. Po pierwszym pobraniu fontu może wystąpić niewielka zmiana metryk względem Arialu.

Header zawiera znak ofertastudio.pl, opis specjalizacji, dotychczasową nawigację i CTA. Poniżej 1100 px używa menu mobilnego, zamykanego też przez Escape i kliknięcie poza nagłówkiem. Stopka ma ciemną powierzchnię i semantyczne grupy linków. Na prośbę właściciela adres e-mail nie jest wyświetlany w stopce. Układ przechodzi od trzech kolumn linków do dwóch i jednej. Na wąskich telefonach karty problemów oraz procesu mają jedną kolumnę, a cena pozostaje w normalnym przepływie.

Redakcja dotyczy pierwszego ekranu, usług, procesu, studia i kontaktu. Zachowano ceny, zakresy, logotypy platform i działającą integrację Netlify Forms. Nagłówek i stopka statycznego dokumentu są niezależne od komponentów Next.js opisanych w systemie projektowym.
