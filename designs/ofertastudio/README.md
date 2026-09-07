# OfertaStudio — projekt strony

Kompletny, samodzielny projekt strony przygotowany na podstawie dopracowanej treści OfertaStudio. Zawiera ręcznie napisane źródła HTML, CSS i JavaScript oraz lokalne grafiki. Nie wymaga instalowania zależności ani kompilacji.

## Uruchomienie

Z katalogu głównego repozytorium:

```sh
python3 -m http.server 8080 --directory designs/ofertastudio
```

Otwórz `http://localhost:8080`. Można też otworzyć `index.html` bezpośrednio w przeglądarce; kopiowanie checklisty może wymagać lokalnego serwera. Względne ścieżki zasobów pozwalają przenieść cały katalog na hosting statyczny lub do podkatalogu.

## Zawartość

- `index.html` — treść, sekcje strony, formularz i okna dialogowe.
- `styles.css` — responsywny wygląd, stany fokusu i ograniczenie animacji.
- `app.js` — menu, diagnoza problemów, porównanie przed/po, wybór pakietu, checklista i walidacja formularza.
- `assets/bottle.webp` — wygenerowane zdjęcie produktu do przykładu pokazowego.
- `assets/favicon.svg` — znak strony.

Projekt obejmuje sześć sytuacji klienta, porównanie skali i kadru produktu, zakres usług, proces współpracy, pakiety, checklistę, informacje o studiu, FAQ i formularz. Korzysta wyłącznie z lokalnych zasobów, bez zewnętrznych fontów, skryptów i analityki.

## Miejsce w repozytorium

Ten katalog przechowuje samodzielny projekt do przeglądu. Istniejąca aplikacja Next.js w `src` ma własny system projektu i konfigurację wdrożenia. Integracja nowego wyglądu ze stroną główną wymaga osobnego przeniesienia do komponentów i tokenów tego systemu; samo dodanie katalogu nie zmienia wersji uruchamianej przez Netlify.

Podgląd przygotowanej wersji: [OfertaStudio](https://ofertastudio-design.ppozdrowicz.chatgpt.site) — dostęp zależy od uprawnień do podglądu.

## Stan funkcji i treści

Formularz jest demonstracyjny: sprawdza pola i pokazuje podsumowanie, ale nie zapisuje ani nie wysyła danych. Informacja jest widoczna przy przycisku i w podsumowaniu. Przed obsługą klientów trzeba podłączyć odbiór zgłoszeń oraz uzupełnić politykę prywatności o dane firmy i rzeczywisty sposób przetwarzania.

Zdjęcie butelki jest materiałem wygenerowanym na potrzeby projektu. Porównanie przedstawia zmianę skali i kadru tego samego obrazu. Nie jest realizacją klienta ani dowodem wyników sprzedaży.

Ceny i zakresy są propozycją projektową; przed premierą trzeba potwierdzić kwoty, informację netto/brutto oraz zakresy. Projekt nie zawiera fikcyjnych opinii ani wyników klientów.

## Weryfikacja

Przy przeniesieniu do repozytorium sprawdzono składnię JavaScript, kompletność lokalnych zasobów i kotwic oraz strukturę HTML. Testów interakcji i wyglądu w przeglądarce nie wykonywano. Wyniki kontroli całego repozytorium podano w pull requeście.
