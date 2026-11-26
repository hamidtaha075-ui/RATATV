export interface Station {
  id: string;
  name: string;
  country: string;
  countryCode: string;
  state: string;
  city: string;
  language: string; // raw
  languageCodes: string[];
  languages: string[]; // normalized: 'ar' | 'en' | 'fr' | other codes
  tags: string[];
  url: string; // resolved stream url
  urlRaw: string;
  homepage: string;
  logo: string;
  codec: string;
  bitrate: number;
  hls: boolean;
  lastCheckOk: boolean;
  votes: number;
  clickCount: number;
  clickTrend: number;
}

export type LangCode = 'ar' | 'en' | 'fr';

export interface CountryInfo {
  name: string;
  code: string;
  stationCount: number;
}

export interface FavoriteItem {
  station: Station;
  addedAt: number;
}

export interface RecentItem {
  station: Station;
  playedAt: number;
}

export interface Settings {
  uiLanguage: 'ar' | 'en' | 'fr';
  theme: 'dark' | 'light';
  defaultVolume: number;
  autoplay: boolean;
  startupBehavior: 'none' | 'lastStation';
  sleepTimerMinutes: number | null;
}
