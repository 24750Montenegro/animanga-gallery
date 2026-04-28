import { jikanFetch } from './jikan.js';

const orderConfig = {
  recent: { orderBy: 'start_date', sort: 'desc' },
  popular: { orderBy: 'popularity', sort: 'asc' },
  score: { orderBy: 'score', sort: 'desc' },
};

export function searchManga({
  q = '',
  genre = '',
  minScore = '',
  sortBy = 'recent',
  page = 1,
  limit = 24,
} = {}) {
  const ordering = orderConfig[sortBy] ?? orderConfig.recent;

  return jikanFetch('/manga', {
    q,
    genres: genre,
    min_score: minScore,
    page,
    limit,
    order_by: ordering.orderBy,
    sort: ordering.sort,
    sfw: true,
  });
}

export function getMangaById(id) {
  return jikanFetch(`/manga/${id}/full`);
}

export function getRandomManga() {
  return jikanFetch('/random/manga');
}
