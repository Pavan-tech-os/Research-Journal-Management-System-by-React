import { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import { usePapers } from '../../hooks';
import { STATUSES, setStatus, slug } from '../../store';
import { ReviewList } from '../../components/PaperCard';

export default function ManageSubmissions() {
  const [papers, refresh] = usePapers();
  const [q, setQ] = useState('');
  const [st, setSt] = useState('All');
  const [open, setOpen] = useState('');
  const list = papers.filter((p) =>
    (st === 'All' || p.status === st) && `${p.title} ${p.authorName} ${p.keywords}`.toLowerCase().includes(q.toLowerCase())
  );
  const change = (id, s) => { setStatus(id, s); refresh(); };

  return (
    <>
      <h1>Manage Submissions</h1>
      <div className="toolbar">
        <input placeholder="Search title, author or keyword" value={q} onChange={(e) => setQ(e.target.value)} />
        <select value={st} onChange={(e) => setSt(e.target.value)}>
          <option>All</option>
          {STATUSES.map((s) => <option key={s}>{s}</option>)}
        </select>
      </div>
      <div className="table-wrap">
        <table>
          <thead><tr><th>Title</th><th>Author</th><th>Reviewer</th><th>Recommendations</th><th>Status</th><th>Actions</th></tr></thead>
          <tbody>
            {list.length === 0 && <tr><td colSpan="6" className="muted">No submissions match your search.</td></tr>}
            {list.map((p) => (
              <Fragment key={p.id}>
                <tr>
                  <td><strong>{p.title}</strong><div className="muted small">{p.category} | v{p.version} | {p.submittedAt}</div></td>
                  <td>{p.authorName}</td>
                  <td>{p.reviewerName || <span className="muted">Not assigned</span>}</td>
                  <td>{p.reviews.length ? p.reviews.map((r) => <span key={r.id} className={`badge ${slug(r.recommendation)}`}>{r.recommendation}</span>) : <span className="muted">None</span>}</td>
                  <td>
                    <select value={p.status} onChange={(e) => change(p.id, e.target.value)}>
                      {STATUSES.map((s) => <option key={s}>{s}</option>)}
                    </select>
                  </td>
                  <td className="actions">
                    <Link to={`/editor/assign/${p.id}`} className="btn btn-sm btn-outline">{p.reviewerId ? 'Reassign' : 'Assign'}</Link>
                    {p.status === 'Accepted' && <button className="btn btn-sm" onClick={() => change(p.id, 'Published')}>Publish</button>}
                    <button className="btn btn-sm btn-outline" onClick={() => setOpen(open === p.id ? '' : p.id)}>{open === p.id ? 'Hide' : 'Details'}</button>
                  </td>
                </tr>
                {open === p.id && (
                  <tr className="detail-row"><td colSpan="6">
                    <p><strong>Abstract:</strong> {p.abstract}</p>
                    <p className="small"><strong>Keywords:</strong> {p.keywords} | <strong>File:</strong> {p.fileName}</p>
                    <ReviewList reviews={p.reviews} />
                  </td></tr>
                )}
              </Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
