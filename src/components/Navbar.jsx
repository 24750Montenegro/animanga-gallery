import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext.jsx';
import '../styles/Navbar.css';

export default function Navbar() {
  const { theme, toggleTheme } = useApp();

  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <Link to="/" className="brand">animanga</Link>
        <div className="nav-links">
          <Link to="/">Inicio</Link>
          <Link to="/items">Galeria</Link>
          <Link to="/favorites">Favoritos</Link>
        </div>
        <div className="nav-actions">
          <button onClick={toggleTheme} aria-label="Cambiar tema">
            {theme === 'dark' ? 'Claro' : 'Oscuro'}
          </button>
        </div>
      </div>
    </nav>
  );
}
