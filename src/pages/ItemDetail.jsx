import { Link, useParams, useSearchParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import Loader from '../components/Loader.jsx';
import { getAnimeById } from '../api/animeService.js';
import { getMangaById } from '../api/mangaService.js';
import { normalizeDetail } from '../data/itemMappers.js';
import { useApp } from '../hooks/useApp.js';
import { useFetch } from '../hooks/useFetch.js';
import '../styles/Detail.css';

function BackIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M19 12H5" />
      <path d="m12 19-7-7 7-7" />
    </svg>
  );
}

function BackToGalleryLink({ className = 'detail-back-link' }) {
  return (
    <Link to="/items" className={className}>
      <BackIcon />
      <span>Volver a la galeria</span>
    </Link>
  );
}

BackToGalleryLink.propTypes = {
  className: PropTypes.string,
};

export default function ItemDetail() {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const type = searchParams.get('type') === 'manga' ? 'manga' : 'anime';
  const request = type === 'anime' ? getAnimeById : getMangaById;
  const { data, loading, error } = useFetch(() => request(id), [id, type]);
  const { isFavorite, toggleFavorite } = useApp();

  if (loading) {
    return (
      <main className="container">
        <Loader />
      </main>
    );
  }

  if (error || !data?.data) {
    return (
      <main className="container">
        <p className="error-box">No se pudo cargar el detalle solicitado.</p>
        <BackToGalleryLink className="btn-link detail-back-button" />
      </main>
    );
  }

  const item = normalizeDetail(data.data, type);
  const favorite = isFavorite(item.id, item.type);

  return (
    <main className="container">
      <BackToGalleryLink />
      <article className="detail">
        <div className="detail-cover">
          {item.image ? <img src={item.image} alt={item.title} /> : <span>Sin imagen</span>}
        </div>
        <div className="detail-content">
          <p className="detail-kicker">{item.type}</p>
          <h1 className="detail-title">{item.title}</h1>
          {item.titleJapanese && <p className="detail-jp">{item.titleJapanese}</p>}

          <div className="detail-stats">
            <span className="stat-pill"><strong>Score</strong>{item.score ?? 'N/A'}</span>
            <span className="stat-pill"><strong>Rank</strong>{item.rank ?? 'N/A'}</span>
            <span className="stat-pill"><strong>Tipo</strong>{item.format}</span>
            <span className="stat-pill">
              <strong>{item.countLabel}</strong>{item.count ?? 'N/A'}
            </span>
          </div>

          <div className="detail-genres">
            {item.genres.map((genre) => (
              <span className="genre-tag" key={genre.mal_id}>{genre.name}</span>
            ))}
          </div>

          <p className="detail-synopsis">{item.synopsis}</p>

          <div className="detail-actions">
            <button
              className={favorite ? 'btn-primary' : ''}
              onClick={() => toggleFavorite(item)}
            >
              {favorite ? 'Quitar de favoritos' : 'Agregar a favoritos'}
            </button>
          </div>
        </div>
      </article>
    </main>
  );
}
