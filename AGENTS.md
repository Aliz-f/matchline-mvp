# Matchline coding agent collaboration contract

This applies to **Codex, Claude and any other coding assistant** working in this repository. Read the document set in `docs/` before editing. These files are the project-level source of truth for scope and behavior; do not replace them with a generic product specification.

## Non-negotiable rules

1. **Three-member feature ownership:** Member 1 shell/design/Journey/preferences; Member 2 sports data/matches/map/standings; Member 3 AI/predictions/community/premium. See `docs/05-TEAM-TASKS.md`. Do not modify another member's files without coordination.
2. **No backend:** no databases, auth, payment integration, serverless proxy or sports data API unless the team explicitly changes scope. OpenRouter direct client mode is accepted for a short **local** demonstration, subject to visible key risks.
3. **Single canonical mock dataset:** `src/data/teams.ts`, `src/data/matches.ts`, `src/data/community.ts` with types in `src/types/domain.ts`. Reuse IDs and selectors.
4. **Fixed demo clock:** `DEMO_NOW`. Never base prediction eligibility on wall-clock `Date.now()`.
5. **Clear distinction of fact and fiction:** all matches/results/stats and community users are fictional. The live badge is simulated. AI what-if explanations must be labeled hypothetical.
6. **Deterministic scoring:** 5 exact, 3 correct outcome, 0 otherwise, completed only, independent of AI.
7. **Never commit OpenRouter credentials.** `.env.local` holds the optional plaintext temporary key; `VITE_` does not hide credentials from browser users. Offline AI mode is the demo-safe default.
8. **Figma first when available:** actual frame links/screens govern detailed visual styling. Without a frame, don't state that you implemented it faithfully.
9. **Minimal changes:** avoid needless dependencies, broad file refactors, copy-pasting domain types, or breaking currently working routes. Keep files structured by feature.
10. **Verification:** test, typecheck, build and check main demo paths. Report unverified results clearly.

## Before changing anything

State: (a) which task/feature, (b) paths you will edit, (c) expected inputs/outputs, (d) dependency or contract impact. After editing, list changes/tests/known limitations.
