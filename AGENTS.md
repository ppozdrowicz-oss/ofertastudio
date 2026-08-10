# Instrukcje dla agentów — OfertaStudio

## Cel projektu

Budujemy od zera profesjonalną stronę usługową premium dla OfertaStudio — wyspecjalizowanego studia sprzedaży internetowej. Serwis ma wspierać sprzedaż usług, budować wiarygodność i prowadzić użytkownika od rozpoznania potrzeby do wartościowego kontaktu. Nie kopiujemy kodu ani rozwiązań wizualnych ze starego projektu.

## Zakres i katalog roboczy

- Pracuj wyłącznie w `/home/roland/os_new/`.
- Przed zmianami przeczytaj `README.md`, dokumenty właściwe dla bieżącego zakresu i `docs/ROADMAP.md` oraz sprawdź `git status`. Zmiany treści lub routingu wymagają co najmniej `docs/INFORMATION_ARCHITECTURE.md`, `docs/SEO_CONTENT_MAP.md` i `docs/CONTENT_GUIDELINES.md`.
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
- Three.js i React Three Fiber wyłącznie dla odseparowanej, progresywnej warstwy experience.

Używaj npm i zachowuj `package-lock.json`. Nie wprowadzaj Pages Routera, ciężkich bibliotek UI ani zewnętrznej zależności, jeżeli problem można czytelnie rozwiązać istniejącym stosem.

## Architektura

- `src/app`: routing, pliki specjalne, metadata i kompozycja stron.
- `src/components/ui`: małe prymitywy interfejsu.
- `src/components/layout`: elementy układu wspólne dla stron.
- `src/components/sections`: semantyczne kompozycje sekcji.
- `src/components/shared`: dopiero dla rzeczywiście współdzielonych elementów domenowych.
- `src/config`: pojedyncze źródła tras, CTA, nawigacji, marki i danych kontaktowych.
- `src/content`: typowane treści, rejestr planowanych stron i modele danych widoków.
- `src/lib`: małe funkcje bez wiedzy o konkretnym widoku.
- `src/types`: współdzielone kontrakty domenowe; typy lokalne pozostawiaj przy konsumencie.
- `src/hooks`: twórz dopiero dla współdzielonych hooków z realnymi konsumentami.

Nie twórz pustych katalogów, abstrakcji na zapas ani rozbudowanej sieci `index.ts`. Importuj moduły przez alias `@/*` tam, gdzie poprawia to czytelność.

Komponenty `shared` istnieją wyłącznie dla realnych wzorców domenowych, takich jak `SectionHeading`, `ServiceCard`, `ProcessStep` i `CtaPanel`. Nie przenoś tam elementu używanego tylko przez jeden route.

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

## Design system

- `src/styles/globals.css` jest źródłem surowych i semantycznych tokenów koloru, typografii, odstępów, promieni, cieni i ruchu.
- Wszystkie nowe komponenty muszą korzystać z tokenów oraz istniejącej skali. Nie wpisuj lokalnych kolorów hex ani przypadkowych wartości odstępów w TSX.
- Nie twórz kopii przycisku, linku, karty, pola formularza, badge’a, Notice ani nagłówka sekcji. Rozszerz istniejący komponent tylko wtedy, gdy wariant opisuje powtarzalną odpowiedzialność.
- CTA korzystają z `Button`, `ButtonLink` i centralnego modelu w `src/config/ctas.ts`.
- Każda interakcja otrzymuje widoczny `focus-visible`; nie ukrywaj globalnego focus ringa i nie dopuszczaj do jego obcięcia.
- Projektuj oraz sprawdzaj od 320 px. Standardowy główny target dotykowy ma minimum około 44 × 44 px.
- Nie stosuj rozbudowanych gradientów, glassmorphismu, glow, blobów, kul 3D, animowanych siatek ani generycznych efektów kojarzonych z automatycznie generowanym UI.
- Limonkowy `accent` jest wsparciem, nie kolorem dużego głównego CTA. Powierzchnia `strong` jest kontrolowaną zmianą rytmu, a nie dark mode.
- Po każdej zmianie UI sprawdź `/design-system` oraz zgodność z `docs/DESIGN_SYSTEM.md`, `docs/COMPONENT_INVENTORY.md` i `docs/VISUAL_DIRECTION.md`.
- Zmiana publicznego API komponentu wymaga aktualizacji inwentarza. Nowy wariant musi mieć realnego konsumenta i prezentację na `/design-system`.

