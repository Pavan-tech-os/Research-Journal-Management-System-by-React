import { slug } from '../store';

export function StatusBadge({ status }) {
  return <span className={`badge ${slug(status)}`}>{status}</span>;
}

export function ReviewList({ reviews }) {
  if (!reviews?.length) return <p className="muted small">No reviewer feedback yet.</p>;
  return reviews.map((r) => (
    <div className="review" key={r.id}>
      <div className="review-head">
        <strong>{r.reviewerName}</strong>
        <span className={`badge ${slug(r.recommendation)}`}>{r.recommendation}</span>
        <span className="muted small">Version {r.version}, {r.date}{r.score ? `, score ${r.score}/10` : ''}</span>
      </div>
      <p>{r.comments}</p>
    </div>
  ));
}

export default function PaperCard({ paper, showAuthor, children }) {
  return (
    <article className="card paper">
      <div className="paper-top">
        <h3>{paper.title}</h3>
        <StatusBadge status={paper.status} />
      </div>
      <p className="muted small">
        {showAuthor && <>{paper.authorName}{paper.coAuthors ? `, ${paper.coAuthors}` : ''} | </>}
        {paper.category} | Submitted {paper.submittedAt} | Version {paper.version}
      </p>
      <p>{paper.abstract}</p>
      <div className="chips">{paper.keywords.split(',').map((k) => <span key={k} className="chip">{k.trim()}</span>)}</div>
      {children}
    </article>
  );
}
