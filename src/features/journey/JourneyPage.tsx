import {useEffect,useMemo,useRef,useState} from 'react';
import type {CSSProperties} from 'react';
import {Link} from 'react-router-dom';
import {ArrowRight,ArrowUpRight,ChevronDown,GitBranch,LocateFixed,MessageCircle,Route} from 'lucide-react';
import {useAppStore} from '../../store/useAppStore';
import {matchesForTeam} from '../../data/matches';
import {getCompetition,getTeam,teams} from '../../data/teams';
import {formatKickoff} from '../../lib/football';
import {DEMO_NOW} from '../../config/demo';
import {TeamBadge} from '../../components/TeamBadge';
import type {DiscussionPost,Match} from '../../types/domain';
import {buildStops,discussionOrigin,offshoot,roadPath,ROAD_WIDTH,stageHeight,focusIndex,unfoldingX} from './journeyLayout';
import type {Stop} from './journeyLayout';
import halo from './assets/next-match-halo.svg';
import markerPlayed from './assets/marker-played.svg';
import markerNext from './assets/marker-next.svg';
import markerScheduled from './assets/marker-scheduled.svg';
import statusDot from './assets/status-dot.svg';
import './journey.css';

type Result='WIN'|'DRAW'|'LOSS';
const london=(options:Intl.DateTimeFormatOptions)=>new Intl.DateTimeFormat('en-GB',{timeZone:'Europe/London',...options});
const dayLabel=(kickoff:string)=>london({weekday:'short',day:'2-digit',month:'short'}).format(new Date(kickoff)).replace(',','');
const timeLabel=(kickoff:string)=>london({hour:'2-digit',minute:'2-digit',timeZoneName:'short'}).format(new Date(kickoff));
const monthLabel=(kickoff:string)=>london({month:'long'}).format(new Date(kickoff));
const yearLabel=(kickoff:string)=>london({year:'numeric'}).format(new Date(kickoff));
const style=(vars:Record<string,string|number>)=>vars as CSSProperties;
const px=(value:number)=>`${value}px`;

/** Scales the fixed 1312px Figma stage down to the panel width so the road composition never collides. */
function useStageZoom(){
 const ref=useRef<HTMLDivElement>(null);
 const [zoom,setZoom]=useState(1);
 useEffect(()=>{
  const frame=ref.current;
  if(!frame)return;
  const observer=new ResizeObserver(([entry])=>{if(entry)setZoom(Math.min(1,entry.contentRect.width/ROAD_WIDTH))});
  observer.observe(frame);
  return()=>observer.disconnect();
 },[]);
 return {ref,zoom};
}

function resultFor(match:Match,teamId:string):Result|undefined{
 if(!match.score)return undefined;
 const mine=match.homeTeamId===teamId?match.score.home:match.score.away;
 const theirs=match.homeTeamId===teamId?match.score.away:match.score.home;
 return mine>theirs?'WIN':mine===theirs?'DRAW':'LOSS';
}
const fixtureTitle=(match:Match)=>`${getTeam(match.homeTeamId).shortName} v ${getTeam(match.awayTeamId).shortName}`;
const opponentOf=(match:Match,teamId:string)=>getTeam(match.homeTeamId===teamId?match.awayTeamId:match.homeTeamId);
const venueOf=(match:Match)=>getTeam(match.venueTeamId).stadium.name;
function fixtureLabel(match:Match){
 const comp=getCompetition(match.competitionId);
 const cup=match.competitionId==='fa-cup'?`${comp.motif} FA CUP · `:'';
 return `${cup}${dayLabel(match.kickoff)} · ${match.round}`.toUpperCase();
}
function chapterFor(journey:Match[]){
 const first=journey[0]?.kickoff,last=journey.at(-1)?.kickoff;
 if(!first||!last)return {name:'THE SEASON',range:''};
 const month=new Date(first).getUTCMonth();
 const name=month>=8&&month<=10?'AUTUMN':month===11||month<=1?'WINTER':month<=4?'SPRING':'SUMMER';
 const range=monthLabel(first)===monthLabel(last)?`${monthLabel(first)} ${yearLabel(last)}`:`${monthLabel(first)} — ${monthLabel(last)} ${yearLabel(last)}`;
 return {name:`THE ${name} CHAPTER`,range};
}
function countdown(match:Match){
 if(match.status==='live')return `LIVE · ${match.minute}'`;
 const days=Math.round((new Date(match.kickoff).getTime()-new Date(DEMO_NOW).getTime())/86_400_000);
 return days<=0?'UP NEXT · TODAY':days===1?'UP NEXT · TOMORROW':`UP NEXT · IN ${days} DAYS`;
}

function ClubShield({teamId,size}:{teamId:string;size:'lg'|'md'|'sm'}){
 const team=getTeam(teamId);
 return <span className={`jr-shield jr-shield-${size}`} title={team.name} style={style({'--shield':team.primaryColor,'--shield-text':team.secondaryColor})}><b>{team.abbr}</b></span>;
}

