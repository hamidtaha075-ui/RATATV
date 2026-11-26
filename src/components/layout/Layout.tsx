import { useEffect } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';
import Player from '../player/Player';
import { useApp } from '../../context/AppContext';

export default function Layout({ children }: { children?: React.ReactNode }) {
  const navigate = useNavigate();
  const app = useApp();
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape' || e.key === 'Backspace') {
        if (app.currentStation) {
          app.stop();
        } else {
          navigate(-1);
        }
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [app, navigate]);
  return (
    <div className="app-shell">
      <Header />
      <div className="app-body">
        <Sidebar />
        <main className="app-main">{children ?? <Outlet />}</main>
      </div>
      <Player />
    </div>
  );
}
