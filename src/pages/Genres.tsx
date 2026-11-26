import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const genreKeys = [
  'news','business','culture','sports','entertainment','children',
];

// map UI key -> radio-browser tag
export const genreTagMap: Record<string, string> = {
  pop: 'pop',
  classical: 'classical',
  jazz: 'jazz',
  rock: 'rock',
  hiphop: 'hip hop',
  rnb: 'rnb',
  electronic: 'electronic',
  dance: 'dance',
  arabicMusic: 'arabic',
  oriental: 'oriental',
  traditional: 'traditional',
  religious: 'religion',
  quran: 'quran',
  news: 'news',
  sports: 'sports',
  politics: 'politics',
  talk: 'talk',
  culture: 'culture',
  education: 'education',
  entertainment: 'entertainment',
  business: 'business',
  children: 'children',
  community: 'community',
};

export default function Genres() {
  const { t } = useTranslation();
  return (
    <div className="page">
      <h1 className="page-title">{t('nav.genres')}</h1>
      <div className="genre-grid">
        {genreKeys.map((k) => (
          <Link key={k} to={`/genres/${k}`} className="genre-card">
            {t(`genres.${k}`)}
          </Link>
        ))}
      </div>
    </div>
  );
}
