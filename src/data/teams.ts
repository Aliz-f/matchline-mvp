import type { Team, Competition } from '../types/domain';

/** Stadium coordinates are approximate real-world locators; all matches and results are fictitious. */
export const teams: Team[] = [
  { id:'arsenal', name:'Arsenal', shortName:'Arsenal', abbr:'ARS',primaryColor:'#ef4444',secondaryColor:'#ffffff',stadium:{name:'Emirates Stadium',city:'London',lat:51.5549,lng:-0.1084} },
  { id:'liverpool', name:'Liverpool', shortName:'Liverpool', abbr:'LIV',primaryColor:'#dc2626',secondaryColor:'#fef2f2',stadium:{name:'Anfield',city:'Liverpool',lat:53.4308,lng:-2.9608} },
  { id:'man-city', name:'Manchester City', shortName:'Man City', abbr:'MCI',primaryColor:'#60a5fa',secondaryColor:'#0f172a',stadium:{name:'Etihad Stadium',city:'Manchester',lat:53.4831,lng:-2.2004} },
  { id:'chelsea', name:'Chelsea',shortName:'Chelsea',abbr:'CHE',primaryColor:'#2563eb',secondaryColor:'#ffffff',stadium:{name:'Stamford Bridge',city:'London',lat:51.4817,lng:-0.1910} },
  { id:'newcastle', name:'Newcastle United',shortName:'Newcastle',abbr:'NEW',primaryColor:'#e5e7eb',secondaryColor:'#111827',stadium:{name:"St James' Park",city:'Newcastle',lat:54.9750,lng:-1.6217} },
  { id:'brighton', name:'Brighton & Hove Albion',shortName:'Brighton',abbr:'BHA',primaryColor:'#3b82f6',secondaryColor:'#ffffff',stadium:{name:'Amex Stadium',city:'Brighton',lat:50.8619,lng:-0.0838} },
  { id:'man-united', name:'Manchester United',shortName:'Man United',abbr:'MUN',primaryColor:'#f43f5e',secondaryColor:'#ffffff',stadium:{name:'Old Trafford',city:'Manchester',lat:53.4631,lng:-2.2913} },
  { id:'tottenham', name:'Tottenham Hotspur',shortName:'Spurs',abbr:'TOT',primaryColor:'#cbd5e1',secondaryColor:'#111827',stadium:{name:'Tottenham Hotspur Stadium',city:'London',lat:51.6043,lng:-0.0663} },
];
export const competitions: Competition[] = [
  {id:'premier-league',name:'English Premier League · Demo',color:'#fb923c',motif:'★'},
  {id:'fa-cup',name:'FA Cup · Demo',color:'#a78bfa',motif:'◆'},
];
export const getTeam = (id: string): Team => { const item = teams.find((team) => team.id === id); if (!item) throw new Error(`Unknown team: ${id}`); return item; };
export const getCompetition = (id: Competition['id']): Competition => { const item=competitions.find((competition)=>competition.id===id); if(!item)throw new Error(`Unknown competition: ${id}`);return item; };
