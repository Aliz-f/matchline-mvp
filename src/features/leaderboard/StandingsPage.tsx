import {Link} from 'react-router-dom';
import {ArrowRight} from 'lucide-react';
import {standings} from '../../data/community';
import {getTeam} from '../../data/teams';
import {useAppStore} from '../../store/useAppStore';
import {SectionHead} from '../../components/SectionHead';
import {TeamBadge} from '../../components/TeamBadge';
import {Notice} from '../../components/Notice';

export function StandingsPage() {
  const favorite = useAppStore((state) => state.preferences.favoriteTeamId);
  const sortedStandings = [...standings].sort(
    (a, b) => b.points - a.points || b.goalDifference - a.goalDifference,
  );

  return (
    <div className="page">
      <SectionHead
        eyebrow="EVERY RESULT MATTERS"
        title="League standings"
        description="Follow the story of the fictional title race with a clear sample table."
      />
      <Notice>
        Illustrative standings for a selected subset of clubs, not an official 20-club league table.
        Snapshot standings are not recalculated from the limited fixture examples.
      </Notice>

      <section className="panel standings-panel">
        <div className="standings-wrap">
          <table className="standings-table">
            <thead>
              <tr><th>#</th><th>Club</th><th>P</th><th>W</th><th>D</th><th>L</th><th>GD</th><th>Pts</th></tr>
            </thead>
            <tbody>
              {sortedStandings.map((standing, index) => (
                <tr key={standing.teamId} className={standing.teamId === favorite ? 'favorite-row' : ''}>
                  <td>{index + 1}</td>
                  <td>
                    <TeamBadge size="sm" teamId={standing.teamId}/>
                    <strong>{getTeam(standing.teamId).name}</strong>
                    {standing.teamId === favorite && <span className="your-club-tag">YOUR CLUB</span>}
                  </td>
                  <td>{standing.played}</td><td>{standing.wins}</td><td>{standing.draws}</td>
                  <td>{standing.losses}</td>
                  <td>{standing.goalDifference > 0 ? `+${standing.goalDifference}` : standing.goalDifference}</td>
                  <td><strong>{standing.points}</strong></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <figure
        aria-labelledby="standings-comic-title"
        style={{margin: '24px 0 0', overflow: 'hidden', border: '1px solid var(--border)', borderRadius: 18, background: '#173d32', boxShadow: '0 16px 34px rgba(23, 61, 50, 0.12)'}}
      >
        <figcaption style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, padding: '16px 20px', color: '#fff'}}>
          <div>
            <span style={{display: 'block', marginBottom: 3, color: '#b9d9b4', fontSize: '0.68rem', fontWeight: 800, letterSpacing: '0.08em'}}>MATCHLINE COMIC</span>
            <strong id="standings-comic-title">The race, told from every angle</strong>
          </div>
          <span style={{flex: 'none', border: '1px solid #94b990', borderRadius: 999, padding: '5px 9px', color: '#dcebd8', fontSize: '0.67rem', fontWeight: 700}}>FICTIONAL</span>
        </figcaption>
        <img
          src="/_Comic_Image.jpg"
          alt="Illustrated fictional comic of supporters reacting to the sample league standings."
          loading="lazy"
          style={{display: 'block', width: '100%', height: 'auto', borderTop: '1px solid #466456'}}
        />
      </figure>

      <section className="panel footnote-panel">
        <strong>More than a table</strong>
        <p>Ask Matchline about the effect of results on the race. For the MVP, AI uses the fixed mock match and table context, not an actual league simulator.</p>
        <Link to="/matches" className="text-link">Explore match analysis <ArrowRight size={16}/></Link>
      </section>
    </div>
  );
}
