# Research Journal Management System (React)

Frontend demo of the research paper workflow:
Author -> Paper Submission -> Editor -> Reviewer Assignment -> Peer Review -> Revision / Decision -> Accepted -> Publication -> Research Archive

Built with React, Vite, React Router DOM and plain CSS. Data is stored in the browser's localStorage (no backend).

## Run

```text
npm install
npm run dev
```

Open the URL shown in the terminal (usually http://localhost:5173).

## Images

Copy your four images into `public/assets/images/` using these exact names:

- peer-review.jpg
- research-hero.jpg
- research-library.avif
- research-paper.webp

If an image is missing the page still works; the image area stays blank.

## Demo accounts (password: demo123)

| Role     | Email                |
|----------|----------------------|
| Author   | author@demo.com      |
| Editor   | editor@demo.com      |
| Reviewer | reviewer@demo.com    |

Two more reviewers (reviewer2@demo.com, reviewer3@demo.com) are available for assignment. You can also register new accounts.

## Try the workflow

1. Log in as Author -> Submit Paper.
2. Log in as Editor -> Manage Submissions -> Assign Reviewer.
3. Log in as Reviewer -> Assigned Papers -> Review Paper (comments + recommendation).
4. Log in as Author -> My Submissions / Revisions to see feedback; resubmit if revision is required.
5. Log in as Editor -> set status to Accepted, then Publish.
6. Check Published Papers and Research Archive.

To reset all demo data, clear the site's localStorage in your browser.

## Structure

```text
src/
  components/  Navbar, Footer, Sidebar, PaperCard (+ StatusBadge, ReviewList), Stat, Img, ProtectedRoute
  pages/       Home, Login, Register, author/, editor/, reviewer/, published/
  styles/      global.css, auth.css, dashboard.css
  store.js     localStorage data layer (users, papers, session)
  AuthContext.jsx, hooks.js, App.jsx, main.jsx
```
"# Research-Journal-Management-System-by-React" 
