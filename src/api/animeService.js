import { jikanFetch } from './jikan.js';

const orderConfig = {
  recent: { orderBy: 'start_date', sort: 'desc' },
  popular: { orderBy: 'popularity', sort: 'asc' },
  score: { orderBy: 'score', sort: 'desc' },
};

export function searchAnime({
  q = '',
  genre = '',
  minScore = '',
  sortBy = 'recent',
  page = 1,
  limit = 24,
} = {}) {
  const ordering = orderConfig[sortBy] ?? orderConfig.recent;

  return jikanFetch('/anime', {
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

export function getAnimeById(id) {
  return jikanFetch(`/anime/${id}/full`);
}

export function getRandomAnime() {
  return jikanFetch('/random/anime');
}
