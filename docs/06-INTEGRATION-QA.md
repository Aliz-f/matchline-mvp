# 06 — Integration test plan and release checklist

## 1. Automated commands

```bash
npm install
npm run typecheck
npm run test
npm run build
npm run preview
```

Run after integrating each feature group and again on the clean demo machine. Do not treat a passing TypeScript build as a substitute for manual visual checks.

## 2. Smoke tests (repeat in a clean/incognito browser)

| ID | Steps | Expected |
|---|---|---|
| Q01 | Navigate `/` | Journey renders and the static-data label is visible |
| Q02 | Select Arsenal, open completed Chelsea node | Route `/matches/m01`, 2–1 score, three event entries |
| Q03 | Select Arsenal, open simulated live City node | Route `/matches/m03`; live status says simulated/frozen |
| Q04 | Select Liverpool | Journey reflects Liverpool fixtures; no stale Arsenal-only node |
| Q05 | Open match list, use completed/live/upcoming filters | Correct counts change, links resolve |
| Q06 | Ask “What if the starting lineup changed?” in mock AI | Hypothetical/fictional disclaimer, contextual answer |
| Q07 | Ask about goals in m01 | Mock answer is based on m01, not another match |
| Q08 | With no OpenRouter key in env, run mock AI | Works without network or credentials |
| Q09 | Switch live AI on a local laptop with limited test key | Correct response or clear error, key never in repo; mode reset afterward |
| Q10 | Predict Arsenal–Newcastle 2–0 | Success, saved score survives refresh |
| Q11 | Attempt predicting a live/completed fixture through store | Rejected even without form-level validation |
| Q12 | Reset browser demo | Local predictions/posts/preferences return to seeded defaults |
| Q13 | Open stadium map, select live, inspect popup | Only live-venue markers; match link opens correct detail |
| Q14 | Block network, reload map | App remains navigable; map tile outage does not crash entire SPA |
| Q15 | Switch to community m03, post, like and report | Changes immediately reflected and persist locally |
| Q16 | Toggle premium demo, create new topic | Premium allows; switching back to free prevents new topic |
| Q17 | Open standings | Favorite club marked; data identified as illustrative partial table |
| Q18 | Refresh nested route `/matches/m01` on deployed host | Correct page rendered via SPA fallback |
| Q19 | Test phone width 375px, tablet 768px, desktop 1440px | No blocked CTA, clipped modal or horizontal overflow |
| Q20 | Navigate using keyboard only | Every form, navigation and primary action focusable |

## 3. Fixture/data quality checks

- Match scores and event lists must be consistent: for completed m01, Arsenal goal events count 2 and Chelsea events 1.
- Null scores only for upcoming; frozen `live` has numeric scores.
- Competition styling corresponds to `competitionId`; no FA Cup match is given league points.
- Table rows have `played === wins+draws+losses` and `points === 3*wins + draws`.
- AI can distinguish what-if statements from verified in-dataset facts. Player identifiers remain sample labels.
- Ensure multiple Journey and Map views use the **same IDs** even after one agent changes a file.

## 4. Quality gate for merge

A PR can merge when:

1. No changes outside explicitly owned files, or a documented handoff exists.
2. The linked task's acceptance criteria have been checked.
3. A screenshot or short recording demonstrates the primary visual change.
4. `npm run typecheck`, `npm run test` and `npm run build` pass on the branch.
5. No hardcoded API key, browser-console error, broken import or unlabelled simulated sporting claim.
6. The integration owner has exercised the affected route after merge.

## 5. Common conflicts and how to detect them

- **Different team names/IDs:** use `getTeam`, do not retype names in components.
- **Different score shapes:** match.score is nullable `{home,away}`, not `homeScore`/`awayScore` fields.
- **Using live dates instead of frozen time:** `DEMO_NOW` is the single source for eligibility.
- **Different React Router links:** every match uses `/matches/:id`; never query by name.
- **New color constants scattered in features:** consolidate in `:root` when matching Figma.
- **A CSS fix breaks mobile:** test 375px immediately after styles are merged.
- **Two developers edited store/types at once:** pause merges, reconcile via canonical contract and regenerate tests.

## 6. Rollback plan

Keep `demo-stable` Git tag after the first successful end-to-end walkthrough. If OpenRouter slows/errors on-stage: switch `.env.local` to `VITE_AI_MODE=mock`, restart or redeploy. If map tiles fail: demo Journey/Match directly and use pre-captured map screenshot only as a visual supplement. If an integration breaks: return to `demo-stable` rather than merging new features at the deadline.

## 7. Release honesty checklist

- [ ] “Live” data visibly described as simulated.
- [ ] Third-party OpenRouter responses are identified; hypothetical responses not presented as actual match history.
- [ ] No real user identity, payment, shared discussions or professional moderation claimed.
- [ ] Preview includes attribution for any tiles/assets in use.
- [ ] Key isn't leaked into commits; credentials rotated after demonstration.
- [ ] Demo has no broken navigation in supported viewports.
