# 01 — MVP scope and definition of done

## 1. One-sentence promise

> Pick a club, move through a visual sequence of matches, open a game, understand what happened with AI, predict what happens next, and react like a fan.

This is a **demonstrator** of the business model, not the business model's entire proposed production MVP. Matchline's source document calls some deeper capabilities Core; those can still be simulated or postponed because this implementation has intentionally different constraints (three people, no backend, short deadline).

## 2. Included functional scope

| ID | Feature | Implemented demonstration | Accept when |
|---|---|---|---|
| S01 | Team preference | Select one of eight seeded clubs; remember locally | Changing team changes Journey content and AI context |
| S02 | Story preferences | Tone, length, interests, optional local persistence consent | Controls round-trip from input through state to AI payload |
| S03 | Match Journey | Curved/candy-style progression; visual status + competition motif | Nodes are sorted and uniquely linked to correct match ID |
| S04 | Match Centre | List status filters and match detail screens | Clicking a fixture shows consistent teams, score, events and stats |
| S05 | Contextual analysis | Snapshot league impact sentence | Win/draw/loss point implications are clearly presented as scenario, not official recalculation |
| S06 | Interactive AI | Three suggestion chips, typed question, loading, error handling; mock or OpenRouter | AI uses selected match context and never claims real live data |
| S07 | Stadium map | Approximate UK ground coordinates; status-colored markers and popups | Marker opens the same selected fixture that the list represents |
| S08 | Predictions | Exact score inputs, derived 1X2 outcome, persistence and scoring helper | No new prediction for demo-past/live/completed fixtures; 5/3/0 system deterministic |
| S09 | Leaderboard | Fictional competing fans plus your computed local points | Ranking sorted descending; demo distinction present |
| S10 | Fan community | Seeded posts, local replies, likes, reports (hide locally) | Reported post is hidden in same browser; basic fan contribution works |
| S11 | Premium showcase | Free/Premium toggle and topic-creation gate | Premium can create a topic locally; no payment flows |
| S12 | Responsive | Desktop and mobile navigations + keyboard-focus styling | No horizontal clipping at 375px, 768px and desktop |

## 3. Deliberately excluded

- Real registration, identities, auth, roles, invitation emails and moderation workflow.
- Real league standings calculation, match-data suppliers, live match updates and score notifications.
- Actual player facts, licensed logos, official club badges and squad rosters.
- Real streaming AI responses, speech generation, podcasts, videos, weekly comics, sentiment modeling or personalized training on user behavior.
- Authentic payments, pricing experiments, subscription billing, advertiser reporting and B2B APIs.
- Shared multiplayer leaderboards or server-side authoritative prediction deadlines.
- Analytics collection, user deletion requests, privacy exports, production access control, rate limits and operational monitoring.

**Reason:** All need a data, infrastructure, legal or product validation investment that does not advance the most compelling on-stage narrative under the deadline.

## 4. Demo data guarantees

- Sports fixtures, scores, events, lineups and league standings are **fictional**. Do not claim real 2026/27 outcomes.
- A club can appear in multiple competitions; Journey uses a single list of all matches involving the selected club, sorted by kickoff.
- A match cannot be both `upcoming` and have a score, or `live/completed` without a score. Fixture IDs are stable.
- Stadium status uses the highest-priority active fixture by venue: live > upcoming > most recent completed, using the canonical selectors.
- Snapshot standings are independently seeded for a **limited subset** of clubs; no algorithm recomputes them from the limited example fixture list.
- User input creates only local state. Demo peer posts/scores are fictional examples.

## 5. Feature acceptance by screen

**Journey:** 1) Select Arsenal, see at least one completed, live and upcoming league fixture plus an FA Cup fixture. 2) Cup visually distinct. 3) Click any node and land on exactly its match ID. 4) Switch clubs and see a corresponding filtered path. 5) Empty state is useful if no sample match exists.

**Match:** 1) Header names match the list. 2) Timeline events have correct competing team IDs. 3) Data source and simulated status identified. 4) Mock AI response is immediate and coherent; live mode is optional. 5) Missing future stats/lineups are represented as unavailable, not manufactured.

**Predictions:** 1) Upcoming match can be predicted and changed. 2) Past/live/completed match cannot be predicted through form or store. 3) Picked values survive refresh. 4) Rule text matches `predictionPoints`. 5) Seeded leaderboard peers are labeled as fictional.

**Community:** 1) Select match and filter posts. 2) Reply saves locally; no global claim. 3) Like and report reflect immediately. 4) Free users cannot create new topics; premium demo toggle permits it. 5) No actual cross-browser sync implied.

**Map:** 1) Render enough markers for eight clubs. 2) Status filter changes displayed markers. 3) Clicking popups links to matches. 4) Provide honest connectivity fallback if tiles are unavailable. 5) Show OSM attribution.

**Appearance:** 1) Apply final Figma typography, spacing, color and imagery in a single controlled styling pass. 2) Do not sacrifice core interactions for decor. 3) All essential controls have accessible labels/keyboard focus.

## 6. Definition of done

- All critical routes open from navigation without blank screens.
- Types and tests pass, production build succeeds, hosted demo uses SPA fallback.
- Three preselected demo scenarios run without relying on real football data freshness or an API key.
- No actual API key in Git or public hosting artifacts without explicit documented consent and immediate revocation plan.
- On-screen labels distinguish mock facts, simulated community participation and hypothetical AI reasoning.