function StopNode({stop,teamId}:{stop:Stop;teamId:string}){
 const {match}=stop;
 const opponent=opponentOf(match,teamId);
 const label=`Open ${fixtureTitle(match)}`;
 if(stop.kind==='played'){
  const result=resultFor(match,teamId);
  return <Link to={`/matches/${match.id}`} className={`jr-node jr-node-played result-${result?.toLowerCase()}`} aria-label={label}>
   <small>FULL TIME</small><b>{match.score?.home}–{match.score?.away}</b><em>{result}</em>
  </Link>;
 }
 if(stop.kind==='focus'){
  const home=getTeam(match.homeTeamId),away=getTeam(match.awayTeamId);
  return <><img className="jr-halo" src={halo} alt="" width={164} height={164}/><Link to={`/matches/${match.id}`} className="jr-node jr-node-focus" aria-label={label}>
   <ClubShield teamId={opponent.id} size="md"/>
   <b>{home.abbr} v {away.abbr}</b>
   <small>{match.status==='live'&&match.score?`${match.score.home}–${match.score.away} · ${match.minute}'`:timeLabel(match.kickoff)}</small>
  </Link></>;
 }
 return <Link to={`/matches/${match.id}`} className="jr-node jr-node-scheduled" aria-label={label}>
  <ClubShield teamId={opponent.id} size="sm"/><small>SCHEDULED</small>
 </Link>;
}

function StopCopy({stop,teamId}:{stop:Stop;teamId:string}){
 const {match}=stop;
 if(stop.kind==='focus'){
  const live=match.status==='live';
  return <div className="jr-focus-card">
   <div className="jr-focus-status"><span><img src={statusDot} alt="" width={6} height={6}/>{countdown(match)}</span><span>{match.competitionId==='fa-cup'?`${getCompetition(match.competitionId).motif} FA CUP · `:''}{match.round.toUpperCase()}</span></div>
   <div className="jr-focus-title"><h3>{fixtureTitle(match)}{live&&match.score&&<em> {match.score.home}–{match.score.away}</em>}</h3><p>{dayLabel(match.kickoff)} · {timeLabel(match.kickoff)} · {venueOf(match)}</p></div>
   <div className="jr-focus-actions">
    <Link to={`/community?match=${match.id}`} className="jr-chat-button"><MessageCircle size={15}/>{live?'Join the live chat':'Join pre-match chat'}</Link>
    <Link to={`/matches/${match.id}`} className="jr-quiet-link"><ArrowUpRight size={15}/>Open match centre</Link>
   </div>
  </div>;
 }
 const played=stop.kind==='played';
 return <div className="jr-copy">
  <span>{fixtureLabel(match)}</span>
  <h3>{fixtureTitle(match)}</h3>
  <p>{played?`${venueOf(match)} · ${match.venueTeamId===teamId?'Home':'Away'}`:`${timeLabel(match.kickoff)} · ${venueOf(match)}`}</p>
  {played&&<p className="jr-headline">{match.headline}</p>}
 </div>;
}

function Discussion({stop,post,count}:{stop:Stop;post:DiscussionPost;count:number}){
 const kind=stop.kind==='played'?'POST-MATCH':stop.match.status==='live'?'IN PLAY':'BEFORE THE WHISTLE';
 return <Link to={`/community?match=${stop.match.id}`} className="jr-discussion">
  <span className="jr-discussion-type">{stop.kind==='played'?<GitBranch size={14}/>:<MessageCircle size={14}/>}{kind}{stop.kind==='focus'&&<i aria-label="Active now"/>}</span>
  <strong>{post.text}</strong>
  <span className="jr-discussion-meta">{count} {count===1?'reply':'replies'} · Join the debate<ArrowUpRight size={14}/></span>
 </Link>;
}

