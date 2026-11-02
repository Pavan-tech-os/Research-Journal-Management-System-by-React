import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { usePapers } from '../../hooks';
import { assignReviewer, getReviewers } from '../../store';
import { StatusBadge } from '../../components/PaperCard';

export default function AssignReviewer() {
  const { id } = useParams();
  const [papers, refresh] = usePapers();
  const reviewers = getReviewers();
  const open = papers.filter((p) => !['Published', 'Rejected', 'Accepted'].includes(p.status));
  const [paperId, setPaperId] = useState(id || open[0]?.id || '');
  const [reviewerId, setReviewerId] = useState(reviewers[0]?.id || '');
  const [msg, setMsg] = useState('');

  const submit = (e) => {
    e.preventDefault();
    const r = reviewers.find((x) => x.id === reviewerId);
    if (!paperId || !r) return;
    assignReviewer(paperId, r);
    refresh();
    setMsg(`Assigned ${r.name}. The paper now appears in their assigned list.`);
  };

  return (
    <>
      <h1>Assign Reviewer</h1>
      <form className="card form narrow" onSubmit={submit}>
        {msg && <div className="alert ok">{msg}</div>}
        <label>Paper
          <select value={paperId} onChange={(e) => { setPaperId(e.target.value); setMsg(''); }}>
            {papers.filter((p) => p.status !== 'Published').map((p) => <option key={p.id} value={p.id}>{p.title}</option>)}
          </select>
        </label>
        <label>Reviewer
          <select value={reviewerId} onChange={(e) => setReviewerId(e.target.value)}>
            {reviewers.map((r) => <option key={r.id} value={r.id}>{r.name} ({r.affiliation || r.email})</option>)}
          </select>
        </label>
        <button className="btn">Assign reviewer</button>
      </form>
      <h2>Current assignments</h2>
      <div className="table-wrap">
        <table>
          <thead><tr><th>Paper</th><th>Reviewer</th><th>Assigned</th><th>Status</th></tr></thead>
          <tbody>
            {open.map((p) => (
              <tr key={p.id}>
                <td>{p.title}</td>
                <td>{p.reviewerName || <span className="muted">Not assigned</span>}</td>
                <td>{p.assignedAt || '-'}</td>
                <td><StatusBadge status={p.status} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
