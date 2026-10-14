# OfertaStudio.pl — final release candidate audit

Audit date: 2026-10-13. Local source: `/home/roland/ofertastudio-next/studio`.
Baseline: `58b3e54449a5a402c91f3a81e63670393fe4b937` on `feature/complete-offer-collections-2026-10-11`.

## Executive summary

**Production remains NO-GO for operational reasons.** Both supplied photographic corrections are now visually accepted with the verification limits below. The user replaced Nike frame 08 again during this audit; its final version shows the box without a retail label, so the earlier size/SKU contradiction is no longer presented. Both obsolete asset warnings were removed. No design, carousel-engine or source-image edits were made.

This report supersedes the two asset-defect descriptions in `FINAL_CREATIVE_INTEGRATION.md`; the earlier report remains a historical record. Legal approval and hosting verification are separate gates, not inferred from image or local test results.

## New photographic assets

Both images fully decode as genuine, opaque RGB WebP, 2600 × 2600 (1:1), without an embedded ICC profile. An absent profile does not prove calibrated colour or a particular colour gamut. Neither file was resized, recompressed or edited during this audit.

| Asset                                                               |   Bytes | SHA-256                                                            |
| ------------------------------------------------------------------- | ------: | ------------------------------------------------------------------ |
| `public/media/offer-carousel/sneaker/08-packaging.webp`             | 635,380 | `9f879a842344fcd99d336f7cb0b0542b476191ec844639f38c432d9d17bfbffc` |
| `public/media/offer-carousel/power-tool/06-workshop-lifestyle.webp` | 937,434 | `513cd647bf235f5822d8f57262f5b7b8af03cadfd5a76d49cf9524fb755ea2f0` |

### Nike frame 08

The green/black/white pair visually matches the collection's panel construction, white Swoosh, laces, heel insert, black tread and visible Air unit. Both shoes and the red box are fully framed; no display crop, conspicuous border, duplicated shoe or gross geometric defect was found. Shadows and box perspective are coherent at presentation size. This is visual consistency, not authentication or confirmation of an exact shoe SKU.

The final user-supplied photograph shows an unlabelled side of the red Nike box. No size, style code, barcode or model-variant designation is visible, and no corresponding factual inconsistency remains in the current frame. Both shoes and the important packaging geometry are contained in the square canvas. The source was reviewed at native size and diagnostic 200% detail, without changing its pixels.

The first replacement inspected earlier in this session carried `831114-300` / VT QS on a box paired with a visibly different panel construction. That observation applied to the superseded file, not the final replacement. The current SHA above identifies the actual accepted version. The earlier size warning and subsequent SKU warning have both been removed from the current caption/lightbox. This is not a claim that a hidden box label, SKU or physical size has been authenticated. No exact SKU or size is asserted in the slide copy.

### Milwaukee frame 06

The current image depicts a compact red/black Milwaukee impact driver with a short bit holder, not a conventional three-jaw drill chuck. The battery, grip, housing, trigger area and branding are visually consistent with the other collection views; an exact tool model is not inferred.

The screw head is now toward the driver, its threaded shaft enters the timber and the visible bit/screw axes are substantially aligned. No reversed tip, gross gap or impossible floating fastener is visible. The timber rests on a work surface. The gloved holding hand is coherent; the supporting hand is visibly to the side of the fastening point. No conspicuous finger duplication or contact with the rotating bit was found.

The bit is marked T25. Its engagement obscures the screw recess, and the screw tip is inside the workpiece. Therefore exact recess/profile compatibility, engagement depth, hidden support and actual operational safety cannot be certified from this view. The corrected image is a plausible illustrative workshop scene, not a safety instruction or evidence of measured tool performance.

The old reverse-orientation warning and defective-image alt were removed. The new alt describes the visible relation between tool, head and timber. Expert text now explains context and approximate scale without claiming verified operating specifications. Source detail was inspected at 100% and 200%; diagnostic crops are separate evidence files.

## Three collections and expert content

