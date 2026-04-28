import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import AppProvider from './context/AppProvider.jsx';
import Favorites from './pages/Favorites.jsx';
import Home from './pages/Home.jsx';
import ItemDetail from './pages/ItemDetail.jsx';
import ItemsPage from './pages/ItemsPage.jsx';
import NotFound from './pages/NotFound.jsx';

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/items" element={<ItemsPage />} />
          <Route path="/items/:id" element={<ItemDetail />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}
