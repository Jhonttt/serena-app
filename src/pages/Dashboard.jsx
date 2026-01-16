import { logout } from '../services/authService';

export default function Dashboard() {
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
