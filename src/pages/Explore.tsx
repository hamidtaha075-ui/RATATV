import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useApp } from '../context/AppContext';
import { fetchPopular, fetchByLanguage } from '../services/radioBrowser';
import StationList from '../components/station/StationList';

export default function Explore() {
  const { t } = useTranslation();
  const app = useApp();
  const [stations, setStations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'ar' | 'en' | 'fr'>('all');

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoading(true);
      try {
        let data: any[] = [];
        if (filter === 'all') data = await fetchPopular(40);
        else if (filter === 'ar') data = await fetchByLanguage('arabic', 40);
        else if (filter === 'en') data = await fetchByLanguage('english', 40);
        else if (filter === 'fr') data = await fetchByLanguage('french', 40);
        if (!cancelled) {
          setStations(data);
          app.setQueue(data);
        }
      } catch {
        if (!cancelled) setStations([]);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [filter]);

  return (
    <div className="page">
      <h1 className="page-title">{t('nav.explore')}</h1>
      <div className="filter-row">
        {(['all', 'ar', 'en', 'fr'] as const).map((f) => (
          <button key={f} className={filter === f ? 'active' : ''} onClick={() => setFilter(f)}>
            {f === 'all' ? 'All' : f === 'ar' ? t('languages.arabic') : f === 'en' ? t('languages.english') : t('languages.french')}
          </button>
        ))}
      </div>
      <StationList stations={stations} loading={loading} empty={t('search.noResults')} />
    </div>
  );
}
