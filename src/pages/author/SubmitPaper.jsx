import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../AuthContext';
import { addPaper, CATEGORIES } from '../../store';
import Img from '../../components/Img';

export default function SubmitPaper() {
  const { user } = useAuth();
  const nav = useNavigate();
  const [f, setF] = useState({ title: '', abstract: '', keywords: '', category: CATEGORIES[0], coAuthors: '', fileName: '' });
  const set = (k, v) => setF({ ...f, [k]: v });

  const submit = (e) => {
    e.preventDefault();
    addPaper({ ...f, title: f.title.trim(), fileName: f.fileName || 'manuscript.pdf' }, user);
    nav('/author/submissions');
  };

  return (
    <>
      <h1>Submit Paper</h1>
      <div className="two-col top">
        <form className="card form" onSubmit={submit}>
          <label>Paper title<input required value={f.title} onChange={(e) => set('title', e.target.value)} /></label>
          <label>Abstract<textarea required rows="6" value={f.abstract} onChange={(e) => set('abstract', e.target.value)} /></label>
          <label>Keywords (comma separated)<input required value={f.keywords} onChange={(e) => set('keywords', e.target.value)} /></label>
          <label>Category
            <select value={f.category} onChange={(e) => set('category', e.target.value)}>
              {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
            </select>
          </label>
          <label>Co-authors (optional)<input value={f.coAuthors} onChange={(e) => set('coAuthors', e.target.value)} /></label>
          <label>Manuscript file (PDF or DOC)
            <input type="file" accept=".pdf,.doc,.docx" onChange={(e) => set('fileName', e.target.files[0]?.name || '')} />
          </label>
          <button className="btn">Submit paper</button>
        </form>
        <div className="img-box tall"><Img src="/assets/images/research-paper.webp" alt="Research paper" /></div>
      </div>
    </>
  );
}
