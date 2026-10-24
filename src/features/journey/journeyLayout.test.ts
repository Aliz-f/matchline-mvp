import {describe,expect,it} from 'vitest';
import {matchesForTeam} from '../../data/matches';
import {buildStops,focusIndex,roadPath} from './journeyLayout';

describe('season journey layout',()=>{
 const journey=matchesForTeam('arsenal');
 const stops=buildStops(journey);

 it('keeps one stop per seeded fixture in chronological order',()=>{
  expect(stops.map(stop=>stop.match.id)).toEqual(journey.map(match=>match.id));
  expect(stops.every((stop,i)=>i===0||stop.y>stops[i-1]!.y)).toBe(true);
 });

 it('highlights the live fixture before any upcoming one',()=>{
  const focus=focusIndex(journey);
  expect(journey[focus]?.status).toBe('live');
  expect(stops.filter(stop=>stop.kind==='focus')).toHaveLength(1);
  expect(stops.slice(0,focus).every(stop=>stop.kind==='played')).toBe(true);
 });

 it('routes the road through every stop',()=>{
  const path=roadPath(stops);
  const [first,...rest]=stops;
  expect(path.startsWith(`M${first!.x} 24 V${first!.y}`)).toBe(true);
  for(const stop of rest)expect(path).toContain(`${stop.x} ${stop.y}`);
 });
});
