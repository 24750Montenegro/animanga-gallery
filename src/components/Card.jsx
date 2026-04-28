import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useApp } from '../context/AppContext.jsx';
import '../styles/Card.css';

export default function Card({ id, type, title, image, score, year, showType = false }) {
  const { isFavorite, toggleFavorite } = useApp();
  const fav = isFavorite(id, type);

  const handleFavorite = (event) => {
    event.preventDefault();
    event.stopPropagation();
    toggleFavorite({ id, type, title, image, score, year });
  };

  return (
    <Link to={`/items/${id}?type=${type}`} className="card">
      {showType && <span className="card-type-badge">{type}</span>}
      <button
        className={fav ? 'fav-btn active' : 'fav-btn'}
        onClick={handleFavorite}
        aria-label={fav ? 'Quitar de favoritos' : 'Agregar a favoritos'}
      >
        {fav ? '★' : '☆'}
      </button>
      <div className="card-image">
        {image ? <img src={image} alt={title} loading="lazy" /> : <span>Sin imagen</span>}
      </div>
      <div className="card-body">
        <h3 className="card-title">{title}</h3>
        <div className="card-meta">
          <span>{year || '-'}</span>
          <span className="card-score">{score ? score.toFixed(1) : 'N/A'}</span>
        </div>
      </div>
    </Link>
  );
}

Card.propTypes = {
  id: PropTypes.number.isRequired,
  type: PropTypes.oneOf(['anime', 'manga']).isRequired,
  title: PropTypes.string.isRequired,
  image: PropTypes.string,
  score: PropTypes.number,
  year: PropTypes.number,
  showType: PropTypes.bool,
};
