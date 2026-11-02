import { Link } from 'react-router-dom';
import Img from '../components/Img';

const features = [
  ['Online Submission', 'Authors submit a manuscript with title, abstract, keywords and category.'],
  ['Editorial Control', 'Editors screen submissions, assign reviewers and decide on each paper.'],
  ['Peer Review', 'Reviewers add comments and recommend accept, revision or reject.'],
  ['Status Tracking', 'Authors follow every paper from submission to publication.'],
  ['Revision Workflow', 'Feedback and resubmissions stay together with the paper.'],
  ['Research Archive', 'Published papers can be searched by keyword, year and category.']
];
const steps = ['Author', 'Paper Submission', 'Editor', 'Reviewer Assignment', 'Peer Review', 'Revision / Decision', 'Accepted', 'Publication', 'Research Archive'];
const roles = [
  ['Author', 'Register, submit papers, track status and respond to reviewer feedback.', '/author'],
  ['Editor', 'View submissions, assign reviewers and update paper status.', '/editor'],
  ['Reviewer', 'Read assigned papers, comment and recommend a decision.', '/reviewer']
];

export default function Home() {
  return (
    <main>
      <section className="hero">
        <div className="container hero-grid">
          <div>
            <h1>Research Journal Management System</h1>
            <p className="lead">A web-based platform for managing the complete research paper publication workflow, from submission to the research archive.</p>
            <div className="btn-row">
              <Link to="/login" className="btn">Login</Link>
              <Link to="/register" className="btn btn-outline">Register</Link>
            </div>
          </div>
          <div className="img-box"><Img src="/assets/images/research-hero.jpg" alt="Researchers working" /></div>
        </div>
      </section>

      <section className="section" id="about">
        <div className="container two-col">
          <div className="img-box"><Img src="/assets/images/research-paper.webp" alt="Research paper" /></div>
          <div>
            <h2>About the platform</h2>
            <p>The system brings authors, editors and reviewers into one workflow. Authors submit papers, editors manage the review process, and reviewers give structured feedback.</p>
            <p>Accepted papers are published and stored in the research archive so they stay easy to find.</p>
            <Link to="/author/submit" className="btn">Submit a paper</Link>
          </div>
        </div>
      </section>

      <section className="section soft" id="features">
        <div className="container">
          <h2>Features</h2>
          <div className="grid-3">
            {features.map(([t, d]) => (
              <div className="card" key={t}><h3>{t}</h3><p className="muted">{d}</p></div>
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="workflow">
        <div className="container">
          <h2>Publication workflow</h2>
          <ol className="steps">{steps.map((s) => <li key={s}>{s}</li>)}</ol>
        </div>
      </section>

      <section className="section soft" id="roles">
        <div className="container">
          <h2>User roles</h2>
          <div className="grid-3">
            {roles.map(([t, d, to]) => (
              <div className="card" key={t}>
                <h3>{t}</h3>
                <p className="muted">{d}</p>
                <Link to={to} className="btn btn-outline btn-sm">Open {t} area</Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="peer-review">
        <div className="container two-col">
          <div>
            <h2>Peer review</h2>
            <p>Every paper is reviewed by an assigned expert. Reviewers read the manuscript, write comments and recommend acceptance, revision or rejection. Editors use these recommendations to make the final decision.</p>
          </div>
          <div className="img-box"><Img src="/assets/images/peer-review.jpg" alt="Peer review" /></div>
        </div>
      </section>

      <section className="section soft" id="library">
        <div className="container two-col">
          <div className="img-box"><Img src="/assets/images/research-library.avif" alt="Research library" /></div>
          <div>
            <h2>Published papers and archive</h2>
            <p>Browse the latest published research or search the full archive by year, category and keyword.</p>
            <div className="btn-row">
              <Link to="/published" className="btn">Published Papers</Link>
              <Link to="/archive" className="btn btn-outline">Research Archive</Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
