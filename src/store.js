const K = { users: 'rjms_users', papers: 'rjms_papers', session: 'rjms_session' };
const read = (k, d) => { try { const v = JSON.parse(localStorage.getItem(k)); return v ?? d; } catch { return d; } };
const write = (k, v) => localStorage.setItem(k, JSON.stringify(v));
export const uid = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
export const today = () => new Date().toISOString().slice(0, 10);
export const slug = (s) => s.toLowerCase().replace(/[^a-z]+/g, '-');

export const STATUSES = ['Submitted', 'Under Review', 'Revision Required', 'Accepted', 'Rejected', 'Published'];
export const RECOMMENDATIONS = ['Accept', 'Revision Required', 'Reject'];
export const CATEGORIES = ['Artificial Intelligence', 'Data Science', 'Cyber Security', 'Software Engineering', 'Healthcare & Biomedical', 'Environmental Science', 'Education Technology', 'Other'];

const seedUsers = [
  { id: 'u-auth1', name: 'Anita Sharma', email: 'author@demo.com', password: 'demo123', role: 'author', affiliation: 'KL University' },
  { id: 'u-edit1', name: 'Dr. Rajesh Kumar', email: 'editor@demo.com', password: 'demo123', role: 'editor', affiliation: 'Editorial Office' },
  { id: 'u-rev1', name: 'Dr. Meera Iyer', email: 'reviewer@demo.com', password: 'demo123', role: 'reviewer', affiliation: 'IIT Madras' },
  { id: 'u-rev2', name: 'Dr. Sanjay Verma', email: 'reviewer2@demo.com', password: 'demo123', role: 'reviewer', affiliation: 'IIIT Hyderabad' },
  { id: 'u-rev3', name: 'Dr. Lakshmi Rao', email: 'reviewer3@demo.com', password: 'demo123', role: 'reviewer', affiliation: 'Andhra University' }
];

const base = { coAuthors: '', fileName: 'manuscript.pdf', authorId: 'u-auth1', authorName: 'Anita Sharma', authorEmail: 'author@demo.com', version: 1, revisions: [], reviews: [], reviewerId: '', reviewerName: '', assignedAt: '', publishedAt: '' };
const rv = (id, name, rec, text, date) => ({ id: uid() + id, reviewerId: id, reviewerName: name, recommendation: rec, comments: text, score: 8, version: 1, date });
const seedPapers = [
  { ...base, id: 'p-1', title: 'A Survey of Transformer Models for Low-Resource Languages', abstract: 'This survey reviews transformer architectures applied to languages with limited training data and compares transfer learning, data augmentation and multilingual pre-training strategies.', keywords: 'NLP, Transformers, Low-resource languages', category: 'Artificial Intelligence', status: 'Published', submittedAt: '2025-01-12', publishedAt: '2025-04-20', reviewerId: 'u-rev1', reviewerName: 'Dr. Meera Iyer', reviews: [rv('u-rev1', 'Dr. Meera Iyer', 'Accept', 'Clear structure and a useful comparison table. Accept.', '2025-02-10')] },
  { ...base, id: 'p-2', title: 'Graph-Based Route Optimisation for Smart Tourism', abstract: 'We apply BFS and Dijkstra variants to plan multi-stop tourist routes and evaluate travel time against a baseline planner on real road networks.', keywords: 'Graphs, Dijkstra, Tourism', category: 'Data Science', status: 'Published', submittedAt: '2025-11-03', publishedAt: '2026-02-14', authorId: 'u-auth2', authorName: 'Pavan G.', authorEmail: 'pavan@example.com', reviewerId: 'u-rev2', reviewerName: 'Dr. Sanjay Verma', reviews: [rv('u-rev2', 'Dr. Sanjay Verma', 'Accept', 'Sound method and good experiments.', '2025-12-02')] },
  { ...base, id: 'p-3', title: 'Privacy-Preserving Federated Learning in Healthcare', abstract: 'A study of federated learning with differential privacy for hospital data, showing the trade-off between accuracy and privacy budget.', keywords: 'Federated learning, Privacy, Healthcare', category: 'Healthcare & Biomedical', status: 'Published', submittedAt: '2024-05-08', publishedAt: '2024-08-30', authorId: 'u-auth3', authorName: 'Karthik N.', authorEmail: 'karthik@example.com', reviewerId: 'u-rev3', reviewerName: 'Dr. Lakshmi Rao', reviews: [rv('u-rev3', 'Dr. Lakshmi Rao', 'Accept', 'Relevant topic, well written.', '2024-06-21')] },
  { ...base, id: 'p-4', title: 'Detecting Phishing URLs with Lightweight Neural Networks', abstract: 'We propose a compact neural model that classifies phishing URLs using character-level features and runs efficiently on low-power devices.', keywords: 'Phishing, Neural networks, Security', category: 'Cyber Security', status: 'Submitted', submittedAt: '2026-10-28' },
  { ...base, id: 'p-5', title: 'Automated Grading Using Large Language Models', abstract: 'This paper evaluates LLM-based grading of short answers and compares scores with human graders across three subjects.', keywords: 'LLM, Grading, Education', category: 'Education Technology', status: 'Under Review', submittedAt: '2026-10-20', reviewerId: 'u-rev1', reviewerName: 'Dr. Meera Iyer', assignedAt: '2026-10-22' }
];

