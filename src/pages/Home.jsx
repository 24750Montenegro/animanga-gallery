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
        <div className="source-panel">
          <div className="source-copy">
            <p className="section-kicker">{homeContent.apiCredit.eyebrow}</p>
            <h2>{homeContent.apiCredit.title}</h2>
            <p>{homeContent.apiCredit.text}</p>
          </div>
          <div className="highlight-list">
            {homeContent.highlights.map((item) => (
              <article className="highlight-item" key={item.value}>
                <strong>{item.value}</strong>
                <span>{item.label}</span>
              </article>
            ))}
          </div>
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
