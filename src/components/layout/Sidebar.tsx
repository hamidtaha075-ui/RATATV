import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const items = [
  { to: '/', key: 'home', icon: '🏠' },
  { to: '/live', key: 'live', icon: '📺' },
  { to: '/movies', key: 'movies', icon: '🎬' },
  { to: '/series', key: 'series', icon: '🎞️' },
  { to: '/countries', key: 'countries', icon: '🌍' },
  { to: '/languages', key: 'languages', icon: '🗣️' },
  { to: '/genres', key: 'genres', icon: '📂' },
  { to: '/favorites', key: 'favorites', icon: '❤️' },
  { to: '/recent', key: 'recent', icon: '🕒' },
  { to: '/search', key: 'search', icon: '🔍' },
  { to: '/settings', key: 'settings', icon: '⚙️' },
];

export default function Sidebar() {
  const { t } = useTranslation();
  return (
    <aside className="app-sidebar">
      <nav>
        {items.map((it) => (
          <NavLink
            key={it.to}
            to={it.to}
            end={it.to === '/'}
            className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
          >
            <span className="nav-icon">{it.icon}</span>
            <span className="nav-label">{t(`nav.${it.key}`)}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
