import type { Match } from '../types/domain';
/** Fictional October 2026 demo season snapshot. Dates are fixed to make the demo reproducible. */
export const matches: Match[] = [
  {
    id:'m01',competitionId:'premier-league',round:'Round 7',kickoff:'2026-10-10T17:30:00+01:00',homeTeamId:'arsenal',awayTeamId:'chelsea',venueTeamId:'arsenal',status:'completed',score:{home:2,away:1},
    headline:'Arsenal make a late comeback against Chelsea',
    preMatchStory:'A London derby with control of midfield at the center of the contest.',
    postMatchStory:'Chelsea struck first, but Arsenal responded with sustained pressure and a late winner. The final score was 2–1.',
    stats:{possession:[59,41],shots:[16,9],shotsOnTarget:[7,4],corners:[8,3]},
    events:[{minute:21,type:'goal',teamId:'chelsea',player:'Chelsea No. 9'},{minute:54,type:'goal',teamId:'arsenal',player:'Arsenal No. 8'},{minute:87,type:'goal',teamId:'arsenal',player:'Arsenal No. 11'}],
    lineups:{home:['Arsenal GK','Arsenal DEF 2','Arsenal DEF 4','Arsenal MID 8','Arsenal FWD 11'],away:['Chelsea GK','Chelsea DEF 3','Chelsea MID 6','Chelsea MID 10','Chelsea FWD 9']}
  },
  {
    id:'m02',competitionId:'premier-league',round:'Round 8',kickoff:'2026-10-17T17:30:00+01:00',homeTeamId:'liverpool',awayTeamId:'arsenal',venueTeamId:'liverpool',status:'completed',score:{home:1,away:1},
    headline:'Liverpool and Arsenal share the points',preMatchStory:'Two contenders seek control of a tight league race.',
    postMatchStory:'An early Liverpool goal was cancelled out after the interval. Neither side found a winning breakthrough.',
    stats:{possession:[51,49],shots:[11,12],shotsOnTarget:[5,5],corners:[6,5]},
    events:[{minute:18,type:'goal',teamId:'liverpool',player:'Liverpool No. 10'},{minute:63,type:'goal',teamId:'arsenal',player:'Arsenal No. 9'}],
    lineups:{home:['Liverpool GK','Liverpool DEF 4','Liverpool MID 6','Liverpool FWD 10'],away:['Arsenal GK','Arsenal DEF 2','Arsenal MID 8','Arsenal FWD 9']}
  },
  {
    id:'m03',competitionId:'premier-league',round:'Round 9',kickoff:'2026-10-24T17:30:00+01:00',homeTeamId:'arsenal',awayTeamId:'man-city',venueTeamId:'arsenal',status:'live',minute:68,score:{home:1,away:1},
    headline:'Heavyweight clash hangs in the balance',preMatchStory:'High pressing meets patient possession in a pivotal clash for the mock title race.',
    stats:{possession:[46,54],shots:[10,12],shotsOnTarget:[4,5],corners:[4,5]},
    events:[{minute:14,type:'goal',teamId:'man-city',player:'City No. 9'},{minute:49,type:'goal',teamId:'arsenal',player:'Arsenal No. 7'}],
    lineups:{home:['Arsenal GK','Arsenal DEF 4','Arsenal MID 6','Arsenal FWD 7'],away:['City GK','City DEF 3','City MID 8','City FWD 9']}
  },
  {
    id:'m04',competitionId:'fa-cup',round:'Fourth round',kickoff:'2026-10-28T20:00:00+00:00',homeTeamId:'tottenham',awayTeamId:'arsenal',venueTeamId:'tottenham',status:'upcoming',score:null,
    headline:'North London rivalry arrives in the cup',preMatchStory:'Knockout drama awaits. A single result will determine who progresses in this fictional cup fixture.',events:[]
  },
  {
    id:'m05',competitionId:'premier-league',round:'Round 10',kickoff:'2026-10-31T17:30:00+00:00',homeTeamId:'arsenal',awayTeamId:'newcastle',venueTeamId:'arsenal',status:'upcoming',score:null,
    headline:'Arsenal host Newcastle in the next league round',preMatchStory:'Defensive organization will be tested by rapid transitions in this coming fixture.',events:[]
  },
  {
    id:'m06',competitionId:'premier-league',round:'Round 11',kickoff:'2026-11-07T17:30:00+00:00',homeTeamId:'brighton',awayTeamId:'arsenal',venueTeamId:'brighton',status:'upcoming',score:null,
    headline:'A south-coast challenge for Arsenal',preMatchStory:'Can Arsenal break through Brighton’s compact midfield?',events:[]
  },
  {
    id:'m07',competitionId:'premier-league',round:'Round 9',kickoff:'2026-10-24T17:30:00+01:00',homeTeamId:'chelsea',awayTeamId:'liverpool',venueTeamId:'chelsea',status:'live',minute:68,score:{home:0,away:2},
    headline:'Liverpool lead Chelsea in London',preMatchStory:'Chelsea seek to reverse a difficult run.',
    stats:{possession:[52,48],shots:[8,13],shotsOnTarget:[3,6],corners:[3,5]},
    events:[{minute:23,type:'goal',teamId:'liverpool',player:'Liverpool No. 11'},{minute:52,type:'goal',teamId:'liverpool',player:'Liverpool No. 7'}]
  },
  {
    id:'m08',competitionId:'premier-league',round:'Round 9',kickoff:'2026-10-24T15:00:00+01:00',homeTeamId:'newcastle',awayTeamId:'brighton',venueTeamId:'newcastle',status:'completed',score:{home:2,away:0},
    headline:'Newcastle take the points at home',preMatchStory:'Both teams are pushing for a top-half place.',postMatchStory:'Newcastle scored twice and held a clean sheet in this mock fixture.',
    stats:{possession:[47,53],shots:[12,10],shotsOnTarget:[5,2],corners:[7,6]},
    events:[{minute:39,type:'goal',teamId:'newcastle',player:'Newcastle No. 9'},{minute:81,type:'goal',teamId:'newcastle',player:'Newcastle No. 14'}]
  },
  {
    id:'m09',competitionId:'premier-league',round:'Round 9',kickoff:'2026-10-24T20:00:00+01:00',homeTeamId:'man-united',awayTeamId:'tottenham',venueTeamId:'man-united',status:'upcoming',score:null,
    headline:'Manchester United face Tottenham tonight',preMatchStory:'An intense matchup with plenty of opportunities for match predictions.',events:[]
  },
  {
    id:'m10',competitionId:'premier-league',round:'Round 8',kickoff:'2026-10-18T17:30:00+01:00',homeTeamId:'man-city',awayTeamId:'newcastle',venueTeamId:'man-city',status:'completed',score:{home:3,away:1},
    headline:'City win at home',preMatchStory:'Manchester City seek momentum at the top.',postMatchStory:'City converted three chances to beat Newcastle by two goals.',
    events:[{minute:12,type:'goal',teamId:'man-city',player:'City No. 9'},{minute:33,type:'goal',teamId:'newcastle',player:'Newcastle No. 7'},{minute:61,type:'goal',teamId:'man-city',player:'City No. 10'},{minute:84,type:'goal',teamId:'man-city',player:'City No. 17'}],
    stats:{possession:[66,34],shots:[18,7],shotsOnTarget:[8,3],corners:[9,3]}
  }
];
export const getMatch = (id: string): Match | undefined => matches.find((match)=>match.id===id);
export const matchesForTeam = (teamId: string): Match[] => matches.filter((match)=>match.homeTeamId===teamId||match.awayTeamId===teamId).sort((a,b)=>a.kickoff.localeCompare(b.kickoff));
/**
 * Stadium activity is a presentation selector, not a second fixture source.
 * A live fixture takes precedence, then the next upcoming fixture, then the
 * most recently kicked-off completed fixture.
 */
export const matchForStadium = (teamId:string):Match|undefined => {
  const atStadium = matches.filter((match) => match.venueTeamId === teamId);
  const live = atStadium.find((match) => match.status === 'live');
  if (live) return live;

  const upcoming = atStadium
    .filter((match) => match.status === 'upcoming')
    .sort((a, b) => a.kickoff.localeCompare(b.kickoff))[0];
  if (upcoming) return upcoming;

  return atStadium
    .filter((match) => match.status === 'completed')
    .sort((a, b) => b.kickoff.localeCompare(a.kickoff))[0];
};
