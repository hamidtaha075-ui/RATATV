import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import { init } from '@noriginmedia/norigin-spatial-navigation';
import './i18n';
import { AppProvider } from './context/AppContext';
import App from './App';
import './index.css';

init({ debug: false, visualDebug: false });

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HashRouter>
      <AppProvider>
        <App />
      </AppProvider>
    </HashRouter>
  </StrictMode>,
);
