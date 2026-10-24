/** Single source of truth for Mockline's demo domain. Do not duplicate these unions in features. */
export type CompetitionId = 'premier-league' | 'fa-cup';
export type MatchStatus = 'upcoming' | 'live' | 'completed';
export type Tone = 'analytical' | 'humorous' | 'emotional' | 'neutral';
export type ContentLength = 'short' | 'medium' | 'detailed';
export type Interest = 'tactics' | 'players' | 'standings';
export type Membership = 'free' | 'premium';
export type PredictionChoice = 'home' | 'draw' | 'away';

export interface Team {
  id: string;
  name: string;
  shortName: string;
  abbr: string;
  primaryColor: string;
  secondaryColor: string;
  stadium: { name: string; city: string; lat: number; lng: number };
}
export interface Competition { id: CompetitionId; name: string; color: string; motif: string; }
export interface MatchEvent { minute: number; type: 'goal' | 'yellow-card' | 'substitution'; teamId: string; player: string; detail?: string; }
export interface MatchStats { possession: [number, number]; shots: [number, number]; shotsOnTarget: [number, number]; corners: [number, number]; }
export interface Match {
  id: string; competitionId: CompetitionId; round: string; kickoff: string;
  homeTeamId: string; awayTeamId: string; status: MatchStatus;
  score: { home: number; away: number } | null;
  minute?: number;
  venueTeamId: string;
  headline: string;
  preMatchStory: string;
  postMatchStory?: string;
  events: MatchEvent[];
  stats?: MatchStats;
  lineups?: { home: string[]; away: string[] };
}
export interface Standing { teamId: string; played: number; wins: number; draws: number; losses: number; goalDifference: number; points: number; }
export interface Preferences {
  favoriteTeamId: string;
  tone: Tone;
  length: ContentLength;
  interests: Interest[];
  personalizationConsent: boolean;
}
export interface DemoProfile { id: string; name: string; teamId: string; membership: Membership; avatar: string; }
export interface Prediction {
  id: string; userId: string; matchId: string; choice: PredictionChoice;
  exactHome: number; exactAway: number; submittedAt: string;
}
export interface DiscussionPost { id: string; matchId: string; author: string; text: string; likes: number; createdAt: string; reported?: boolean; }
export interface Ranking { userId: string; points: number; correctResults: number; exactScores: number; }
export interface ChatMessage { id: string; role: 'user' | 'assistant'; content: string; timestamp: string; source: 'mock' | 'openrouter' | 'user'; }
