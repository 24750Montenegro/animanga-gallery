import '../styles/Loader.css';

// Spinner simple
export default function Loader() {
  return (
    <div className="loader" role="status" aria-label="Cargando">
      <div className="loader-spinner" />
    </div>
  );
}
