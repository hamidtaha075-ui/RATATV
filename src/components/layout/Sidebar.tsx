import { useFocusable } from '@noriginmedia/norigin-spatial-navigation';
import { useNavigate } from 'react-router-dom';
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

function NavItem({ to, icon, label }: { to: string; icon: string; label: string }) {
  const navigate = useNavigate();
  const { ref, focused } = useFocusable({
    onEnterPress: () => navigate(to),
  });
  return (
    <div ref={ref} className={`nav-item ${focused ? 'focused' : ''}`} tabIndex={0}>
      <span className="nav-icon">{icon}</span>
      <span className="nav-label">{label}</span>
    </div>
  );
}

export default function Sidebar() {
  const { t } = useTranslation();
  return (
    <aside className="app-sidebar">
      <nav>
        {items.map((it) => (
          <NavItem key={it.to} to={it.to} icon={it.icon} label={t(`nav.${it.key}`)} />
        ))}
      </nav>
    </aside>
  );
}
