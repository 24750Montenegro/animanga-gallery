export const itemTypeOptions = [
  { value: 'anime', label: 'Anime' },
  { value: 'manga', label: 'Manga' },
];

export const scoreOptions = [
  { value: '', label: 'Cualquiera' },
  { value: '5', label: '5+' },
  { value: '6', label: '6+' },
  { value: '7', label: '7+' },
  { value: '8', label: '8+' },
  { value: '9', label: '9+' },
];

export const sortOptions = [
  { value: 'recent', label: 'Mas recientes' },
  { value: 'popular', label: 'Mas populares' },
  { value: 'score', label: 'Mejor calificadas' },
];

export const initialFilters = {
  q: '',
  type: 'anime',
  genre: '',
  minScore: '',
  sortBy: 'recent',
};
