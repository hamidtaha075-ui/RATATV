import { Outlet } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';
import Player from '../player/Player';

export default function Layout({ children }: { children?: React.ReactNode }) {
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