## Dostępność

- Zachowuj semantyczne landmarki, logiczną hierarchię nagłówków i poprawną kolejność DOM.
- Wszystkie interakcje muszą działać klawiaturą i mieć widoczny stan `focus-visible`.
- Nie usuwaj outline bez równoważnego zamiennika.
- Zapewniaj etykiety kontrolek, poprawne nazwy linków, wystarczający kontrast i komunikaty błędów powiązane z polami.
- Respektuj `prefers-reduced-motion`; ruch nie może być konieczny do zrozumienia treści.
- Używaj obrazów dekoracyjnych i treściowych zgodnie z ich rolą, z właściwym tekstem alternatywnym.

## Globalny layout i nawigacja

- `src/config/navigation.ts` jest jedynym źródłem pozycji headera, mobile i stopki. Desktop i mobile mają korzystać z tej samej tablicy danych.
- Każdy nowy link musi wskazywać trasę z centralnego rejestru i przejść `npm run content:check`. Nie dodawaj pustych hrefów, `#` ani pozycji prowadzącej do 404.
- Menu musi działać myszą, dotykiem i klawiaturą. Zachowuj `Enter`, `Space`, `Escape`, `Tab`, `Shift + Tab`, zamknięcie poza panelem i właściwe przywracanie fokusu.
- Nie ukrywaj outline. Aktywny stan i stan rozwinięcia nie mogą zależeć wyłącznie od koloru lub ikony.
- Breadcrumbs zawsze korzystają z centralnych nazw i rodziców w rejestrze stron. Nie twórz etykiet przez zamianę myślników w URL.
- `SiteHeader` i `SiteFooter` należą wyłącznie do root layoutu. Nie duplikuj ich w route’ach ani sekcjach.
- Każda nowa strona używa `PageShell` albo równoważnie zapewnia dokładnie jeden `main#main-content`; nie dodawaj drugiego landmarku `main`.
- `GlobalCta` jest reużywalne i korzysta z identyfikatorów w centralnym systemie CTA. Wyłączaj je tylko przy konflikcie intencji strony.
- Stopka pobiera dane kontaktowe i sociale wyłącznie z `src/config/contact.ts`; nie pokazuje pustych pól ani fikcyjnych wartości.
- Client Components ograniczaj do interakcji. Root layout, header shell, PageShell, PageHeader, GlobalCta i footer pozostają serwerowe.
- Po zmianie nawigacji sprawdź wariant desktopowy i mobilny, aktywną trasę, Escape, focus, brak overflow oraz sekcję globalnego layoutu na `/design-system`.

## SEO i treść

- `src/config/routes.ts` jest źródłem planowanych adresów, a `src/content/page-registry.ts` ich roli, metadata i statusu. Nie twórz alternatywnego rejestru w komponencie.
- Zmiana URL, intencji albo hierarchii wymaga równoczesnej aktualizacji modelu danych i odpowiedniej dokumentacji.
- Każda indeksowalna podstrona otrzymuje unikalny polski tytuł, opis i canonical, gdy routing zostanie ustalony.
- Metadata współdzielone opieraj na `src/config/site.ts`; dane stron trzymaj blisko route lub odpowiedniego modelu treści.
- Używaj jednego głównego `h1`, semantycznych nagłówków i tekstowych linków opisujących cel.
- Dane strukturalne dodawaj wyłącznie wtedy, gdy odpowiadają widocznej, prawdziwej treści.
- Nie publikuj niezweryfikowanych wyników, opinii, liczb, realizacji ani gwarancji.
- Finalne widoki nie mogą zawierać lorem ipsum, generycznych placeholderów, przypadkowych zdjęć ani sztucznie wypełnionej treści.
- Nie twórz osobnej podstrony tylko dla synonimu frazy. Najpierw sprawdź ryzyko kanibalizacji w `docs/SEO_CONTENT_MAP.md`.
- Nowa usługa, CTA, relacja lub trasa musi przejść `npm run content:check`.

## Interactive experience i WebGL

