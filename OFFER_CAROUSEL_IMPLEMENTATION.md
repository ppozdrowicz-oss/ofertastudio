# Complete e-commerce offer showcase

Latest update: **2026-10-12 — COLLECTION 03 - MILWAUKEE**, appended below. The two-collection findings and measurements that follow are preserved as historical baseline evidence, not the current collection count or perfume-correction status.

Local implementation and verification: 2026-10-11.

The existing `#perspektywy` carousel now presents two complete offers, with eight supplied photographs each. The default is Obuwie; the second collection is Valentino Donna Born in Roma Intense. The heterogeneous gallery was replaced, not duplicated. All sixteen photographs are integrated and all technical checks are complete. One supplied informational graphic still requires a factual correction before release; see Remaining issues.

## Architecture

- `src/content/showcase.ts`: typed `OfferCollection`, `OfferSlide` and `OfferImage` model. Owns collection identity, exact paths/dimensions, titles, subtitles, commercial descriptions, purpose, Polish alt text and optional review note.
- `src/components/experiences/ProductShowcase.tsx`: one reusable carousel for the selected collection. Reuses the original offset, wrapping, pointer capture and transform architecture.
- `src/components/experiences/ProductShowcase.module.css`: scoped presentation, collection controls, reserved captions and image preview styles. Global typography, colors and design tokens were not changed.
- `src/components/experiences/OfferImagePreview.tsx`: native modal dialog with full-frame viewing and optional scrollable detail enlargement.
- `src/components/sections/Portfolio.tsx`: keeps the portfolio introduction, dark watch feature and contact link; replaces only the previous showcase content. The now-unused `CategoryGallery.tsx` fallback was removed.
- `src/lib/showcase.ts`: existing navigation helpers, unchanged.

The section reads “Wybrane prezentacje ofert / Jeden produkt. Kompletna oferta.” Adding another complete collection requires a content entry and supplied assets, without another carousel implementation. No third collection is exposed.

The header, wordmarks, hero, existing five-stage perfume sequence, separate sneaker presentation, precision feature, capabilities, contact, privacy route and footer were preserved. In particular, this task did not reinstate the previously rejected registered sneaker Before/After: the existing truthful independent-frame implementation remains intact.

## Sneaker collection

Directory: `public/media/offer-carousel/sneaker/`. All images: 2600 × 2600 px. Full commercial descriptions and alt text are in the content model.

| Filename                  | Title                       | Caption / purpose                                 | Original bytes |
| ------------------------- | --------------------------- | ------------------------------------------------- | -------------: |
| `01-main.webp`            | Pierwsze wrażenie.          | Zdjęcie główne — pierwszy kontakt z ofertą        |         473194 |
| `02-multiview.webp`       | Każda strona ma znaczenie.  | Różne perspektywy — kształt i konstrukcja         |         565310 |
| `03-material-detail.webp` | Jakość widoczna z bliska.   | Materiał i detal — faktura i przeszycia           |        1615810 |
| `04-features.webp`        | Cechy, które warto pokazać. | Konstrukcja produktu — układ paneli i sznurowanie |         541302 |
| `05-sole-detail.webp`     | Konstrukcja pod lupą.       | Detal podeszwy — geometria i wykończenie          |         923064 |
| `06-lifestyle.webp`       | Produkt w swoim świecie.    | Lifestyle — produkt w użyciu                      |         853042 |
| `07-size-guide.webp`      | Wybór bez zgadywania.       | Rozmiary i dopasowanie — plansza doboru wariantu  |         681256 |
| `08-packaging.webp`       | Wszystko w jednym kadrze.   | Komplet i opakowanie — para i pudełko             |         645234 |

`04-features.webp` is a side photograph, not an annotated infographic. Its subtitle and explanation reflect the actual image rather than promising absent graphics or invented technical features. The user confirmed manufacturer verification of the size-guide data; no manufacturer URL for that specific chart was supplied, so this is recorded as user confirmation, not an independent numerical audit. The table can be enlarged on mobile.

## Perfume collection

Product identification: **Valentino Donna Born in Roma Intense**. Directory: `public/media/offer-carousel/perfume/`. All images: 2600 × 2600 px.

