import type { Station } from '../types/station';
import { fetchChannels, type TvChannel } from './channels';

function toStation(c: TvChannel): Station {
  return {
    id: c.id,
    name: c.name,
    country: c.country,
    countryCode: c.countryCode,
    state: '',
    city: '',
    language: c.language,
    languageCodes: [c.language.toLowerCase().slice(0, 2)],
    languages: [c.language.toLowerCase().slice(0, 2)],
    tags: [c.category],
    url: c.url,
    urlRaw: c.url,
    homepage: '',
    logo: c.logo,
    codec: 'HLS',
    bitrate: 0,
    hls: true,
    lastCheckOk: c.stable,
    votes: 0,
    clickCount: 0,
    clickTrend: 0,
  };
}

export async function fetchStations(): Promise<Station[]> {
  const chs = await fetchChannels();
  return chs.map(toStation);
}
export async function fetchPopular(_limit = 50): Promise<Station[]> { return fetchStations(); }
export async function fetchByLanguage(_lang: string, _limit = 50): Promise<Station[]> { return fetchStations(); }
export async function fetchChannelsByCategory(category: string, countries: string[] = ['us', 'gb', 'fr', 'de']): Promise<Station[]> {
  const { fetchCountryChannels } = await import('./channels');
  const out: Station[] = [];
  for (const c of countries) {
    const chs = await fetchCountryChannels(c.toUpperCase());
    for (const ch of chs) {
      if ((ch.category || '').toLowerCase().includes(category.toLowerCase())) {
        out.push({
          id: ch.id, name: ch.name, country: ch.country, countryCode: ch.countryCode,
          state: '', city: '', language: ch.language, languageCodes: [], languages: [],
          tags: [ch.category], url: ch.url, urlRaw: ch.url, homepage: '', logo: ch.logo,
          codec: 'HLS', bitrate: 0, hls: true, lastCheckOk: ch.stable, votes: 0, clickCount: 0, clickTrend: 0,
        });
      }
    }
  }
  // dedupe by name
  const seen = new Set<string>();
  const deduped: Station[] = [];
  for (const s of out) {
    if (seen.has(s.name)) continue;
    seen.add(s.name);
    deduped.push(s);
  }
  return deduped.slice(0, 200);
}

export async function fetchByCountry(code: string, _limit = 1000): Promise<Station[]> {
  const { fetchCountryChannels } = await import('./channels');
  const chs = await fetchCountryChannels(code);
  // map to Station
  return chs.map((c) => ({
    id: c.id,
    name: c.name,
    country: c.country,
    countryCode: c.countryCode,
    state: '',
    city: '',
    language: c.language,
    languageCodes: [],
    languages: [],
    tags: [c.category],
    url: c.url,
    urlRaw: c.url,
    homepage: '',
    logo: c.logo,
    codec: 'HLS',
    bitrate: 0,
    hls: true,
    lastCheckOk: c.stable,
    votes: 0,
    clickCount: 0,
    clickTrend: 0,
  }));
}
export async function fetchStationById(id: string): Promise<Station | null> {
  const all = await fetchStations();
  return all.find((s) => s.id === id) || null;
}
import { COUNTRIES } from '../utils/countries';

export async function fetchCountries() {
  const all = await fetchStations();
  const map = new Map<string, { name: string; code: string; stationCount: number }>();
  for (const c of COUNTRIES) {
    map.set(c.code, { name: c.name, code: c.code, stationCount: 0 });
  }
  for (const s of all) {
    if (map.has(s.countryCode)) map.get(s.countryCode)!.stationCount += 1;
  }
  return Array.from(map.values());
}
export async function fetchLanguages() {
  return [
    { name: 'English', code: 'en', count: 0 },
    { name: 'Arabic', code: 'ar', count: 0 },
    { name: 'French', code: 'fr', count: 0 },
  ];
}
