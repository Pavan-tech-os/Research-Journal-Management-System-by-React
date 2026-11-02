import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../../AuthContext';
import { usePapers } from '../../hooks';
import { addReview, RECOMMENDATIONS } from '../../store';
import PaperCard, { ReviewList } from '../../components/PaperCard';
import Img from '../../components/Img';
import { reviewedBy } from './ReviewerDashboard';

export default function ReviewPaper() {
  const { id } = useParams();
  const { user } = useAuth();
  const nav = useNavigate();
  const [all, refresh] = usePapers();
  const [f, setF] = useState({ comments: '', recommendation: RECOMMENDATIONS[0], score: 7 });
  const mine = all.filter((p) => p.reviewerId === user.id);
  const paper = mine.find((p) => p.id === id);

  if (!id) {
    return (
      <>
        <h1>Review Paper</h1>
        <p className="muted">Choose an assigned paper to review.</p>
        {mine.length === 0 && <p>No papers are assigned to you yet.</p>}
        {mine.map((p) => (
          <div className="card row-card" key={p.id}>
            <div><strong>{p.title}</strong><div className="muted small">{p.category} | {reviewedBy(p, user.id) ? 'Review submitted' : 'Pending'}</div></div>
            <Link to={`/reviewer/review/${p.id}`} className="btn btn-sm">Open</Link>
          </div>
        ))}
      </>
    );
  }
  if (!paper) return <><h1>Review Paper</h1><p>This paper is not assigned to you.</p><Link to="/reviewer/assigned" className="btn">Back to assigned papers</Link></>;

  const done = reviewedBy(paper, user.id);
  const myReviews = paper.reviews.filter((r) => r.reviewerId === user.id);

  const submit = (e) => {
    e.preventDefault();
    addReview(paper.id, { reviewerId: user.id, reviewerName: user.name, comments: f.comments.trim(), recommendation: f.recommendation, score: Number(f.score) });
    refresh();
    nav('/reviewer/assigned');
  };

  return (
    <>
      <h1>Review Paper</h1>
      <div className="two-col top">
        <div>
          <PaperCard paper={paper} showAuthor />
          {paper.revisions.length > 0 && (
            <div className="card">
              <h4>Author revision notes</h4>
              <ul className="plain">{paper.revisions.map((r) => <li key={r.version}><strong>Version {r.version}</strong> ({r.date}): {r.note}</li>)}</ul>
            </div>
          )}
          {myReviews.length > 0 && <div className="card"><h4>My previous reviews</h4><ReviewList reviews={myReviews} /></div>}
        </div>
        <div>
          <div className="img-box short"><Img src="/assets/images/peer-review.jpg" alt="Peer review" /></div>
          {done ? (
            <div className="card"><p>You have already reviewed version {paper.version}. The editor will take the next step.</p></div>
          ) : (
            <form className="card form" onSubmit={submit}>
              <h3>Your review</h3>
              <label>Comments and feedback<textarea required rows="7" value={f.comments} onChange={(e) => setF({ ...f, comments: e.target.value })} /></label>
              <label>Score (1 to 10)<input type="number" min="1" max="10" value={f.score} onChange={(e) => setF({ ...f, score: e.target.value })} /></label>
              <label>Recommendation
                <select value={f.recommendation} onChange={(e) => setF({ ...f, recommendation: e.target.value })}>
                  {RECOMMENDATIONS.map((r) => <option key={r}>{r}</option>)}
                </select>
              </label>
              <button className="btn">Submit review</button>
            </form>
          )}
        </div>
      </div>
    </>
  );
}