| Filename              | Title                             | Caption / purpose                                              | Original bytes |
| --------------------- | --------------------------------- | -------------------------------------------------------------- | -------------: |
| `01-main.webp`        | Produkt w centrum.                | Zdjęcie główne — flakon i wykończenie                          |         609974 |
| `02-premium.webp`     | Więcej niż zwykły packshot.       | Ekspozycja premium — światło i scenografia                     |         948594 |
| `03-cap-detail.webp`  | Precyzja w każdym detalu.         | Makrofotografia — nakrętka i wykończenie                       |        1156928 |
| `04-glass-light.webp` | Szkło, kolor, światło.            | Materiał i transparentność — szkło i refleksy                  |        1296982 |
| `05-information.webp` | Ważne informacje. Czytelnie.      | Grafika informacyjna — przykładowy układ, oznaczony do korekty |         851082 |
| `06-lifestyle.webp`   | Produkt w odpowiedniej oprawie.   | Lifestyle — aranżacja i kontekst                               |         900958 |
| `07-in-hand.webp`     | Perspektywa, która pomaga wybrać. | Produkt w dłoni — perspektywa użytkownika                      |         680738 |
| `08-packaging.webp`   | Kompletna prezentacja.            | Produkt i opakowanie — spójny zestaw obrazów                   |         904366 |

The in-hand caption does not assert verified physical scale. Packaging captions describe what is visible without certifying actual retail contents. No client relationship, endorsement, sales uplift or fragrance specification was invented. The section identifies these as example presentations and does not imply commissioned work for the pictured brands.

## Interactions

- Native collection buttons: `01 / OBUWIE`, `02 / PERFUMY`, explicit pressed state and visible focus.
- Switching prepares and decodes the incoming first image and both neighbors before atomically replacing the collection. It resets the counter to 01, preserves button focus and prevents a blank neighboring frame on first load.
- A request token ignores outdated image completions after rapid collection changes. Pending state has a restrained dotted underline, `aria-busy` and a polite loading announcement. An image failure cannot leave collection switching permanently waiting.
- Previous/Next, clickable neighboring frames, horizontal mouse drag, touch swipe, Left/Right, Home/End and circular 08 → 01 / 01 → 08 navigation.
- The keyboard handler is scoped to the gallery; collection controls keep normal button behavior. Hidden slides are inert and excluded from the accessibility tree. There is one announced active photograph and a polite caption update.
- Pointer release outside the frame, cancellation and rapid navigation are tested. Vertical scrolling and pinch zoom remain native. No autoplay or scroll hijacking.
- Caption and product-name grids reserve space for the longest content across both collections. Image/caption mappings and section-height stability are tested.
- “Powiększ zdjęcie” opens a full-frame native dialog. Escape/close dismiss it, focus returns to the opener, and a scrollable enlargement makes embedded information readable. No second gallery or duplicate overview was added.
- Reduced motion disables frame/caption transitions and the photo reveal.

## Responsive

All required widths passed image-framing and overflow checks:

| Width | Composition                                                             | Verified states                               |
| ----: | ----------------------------------------------------------------------- | --------------------------------------------- |
|   375 | 82% central square, narrow neighbors, stacked copy/controls             | Both collections: 01, 04, 08                  |
|   390 | Same; full-screen image preview with accessible detail zoom             | Both collections: 01, 04, 08; size table zoom |
|   430 | Same mobile composition with wider text measure                         | Both collections: 01, 04, 08                  |
|   768 | 72% central square, restrained overlap, two-column section introduction | Both collections: 01, 04, 08                  |
|  1024 | 58% central square, inline editorial caption/navigation                 | Both collections: 01, 04, 08                  |
|  1280 | Desktop composition, full source frames                                 | Both collections: 01, 04, 08                  |
|  1440 | Desktop stage reaches its 1440 px cap                                   | Both collections: 01, 04, 08                  |
|  1920 | Centered 1440 px stage, approximately 835 px active frame               | Both collections: 01, 04, 08                  |

The neighboring frames retain the approved 0.86 scale, restrained 6° perspective and 560 ms transform transition. The active photograph is flat, fully opaque and on top. White listing backgrounds are preserved as legitimate editorial frames. Every active image uses `object-fit: contain`; no product, packaging or embedded text is additionally cropped by the component. Source macro crops remain exactly as supplied.

