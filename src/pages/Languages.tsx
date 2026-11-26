import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const langs = [
  { code: 'ar', key: 'arabic', color: '#2e7d32' },
  { code: 'en', key: 'english', color: '#1565c0' },
  { code: 'fr', key: 'french', color: '#6a1b9a' },
];

export default function Languages() {
  const { t } = useTranslation();
  return (
    <div className="page">
      <h1 className="page-title">{t('nav.languages')}</h1>
      <div className="category-grid">
        {langs.map((l) => (
          <Link key={l.code} to={`/languages/${l.code}`} className="category-card" style={{ background: l.color }}>
            <span>{t(`languages.${l.key}`)}</span>
          </Link>
        ))}
      </div>
      <p style={{ marginTop: '1rem', opacity: 0.7 }}>
        {t('languages.other')}
      </p>
    </div>
  );
}
