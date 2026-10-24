import {Link} from 'react-router-dom';
import type {Match} from '../types/domain';
import {formatKickoff,matchTeams} from '../lib/football';
import {TeamBadge} from './TeamBadge';
export function MatchScore({match,compact=false}:{match:Match;compact?:boolean}){
 const {home,away}=matchTeams(match);
 return <Link to={`/matches/${match.id}`} className={`match-score ${compact?'compact':''}`}>
  <div className="match-score-teams"><TeamBadge teamId={home.id} size="sm"/><span>{home.shortName}</span><span className="score-num">{match.score?.home??'–'}</span></div>
  <div className="match-score-teams"><TeamBadge teamId={away.id} size="sm"/><span>{away.shortName}</span><span className="score-num">{match.score?.away??'–'}</span></div>
  <div className="match-score-meta"><span className={`status status-${match.status}`}>{match.status==='live'?`● ${match.minute}'`:match.status}</span><span>{formatKickoff(match.kickoff)}</span></div>
 </Link>;
}
