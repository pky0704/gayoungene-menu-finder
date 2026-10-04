# Desktop Codex continuation

This is an existing implementation. Continue from it rather than creating a new app.

## Repository and branch

- Repository: https://github.com/pky0704/gayoungene-menu-finder
- Branch: `codex/official-site-build-20261004`
- App source: `official/`; legacy menu source: `dist/`.
- Read `AGENTS.md`, `docs/official-site/CURRENT.md`, and `official/README.md` first.
- Fetch the remote and inspect the working tree before switching or pulling. Preserve uncommitted work; use an isolated worktree if needed. Never reset or force-push to obtain this branch.

## Deployment baseline

- Review site: https://gayoungene-official.vercel.app/
- Vercel team: `gayoungene` (Pro).
- Official project ID: `prj_AUxnQFBeXUsOq4ypTuYNEwndTT1y`.
- This review site was uploaded manually. A Git push alone does not redeploy it.
- `/` is the official homepage; `/menu` reuses the real menu application; `/prepay` redirects to the existing prepay application.
- Preserve both legacy production projects and all QR destinations.
- `gayoungene.com` is not connected yet. Obtain the owner's review of the updated preview before connecting it. Use the actual project-specific Vercel DNS instructions for Namecheap.

## Next implementation

1. Read the separately supplied continuation package before editing the character section.
2. Add the two individual character illustrations to the existing multilingual introduction, following the current brand guide. Preserve image proportions and the original official logo.
3. Keep the existing story-led layout, #FF6600 accent, minimum 16px text, and reduced-motion support.
4. Run the existing verification scripts and visually inspect mobile layouts and character images.
5. Redeploy to the existing official project and verify the live URL. Do not report deployment from a local build or Git commit alone.

## Local commands

Requires Node.js 22 or newer. Run from the repository root:

```sh
npm ci
node official/build.mjs
npm test
node official/tests/invariants.mjs
npm ci --prefix official
```

To run the development server:

```sh
node official/serve.mjs
```

To run browser verification in another terminal after installing Chromium:

```sh
cd official
npx playwright install chromium
npm run test:browser
```

The browser suite runs its own server on port 4178. `CHROMIUM_EXECUTABLE_PATH` is optional; do not copy another machine's temporary browser path.

Use `official/vercel.json` for the official project configuration. The repository root also belongs to the existing menu project, so verify the target project and output directory before any deployment.
