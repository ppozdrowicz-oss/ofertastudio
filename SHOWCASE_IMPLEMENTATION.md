# Editorial showcase — implementation and verification

> Historical document. The complete sneaker/perfume offer collections supersede this earlier heterogeneous showcase. See [OFFER_CAROUSEL_IMPLEMENTATION.md](OFFER_CAROUSEL_IMPLEMENTATION.md) for the current implementation.

Date: 2026-10-11. Scope: local implementation, no release.

## BUILT

Implemented the eight-entry `ProductShowcase` with circular navigation, neighboring photographs, horizontal pointer/touch drag, keyboard controls and a typed content model. The feature is integrated into the existing portfolio, not added as a duplicate gallery.

**Technical preview: ready. Final photographic presentation: requires eight dedicated editorial photographs.** All supplied originals are white-background packshots; no suitable watch macro or other dedicated editorial master was found. The temporary compositions are explicitly labelled and excluded from production. This task does not remove the pre-existing legal/release blockers in `PRODUCTION_READINESS.md`.

## DESIGN

- Active desktop frame: 58% of the available width, 3:2, fully opaque and at the highest layer.
- Adjacent frames: scale 0.86, depth −32 px, restrained ±6° perspective and reduced opacity. Only two neighbors are visible.
- Transform transition: 560 ms, `cubic-bezier(0.22, 0.7, 0.2, 1)`. No springs, blur, parallax, autoplay or animation library.
- Reserved image and caption dimensions prevent navigation from changing section height. Index, technique, headline and material descriptor sit outside the photograph.
- Existing Bricolage Grotesque/Manrope typography, italic treatment, neutral canvas and olive accents remain in use. Scoped CSS does not change the global design system.
- No retail controls, prices, badges or lightbox were introduced. The carousel itself remains the interaction focus.

## INTEGRATION

`Portfolio.tsx` retains the original introduction, dark watch feature and contact link. The former editorial pair, category heading and small product shelf are replaced by the carousel in local/staging previews. Their original JSX is preserved in `CategoryGallery.tsx` for the production fallback.

The hero, five-stage perfume experience, independent sneaker frames, capabilities, navigation, contact, footer and brand wordmarks are unchanged. The source checkout was clean at `eb1a3968bff6d175f3f039ef4bf188980377dfe7`; work took place on a separate local feature branch.

## PHOTOGRAPHY

Temporary previews use the existing `watch`, `serum`, `headphones`, `leather`, `olive`, `candle`, `drill` and `packaging` media entries. They preserve the whole product with `object-fit: contain`; no artificial macro crop, grading, blending, retouching or generated photography was applied.

All **15 original WebP files are byte-identical** to the starting commit. SHA-256 evidence: `qa/screenshots/showcase/original-assets.json`.

The preview begins with the leather bag, avoiding an immediate repeat of the full-watch image above it. Once dedicated photographs are supplied, the presentation begins with watch precision. Preview headlines describe actual packshots; aspirational capability names are labelled “Docelowy kierunek”. Existing disclosure that the portfolio does not establish client relationships remains intact.

## ASSET GAPS

All eight files below remain absent under `public/media/showcase/`:

1. `watch-macro.webp` — genuine dial/steel macro.
2. `serum-glass.webp` — close glass, liquid and pipette composition.
3. `headphones-light.webp` — dark directional studio lighting.
4. `leather-texture.webp` — leather, stitching and hardware close-up.
5. `olive-oil-editorial.webp` — food context and accurate liquid color.
6. `candle-atmosphere.webp` — warm atmospheric commercial scene.
7. `tool-detail.webp` — functional construction and material close-up.
8. `packaging-story.webp` — deliberate product/open-packaging composition.

[SHOWCASE_ASSETS.md](SHOWCASE_ASSETS.md) specifies composition, lighting, background, mobile crop, fidelity and 3000 × 2000 px / 3:2 delivery for each image. Adding the file and updating its `image`, alt and focal points in `src/content/showcase.ts` requires no component change.

`CONTEXT=production` or `NEXT_PUBLIC_INDEXABLE=true` excludes entries without a real image. With fewer than three supplied photographs, the original gallery remains. With at least three, the carousel renders only supplied entries. The complete intended eight-capability presentation requires all eight. No missing filename is sent to Next Image merely to fill a slot.

