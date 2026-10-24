import {describe,it,expect} from 'vitest';
import {getMatch} from '../data/matches';
import {aiContext,offlineAnalysis} from './ai';
const prefs={favoriteTeamId:'arsenal',tone:'analytical' as const,length:'medium' as const,interests:['tactics' as const],personalizationConsent:false};
describe('AI factual guardrails',()=>{
 it('includes real demo match facts, prefs, and explicit fictional-data warning',()=>{
  const ctx=aiContext(getMatch('m01')!,prefs);
  expect(ctx).toContain('FICTIONAL');expect(ctx).toContain('2');expect(ctx).toContain('analytical');
 });
 it('labels what-if claims as hypothetical',()=>{
  const result=offlineAnalysis({match:getMatch('m01')!,preferences:prefs,question:'What if the lineup changed?'});
  expect(result.content).toContain('Hypothetical');expect(result.source).toBe('mock');
 });
});
