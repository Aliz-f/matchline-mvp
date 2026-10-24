# 07 — Five-minute live demo script

## Pre-demo setup (not part of five minutes)

- Browser at `/`, desktop width approx 1440px; preferably a separate incognito session so localStorage starts fresh.
- Use mock AI by default; if you have confirmed OpenRouter browser access and want real AI, keep a second browser profile prepared for offline fallback.
- Set favorite team Arsenal, confirm visible Journey statuses: m01 completed, m03 simulated live, m04 upcoming cup.
- Have predictions page and stadium map preloaded in extra tabs if Wi-Fi is unreliable.
- Practice transitions between tabs/routes and decide who talks at every moment.

## Minute 0:00–0:45 — Why Matchline

**Speaker 1:** "Traditional sports coverage tells every fan the same score. Matchline starts with your club and turns every fixture into an interactive chapter. Everything you're seeing is a working prototype with simulated match data."

**Action:** Open Journey. Point out the path and changing competition colors/status. Select Arsenal if needed.

## Minute 0:45–1:45 — Journey + match exploration

**Speaker 1:** "Every node is a match, not just a date or league round. Completed, live and upcoming matches look different; a cup game has a different visual identity."

**Action:** Click m01 (Arsenal–Chelsea) completed node. Point out 2–1 recap, event timeline, match stats and team-centered context.

## Minute 1:45–2:45 — AI personal story

**Speaker 2:** "This is where football coverage stops being passive. Ask the game a question in your own words; the assistant uses the score, events and preferences from our match model."

**Action:** Enter "What if Arsenal had not made that tactical adjustment?" or click the supplied `What if` chip. Show clear separation between known mock facts and hypothetical analysis. For maximum reliability, use local offline mode and explicitly call it a demo response; do not pretend it came from the model if mock.

## Minute 2:45–3:35 — Prediction and recognition

**Speaker 3:** "Before kickoff, supporters make a non-monetary prediction. Correct outcomes earn recognition; exact scores are worth more. This creates a reason to return without betting."

**Action:** Click Predictions and enter Arsenal–Newcastle 2–0. Save and show local confirmation and 5/3/0 scoring rules; note the current points don't increase until the event finishes.

## Minute 3:35–4:20 — Community and map

**Speaker 3:** "Fans also create meaning together. Match-linked discussions give predictions and opinions a home. Premium topic creation is our small demonstration of the freemium business model."

**Action:** Navigate to a discussion; add a reply. Optionally toggle Premium to create a new topic, then show Stadium Map, live marker and popup.

## Minute 4:20–5:00 — Why the ecosystem matters

**Speaker 1:** "The first user already gets personalized content. As more fans join, discussion and recognition can create stronger communities. Premium is our first planned revenue mechanism; media services and sponsors are later possibilities. Today we've demonstrated the interaction loop, not backend infrastructure or revenue traction."

**Final screen:** Return to Journey / brand message.

## Safe judge Q&A prompts

**Why no real sports API?** "We intentionally mocked a coherent football snapshot to validate experience under hackathon time constraints. Our TypeScript data contracts and selectors isolate the future provider integration."

**Is the AI real?** "The component supports OpenRouter directly with demo credentials. We also have an explicitly labeled offline example mode so the live presentation is resilient."

**Are predictions fair?** "The 5/3/0 score formula is deterministic, not assigned by AI. The prototype saves locally; real anti-cheat enforcement requires a backend."

**What can you charge for?** "The business model proposes a free core and expanded premium interactions, with future B2B media/insight products. We haven't validated willingness to pay."

**How do you protect users?** "The prototype doesn't send private conversations to B2B customers. We still need production-grade permissions, retention controls and moderation before release."
