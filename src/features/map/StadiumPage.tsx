import {useMemo, useState} from 'react';
import {Link} from 'react-router-dom';
import {MapPin} from 'lucide-react';
import {CircleMarker, MapContainer, Popup, TileLayer} from 'react-leaflet';
import {matchForStadium} from '../../data/matches';
import {getTeam, teams} from '../../data/teams';
import {formatKickoff} from '../../lib/football';
import {SectionHead} from '../../components/SectionHead';
import {TeamBadge} from '../../components/TeamBadge';
import type {MatchStatus} from '../../types/domain';

type MarkerStatus = 'all' | MatchStatus;
const statusColor: Record<MatchStatus, string> = {upcoming: '#c93640', live: '#205440', completed: '#769a7d'};
const statusCopy: Record<MatchStatus, string> = {upcoming: 'Upcoming fixture', live: 'Live — simulated snapshot', completed: 'Most recent completed fixture'};

export function StadiumPage() {
  const [filter, setFilter] = useState<MarkerStatus>('all');
  const [selectedTeamId, setSelectedTeamId] = useState('arsenal');
  const grounds = useMemo(() => teams.map((team) => ({team, match: matchForStadium(team.id)})).filter((ground) => ground.match), []);
  const visibleGrounds = grounds.filter(({match}) => filter === 'all' || match?.status === filter);
  const selected = visibleGrounds.find(({team}) => team.id === selectedTeamId) ?? visibleGrounds[0];

  if (!selected) return <div className="page"><div className="panel"><h2>No grounds match this filter</h2><p>Choose another activity filter to see the fictional stadium snapshot.</p></div></div>;

  const selectedMatch = selected.match!;
  const home = getTeam(selectedMatch.homeTeamId);
  const away = getTeam(selectedMatch.awayTeamId);
  return <div className="page">
    <SectionHead eyebrow="STADIUM ATLAS" title="Where the matchday happens" description="Each pin reflects the highest-priority fixture at that ground: live, then upcoming, then the latest completed result." />
    <p className="fine-print">Ground locations are approximate. Fixture activity is fictional and frozen; map tiles require an internet connection.</p>
    <div className="map-filters" role="group" aria-label="Stadium activity filter">
      {(['all', 'live', 'upcoming', 'completed'] as const).map((status) => <button key={status} className={filter === status ? 'active' : ''} onClick={() => setFilter(status)}>{status === 'all' ? `All grounds (${grounds.length})` : `${status} (${grounds.filter(({match}) => match?.status === status).length})`}</button>)}
    </div>
    <div className="map-layout">
      <section className="panel map-panel" aria-label="Map of fictional stadium activity">
        <MapContainer center={[53.1, -1.45]} zoom={6} scrollWheelZoom={false} className="stadium-map">
          <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          {visibleGrounds.map(({team, match}) => {
            const fixture = match!;
            const isSelected = team.id === selected.team.id;
            return <CircleMarker key={team.id} center={[team.stadium.lat, team.stadium.lng]} radius={isSelected ? 14 : 10} eventHandlers={{click: () => setSelectedTeamId(team.id)}} pathOptions={{color: '#fff', fillColor: statusColor[fixture.status], fillOpacity: 1, weight: isSelected ? 4 : 2}}>
              <Popup><strong>{team.stadium.name}</strong><p>{getTeam(fixture.homeTeamId).shortName} v {getTeam(fixture.awayTeamId).shortName}</p><p>{statusCopy[fixture.status]}</p><Link to={`/matches/${fixture.id}`}>Open match centre</Link></Popup>
            </CircleMarker>;
          })}
        </MapContainer>
      </section>
      <aside className="panel stadium-list">
        <h3>{selected.team.stadium.name}</h3>
        <div className="match-score-meta"><span className={`status status-${selectedMatch.status}`}>{statusCopy[selectedMatch.status]}</span><span>{selected.team.stadium.city}</span></div>
        <div className="atlas-teams"><TeamBadge teamId={home.id} size="md"/><h2>{home.shortName} v {away.shortName}</h2><TeamBadge teamId={away.id} size="md"/></div>
        <p className="muted">{formatKickoff(selectedMatch.kickoff)} · {selected.team.stadium.name}</p>
        <Link to={`/matches/${selectedMatch.id}`} className="button primary full">Open selected match</Link>
        <h3 className="subheading">Ground activity</h3>
        {visibleGrounds.map(({team, match}) => {
          const fixture = match!;
          return <button key={team.id} className="stadium-row" onClick={() => setSelectedTeamId(team.id)} aria-pressed={team.id === selected.team.id}>
            <MapPin size={17}/><div><strong>{team.stadium.name}</strong><small>{getTeam(fixture.homeTeamId).shortName} v {getTeam(fixture.awayTeamId).shortName} · {statusCopy[fixture.status]}</small></div><span className={`status status-${fixture.status}`}>{fixture.status}</span>
          </button>;
        })}
      </aside>
    </div>
  </div>;
}
