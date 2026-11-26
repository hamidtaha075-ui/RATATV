import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import Live from './pages/Live';
import Movies from './pages/Movies';
import Series from './pages/Series';
import Explore from './pages/Explore';
import Countries from './pages/Countries';
import CountryDetail from './pages/CountryDetail';
import Languages from './pages/Languages';
import LanguageDetail from './pages/LanguageDetail';
import Genres from './pages/Genres';
import GenreDetail from './pages/GenreDetail';
import Popular from './pages/Popular';
import Favorites from './pages/Favorites';
import Recent from './pages/Recent';
import Search from './pages/Search';
import Settings from './pages/Settings';
import StationDetail from './pages/StationDetail';

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/live" element={<Live />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/series" element={<Series />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/countries" element={<Countries />} />
        <Route path="/countries/:code" element={<CountryDetail />} />
        <Route path="/languages" element={<Languages />} />
        <Route path="/languages/:code" element={<LanguageDetail />} />
        <Route path="/genres" element={<Genres />} />
        <Route path="/genres/:tag" element={<GenreDetail />} />
        <Route path="/popular" element={<Popular />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/recent" element={<Recent />} />
        <Route path="/search" element={<Search />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/station/:id" element={<StationDetail />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Layout>
  );
}
