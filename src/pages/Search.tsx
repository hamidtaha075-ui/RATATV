import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { fetchStations, fetchPopular } from '../services/radioBrowser';
import StationList from '../components/station/StationList';

export default function Search() {
  const { t } = useTranslation();
  const [params, setParams] = useSearchParams();
  const q = params.get('q') || '';
  const [query, setQuery] = useState(q);
  const [language, setLanguage] = useState<string>('all');
  const [country, setCountry] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setQuery(q);
  }, [q]);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoading(true);
      try {
        let data: any[] = [];
        if (query.trim()) {
          data = await fetchStations();
        } else {
          data = await fetchPopular(40);
        }
        if (cancelled) return;
        // client-side filters
        let filtered = data;
        if (language !== 'all') {
          filtered = filtered.filter((s) => (s.languages || []).includes(language));
        }
        if (country.trim()) {
          const c = country.trim().toLowerCase();
          filtered = filtered.filter((s) => (s.country || '').toLowerCase().includes(c) || (s.countryCode || '').toLowerCase() === c);
        }
        setResults(filtered);
      } catch {
        if (!cancelled) setResults([]);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [query, language, country]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setParams(query ? { q: query } : {});
  };

  return (
    <div className="page">
      <h1 className="page-title">{t('nav.search')}</h1>
      <form onSubmit={submit} className="search-form">
        <input
          type="search"
          className="search-input"
          placeholder={t('search.placeholder')}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit">{t('nav.search')}</button>
      </form>
      <div className="filter-row">
        <label>{t('search.language')}</label>
        <select value={language} onChange={(e) => setLanguage(e.target.value)}>
          <option value="all">All</option>
          <option value="ar">{t('languages.arabic')}</option>
          <option value="en">{t('languages.english')}</option>
          <option value="fr">{t('languages.french')}</option>
        </select>
        <label>{t('search.country')}</label>
        <input
          type="text"
          placeholder={t('countries.search')}
          value={country}
          onChange={(e) => setCountry(e.target.value)}
        />
      </div>
      <StationList stations={results} loading={loading} empty={t('search.noResults')} />
    </div>
  );
}
