import { useState } from 'react';
import Filters from '../components/Filters.jsx';
import Gallery from '../components/Gallery.jsx';
import Loader from '../components/Loader.jsx';
import { searchAnime } from '../api/animeService.js';
import { getAnimeGenres, getMangaGenres } from '../api/genresService.js';
import { searchManga } from '../api/mangaService.js';
import { initialFilters } from '../data/filterOptions.js';
import { normalizeItems } from '../data/itemMappers.js';
import { useFetch } from '../hooks/useFetch.js';

const LIMIT = 24;

export default function ItemsPage() {
  const [filters, setFilters] = useState(initialFilters);
  const [activeFilters, setActiveFilters] = useState(initialFilters);
  const [page, setPage] = useState(1);
  const [visibleItems, setVisibleItems] = useState([]);

  const genresRequest = filters.type === 'anime' ? getAnimeGenres : getMangaGenres;
  const searchRequest = activeFilters.type === 'anime' ? searchAnime : searchManga;

  const { data: genresData } = useFetch(() => genresRequest(), [filters.type]);
  const { data, loading, error } = useFetch(
    () => searchRequest({ ...activeFilters, page, limit: LIMIT }),
    [activeFilters, page],
    {
      onSuccess: (response) => {
        const nextItems = normalizeItems(response?.data ?? [], activeFilters.type);

        setVisibleItems((current) => {
          if (page === 1) return nextItems;

          const existing = new Set(current.map((item) => `${item.type}-${item.id}`));
          const freshItems = nextItems.filter((item) => !existing.has(`${item.type}-${item.id}`));
          return [...current, ...freshItems];
        });
      },
    }
  );

  const pagination = data?.pagination;

  const handleChange = (field, value) => {
    setFilters((current) => ({
      ...current,
      [field]: value,
      ...(field === 'type' ? { genre: '' } : {}),
    }));
  };

  const handleSubmit = () => {
    setVisibleItems([]);
    setPage(1);
    setActiveFilters(filters);
  };

  const handleReset = () => {
    setVisibleItems([]);
    setFilters(initialFilters);
    setActiveFilters(initialFilters);
    setPage(1);
  };

  return (
    <main className="container">
      <div className="page-head">
        <h1 className="page-title">Galeria</h1>
        <p className="page-copy">Filtra anime y manga por categoria, texto y calificacion minima.</p>
      </div>

      <Filters
        values={filters}
        genres={genresData?.data ?? []}
        onChange={handleChange}
        onSubmit={handleSubmit}
        onReset={handleReset}
      />

      {loading && visibleItems.length === 0 && <Loader />}
      {error && <p className="error-box">No se pudieron cargar los resultados.</p>}
      {!error && visibleItems.length > 0 && (
        <>
          <Gallery items={visibleItems} showType />
          <div className="pagination">
            <button
              disabled={!pagination?.has_next_page}
              onClick={() => setPage((value) => value + 1)}
            >
              Cargar mas
            </button>
            <span>{visibleItems.length} resultados visibles</span>
          </div>
          {loading && <p className="muted results-loading">Cargando mas resultados...</p>}
        </>
      )}
    </main>
  );
}
