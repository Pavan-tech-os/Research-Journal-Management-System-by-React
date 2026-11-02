import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import Img from '../components/Img';

export default function Register() {
  const { signUp } = useAuth();
  const nav = useNavigate();
  const [f, setF] = useState({ name: '', email: '', affiliation: '', role: 'author', password: '', confirm: '' });
  const [err, setErr] = useState('');
  const set = (k, v) => setF({ ...f, [k]: v });

  const submit = (e) => {
    e.preventDefault();
    if (f.password.length < 6) return setErr('Password must be at least 6 characters.');
    if (f.password !== f.confirm) return setErr('Passwords do not match.');
    const { confirm, ...data } = f;
    const r = signUp({ ...data, name: data.name.trim() });
    if (r.error) return setErr(r.error);
    nav(`/${f.role}`);
  };

  return (
    <main className="auth">
      <div className="auth-image">
        <Img src="/assets/images/research-hero.jpg" alt="Research" />
        <div className="auth-overlay">
          <h2>Join the journal community</h2>
          <p>Register as an author, editor or reviewer.</p>
        </div>
      </div>
      <div className="auth-form-wrap">
        <form className="auth-form" onSubmit={submit}>
          <h1>Register</h1>
          <p className="muted">Create your account.</p>
          {err && <div className="alert">{err}</div>}
          <label>Full name<input required value={f.name} onChange={(e) => set('name', e.target.value)} /></label>
          <label>Email<input type="email" required value={f.email} onChange={(e) => set('email', e.target.value)} /></label>
          <label>Institution<input value={f.affiliation} onChange={(e) => set('affiliation', e.target.value)} /></label>
          <label>Role
            <select value={f.role} onChange={(e) => set('role', e.target.value)}>
              <option value="author">Author</option>
              <option value="editor">Editor</option>
              <option value="reviewer">Reviewer</option>
            </select>
          </label>
          <label>Password<input type="password" required value={f.password} onChange={(e) => set('password', e.target.value)} /></label>
          <label>Confirm password<input type="password" required value={f.confirm} onChange={(e) => set('confirm', e.target.value)} /></label>
          <button className="btn full">Create account</button>
          <p className="small">Already registered? <Link to="/login">Login</Link></p>
        </form>
      </div>
    </main>
  );
}
