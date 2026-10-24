import {lazy,Suspense} from 'react';
import {BrowserRouter,Routes,Route,Navigate} from 'react-router-dom';
import {Shell} from './Shell';
import {useAppStore} from '../store/useAppStore';
const JourneyPage=lazy(()=>import('../features/journey/JourneyPage').then(({JourneyPage})=>({default:JourneyPage})));
const MatchesPage=lazy(()=>import('../features/matches/MatchPages').then(({MatchesPage})=>({default:MatchesPage})));
const MatchDetailsPage=lazy(()=>import('../features/matches/MatchPages').then(({MatchDetailsPage})=>({default:MatchDetailsPage})));
const StadiumPage=lazy(()=>import('../features/map/StadiumPage').then(({StadiumPage})=>({default:StadiumPage})));
const PredictionsPage=lazy(()=>import('../features/predictions/PredictionsPage').then(({PredictionsPage})=>({default:PredictionsPage})));
const CommunityPage=lazy(()=>import('../features/community/CommunityPage').then(({CommunityPage})=>({default:CommunityPage})));
const StandingsPage=lazy(()=>import('../features/leaderboard/StandingsPage').then(({StandingsPage})=>({default:StandingsPage})));
const PreferencesPage=lazy(()=>import('../features/preferences/PreferencesPage').then(({PreferencesPage})=>({default:PreferencesPage})));
const PremiumPage=lazy(()=>import('../features/premium/PremiumPage').then(({PremiumPage})=>({default:PremiumPage})));
const WelcomePage=lazy(()=>import('../features/preferences/WelcomePage').then(({WelcomePage})=>({default:WelcomePage})));
const HowItWorksPage=lazy(()=>import('../features/how-it-works/HowItWorksPage').then(({HowItWorksPage})=>({default:HowItWorksPage})));
function Home(){const complete=useAppStore(s=>s.onboardingComplete);return complete?<JourneyPage/>:<Navigate to="/welcome" replace/>}
function Loading(){return <div className="page"><p className="muted">Loading Matchline…</p></div>}
export default function App(){return <BrowserRouter><Suspense fallback={<Loading/>}><Routes><Route element={<Shell/>}>
 <Route index element={<Home/>}/><Route path="welcome" element={<WelcomePage/>}/><Route path="matches" element={<MatchesPage/>}/><Route path="matches/:id" element={<MatchDetailsPage/>}/>
 <Route path="stadiums" element={<StadiumPage/>}/><Route path="predictions" element={<PredictionsPage/>}/>
 <Route path="community" element={<CommunityPage/>}/><Route path="standings" element={<StandingsPage/>}/>
 <Route path="preferences" element={<PreferencesPage/>}/><Route path="premium" element={<PremiumPage/>}/>
 <Route path="how-it-works" element={<HowItWorksPage/>}/>
 <Route path="*" element={<Navigate to="/" replace/>}/>
 </Route></Routes></Suspense></BrowserRouter>}
