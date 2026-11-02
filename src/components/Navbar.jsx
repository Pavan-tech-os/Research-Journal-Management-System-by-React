import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';

export default function Navbar() {
  const { user, signOut } = useAuth();
  const nav = useNavigate();
  const [open, setOpen] = useState(false);
  const [theme, setTheme] = useState(document.documentElement.dataset.theme || 'light');
  const close = () => setOpen(false);
  const toggleTheme = () => {
    const t = theme === 'light' ? 'dark' : 'light';
    setTheme(t);
    document.documentElement.dataset.theme = t;
    localStorage.setItem('rjms_theme', t);
  };
  const logout = () => { signOut(); close(); nav('/'); };

  return (
    <header className="navbar">
      <div className="container nav-inner">
        <Link to="/" className="brand" onClick={close}>
          <span className="brand-mark">R</span> Research Journal
        </Link>
        <button className="menu-btn" onClick={() => setOpen(!open)} aria-label="Toggle menu">☰</button>
        <nav className={`nav-links ${open ? 'open' : ''}`} onClick={close}>
          <NavLink to="/" end>Home</NavLink>
          <Link to="/#about">About</Link>
          <Link to="/#features">Features</Link>
          <NavLink to="/published">Published Papers</NavLink>
          <NavLink to="/archive">Research Archive</NavLink>
          {user ? (
            <>
              <NavLink to={`/${user.role}`}>Dashboard</NavLink>
              <button className="btn btn-outline btn-sm" onClick={logout}>Logout</button>
            </>
          ) : (
            <>
              <NavLink to="/login">Login</NavLink>
              <Link to="/register" className="btn btn-sm">Register</Link>
            </>
          )}
          <button className="theme-btn" onClick={(e) => { e.stopPropagation(); toggleTheme(); }}>
            {theme === 'light' ? 'Dark' : 'Light'}
          </button>
        </nav>
      </div>
    </header>
  );
}
