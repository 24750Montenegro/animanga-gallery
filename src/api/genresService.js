import { jikanFetch } from './jikan.js';

// Géneros para filtros
export function getAnimeGenres() {
  return jikanFetch('/genres/anime');
}

export function getMangaGenres() {
  return jikanFetch('/genres/manga');
}
