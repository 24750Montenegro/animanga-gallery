function getImage(item) {
  return (
    item.images?.webp?.large_image_url ||
    item.images?.jpg?.large_image_url ||
    item.images?.webp?.image_url ||
    item.images?.jpg?.image_url ||
    ''
  );
}

function getYear(item, type) {
  if (type === 'anime') return item.year ?? null;
  const date = item.published?.from;
  return date ? new Date(date).getFullYear() : null;
}

export function normalizeItem(item, type) {
  return {
    id: item.mal_id,
    type,
    title: item.title_english || item.title || 'Sin titulo',
    image: getImage(item),
    score: item.score ?? null,
    year: getYear(item, type),
  };
}

export function normalizeItems(items, type) {
  const seen = new Set();

  return items
    .map((item) => normalizeItem(item, type))
    .filter((item) => {
      // Jikan puede devolver entradas repetidas con titulos equivalentes.
      const normalizedTitle = item.title.toLowerCase().replace(/\s+/g, ' ').trim();
      const key = `${item.type}-${normalizedTitle || item.id}`;

      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
}

export function normalizeDetail(item, type) {
  return {
    ...normalizeItem(item, type),
    titleJapanese: item.title_japanese || '',
    status: item.status || 'Sin estado',
    rank: item.rank ?? null,
    popularity: item.popularity ?? null,
    synopsis: item.synopsis || 'Jikan no incluye una sinopsis para este titulo.',
    genres: item.genres || [],
    format: item.type || 'Sin formato',
    countLabel: type === 'anime' ? 'Episodios' : 'Capitulos',
    count: type === 'anime' ? item.episodes : item.chapters,
  };
}
