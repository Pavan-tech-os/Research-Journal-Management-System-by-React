import { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import AuthorDashboard from './pages/author/AuthorDashboard';
import SubmitPaper from './pages/author/SubmitPaper';
import MySubmissions from './pages/author/MySubmissions';
import Revisions from './pages/author/Revisions';
import EditorDashboard from './pages/editor/EditorDashboard';
import ManageSubmissions from './pages/editor/ManageSubmissions';
import AssignReviewer from './pages/editor/AssignReviewer';
import ReviewerDashboard from './pages/reviewer/ReviewerDashboard';
import AssignedPapers from './pages/reviewer/AssignedPapers';
import ReviewPaper from './pages/reviewer/ReviewPaper';
import PublishedPapers from './pages/published/PublishedPapers';
import ResearchArchive from './pages/published/ResearchArchive';

function ScrollToHash() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) setTimeout(() => document.getElementById(hash.slice(1))?.scrollIntoView(), 0);
    else window.scrollTo(0, 0);
  }, [pathname, hash]);
  return null;
}

export default function App() {
  return (
    <>
      <ScrollToHash />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/published" element={<PublishedPapers />} />
        <Route path="/archive" element={<ResearchArchive />} />

        <Route path="/author" element={<ProtectedRoute role="author" />}>
          <Route index element={<AuthorDashboard />} />
          <Route path="submit" element={<SubmitPaper />} />
          <Route path="submissions" element={<MySubmissions />} />
          <Route path="revisions" element={<Revisions />} />
        </Route>

        <Route path="/editor" element={<ProtectedRoute role="editor" />}>
          <Route index element={<EditorDashboard />} />
          <Route path="submissions" element={<ManageSubmissions />} />
          <Route path="assign" element={<AssignReviewer />} />
          <Route path="assign/:id" element={<AssignReviewer />} />
        </Route>

        <Route path="/reviewer" element={<ProtectedRoute role="reviewer" />}>
          <Route index element={<ReviewerDashboard />} />
          <Route path="assigned" element={<AssignedPapers />} />
          <Route path="review" element={<ReviewPaper />} />
          <Route path="review/:id" element={<ReviewPaper />} />
        </Route>

        <Route path="*" element={<main className="container page"><h1>Page not found</h1></main>} />
      </Routes>
      <Footer />
    </>
  );
}
