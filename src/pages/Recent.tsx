import { useTranslation } from 'react-i18next';
import { useApp } from '../context/AppContext';
import StationList from '../components/station/StationList';

export default function Recent() {
  const { t } = useTranslation();
  const app = useApp();
  return (
    <div className="page">
      <div className="section-header">
        <h1 className="page-title">{t('nav.recent')}</h1>
        {app.recent.length > 0 && (
          <button onClick={app.clearRecent}>{t('common.clear')}</button>
        )}
      </div>
      <StationList stations={app.recent.map((r) => r.station)} empty={t('search.noResults')} />
    </div>
  );
}