export function JourneyPage(){
 const prefs=useAppStore(s=>s.preferences);
 const setFavoriteTeam=useAppStore(s=>s.setFavoriteTeam);
 const posts=useAppStore(s=>s.posts);
 const [view,setView]=useState<'journey'|'fixtures'>('journey');
 const team=getTeam(prefs.favoriteTeamId);
 const journey=useMemo(()=>matchesForTeam(team.id),[team.id]);
 const stops=useMemo(()=>buildStops(journey),[journey]);
 const focus=focusIndex(journey);
 const form=journey.filter(m=>m.status==='completed').slice(-5);
 const chapter=chapterFor(journey);
 const threads=useMemo(()=>new Map(journey.map(m=>{const visible=posts.filter(p=>p.matchId===m.id&&!p.reported).sort((a,b)=>b.likes-a.likes);return [m.id,{post:visible[0],count:visible.length}] as const})),[journey,posts]);
 const height=stageHeight(stops);
 const stage=useStageZoom();
 const lastStop=stops.at(-1);
 return <div className="jr-page">
  <section className="jr-header">
   <div className="jr-identity">
    <ClubShield teamId={team.id} size="lg"/>
    <div><p className="jr-eyebrow">ENGLISH FOOTBALL / 2026–27</p><h1>THE {team.name.toUpperCase()} MATCHLINE</h1><p className="jr-lede">The results behind us. The possibilities ahead.</p></div>
   </div>
   <div className="jr-team-controls">
    <label className="jr-switch">Switch team<select value={team.id} onChange={e=>setFavoriteTeam(e.target.value)} aria-label="Switch favorite team">{teams.map(t=><option value={t.id} key={t.id}>{t.name}</option>)}</select><ChevronDown size={15} aria-hidden="true"/></label>
    {form.length>0&&<div className="jr-form" aria-label="Recent results, oldest first">LAST {form.length}{form.map(match=>{const result=resultFor(match,team.id);return <b className={`result-${result?.toLowerCase()}`} key={match.id} title={`${fixtureTitle(match)}: ${result}`}>{result?.[0]}</b>})}</div>}
   </div>
  </section>

  <div className="jr-toolbar">
   <div className="jr-tabs" role="tablist" aria-label="Journey view">
    <button role="tab" aria-selected={view==='journey'} className={view==='journey'?'active':''} onClick={()=>setView('journey')}><Route size={16}/>Season journey</button>
    <button role="tab" aria-selected={view==='fixtures'} className={view==='fixtures'?'active':''} onClick={()=>setView('fixtures')}>Fixtures &amp; results</button>
   </div>
   <div className="jr-key">
    <span><img src={markerPlayed} alt="" width={9} height={9}/>Played</span>
    <span><img src={markerNext} alt="" width={9} height={9}/>Up next</span>
    <span><img src={markerScheduled} alt="" width={9} height={9}/>Scheduled</span>
    <span><MessageCircle size={14}/>Fan discussions</span>
   </div>
  </div>

  {view==='fixtures'?<section className="fixture-results">{journey.map((match,i)=><div className="fixture-result" key={match.id}><span>{String(i+1).padStart(2,'0')}</span><TeamBadge teamId={match.homeTeamId} size="sm"/><strong>{fixtureTitle(match)}</strong><b>{match.score?`${match.score.home}–${match.score.away}`:formatKickoff(match.kickoff)}</b><Link to={`/matches/${match.id}`}>Open <ArrowRight size={14}/></Link></div>)}</section>
  :<section className="jr-panel" aria-label={`${team.name} season journey`}>
   <div className="jr-panel-head">
    <p><b>{chapter.name}</b><span>{chapter.range}</span></p>
    {focus>=0&&<button type="button" onClick={()=>document.getElementById('jr-focus')?.scrollIntoView({behavior:'smooth',block:'center'})}><LocateFixed size={14}/>Jump to next match</button>}
   </div>
   <div className="jr-stage-frame" ref={stage.ref}><div className="jr-stage" style={style({'--stage-height':`${height}px`,zoom:stage.zoom})}>
    <span className="jr-so-far">SEASON SO FAR ↓</span>
    <svg className="jr-road" viewBox={`0 0 1312 ${height}`} preserveAspectRatio="none" aria-hidden="true">
     <path className="jr-road-base" d={roadPath(stops)}/>
     <path className="jr-road-played" d={roadPath(stops,0,focus<0?stops.length-1:focus)}/>
     {focus>=0&&<path className="jr-road-ahead" d={roadPath(stops,focus)}/>}
     {stops.filter(stop=>threads.get(stop.match.id)?.post).map(stop=>{const [a,b]=offshoot(stop);return <line key={stop.match.id} className="jr-offshoot" x1={a.x} y1={a.y} x2={b.x} y2={b.y}/>})}
    </svg>
    <ol className="jr-stops">
     {stops.map(stop=>{
      const thread=threads.get(stop.match.id);
      const card=discussionOrigin(stop);
      return <li key={stop.match.id} id={stop.kind==='focus'?'jr-focus':undefined} className={`jr-stop jr-stop-${stop.kind} jr-side-${stop.side} competition-${stop.match.competitionId}`} style={style({'--x':px(stop.x),'--y':`${stop.y}px`,'--card-x':px(card.x),'--card-y':`${card.y}px`})}>
       <StopNode stop={stop} teamId={team.id}/>
       <StopCopy stop={stop} teamId={team.id}/>
       {thread?.post&&<Discussion stop={stop} post={thread.post} count={thread.count}/>}
      </li>;
     })}
    </ol>
    {lastStop&&<p className="jr-unfolding" style={style({'--x':px(unfoldingX(stops)),'--y':`${lastStop.y+28}px`})}>The season keeps unfolding.&nbsp; ↓</p>}
   </div></div>
  </section>}

  <div className="jr-explainer">
   <span>Follow the road down: results → your next match → the games ahead.</span>
   <span>Small detours. Big opinions. Every conversation belongs to a match.</span>
  </div>
 </div>;
}
