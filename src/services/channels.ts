export interface TvChannel {
  id: string;
  name: string;
  country: string;
  countryCode: string;
  language: string;
  category: string;
  logo: string;
  url: string;
  stable: boolean;
  source: string;
}

export const STABLE_CHANNELS: TvChannel[] = [
  { id: 'aj-en', name: 'Al Jazeera English', country: 'Qatar', countryCode: 'QA', language: 'English', category: 'News', logo: 'https://www.aljazeera.com/favicon.ico', url: 'https://live-hls-web-aje.getaj.net/AJE/01.m3u8', stable: true, source: 'Official' },
  { id: 'aj-ar', name: 'Al Jazeera Arabic', country: 'Qatar', countryCode: 'QA', language: 'Arabic', category: 'News', logo: 'https://www.aljazeera.com/favicon.ico', url: 'https://live-hls-web-aja.getaj.net/AJA/01.m3u8', stable: true, source: 'Official' },
  { id: 'dw-en', name: 'DW English', country: 'Germany', countryCode: 'DE', language: 'English', category: 'News', logo: 'https://www.dw.com/favicon.ico', url: 'https://dwamdstream102.akamaized.net/hls/live/2015525/dwstream102/index.m3u8', stable: true, source: 'Official' },
  { id: 'dw-ar', name: 'DW Arabic', country: 'Germany', countryCode: 'DE', language: 'Arabic', category: 'News', logo: 'https://www.dw.com/favicon.ico', url: 'https://dwamdstream103.akamaized.net/hls/live/2015526/dwstream103/index.m3u8', stable: true, source: 'Official' },
  { id: 'fr24-en', name: 'France 24 English', country: 'France', countryCode: 'FR', language: 'English', category: 'News', logo: 'https://www.france24.com/favicon.ico', url: 'https://static.france24.com/live/F24_EN_HI_HLS/live_web.m3u8', stable: true, source: 'Official' },
  { id: 'fr24-fr', name: 'France 24 French', country: 'France', countryCode: 'FR', language: 'French', category: 'News', logo: 'https://www.france24.com/favicon.ico', url: 'https://static.france24.com/live/F24_FR_HI_HLS/live_web.m3u8', stable: true, source: 'Official' },
  { id: 'fr24-ar', name: 'France 24 Arabic', country: 'France', countryCode: 'FR', language: 'Arabic', category: 'News', logo: 'https://www.france24.com/favicon.ico', url: 'https://static.france24.com/live/F24_AR_HI_HLS/live_web.m3u8', stable: true, source: 'Official' },
  { id: 'euronews-en', name: 'Euronews English', country: 'France', countryCode: 'FR', language: 'English', category: 'News', logo: 'https://www.euronews.com/favicon.ico', url: 'https://rakuten-euronews-1-eu.rakuten.wurl.tv/playlist.m3u8', stable: true, source: 'Official' },
  { id: 'euronews-fr', name: 'Euronews French', country: 'France', countryCode: 'FR', language: 'French', category: 'News', logo: 'https://www.euronews.com/favicon.ico', url: 'https://rakuten-euronews-2-eu.rakuten.wurl.tv/playlist.m3u8', stable: true, source: 'Official' },
  { id: 'euronews-ar', name: 'Euronews Arabic', country: 'France', countryCode: 'FR', language: 'Arabic', category: 'News', logo: 'https://www.euronews.com/favicon.ico', url: 'https://rakuten-euronews-7-eu.rakuten.wurl.tv/playlist.m3u8', stable: true, source: 'Official' },
  { id: 'skynews-arabia', name: 'Sky News Arabia', country: 'UAE', countryCode: 'AE', language: 'Arabic', category: 'News', logo: 'https://www.skynewsarabia.com/favicon.ico', url: 'https://stream.skynewsarabia.com/hls/sna.m3u8', stable: true, source: 'Official' },
  { id: 'nhk-world', name: 'NHK World Japan', country: 'Japan', countryCode: 'JP', language: 'English', category: 'News', logo: 'https://www3.nhk.or.jp/nhkworld/common/sns.png', url: 'https://nhkwlive-ojp.akamaized.net/hls/live/2003459/nhkwlive-ojp-en/index.m3u8', stable: true, source: 'Official' },
  { id: 'rt-en', name: 'RT English', country: 'Russia', countryCode: 'RU', language: 'English', category: 'News', logo: 'https://www.rt.com/favicon.ico', url: 'https://rt-glb.rttv.com/live/rtnews/playlist.m3u8', stable: true, source: 'Official' },
  { id: 'rt-ar', name: 'RT Arabic', country: 'Russia', countryCode: 'RU', language: 'Arabic', category: 'News', logo: 'https://www.rt.com/favicon.ico', url: 'https://rt-arab.rttv.com/live/rtarab/playlist.m3u8', stable: true, source: 'Official' },
  { id: 'cna', name: 'CNA (Channel NewsAsia)', country: 'Singapore', countryCode: 'SG', language: 'English', category: 'News', logo: 'https://www.channelnewsasia.com/favicon.ico', url: 'https://d2e1asnsl7br7b.cloudfront.net/7782e205e72f43aeb4a48ec97f66ebbe/index.m3u8', stable: true, source: 'Official' },
  { id: 'trt-world', name: 'TRT World', country: 'Turkey', countryCode: 'TR', language: 'English', category: 'News', logo: 'https://www.trtworld.com/favicon.ico', url: 'https://tv-trtworld.live.trt.com.tr/master.m3u8', stable: true, source: 'Official' },
  { id: 'arirang', name: 'Arirang TV', country: 'South Korea', countryCode: 'KR', language: 'English', category: 'Culture', logo: 'https://www.arirang.com/favicon.ico', url: 'https://amdlive-ch01-ctnd-com.akamaized.net/arirang_1ch/smil:arirang_1ch.smil/playlist.m3u8', stable: true, source: 'Official' },
  { id: 'cloudflare-tv', name: 'Cloudflare TV', country: 'USA', countryCode: 'US', language: 'English', category: 'Technology', logo: 'https://cloudflare.tv/favicon.ico', url: 'https://cloudflare.tv/hls/live.m3u8', stable: true, source: 'Official' },
  { id: 'classic-arts', name: 'Classic Arts Showcase', country: 'USA', countryCode: 'US', language: 'English', category: 'Culture', logo: '', url: 'https://classicarts.akamaized.net/hls/live/1024257/CAS/master.m3u8', stable: true, source: 'Official' },
  { id: 'bloomberg', name: 'Bloomberg TV', country: 'USA', countryCode: 'US', language: 'English', category: 'Business', logo: 'https://www.bloomberg.com/favicon.ico', url: 'https://bloomberg.com/media-manifest/streams/us.m3u8', stable: true, source: 'Official' },
];