- WebGL nigdy nie zawiera jedynej wersji ważnej treści. UI, CTA, nawigacja, semantyka i SEO pozostają w DOM.
- Nie wolno przenosić root layoutu, `PageShell`, headera, stopki ani route'u tylko po to, aby obsłużyć WebGL, do Client Component. Jawna granica klientowa zaczyna się w `ExperienceCanvas`.
- Ciężki renderer importuj dynamicznie i montuj dopiero w pobliżu viewportu. Każde użycie musi rezerwować stabilny obszar i pokazywać fallback przed gotowością sceny.
- Każda scena posiada jawne zachowanie reduced motion, strategię mobile, quality tiers oraz działający wariant bez WebGL.
- Cały kolor sceny pochodzi z semantycznych tokenów `--experience-*` w `src/styles/globals.css`; nie wpisuj kolorów hex w komponentach, materiałach ani shaderach.
- Nie dodawaj dużych modeli, tekstur, HDRI, wideo ani innych assetów bez opisanego budżetu rozmiaru, geometrii, pamięci i wariantów jakości.
- Nie dodawaj bibliotek WebGL, shaderów, particles, postprocessingu, physics ani smooth scroll bez konkretnego konsumenta, analizy wpływu i aktualizacji dokumentacji.
- R3F zarządza wspólną pętlą renderowania. Nie twórz osobnych ciągłych RAF loops; pojedynczy RAF może wyłącznie koaleskować pomiary zdarzeń i musi mieć cleanup.
- DPR wybiera centralny model quality tiers. Nie używaj przypadkowych wartości DPR ani user-agent sniffingu.
- Scroll mapuje się na progres, następnie na tłumiony stan sceny, a dopiero potem na kamerę. Nie przypisuj surowego `scrollY` bezpośrednio do transformacji.
- Pointer influence ma być mały, ograniczony i wyłączony dla touch oraz reduced motion. Canvas dekoracyjny nie przechwytuje fokusu ani interakcji UI.
- Nowa scena musi działać bez WebGL i nie może pokazywać użytkownikowi technicznego błędu, jeśli nie ma działania naprawczego.
- Nie dodawaj efektu tylko dlatego, że jest efektowny. Każda zmiana kamery, światła lub geometrii musi wspierać zrozumienie narracji.
- Każda scena musi realizować nazwaną funkcję narracyjną. Nie dodawaj geometrii, ruchu, światła ani sygnału wyłącznie jako dekoracji.
- Procedural randomness musi być deterministyczny. Nie używaj `Math.random()` podczas renderowania; utrzymuj stabilne seedy i dane tworzone poza pętlą klatek.
- Kamera ma jedno źródło prawdy w `src/lib/experience/camera-path.ts`. Klatki, waypointy i choreography data nie mogą być rozsiane po komponentach.
- Materiały i geometrie współdziel, gdy pozwala na to ich rola. Każdy ręcznie utworzony zasób Three.js musi mieć jawny lifecycle i cleanup; nie zwiększaj draw calls bez pomiaru oraz uzasadnienia.
- Każdą kompozycję sprawdzaj co najmniej w wariancie `compact` i `wide` oraz w kilku proporcjach viewportu. Mobile nie jest pomniejszonym kadrem desktopowym.
- Nie aktualizuj React state w każdej klatce. Transformacje realtime zapisuj przez refy w zarządzanej pętli R3F.
- Nie dodawaj ciężkiego postprocessingu bez pomiarów sceny bazowej, ustalonego budżetu i wariantu LOW/FALLBACK.
- Po zmianie experience sprawdź `/experience-lab`, `docs/INTERACTIVE_EXPERIENCE.md`, `docs/CONVERSION_LANDSCAPE.md`, `docs/MOTION_SYSTEM.md`, `docs/WEBGL_PERFORMANCE.md` i uruchom `npm run experience:check`.

## Homepage Hero

