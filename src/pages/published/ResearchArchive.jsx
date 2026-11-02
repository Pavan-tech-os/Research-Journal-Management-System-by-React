import { useState } from 'react';
import { getPapers, CATEGORIES } from '../../store';
import Img from '../../components/Img';

export default function ResearchArchive() {
  const [q, setQ] = useState('');
  const [year, setYear] = useState('All');
  const [cat, setCat] = useState('All');
  const all = getPapers().filter((p) => p.status === 'Published').sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
  const years = [...new Set(all.map((p) => p.publishedAt.slice(0, 4)))];
  const list = all.filter((p) =>
    (year === 'All' || p.publishedAt.startsWith(year)) &&
    (cat === 'All' || p.category === cat) &&
    `${p.title} ${p.keywords} ${p.authorName}`.toLowerCase().includes(q.toLowerCase())
  );

  return (
    <main>
      <section className="banner">
        <Img src="/assets/images/research-library.avif" alt="Research library" />
        <div className="banner-text container"><h1>Research Archive</h1><p>Search every paper published in the journal.</p></div>
      </section>
      <div className="container page">
        <div className="toolbar">
          <input placeholder="Search title, author or keyword" value={q} onChange={(e) => setQ(e.target.value)} />
          <select value={year} onChange={(e) => setYear(e.target.value)}>
            <option>All</option>{years.map((y) => <option key={y}>{y}</option>)}
          </select>
          <select value={cat} onChange={(e) => setCat(e.target.value)}>
            <option>All</option>{CATEGORIES.map((c) => <option key={c}>{c}</option>)}
          </select>
        </div>
        <p className="muted small">{list.length} paper(s) found</p>
        <div className="table-wrap">
          <table>
            <thead><tr><th>Title</th><th>Authors</th><th>Category</th><th>Keywords</th><th>Published</th></tr></thead>
            <tbody>
              {list.length === 0 && <tr><td colSpan="5" className="muted">No papers match your filters.</td></tr>}
              {list.map((p) => (
                <tr key={p.id}>
                  <td><strong>{p.title}</strong></td>
                  <td>{p.authorName}{p.coAuthors ? `, ${p.coAuthors}` : ''}</td>
                  <td>{p.category}</td><td>{p.keywords}</td><td>{p.publishedAt}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
