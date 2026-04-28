import { jikanFetch } from './jikan.js';

// Buscar mangas con filtros
export function searchManga({ q = '', genre = '', minScore = '', page = 1, limit = 24 } = {}) {
  return jikanFetch('/manga', {
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

export function getMangaById(id) {
  return jikanFetch(`/manga/${id}/full`);
}

export function getRandomManga() {
  return jikanFetch('/random/manga');
}
