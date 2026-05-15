# Analityka konwersji

Projekt nie laduje obecnie GA4, GTM ani innych zewnetrznych narzedzi sledzacych. Plik `/analytics.js` udostepnia tylko lekki helper:

```js
window.trackEvent(name, params)
```

Helper nic nie robi, jesli `window.gtag` albo `window.dataLayer` nie istnieje. Nie tworzy `dataLayer`, nie dodaje ID uslug i nie laduje zewnetrznych skryptow.

## Gdzie dodac GA4 albo GTM

Jesli wlasciciel strony zdecyduje sie na analityke i ma realne ID oraz zgody uzytkownikow, kod GA4/GTM nalezy dodac w `<head>` glownych plikow HTML przed `/analytics.js`.

Nie dodawac przykladowych ani placeholderowych identyfikatorow uslug analitycznych.

## Eventy

Aktualne hooki wysylaja:

- `form_submit` po skutecznym wyslaniu formularza kontaktowego,
- `whatsapp_click` po kliknieciu linku `wa.me`,
- `phone_click` po kliknieciu linku `tel:`,
- `email_click` po kliknieciu linku `mailto:`,
- `pricing_cta_click` po kliknieciu CTA cennika,
- `hero_cta_click` po kliknieciu glownego CTA,
- `case_study_click` po kliknieciu linku do konkretnego case study,
- `mini_audit_click` po kliknieciu CTA mini audytu,
- `realizations_section_view` po pierwszym wejsciu w sekcje realizacji na stronie glownej.

Typowe parametry:

- `location`: `hero`, `pricing`, `footer`, `contact`, `case_study`,
- `package`: `start`, `tekst_pack`, `foto_pack`, `oferta_pro`, `studio`, `abonament`,
- `platform`: `allegro`, `olx`, `amazon`, `sklep`, `inne`,
- `page_path`: dodawany automatycznie.

## Testowanie

Bez GA4/GTM mozna tymczasowo sprawdzic eventy w konsoli przegladarki:

```js
window.dataLayer = [];
window.dataLayer.push = function(event) {
  console.log('dataLayer event', event);
  return Array.prototype.push.call(this, event);
};
```

Po kliknieciu oznaczonych CTA lub linkow kontaktowych event powinien pojawic sie w konsoli. Po tescie usunac tymczasowy kod z konsoli.
