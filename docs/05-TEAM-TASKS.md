# 05 — Parallel implementation backlog, three-member team

## Collaboration principle

Assign **features plus explicit files**, not vague layer labels like “frontend developer.” The core starter already contains code, so your objective is to review, align to Figma, complete interaction polish and stabilize the end-to-end demo—not to reimplement everything from scratch.

- Member 1: layout/design system + Journey + integration owner (**Codex** recommended).
- Member 2: football-data presentation + match/standings/map (**Claude** recommended).
- Member 3: AI + prediction/gamification/community + demo behavior (**Codex or Claude**).
- Only Member 1 may change shared `src/app`, `src/styles`, `src/components`, `package.json`, or `vite.config.ts` without a coordinated handoff.
- Only Member 2 may edit `src/data/matches.ts`, `src/data/teams.ts`, `src/data/community.ts`, `src/types/domain.ts` during the parallel phase.
- Member 3 may edit `src/store` and `src/services`, but must ask Member 2 before changing any domain model.

## Dependency-first task board

| Task | Owner | Priority | Depends on | Deliverable |
| --- | --- | --- | --- | --- |
| FND-01 Run setup/check in a clean clone | Member 1 | P0 | none | Report install/test/build status |
| FND-02 Lock canonical team/match IDs | Member 2 | P0 | starter | Validate data tests and fixtures |
| FND-03 Map Figma frames to routes/tokens | Member 1 | P0 | actual Figma access | Frame links and token values |
| FND-04 Agree shared API boundaries | All, lead Member 1 | P0 | FND-02 | No cross-owner files changed |
| FE-01 Shell/navigation & responsive polish | Member 1 | P0 | FND-03 | Desktop/mobile nav works |
| FE-02 Journey visuals/interaction | Member 1 | P0 | FND-02,FND-03 | Distinct competitions/states and links |
| FE-03 Personalization interaction | Member 1 | P0 | store contract | Favorite team, tone, interests persist |
| FE-04 Fixtures and match detail | Member 2 | P0 | FND-02 | List filters, detail/timeline/stats |
| FE-05 Partial standings/impact context | Member 2 | P1 | FND-02 | Consistent explanatory snapshot |
| FE-06 Stadium map and marker states | Member 2 | P1 | FND-02 | All available grounds plot and link |
| FE-07 AI mock/live/fallback flows | Member 3 | P0 | FND-02 | Demo question works in both modes |
| FE-08 Predictions and leaderboard | Member 3 | P0 | FND-02 | Local scoring/locking/points test |
| FE-09 Community and premium gate | Member 3 | P1 | store | Post/reply/like/report, premium topic |
| INT-01 Merge owner branches | Member 1 | P0 | FE-01..09 | No broken routes/shared states |
| INT-02 Cross-feature smoke test | All | P0 | INT-01 | QA evidence/checklist |
| INT-03 Judge-ready demo and backups | All, lead Member 1 | P0 | INT-02 | Live and offline 5-minute flow |

## Member 1 — detailed instructions

**Owned paths:** `src/app/*`, `src/components/*`, `src/styles/*`, `src/features/journey/*`, `src/features/preferences/*`, plus root configs and README/docs integration. Treat `src/store` read-only.

**Order:**
1. Validate install and smoke flow. Confirm Figma frame references and update 04-FIGMA-HANDOFF.
2. Inspect global token definitions; implement faithful Figma palette/typography/buttons/nav.
3. Compare Journey nodes with Figma: candy-shaped nodes, chronological flow, competition markers and icon/status distinctions. Keep `matchesForTeam` and `match.id` route.
4. Check club selection options; ensure Journey no-match state and spotlight work for all eight clubs.
5. Confirm preferences values appear in `aiContext`; do not introduce a duplicate local preference model.
6. Run mobile 375/768 and desktop 1440 checks. Own integrations and PR review.

**Acceptance:** Journey opens `m01` when clicked, switching club changes roadmap, mobile can browse without horizontal overflow, global app navigation finds all required routes, builds pass.

