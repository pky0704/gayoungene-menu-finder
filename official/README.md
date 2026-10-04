# Gayoungene official website

Brand-story homepage and multilingual menu using the existing menu project's actual code and data.

## Routes and existing services

| Route | Behavior |
|---|---|
| `/` | Brand-story homepage; Korean + 8 languages |
| `/menu` | Reuses `dist/` menu; adds Korean, Thai and Russian; retains French |
| `/prepay` | 307 redirect to the existing Korean application at `https://gayoungene-prepay.vercel.app/` |

The legacy menu and prepay Vercel projects are unchanged. Menu IDs and query parameters such as `?menu=M006` continue to work. Prepay is **not** reverse-proxied: its server checks `Origin === ALLOWED_ORIGIN`, so a naive proxy would break real submissions or weaken the origin check. The official homepage explains that it opens the existing Korean application.

## Local build

From repository root:

```sh
npm ci
node official/build.mjs
node official/serve.mjs
```

Open `http://localhost:4173/`. Run `npm test` for the unchanged menu regression suite. See `docs/official-site/CURRENT.md` for actual verification and outstanding deployment access.

## Website-only images

These images are authorized for the website and are excluded from public Git. They are copied from `official/private-assets/` when present. Identifiable owner photos have no separate public-repository approval. The illustrated poster was also blocked by automatic approval review for public GitHub upload, even after visual inspection confirmed it contains only the brand character and food illustrations:

- `mallang-poster.jpg`: original illustrated brand poster. Keep this deployment-only until public GitHub upload is explicitly approved.
- `mother-daughter.jpg`: owner-supplied portrait.
- `guests-privacy-edited.png`: AI privacy edit of the exact customer photograph selected by the owner; guest faces blurred. Caption discloses editing. No raw customer image is packaged.
- `learning-wall.jpg`: owner-supplied training certificates displayed in the shop.

If the poster is missing, the hero uses the original public logo and the character section uses text only. If another image is missing, its section uses text only; there are no broken image placeholders. To deploy all photos, use the reviewed local workspace with these files present. **A Git-only rebuild does not include these images.** Keep this limitation visible until a private deployment asset source is authorized/configured.

Rejected generated welcome scenes are not included. Original logo and menu photographs are copied without modification. The source poster is supplied by the owner and not redrawn.

## Vercel deployment

Create a separate `gayoungene-official` project **in the existing `gayoungene` team**, avoiding changes to the production settings of the menu/prepay projects. Use repository root as working directory and `official/vercel.json` as the local configuration.

```sh
vercel link --project gayoungene-official --scope gayoungene
vercel pull --yes --environment=preview --scope gayoungene
vercel build --local-config official/vercel.json
vercel deploy --prebuilt --local-config official/vercel.json
```

Build locally with the reviewed website-only assets present; inspect `.vercel/output/static/assets` before the prebuilt upload. See official guidance: https://vercel.com/docs/cli/build and https://vercel.com/docs/cli/deploy. These deployment commands still require restored team access and have not been run.

Inspect `.vercel/project.json` to confirm the new project ID and team `team_4BTbOKiXhgVCMsiqwy5vHQgJ` before deploying. Never reuse the existing menu/prepay project IDs for this build. Use the returned preview URL; do not assume the name-derived URL exists.

Do not promote to production until preview checks are complete and the owner has reviewed the site. Then promote the reviewed deployment and add `gayoungene.com` (and optionally `www.gayoungene.com` redirect) in that same project. Read the actual Vercel domain configuration and verification challenges before giving Namecheap A/CNAME/TXT instructions. No DNS IP/target is hardcoded here.

## Content status

Home, guide UI and menu translations have no missing keys; native-speaker review remains pending. Original poster text remains Korean and is accompanied by translated HTML explanations. A verified foreign-guest review quote and original rabbit artwork are still needed. Do not fabricate either. Current home links to Google reviews instead of inventing testimonial cards. The Google gift-for-review poster is not published; Google prohibits incentivized reviews. Naver event text is based on the supplied notice, asks staff to confirm availability, and does not invent an end date or extra benefit.

## Browser verification

```sh
npm ci --prefix official
npx --prefix official playwright install chromium
npm run test --prefix official
npm run test:browser --prefix official
```

The browser suite starts and stops its own local server. `CHROMIUM_EXECUTABLE_PATH` optionally selects an installed Chromium binary. It checks 72 home/menu language and width combinations plus language persistence, recommendation/staff flows, unknown-ingredient notices, assets and prepay redirect. Screenshots and machine-readable output are written to ignored `official/qa/`.
