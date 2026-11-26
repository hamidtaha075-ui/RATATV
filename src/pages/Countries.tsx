import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { fetchCountries } from '../services/radioBrowser';
import { countryCodeToFlag } from '../utils/flags';

export default function Countries() {
  const { t } = useTranslation();
  const [countries, setCountries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [q, setQ] = useState('');

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const data = await fetchCountries();
        if (!cancelled) setCountries(data);
      } catch {
        if (!cancelled) setCountries([]);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const filtered = countries.filter((c) =>
    c.name.toLowerCase().includes(q.toLowerCase()) || c.code.toLowerCase().includes(q.toLowerCase()),
  );

  return (
    <div className="page">
      <h1 className="page-title">{t('nav.countries')}</h1>
      <input
        type="search"
        className="search-input"
        placeholder={t('countries.search')}
        value={q}
        onChange={(e) => setQ(e.target.value)}
      />
      {loading ? (
        <div className="loading">{t('common.loading')}</div>
      ) : (
        <div className="country-grid">
          {filtered.map((c) => (
            <Link key={c.code} to={`/countries/${c.code}`} className="country-card">
              <span className="flag">{countryCodeToFlag(c.code)}</span>
              <span className="country-name">{c.name}</span>
              <span className="country-count">{c.stationCount} {t('countries.stations')}</span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
