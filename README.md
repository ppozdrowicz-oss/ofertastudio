# OfertaStudio — independent greenfield application

Polish product-presentation website built from an empty directory. No source, CSS, components, imagery or page architecture was copied from the existing OfertaStudio project. The independent source repository lives in `studio/`; migration targets the root of the existing `ppozdrowicz-oss/ofertastudio` repository while preserving its Git history.

The original 15 photographs remain preserved; the precision section now uses an additional approved transparent macro. The final local refinement preserves the approved design. The sneaker uses explicitly independent presentation frames. Legal facts and approval remain required. Current staging results and the GO/NO-GO decision are in [PRODUCTION_READINESS.md](PRODUCTION_READINESS.md); the earlier visual audit remains historical evidence.

## Stack

- Next.js 16.4 App Router, React 19.3, strict TypeScript 6.0.
- Custom CSS and local Fontsource variable fonts: Bricolage Grotesque and Manrope.
- Server components for page assembly and static sections; client islands for navigation, studio stages, the offer showcase and contact. The separate sneaker figures are server-rendered.
- Node test runner + Testing Library/JSDOM, Playwright + axe-core.
- Node.js 22 / npm 10. Dependencies are pinned and `package-lock.json` is committed.

ESLint 9.39.5 is pinned because the current Next lint preset's React/import/accessibility plugins still declare ESLint 9 compatibility. TypeScript uses the compiler API through `experimental.useTypeScriptCli: false`; the detached CLI path failed in the restricted build container. Type checking remains enabled in both `typecheck` and `build`.

## Install and run

```bash
cd /home/roland/ofertastudio-next/studio
npm ci
npm run dev
```

Open `http://localhost:3000`. Production preview:

```bash
npm run build
npm start
```

The repository lives in `studio/` because the workspace root's `.git` was mounted read-only. This directory has its own normal Git repository.

## Commands

| Command                           | Purpose                                                                                               |
| --------------------------------- | ----------------------------------------------------------------------------------------------------- |
| `npm run lint`                    | ESLint, zero warnings allowed                                                                         |
| `npm run typecheck`               | Strict TypeScript validation                                                                          |
| `npm test`                        | Logic and DOM interaction tests; no network submission                                                |
| `npm run build`                   | Production build and static prerendering                                                              |
| `npm run test:build`              | Inspect the actual production HTML, local images, metadata and internal destinations; run after build |
| `npm run test:e2e`                | Browser interactions, axe scan, responsive checks and screenshots                                     |
| `npm run test:visual`             | Eight viewport sizes, section/hero/full-page screenshots                                              |
| `npm run test:production`         | Build + local production server on 3101; full browser suite and three lab samples per device profile  |
| `npm run check`                   | Lint, TypeScript, DOM tests and production build                                                      |
| `npm audit --omit=dev`            | Audit production dependencies                                                                         |
| `node scripts/create-studies.mjs` | Recreate original neutral SVG maquettes                                                               |

If Chromium is unavailable, run `npx playwright install chromium`. To use an existing installation set `PLAYWRIGHT_CHROMIUM_EXECUTABLE` to its executable. `E2E_BASE_URL` can point browser tests at an existing local preview. The default test configuration starts its own server on port 3100 and enables the form for mocked requests only. Do not run the success-path browser test against a server with the form disabled.

The Node test runner uses module mocking for `next/image`, and a single process so test diagnostics remain visible in constrained environments. Its experimental-module-mocking notice is expected. Real Next Image rendering is covered by the browser tests.

Current screenshots and measurements are written to `qa/screenshots/creative-integration/current/`; the preserved baseline is in `qa/screenshots/creative-integration/baseline/`. Earlier third-collection evidence remains under `qa/screenshots/offer-carousel/collection-03/`. Earlier carousel evidence remains under `qa/screenshots/showcase/`. Previous release evidence remains under `qa/screenshots/production-readiness/`. All screenshot directories are ignored by Git. `npm run test:e2e -- --config=playwright.production.config.ts` is equivalent to `test:production`. Do not run development and production builds concurrently in the same checkout. The production test build temporarily enables the form only for intercepted local requests; run `npm run build` afterwards to restore the normal preview configuration.

Optional read-only photography diagnostics: `python3 scripts/audit-photography.py`. This requires Pillow, NumPy, OpenCV and scikit-image in the audit environment; they are not application dependencies. It outputs registration estimates and diagnostic crops under `qa/` without modifying original photographs.

## Structure

