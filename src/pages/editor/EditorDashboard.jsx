import { Link } from 'react-router-dom';
import { useAuth } from '../../AuthContext';
import { usePapers } from '../../hooks';
import { STATUSES } from '../../store';
import Stat from '../../components/Stat';
import { StatusBadge } from '../../components/PaperCard';

export default function EditorDashboard() {
  const { user } = useAuth();
  const [papers] = usePapers();
  const unassigned = papers.filter((p) => !p.reviewerId && ['Submitted', 'Under Review'].includes(p.status));
  const ready = papers.filter((p) => p.status === 'Under Review' && p.reviews.length > 0);

  return (
    <>
      <h1>Editor Dashboard</h1>
      <p className="muted">Welcome, {user.name}.</p>
      <div className="stats">
        <Stat value={papers.length} label="All submissions" />
        <Stat value={unassigned.length} label="Need a reviewer" />
        <Stat value={ready.length} label="Reviewed, awaiting decision" />
        <Stat value={papers.filter((p) => p.status === 'Published').length} label="Published" />
      </div>
      <div className="btn-row">
        <Link to="/editor/submissions" className="btn">Manage Submissions</Link>
        <Link to="/editor/assign" className="btn btn-outline">Assign Reviewer</Link>
      </div>
      <h2>Review pipeline</h2>
      <div className="stats">
        {STATUSES.map((s) => (
          <div className="stat" key={s}><span>{papers.filter((p) => p.status === s).length}</span><p>{s}</p></div>
        ))}
      </div>
      <h2>Recent submissions</h2>
      <div className="table-wrap">
        <table>
          <thead><tr><th>Title</th><th>Author</th><th>Submitted</th><th>Status</th></tr></thead>
          <tbody>
            {papers.slice(0, 6).map((p) => (
              <tr key={p.id}><td>{p.title}</td><td>{p.authorName}</td><td>{p.submittedAt}</td><td><StatusBadge status={p.status} /></td></tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
