export function countryCodeToFlag(code: string): string {
  if (!code || code.length !== 2) return '🌐';
  const c = code.toUpperCase();
  const base = 127397;
  return String.fromCodePoint(...[...c].map((ch) => base + ch.charCodeAt(0)));
}

export function normalizeCountryName(name: string): string {
  if (!name) return '';
  return name
    .replace(/^The\s+/i, '')
    .replace(/\s+/g, ' ')
    .trim();
}