For the 48 carousel screenshots, capture height is extended to include the complete section, while keeping each target width and matching viewport-based geometry. Separate whole-page tests use the original device viewport heights.

## Asset validation

All sixteen required paths exist with their expected filenames; no ambiguous mapping or substitute photograph was needed.

- Genuine WebP encoding verified with RIFF/WEBP headers and complete Pillow/Sharp decoding, not filename extension alone.
- Every source is square, 2600 × 2600 px, opaque RGB, with no embedded ICC profile. Sharp reports the decoded color space as `srgb`; this is not evidence of a supplied ICC profile.
- No corruption or decode warnings. Total original size: **13,647,834 bytes**.
- All sixteen images were visually reviewed in contact sheets, with additional full-size inspection of informational graphics and rendered compositions.
- SHA-256 checks confirm all 15 previously integrated photographs are identical to baseline commit `ca904075dcf0807b9a09b47b2fa52b056773d5a9`; all 17 supplied offer-directory files are identical to their initial audit hashes, including the unused power-tool file.
- No source resizing, recompression, renaming, retouching, background removal, blending or pixel edits were performed.
- `public/media/offer-carousel/power-tool/01-main.webp` is preexisting user work, deliberately untouched and excluded from this implementation and commit.

Repeatable read-only audit: `node --import tsx scripts/audit-offer-assets.mjs`. It follows the content model, fully decodes the sixteen files, checks dimensions and writes hashes/metadata to ignored QA output.

## Performance

No carousel, animation or 3D dependency was added. Transitions use CSS transforms and opacity. Images use the existing Next Image optimizer, quality 90, explicit dimensions and responsive `sizes`.

Initially only three images from the selected collection are mounted, with lazy loading. Distant images mount as navigation approaches them; the second collection starts loading only when selected. A browser test confirms that switching to perfume initially requests only images 01, 02 and 08. The full-resolution enlargement is requested only after opening/zooming the preview.

The production performance test observed **zero offer-image requests during initial hero loading** in all six samples. The sixteen originals are not transferred on entry.

Local production-build measurements, three runs per profile:

| Profile                                  | LCP samples           | CLS range | Longest sampled interaction events |
| ---------------------------------------- | --------------------- | --------- | ---------------------------------- |
| Desktop, unthrottled localhost           | 448 / 504 / 560 ms    | 0.000523  | 96 / 160 / 88 ms                   |
| Mobile, 4× CPU, 1.6 Mbps, 150 ms latency | 2028 / 1356 / 1544 ms | 0.000146  | 176 / 320 / 128 ms                 |

Browser cache was disabled; the local optimizer cache could be warm. These are lab observations, not field Core Web Vitals. The event samples exercise existing capability controls and are not an INP certification; one mobile sample reached 320 ms. No production performance claim is made.

Final built-output check: 9 initial script files, **195182 gzip bytes**, 70812 HTML bytes, 13 initial image elements and 16 checked internal destinations. The normal preview build remains `noindex, nofollow` with the customer form disabled by its existing configuration.

## QA

Commands executed from `/home/roland/ofertastudio-next/studio`:

| Command                                                                                                       | Actual result                                                                                                                                               |
| ------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `npm ls --depth=0`                                                                                            | Exit 0; required pinned dependencies present. Existing optional Sharp/WASM packages are reported as extraneous; dependencies and lockfile were not changed. |
| `npm run lint`                                                                                                | PASS, zero warnings                                                                                                                                         |
| `npm test`                                                                                                    | PASS, 23 logic/DOM/asset tests                                                                                                                              |
| `npm run typecheck`                                                                                           | PASS, route type generation and strict TypeScript                                                                                                           |
| `npm run test:e2e -- --config=playwright.production.config.ts tests/visual.spec.ts`                           | Pre-change baseline: 8 passed                                                                                                                               |
| `npm run test:e2e -- --config=playwright.production.config.ts tests/showcase.spec.ts`                         | First implementation pass: 9 passed; followed by the three-frame preload refinement and its additional regression test                                      |
| `npm run test:e2e -- --config=playwright.production.config.ts`                                                | Final application code: 29 passed; one test-harness failure described below                                                                                 |
| `npm run test:e2e -- --config=playwright.production.config.ts tests/showcase.spec.ts -g 'full image preview'` | Corrected test: 1 passed; all 30 browser scenarios have now passed                                                                                          |
| `node --import tsx scripts/audit-offer-assets.mjs`                                                            | PASS, all 16 originals decoded and dimension checked                                                                                                        |
| `npm run build`                                                                                               | PASS, final normal preview build; all 8 generated pages completed                                                                                           |
| `npm run test:build`                                                                                          | PASS, branding, metadata, local images and internal destinations                                                                                            |
| `npx prettier --check` with changed source/test/script paths                                                  | PASS                                                                                                                                                        |
| `git diff --check`                                                                                            | PASS                                                                                                                                                        |

