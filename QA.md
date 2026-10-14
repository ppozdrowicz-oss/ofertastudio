# QA report — 2026-10-08

This is the historical implementation report. The current release candidate, staging evidence, test totals and release recommendation are in [PRODUCTION_READINESS.md](PRODUCTION_READINESS.md). [FINAL_VISUAL_AUDIT.md](FINAL_VISUAL_AUDIT.md) records the preceding visual refinement. Production publication has not been performed.

## Executed commands and outcomes

| Command                                          | Result                                                                                                                |
| ------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------- |
| `npm ci --fetch-retries=1 --fetch-timeout=30000` | Successful clean dependency installation. Subsequent TypeScript/formatter changes were installed and locked with npm. |
| `npm run lint`                                   | PASS; no ESLint errors or warnings.                                                                                   |
| `npm run typecheck`                              | PASS; route type generation + strict TypeScript 6.0.3.                                                                |
| `npm test`                                       | PASS; 16 logic/DOM tests.                                                                                             |
| `npm run test:e2e`                               | PASS; 15 Chromium tests, including eight viewport sizes.                                                              |
| `npm run build`                                  | PASS; homepage, privacy page, error page and metadata routes prerendered.                                             |
| `npm run test:build`                             | PASS; 17 image instances, 16 internal anchor destinations, one h1, unique IDs and valid metadata.                     |
| `npm audit --omit=dev`                           | PASS; zero production dependency vulnerabilities reported.                                                            |
| `npm audit --json`                               | Five high-severity development-tool dependency findings; see below.                                                   |

`npm run check` also passed as one continuous run of lint, TypeScript, unit/DOM tests and production build.

`npm run format:check` passes. After the final mobile product-framing adjustment, `npm run test:e2e -- --grep '(375|390|430)px'` passed all three narrow-viewport cases again.

## Browser evidence

Real Chromium screenshots were captured, opened and reviewed. Browser tests verify pointer comparison, keyboard arrow/Home/End control, touch dragging with normal vertical scrolling, modal keyboard focus, Escape and return focus, mobile anchor navigation, all five native-scroll stages, reduced motion, mobile stage selection and form states with mocked Netlify responses. No real enquiry was sent.

Axe scans of desktop and mobile returned no violations for `wcag2a`, `wcag2aa` and `wcag21aa`. This is an automated result, not a claim of complete accessibility certification. Actual browser page exceptions and hydration errors were absent in the checked views.

| Viewport    | Overflow / image loading | Visual review                                                         |
| ----------- | ------------------------ | --------------------------------------------------------------------- |
| 375 × 812   | PASS                     | Compact authored hero, full-width comparison, readable contact form   |
| 390 × 844   | PASS                     | Hero, watch, category shelf, studio, form and footer                  |
| 430 × 932   | PASS                     | Mobile spacing and image scale                                        |
| 768 × 1024  | PASS                     | Tablet bottle placement corrected to clear the headline               |
| 1024 × 900  | PASS                     | Product scale/position corrected; full navigation                     |
| 1280 × 900  | PASS                     | Wide composition, comparison framing, portfolio                       |
| 1440 × 1000 | PASS                     | Full page, individual sections, all five studio frames                |
| 1920 × 1080 | PASS                     | Scaled photography canvases and typography; no narrow centered column |

Screenshots are local review artifacts in `qa/screenshots/` and are intentionally excluded from Git. Representative files:

- `1440-hero.png`, `390-hero.png`, `768-hero.png`, `1024-hero.png`
- `1440-roznica.png`, `390-roznica.png`
- `1440-studio-stage-1.png` through `1440-studio-stage-5.png`
- `390-studio-stage-isolation.png`
- `390-watch-feature.png`, `1440-watch-feature.png`
- `390-product-shelf.png`, `1440-editorial-pair.png`
- `390-kontakt.png`, `1440-kontakt.png`

Full-page screenshots of a sticky experience can show its pinned element at the position corresponding to the capture scroll offset. Review the individual studio-stage screenshots to assess that experience correctly.

## Issues found and fixed

- The perfume cap crossed dark headline letters at tablet widths. Its scale and position now have dedicated tablet tuning.
- The comparison shoe initially occupied too little of the canvas. Both registered layers were enlarged together; the source background now matches the surrounding surface.
- Native dialog tabbing allowed focus to leave the document. Explicit first/last Tab handling now preserves focus inside the menu, and focus restoration does not undo anchor scrolling.
- The form browser test initially selected Next's route announcer as well as the form error. It now scopes the assertion to the labelled form; both failure and retry/success paths pass.
- Secondary mobile type was enlarged. Minor product-shelf scaling was reduced to preserve tool geometry at narrow widths.
- Preload reuse for perfume frames is explicit. All other sources remain lazy.
- Generated `next-env.d.ts` was removed from tracking in accordance with the installed Next.js documentation. `typecheck` generates route types for a fresh checkout.
- The bundler root is fixed to this independent app, preventing unrelated parent lockfiles from influencing root inference.

## Performance observations

The production HTML check reports 9 initial script files, approximately **187.5 KiB gzip** combined (191,972 bytes), and **46,582 bytes** of HTML. These are local built-file totals, not measured browser transfer or field Core Web Vitals. Current local SVG studies total approximately 68 KiB on disk. Their size is not representative of final photographic assets.

The app has no animation framework, icon package, client CMS, external analytics or remote font requests. Server-rendered sections reserve image space. AVIF/WebP optimization is configured for final raster assets. Fonts are self-hosted with Unicode subsets.

No Lighthouse score or production LCP/INP/CLS claim is made. Recheck Core Web Vitals on the authorized hosted preview using final photography and representative mobile network conditions.

## Audit limitation

The full audit reports an upstream stack-exhaustion issue in `braces <=3.0.3`, propagated through `micromatch`, `fast-glob`, `@next/eslint-plugin-next` and `eslint-config-next` (five reported packages). They are development dependencies. The application does not expose these lint glob parsers to visitors.

The audit's automatic suggestion downgrades `eslint-config-next` to 14.2.35, which does not match this Next 16 application. No forced downgrade or unreviewed override was applied. Recheck the upstream patch before enabling untrusted lint jobs. Advisory: [GHSA-vfj7-8cjw-p6xm](https://github.com/advisories/GHSA-vfj7-8cjw-p6xm).

ESLint 9 emits an end-of-support installation notice; it is retained for declared compatibility with the current preset's transitive plugins. Node emits an expected experimental module-mocking notice for the DOM test harness. Next dev may print an LCP/lazy-image hint when automated screenshots scroll to a below-fold image without a real user input; those images deliberately remain lazy. Production browser behavior is not changed to suppress development hints.

## Remaining release checks

- Resolved since this historical report: all 15 supplied photographs are integrated. Current geometry/fidelity limitations are recorded in `FINAL_VISUAL_AUDIT.md` and `ASSETS.md`.
- Supply the operating entity/contact details and finalize the privacy notice. The existing notice explicitly describes a preview.
- Register this form on a separately authorized Netlify preview and verify an actual submission and notification delivery. Mocked request tests cannot establish that.
- Review Safari/Firefox and physical iOS/Android devices; the current executed browser suite is Chromium.
- Enable indexing only after the authorized public launch. Deployment, DNS and the existing production site remain untouched.
