import { useCallback, useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { AppContext } from './appContext.js';

const STORAGE_KEY = 'animanga:state';

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export default function AppProvider({ children }) {
  const persisted = loadState();
  const [theme, setTheme] = useState(persisted?.theme ?? 'dark');
  const [favorites, setFavorites] = useState(persisted?.favorites ?? []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ theme, favorites }));
  }, [theme, favorites]);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme((current) => (current === 'dark' ? 'light' : 'dark'));
  }, []);

  const toggleFavorite = useCallback((item) => {
    setFavorites((current) => {
      const exists = current.some((favorite) => (
        favorite.id === item.id && favorite.type === item.type
      ));

      if (exists) {
        return current.filter((favorite) => !(
          favorite.id === item.id && favorite.type === item.type
        ));
      }

      return [...current, item];
    });
  }, []);

  const isFavorite = useCallback(
    (id, type) => favorites.some((favorite) => favorite.id === id && favorite.type === type),
    [favorites]
  );

  const value = useMemo(
    () => ({ theme, toggleTheme, favorites, toggleFavorite, isFavorite }),
    [theme, toggleTheme, favorites, toggleFavorite, isFavorite]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

AppProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
