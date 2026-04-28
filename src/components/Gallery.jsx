import PropTypes from 'prop-types';
import Card from './Card.jsx';
import '../styles/Gallery.css';

export default function Gallery({ items, showType = false, emptyText = 'Sin resultados.' }) {
  if (!items || items.length === 0) {
    return <p className="gallery-empty">{emptyText}</p>;
  }

  return (
    <div className="gallery">
      {items.map((item) => (
        <Card key={`${item.type}-${item.id}`} {...item} showType={showType} />
      ))}
    </div>
  );
}

Gallery.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  showType: PropTypes.bool,
  emptyText: PropTypes.string,
};
