import PropTypes from 'prop-types';
import { itemTypeOptions, scoreOptions } from '../data/filterOptions.js';
import '../styles/Filters.css';

export default function Filters({ values, genres = [], onChange, onSubmit, onReset }) {
  const handleSubmit = (event) => {
    event.preventDefault();
    if (onSubmit) onSubmit();
  };

  return (
    <form className="filters" onSubmit={handleSubmit}>
      <div className="filter-field filter-search">
        <label htmlFor="f-q">Busqueda</label>
        <input
          id="f-q"
          type="search"
          value={values.q}
          placeholder="Titulo..."
          onChange={(event) => onChange('q', event.target.value)}
        />
      </div>

      <div className="filter-field">
        <label htmlFor="f-type">Tipo</label>
        <select
          id="f-type"
          value={values.type}
          onChange={(event) => onChange('type', event.target.value)}
        >
          {itemTypeOptions.map((option) => (
            <option key={option.value} value={option.value}>{option.label}</option>
          ))}
        </select>
      </div>

      <div className="filter-field">
        <label htmlFor="f-genre">Categoria</label>
        <select
          id="f-genre"
          value={values.genre}
          onChange={(event) => onChange('genre', event.target.value)}
        >
          <option value="">Todas</option>
          {genres.map((genre) => (
            <option key={genre.mal_id} value={genre.mal_id}>{genre.name}</option>
          ))}
        </select>
      </div>

      <div className="filter-field">
        <label htmlFor="f-score">Calificacion min.</label>
        <select
          id="f-score"
          value={values.minScore}
          onChange={(event) => onChange('minScore', event.target.value)}
        >
          {scoreOptions.map((option) => (
            <option key={option.label} value={option.value}>{option.label}</option>
          ))}
        </select>
      </div>

      <div className="filter-field filter-actions-field">
        <span className="filter-spacer" aria-hidden="true" />
        <div className="filter-actions">
          <button type="submit" className="btn-primary">Aplicar</button>
          <button type="button" onClick={onReset}>Limpiar</button>
        </div>
      </div>
    </form>
  );
}

Filters.propTypes = {
  values: PropTypes.shape({
    q: PropTypes.string.isRequired,
    type: PropTypes.oneOf(['anime', 'manga']).isRequired,
    genre: PropTypes.string.isRequired,
    minScore: PropTypes.string.isRequired,
  }).isRequired,
  genres: PropTypes.arrayOf(
    PropTypes.shape({
      mal_id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    })
  ),
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func,
  onReset: PropTypes.func,
};
