import {afterAll,beforeEach,describe,expect,it,vi} from 'vitest';
import {DEMO_NOW} from '../config/demo';
import {useAppStore} from './useAppStore';

// Vitest runs without browser localStorage; persistence is exercised manually in-browser.
const warn=vi.spyOn(console,'warn').mockImplementation(()=>undefined);

describe('local demo interactions',()=>{
  beforeEach(()=>useAppStore.getState().clearDemoState());

  it('accepts only future upcoming predictions against the frozen clock',()=>{
    const store=useAppStore.getState();
    expect(store.savePrediction({matchId:'m03',exactHome:2,exactAway:1}).ok).toBe(false);
    expect(store.savePrediction({matchId:'m01',exactHome:2,exactAway:1}).ok).toBe(false);
    expect(store.savePrediction({matchId:'m04',exactHome:2,exactAway:1}).ok).toBe(true);
    const saved=useAppStore.getState().predictions.find((prediction)=>prediction.matchId==='m04');
    expect(saved?.submittedAt).toBe(DEMO_NOW);
    expect(saved?.choice).toBe('home');
  });

  it('validates score bounds and gates new topics to the premium demo',()=>{
    let store=useAppStore.getState();
    expect(store.savePrediction({matchId:'m04',exactHome:16,exactAway:0}).ok).toBe(false);
    expect(store.addTopic('m04','A local topic')).toBe(false);
    store.setMembership('premium');
    store=useAppStore.getState();
    expect(store.addTopic('m04','A local topic')).toBe(true);
    expect(useAppStore.getState().posts.some((post)=>post.text==='A local topic')).toBe(true);
  });
});

afterAll(()=>warn.mockRestore());