```text
src/app/                         Routes, metadata, global design tokens/CSS
src/components/layout/           Header, native menu dialog, wordmark, footer
src/components/sections/         Hero, editorial portfolio, process, contact section
src/components/experiences/      Comparison, native-scroll studio, ProductShowcase, OfferInsights
src/components/forms/            Netlify form and visible states
src/components/ProductImage.tsx  Central image rendering boundary
src/content/site.ts              Navigation, services, process, copy, configuration
src/content/media.ts             Original media IDs, dimensions, alt text, final destinations
src/content/showcase.ts          Three complete offers, eight images and individual expert explanations each
src/lib/contact.ts               Form contract and validation
public/media/studies/             Archived vector studies (not rendered)
public/media/hero/                Five supplied perfume frames
public/media/before-after/        Supplied sneaker pair
public/media/portfolio/           Supplied category photographs
public/media/offer-carousel/      Twenty-four supplied complete-offer images
public/media/showcase/            Archived previous asset specification
public/__forms.html              Netlify's static discovery form
scripts/                         Study generation and built-output checks
tests/unit/                     Logic and DOM tests
tests/*.spec.ts                 Browser and visual checks
qa/screenshots/                  Local QA output (ignored by Git)
```

## Media and design

The 15 original media entries plus the isolated `watchPrecision` reference live in `src/content/media.ts`; the homepage does not hardcode the portfolio sequence. When replacing a file in [ASSETS.md](ASSETS.md), update its dimensions and Polish alt text together. `finalPath` documents its destination. Studio frames and any future authentic before/after pair must remain pixel-aligned. The current sneaker assets have structural differences and are labelled as independent studies. The existing perfume source has a measured nondestructive `registration` transform; remove/recalculate it when replacing that source with an already registered master. It does not correct local geometry differences.

Images use `next/image`, explicit dimensions, responsive `sizes` and reserved canvases. The hero is preloaded; copies of that same source reuse its request. Other below-fold sources remain lazy. Final raster assets use AVIF/WebP delivery.

`globals.css` defines the tokens and grouped styles for each experience. Major breakpoints are 767, 899 and 1023 px; 1100 and 1700 px tune art direction. The sneaker section presents two independent, fully visible photographs side by side on desktop/tablet and vertically on mobile; it makes no claim of registered retouching. The studio is sticky only on large screens without reduced-motion preference. On smaller screens and with reduced motion, explicit stage buttons control a static composition.

## Complete-offer showcase

`ProductShowcase` presents three collections (Nike Air Max 90, Valentino Donna Born in Roma Intense and Milwaukee M18 FUEL), eight images each, using the existing depth carousel. `src/content/showcase.ts` owns collections, exact image dimensions, captions, commercial purposes, expert reasoning, buyer value, workshop terms and review notes. The previous heterogeneous preview gallery and its production fallback have been replaced in this section. The full-size capabilities accordion is replaced by a concise server-rendered `ServiceSummary` at the existing `#mozliwosci` destination. `#oferta` still identifies the quotation scope. The precision feature uses `watchPrecision`; the original `watch` reference is unchanged.

All twenty-four originals are supplied under `public/media/offer-carousel/{sneaker,perfume,power-tool}/`. They are opaque RGB WebP, 2600 × 2600 px, and are always contained without cropping. The corrected perfume information graphic is a user-supplied replacement reviewed against the manufacturer’s description. It was adopted unchanged; no source photograph was re-encoded in this pass. The older `public/media/showcase/` specification is archived context, not a current dependency.

The always-visible expert panel follows the photograph and existing caption. Desktop uses two text columns and a workshop line; mobile stacks them in reading order. CSS grid reserves the largest panel’s height across the 24 entries. Inactive content is hidden from assistive technology and inert; no image trees are duplicated.

Collection changes prepare/decode the next first photograph and both neighboring frames before replacing the visible offer, reset navigation to 01 and retain control focus. Only the active collection's first/previous/next images are initially mounted. Other photographs mount on navigation; the other collections are not preloaded. Arrow/Home/End keys operate the gallery, and touch swipes leave vertical scrolling native. Reduced motion disables transitions. A native dialog provides the complete image and a scrollable detail enlargement for informational graphics on mobile.

The corrected perfume information graphic was checked against the manufacturer and its old warning removed. Milwaukee workshop image 06 has a visible note about the screw orientation; the supplied photograph is preserved pending a corrected asset. Nike image 08 also flags inconsistent box sizing labels. Its separate size-guide graphic matches the general men’s Nike chart; foot length is explicitly distinguished from the box CM marking. No technical performance specifications, physical dimensions or client relationships are inferred in surrounding copy. See [FINAL_CREATIVE_INTEGRATION.md](FINAL_CREATIVE_INTEGRATION.md) for the current integration and [OFFER_CAROUSEL_IMPLEMENTATION.md](OFFER_CAROUSEL_IMPLEMENTATION.md) for previous results.

```bash
node --import tsx scripts/audit-offer-assets.mjs
npm run test:e2e -- --config=playwright.production.config.ts tests/showcase.spec.ts
```

The audit only reads originals and writes metadata/hashes to ignored `qa/` output. Full page and offer evidence is saved in `qa/screenshots/creative-integration/current/`; the pre-change baseline is in `qa/screenshots/creative-integration/baseline/`. The full production browser suite also validates existing page sections. No separate animation dependency is needed.

