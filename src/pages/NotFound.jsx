import { Link } from 'react-router-dom';
import '../styles/NotFound.css';

export default function NotFound() {
  return (
    <main className="not-found">
      <h1>404</h1>
      <p>La ruta que buscas no existe.</p>
      <Link to="/" className="btn-link btn-primary">Ir al inicio</Link>
    </main>
  );
}
