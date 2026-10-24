import {it,expect} from 'vitest';
import {teams,competitions} from '../data/teams';
import {matches} from '../data/matches';
import {matchForStadium} from '../data/matches';
import {standings} from '../data/community';
it('uses known IDs, legal results, and valid time labels',()=>{
 const ids=new Set(teams.map(t=>t.id)); const cmp=new Set(competitions.map(c=>c.id));
 expect(new Set(matches.map(m=>m.id)).size).toBe(matches.length);
 for(const m of matches){
  expect(ids.has(m.homeTeamId)).toBe(true);expect(ids.has(m.awayTeamId)).toBe(true);expect(ids.has(m.venueTeamId)).toBe(true);
  expect(cmp.has(m.competitionId)).toBe(true);expect(m.homeTeamId).not.toBe(m.awayTeamId);
  expect(!Number.isNaN(new Date(m.kickoff).getTime())).toBe(true);
  expect(m.status==='upcoming').toBe(m.score===null);
  for(const e of m.events)expect([m.homeTeamId,m.awayTeamId]).toContain(e.teamId);
 }
 for(const s of standings){expect(ids.has(s.teamId)).toBe(true);expect(s.points).toBe(3*s.wins+s.draws);expect(s.played).toBe(s.wins+s.draws+s.losses);}
});

it('derives every stadium activity from canonical fixtures with the documented priority',()=>{
 expect(teams).toHaveLength(8);
 expect(matchForStadium('arsenal')?.id).toBe('m03');
 expect(matchForStadium('chelsea')?.id).toBe('m07');
 expect(matchForStadium('brighton')?.id).toBe('m06');
 expect(matchForStadium('newcastle')?.id).toBe('m08');
});
