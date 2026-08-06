# Struktura stopki OfertaStudio

## Rola

Stopka zapewnia pełną, spokojną alternatywę dla skróconej nawigacji głównej. Pokazuje wszystkie pięć filarów, kluczowe usługi platformowe, strony studia i informacje prawne. Nie pełni roli drugiego megamenu i nie publikuje niepotwierdzonych danych.

## Blok marki

- tekstowy `BrandMark` w wariancie inverse,
- descriptor „Butikowe studio sprzedaży internetowej”,
- centralna propozycja wartości,
- linki do kontaktu i briefu.

Wordmark prowadzi do `/`. Znak jest techniczny i nie zastępuje przyszłego, zatwierdzonego logo.

## Grupy linków

### Strony internetowe

- Strony internetowe,
- Strony firmowe,
- Landing page,
- Opieka nad stroną.

### Sklepy i Shoper

- Sklepy internetowe,
- Sklepy Shoper,
- Konfiguracja Shopera,
- Personalizacja szablonu,
- Opieka nad sklepem.

### Allegro i produkt

- Allegro i marketplace,
- Tworzenie ofert Allegro,
- Optymalizacja ofert,
- Prezentacja produktu.

### Audyty i rozwój

- Audyt i rozwój,
- Audyt strony,
- Audyt sklepu,
- Audyt Shopera.

### Studio

- Realizacje,
- Oferta,
- Jak pracujemy,
- O nas,
- Kontakt,
- Brief projektu.

### Informacje

- Polityka prywatności,
- Polityka cookies.

Grupy i linki pochodzą wyłącznie z `navigationConfig.footer`. Nie wpisujemy ich drugi raz w JSX.

## Dane kontaktowe

`src/config/contact.ts` pozostaje jedynym źródłem e-maila, telefonu, adresu, danych formalnych i profili społecznościowych.

Obecnie dane mają status `requires-confirmation`, dlatego:

- stopka nie pokazuje e-maila, telefonu ani adresu,
- nie renderuje technicznych napisów „do uzupełnienia”,
- nie publikuje fikcyjnych danych,
- pozostawia działające linki do `/kontakt` i `/brief`.

Po potwierdzeniu danych należy zmienić konfigurację na `verified`. Komponent pokaże tylko niepuste pola. Dane prawne należy dodać dopiero po zatwierdzeniu właściwej nazwy podmiotu i treści polityk.

## Profile społecznościowe

Lista jest renderowana tylko dla niepustych adresów HTTPS z centralnej konfiguracji. Każdy link:

- otwiera się w nowej karcie,
- używa `rel="noreferrer noopener"`,
- ma etykietę informującą o nowej karcie.

Nie pokazujemy pustych ikon ani nie zakładamy nieistniejących profili.

## Dolna belka

- rok jest generowany w Server Component przez `new Date().getFullYear()`,
- wyświetlana jest nazwa marki i informacja o prawach,
- dodatkowo pojawia się zatwierdzona idea marki,
- nie ma Client Component, więc nie występuje hydration mismatch związany z rokiem.

## Responsywność

- 320–639 px: jeden blok marki i jedna kolumna grup,
- 640–1023 px: dwie kolumny grup,
- 1024–1279 px: trzy kolumny grup,
- od 1280 px: blok marki zajmuje 4 z 12 kolumn, a nawigacja 8 z 12.

Linki mają co najmniej 40 px wysokości w gęstej nawigacji stopki, widoczny focus i mogą zawijać się bez poziomego scrolla. Główne cele kontaktowe w bloku marki mają odpowiednią przestrzeń dotykową.

## Aktualizacja

Przy zmianie stopki:

1. zmień centralną konfigurację,
2. upewnij się, że każda trasa jest wdrożona,
3. uruchom `npm run content:check`,
4. sprawdź brak duplikatów i pustych linków,
5. sprawdź wariant mobilny i szeroki,
6. zaktualizuj ten dokument, jeśli zmieniła się hierarchia.