## Environment

Copy `.env.example` to `.env.local` only when needed. Never commit `.env.local`.

| Variable                    | Default                   | Purpose                                                                                                  |
| --------------------------- | ------------------------- | -------------------------------------------------------------------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL`      | `https://ofertastudio.pl` | Canonical address; no trailing slash                                                                     |
| `NEXT_PUBLIC_CONTACT_EMAIL` | empty                     | Verified public contact address; omitted when not supplied                                               |
| `NEXT_PUBLIC_INDEXABLE`     | `false`                   | Preview noindex, disallowed robots and empty sitemap until launch                                        |
| `CONTACT_FORM_ENABLED`      | `false`                   | Explicitly enable enquiries after Netlify detection and legal content are ready                          |
| `CONTACT_FORM_TEST_MODE`    | `false`                   | Only synthetic staging enquiries outside the production context; never a substitute for privacy approval |
| `NETLIFY`                   | absent locally            | Automatically set by Netlify; form requires both this and the enable flag                                |

Public variables and the form mode are evaluated during build. Rebuild after changing them. Customer enquiries additionally require `privacyNotice.approved=true` in `src/content/privacy.ts`, after the completed notice is approved and implemented. The current value is false. [FINAL_PRIVACY_AND_STAGING_READINESS.md](FINAL_PRIVACY_AND_STAGING_READINESS.md) records confirmed facts, pending operational decisions and the controlled staging procedure; an environment variable cannot approve legal content.

## Netlify deployment preparation

`netlify.toml` defines repository-root base `.`, `npm run build`, `.next`, Node 22 and explicit `@netlify/plugin-nextjs` integration. The explicit adapter is necessary for the tested source-archive build path; publishing raw `.next` output produces a 404 homepage. This is **not** a static export. No legacy `/ofertastudio/index.html` rewrite remains.

The isolated staging site is `ofertastudio-staging-20261009` (ID `2d58020a-5de9-4e4c-a18b-110ce37029be`). It has no custom domain or Git connection. The existing production site remains unchanged. See [RELEASE.md](RELEASE.md) for migration and rollback instructions. Do not push `main` or deploy production until the final legal and release approvals are supplied.

The staging branch URL is:
`https://staging-ofertastudio-rc-20261009--ofertastudio-staging-20261009.netlify.app`.

To run the separate real-submission test, create ignored `.env.staging.local`:

```dotenv
STAGING_URL=https://staging-ofertastudio-rc-20261009--ofertastudio-staging-20261009.netlify.app
RUN_STAGING_FORM_TEST=1
```

```bash
npm run test:e2e -- --config=playwright.staging.config.ts
```

This test intentionally sends one clearly marked synthetic enquiry. It refuses other hostnames, does not run in the default suite and does not contact the production domain. Read its saved result before rerunning after a failure to avoid duplicate submissions. Netlify receipt still needs independent API/dashboard verification; HTTP success alone is insufficient. The standalone equivalent is `node scripts/verify-staging.mjs` with the same environment variables. Do not run suites concurrently against the same output/build folders.

Form detection must be enabled and confirmed on the target site, followed by a rebuild. Confirm the `product-enquiry` schema in the Forms dashboard/API. A real production enquiry additionally requires approved privacy content, `CONTACT_FORM_ENABLED=true`, `CONTACT_FORM_TEST_MODE=false` and the actual verified contact details. Keep indexing false on previews.

## Form contract

The visible form posts URL-encoded `form-name`, `name`, `email`, `message`, `productLink` and honeypot `website` to `/__forms.html`, as required for Netlify's Next.js integration. The static form and client field names must match. There is no file upload; an optional product/image URL provides a reliable first-contact path without new file infrastructure.

Validation focuses the first invalid field and links errors to labels. During submission the button is disabled. Failures retain the message. A success state appears only after a successful response; the static-definition marker detects an unhandled HTTP 200 fallback. Disabled mode never sends the request and explicitly reports that delivery is inactive. The separate test mode accepts only `TEST TECHNICZNY…`, `test@example.com`, `[TEST OFERTASTUDIO]…` and an optional `https://example.com/product` URL. This is a UI guard, not endpoint access control; staging should not receive customer data.

Official integration reference: [Netlify form setup](https://docs.netlify.com/manage/forms/setup/).

## Launch limitations

The `/prywatnosc` route contains a fourteen-section Polish draft identifying Piotr Pozdrowicz (natural person) and pozdrowicz@gmail.com, with a matching notice before form submission. The complete policy and retention procedure still require owner approval; `privacyNotice.approved` remains false. Current provider checks, browser storage evidence and authorized-next-step instructions are in `FINAL_PRIVACY_AND_STAGING_READINESS.md`. No external analytics, consent checkbox or cookie banner is installed. Do not run the real staging submission script without fresh authorization; local Playwright tests intercept form requests.
