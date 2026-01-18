import { Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { fetchProtected, refreshToken } from '../services/authService';

export default function PrivateRoute({ children }) {
  const [status, setStatus] = useState('loading');

  useEffect(() => {
    async function validate() {
      try {
        await fetchProtected();
        setStatus('ok');
      } catch (err) {
        if (err.message === 'UNAUTHORIZED') {
          try {
            await refreshToken();
            await fetchProtected();
            setStatus('ok');
          } catch {
            localStorage.removeItem('accessToken');
            setStatus('fail');
          }
        } else {
          setStatus('fail');
        }
      }
    }

    validate();
  }, []);

  if (status === 'loading') return null;
  if (status === 'fail') return <Navigate to="/login" replace />;

  return children;
}