**Forbidden without review:** replacing domain fixture IDs, changing prediction rules, removing demo data disclaimers, installing a design system that conflicts with Figma or other agents.

## Member 2 — detailed instructions

**Owned paths:** `src/data/*`, `src/types/domain.ts`, `src/lib/football.ts`, `src/features/matches/*`, `src/features/map/*`, `src/features/leaderboard/*`, tests for data/football.

**Order:**
1. Read 03-DATA-CONTRACT; check match status against DEMO_NOW, home/away pairing and event IDs.
2. Validate mock league table arithmetic and explicit note that the eight-team table is partial and illustrative.
3. Apply Figma layout to match list, match scorecard, stats, events and available lineups. For incomplete match data show unavailable states.
4. For the map, compare Leaflet pin legend/filter design against Figma. Keep OSM attribution and real coordinates as approximate.
5. Verify `getMatch`, `matchesForTeam`, `matchForStadium` selectors; do not add page-local fixture copies.
6. Run smoke path: Journey -> m03 -> discussion, Map -> m07, upcoming m04 -> prediction.

**Acceptance:** Eight stadium pins when `All grounds` selected, match ID links correct, all match pages render without runtime exceptions, no assertion that data is live, tests pass.

**Forbidden without review:** changing App routes and nav, overwriting Member 1 style file, rewriting AI adapter or storage implementation.

## Member 3 — detailed instructions

**Owned paths:** `src/services/*`, `src/store/*`, `src/features/ai/*`, `src/features/predictions/*`, `src/features/community/*`, `src/features/premium/*` and matching tests. Read-only canonical seed fixtures.

**Order:**
1. Start with mock AI. Ask prewritten what-if, match fact and standings-context questions; inspect output labels.
2. Switch local `.env.local` to live, paste a small temporary OpenRouter key, verify on intended demo browser/network. Test failure states without sending excessive requests. Return to mock for default.
3. Validate predictions cannot be placed on completed/live fixtures and `DEMO_NOW` rather than wall-clock determines eligibility.
4. Verify predictions persist through reload and do not fabricate points for upcoming matches.
5. Verify seeded peer leaderboard and own rank render. Make the scoring algorithm visible.
6. Test community reply + like + report + browser reload. Check free vs premium new-topic behavior.
7. Polish forms, labels, loading/errors and responsive layout in owned features; coordinate global CSS changes via Member 1.

**Acceptance:** `VITE_AI_MODE=mock` always gives a plausible labeled response, no key means no network call, live request uses canonical match data, saved predictions and posts persist, premium gate behaves deterministically, all tests pass.

**Forbidden without review:** assuming live API works from every host, quietly embedding someone else's key in Git, implementing AI-based scoring, implying backend moderation or payments exist.

## Branch/PR protocol

```bash
git switch main
git pull
git switch -c feat/member-1-journey       # analogous member 2/3 branches
# work and commit isolated files
git add src/features/journey src/app src/styles
# commit only what you actually own
git commit -m "feat: refine journey and navigation"
git push -u origin feat/member-1-journey
```

- Create a PR after the **first working screen**, not after the entire branch is perfect.
- PR description should include: screenshots (desktop/mobile), routes tested, changed files, acceptance checks, known limitations and any API-contract changes.
- Integration owner checks `git diff --name-only`, typecheck, tests and build; merges in a controlled order (shared shell -> data -> feature views -> AI/community).
- Conflicts in global CSS/shared components must be resolved by Member 1, preserving app behavior from both branches.
- Keep a recent known-good commit/tag `demo-stable` before risky visual changes.

## Suggested aggressive timeboxes (adjust to actual deadline)

- 0–30 minutes: install/check, Figma ownership, agreement on contracts.
- Next 3–5 hours: three parallel page groups, integrated incrementally.
- Next 1–2 hours: fix cross-feature bugs and visual issues.
- Final 45–60 minutes: full demo rehearsal, backup offline mode, deployment, no new features.

If time disappears, drop decorative polish, premium presentation, extra discussion UI, then complex map refinements. Protect Journey -> match -> AI -> prediction first.
