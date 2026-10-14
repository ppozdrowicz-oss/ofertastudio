# Release procedure — 2026-10-09

## Current authorization and state

Isolated staging is authorized and deployed. **Production is not authorized.** No GitHub push, main update, production-site modification or DNS change occurred. The current NO-GO reasons and evidence are in [PRODUCTION_READINESS.md](PRODUCTION_READINESS.md). The approved privacy notice is still missing; customer enquiries remain disabled in production mode.

## Existing production and rollback baseline

- Repository: `https://github.com/ppozdrowicz-oss/ofertastudio`.
- Remote `main` and `backup/ofertastudio-legacy-2026-10-08`: `616591f04a257f567359d02c50e631a3a9bca851`, fetched and verified during this task.
- Netlify production site: `tiny-paletas-35daca`, ID `85ea6f80-1b8c-401e-a120-06c3da0bfa06`, custom domain `ofertastudio.pl`.
- Repository and production branch confirmed through Netlify API: the repository above, `main`; allowed branches `["main"]`.
- Published legacy deploy: `6abab84676b6a700081aeca5`, commit `616591f…`.
- Existing dashboard base, command, publish and package-path values are unset; repository configuration applies. The new file config explicitly sets root `.`, `npm run build`, `.next`, Node 22 and `@netlify/plugin-nextjs`.

## Prepared migration

The original independent source repository remains at `/home/roland/ofertastudio-next/studio`, branch `release/readiness-2026-10-09`. Its source files were archived from Git, excluding `.git`, local environment, dependencies, caches, screenshots and test results.

A separate worktree of the original remote history is at `/home/roland/ofertastudio-next/release-candidate-20261009`, branch `staging/ofertastudio-rc-20261009`. Commit `65d2bb60d615d032182cf3c1e0932c5992e8205b` replaces the old application at repository root, with legacy `main` as its parent. `a90aebe` explicitly enables the Next.js adapter. Later documentation/test commits preserve this ancestry. The branch has no production upstream and has not been pushed. The clean legacy checkout `/home/roland/ofertastudio-next/release-20261008` is preserved.

There is no `studio/` wrapper in the migration: `src/`, `public/`, `package.json`, lockfile, `next.config.ts` and `netlify.toml` are at the root. Old homepage scripts, static `/ofertastudio/` files and root rewrites are absent. Neither force-push nor unrelated-history replacement is required.

## Isolated staging

- Site: `ofertastudio-staging-20261009`, ID `2d58020a-5de9-4e4c-a18b-110ce37029be`.
- No custom domain and no Git connection; it is a separate project, not a second production site.
- URL: <https://staging-ofertastudio-rc-20261009--ofertastudio-staging-20261009.netlify.app>.
- Build from a Git source archive using Netlify API `POST /api/v1/sites/{STAGING_ID}/builds?branch=staging-ofertastudio-rc-20261009`, `Content-Type: application/zip`.
- The API built the complete application in Netlify, including Next.js runtime 5.16.2; this was not an upload of a local static export.
- Site-only environment: `CONTACT_FORM_ENABLED=true`, `CONTACT_FORM_TEST_MODE=true`, `NEXT_PUBLIC_INDEXABLE=false`. Context is `branch-deploy`, with `NETLIFY=true` provided by hosting. No production environment was changed.
- Form detection was explicitly enabled with a separate site PATCH and verified after creation. Creation-time settings alone were not effective. Rebuild after enabling it.
- The successful deployment is `6ac90a5dad36738a289cabe0`. It serves the application and registers `product-enquiry`.
- Staging is publicly reachable but has `noindex`, disallowed robots and an empty sitemap. These are indexing controls, not access protection. Its UI permits only clearly identified synthetic test data.

## Final production release — only after approval

1. Complete P-01–P-05 in `PRIVACY_DRAFT.md`, present the entire completed Polish notice for user approval, implement it at `/prywatnosc`, then set the code approval flag. Supply the actual public contact address. Do not enable real enquiries with a provisional notice.
2. Decide how enquiries will be monitored: Netlify Forms (including Spam) and, if desired, a verified notification mailbox. The synthetic staging submission was stored in Spam; it does not prove inbox/email delivery. Test any chosen notification integration separately.
3. Synchronize the approved source into the migration worktree without copying secrets/build output. Commit reviewed changes. Run `npm ci`, `npm run check`, `npm run test:production`, `npm run test:build`, `npm run format:check` and `npm audit --omit=dev`. Revalidate staging if runtime, assets or deployment configuration changed.
4. Re-fetch and inspect the target refs:

   ```bash
   cd /home/roland/ofertastudio-next/release-candidate-20261009
   git fetch origin main backup/ofertastudio-legacy-2026-10-08
   git log -5 --oneline origin/main
   git diff --stat origin/main...HEAD
   git status --short
   git merge-base --is-ancestor origin/main HEAD
   ```

   If `main` changed, stop the fast-forward release path. Review the intervening work and merge `origin/main` into the candidate with an ordinary merge, resolve intentionally, and repeat validation. Do not overwrite user work, reset remote history or force-push. Verify the backup still names the original legacy commit.

5. After separate explicit final production authorization, confirm the existing production site identity and unchanged custom domain. Verify base/package path at repository root, production branch `main`, file build configuration and form detection. Set approved production-only environment: actual contact details, `NEXT_PUBLIC_SITE_URL=https://ofertastudio.pl`, `NEXT_PUBLIC_INDEXABLE=true`, `CONTACT_FORM_ENABLED=true`, `CONTACT_FORM_TEST_MODE=false`. Environment changes alone do not deploy; avoid rebuilding the legacy revision with new application expectations.
6. From the reviewed migration branch, publish an ordinary fast-forward update, only while step 4 still succeeds:

   ```bash
   git push origin HEAD:main
   ```

   Git will reject a non-fast-forward race. Fetch and reconcile rather than force. The legacy backup is never modified.

7. Follow the actual Netlify deploy through `ready`. Verify that the deployed commit matches the pushed SHA and that the existing domain serves the new hero, exact header/footer wordmarks, all imagery and Next assets, five perfume stages, separate sneaker frames, capability controls, legal route, indexing and enabled form. Check HTTPS, root status 200, no legacy redirect, console, mobile and a real authorized test receipt. A push or a green build alone is insufficient.

## Explicit rollback

If the new production release has a material defect, restore **the existing production site's** preserved deploy `6abab84676b6a700081aeca5` using Netlify's rollback/publish-deploy control. Keep the same site and domain; no DNS change is needed. Verify the legacy root and assets after rollback. Check any environment/notification changes against the saved pre-release settings before a future rebuild; publishing a prior deploy does not revert dashboard settings.

Then reconcile Git through an ordinary reviewed revert of the actual release commits (newest first; use the correct mainline for any merge commit). Build and inspect the result, then push that new revert commit to `main`. Do not reset `main` or force-push the backup branch. Netlify's next Git build must be consistent with the rollback, otherwise a later push could republish the faulty version. Preserve both the legacy backup branch and the failed deployment for diagnosis.
