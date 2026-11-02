import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import Img from '../components/Img';

const demo = { author: 'author@demo.com', editor: 'editor@demo.com', reviewer: 'reviewer@demo.com' };

export default function Login() {
  const { signIn } = useAuth();
  const nav = useNavigate();
  const [f, setF] = useState({ role: 'author', email: '', password: '' });
  const [err, setErr] = useState('');
  const set = (k, v) => setF({ ...f, [k]: v });

  const submit = (e) => {
    e.preventDefault();
    const r = signIn(f.email, f.password, f.role);
    if (r.error) return setErr(r.error);
    nav(`/${f.role}`);
  };

  return (
    <main className="auth">
      <div className="auth-image">
        <Img src="/assets/images/research-hero.jpg" alt="Research" />
        <div className="auth-overlay">
          <h2>Research Journal Management System</h2>
          <p>Submit, review and publish research in one place.</p>
        </div>
      </div>
      <div className="auth-form-wrap">
        <form className="auth-form" onSubmit={submit}>
          <h1>Login</h1>
          <p className="muted">Select your role and sign in.</p>
          <div className="seg">
            {['author', 'editor', 'reviewer'].map((r) => (
              <button type="button" key={r} className={f.role === r ? 'active' : ''} onClick={() => set('role', r)}>
                {r[0].toUpperCase() + r.slice(1)}
              </button>
            ))}
          </div>
          {err && <div className="alert">{err}</div>}
          <label>Email<input type="email" required value={f.email} onChange={(e) => set('email', e.target.value)} /></label>
          <label>Password<input type="password" required value={f.password} onChange={(e) => set('password', e.target.value)} /></label>
          <button className="btn full">Login</button>
          <button type="button" className="link-btn" onClick={() => setF({ ...f, email: demo[f.role], password: 'demo123' })}>
            Fill demo credentials for {f.role}
          </button>
          <p className="small">New here? <Link to="/register">Create an account</Link></p>
        </form>
      </div>
    </main>
  );
}
