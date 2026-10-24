import type {CSSProperties} from 'react';
import {getTeam} from '../data/teams';
export function TeamBadge({teamId,size='md'}:{teamId:string;size?:'sm'|'md'|'lg'}){
 const team=getTeam(teamId);
 return <span className={`team-badge badge-${size}`} title={team.name} style={{'--team-color':team.primaryColor} as CSSProperties}>{team.abbr.slice(0,2)}</span>;
}
