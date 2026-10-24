import type { DemoProfile, DiscussionPost, Prediction, Standing } from '../types/domain';
export const profiles:DemoProfile[] = [
  {id:'you',name:'You',teamId:'arsenal',membership:'free',avatar:'YO'},
  {id:'fan-ada',name:'Ada',teamId:'arsenal',membership:'premium',avatar:'AD'},
  {id:'fan-milo',name:'Milo',teamId:'liverpool',membership:'free',avatar:'MI'},
  {id:'fan-zoe',name:'Zoe',teamId:'chelsea',membership:'premium',avatar:'ZO'},
  {id:'fan-noah',name:'Noah',teamId:'man-city',membership:'free',avatar:'NO'}
];
export const standings:Standing[] = [
  {teamId:'arsenal',played:8,wins:6,draws:1,losses:1,goalDifference:13,points:19},
  {teamId:'liverpool',played:8,wins:5,draws:2,losses:1,goalDifference:10,points:17},
  {teamId:'man-city',played:8,wins:5,draws:1,losses:2,goalDifference:9,points:16},
  {teamId:'newcastle',played:9,wins:5,draws:2,losses:2,goalDifference:7,points:17},
  {teamId:'chelsea',played:8,wins:3,draws:3,losses:2,goalDifference:3,points:12},
  {teamId:'brighton',played:9,wins:3,draws:2,losses:4,goalDifference:-2,points:11},
  {teamId:'tottenham',played:8,wins:2,draws:2,losses:4,goalDifference:-4,points:8},
  {teamId:'man-united',played:8,wins:1,draws:3,losses:4,goalDifference:-7,points:6}
];
/** Leaderboard peers use demo points. 'You' is calculated from locally saved predictions. */
export const seededLeaderboard=[{userId:'fan-ada',points:32,correctResults:7,exactScores:2},{userId:'fan-milo',points:24,correctResults:6,exactScores:1},{userId:'fan-zoe',points:21,correctResults:5,exactScores:1},{userId:'fan-noah',points:15,correctResults:5,exactScores:0}];
export const samplePredictions:Prediction[]=[
  {id:'sp1',userId:'fan-ada',matchId:'m01',choice:'home',exactHome:2,exactAway:1,submittedAt:'2026-10-09T10:00:00Z'},
  {id:'sp2',userId:'fan-milo',matchId:'m02',choice:'home',exactHome:2,exactAway:1,submittedAt:'2026-10-16T10:00:00Z'}
];
export const samplePosts:DiscussionPost[]=[
  {id:'p1',matchId:'m03',author:'Ada',text:'The shape of the midfield is deciding this match. How would you change it?',likes:18,createdAt:'2026-10-24T16:00:00Z'},
  {id:'p2',matchId:'m03',author:'Milo',text:'That equalizer changed everything. This next phase will be fascinating.',likes:8,createdAt:'2026-10-24T16:05:00Z'},
  {id:'p3',matchId:'m04',author:'Zoe',text:'Derby day prediction: whoever controls the first 20 minutes has the edge.',likes:11,createdAt:'2026-10-23T15:00:00Z'},
  {id:'p4',matchId:'m01',author:'Noah',text:'A late winner is such a great storyline.',likes:6,createdAt:'2026-10-11T13:00:00Z'}
];
