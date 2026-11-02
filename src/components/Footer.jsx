import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div>
          <strong>Research Journal Management System</strong>
          <p className="muted small">Managing the complete research paper publication workflow.</p>
        </div>
        <div className="footer-links">
          <Link to="/">Home</Link>
          <Link to="/published">Published Papers</Link>
          <Link to="/archive">Research Archive</Link>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </div>
      </div>
      <div className="container small muted copy">© {new Date().getFullYear()} Research Journal Management System</div>
    </footer>
  );
}
