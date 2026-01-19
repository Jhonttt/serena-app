import { useEffect } from 'react';
import api from '../services/api';
import { logout } from '../services/authService';

export default function Dashboard() {
  useEffect(() => {
    api.get('/protected');
  }, []);

  return (
    <div>
      <h1>Zona privada</h1>
      <button
        onClick={() => {
          logout();
          window.location.href = '/login';
        }}
      >
        Logout
      </button>
    </div>
  );
}
