import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { fetchStations } from '../services/radioBrowser';
// genreTagMap not needed
import StationList from '../components/station/StationList';

export default function GenreDetail() {
  const { tag } = useParams();
  const { t } = useTranslation();
  const [stations, setStations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const data = await fetchStations();
        if (!cancelled) setStations(data);
      } catch {
        if (!cancelled) setStations([]);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [tag]);

  return (
    <div className="page">
      <Link to="/genres" className="back-link">← {t('common.back')}</Link>
      <h1 className="page-title">{tag ? t(`genres.${tag}`) : t('nav.genres')}</h1>
      <StationList stations={stations} loading={loading} empty={t('search.noResults')} />
    </div>
  );
}