## RESPONSIVE

Verified widths: **375, 390, 430, 768, 1024, 1280, 1440, 1920 px**.

Desktop: 58% active frame, 3:2. Tablet: 72%, 4:3. Mobile: 82%, 4:5, narrow neighboring glimpses, caption below and 44 px arrow buttons. Desktop controls are 48 px. Native vertical scrolling and pinch zoom remain available over the swipe area. Final editorial images use separately configurable desktop/mobile focal points; their real crops still require review after supply.

No horizontal page overflow was found. The active item survives viewport resizing. Preview photographs remain proportional with complete geometry visible in the active frame.

## ACCESSIBILITY

Named carousel region and slide groups; only the active slide is exposed to assistive technology. Inactive slides are inert, with no hidden focus targets. Native previous/next and neighboring-slide buttons retain focus after navigation. Arrow keys, Home and End work while focus is inside the carousel; Tab exits normally. Announcements are polite, and no automatic focus movement or autoplay occurs.

Reduced motion removes transitions. Horizontal touch gestures were tested through Chromium touch events; vertical gestures continue to scroll the page. Pointer capture, release, cancellation and suppression of the post-drag click are covered. Failed image requests produce a neutral, readable fallback without blocking navigation.

The full-page and focused axe scans found **zero violations in the tested WCAG A/AA rule sets**. This is automated evidence plus keyboard/touch checks, not a certification of every assistive-technology combination. The interaction structure follows the [W3C carousel pattern](https://www.w3.org/WAI/ARIA/apg/patterns/carousel/).

## PERFORMANCE

No dependencies were added. Server-side content selection feeds a focused client component. Only the active and two adjacent images are initially mounted; subsequently visited images remain mounted for stable back navigation. Next Image uses responsive `sizes`, explicit dimensions, quality 90 and lazy loading. No full-resolution eight-image preload is used.

Local optimized-build lab results, three samples per profile:

| Profile                                      | LCP samples           | Median  | Maximum observed CLS |
| -------------------------------------------- | --------------------- | ------- | -------------------- |
| Desktop 1440, localhost, unthrottled         | 472 / 468 / 404 ms    | 468 ms  | 0.000523             |
| Mobile 390, CPU ×4, 1.6 Mbps, 150 ms latency | 1032 / 1168 / 1108 ms | 1108 ms | 0.000149             |

Browser cache was disabled; local image-optimizer cache may be warm. These are page-load lab observations, not field CWV or a guarantee for final editorial assets/public hosting. The sampled interaction events belong to the existing capabilities controls; they do not establish field INP or carousel input latency. Carousel tests independently confirm stable section height through navigation.

Build inspection found nine initial script files, **194,065 bytes gzip combined**, including the framework and other interactions. The test preview HTML contains 13 initially rendered images and 16 valid internal destinations. Production fallback contains 17 images. Evidence: `current/performance-desktop.json`, `current/performance-mobile.json`.

## QA

| Command / check                                                                                                           | Result                                                                                                                        |
| ------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| `npm ls --depth=0`                                                                                                        | Exit 0; declared dependencies present. Two pre-existing optional WASM packages marked extraneous; dependency files unchanged. |
| `npm run lint`                                                                                                            | PASS, zero warnings.                                                                                                          |
| `npm run typecheck`                                                                                                       | PASS.                                                                                                                         |
| `npm test`                                                                                                                | **23/23 PASS**, including four new content/navigation tests.                                                                  |
| `npm run test:e2e -- --config=playwright.production.config.ts tests/visual.spec.ts` before changes                        | **8/8 PASS**, baseline captured.                                                                                              |
| `npm run test:e2e -- --config=playwright.production.config.ts`                                                            | **26/26 PASS**, 3.7 minutes, including production build.                                                                      |
| `npm run test:e2e -- --config=playwright.production.config.ts tests/showcase.spec.ts` after screenshot capture adjustment | **6/6 PASS**, 1.1 minutes.                                                                                                    |
| `CONTEXT=production npm run build`                                                                                        | PASS; actual generated HTML has the original gallery, no temporary carousel or preview copy.                                  |
| `npm run build`                                                                                                           | PASS; restored ordinary local preview configuration after test-mode builds.                                                   |
| `npm run test:build`                                                                                                      | PASS for preview and production-context output: images, branding, metadata, IDs and internal links.                           |
| `git diff --check`                                                                                                        | PASS.                                                                                                                         |

Six new browser tests cover caption/image mapping for all eight entries; neighbor, button and keyboard navigation; wraparound and rapid input; pointer cancellation; touch/native scrolling; reduced motion; resizing; failed-image fallback; and first/middle/last frames at all eight widths. No test was removed or disabled. Existing form tests intercept requests locally; this task sent no real enquiry.

Two earlier invocations exited before the test web server started, including the `npm run test:production` alias. The explicit equivalent `npm run test:e2e -- --config=playwright.production.config.ts` succeeded with the same configuration. No application workaround or disabled quality gate was used. Expected Node module-mocking/terminal-color warnings are tool output, not browser errors.

## VISUAL EVIDENCE

Baseline: `qa/screenshots/showcase/baseline/`. Current evidence: `qa/screenshots/showcase/current/` (138 PNGs, including full pages, individual sections, states and 24 first/middle/last carousel views). Generated evidence is local and ignored by Git.

Representative views:

- [1440 px, active leather preview](qa/screenshots/showcase/current/1440-showcase-middle.png)
- [390 px, mobile composition](qa/screenshots/showcase/current/390-showcase-middle.png)
- [768 px, last slide](qa/screenshots/showcase/current/768-showcase-last.png)
- [1920 px, first slide](qa/screenshots/showcase/current/1920-showcase-first.png)
- [1440 px full page](qa/screenshots/showcase/current/1440-full.png)

Visual review confirmed central dominance, restrained neighboring depth, readable captions and preserved product proportions. No new crop or background treatment was applied to originals. Full photographic art-direction approval remains pending the editorial masters.

Pixel comparison covered 64 matched section views: 31 are exactly identical, including **all 24 hero/watch/sneaker section views** across eight widths. Twenty additional explicit studio/sneaker state captures match exactly. Other downstream captures differ with fractional-page-position rounding (often one pixel) and capture clipping; the generic scrolling studio capture can catch different transition moments. Its explicit stage captures match, and the studio source/CSS is unchanged. Full-page height intentionally changes where the former gallery is replaced. Results are recorded in `regression.json` and `state-regression.json`.

Chromium clipped composited content outside the viewport in some tall element captures. The focused carousel capture now waits for transitions and expands only capture height, retaining the same width and vw-based composition. The final 24 detail captures show complete captions. Separate full-page tests retain the original device heights. No UI change was made to compensate for screenshot-tool artifacts.

## GIT STATUS

Branch: `feature/editorial-showcase-2026-10-11`.

Starting commit: `eb1a3968bff6d175f3f039ef4bf188980377dfe7`. The implementation is saved in the local commit named `feat: add editorial photography showcase carousel`; obtain its exact SHA with `git log -1 --format=%H`. Screenshots, build output and dependencies remain ignored. No secrets or environment files belong to this change.

Files added:

- `src/components/experiences/ProductShowcase.tsx`
- `src/components/experiences/ProductShowcase.module.css`
- `src/components/sections/CategoryGallery.tsx`
- `src/content/showcase.ts`
- `src/lib/showcase.ts`
- `tests/showcase.spec.ts`
- `tests/unit/showcase.test.ts`
- `public/media/showcase/README.md`
- `SHOWCASE_ASSETS.md`
- `SHOWCASE_IMPLEMENTATION.md`

Files updated: `Portfolio.tsx`, `tests/visual.spec.ts`, `tests/qa-paths.ts`, `scripts/verify-staging.mjs`, `README.md`, `ASSETS.md`. The staging script only recognizes either gallery shape; it was not executed against a remote host in this task.

## DEPLOYMENT

**No push, remote staging deployment, production deployment or DNS change.** The existing production website and the previous staging environment remain untouched by this task. The separate release-candidate checkout and legacy backup were not modified.

To review locally:

```bash
cd /home/roland/ofertastudio-next/studio
npm run dev
```

Open `http://localhost:3000/#perspektywy`. The optimized local alternative is `npm run build` followed by `npm start`.

Publication of the final photographic showcase requires the dedicated images, crop review and separately authorized release. Existing business/privacy approval requirements still apply.
