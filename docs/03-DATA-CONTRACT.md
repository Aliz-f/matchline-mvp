# 03 — Data contract: canonical IDs, fixtures and validation

## 1. Why this document matters

Independent coding agents often create contradictory mock objects and silently hardcode scores. **Do not create new fixture/team shapes in feature directories.** Import interfaces from `src/types/domain.ts` and selectors from `src/data`/`src/lib`. If a schema change is unavoidable, modify contract + data seeds + validation tests in one intentional PR.

## 2. Core models

`Team`: stable `id`, `name`, `shortName`, `abbr`, `primaryColor`, `secondaryColor`, `stadium {name,city,lat,lng}`. `id` is the FK in `Match`, `Standing`, `Preferences` and local profile.

`Match`: stable `id`, `competitionId`, `round`, `kickoff` **with UTC offset**, `homeTeamId`, `awayTeamId`, `venueTeamId`, `status`, nullable `score`, optional `minute`, `headline`, preview/recap stories, optional stats/lineups, structured events. **Never parse `headline` to identify a fixture.**

`MatchStatus`: `upcoming` (`score === null`) / `live` (score present, minute if available) / `completed` (score present). This is a static seed state, not derived from wall-clock on page load.

`MatchStats`: four comparison pairs `[home,away]` for possession, shots, shots on target, corners. If absent, show unavailable. Possession values should sum to 100; do not invent extra metrics.

`Competition`: `premier-league` and `fa-cup`; color/motif are styling metadata to distinguish competition on Journey. These correspond to the same `competitionId` used in Match.

`Prediction`: `userId='you'`, `matchId`, `exactHome`, `exactAway`, derived `choice: home|draw|away`, `submittedAt` using frozen demo time. Saved predictions are unique by match ID for the demo user.

`DiscussionPost`: ID, match FK, author, text, likes, createdAt, optional `reported`. There is **no** actual server moderation; report hides locally.

`Preferences`: selected club, preferred tone (`analytical|humorous|emotional|neutral`), length (`short|medium|detailed`), interests subset of `tactics|players|standings`, and a local-demo consent toggle. Consent does not enable automatic behavior-based learning because that is not implemented.

## 3. Fixture IDs for the on-stage demo

| ID | Match | Status | Selected purpose |
| --- | --- | --- | --- |
| `m01` | Arsenal 2–1 Chelsea | Completed | Finished-match recap, what-if question, timelines |
| `m02` | Liverpool 1–1 Arsenal | Completed | Second journey node and different venue |
| `m03` | Arsenal 1–1 Man City | Simulated live, minute 68 | Live visual state and team discussion |
| `m04` | Tottenham vs Arsenal | Upcoming, FA Cup | Cup motif & fan prediction |
| `m05` | Arsenal vs Newcastle | Upcoming, league | League predictions and point-impact context |
| `m06` | Brighton vs Arsenal | Upcoming, league | Future journey continuation |
| `m07` | Chelsea 0–2 Liverpool | Simulated live | Independent second live ground |
| `m08` | Newcastle 2–0 Brighton | Completed | Stadium with completed match |
| `m09` | Man United vs Tottenham | Upcoming | Other-club predictions |
| `m10` | Man City 3–1 Newcastle | Completed | Extended score list / City stadium |

**Important:** These are invented sporting events. The initial league business scope is represented by eight known clubs, not an official complete set of 20 clubs or official real-world 2026 results. Teams’ sample club names are illustrative; there are no trademarked official badge images.

## 4. Demo clock and eligibility

Use `DEMO_NOW='2026-10-24T18:38:00+01:00'` for demonstration logic. Do **not** use `new Date()` as prediction deadline evaluation. The frozen match statuses and kickoff dates must agree with this clock. Post-match AI can be shown for `m01` or `m02`; interactive AI is also available for the fixed live/preview snapshot, always clearly labeled. Predicted scores on `m04` and `m05` are open; `m03` is not.

## 5. Prediction scoring

- Exact score of a **completed** match: 5 points.
- Correct winner/draw outcome but incorrect exact score of a completed match: 3 points.
- Incorrect result, or an unfinished match: 0 points.
- Submitting a prediction before a fixture closes records it locally. Points for future matches remain 0 until a seed is manually changed to completed for a demo state.
- AI may discuss predictions; it must not award or change points.

**Agent requirement:** call `predictionPoints(prediction,match)` for points; do not duplicate this in JSX. Use `savePrediction` for input validation and uniqueness.

## 6. Cross-match impact and standings

The current table is a fictional snapshot for eight clubs and only partial fixtures are seeded. It should be described as illustrative. `impactScenario` makes limited transparent arithmetic claims: win +3, draw +1, loss +0, but DOES NOT compute an authoritative updated rank after all other games. Avoid stronger claims such as guaranteed qualification, precise title probabilities or current official league position.

## 7. Data integrity checks

Existing automated tests include `src/lib/dataValidation.test.ts`, `src/lib/football.test.ts` and `src/services/ai.test.ts`. Add tests when data contracts change. Invariants checked: unique match IDs, real team/competition references, legal fixture score/status relation, timezone parseability, match event team FKs, standing W/D/L/P arithmetic, scoring correctness and obvious AI what-if labeling.

For a new fixture, add it only to `matches.ts`, reference existing teams, set correct timezone offset and status, write complete story metadata, and optionally stats/events. Then run `npm run test`, inspect Journey, map and match centre as they all read the same fixture list.
