import { Link } from 'react-router-dom';
import Gallery from '../components/Gallery.jsx';
import Loader from '../components/Loader.jsx';
import { searchAnime } from '../api/animeService.js';
import { homeContent } from '../data/appContent.js';
import { normalizeItems } from '../data/itemMappers.js';
import { useFetch } from '../hooks/useFetch.js';
import '../styles/Home.css';

export default function Home() {
  const { data, loading, error } = useFetch(
    () => searchAnime({ limit: 6, minScore: 8 }),
    []
  );
  const featured = normalizeItems(data?.data ?? [], 'anime');

  return (
    <main className="container">
      <section className="hero">
        <div>
          <h1 className="hero-title">{homeContent.title}</h1>
          <p className="hero-text">{homeContent.text}</p>
          <div className="hero-cta">
            <Link to="/items" className="btn-link btn-primary">Explorar galeria</Link>
            <Link to="/favorites" className="btn-link">Ver favoritos</Link>
          </div>
        </div>
      </section>

      <section className="section">
        <h2>Lo esencial</h2>
        <div className="feature-grid">
          {homeContent.features.map((feature) => (
            <article className="feature" key={feature.title}>
              <h3>{feature.title}</h3>
              <p>{feature.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="section-head">
          <h2>Anime destacado</h2>
          <Link to="/items" className="text-link">Ver mas</Link>
        </div>
        {loading && <Loader />}
        {error && <p className="error-box">No se pudo cargar el bloque destacado.</p>}
        {!loading && !error && <Gallery items={featured} />}
      </section>
    </main>
  );
}