- Hero `h1` zawsze pozostaje w DOM i jest renderowany serwerowo. Nie renderuj headline, leadu ani CTA w canvasie.
- Hero content nie czeka na gotowość WebGL. Pierwszy HTML zawiera pełne copy, akcje i dopracowany fallback.
- WebGL nie może blokować LCP ani zmieniać wymiarów Hero po inicjalizacji. Rezerwuj wysokość przed hydratacją i zachowuj dynamiczny import ciężkiego renderera.
- Hero musi mieć pełny fallback oraz jawny, dopracowany wariant reduced motion; samo wyłączenie wszystkich warstw wizualnych nie jest poprawną degradacją.
- Mobile może mieć osobną centralną camera composition i inne kadrowanie, ale nie wolno tworzyć drugiego Hero, osobnego mobile H1 ani kopii treści.
- Camera path ma jedno źródło prawdy w `src/lib/experience/camera-path.ts`. Nie rozrzucaj korekt keyframes po komponentach Hero lub sceny.
- DOM i WebGL używają jednego semantic progress. Dopuszczalne są różne krzywe mapowania, ale nie drugi listener, store ani niezależna oś scrolla.
- Header, dropdowny i menu mobilne zawsze pozostają ponad experience layer; canvas nie może blokować fokusu, pointera ani touch scrolla.
- Finalny Hero nie zawiera fikcyjnych proof metrics, opinii, nagród ani wyników. Sygnały kompetencji muszą być prawdziwymi kategoriami albo zweryfikowanymi danymi.
- CTA Hero pochodzą z centralnej konfiguracji `src/config/ctas.ts`; nie duplikuj etykiet ani adresów w JSX.
- Cinematic motion nie może być scroll-jackingiem. Zachowuj natywny scroll, działające anchory, klawiaturę i rozsądną długość tracku.
- Po zmianie Hero sprawdź `/`, jego tryb manualny w `/experience-lab`, `docs/HOMEPAGE_HERO.md`, wymagane proporcje, reduced motion, fallback, kontrast, overflow i pełny zestaw kontroli.

## Homepage Problem → Diagnoza

- Treść problemów zawsze istnieje w serwerowym DOM. WebGL obrazuje relacje i zmianę hierarchii, ale nigdy nie jest jedyną reprezentacją problemu.
- `src/content/home-problem-diagnosis.ts` jest jednym źródłem treści rozdziału i powiązań z domenami sceny. Nie duplikuj danych dla mobile, desktopu, laba ani accessibility.
- Nie publikuj fikcyjnych wskaźników diagnostycznych i nie udawaj automatycznej analizy bez działającego backendu. Mini diagnoza kieruje do prawdziwej trasy z centralnego systemu CTA.
- Diagnoza oznacza identyfikację relacji, priorytetu i zakresu, nie gotowe rozwiązanie. Finalna transformacja Before → After należy do etapu 9.
- Globalny scene progress pozostaje jednym źródłem prawdy. Camera path pozostaje centralny, a progi semantyczne nie mogą być rozsiane po komponentach.
- Sekwencja musi pozostać poprawna przy powolnym i szybkim scrollu, klawiaturze oraz przeciągnięciu paska przewijania. Nie uzależniaj treści od zatrzymania w konkretnej klatce.
- Mobile korzysta z naturalnego flow DOM i nie może zależeć od desktopowej sticky choreography. Reduced motion pokazuje stabilny stan diagnozy bez camera travel.
- Nie dodawaj efektu WebGL bez funkcji narracyjnej. Etap Problem → Diagnoza ponownie wykorzystuje istniejące geometrie, materiały i sygnały zamiast zwiększać koszt sceny.
- Po zmianie rozdziału sprawdź `/`, tryb Problem → Diagnoza na `/experience-lab`, `docs/HOMEPAGE_PROBLEM_DIAGNOSIS.md`, CTA `/brief`, mobile, fallback, reduced motion, framing oraz pełny zestaw kontroli.

## Kontrola jakości i raportowanie

Po każdej zmianie wpływającej na kod lub konfigurację uruchom:

```bash
npm run format:check
npm run lint
npm run typecheck
npm run content:check
npm run design:check
npm run experience:check
npm run build
```

Napraw wszystkie błędy i ostrzeżenia pochodzące z projektu. Przed zakończeniem sprawdź diff oraz `git status`. Raport końcowy powinien jasno opisać zakres, pliki, decyzje, wyniki kontroli, stan Git i rzeczywiste ryzyka. Nie deklaruj wykonania kontroli, której faktycznie nie uruchomiono.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
