import { NavLink } from 'react-router-dom';

const links = {
  author: [['/author', 'Dashboard', true], ['/author/submit', 'Submit Paper'], ['/author/submissions', 'My Submissions'], ['/author/revisions', 'Revisions']],
  editor: [['/editor', 'Dashboard', true], ['/editor/submissions', 'Manage Submissions'], ['/editor/assign', 'Assign Reviewer']],
  reviewer: [['/reviewer', 'Dashboard', true], ['/reviewer/assigned', 'Assigned Papers'], ['/reviewer/review', 'Review Paper']]
};

export default function Sidebar({ role, name }) {
  return (
    <aside className="sidebar">
      <div className="side-user">
        <strong>{name}</strong>
        <span className="muted small">{role[0].toUpperCase() + role.slice(1)}</span>
      </div>
      {links[role].map(([to, label, end]) => (
        <NavLink key={to} to={to} end={!!end}>{label}</NavLink>
      ))}
      <NavLink to="/published">Published Papers</NavLink>
      <NavLink to="/archive">Research Archive</NavLink>
    </aside>
  );
}