export async function fetchChannels(): Promise<TvChannel[]> {
  return STABLE_CHANNELS;
}

// Fetch community channels for a given country from iptv-org (raw GitHub).
export async function fetchCountryChannels(countryCode: string): Promise<TvChannel[]> {
  const code = countryCode.toLowerCase();
  const url = `https://raw.githubusercontent.com/iptv-org/iptv/master/streams/${code}.m3u`;
  try {
    const res = await fetch(url);
    if (!res.ok) return [];
    const text = await res.text();
    return parseM3U(text, countryCode.toUpperCase());
  } catch {
    return [];
  }
}

const ARABIC_COUNTRIES = new Set(['SA','AE','EG','IQ','JO','LB','SY','KW','QA','BH','OM','YE','PS','MA','DZ','TN','LY','SD','MR','SO','DJ','KM']);

function langForCountry(code: string): string {
  return ARABIC_COUNTRIES.has(code.toUpperCase()) ? 'Arabic' : 'Unknown';
}

function parseM3U(text: string, countryCode: string): TvChannel[] {
  const lines = text.split('\n');
  const out: TvChannel[] = [];
  let current: Partial<TvChannel> | null = null;
  let idx = 0;
  for (const raw of lines) {
    const line = raw.trim();
    if (line.startsWith('#EXTINF')) {
      const nameMatch = line.match(/,(.+)$/);
      const name = nameMatch ? nameMatch[1].trim() : 'Unknown';
      const logoMatch = line.match(/tvg-logo="([^"]*)"/);
      const logo = logoMatch ? logoMatch[1] : '';
      const groupMatch = line.match(/group-title="([^"]*)"/);
      const category = groupMatch ? groupMatch[1] : 'General';
      current = { name, logo, category };
    } else if (line && !line.startsWith('#') && current) {
      out.push({
        id: `iptv-${countryCode}-${idx++}`,
        name: current.name || 'Unknown',
        country: countryCode,
        countryCode,
        language: langForCountry(countryCode),
        category: current.category || 'General',
        logo: current.logo || '',
        url: line,
        stable: false,
        source: 'Community (iptv-org)',
      });
      current = null;
    }
  }
  return out;
}