export function init() {
  if (!localStorage.getItem(K.users)) write(K.users, seedUsers);
  if (!localStorage.getItem(K.papers)) write(K.papers, seedPapers);
}

// auth
export const getUsers = () => read(K.users, []);
export const getReviewers = () => getUsers().filter((u) => u.role === 'reviewer');
export const getSession = () => read(K.session, null);
export const logout = () => localStorage.removeItem(K.session);
export function register(d) {
  const email = d.email.trim().toLowerCase();
  const users = getUsers();
  if (users.some((u) => u.email === email)) return { error: 'This email is already registered.' };
  const user = { ...d, email, id: uid() };
  write(K.users, [...users, user]);
  return { user };
}
export function login(email, password, role) {
  const u = getUsers().find((x) => x.email === email.trim().toLowerCase() && x.password === password);
  if (!u) return { error: 'Invalid email or password.' };
  if (u.role !== role) return { error: `This account is registered as ${u.role}. Select the ${u.role} role.` };
  const { password: _pw, ...session } = u;
  write(K.session, session);
  return { user: session };
}

// papers
export const getPapers = () => read(K.papers, []);
const mutate = (id, fn) => write(K.papers, getPapers().map((p) => (p.id === id ? fn(p) : p)));
export function addPaper(d, user) {
  const paper = { ...base, ...d, id: uid(), authorId: user.id, authorName: user.name, authorEmail: user.email, status: 'Submitted', submittedAt: today(), version: 1, revisions: [], reviews: [] };
  write(K.papers, [paper, ...getPapers()]);
  return paper;
}
export const setStatus = (id, status) =>
  mutate(id, (p) => ({ ...p, status, publishedAt: status === 'Published' ? p.publishedAt || today() : status === p.status ? p.publishedAt : '' }));
export const assignReviewer = (id, reviewer) =>
  mutate(id, (p) => ({ ...p, reviewerId: reviewer.id, reviewerName: reviewer.name, assignedAt: today(), status: 'Under Review' }));
export const addReview = (id, review) =>
  mutate(id, (p) => ({ ...p, reviews: [...p.reviews, { ...review, id: uid(), version: p.version, date: today() }] }));
export const resubmit = (id, { abstract, note, fileName }) =>
  mutate(id, (p) => ({ ...p, abstract: abstract || p.abstract, fileName: fileName || p.fileName, version: p.version + 1, status: 'Under Review', revisions: [...p.revisions, { version: p.version + 1, date: today(), note }] }));