- Nike Air Max 90: 8/8 paths; frame 04 remains an additional product perspective; frame 07 retains the foot-length-versus-box-CM distinction. Its 38 EU/foot-length pairs were checked in the preceding audit against the official Nike table; that image is byte-identical to the reviewed file. Exact SKU/size of the depicted pair is still unconfirmed.
- Valentino Donna Born in Roma Intense: 8/8; corrected frame 05 remains SHA-256 `da78d3c50038687e58cf1518ba2ca255cd9afa590f1ec30b451d19a93d3ed0da`. The actual raster shows Bourbon vanilla, jasmine, benzoin, floral-amber character, 100 ml and EDP Intense, with no obsolete rum text or warning. Product-information accuracy follows the [manufacturer reference](https://www.valentino-beauty.us/fragrances/fragrances-women/born-in-roma-donna-intense/born-in-roma-donna-eau-de-parfum-intense-MPL01906.html) rechecked on 2026-10-13; this file is unchanged.
- Milwaukee M18 FUEL: 8/8; complete kit, two constructions, chuck detail, impact detail, comparative view, workshop, batteries/charger and campaign frame remain correctly ordered. No torque, RPM, exact model number or performance claims were added.

All 24 slides retain individual titles/leads, “Dlaczego właśnie tak?”, buyer value and 3–4 workshop concepts. The only editorial changes concern the two replaced images. Demonstration disclosures remain visible and do not imply manufacturer commissions. No customer results or endorsements were added.

## Precision macro

`public/media/portfolio/watch/watch-detail.webp`: genuine RGBA WebP, 3000 × 3000, 1,177,626 bytes. SHA-256 remains `811abd36d130034c6f763fe26a5f8dd754b19d380a82c453c7e16786c8fb3e34`.

The macro retains genuine transparent corners and partially transparent product edges. The actual olive `#262c23` shows through; wrapper background is transparent. Browser delivery retains alpha. No blend modes, recolouring, synthetic glow or white card were introduced. The complete central dial, crown/pushers, red accents and bright steel remain visible on desktop/mobile. The original `watch.webp` reference and all other photographs are unchanged.

## Visual QA and responsive coverage

Widths: 375, 390, 430, 768, 1024, 1280, 1440 and 1920 px. The suite captures full homepages, hero, independent sneaker views, five-stage presentation, precision section, three collections, service summary, process, contact and footer. Dedicated replacement tests cover 390/1440 px, both corrected files, lightbox, detail zoom, source bytes and actual optimized-image content.

Evidence root: `qa/screenshots/release-candidate/` (ignored artifacts, not committed). Prior matched screenshots were copied into `baseline/` before source edits; new renders go to `current/`. Source inventories and detail crops remain at the evidence root.

A screenshot-harness race was found during comparison: at 1920 px the old capture loop sent ArrowRight before the asynchronously predecoded collection became active, producing a frame-01 screenshot named “premium”. The harness now waits for the selected collection and asserts the target slide ID before capture. This corrects evidence collection; it does not change the carousel or weaken a product assertion.

Final run: **266 PNG captures**, **256 matched baseline comparisons**, 90 pixel-identical. All eight hero views, all eight independent sneaker views and all 16 precision macro/dial captures are pixel-identical. Among 82 explicitly selected preserved-section captures, 62 are identical; the remaining 20 are process/contact/footer captures with fractional-pixel boundary/one-row shifts after the caption-height change. Their typography and composition were inspected, not assumed from a difference score. The other differences are predominantly the two replacement photographs (including adjacent frames), removal of obsolete review notes and the resulting reserved-caption/page heights. No CSS or unrelated component was changed.

Full-page/long element screenshots retain a previously documented Chromium capture artifact: the fixed, offscreen skip link can appear within the expanded capture. It is also present in the baseline and is not a newly introduced visible-page overlay. Keyboard focus outlines in interaction captures are intentional. No major visual regression, critical product crop, broken image or horizontal overflow was found.

The user supplied the final Nike replacement during the audit; the final complete suite and source/optimizer checks were repeated against its new hash. Detailed comparison results are in `regression.json` and `regression-summary.json`.

Representative evidence (all paths relative to the repository):

- `qa/screenshots/release-candidate/current/1440-release-nike-packaging.png` and `390-release-nike-packaging.png`.
- `qa/screenshots/release-candidate/current/1440-release-nike-packaging-lightbox.png` and `390-release-nike-packaging-lightbox.png`.
- `qa/screenshots/release-candidate/current/1440-release-milwaukee-workshop.png` and `390-release-milwaukee-workshop.png`, plus matching `-lightbox.png` files.
- `qa/screenshots/release-candidate/nike-packaging-final-100.png`, `nike-packaging-final-200.png`, `milwaukee-engagement-100.png`, `milwaukee-engagement-200.png`.
- `qa/screenshots/release-candidate/current/1440-precision-macro.png`, `390-precision-macro.png`, `1440-perfume-information.png`, `390-nike-macro-insights.png`.
- `qa/screenshots/release-candidate/current/1440-full.png`, `390-full.png`, `1440-privacy.png`, `390-privacy.png`.
- `qa/screenshots/release-candidate/all-widths-final-nike.jpg`, `all-widths-hero.jpg`, `all-widths-precision-macro.jpg` and `all-24-final.jpg`.

## Accessibility

The production suite checks automated axe WCAG A/AA tags (including 2.2), focus restoration, native dialog focus behavior, arrow/Home/End navigation, neighbor controls, collection reset, touch swipe and native vertical scroll, missing-image fallback and reduced motion. No autoplay or focus behavior was changed. The three-level descriptions remain visible in logical order; inactive panels remain inert and hidden from assistive technology. Manual screenshot inspection supplements automation. No physical iOS/Android or screen-reader-device certification is claimed.

## Performance

The existing image strategy remains: one carousel tree, active and neighboring images first, additional images when visited, predecode before collection change, full-resolution detail only on demand. No preload of all 24 images and no new runtime dependency. Original photographs retain their supplied bytes.

The new browser checks compare raw served hashes and actual optimized carousel/lightbox bytes against a fresh encoding of the current source using the installed Next encoder outside its HTTP/cache path. Corrected detail regions must also be pixel-identical to that fresh encoding. This checks source/cache identity, not photographic quality or merely URL strings.

After the user supplied the final same-path Nike replacement during the audit, six cached local AVIF variants (384/640/750/1080/1920/3840 px) were moved out of `.next/cache/images` into ignored QA evidence. Only generated cache entries for that one URL were invalidated; user images and all other cache entries were preserved. `cache-invalidation.json` records the keys. No arbitrary query suffix, new filename or production cache change was introduced.

Final lab results: desktop LCP 420/472/436 ms (median 436 ms), mobile 1516/1144/1196 ms (median 1196 ms). Maximum measured final CLS: desktop 0.000523, mobile 0.000146. Longest sampled interaction events per run: desktop 232/192/296 ms, mobile 136/176/192 ms. Some desktop samples exceed 200 ms, so this is not an assertion that the INP target is achieved. The normal build ships nine initial script files, 194,668 gzip bytes in total, and 96,532 bytes of HTML. Initial top-of-page loads requested zero carousel photographs in all measured runs; interaction tests verify only the active collection's three nearby frames are initially mounted/loaded. Measurements use localhost, Chromium, DPR 1, three runs each; mobile uses 390 px, 4× CPU throttling, 1.6 Mbps down/150 ms latency. Browser cache is disabled; optimizer cache may be warm. Sampled event duration is not field INP. No real-user Core Web Vitals claim is made.

## Automated tests

| Command                                                        | Result                                                    |
| -------------------------------------------------------------- | --------------------------------------------------------- |
| `npm run lint`                                                 | PASS, zero ESLint warnings                                |
| `npm run typecheck`                                            | PASS, Next route type generation + strict TypeScript      |
| `npm test`                                                     | PASS, 27/27 unit/DOM tests on the final source            |
| `npm run test:e2e -- --config=playwright.production.config.ts` | PASS, 38/38 in 8.7 minutes, zero retries/skips            |
| `npm run build`                                                | PASS, normal build restored after synthetic test build    |
| `npm run test:build`                                           | PASS, 1 h1, 12 initial image instances, 16 internal links |
| `npm run format:check`                                         | PASS after final report formatting                        |
| `npm audit --omit=dev --json`                                  | PASS, zero known production vulnerabilities               |
| `npm ls --depth=0`                                             | PASS, declared dependencies resolved                      |
| `git diff --check`                                             | PASS                                                      |

Remediation history: the first full run had 35 passing scenarios and two failures in the new raster comparator. It compared an AVIF response directly to an unencoded RGB thumbnail, so expected chroma differences were misclassified as stale imagery. Inspection of the installed Next 16.4 encoder showed that q=90 maps to AVIF q=56. The test now requires an exact SHA-256 match to an independent fresh encoding through that installed encoder, plus zero detail-region pixel difference. No tolerance was relaxed and no production quality setting changed. An intermediate test import required its `.js` ESM extension; that startup error was corrected. The focused three-scenario rerun passed before the final Nike replacement; the final full run below validates the final file instead.

`npm ls --depth=0` resolved the declared dependencies. Existing optional `@img/sharp-wasm32`/`@emnapi/runtime` packages appear as extraneous; they were not introduced or required by this change. `npm audit --omit=dev --json` returned zero known production vulnerabilities on the audit date. No install/lockfile changes were needed.

The `npm run test:production` alias initially failed to start its configured web server in this restricted command environment. The documented equivalent `npm run test:e2e -- --config=playwright.production.config.ts` successfully launched the production build/server. Do not count the failed startup as a passing test run.

## Business / privacy

`privacyNotice.approved` is still false. `/prywatnosc` explicitly describes a preview, not an approved production policy. Real controller identity/address, public privacy contact, retention, recipients/handling, applicable processor/transfer arrangements and completed-text approval remain unresolved in P-01–P-06 of `PRIVACY_DRAFT.md`. No fictional identity, email or legal approval was inserted.

The final ordinary build was inspected separately from the browser suite's synthetic form build: it renders the inactive-delivery preview notice and privacy text saying delivery is disabled. A diagnostic initially expected the submit button to be disabled; the existing design instead allows local validation and exits before fetch when `enabled` is false. The corrected check verifies the actual preview branch, and the passing DOM test verifies no request or false success. No form behavior was changed.

The application uses local fonts/media, no analytics, marketing pixels, embeds, reCAPTCHA or application cookies/storage. Contact fields are name/company, email, message and optional product URL; no file upload or automatic URL retrieval exists. Hosting can process request metadata/logs; retention is not guessed. These are code facts, not a legal compliance certification.

## Netlify Forms

The unchanged `product-enquiry` form has static discovery HTML at `/__forms.html`, matching fields, URL-encoded POST, honeypot and explicit failure handling. Local tests intercept submissions and do not prove provider receipt. Real enquiries remain disabled unless Netlify, enablement and approved privacy are all present. Test mode is restricted to non-production contexts and explicitly labelled synthetic input.

Historical verified receipt: `PRODUCTION_READINESS.md` records the 2026-10-09 real staging submission `6ac90acb66a45471a6736750`, API-confirmed in **Spam**, with no email notification proof. That evidence is preserved, not relabelled as a new test.

Read-only check on 2026-10-13: the [existing isolated staging](https://staging-ofertastudio-rc-20261009--ofertastudio-staging-20261009.netlify.app/) returns HTTPS 200 without redirect and remains noindex. It lacks the current complete-offer section and is an older candidate. This session sent no form submission, changed no external configuration and deployed nothing. Fresh candidate deployment/receipt testing and a defined Forms/Spam monitoring procedure remain release dependencies.

## Git and configuration

At entry, only the two user-supplied WebP replacements were modified. Inventory of 40 tracked photographs confirms exactly those two changes; the other 22 offer images, 15 original images and precision macro are unchanged. Audit-time hashes are in `source-assets.json`.

Read-only GitHub API verification on the audit date: `main` and `backup/ofertastudio-legacy-2026-10-08` both remain `616591f04a257f567359d02c50e631a3a9bca851`. Direct `git ls-remote` failed DNS for HTTPS and SSH; the public GitHub refs API succeeded. Neither branch was modified.

`netlify.toml` uses root `.`, `npm run build`, `.next`, Node 22 and explicit `@netlify/plugin-nextjs`. No legacy `/ofertastudio/index.html` redirect, old generator, nested `/studio` app root or client-route replacement is present. Next serves `/` directly. Current production Netlify account settings were not revalidated in this local-only pass; the historical account evidence in `RELEASE.md` is dated 2026-10-09. Existing source repository is independent from remote main; its HEAD must not be force-pushed onto the legacy history.

Release commit: the local commit containing this report, with subject `fix: finalize product imagery and release candidate QA`, parent `58b3e54449a5a402c91f3a81e63670393fe4b937`. Its exact SHA is obtained with `git log -1 --format=%H` and reported in the final handoff; a Git object cannot embed its own SHA. Branch remains `feature/complete-offer-collections-2026-10-11`.

Scoped files: the two approved replacement WebPs; `src/content/showcase.ts`; `tests/unit/showcase.test.ts`; `tests/creative-integration.spec.ts`; `tests/qa-paths.ts`; new `tests/release-assets.spec.ts` and `tests/release-privacy.spec.ts`; this report. No unrelated pre-existing changes were found. Final working-tree verification follows the commit. The commit contains only the two supplied assets, focused warning/copy corrections, regression/capture tests and this audit. No CSS, component engine, dependencies, secrets, build output or screenshots are intended for the commit.

## Release readiness

| Gate                     | Verdict                 | Reason                                                                                                                                                                 |
| ------------------------ | ----------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| A — photographic quality | **PASS (visual scope)** | Final Nike 08 contains no conflicting visible label; Milwaukee reversal is visually resolved. Exact hidden SKU/size and screw-interface limitations remain documented. |
| B — engineering          | **PASS**                | 27 unit/DOM and 38 browser tests pass; normal production build and visual/a11y checks pass.                                                                            |
| C — production           | **NO-GO**               | Unapproved business/privacy information, no staging verification of this current candidate, final release authorization absent.                                        |

The local candidate may be reviewed and prepared for a separately authorized isolated staging release. It is not an approved commercial production release.

## Deployment procedure — recommendations only

1. Preserve the reviewed final image hashes. Complete P-01–P-06, obtain approval of the entire notice, implement verified contact details and define enquiry/Spam monitoring. Keep live enquiries disabled until then.
2. Obtain separate staging authorization. Prepare a **fresh clone of the target repository** on a dedicated release branch based on current `origin/main`. Verify the legacy backup SHA above. Export the approved source commit using `git archive`, replacing tracked legacy app files in that clone while preserving its `.git` history. Do not copy local `.git`, env, dependencies, caches or QA artifacts. The exported app files go at repository root, never inside `studio/`. Inspect the complete diff and commit normally. The earlier migration worktree described in `RELEASE.md` predates the carousel and must not be deployed without synchronization.
3. In that migration clone run `npm ci`, `npm run lint`, `npm run typecheck`, `npm test`, `npm run test:e2e -- --config=playwright.production.config.ts`, `npm run build`, `npm run test:build`, `npm run format:check` and `npm audit --omit=dev`. Use the isolated staging site/workflow in `RELEASE.md`, no production alias. Preserve noindex and synthetic-only form mode. Use a clean optimizer cache for replaced same-path photographs; verify actual source/optimized bytes and detail views after deployment.
4. Verify staging HTTPS/root/Next assets, all 24 images, corrected details, lightbox, mobile, privacy and a clearly labelled synthetic form submission with independent API/dashboard receipt. Distinguish Spam and email delivery. Capture the deployed commit/build identifiers.
5. Obtain explicit final production authorization. Refresh `origin/main` and backup; require `git merge-base --is-ancestor origin/main HEAD` in the migration branch. If main changed, review and merge normally, then retest. Reverify the existing Netlify site's repository, main branch, root base/package path, Next adapter, domain, form detection and approved environment. Record its then-current published deploy and settings for rollback.
6. Only from that history-preserving migration branch, after approval, use ordinary `git push origin HEAD:main`. Never force-push this independent source repository. Monitor the real Netlify build and verify `https://ofertastudio.pl/` serves the new approved commit without legacy redirects, with working assets, legal information and confirmed enquiry handling. DNS changes are not expected.

## Rollback procedure

Before future release, record the current production deploy ID and main SHA again; the historical legacy deploy is `6abab84676b6a700081aeca5`, documented in `RELEASE.md`, not revalidated through the Netlify account during this session. On a failed future release, restore the saved working deploy **in the existing production Netlify site** and verify the domain. Preserve the same domain/DNS. Dashboard/env changes require separate restoration from the recorded settings; republishing a deploy does not undo them.

Then use reviewed ordinary Git revert commits for the actual release commits in the migration repository, validate and push normally after authorization. Do not reset main, force-push, delete or overwrite the legacy backup. Preserve failed-release logs for diagnosis.

## Remaining issues

1. Business/controller details and completed privacy notice approval: P-01–P-06.
2. New candidate must be deployed to isolated staging after authorization; verify receipt and establish enquiry/Spam monitoring. Historical receipt is not current-release verification.
3. Final production authorization and contemporaneous production-site/rollback-setting verification are still required.

Milwaukee's hidden screw recess and exact photographed product SKUs remain verification limits, not invented mechanical failures. No unauthorized production, staging, GitHub or DNS write occurred.
