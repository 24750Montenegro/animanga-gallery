import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Card from '../components/Card.jsx';
import Gallery from '../components/Gallery.jsx';
import Loader from '../components/Loader.jsx';
import { getRandomAnime, searchAnime } from '../api/animeService.js';
import { getRandomManga } from '../api/mangaService.js';
import { homeContent } from '../data/appContent.js';
import { normalizeItem, normalizeItems } from '../data/itemMappers.js';
import { useFetch } from '../hooks/useFetch.js';
import '../styles/Home.css';

export default function Home() {
  // Semillas simples para volver a pedir random sin desmontar la pagina.
  const [randomReloads, setRandomReloads] = useState({ anime: 0, manga: 0 });
  const [isSurpriseLoading, setIsSurpriseLoading] = useState(false);
  const navigate = useNavigate();

  const { data, loading, error } = useFetch(
    () => searchAnime({ limit: 5, minScore: 8 }),
    []
  );
  const randomAnime = useFetch(getRandomAnime, [randomReloads.anime]);
  const randomManga = useFetch(getRandomManga, [randomReloads.manga]);
  const featured = normalizeItems(data?.data ?? [], 'anime');
  const randomPicks = [
    {
      type: 'anime',
      title: 'Anime aleatorio',
      state: randomAnime,
      item: randomAnime.data?.data ? normalizeItem(randomAnime.data.data, 'anime') : null,
    },
    {
      type: 'manga',
      title: 'Manga aleatorio',
      state: randomManga,
      item: randomManga.data?.data ? normalizeItem(randomManga.data.data, 'manga') : null,
    },
  ];

  const refreshRandom = (type) => {
    setRandomReloads((current) => ({
      ...current,
      [type]: current[type] + 1,
    }));
  };

  const handleSurprise = async () => {
    try {
      setIsSurpriseLoading(true);
      const isAnime = Math.random() > 0.5;
      const type = isAnime ? 'anime' : 'manga';
      const response = isAnime ? await getRandomAnime() : await getRandomManga();
      const id = response.data.mal_id;
      navigate(`/items/${id}?type=${type}`);
    } catch (err) {
      console.error('Error fetching random item:', err);
    } finally {
      setIsSurpriseLoading(false);
    }
  };

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

{/*  CREDITOS DE LA API
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
      </section> */}

      <section className="section">
        <div className="section-head">
          <div>
            <p className="section-kicker">Descubre algo nuevo</p>
            <h2>Seleccion aleatoria</h2>
          </div>
        </div>
        <div className="random-grid">
          {randomPicks.map(({ type, title, state, item }) => (
            <div className="random-column" key={type}>
              <div className="random-title-row">
                <h3>{title}</h3>
                <button
                  type="button"
                  onClick={() => refreshRandom(type)}
                  disabled={state.loading}
                >
                  {state.loading ? 'Cargando' : 'Cambiar'}
                </button>
              </div>
              {state.loading && !item && <Loader />}
              {state.error && <p className="error-box">No se pudo cargar este recomendado.</p>}
              {item && <Card {...item} showType />}
            </div>
          ))}
        </div>
        <div className="random-surprise-container">
          <button 
            onClick={handleSurprise} 
            className="btn-primary surprise-btn" 
            disabled={isSurpriseLoading}
          >
            {isSurpriseLoading ? 'Cargando...' : '¡Sorpréndeme con un anime o manga!'}
          </button>
        </div>
      </section>

      <section className="section">
        <div className="section-head">
          <h2>Anime destacado</h2>
        </div>
        {loading && <Loader />}
        {error && <p className="error-box">No se pudo cargar el bloque destacado.</p>}
        {!loading && !error && (
          <>
            <Gallery items={featured} />
            <div className="featured-more">
              <Link to="/items" className="btn-link btn-primary">Ver mas</Link>
            </div>
          </>
        )}
      </section>
    </main>
  );
}
