# 10 — Ready-to-paste instructions for Codex and Claude

## All agents: paste this before feature work

```
You are working in the Matchline 3-person hackathon frontend repository.
Read AGENTS.md, docs/00-START-HERE.md, docs/01-MVP-SCOPE.md,
docs/02-ARCHITECTURE.md, docs/03-DATA-CONTRACT.md and docs/05-TEAM-TASKS.md.
React + TypeScript + Vite, static mock football data, optional OpenRouter direct
browser demo, localStorage; no backend, authentication, real sports API or payments.
Stay strictly within the file ownership assigned to your member. The existing
source is a functional scaffold; DO NOT rewrite the whole app from scratch.
Treat all match outcomes as fictional, even for real club names. Use types,
selectors and fixtures from canonical src/types, src/data, src/lib. Do not
fabricate real scores, stats or live game updates. Preserve accessibility,
responsive layout and factual/hypothetical labels. If Figma reference is not
provided, don't claim exact adherence; improve existing design cautiously.

Before editing: list intended files and expected behavior changes.
After editing: summarize changes, run relevant checks, identify anything
unverified, and produce an acceptance-test checklist. Don't modify another
member's source files silently. Don't commit working API keys.
```

## Member 1 — Codex: UI, Journey and integration

```
You are Member 1, design system and integration owner.
Read docs/04-FIGMA-HANDOFF.md and docs/05-TEAM-TASKS.md.
Owned: src/app/*, src/components/*, src/styles/*,
src/features/journey/*, src/features/preferences/* and root config/docs.

1. Compare actual Figma links/screenshots [PASTE LINKS HERE] with existing UI.
2. Extract Figma design tokens into src/styles/index.css and maintain one
   coherent design system. Do not modify the mock data or domain contracts.
3. Implement responsive Match Journey exactly as intended: one node per
   selected-team match, competition color/motif, upcoming/live/completed
   icon/state, sequential path, click -> /matches/:id.
4. Update shell/navigation, shared components and preferences carefully.
5. Verify smartphone and desktop layout, focus states and error cases.
6. Merge feature branches only after npm run check and route smoke tests.
Deliver changed files, before/after UI summary and acceptance checklist.
```

## Member 2 — Claude: football data, match details and map

```
You are Member 2, football information/data owner.
Owned: src/data/*, src/types/domain.ts, src/lib/football.ts,
src/features/matches/*, src/features/map/*,
src/features/leaderboard/* and data/football tests.

1. Verify every fixture, status, minute, result, stat and stadium reference
   against docs/03-DATA-CONTRACT.md and DEMO_NOW. Do not claim real season data.
2. Polish Figma Match Centre screens [PASTE FRAMES HERE], preserving
   existing canonical IDs, dynamic lookup and graceful absent-data cases.
3. Integrate match score, event timeline, sample stats and lineups without
   inventing unsupported factual claims.
4. Polish map marker legend/filter/popups, preserving matchForStadium and OSM
   attribution; ensure marker -> exact match route.
5. Clearly label the partial fictional standings and scenario point changes.
Do not edit global CSS or app routes without asking Member 1.
Return test results and file-by-file change summary.
```

## Member 3 — Codex or Claude: AI, predictions and community

```
You are Member 3, AI/interaction owner.
Owned: src/services/*, src/store/*, src/features/ai/*,
src/features/predictions/*, src/features/community/*,
src/features/premium/* and their tests.

1. Ensure demo works offline by default and optional OpenRouter request in
   local live mode is grounded exclusively in canonical match facts.
2. Validate response handling for empty data, API errors, a blocked browser
   request, timeouts, failed network and no key. Do not promise live success.
3. Make predictions strictly on eligible upcoming games using DEMO_NOW.
   Exact score 5, correct outcome 3, else 0. No AI-derived scoring.
4. Ensure saved predictions persist, sorted leaderboard includes seeded rivals,
   and points for unfinished games remain zero.
5. Seeded discussions allow local reply/like/report. Free can participate,
   premium (demo toggle) can create topics. No fake payment/moderation claim.
6. Review Figma interaction screens [PASTE FRAMES HERE] and coordinate any
   global style changes with Member 1.
Return changed files, tests and demo path proof.
```

## Integration review — final shared prompt

```
Review the merged Matchline repository against docs/01-MVP-SCOPE.md,
docs/03-DATA-CONTRACT.md, docs/06-INTEGRATION-QA.md and
09-REQUIREMENTS-TRACEABILITY.md. Look for mismatched IDs, contradictory
matches or scorelines, impossible future/past statuses relative to DEMO_NOW,
duplicate types, incorrect link routes, AI hallucinated real facts,
non-deterministic scoring, inaccessible controls, broken mobile layouts,
unsanitized browser outputs, exposed secrets in committed files and
unresolved Git merge conflicts. Fix only issues clearly supported by the
specifications. Run npm run check and list both successes and unverified
checks; do not claim build or live AI was tested without actual evidence.
```
