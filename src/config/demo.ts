/** Stable frozen demo time so a recorded demo still has live/upcoming/completed examples. */
export const DEMO_NOW = '2026-10-24T18:38:00+01:00';
export const DEMO_LEAGUE = 'English football · fictional 2026 demo season';
export const AI_MODE = import.meta.env.VITE_AI_MODE === 'live' ? 'live' : 'mock';
export const AI_MODEL = import.meta.env.VITE_OPENROUTER_MODEL || 'openai/gpt-4o-mini';
