import { Link } from 'react-router-dom';
import { useAuth } from '../../AuthContext';
import { usePapers } from '../../hooks';
import Stat from '../../components/Stat';
import { StatusBadge } from '../../components/PaperCard';

export default function AuthorDashboard() {
  const { user } = useAuth();
  const [all] = usePapers();
  const mine = all.filter((p) => p.authorId === user.id);
  const count = (s) => mine.filter((p) => p.status === s).length;

  return (
    <>
      <h1>Author Dashboard</h1>
      <p className="muted">Welcome, {user.name}.</p>
      <div className="stats">
        <Stat value={mine.length} label="Total submissions" />
        <Stat value={count('Under Review')} label="Under review" />
        <Stat value={count('Revision Required')} label="Revision required" />
        <Stat value={count('Published')} label="Published" />
      </div>
      <div className="btn-row">
        <Link to="/author/submit" className="btn">Submit Paper</Link>
        <Link to="/author/submissions" className="btn btn-outline">My Submissions</Link>
        <Link to="/author/revisions" className="btn btn-outline">Revisions</Link>
      </div>
      <h2>Recent submissions</h2>
      {mine.length === 0 ? <p className="muted">You have not submitted any paper yet.</p> : (
        <div className="table-wrap">
          <table>
            <thead><tr><th>Title</th><th>Submitted</th><th>Status</th></tr></thead>
            <tbody>
              {mine.slice(0, 5).map((p) => (
                <tr key={p.id}><td>{p.title}</td><td>{p.submittedAt}</td><td><StatusBadge status={p.status} /></td></tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
