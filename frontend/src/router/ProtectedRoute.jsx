import { Navigate } from 'react-router-dom';
import authService from '../features/auth/auth.service';

export default function ProtectedRoute({ children }) {
  const token = authService.getToken();

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
