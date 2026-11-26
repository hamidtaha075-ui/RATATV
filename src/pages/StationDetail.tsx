import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useApp } from '../context/AppContext';
import { fetchStationById, fetchByCountry } from '../services/radioBrowser';
import StationList from '../components/station/StationList';
import { countryCodeToFlag } from '../utils/flags';

export default function StationDetail() {
  const { id } = useParams();
  const { t } = useTranslation();
  const app = useApp();
  const [station, setStation] = useState<any>(null);
  const [related, setRelated] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const s = await fetchStationById(id || '');
        if (cancelled) return;
        setStation(s);
        if (s) {
          const rel = await fetchByCountry(s.countryCode, 12);
          if (!cancelled) setRelated(rel.filter((x: any) => x.id !== s.id).slice(0, 8));
        }
      } catch {
        if (!cancelled) setStation(null);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [id]);

  if (loading) return <div className="page loading">{t('common.loading')}</div>;
  if (!station) return <div className="page">{t('common.error')}</div>;

  const copyLink = () => {
    const url = `${window.location.origin}/#/station/${station.id}`;
    navigator.clipboard?.writeText(url).catch(() => {});
  };

  return (
    <div className="page station-detail">
      <Link to="/" className="back-link">← {t('common.back')}</Link>
      <div className="station-detail-header">
        {station.logo ? (
          <img src={station.logo} alt="" className="station-detail-logo" onError={(e) => ((e.target as HTMLImageElement).style.display = 'none')} />
        ) : (
          <div className="station-detail-logo placeholder">📻</div>
        )}
        <div>
          <h1 className="page-title">{station.name}</h1>
          <p>
            {countryCodeToFlag(station.countryCode)} {station.country}
            {station.state ? ` · ${station.state}` : ''}
          </p>
          <p>{station.language}</p>
          {station.tags && station.tags.length > 0 && <p>{station.tags.join(', ')}</p>}
        </div>
      </div>

      <div className="detail-grid">
        <div className="detail-row">
          <span className="detail-label">{t('station.country')}</span>
          <span>{station.country}</span>
        </div>
        {station.state && (
          <div className="detail-row">
            <span className="detail-label">{t('station.city')}</span>
            <span>{station.state}</span>
          </div>
        )}
        <div className="detail-row">
          <span className="detail-label">{t('station.language')}</span>
          <span>{station.language || '-'}</span>
        </div>
        <div className="detail-row">
          <span className="detail-label">{t('station.genre')}</span>
          <span>{station.tags?.join(', ') || '-'}</span>
        </div>
        <div className="detail-row">
          <span className="detail-label">{t('station.website')}</span>
          <span>
            {station.homepage ? (
              <a href={station.homepage} target="_blank" rel="noopener noreferrer">
                {station.homepage}
              </a>
            ) : (
              '-'
            )}
          </span>
        </div>
        <div className="detail-row">
          <span className="detail-label">{t('station.stream')}</span>
          <span className="stream-url">{station.url}</span>
        </div>
        <div className="detail-row">
          <span className="detail-label">{t('station.liveStatus')}</span>
          <span>{station.lastCheckOk ? 'OK' : 'Unknown'}</span>
        </div>
      </div>

      <div className="detail-actions">
        <button onClick={() => app.playStation(station)}>{t('player.play')}</button>
        <button onClick={() => app.toggleFavorite(station)}>
          {app.isFavorite(station.id) ? t('common.removeFavorite') : t('common.addFavorite')}
        </button>
        <button onClick={copyLink}>{t('station.copyLink')}</button>
        {station.homepage && (
          <a href={station.homepage} target="_blank" rel="noopener noreferrer" className="btn">
            {t('station.website')}
          </a>
        )}
      </div>

      {related.length > 0 && (
        <section style={{ marginTop: '2rem' }}>
          <h2>{t('station.related')}</h2>
          <StationList stations={related} />
        </section>
      )}
    </div>
  );
}
