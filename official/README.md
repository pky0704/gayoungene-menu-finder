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

For static dashboard upload, package the reviewed contents of official/build with the redirects, rewrites and headers from official/vercel.json. Static upload settings use buildCommand: null, installCommand: null and outputDirectory: ".". The current deployed bundle contains 88 files.

For future CLI deployment, confirm the linked project and team before using official/vercel.json. Do not reuse the menu or prepay project IDs. Follow https://vercel.com/docs/cli/build and https://vercel.com/docs/cli/deploy for prebuilt deployment.

See docs/official-site/CURRENT.md for verified status. Deployment success does not imply native-speaker review or final content approval.
