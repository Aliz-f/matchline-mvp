import {describe,expect,it} from 'vitest';
import {predictionPoints,outcome} from './football';
import {getMatch} from '../data/matches';
const completed=getMatch('m01')!;
const upcoming=getMatch('m04')!;
describe('deterministic predictions',()=>{
  it('identifies outcomes',()=>{expect(outcome(2,1)).toBe('home');expect(outcome(0,0)).toBe('draw');expect(outcome(0,2)).toBe('away');});
  it('awards five points for an exact score',()=>{expect(predictionPoints({choice:'home',exactHome:2,exactAway:1},completed)).toBe(5);});
  it('awards three for the correct outcome, not score',()=>{expect(predictionPoints({choice:'home',exactHome:3,exactAway:0},completed)).toBe(3);});
  it('awards none for incorrect predictions or unfinished matches',()=>{expect(predictionPoints({choice:'draw',exactHome:0,exactAway:0},completed)).toBe(0);expect(predictionPoints({choice:'home',exactHome:2,exactAway:1},upcoming)).toBe(0);});
});
