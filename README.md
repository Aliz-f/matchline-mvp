# Matchline MVP — React + TypeScript + fictional football data

**Your Team. Your Story. Your Voice.**

This is a runnable **frontend-only hackathon starter implementation** of Matchline. It contains functional journeys, match details, mock grounded AI, predictions, leaderboards, community participation, stadium pins, personalization and a simulated premium gate. It deliberately does not claim to implement a production sports-media platform.

## Start in under five minutes

Prerequisites: **Node.js 22+**, npm, and an internet connection for the first npm install and the map tiles.

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open the URL printed by Vite, normally <http://localhost:5173>.

No OpenRouter key is needed: `VITE_AI_MODE=mock` produces reliable offline demo responses. To use actual AI calls, edit `.env.local`:

```dotenv
VITE_AI_MODE=live
VITE_OPENROUTER_API_KEY=your_temporary_key_here
VITE_OPENROUTER_MODEL=openai/gpt-4o-mini
```

Restart Vite after `.env.local` changes. Direct browser calls are convenient **but expose the key in browser traffic and built JavaScript**, and may encounter origin/CORS restrictions. Do **not** commit or publicly deploy a working key. Use a restricted, low-limit, temporary key, revoke it immediately afterward, and switch back to `mock` before sharing a public demo URL. If the endpoint rejects browser-origin traffic, use offline mode or a tiny serverless relay instead of fighting the browser.

## What is implemented

| Route | Experience | Data | Owner |
| --- | --- | --- | --- |
| `/` | Personalized Candy Crush-inspired Match Journey + CTA dashboard | Mock | Member 1 |
| `/matches` | Filtered list of sample fixtures | Mock | Member 2 |
| `/matches/:id` | Match stats, events, lineups, cross-match narrative and AI chat | Mock + optional OpenRouter | Members 2/3 boundary |
| `/stadiums` | Leaflet map, statuses, navigation to matches | Approximate real coordinates + simulated activity | Member 2 |
| `/predictions` | Open predictions, local save, transparent scoring, leaderboard | Mock + localStorage | Member 3 |
| `/community` | Discussion posts, replies, likes, report-to-hide, premium topic gate | Mock + localStorage | Member 3 |
| `/standings` | Fictional partial league table | Mock | Member 2 |
| `/preferences` | Favorite club, tone, length, interests, consent toggle, reset | localStorage | Member 1 |
| `/premium` | Free/premium capability preview; premium topic creation demo | localStorage | Member 3 |

**Terminology:** `live` is a frozen **mock status**. Scores, events, standings, fixture dates, player labels and predicted leaderboard users are invented for demonstration. Stadium names and approximate coordinates refer to real locations. No external sports feed, user account, moderation backend, billing, GDPR compliance implementation, data license or production reliability claim is included.

## Quality commands

```bash
npm run typecheck
npm run test
npm run build
npm run check
```

`npm run check` has passed in this workspace. Production preview route fallback was also verified for `/matches/m01` and `/stadiums`. Human interaction, keyboard, map-network and target-device checks remain required; use the Q01–Q20 checklist in `docs/06-INTEGRATION-QA.md`. **After your first successful `npm install`, commit its generated `package-lock.json`** to keep dependency resolution consistent for all three developers.

## Team collaboration

Read, **in order**:
1. [`docs/00-START-HERE.md`](docs/00-START-HERE.md) — quick decision log and how to parallelize.
2. [`docs/01-MVP-SCOPE.md`](docs/01-MVP-SCOPE.md) — in/out of scope and acceptance.
3. [`docs/02-ARCHITECTURE.md`](docs/02-ARCHITECTURE.md) — state, routes, data and AI.
4. [`docs/03-DATA-CONTRACT.md`](docs/03-DATA-CONTRACT.md) — canonical football model and invariants.
5. [`docs/04-FIGMA-HANDOFF.md`](docs/04-FIGMA-HANDOFF.md) — match real frames to routes. Figma URLs were not supplied.
6. [`docs/05-TEAM-TASKS.md`](docs/05-TEAM-TASKS.md) — issue-level ownership for three people.
7. [`docs/06-INTEGRATION-QA.md`](docs/06-INTEGRATION-QA.md) — test gates and conflicts.
8. [`docs/07-DEMO-SCRIPT.md`](docs/07-DEMO-SCRIPT.md) — compelling five-minute presentation flow.
9. [`docs/08-AI-INTEGRATION.md`](docs/08-AI-INTEGRATION.md) — prompts, costs, errors, factual guardrails.
10. [`docs/09-REQUIREMENTS-TRACEABILITY.md`](docs/09-REQUIREMENTS-TRACEABILITY.md) — scope vs original business model.
11. [`docs/10-AGENT-PROMPTS.md`](docs/10-AGENT-PROMPTS.md) — ready to paste into Codex/Claude.
12. [`docs/11-VALIDATION-STATUS.md`](docs/11-VALIDATION-STATUS.md) — what was actually checked during generation.
13. [`docs/SOURCE_Matchline_Business_Model.md`](docs/SOURCE_Matchline_Business_Model.md) — unchanged supplied business-model source.

### Build and deployment

- For static hosting, run `npm run build` and deploy `dist/`.
- `BrowserRouter` requires SPA fallback: all unknown paths should serve `index.html`. Platforms such as Netlify can use the included `_redirects` in `public`.
- The default UI is a light editorial Matchline system using centralized CSS tokens. It follows the supplied visual references but is not a pixel-perfect transcription: no inspectable Figma file, licensed stadium photography, or terrain-map artwork was supplied. Provide frame URLs/node IDs before asserting visual parity.
- Use `git switch -c feat/member-one` etc. Do not run two agents on the same branch or shared files.

## Source attribution

Scope is based on the supplied **Matchline — Business Model and Higher-Level Requirements Specification**. The product plan describes far more production capabilities than this demo; see scope matrix before making technical claims. OpenRouter API documentation: <https://openrouter.ai/docs>. Tailwind Vite documentation: <https://tailwindcss.com/docs/installation/using-vite>.
