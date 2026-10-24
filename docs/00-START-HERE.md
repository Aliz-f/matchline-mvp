# 00 — First 20 minutes: read before coding

## Mission

Deliver a cohesive, judge-friendly **frontend prototype** of *Matchline*, an interactive sports media concept for English-league football fans. Prioritize a completed user journey, reliable mock behavior and fidelity to the team's final Figma frames. The audience should believe the product has a coherent architecture, but should never believe it contains real-time/official football information or a live shared backend.

## Fixed decisions

- **Implementation:** React 19 + TypeScript + Vite + Tailwind 4/CSS; React Router; Zustand for local shared app state; Leaflet for the stadium map.
- **No backend, database, login, sports-feed integration, payment gateway or real-time refresh.** There is a direct OpenRouter browser-call adapter for the local demo, with offline fallback mode.
- **One initial competition focus:** fictional fixtures among a selected subset of recognizable English clubs. A separate simulated FA Cup match exists to demonstrate competition styling. No assumption that the provided example is a real season.
- **A single, frozen demo clock:** `2026-10-24T18:38:00+01:00`. The label `live` means an illustrative frozen snapshot, not streaming.
- **Primary differentiator:** candy-style Match Journey; each node = one favorite-team match; competition styling + explicit upcoming/live/completed indication; node opens match details.
- **Secondary differentiators:** match-grounded AI, deterministic non-monetary predictions, local fan community; stadium map has geographic stadium pins and match state.
- **User state:** localStorage only, with a clear reset control.
- **Premium:** locally toggle a capability preview. No actual paid subscription.
- **Visual design:** light editorial Matchline system based on the supplied screen references: sage surfaces, deep-green type/actions, red next-fixture accents, condensed display headings and a horizontal header. Screenshots remain visual references; canonical fixture data remains fictional and separate.

## Kickoff steps

1. One person creates the Git repository and commits the starter unmodified.
2. All three run `npm install`, `npm run dev` and `npm run check` in their own clones.
3. Member 1 publishes design tokens, route shell, and component rules after comparing the final Figma file.
4. Member 2 validates seeded teams, match fixtures and standings data contract against the screens; do not substitute live sports data.
5. Member 3 tests AI mode switching, prediction locking and community persistence.
6. Each works on a feature branch and opens **small** PRs. The integration owner merges progressively, not only at the deadline.

## No-go rules

- Do not silently add a backend/service/database/payments or install a large animation library for a small visual effect.
- Do not duplicate domain models or make up IDs that do not exist in `src/data`.
- Do not change `App.tsx`, `Shell.tsx`, global styles, `package.json`, or `src/types/domain.ts` in parallel without explicit ownership transfer.
- Do not let AI hallucinate actual scores: only `src/data/matches.ts` and its cross-references provide match facts.
- Do not put a working OpenRouter key in source control. The key may be plaintext inside **local** `.env.local` for the short demo; it is publicly exposed if served from a browser build. Disable/revoke promptly.
- Do not claim production compliance with GDPR, WCAG, data licenses, content moderation, security or platform SLAs.

## Minimum demo if time collapses

Keep these in descending order: (1) `Journey` selected-team node opens `MatchDetails`, (2) MatchDetails calls AI or provides coherent offline analysis, (3) upcoming match prediction is saved locally, (4) one map interaction works, (5) community and premium preview. Everything else is polish.

## Team agreement to record

Fill in at the start of your session:

| Item | Agreement |
| --- | --- |
| Repo URL | TODO / team-provided |
| Exact Figma file/frame URLs | TODO / not supplied in the brief |
| Main branch and integration owner | main / Member 1 by default |
| Three team member names | Member 1 / Member 2 / Member 3 |
| Demo runtime | Local Chrome + Vite, or hosting with SPA fallback |
| OpenRouter mode | Mock until tested; live only if approved on demo laptop |
| Freeze time | Latest team's own deadline, reserve final review window |
