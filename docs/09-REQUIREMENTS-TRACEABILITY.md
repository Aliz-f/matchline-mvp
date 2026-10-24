# 09 — Traceability to the supplied Matchline business requirements

The source proposal differentiates **Core** vs **Extension**. This delivery is a **front-end-only simulated demo**, not a claim that all Core requirements are production-complete. This document prevents confusion when describing the implementation to judges.

Legend: **Demo** (visible & interactive with local mock data), **Partial** (visual/simulated aspect but not production capability), **Deferred** (not in the hackathon demo).

| Source requirement | Prototype status | Evidence / limitation |
| --- | --- | --- |
| FR-01 Registration & profiles | Partial | Preferences and fictional user profile; no registration/sign-in/authentication |
| FR-02 Content preferences | Demo | Team, tone, length, interests in `/preferences`; local persistence only |
| FR-03 Personalized match content | Partial | Match context varies by selected team/preferences; optional grounded AI; no generation pipeline at scale |
| FR-04 Cross-match impact | Partial | Transparent points scenario; no full multi-match standings recomputation |
| FR-05 Match Journey | Demo | Chronological selected-team path with state and competition differentiation |
| FR-06 Stadium Map | Demo | Geographic pins, status, match link; simulated match state |
| FR-07 Match information | Partial | Fixture scores, events, sample stats and lineups; not a sports provider feed |
| FR-08 AI what-if conversation | Demo/Partial | Browser OpenRouter adapter + offline response; no evidence of counterfactual truth |
| FR-09 Interaction-driven personalization | Partial | Explicit user settings, not hidden behavior learning or opt-in inference pipeline |
| FR-10 Fan discussions | Partial | Seeded and locally editable posts; simulated topic creation and premium gate |
| FR-11 Moderation | Partial | Client-side report-to-hide only; no authorized reviewers or safety workflow |
| FR-12 Predictions | Partial | Score choice/save and frozen-time eligibility; AI extraction from conversations deferred; no server-side integrity |
| FR-13 Leaderboards | Partial | Deterministic scoring helper, seeded rival fans, own stored ranking; no real aggregate competition |
| FR-14 Weekly comics | Deferred (Extension) | No comics in demo |
| FR-15 Sharing/notifications | Deferred (Extension) | No notifications or sharing service |
| FR-16 Subscriptions | Partial | Free/Premium entitlements preview only; no checkout/account/billing |
| FR-17 Aggregated insights | Deferred (Extension) | No privacy-preserving insight products |
| FR-18 Commercial APIs | Deferred (Extension) | No external API products |
| FR-19 Ads/sponsorship | Deferred (Extension) | No commercial ad placements |
| FR-20 Sports data integration | Deferred/Mock | Canonical TypeScript fixture adapter; no upstream provider integration |
| FR-21 Platform administration | Deferred | No admin backend or operational monitoring |

## Non-functional targets vs actual status

The business proposal NFR-01–NFR-18 are **production aspirations**, not verified properties of this prototype:

- NFR-01 Performance / NFR-02 AI response: not load tested, optional OpenRouter timeouts and mock stable speed only.
- NFR-03 Availability / NFR-04 Scalability: static demo host dependency; no measured availability/scalability.
- NFR-05 Security / NFR-06 Privacy: **not production compliant**; browser OpenRouter key intentionally exposed if enabled, localStorage stores preferences and seeded content. No auth, consent management system, retention or deletion export mechanism beyond a reset button.
- NFR-07 Integrity: input validations and deterministic scoring in client only; no tamper-resistant backend.
- NFR-08 Factuality: source-grounded prompt and clear UI labels; cannot guarantee model truth.
- NFR-09 Usability / NFR-10 Accessibility: responsive layout and keyboard/ARIA basics; WCAG 2.2 AA audit not performed.
- NFR-11 Maintainability / NFR-12 Interoperability: modular typed code and tests; provider integrations deferred.
- NFR-13 Observability / NFR-14 Data freshness: no monitoring and no live feeds.
- NFR-15 AI cost: manual temporary key and request limit/timeout; no authoritative server quota or cost enforcement.
- NFR-16 Content safety: client report simulation only; content moderation service deferred.
- NFR-17 Extensibility: team and competition data models allow extension but not tested with new sports.
- NFR-18 B2B protection: no B2B exports, insights or API products.

## Business model outcomes actually communicated

- **Immediate B2C value:** team-centered visual match experience, locally customized storytelling and AI questions.
- **Engagement:** non-monetary predictions, basic recognition and local discussions demonstrate interaction loops.
- **Freemium concept:** premium discussion-topic capability demo (no real conversion or payments).
- **Indirect effects:** conceptual only; fictional peer participation cannot validate real same-side network effects, willingness to pay or advertiser demand.
- **B2B** remains future scope; do not mention a working sports-media insight API in demo Q&A.
