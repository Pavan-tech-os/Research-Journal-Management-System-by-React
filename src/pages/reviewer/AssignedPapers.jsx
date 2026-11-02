import { Link } from 'react-router-dom';
import { useAuth } from '../../AuthContext';
import { usePapers } from '../../hooks';
import { StatusBadge } from '../../components/PaperCard';
import { reviewedBy } from './ReviewerDashboard';

export default function AssignedPapers() {
  const { user } = useAuth();
  const [all] = usePapers();
  const mine = all.filter((p) => p.reviewerId === user.id);

  return (
    <>
      <h1>Assigned Papers</h1>
      {mine.length === 0 ? <p className="muted">No papers have been assigned to you yet.</p> : (
        <div className="table-wrap">
          <table>
            <thead><tr><th>Title</th><th>Category</th><th>Keywords</th><th>Assigned</th><th>Paper status</th><th>My review</th><th></th></tr></thead>
            <tbody>
              {mine.map((p) => {
                const done = reviewedBy(p, user.id);
                return (
                  <tr key={p.id}>
                    <td>{p.title}</td><td>{p.category}</td><td>{p.keywords}</td><td>{p.assignedAt}</td>
                    <td><StatusBadge status={p.status} /></td>
                    <td>{done ? 'Submitted' : 'Pending'}</td>
                    <td><Link to={`/reviewer/review/${p.id}`} className="btn btn-sm btn-outline">{done ? 'View' : 'Review'}</Link></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
