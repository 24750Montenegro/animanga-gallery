import Gallery from '../components/Gallery.jsx';
import { useApp } from '../hooks/useApp.js';

export default function Favorites() {
  const { favorites } = useApp();

  return (
    <main className="container">
      <div className="page-head">
        <h1 className="page-title">Favoritos</h1>
        <p className="page-copy">Tu seleccion guardada localmente en este navegador.</p>
      </div>
      <Gallery
        items={favorites}
        showType
        emptyText="Aun no tienes favoritos guardados."
      />
    </main>
  );
}
