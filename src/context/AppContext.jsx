import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';

const AppContext = createContext(null);
const STORAGE_KEY = 'animanga:state';

// Carga estado persistido
function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export function AppProvider({ children }) {
  const persisted = loadState();
  const [theme, setTheme] = useState(persisted?.theme ?? 'dark');
  const [favorites, setFavorites] = useState(persisted?.favorites ?? []);

  // Persistencia
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ theme, favorites }));
  }, [theme, favorites]);

  // Aplica tema al root
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  const toggleTheme = () => setTheme((t) => (t === 'dark' ? 'light' : 'dark'));

  const toggleFavorite = (item) => {
    setFavorites((prev) => {
      const exists = prev.some((f) => f.id === item.id && f.type === item.type);
      return exists
        ? prev.filter((f) => !(f.id === item.id && f.type === item.type))
        : [...prev, item];
    });
  };

  const isFavorite = (id, type) =>
    favorites.some((f) => f.id === id && f.type === type);

  const value = useMemo(
    () => ({ theme, toggleTheme, favorites, toggleFavorite, isFavorite }),
    [theme, favorites]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

AppProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp debe usarse dentro de AppProvider');
  return ctx;
}
