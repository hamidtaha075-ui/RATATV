import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useApp } from '../context/AppContext';
import { fetchChannelsByCategory } from '../services/radioBrowser';
import StationList from '../components/station/StationList';

export default function Series() {
  const { t } = useTranslation();
  const app = useApp();
  const [stations, setStations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const data = await fetchChannelsByCategory('series');
        if (!cancelled) { setStations(data); app.setQueue(data); }
      } catch {
        if (!cancelled) setStations([]);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, []);

  return (
    <div className="page">
      <h1 className="page-title">{t('nav.series')}</h1>
      <StationList stations={stations} loading={loading} empty={t('search.noResults')} />
    </div>
  );
}
