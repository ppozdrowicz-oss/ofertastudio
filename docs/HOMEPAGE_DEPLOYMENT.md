# Strona główna — wdrożenie OfertaStudio.pl

Na zlecenie właściciela projekt z PR #4 zostaje udostępniony jako strona główna domeny `https://ofertastudio.pl/`.

## Źródła i routing

Ręcznie napisane źródła strony znajdują się w `public/ofertastudio`: `index.html`, `styles.css`, `app.js`, `assets/favicon.svg` i `assets/bottle.webp`. Katalog został przeniesiony z `designs/ofertastudio`; nie jest kopią ani wynikiem kompilacji.

`next.config.ts` używa `beforeFiles` do przepisania wyłącznie `/` na `/ofertastudio/index.html`, z zachowaniem głównego adresu w przeglądarce. Pozostałe trasy nadal obsługuje Next.js. Pełny HTML ma własny header, footer i jeden `main#main-content`; nie jest osadzany w iframe ani dublowany wewnątrz layoutu React.

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

Domena jest obsługiwana przez istniejący projekt Netlify `tiny-paletas-35daca`, powiązany z tym repozytorium. Zachowano `netlify.toml`, komendę `npm run build`, katalog `.next`, plugin Next.js i przypięte zależności. Publikację uruchamia aktualizacja gałęzi produkcyjnej `main`.

Przed scaleniem należy sprawdzić zestaw kontroli repozytorium, odpowiedź `/`, komplet zasobów i brak regresji podstron na wdrożeniu podglądowym. Po scaleniu należy potwierdzić nową treść i zasoby pod domeną produkcyjną. Wyniki są zapisane w pull requeście.

## Stan funkcji i treści

Formularz pozostaje demonstracyjny: waliduje pola i pokazuje podsumowanie, ale nie zapisuje ani nie wysyła danych. Ta informacja jest widoczna na stronie. Nie skonfigurowano skrzynki odbiorczej ani backendu, ponieważ w centralnych danych kontaktowych brak zatwierdzonych danych firmy.

Ceny i zakresy pochodzą z przygotowanego projektu. Wymagają potwierdzenia aktualności oraz informacji netto/brutto przed uruchomieniem sprzedaży. Zdjęcie butelki jest wygenerowanym przykładem pokazowym. Porównanie dotyczy skali i kadru tego samego materiału; nie przedstawia wyników klienta.

Strona korzysta z lokalnych zasobów, bez zewnętrznych fontów, analityki i skryptów. Istniejący system komponentów i WebGL jest nadal dostępny na podstronach oraz w laboratoriach. Przeniesienie statycznego projektu do komponentów React jest niezależne od publikacji pod domeną.
