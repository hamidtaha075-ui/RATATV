import React, { createContext, useContext, useEffect, useMemo, useRef, useState } from 'react';
import type { Station, Settings, RecentItem } from '../types/station';
import { storage } from '../services/storage';
import { AudioEngine } from '../services/audioEngine';
import { setLanguage } from '../i18n';

interface AppContextValue {
  settings: Settings;
  updateSettings: (patch: Partial<Settings>) => void;
  currentStation: Station | null;
  status: 'idle' | 'loading' | 'playing' | 'paused' | 'error';
  error: string | null;
  volume: number;
  muted: boolean;
  favorites: Station[];
  recent: RecentItem[];
  lastStation: Station | null;
  isFavorite: (id: string) => boolean;
  playStation: (s: Station) => void;
  pause: () => void;
  resume: () => void;
  stop: () => void;
  nextStation: () => void;
  prevStation: () => void;
  setVolume: (v: number) => void;
  toggleMute: () => void;
  toggleFavorite: (s: Station) => void;
  clearRecent: () => void;
  clearFavorites: () => void;
  queue: Station[];
  setQueue: (q: Station[]) => void;
  sleepRemaining: number | null;
  setSleepTimer: (minutes: number | null) => void;
  audioRef: React.RefObject<HTMLAudioElement | null>;
}

const defaultSettings: Settings = {
  uiLanguage: 'en',
  theme: 'dark',
  defaultVolume: 0.8,
  autoplay: false,
  startupBehavior: 'none',
  sleepTimerMinutes: null,
};

const AppContext = createContext<AppContextValue | null>(null);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<Settings>(() =>
    storage.get<Settings>('settings', defaultSettings),
  );
  const [currentStation, setCurrentStation] = useState<Station | null>(null);
  const [status, setStatus] = useState<AppContextValue['status']>('idle');
  const [error, setError] = useState<string | null>(null);
  const [volume, setVolumeState] = useState<number>(() =>
    storage.get<number>('volume', defaultSettings.defaultVolume),
  );
  const [muted, setMuted] = useState<boolean>(() => storage.get<boolean>('muted', false));
  const [favorites, setFavorites] = useState<Station[]>(() =>
    storage.get<Station[]>('favorites', []),
  );
  const [recent, setRecent] = useState<RecentItem[]>(() =>
    storage.get<RecentItem[]>('recent', []),
  );
  const [lastStation, setLastStation] = useState<Station | null>(() =>
    storage.get<Station | null>('lastStation', null),
  );
  const [queue, setQueue] = useState<Station[]>([]);
  const [sleepRemaining, setSleepRemaining] = useState<number | null>(null);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const engineRef = useRef<AudioEngine | null>(null);

  // init engine once
  useEffect(() => {
    const engine = new AudioEngine({
      onStatus: (s) => setStatus(s),
      onError: (m) => setError(m),
      onEnded: () => {
        // auto advance
      },
    });
    engineRef.current = engine;
    audioRef.current = engine.element;
    engine.setVolume(volume);
    engine.setMuted(muted);
    return () => engine.destroy();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // apply settings language
  useEffect(() => {
    setLanguage(settings.uiLanguage);
  }, [settings.uiLanguage]);

  // persist settings
  useEffect(() => {
    storage.set('settings', settings);
  }, [settings]);

  useEffect(() => {
    storage.set('volume', volume);
    engineRef.current?.setVolume(volume);
  }, [volume]);

  useEffect(() => {
    storage.set('muted', muted);
    engineRef.current?.setMuted(muted);
  }, [muted]);

  useEffect(() => {
    storage.set('favorites', favorites);
  }, [favorites]);

  useEffect(() => {
    storage.set('recent', recent);
  }, [recent]);

  useEffect(() => {
    storage.set('lastStation', lastStation);
  }, [lastStation]);

  // sleep timer countdown
  const sleepIntervalRef = useRef<number | null>(null);
  useEffect(() => {
    if (sleepIntervalRef.current) {
      window.clearInterval(sleepIntervalRef.current);
      sleepIntervalRef.current = null;
    }
    if (sleepRemaining === null) return;
    sleepIntervalRef.current = window.setInterval(() => {
      setSleepRemaining((prev) => {
        if (prev === null) return null;
        if (prev <= 1) {
          engineRef.current?.pause();
          return null;
        }
        return prev - 1;
      });
    }, 1000);
    return () => {
      if (sleepIntervalRef.current) window.clearInterval(sleepIntervalRef.current);
    };
  }, [sleepRemaining !== null]); // eslint-disable-line

  const addToRecent = (s: Station) => {
    setRecent((prev) => {
      const filtered = prev.filter((r) => r.station.id !== s.id);
      const next = [{ station: s, playedAt: Date.now() }, ...filtered].slice(0, 50);
      return next;
    });
    setLastStation(s);
  };

  const playStation = (s: Station) => {
    setCurrentStation(s);
    setError(null);
    engineRef.current?.loadAndPlay(s.url);
    addToRecent(s);
  };

  const pause = () => engineRef.current?.pause();
  const resume = () => engineRef.current?.resume();
  const stop = () => {
    engineRef.current?.stop();
    setCurrentStation(null);
    setStatus('idle');
  };

  const nextStation = () => {
    if (!currentStation || queue.length === 0) return;
    const idx = queue.findIndex((x) => x.id === currentStation.id);
    const next = queue[(idx + 1) % queue.length];
    if (next) playStation(next);
  };

  const prevStation = () => {
    if (!currentStation || queue.length === 0) return;
    const idx = queue.findIndex((x) => x.id === currentStation.id);
    const prev = queue[(idx - 1 + queue.length) % queue.length];
    if (prev) playStation(prev);
  };

  const setVolume = (v: number) => setVolumeState(v);
  const toggleMute = () => setMuted((m) => !m);

  const isFavorite = (id: string) => favorites.some((f) => f.id === id);

  const toggleFavorite = (s: Station) => {
    setFavorites((prev) => {
      if (prev.some((f) => f.id === s.id)) {
        return prev.filter((f) => f.id !== s.id);
      }
      return [s, ...prev];
    });
  };

  const clearRecent = () => setRecent([]);
  const clearFavorites = () => setFavorites([]);

  const updateSettings = (patch: Partial<Settings>) => {
    setSettings((prev) => ({ ...prev, ...patch }));
    if (patch.defaultVolume !== undefined) setVolumeState(patch.defaultVolume);
  };

  const setSleepTimer = (minutes: number | null) => {
    if (minutes === null) {
      setSleepRemaining(null);
      updateSettings({ sleepTimerMinutes: null });
    } else {
      setSleepRemaining(minutes * 60);
      updateSettings({ sleepTimerMinutes: minutes });
    }
  };

  // startup behavior
  useEffect(() => {
    if (settings.startupBehavior === 'lastStation' && lastStation && settings.autoplay) {
      playStation(lastStation);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const value: AppContextValue = useMemo(
    () => ({
      settings,
      updateSettings,
      currentStation,
      status,
      error,
      volume,
      muted,
      favorites,
      recent,
      lastStation,
      isFavorite,
      playStation,
      pause,
      resume,
      stop,
      nextStation,
      prevStation,
      setVolume,
      toggleMute,
      toggleFavorite,
      clearRecent,
      clearFavorites,
      queue,
      setQueue,
      sleepRemaining,
      setSleepTimer,
      audioRef,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [settings, currentStation, status, error, volume, muted, favorites, recent, lastStation, queue, sleepRemaining],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp(): AppContextValue {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
