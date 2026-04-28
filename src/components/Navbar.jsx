import { Link } from 'react-router-dom';
import { navLinks } from '../data/appContent.js';
import { useApp } from '../hooks/useApp.js';
import ThemeToggle from './ThemeToggle.jsx';
import '../styles/Navbar.css';

export default function Navbar() {
  const { theme, toggleTheme } = useApp();

  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <Link to="/" className="brand">AniMangaGT</Link>
        <div className="nav-links">
          {navLinks.map((link) => (
            <Link key={link.to} to={link.to}>{link.label}</Link>
          ))}
        </div>
        <div className="nav-actions">
          <ThemeToggle theme={theme} onToggle={toggleTheme} />
        </div>
      </div>
    </nav>
  );
}
