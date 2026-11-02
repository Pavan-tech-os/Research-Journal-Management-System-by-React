import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import Sidebar from './Sidebar';

export default function ProtectedRoute({ role }) {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  if (user.role !== role) return <Navigate to={`/${user.role}`} replace />;
  return (
    <div className="dash">
      <Sidebar role={role} name={user.name} />
      <main className="dash-main"><Outlet /></main>
    </div>
  );
}
