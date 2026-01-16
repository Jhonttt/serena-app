import { Navigate } from 'react-router-dom';
import { refreshToken } from '../services/authService';

export default function PrivateRoute({ children }) {
  const token = localStorage.getItem('accessToken');

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
