import type { Match, Prediction, PredictionChoice, Standing } from '../types/domain';
import { getTeam } from '../data/teams';
export const formatKickoff = (kickoff:string):string => new Intl.DateTimeFormat('en-GB',{day:'numeric',month:'short',hour:'2-digit',minute:'2-digit',timeZone:'Europe/London'}).format(new Date(kickoff));
export const matchTeams = (match:Match)=>({home:getTeam(match.homeTeamId),away:getTeam(match.awayTeamId)});
export const outcome = (home:number,away:number):PredictionChoice => home===away?'draw':home>away?'home':'away';
/** Exact score = 5 points, correct 1X2 outcome only = 3 points, otherwise 0. */
export function predictionPoints(prediction:Pick<Prediction,'choice'|'exactHome'|'exactAway'>,match:Match):number{
  if(match.status!=='completed'||!match.score)return 0;
  if(prediction.exactHome===match.score.home&&prediction.exactAway===match.score.away)return 5;
  return prediction.choice===outcome(match.score.home,match.score.away)?3:0;
}
/** Snapshot standings deliberately exclude currently live and future matches. */
export function impactScenario(rows:Standing[],favoriteId:string,match:Match):string{
  const team=rows.find((row)=>row.teamId===favoriteId);
  if(!team)return 'Demo table context unavailable for this team.';
  if(match.competitionId!=='premier-league')return 'Cup results do not change league points.';
  if(![match.homeTeamId,match.awayTeamId].includes(favoriteId))return 'The effect of this match depends on other teams’ results.';
  if(match.status==='completed')return 'This finished fixture is already part of the fictional league snapshot where applicable.';
  const currentRank=rows.findIndex((row)=>row.teamId===favoriteId)+1;
  return `In this illustrative league snapshot, ${getTeam(favoriteId).shortName} are #${currentRank} on ${team.points} points. A win in their next league fixture would add 3 points, a draw 1, and a loss 0. Other fixtures may also change the positions.`;
}
