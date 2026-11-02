import { Link } from 'react-router-dom';
import { useAuth } from '../../AuthContext';
import { usePapers } from '../../hooks';
import Stat from '../../components/Stat';
import { StatusBadge } from '../../components/PaperCard';

export const reviewedBy = (p, uid) => p.reviews.some((r) => r.reviewerId === uid && r.version === p.version);

export default function ReviewerDashboard() {
  const { user } = useAuth();
  const [all] = usePapers();
  const mine = all.filter((p) => p.reviewerId === user.id);
  const pending = mine.filter((p) => !reviewedBy(p, user.id));

  return (
    <>
      <h1>Reviewer Dashboard</h1>
      <p className="muted">Welcome, {user.name}.</p>
      <div className="stats">
        <Stat value={mine.length} label="Assigned papers" />
        <Stat value={pending.length} label="Pending review" />
        <Stat value={mine.length - pending.length} label="Reviews submitted" />
      </div>
      <div className="btn-row">
        <Link to="/reviewer/assigned" className="btn">Assigned Papers</Link>
        <Link to="/reviewer/review" className="btn btn-outline">Review Paper</Link>
      </div>
      <h2>Waiting for your review</h2>
      {pending.length === 0 ? <p className="muted">Nothing pending.</p> : (
        <div className="table-wrap">
          <table>
            <thead><tr><th>Title</th><th>Category</th><th>Assigned</th><th></th></tr></thead>
            <tbody>
              {pending.map((p) => (
                <tr key={p.id}><td>{p.title}</td><td>{p.category}</td><td>{p.assignedAt}</td>
                  <td><Link to={`/reviewer/review/${p.id}`} className="btn btn-sm">Review</Link></td></tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