The one browser failure was in the new screenshot wait: it constructed `new URL(currentSrc)` while `currentSrc` was temporarily empty during loading. Supplying a base URL allows polling to continue until the actual high-resolution resource is selected and decoded. No assertion was removed; the focused rerun passed, including zoom, focus restoration and modal axe checks. No application code changed after the 29 passing scenarios.

Coverage includes collection selection, eight ordered images each, all sixteen title/path/alt mappings, both wrap directions, mouse/touch/keyboard, rapid changes, reset to 01, reduced motion, delayed neighboring-image preparation, honest missing-image fallback, image enlargement, focus restoration, no horizontal overflow and unchanged existing interactions.

Whole-page and targeted axe scans reported zero violations for the tested WCAG A/AA rules. Existing automated contrast uncertainties over image/gradient layers are retained in accessibility JSON; this is not a blanket WCAG certification. Browser checks found no unexpected console/hydration errors or broken loaded photographs. The deliberately intercepted image failure verifies the error UI. Form tests use intercepted local requests; no real contact submission was sent in this task.

## Visual evidence

Ignored local evidence root: `qa/screenshots/offer-carousel/`.

- `baseline/`: preserved pre-change hero, section and full-page screenshots.
- `current/`: 163 PNGs from whole-page, interaction and offer tests, including 48 collection-state captures.
- `current/{375,390,430,768,1024,1280,1440,1920}-{sneaker,perfume}-{first,middle,last}.png`: first, fourth and eighth slides in each collection.
- `current/390-size-guide-zoom.png`: legible enlarged table with visible close/focus controls.
- `current/{width}-full.png`: full-page context at all eight widths.
- `current/performance-{desktop,mobile}.json`: raw local measurements.
- `current/{390,1440}-accessibility.json`: complete axe findings, including manual-review items.
- `assets.json`, `asset-validation.json`, `preservation.json`: original metadata, full decode results and hash preservation.
- `regression.json`: 64 comparisons of unrelated sections; 31 are pixel-identical, including every hero, sneaker presentation and watch feature. Lower sections show subpixel text rasterization and occasional one-pixel capture-boundary differences after the changed carousel height; reviewed compositions remain unchanged.
- `stage-regression.json`: all 14 explicit perfume-stage screenshots are pixel-identical. General scroll-driven sticky captures differ while the existing crossfade is in progress; the matched explicit states verify the sequence itself was preserved.

Focused refinement corrected blank neighboring frames during first collection switching. A delayed-image regression test now keeps the current offer visible until all three incoming frames are ready. The large-screen stage was capped to keep square source images at a practical viewing size, and mobile detail zoom was added to make tables readable without cropping the carousel images.

## Remaining issues

