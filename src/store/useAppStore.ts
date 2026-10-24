import {create} from 'zustand';
import {persist} from 'zustand/middleware';
import type {DiscussionPost,Interest,Membership,Prediction,Preferences,Tone,ContentLength} from '../types/domain';
import {samplePosts} from '../data/community';
import {getMatch} from '../data/matches';
import {DEMO_NOW} from '../config/demo';
import {outcome} from '../lib/football';

export type PredictionInput=Pick<Prediction,'matchId'|'exactHome'|'exactAway'>;
interface AppState {
  preferences:Preferences; membership:Membership;
  predictions:Prediction[];posts:DiscussionPost[];
  onboardingComplete:boolean;
  setFavoriteTeam:(id:string)=>void;
  setTone:(tone:Tone)=>void;setContentLength:(length:ContentLength)=>void;
  toggleInterest:(interest:Interest)=>void;
  setPersonalizationConsent:(enabled:boolean)=>void;
  setMembership:(membership:Membership)=>void;
  completeOnboarding:()=>void;
  savePrediction:(input:PredictionInput)=>{ok:boolean;reason?:string};
  addReply:(matchId:string,text:string)=>boolean;
  addTopic:(matchId:string,text:string)=>boolean;
  likePost:(id:string)=>void;reportPost:(id:string)=>void;
  clearDemoState:()=>void;
}
const initialPreferences:Preferences={favoriteTeamId:'arsenal',tone:'analytical',length:'medium',interests:['tactics','standings'],personalizationConsent:false};
const initial=()=>({preferences:{...initialPreferences,interests:[...initialPreferences.interests]},membership:'free' as Membership,predictions:[{id:'demo-you-m01',userId:'you',matchId:'m01',choice:'home',exactHome:2,exactAway:1,submittedAt:'2026-10-09T14:00:00Z'}] as Prediction[],posts:samplePosts.map(p=>({...p})),onboardingComplete:false});
export const useAppStore=create<AppState>()(persist((set,get)=>({
 ...initial(),
 setFavoriteTeam:(id)=>set(s=>({preferences:{...s.preferences,favoriteTeamId:id}})),
 setTone:(tone)=>set(s=>({preferences:{...s.preferences,tone}})),
 setContentLength:(length)=>set(s=>({preferences:{...s.preferences,length}})),
 toggleInterest:(interest)=>set(s=>({preferences:{...s.preferences,interests:s.preferences.interests.includes(interest)?s.preferences.interests.filter(i=>i!==interest):[...s.preferences.interests,interest]}})),
 setPersonalizationConsent:(enabled)=>set(s=>({preferences:{...s.preferences,personalizationConsent:enabled}})),
 setMembership:(membership)=>set({membership}),
 completeOnboarding:()=>set({onboardingComplete:true}),
 savePrediction:({matchId,exactHome,exactAway})=>{
  const match=getMatch(matchId);
  if(!match||match.status!=='upcoming'||new Date(match.kickoff).getTime()<=new Date(DEMO_NOW).getTime())return{ok:false,reason:'This simulated match is no longer open for predictions.'};
  if(!Number.isInteger(exactHome)||!Number.isInteger(exactAway)||exactHome<0||exactAway<0||exactHome>15||exactAway>15)return{ok:false,reason:'Use whole-number scores between 0 and 15.'};
  const choice=outcome(exactHome,exactAway);
  set(s=>({predictions:[...s.predictions.filter(p=>p.matchId!==matchId),{id:`you-${matchId}`,userId:'you',matchId,choice,exactHome,exactAway,submittedAt:DEMO_NOW}]}));
  return{ok:true};
 },
 addReply:(matchId,text)=>{
  if(!getMatch(matchId)||!text.trim()||text.length>500)return false;
  set(s=>({posts:[...s.posts,{id:`local-${Date.now()}`,matchId,author:'You',text:text.trim(),likes:0,createdAt:DEMO_NOW}]}));return true;
 },
 addTopic:(matchId,text)=>{
  if(get().membership!=='premium')return false;
  return get().addReply(matchId,text);
 },
 likePost:(id)=>set(s=>({posts:s.posts.map(p=>p.id===id?{...p,likes:p.likes+1}:p)})),
 reportPost:(id)=>set(s=>({posts:s.posts.map(p=>p.id===id?{...p,reported:true}:p)})),
 clearDemoState:()=>set(initial())
 }),{name:'matchline-demo-v1',version:1,partialize:(s)=>({preferences:s.preferences,membership:s.membership,predictions:s.predictions,posts:s.posts,onboardingComplete:s.onboardingComplete})}));
