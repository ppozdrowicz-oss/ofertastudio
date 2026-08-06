# Instrukcje dla agentów — OfertaStudio

## Cel projektu

Budujemy od zera profesjonalną stronę usługową premium dla OfertaStudio — wyspecjalizowanego studia sprzedaży internetowej. Serwis ma wspierać sprzedaż usług, budować wiarygodność i prowadzić użytkownika od rozpoznania potrzeby do wartościowego kontaktu. Nie kopiujemy kodu ani rozwiązań wizualnych ze starego projektu.

## Zakres i katalog roboczy

- Pracuj wyłącznie w `/home/roland/os_new/`.
- Przed zmianami przeczytaj `README.md`, `docs/PROJECT_BRIEF.md`, `docs/ARCHITECTURE.md` i `docs/ROADMAP.md` oraz sprawdź `git status`.
- Realizuj tylko zakres bieżącego promptu i etapu. Nie wykonuj przypadkowych refaktorów ani zmian „przy okazji”.
- Zachowuj istniejące zmiany użytkownika; nie cofaj ich ani nie nadpisuj bez wyraźnej zgody.
- Nie dodawaj sekretów, danych klienta, cache, artefaktów buildu ani drugiego lockfile.

## Stack

- Next.js z App Routerem,
- React,
- TypeScript `strict`,
- Tailwind CSS 4,
- CSS Custom Properties jako fundament tokenów,
- ESLint i Prettier,
- Lucide React dla ikon,
- `next/font` dla fontów.

Używaj npm i zachowuj `package-lock.json`. Nie wprowadzaj Pages Routera, ciężkich bibliotek UI ani zewnętrznej zależności, jeżeli problem można czytelnie rozwiązać istniejącym stosem.

## Architektura

- `src/app`: routing, pliki specjalne, metadata i kompozycja stron.
- `src/components/ui`: małe prymitywy interfejsu.
- `src/components/layout`: elementy układu wspólne dla stron.
- `src/components/sections`: semantyczne kompozycje sekcji.
- `src/components/shared`: dopiero dla rzeczywiście współdzielonych elementów domenowych.
- `src/config`: stabilna konfiguracja serwisu.
- `src/content`: typowane treści i modele danych widoków.
- `src/lib`: małe funkcje bez wiedzy o konkretnym widoku.
- `src/hooks` i `src/types`: twórz dopiero, gdy mają realnych konsumentów.

Nie twórz pustych katalogów, abstrakcji na zapas ani rozbudowanej sieci `index.ts`. Importuj moduły przez alias `@/*` tam, gdzie poprawia to czytelność.

## TypeScript

- Zachowuj `strict`, `noUncheckedIndexedAccess`, kontrolę nieużywanych symboli i spójność wielkości nazw plików.
- Nie używaj `any`, `@ts-ignore` ani nie wyłączaj reguł bez wyjątkowej, opisanej przyczyny.
- Preferuj inferencję dla wartości lokalnych, ale jawnie typuj publiczne kontrakty i dane domenowe, gdy poprawia to bezpieczeństwo.
- Używaj `import type` dla importów wyłącznie typowych.
- Nie obchodź błędów przez rzutowanie, jeżeli można poprawić model danych lub interfejs.

## Komponenty i React

- Server Components są domyślne.
- Dodawaj `"use client"` wyłącznie dla stanu, efektów, zdarzeń przeglądarki lub API wymagającego klienta. Umieszczaj granicę klientową możliwie nisko.
- Każdy komponent powinien mieć jedną, czytelną odpowiedzialność i semantyczny element bazowy.
- Nie opakowuj standardowego HTML bez konkretnej korzyści projektowej lub dostępnościowej.
- Kompozycję preferuj nad rozbudowanymi wariantami i wielopoziomowym dziedziczeniem propsów.
- Ikony importuj pojedynczo z Lucide React, oznaczaj dekoracyjne jako `aria-hidden="true"` i nie używaj ikony jako jedynej etykiety bez nazwy dostępnej.

## Responsywność i jakość wizualna

- Projektuj mobile-first od szerokości 320 px.
- Sprawdzaj brak poziomego przewijania, czytelność tekstu, pola dotyku minimum około 44 × 44 px oraz sensowne przejścia między breakpointami.
- Używaj wspólnych tokenów kontenera, odstępów, promieni, kolorów i cieni.
- Zachowuj spójność z zatwierdzonym design systemem; nie wprowadzaj lokalnych „mini-palety”, przypadkowych gradientów ani efektów bez uzasadnienia.
- OfertaStudio ma wyglądać jak butikowe studio cyfrowe, nie jak generyczny SaaS, gotowy motyw lub automatycznie wygenerowany landing page.

## Dostępność

- Zachowuj semantyczne landmarki, logiczną hierarchię nagłówków i poprawną kolejność DOM.
- Wszystkie interakcje muszą działać klawiaturą i mieć widoczny stan `focus-visible`.
- Nie usuwaj outline bez równoważnego zamiennika.
- Zapewniaj etykiety kontrolek, poprawne nazwy linków, wystarczający kontrast i komunikaty błędów powiązane z polami.
- Respektuj `prefers-reduced-motion`; ruch nie może być konieczny do zrozumienia treści.
- Używaj obrazów dekoracyjnych i treściowych zgodnie z ich rolą, z właściwym tekstem alternatywnym.

## SEO i treść

- Każda indeksowalna podstrona otrzymuje unikalny polski tytuł, opis i canonical, gdy routing zostanie ustalony.
- Metadata współdzielone opieraj na `src/config/site.ts`; dane stron trzymaj blisko route lub odpowiedniego modelu treści.
- Używaj jednego głównego `h1`, semantycznych nagłówków i tekstowych linków opisujących cel.
- Dane strukturalne dodawaj wyłącznie wtedy, gdy odpowiadają widocznej, prawdziwej treści.
- Nie publikuj niezweryfikowanych wyników, opinii, liczb, realizacji ani gwarancji.
- Finalne widoki nie mogą zawierać lorem ipsum, generycznych placeholderów, przypadkowych zdjęć ani sztucznie wypełnionej treści.

## Kontrola jakości i raportowanie

Po każdej zmianie wpływającej na kod lub konfigurację uruchom:

```bash
npm run format:check
npm run lint
npm run typecheck
npm run build
```

Napraw wszystkie błędy i ostrzeżenia pochodzące z projektu. Przed zakończeniem sprawdź diff oraz `git status`. Raport końcowy powinien jasno opisać zakres, pliki, decyzje, wyniki kontroli, stan Git i rzeczywiste ryzyka. Nie deklaruj wykonania kontroli, której faktycznie nie uruchomiono.