**Supplied perfume graphic 05 requires correction.** The user confirmed that the data came from the manufacturer. Nevertheless, the graphic labels the heart note as “Rum”, while the official [Valentino Donna Born in Roma Intense product page](https://www.valentino-beauty.us/fragrances/fragrances-women/born-in-roma-donna-intense/born-in-roma-donna-eau-de-parfum-intense-MPL01906.html) identifies jasmine as the heart. This observed contradiction is not resolved by general source confirmation.

The original `perfume/05-information.webp` is preserved and integrated, with a restrained visible review note, corresponding alt text and the same notice in the enlarged view. It is presented as an example layout, not verified fragrance data. Before release, supply a corrected graphic for this exact product, review the remaining embedded specifications and remove the review note only after that check. No invented replacement graphic was generated.

There are no missing files in either eight-image collection and no unresolved implementation failure. Existing business/privacy approval and final production authorization remain separate release requirements described in `PRODUCTION_READINESS.md`; this carousel task does not approve or alter them.

## Git

Repository: `/home/roland/ofertastudio-next/studio`.

- Base: `ca904075dcf0807b9a09b47b2fa52b056773d5a9` on the previous editorial-showcase branch.
- Dedicated local branch: `feature/complete-offer-collections-2026-10-11`.
- Implementation checkpoint: `feat: integrate complete sneaker and perfume offer galleries` (the commit containing this document; resolve its SHA with `git log -1 --format='%H %s'`).
- The sixteen sneaker/perfume originals are included. The preexisting untracked `public/media/offer-carousel/power-tool/01-main.webp` is excluded and preserved.
- Screenshots, `.next`, dependency folders, environment files and local test artifacts are not committed.

Changed implementation files: the carousel component/CSS/content, portfolio assembly, removed obsolete fallback and new image-preview component. Changed verification files: `tests/showcase.spec.ts`, `tests/unit/showcase.test.ts`, `tests/qa-paths.ts` and new `scripts/audit-offer-assets.mjs`. Documentation: this report, `README.md`, `ASSETS.md`, and historical notices in `SHOWCASE_ASSETS.md` / `SHOWCASE_IMPLEMENTATION.md`.

## Deployment

**No push or deployment was performed.** No Netlify site configuration, domain, DNS or production branch was changed. Existing staging was not updated. All browser verification used the local production build.

Local preview:

```bash
cd /home/roland/ofertastudio-next/studio
npm run dev
# http://localhost:3000/#perspektywy
```

Production-format local preview: `npm run build && npm start`. Release remains a separately authorized task, subject to the factual graphic correction and existing release gates.

## COLLECTION 03 - MILWAUKEE

Implementation date: 2026-10-12. Base commit: `291c045b68ff6692ec0169d323595b14a9aebcb7`. Branch retained: `feature/complete-offer-collections-2026-10-11`.

### Scope and architecture

The existing carousel now contains **Obuwie 8/8, Perfumy 8/8, Narzędzia 8/8**. Milwaukee uses the same `OfferCollection` / `OfferSlide` model, navigation state, preparation of adjacent images, captions, reduced-motion rules and native image dialog. The default collection remains Obuwie.

`src/content/showcase.ts` adds the `power-tool` entry. Following the existing schema, `title` supplies the short selector label “Narzędzia”; `subtitle` stores “Profesjonalny zestaw elektronarzędzi”; `productName` is “Zestaw Milwaukee M18 FUEL”. The provided description, all eight titles, labels and commercial explanations are centralized there, with descriptive alt text and stable sequential IDs.

**No carousel component, CSS, animation, layout primitive, dependency or global design token was changed.** The data-driven selector automatically renders `03 / NARZĘDZIA`. Existing page sections, including the watch feature, remain untouched. The newly supplied untracked `public/media/portfolio/watch/watch-detail.webp` is outside this task and is not included in the commit.

### Milwaukee assets and commercial roles

All paths are relative to `public/media/offer-carousel/power-tool/`.

| Filename                     | Title                               | Commercial role / visual finding                                                              | Dimensions  |   Bytes |
| ---------------------------- | ----------------------------------- | --------------------------------------------------------------------------------------------- | ----------- | ------: |
| `01-main.webp`               | Kompletny zestaw. Jedno spojrzenie. | Complete kit: two tools, two separate batteries, charger and carrying case, all visible       | 2600 × 2600 |  964824 |
| `02-dual-tools.webp`         | Dwa narzędzia. Dwie konstrukcje.    | Two tools without batteries; drill chuck/side handle and impact holder remain distinguishable | 2600 × 2600 |  660116 |
| `03-chuck-detail.webp`       | Precyzja widoczna z bliska.         | Supplied macro crop of chuck, metal texture and adjustment elements                           | 2600 × 2600 |  714124 |
| `04-impact-detail.webp`      | Każdy element ma znaczenie.         | Impact-driver housing, trigger, handle profile and attached battery                           | 2600 × 2600 |  646816 |
| `05-tool-comparison.webp`    | Różnice pokazane czytelnie.         | Side-by-side photographic comparison; no numerical specification chart or performance values  | 2600 × 2600 |  420902 |
| `06-workshop-lifestyle.webp` | W swoim naturalnym środowisku.      | Workshop context; screw orientation flagged as an asset limitation below                      | 2600 × 2600 |  908172 |
| `07-batteries-charger.webp`  | Zasilanie pod kontrolą.             | Exactly two batteries with visible 5.0 Ah markings and one charger                            | 2600 × 2600 |  782208 |
| `08-premium-campaign.webp`   | Mocna forma. Wyrazisty obraz.       | Full kit in a dark industrial composition; no component removed or cropped by the interface   | 2600 × 2600 | 1269624 |

All eight are genuine WebP, square, opaque RGB and fully decodable. No embedded ICC profile is present; Sharp reports the decoded space as `srgb`. Combined Milwaukee original size: **6366786 bytes**. All 24 mapped images total **20082176 bytes**, including the updated perfume graphic. The same read-only asset audit checks headers, dimensions, full decoding, alpha, ICC metadata and hashes.

The eight Milwaukee files are integrated byte-for-byte as supplied. No source was resized, renamed, recompressed, regenerated or retouched. Main/campaign frames retain the full kit. The explicit 5.0 markings describe visible labels, not an independently measured capacity or inferred model specification. No torque, RPM, model number or manufacturer endorsement was added.

### Valentino correction

**Resolved using the user-supplied corrected replacement** at the original path `public/media/offer-carousel/perfume/05-information.webp`.

At the initial audit, the previous raster still contained the rum/liquor wording and incorrect note assignments. A new supplied version appeared during work. The replacement was reviewed and adopted unchanged. There was no generative reconstruction or additional pixel editing; the prior raster remains in Git history.

The replacement now states vanilla Bourbon at the opening, jasmine at the heart and benzoin resin at the base, consistent with the official [Valentino product description](https://www.valentino-beauty.us/fragrances/fragrances-women/born-in-roma-donna-intense/born-in-roma-donna-eau-de-parfum-intense-MPL01906.html). The previous rum/liquor wording is absent. Its entire composition and text were reviewed, including 100% and 200% crops: spelling, alignment, legibility and continuous background show no local correction patch. The original provided typography has a consistent light edge around text at high enlargement; no additional sharpening was applied.

The obsolete warning was removed from the active caption and therefore the shared enlarged view. Alt text now describes the corrected note structure. Surrounding copy does not add physical-scale or retail-specification assertions. A regression test binds this review to the actual mapped raster hash, so replacing the image requires reviewing its embedded text again.

- Current corrected raster: 2600 × 2600, opaque RGB WebP, no embedded ICC, **918638 bytes**.
- SHA-256: `da78d3c50038687e58cf1518ba2ca255cd9afa590f1ec30b451d19a93d3ed0da`.
- Previous raster remains recoverable from commit `291c045`; it is not the active asset.
- All 24 currently reviewed supplied files are preserved unchanged after integration. The other 15 collection images and the 15 original homepage photographs retain their prior bytes.

### Responsive presentation and interactions

The real browser check covered 375, 390, 430, 768, 1024, 1280, 1440 and 1920 px. Existing flexible buttons accommodate the third option without a CSS change: on narrow available widths the index appears above the label; at wider widths they remain inline. All three stay visible, uncut and at least 44 px high, without horizontal page overflow.

The active slide retains the approved central scale and full-frame `contain` rendering. Native macros are shown as supplied; no extra interface crop is imposed. Product descriptors and captions retain reserved heights across all three collections. Mouse/neighbor/button navigation, circular first/last behavior, keyboard control, touch swipe, native vertical scrolling, lightbox closing/focus restoration and reduced motion remain unchanged.

The new tests explicitly cover Sneakers → Milwaukee, Valentino → Milwaukee and Milwaukee → Valentino, reset to `01 / 08`, retained focus, one carousel tree, correct title/description/image mapping for all 24 images, and a failed incoming Milwaukee image that does not leave collection switching stuck.

### Accessibility and performance

The existing native buttons, pressed state, focus indicators, live announcements, inert inactive slides and dialog semantics are reused. Additional targeted checks exercise the third collection and its enlarged view; existing page and modal checks remain enabled. Touch selection and swiping are tested in a mobile Chromium context with reduced motion.

Loading behavior is unchanged: three photographs from the active collection mount first; other collections do not load until selected. Incoming images 01/02/08 prepare before a switch completes. Distant images mount only as visited/approached, and full-size zoom remains on demand. One selected collection's eight frame containers are rendered, rather than three full carousel trees. No new runtime dependency was added.

Local production-build lab measurements (three fresh browser contexts per profile):

| Profile                                           | LCP per run         | Maximum CLS | Longest sampled interaction event | Offer-image requests at initial hero |
| ------------------------------------------------- | ------------------- | ----------- | --------------------------------- | ------------------------------------ |
| Desktop, local network                            | 380 / 556 / 364 ms  | 0.000523    | 64–120 ms                         | 0 in every run                       |
| Mobile, 4× CPU slowdown, 1.6 Mbps, 150 ms latency | 980 / 964 / 1004 ms | 0.000146    | 72–80 ms                          | 0 in every run                       |

These are local lab samples with DPR 1 and browser cache disabled; the local image-optimizer cache may be warm. Sampled interaction durations are not field INP. No claim is made about live production Core Web Vitals. The third collection introduces content and photographs, with no additional animation or carousel JavaScript.

### Current QA and visual evidence

Evidence root: `qa/screenshots/offer-carousel/collection-03/` (ignored by Git).

- `baseline/`: preserved prior carousel and newly captured pre-change full-page/section evidence from `291c045`.
- `current/`: current full-page, carousel, collection-transition and accessibility evidence.
- `{width}-power-tool-{first,middle,last}.png`: complete kit, impact detail and final campaign at every target width.
- `{width}-power-tool-second.png`, `{width}-power-tool-technical.png`: the two tools and chuck macro at all widths.
- `{width}-collection-switcher.png`: all three controls at all widths.
- `{width}-perfume-information.png`: corrected Valentino slide 05 at all widths.
- `switch-{sneaker-to-milwaukee,perfume-to-milwaukee,milwaukee-to-perfume}.png`: actual collection transitions.
- `valentino-100-percent.png`, `valentino-200-percent.png`: supplied corrected text inspected at native and enlarged resolution.
- `milwaukee-contact-sheet.jpg`, `kit-batteries.png`, `workshop-review.png`, `workshop-connection-100-percent.png`: asset inspection evidence.
- `originals.json`, `supplied-perfume-correction.json`, `asset-validation.json`, `preservation.json`: provenance, complete metadata/decoding and byte preservation.

The first full validation run passed 33 of 34 scenarios. The added mobile test exposed an emulation limitation: after an unpaced CDP swipe, Chromium delivered the next tap’s pointer/touch events but no DOM `click`, so the enlargement button did not open. This also reproduced with pointer capture disabled and explicit capture release disabled. A temporary CSS experiment did not help and was reverted. Pacing the native swipe over roughly 400 ms allows the following tap and modal close to work; the same assertions are retained. Existing fast-swipe and native vertical-scroll tests also remain enabled. No carousel code workaround was introduced. Rapid swipe-to-tap behavior on physical mobile hardware has not been verified.

| Command                                                                                                                                             | Final result                                                                                             |
| --------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------- |
| `npm run lint`                                                                                                                                      | PASS, zero warnings                                                                                      |
| `npm run typecheck`                                                                                                                                 | PASS, route generation and strict TypeScript                                                             |
| `npm test`                                                                                                                                          | PASS, 25 unit/DOM/asset tests                                                                            |
| `npm run test:e2e -- --config=playwright.production.config.ts`                                                                                      | PASS, all 34 browser scenarios in one final run (6.1 minutes)                                            |
| `node --import tsx scripts/audit-offer-assets.mjs`                                                                                                  | PASS, 24 genuine WebP files fully decoded with matching dimensions                                       |
| `npm run build`                                                                                                                                     | PASS, all 8 generated pages; normal preview configuration restored after the intercepted-form test build |
| `npm run test:build`                                                                                                                                | PASS, branding, metadata, 13 initially rendered images and 16 internal anchor destinations               |
| `npx prettier --check src/content/showcase.ts tests/qa-paths.ts tests/showcase.spec.ts tests/offer-collections.spec.ts tests/unit/showcase.test.ts` | PASS                                                                                                     |
| `git diff --check`                                                                                                                                  | PASS                                                                                                     |

No existing test was disabled. The final suite includes full-page and targeted axe checks with zero reported violations; retained `incomplete` entries require manual interpretation and this is not WCAG certification. No unexpected console/hydration errors or broken loaded images were reported. Deliberate intercepted image failures test the fallback. Form requests were intercepted locally; no real enquiry was submitted or staging form verification repeated.

The final evidence set contains **222 PNG screenshots**, including 72 first/middle/last offer states, 24 added tool-detail/Valentino states, eight collection-switcher views and three switching sequences. Of 64 comparisons of unrelated sections, **34 are pixel-identical**, including all eight hero, sneaker and watch captures. The remaining lower-page captures have subpixel text/capture-boundary differences; general sticky-sequence captures also vary during the existing crossfade. All **14 explicitly selected perfume-stage captures are pixel-identical**. Matched compositions were visually reviewed and no unrelated design regression was found.

The normal build contains 195182 gzip bytes across nine initial JavaScript files and 78977 bytes of HTML. It retains `noindex, nofollow` for the unapproved preview configuration. These are build output measurements, not a new production indexing decision.

### Remaining issues and release boundary

**Milwaukee image 06 remains an asset-level limitation.** In the supplied workshop image the visible screw head is next to the wood, with the exposed threaded shaft extending toward the driver. This appears reversed relative to a plausible bit engaging a screw head. The original is preserved; a restrained caption note and corresponding alt identify the orientation problem. The same note appears in the image dialog. Supply a physically correct replacement for `power-tool/06-workshop-lifestyle.webp` before presenting it as an accurate product-in-use photograph, then remove the note after review. This is not a carousel failure and no technical capabilities are inferred from the scene.

The integration does not establish full website release readiness. Existing privacy/business-information approval, Netlify verification and final release authorization remain separate gates. No production or staging deployment, Git push, DNS edit or remote configuration change was performed in this task.

### Git checkpoint and changed files

Continue on `feature/complete-offer-collections-2026-10-11`, based on `291c045b68ff6692ec0169d323595b14a9aebcb7`. The local implementation checkpoint is `feat: integrate Milwaukee complete-offer collection` (the commit containing this update; resolve its SHA with `git log -1 --format='%H %s'`).

Changes included:

- `src/content/showcase.ts`: third collection, corrected Valentino alt/review state and honest workshop note.
- `public/media/offer-carousel/power-tool/`: all eight supplied WebP originals.
- `public/media/offer-carousel/perfume/05-information.webp`: supplied corrected replacement; previous version preserved in Git history.
- `tests/offer-collections.spec.ts`: new third-collection interaction, responsive, touch and fallback coverage.
- `tests/showcase.spec.ts`, `tests/unit/showcase.test.ts`, `tests/qa-paths.ts`: extend existing coverage to 24 images and isolate current evidence.
- `README.md`, `ASSETS.md`, `OFFER_CAROUSEL_IMPLEMENTATION.md`: current asset status, QA and integration documentation. Earlier report results remain historical and intact.

After the checkpoint, tracked changes are clean. The unrelated user-supplied `public/media/portfolio/watch/watch-detail.webp` remains untracked and untouched. All 38 previously tracked media files outside the offer collections are byte-identical to the base commit. Temporary diagnostic tests/configuration were removed; screenshots, caches, environment files and experimental output are excluded from the commit.

**Production and existing staging remain unchanged. No push or deployment was performed.**

## Final creative integration — 2026-10-13

The subsequent integration adds individual expert explanations to all 24 photographs, uses Nike Air Max 90 naming, replaces the duplicate capabilities accordion with a concise service summary, and integrates the approved transparent watch macro. Earlier results above remain historical. Current validation and source limitations are in [FINAL_CREATIVE_INTEGRATION.md](FINAL_CREATIVE_INTEGRATION.md).
