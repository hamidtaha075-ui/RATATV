import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useApp } from '../context/AppContext';
import { fetchPopular } from '../services/radioBrowser';
import StationList from '../components/station/StationList';
import { Link } from 'react-router-dom';

const categories = [
  { key: 'news', to: '/genres/news', color: '#455a64' },
  { key: 'music', to: '/genres/entertainment', color: '#ad1457' },
  { key: 'talk', to: '/genres/talk', color: '#5d4037' },
  { key: 'international', to: '/explore', color: '#00838f' },
];

export default function Home() {
  const { t } = useTranslation();
  const app = useApp();
  const [popular, setPopular] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const p = await fetchPopular(40);
        if (cancelled) return;
        setPopular(p);
        app.setQueue(p);
      } catch {
        // ignore
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="tv-home">
      {/* Hero banner */}
      <section className="hero-banner">
        <div className="hero-content">
          <h1 className="hero-title">{t('app')}</h1>
          <p className="hero-tagline">{t('tagline')}</p>
          <div className="hero-actions">
            <button className="hero-btn primary" onClick={() => popular[0] && app.playStation(popular[0])}>
              ▶ {t('player.play')}
            </button>
            <Link to="/live" className="hero-btn secondary">{t('nav.live')} →</Link>
          </div>
        </div>
      </section>

      {/* Category quick access */}
      <section className="content-row">
        <h2 className="row-title">{t('home.featured')}</h2>
        <div className="category-grid">
          {categories.map((c) => (
            <Link key={c.key} to={c.to} className="category-card" style={{ background: c.color }}>
              <span>{t(`categories.${c.key}`)}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Live channels row */}
      <section className="content-row">
        <div className="section-header">
          <h2 className="row-title">{t('home.popular')}</h2>
          <Link to="/live" className="see-all">{t('common.open')} →</Link>
        </div>
        <StationList stations={popular} loading={loading} />
      </section>

      {/* Movies row */}
      <section className="content-row">
        <div className="section-header">
          <h2 className="row-title">{t('nav.movies')}</h2>
          <Link to="/movies" className="see-all">{t('common.open')} →</Link>
        </div>
      </section>

      {/* Series row */}
      <section className="content-row">
        <div className="section-header">
          <h2 className="row-title">{t('nav.series')}</h2>
          <Link to="/series" className="see-all">{t('common.open')} →</Link>
        </div>
      </section>

      {app.recent.length > 0 && (
        <section className="content-row">
          <h2 className="row-title">{t('home.recent')}</h2>
          <StationList stations={app.recent.map((r) => r.station)} />
        </section>
      )}
    </div>
  );
}
