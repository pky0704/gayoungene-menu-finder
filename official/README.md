# Gayoungene official website

Brand-story homepage using the existing menu project’s real data and functionality.

## Current deployment

Review URL: https://gayoungene-official.vercel.app/

- Vercel project: gayoungene-official, in the existing gayoungene team.
- Project ID: prj_AUxnQFBeXUsOq4ypTuYNEwndTT1y
- Ready deployment: dpl_AMXqWxPPXfZPpHZnRJrNH3XpFjUj
- Created using dashboard Drop to Deploy. This is a manual static upload, not Git auto-deployment.
- Custom domain remains unconnected pending owner review.

## Routes

| Route | Behavior |
|---|---|
| / | Story-led home, Korean plus eight languages |
| /menu | Reuses existing dist menu, adding Korean, Thai and Russian; French retained |
| /prepay | 307 redirect to the existing Korean prepay application |

Existing production projects, menu IDs, recommendation data and QR URLs remain unchanged. The prepay service validates its allowed Origin, so it is linked directly rather than reverse-proxied.

## Build and verify

From repository root:

```sh
npm ci
node official/build.mjs
node official/serve.mjs
npm test
node official/tests/invariants.mjs
npm ci --prefix official
npx --prefix official playwright install chromium
npm run test:browser --prefix official
```

The browser suite starts its own server. CHROMIUM_EXECUTABLE_PATH optionally selects an installed browser. It covers 72 language/width combinations and key interactions.

2026-10-04 desktop continuation

The approved private assets live in official/private-assets, which is ignored by Git. Restore mother-daughter.jpg, mallang-poster.jpg, learning-wall.jpg, mallang-gayoung.png rabbit-companion.png and cursor-image.png there before building. The handoff archive's assets/ prefix is packaging, not an additional repository directory. No original or generated private asset, reference guide, screenshot or upload bundle should be committed.

Set REQUIRE_PRIVATE_ASSETS=1 when running invariants and browser tests for deployment to require all six files. The browser checks also cover character descriptions, complete image loading, contain sizing, reduced motion, French menu preservation and staff screens. OFFICIAL_BASE_URL can target an already deployed site. VERIFY_EXTERNAL=1 additionally opens the remote prepay application when the test browser has external network access; otherwise verify the 307 locally and the destination in the app browser.

After building and checking, node official/package-static.mjs creates a new ignored tmp/official-deploy-* directory containing the complete static bundle with the official redirects and security headers. Upload only that directory or its contents as a ZIP to the existing official project. The packaging command does not deploy. Vercel authentication and live verification are required before reporting an update.

For static dashboard upload, package the reviewed contents of official/build with the redirects, rewrites and headers from official/vercel.json. Static upload settings use buildCommand: null, installCommand: null and outputDirectory: ".". The current deployed bundle contains 88 files.

For future CLI deployment, confirm the linked project and team before using official/vercel.json. Do not reuse the menu or prepay project IDs. Follow https://vercel.com/docs/cli/build and https://vercel.com/docs/cli/deploy for prebuilt deployment.

See docs/official-site/CURRENT.md for verified status. Deployment success does not imply native-speaker review or final content approval.


2026-10-05 unified site

Home and menu share navigation and footer. Visit details and five ordering guides are on the home page. Prepay opens externally from secondary links. Franchise copy is no longer displayed. User-confirmed SNS links are managed in src/social-links.js.

The build prerenders 9 home and 10 menu locales. src/site-config.js controls the verified deployment origin used for canonical URLs, schemas and sitemap; update it when the custom domain is connected. Run npm --prefix official test for the asset/data invariants and static-page checks. The browser CLI script has updated selectors, but this session's actual visual verification used the Codex in-app browser. See docs/official-site/UNIFIED-BRAND-20261005.md for evidence and limitations.

Local-only game-preview-link.js, if present, and the obsolete qa-content.js are excluded from public build output. Their source files remain intact. Approved private assets must be present before a production deployment. Vercel scope access remains blocked by a 403 response; no redeployment is claimed.
