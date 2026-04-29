import { jikanFetch } from './jikan.js';

// Generos usados por los filtros.
export function getAnimeGenres() {
  return jikanFetch('/genres/anime');
}

export function getMangaGenres() {
  return jikanFetch('/genres/manga');
}
