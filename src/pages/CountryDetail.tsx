import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { fetchByCountry } from '../services/radioBrowser';
import { fetchCountries } from '../services/radioBrowser';
import StationList from '../components/station/StationList';
import { countryCodeToFlag } from '../utils/flags';

export default function CountryDetail() {
  const { code } = useParams();
  const { t } = useTranslation();
  const [stations, setStations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [countryName, setCountryName] = useState(code || '');

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const countries = await fetchCountries();
        const c = countries.find((x) => x.code === (code || '').toUpperCase());
        if (c) setCountryName(c.name);
        const data = await fetchByCountry((code || '').toUpperCase(), 100);
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

  return (
    <div className="page">
      <Link to="/countries" className="back-link">← {t('common.back')}</Link>
      <h1 className="page-title">
        {countryCodeToFlag((code || '').toUpperCase())} {countryName}
      </h1>
      <StationList stations={stations} loading={loading} empty={t('search.noResults')} />
    </div>
  );
}
