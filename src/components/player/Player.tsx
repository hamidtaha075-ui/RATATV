import { useEffect } from 'react';
import { useFocusable } from '@noriginmedia/norigin-spatial-navigation';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useApp } from '../../context/AppContext';
import { countryCodeToFlag } from '../../utils/flags';

export default function Player() {
  const { t } = useTranslation();
  const app = useApp();
  const { currentStation, status, error, volume, muted } = app;

  const { ref: overlayRef, focused: overlayFocused } = useFocusable({
    onEnterPress: () => { if (status === 'playing') app.pause(); else app.resume(); },
  });

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement)?.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return;
      if (e.code === 'Space') { e.preventDefault(); if (app.status === 'playing') app.pause(); else if (app.currentStation) app.resume(); }
      else if (e.code === 'ArrowRight') app.nextStation();
      else if (e.code === 'ArrowLeft') app.prevStation();
      else if (e.code === 'Escape') app.stop();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [app]);

  if (!currentStation) {
    return null;
  }

  return (
    <div ref={overlayRef} className={`player-overlay ${overlayFocused ? 'focused' : ''}`} tabIndex={0}>
      <div className="player-video-wrap">
        {/* video element is managed by engine in #ratatv-video-container; this is the backdrop */}
      </div>
      <div className="player-overlay-bar">
        <div className="player-info">
          {currentStation.logo ? (
            <img src={currentStation.logo} alt="" className="player-logo" onError={(e) => ((e.target as HTMLImageElement).style.display = 'none')} />
          ) : (
            <div className="player-logo placeholder">📺</div>
          )}
          <div className="player-meta">
            <div className="player-name">{currentStation.name}</div>
            <div className="player-sub">
              {countryCodeToFlag(currentStation.countryCode)} {currentStation.country}
              {status === 'playing' && <span className="live-badge">{t('player.live')}</span>}
              {status === 'loading' && <span className="connecting">{t('player.connecting')}</span>}
            </div>
          </div>
        </div>
        <div className="player-controls">
          <button onClick={app.prevStation} title={t('player.prev')}>⏮</button>
          {status === 'playing' ? (
            <button onClick={app.pause} title={t('player.pause')}>⏸</button>
          ) : (
            <button onClick={app.resume} title={t('player.play')}>▶</button>
          )}
          <button onClick={app.stop} title={t('player.stop')}>⏹</button>
          <button onClick={app.nextStation} title={t('player.next')}>⏭</button>
          {status === 'loading' && <span className="spinner" />}
        </div>
        <div className="player-volume">
          <button onClick={app.toggleMute}>{muted ? '🔇' : '🔊'}</button>
          <input type="range" min={0} max={1} step={0.01} value={muted ? 0 : volume} onChange={(e) => app.setVolume(Number(e.target.value))} />
        </div>
        <div className="player-actions">
          <button onClick={() => app.toggleFavorite(currentStation)}>{app.isFavorite(currentStation.id) ? '❤️' : '🤍'}</button>
          <Link to={`/station/${encodeURIComponent(currentStation.id)}`} className="icon-btn">ℹ️</Link>
          <button onClick={app.stop}>✕</button>
        </div>
        {error && <div className="player-error">{error}</div>}
      </div>
    </div>
  );
}
