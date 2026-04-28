import { Link } from 'react-router-dom';
import { navLinks } from '../data/appContent.js';
import { useApp } from '../hooks/useApp.js';
import '../styles/Navbar.css';

export default function Navbar() {
  const { theme, toggleTheme } = useApp();

  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <Link to="/" className="brand">animanga</Link>
        <div className="nav-links">
          {navLinks.map((link) => (
            <Link key={link.to} to={link.to}>{link.label}</Link>
          ))}
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
