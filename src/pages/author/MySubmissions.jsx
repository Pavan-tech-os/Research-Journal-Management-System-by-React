import { Link } from 'react-router-dom';
import { useAuth } from '../../AuthContext';
import { usePapers } from '../../hooks';
import PaperCard, { ReviewList } from '../../components/PaperCard';

export default function MySubmissions() {
  const { user } = useAuth();
  const [all] = usePapers();
  const mine = all.filter((p) => p.authorId === user.id);

  return (
    <>
      <h1>My Submissions</h1>
      {mine.length === 0 && (
        <div className="card"><p>You have not submitted any paper yet.</p><Link to="/author/submit" className="btn">Submit Paper</Link></div>
      )}
      {mine.map((p) => (
        <PaperCard key={p.id} paper={p}>
          <p className="small"><strong>Reviewer:</strong> {p.reviewerName || 'Not assigned yet'} | <strong>File:</strong> {p.fileName}</p>
          <details>
            <summary>Reviewer feedback ({p.reviews.length})</summary>
            <ReviewList reviews={p.reviews} />
          </details>
          {p.status === 'Revision Required' && <Link to="/author/revisions" className="btn btn-sm">Submit revision</Link>}
        </PaperCard>
      ))}
    </>
  );
}
