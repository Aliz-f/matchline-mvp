import {ArrowRight,BrainCircuit,Code2,MapPinned,MessageCircleHeart,RadioTower,Trophy,UsersRound} from 'lucide-react';
import {Link} from 'react-router-dom';
import {SectionHead} from '../../components/SectionHead';
import {Notice} from '../../components/Notice';

const pillars=[
  {icon:MapPinned,title:'Start with your club',copy:'Match Journey and the stadium map turn fixtures into an easy-to-follow, team-centred season story.'},
  {icon:BrainCircuit,title:'Add useful context',copy:'Grounded match explanations and clearly labelled hypothetical questions make each result more meaningful.'},
  {icon:MessageCircleHeart,title:'Bring fans together',copy:'Match-linked conversations let supporters react, debate and create local community momentum.'},
  {icon:Trophy,title:'Give fans a reason to return',copy:'Transparent, non-monetary predictions and recognition reward good instincts without presenting betting as the product.'},
];

const opportunities=[
  {icon:UsersRound,title:'Free and premium fans',copy:'Free fans receive a club-centred journey, match context, discussion and prediction recognition. A future premium tier could offer richer personalization, expanded AI use, new discussion topics and advanced competitions.'},
  {icon:RadioTower,title:'Creators and sports media',copy:'With authorization, aggregated community themes and prediction trends could help creators, podcasters and publishers build fan-centred stories and reach new audiences.'},
  {icon:Code2,title:'Third-party developers',copy:'A future documented API could let approved developers build complementary experiences from privacy-protected, aggregated insights and sports-content capabilities.'},
  {icon:MapPinned,title:'Data, map and AI partners',copy:'Licensed sports-data providers, mapping services and AI providers are foundational partners for future factual coverage, location experiences and personalized analysis.'},
];

export function HowItWorksPage(){
 return <div className="page">
  <SectionHead eyebrow="THE MATCHLINE IDEA" title="Football coverage built around the fan" description="Matchline connects fixtures, context and fan participation into one club-centred experience."/>
  <Notice>This frontend demonstrates the product concept with fictional data and local browser state. It does not provide a live sports feed, shared community, payment service or production AI platform.</Notice>
  <section className="panel">
   <span className="eyebrow">THE CORE LOOP</span>
   <h2>Choose a club. Follow the story. Join the conversation.</h2>
   <p className="copy">The first fan should get value immediately through a personalized match path and helpful context. As more fans participate, discussions and prediction recognition can make each club community more useful.</p>
   <div className="dashboard-grid">{pillars.map(({icon:Icon,title,copy})=><article key={title} className="panel"><div className="insight-icon"><Icon size={25}/></div><h3>{title}</h3><p className="muted">{copy}</p></article>)}</div>
  </section>
  <section className="panel" style={{marginTop:18}}>
   <span className="eyebrow">THE BUSINESS MODEL</span>
   <h2>Free fan value first, premium depth later</h2>
   <p className="copy">The proposed model keeps core match discovery, discussions and recognition accessible to fans. A future premium tier could expand community topic creation, personalized AI experiences and advanced competitions. Potential revenue includes premium subscriptions, clearly identified sponsorship or advertising, and approved media/API services.</p>
   <p className="fine-print">These are business-model goals, not claims of a working subscription, advertising, moderation or B2B API product in this demo.</p>
  </section>
  <section className="panel" style={{marginTop:18}}>
   <span className="eyebrow">THE ECOSYSTEM</span>
   <h2>Opportunities beyond the fan app</h2>
   <p className="copy">Matchline’s long-term opportunity is a connected ecosystem: fans get useful, personalized experiences; trusted partners can create complementary value from approved, aggregated information; and distribution partners can bring more fans into the community.</p>
   <div className="dashboard-grid">{opportunities.map(({icon:Icon,title,copy})=><article key={title} className="panel"><div className="insight-icon"><Icon size={25}/></div><h3>{title}</h3><p className="muted">{copy}</p></article>)}</div>
  </section>
  <section className="panel" style={{marginTop:18}}>
   <span className="eyebrow">THE RESPONSIBLE VALUE FLOW</span>
   <h2>Participation should benefit fans before partners</h2>
   <p className="copy">The intended loop is: licensed fixture information plus fan-selected preferences create relevant match experiences; voluntary discussions and predictions improve community value; only eligible, aggregated and privacy-protected signals may support future creator, media or developer services. Private chats, personally identifying data and individual fan conversations are not products for third parties.</p>
   <p className="fine-print">Production delivery would require sports-data licenses, user controls, moderation, consent and privacy safeguards, commercial agreements and a secure backend. None of those production systems exist in this frontend-only prototype.</p>
  </section>
  <section className="panel footnote-panel">
   <strong>See the loop in action</strong>
   <p>Begin with your team’s Match Journey, open a fixture, then use the local AI, community and prediction demonstrations.</p>
   <Link to="/" className="text-link">Open your Match Journey <ArrowRight size={16}/></Link>
  </section>
 </div>;
}
