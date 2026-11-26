import { useTranslation } from 'react-i18next';
import { useApp } from '../context/AppContext';

export default function Settings() {
  const { t } = useTranslation();
  const app = useApp();
  const s = app.settings;

  return (
    <div className="page">
      <h1 className="page-title">{t('settings.title')}</h1>

      <div className="settings-group">
        <label>{t('settings.uiLanguage')}</label>
        <select value={s.uiLanguage} onChange={(e) => app.updateSettings({ uiLanguage: e.target.value as any })}>
          <option value="ar">العربية</option>
          <option value="en">English</option>
          <option value="fr">Français</option>
        </select>
      </div>

      <div className="settings-group">
        <label>{t('settings.theme')}</label>
        <select value={s.theme} onChange={(e) => app.updateSettings({ theme: e.target.value as any })}>
          <option value="dark">Dark</option>
          <option value="light">Light</option>
        </select>
      </div>

      <div className="settings-group">
        <label>{t('settings.defaultVolume')}</label>
        <input
          type="range"
          min={0}
          max={1}
          step={0.01}
          value={s.defaultVolume}
          onChange={(e) => app.updateSettings({ defaultVolume: Number(e.target.value) })}
        />
      </div>

      <div className="settings-group">
        <label>{t('settings.autoplay')}</label>
        <input
          type="checkbox"
          checked={s.autoplay}
          onChange={(e) => app.updateSettings({ autoplay: e.target.checked })}
        />
      </div>

      <div className="settings-group">
        <label>{t('settings.startup')}</label>
        <select value={s.startupBehavior} onChange={(e) => app.updateSettings({ startupBehavior: e.target.value as any })}>
          <option value="none">None</option>
          <option value="lastStation">Last Station</option>
        </select>
      </div>

      <div className="settings-group">
        <label>{t('settings.sleepTimer')}</label>
        <select
          value={s.sleepTimerMinutes ?? ''}
          onChange={(e) => {
            const v = e.target.value;
            app.setSleepTimer(v === '' ? null : Number(v));
          }}
        >
          <option value="">Off</option>
          <option value="15">15 min</option>
          <option value="30">30 min</option>
          <option value="45">45 min</option>
          <option value="60">60 min</option>
        </select>
        {app.sleepRemaining !== null && (
          <span style={{ marginLeft: '1rem' }}>
            {Math.floor(app.sleepRemaining / 60)}:{String(app.sleepRemaining % 60).padStart(2, '0')}
          </span>
        )}
      </div>

      <div className="settings-group">
        <button onClick={app.clearRecent}>{t('settings.clearHistory')}</button>
      </div>

      <div className="settings-group">
        <button
          onClick={() => {
            app.updateSettings({
              uiLanguage: 'en',
              theme: 'dark',
              defaultVolume: 0.8,
              autoplay: false,
              startupBehavior: 'none',
              sleepTimerMinutes: null,
            });
            app.clearRecent();
            app.clearFavorites();
          }}
        >
          {t('settings.reset')}
        </button>
      </div>

      <div className="settings-group about">
        <h3>{t('settings.about')}</h3>
        <p>RATARADIO</p>
        <p>{t('settings.version')}: 1.0.0</p>
      </div>
    </div>
  );
}
