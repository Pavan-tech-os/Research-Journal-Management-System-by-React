import { useState } from 'react';
import { Link } from 'react-router-dom';
import { getPapers } from '../../store';
import Img from '../../components/Img';

export default function PublishedPapers() {
  const [q, setQ] = useState('');
  const papers = getPapers()
    .filter((p) => p.status === 'Published')
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt))
    .filter((p) => `${p.title} ${p.keywords} ${p.authorName}`.toLowerCase().includes(q.toLowerCase()));

  return (
    <main>
      <section className="banner">
        <Img src="/assets/images/research-library.avif" alt="Research library" />
        <div className="banner-text container"><h1>Published Papers</h1><p>Peer-reviewed research accepted for publication.</p></div>
      </section>
      <div className="container page">
        <div className="toolbar">
          <input placeholder="Search published papers" value={q} onChange={(e) => setQ(e.target.value)} />
          <Link to="/archive" className="btn btn-outline">Open Research Archive</Link>
        </div>
        {papers.length === 0 && <p className="muted">No published papers found.</p>}
        <div className="grid-2">
          {papers.map((p) => (
            <article className="card paper" key={p.id}>
              <h3>{p.title}</h3>
              <p className="muted small">{p.authorName}{p.coAuthors ? `, ${p.coAuthors}` : ''} | {p.category} | Published {p.publishedAt}</p>
              <p>{p.abstract}</p>
              <div className="chips">{p.keywords.split(',').map((k) => <span key={k} className="chip">{k.trim()}</span>)}</div>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
