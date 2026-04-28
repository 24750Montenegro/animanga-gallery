import { jikanFetch } from './jikan.js';

// Buscar animes con filtros
export function searchAnime({ q = '', genre = '', minScore = '', page = 1, limit = 24 } = {}) {
  return jikanFetch('/anime', {
    q,
    genres: genre,
    min_score: minScore,
    page,
    limit,
    order_by: 'popularity',
    sort: 'asc',
    sfw: true,
  });
}

// Detalle por id
export function getAnimeById(id) {
  return jikanFetch(`/anime/${id}/full`);
}

// Aleatorio
export function getRandomAnime() {
  return jikanFetch('/random/anime');
}
