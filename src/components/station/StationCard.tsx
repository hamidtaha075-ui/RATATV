import { useFocusable } from '@noriginmedia/norigin-spatial-navigation';
import { Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { countryCodeToFlag } from '../../utils/flags';

export default function StationCard({ station, onPlay }: { station: any; onPlay?: (s: any) => void }) {
  const app = useApp();
  const { ref, focused } = useFocusable({
    onEnterPress: () => (onPlay ? onPlay(station) : app.playStation(station)),
  });

  return (
    <div ref={ref} className={`station-card ${focused ? 'focused' : ''}`} tabIndex={0}>
      <div className="station-logo-wrap">
        {station.logo ? (
          <img src={station.logo} alt="" className="station-logo" loading="lazy" onError={(e) => ((e.target as HTMLImageElement).style.display = 'none')} />
        ) : (
          <div className="station-logo placeholder">📺</div>
        )}
      </div>
      <div className="station-info">
        <div className="station-name">{station.name}</div>
        <div className="station-meta">
          {countryCodeToFlag(station.countryCode)} {station.country}
          {station.language ? ` · ${station.language}` : ''}
        </div>
        {station.tags && station.tags.length > 0 && (
          <div className="station-tags">{station.tags.slice(0, 3).join(', ')}</div>
        )}
      </div>
      <div className="station-actions">
        <button className="play-btn" onClick={() => (onPlay ? onPlay(station) : app.playStation(station))}>▶</button>
        <button className="fav-btn" onClick={() => app.toggleFavorite(station)}>{app.isFavorite(station.id) ? '❤️' : '🤍'}</button>
        <Link to={`/station/${encodeURIComponent(station.id)}`} className="detail-link">ℹ️</Link>
      </div>
    </div>
  );
}
