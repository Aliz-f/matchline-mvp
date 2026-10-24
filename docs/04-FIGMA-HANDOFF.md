# 04 — Figma handoff checklist

**The implementation has supplied visual screen references but no inspectable Figma file link or node IDs.** The shared system now follows those references with a light editorial palette, condensed headings, a horizontal header, responsive onboarding, and a roadmap Journey. Exact measurements, source photography and terrain artwork must still be verified against the original Figma file if it becomes available.

**Integration status (2026-10-24):** no Figma URL or node ID has been supplied in this workspace. Frame-level visual parity is therefore intentionally unverified; do not mark any row below as frame-matched until the source frame is provided.

## 1. Frame mapping to implementation

| Screen from Figma | Intended route | Component | Figma URL / node | Priority |
| --- | --- | --- | --- | --- |
| Homepage / Match Journey | `/` | `JourneyPage.tsx` | TODO | Must match |
| Match centre / detail | `/matches/:id` | `MatchPages.tsx` | TODO | Must match |
| AI assistant conversation | Embedded in match detail | `AiConversation.tsx` | TODO | Must match |
| Prediction dashboard | `/predictions` | `PredictionsPage.tsx` | TODO | Must match |
| Stadium map | `/stadiums` | `StadiumPage.tsx` | TODO | Must match |
| Fan discussion | `/community` | `CommunityPage.tsx` | TODO | If provided |
| Standings | `/standings` | `StandingsPage.tsx` | TODO | If provided |
| Team onboarding/preferences | `/preferences` | `PreferencesPage.tsx` | TODO | Must work |
| Premium/pricing preview | `/premium` | `PremiumPage.tsx` | TODO | Optional polish |

## 2. Design extraction: exactly once, by Member 1

Record reusable tokens in `src/styles/index.css` under `:root`. Extract the global font family, foreground, muted text, background, surface levels, borders, shadows, radius, spacing rhythm, button shape, input shape, mobile nav behavior and any explicit responsive rules. Apply tokens before changing individual components.

- **Brand:** logo wordmark, primary and accent colors, minimum size, spacing.
- **Typography:** font source/license, headings H1–H4, body and caption scale, weights and line heights.
- **Color:** contrast-aware states; selected, hovered, disabled, live, upcoming and completed.
- **Space:** page margins, gutters, panel paddings, card grids, max content width.
- **Components:** buttons, navigation, cards, node badges, status labels, AI bubbles, charts and popovers.
- **Images/assets:** Export only assets the team owns or may lawfully use. Store them in `public/assets`. Use unlicensed official team badges only with appropriate permission; the starter uses text badges.
- **Animation:** Match Journey click/hover and one live pulse are sufficient. Keep `prefers-reduced-motion` behavior.

## 3. Journey design behavior is a hard requirement

- A node represents **one single match**, not a team, week or competition.
- Keep favorite-team chronological match progression as the main interface.
- Each node shows match state both by icon/text and by visual treatment (not color alone).
- Competition accent differs between Premier League and FA Cup; an icon/motif reinforces this.
- Connecting path conveys chronology; use responsive one-sided mobile route rather than cramped left/right alternation.
- Clicking a node navigates to `/matches/:id` and must retain the matching fixture data.

## 4. Stadium map design behavior

- Geographic club/stadium positions; marker's match state uses the canonical selector, not separate manual labels.
- Upcoming/live/completed have distinct color treatment **plus popup text**.
- Filter markers by status, open a popup and follow the route to match details.
- OSM attribution stays visible; do not hide it under overlays.

## 5. Figma-to-code agent procedure

Provide the agent **one frame at a time**. Include its Figma link or screenshot; identify the exact source file and explicitly say what it may not change. Implement layout/spacing/typography first, then icons and interactions. Prefer working from local shared tokens over hardcoding arbitrary colors in every component.

Example:

```
Implement the attached Figma frame for the Match Journey screen in src/features/journey/JourneyPage.tsx.
Use shared tokens in src/styles/index.css and the existing match/teams/store modules.
Preserve the current node->match route, match status labels, competition differentiation,
responsive layout and keyboard focus. Do not edit src/data, src/types, src/services or
package.json. Do not change the feature scope. Return a list of modified files and any
remaining differences from the Figma design. Run typecheck/build if dependencies exist.
```

## 6. Review grid for each Figma page

Score each check Pass / Fix / Not applicable:
1. Correct content hierarchy and relative proportions.
2. Brand tokens close to Figma, no rogue colors.
3. Correct desktop structure, minimum 1440px.
4. Functional and readable phone layout at 375px.
5. Correct hover/active/disabled styles for key controls.
6. No overlap for long club names.
7. Meaningful alt text/ARIA labels and keyboard navigation.
8. No visual changes that break dynamic mock-data rendering.
9. No broken navigation or unwanted scroll areas.
10. No unnecessary animation jank.
