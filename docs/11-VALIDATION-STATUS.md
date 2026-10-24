# 11 — Validation performed when this starter was generated

**Date:** 2026-10-24. The working environment used to assemble this artifact had Node.js 22.16.0 and npm 10.9.2, but **could not reach the npm package registry**. This file records what has actually been checked, rather than claiming a completed browser test.

## Executed successfully

- TypeScript/TSX syntax transpilation check for 28 relevant `.ts` and `.tsx` source/config files using a local TypeScript compiler: **0 parse/emit syntax errors**. A `.d.ts` declaration file was intentionally skipped from transpilation.
- All relative TypeScript/TSX import paths checked against existing files: **no missing relative import targets**.
- Canonical data and scoring functions transpiled to executable CommonJS in a temporary verification folder and called successfully. **8 clubs, 10 matches, 8 standing rows, 6 Arsenal Journey matches**. Canonical match/team IDs all exist; no duplicate match IDs; completed-match goal counts match scores; score/status relation and standing arithmetic pass. `predictionPoints` yields the expected 5/3 examples.
- ZIP integrity verified using `unzip -t`.

## Not verified in the generation environment

- `npm install` could not be completed because the registry was unreachable.
- Therefore `npm run typecheck`, `npm run test` (Vitest), `npm run build` (Vite), actual browser rendering, keyboard testing, Figma pixel comparisons and live OpenRouter requests **have not been executed**.
- Model availability, billing, browser CORS and external OSM tile network access must be checked on the team laptop.

## Required first actions for the actual team

1. Run `npm install` on a workstation with registry access. **Commit the resulting `package-lock.json`** for reproducible three-person development. Then change CI from `npm install` to `npm ci` if desired.
2. Run `npm run check`. Fix any real type or library-compatibility issues surfaced by installed packages.
3. Start `npm run dev`. Smoke test 375px and 1440px, all routes and navigation, map tiles and demo mode.
4. Put actual Figma frame links in `docs/04-FIGMA-HANDOFF.md` and compare the existing provisional theme to them.
5. If using OpenRouter live browser mode, test on the exact demo origin/browser, then rotate the temporary key after the presentation.

## Updated workspace validation (2026-10-24)

The following checks were completed in the current workspace after feature integration:

- `npm run check` passed: TypeScript typecheck, Vitest and production Vite build all succeeded. The suite contains **10 passing tests** covering fixture/data integrity, deterministic prediction scoring, AI fictional/hypothetical guardrails, prediction eligibility and premium-topic gating.
- The production preview served `/matches/m01` and `/stadiums` with HTTP 200, confirming the included static SPA fallback routes those nested URLs to the app shell.
- Headless Chromium loaded the root route at 1440px and 375px viewport sizes without a browser-startup or page-load failure. This is a render smoke check only; it is not a substitute for a human visual, keyboard or interaction review.

Still requiring a human on the intended demo machine:

- Complete Q01–Q20 in `docs/06-INTEGRATION-QA.md`, including localStorage persistence, keyboard-only traversal, map-tile outage behavior and interaction checks.
- Provide inspectable Figma frame URLs/node IDs before claiming frame-accurate visual implementation.
- If live AI is desired, test a temporary restricted OpenRouter key on the exact browser/origin, then return to mock mode and revoke the key.
- Create the first repository commit before creating the required `demo-stable` tag. At this validation point, `main` has no commits and the workspace is untracked, so no tag was created.
