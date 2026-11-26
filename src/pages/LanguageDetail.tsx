import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { fetchByLanguage } from '../services/radioBrowser';
import StationList from '../components/station/StationList';

const map: Record<string, 'arabic' | 'english' | 'french'> = {
  ar: 'arabic',
  en: 'english',
  fr: 'french',
};

export default function LanguageDetail() {
  const { code } = useParams();
  const { t } = useTranslation();
  const [stations, setStations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const lang = map[code || ''] || 'english';
        const data = await fetchByLanguage(lang, 60);
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
  }, [code]);

  const title =
    code === 'ar' ? t('languages.arabic') : code === 'fr' ? t('languages.french') : t('languages.english');

  return (
    <div className="page">
      <Link to="/languages" className="back-link">← {t('common.back')}</Link>
      <h1 className="page-title">{title}</h1>
      <StationList stations={stations} loading={loading} empty={t('search.noResults')} />
    </div>
  );
}
