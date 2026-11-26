import { useTranslation } from 'react-i18next';
import { useApp } from '../context/AppContext';
import StationList from '../components/station/StationList';

export default function Favorites() {
  const { t } = useTranslation();
  const app = useApp();
  return (
    <div className="page">
      <div className="section-header">
        <h1 className="page-title">{t('nav.favorites')}</h1>
        {app.favorites.length > 0 && (
          <button onClick={app.clearFavorites}>{t('common.clear')}</button>
        )}
      </div>
      <StationList stations={app.favorites} empty={t('search.noResults')} />
    </div>
  );
}
