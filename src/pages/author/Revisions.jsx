import { useState } from 'react';
import { useAuth } from '../../AuthContext';
import { usePapers } from '../../hooks';
import { resubmit } from '../../store';
import PaperCard, { ReviewList } from '../../components/PaperCard';

function RevisionForm({ paper, onDone }) {
  const [abstract, setAbstract] = useState(paper.abstract);
  const [note, setNote] = useState('');
  const [fileName, setFileName] = useState('');
  const submit = (e) => {
    e.preventDefault();
    resubmit(paper.id, { abstract, note, fileName });
    onDone();
  };
  return (
    <form className="form inline-form" onSubmit={submit}>
      <h4>Submit revised version</h4>
      <label>Revised abstract<textarea rows="4" value={abstract} onChange={(e) => setAbstract(e.target.value)} /></label>
      <label>Response to reviewers<textarea required rows="3" value={note} onChange={(e) => setNote(e.target.value)} /></label>
      <label>Revised manuscript<input type="file" accept=".pdf,.doc,.docx" onChange={(e) => setFileName(e.target.files[0]?.name || '')} /></label>
      <button className="btn btn-sm">Resubmit paper</button>
    </form>
  );
}

export default function Revisions() {
  const { user } = useAuth();
  const [all, refresh] = usePapers();
  const mine = all.filter((p) => p.authorId === user.id);
  const needs = mine.filter((p) => p.status === 'Revision Required');
  const history = mine.filter((p) => p.revisions.length > 0);

  return (
    <>
      <h1>Revisions</h1>
      <h2>Revision required</h2>
      {needs.length === 0 && <p className="muted">No paper needs revision right now.</p>}
      {needs.map((p) => (
        <PaperCard key={p.id} paper={p}>
          <h4>Reviewer feedback</h4>
          <ReviewList reviews={p.reviews} />
          <RevisionForm paper={p} onDone={refresh} />
        </PaperCard>
      ))}
      <h2>Revision history</h2>
      {history.length === 0 && <p className="muted">No revisions submitted yet.</p>}
      {history.map((p) => (
        <div className="card" key={p.id}>
          <h3>{p.title}</h3>
          <p className="muted small">Current version {p.version}, status {p.status}</p>
          <ul className="plain">
            {p.revisions.map((r) => <li key={r.version}><strong>Version {r.version}</strong> ({r.date}): {r.note}</li>)}
          </ul>
        </div>
      ))}
    </>
  );
}
