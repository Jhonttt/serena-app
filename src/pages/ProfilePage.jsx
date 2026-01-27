import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function ProfilePage() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="flex items-center justify-center h-[calc(100vh-64px)] bg-gray-100 px-4 w-full overflow-x-hidden">
      <div className="bg-white w-full max-w-md p-8 rounded-2xl shadow-lg">
        <h1 className="text-2xl font-semibold text-gray-800 mb-4">
          Perfil de usuario
        </h1>

        <p className="text-gray-600 mb-6">
          Has iniciado sesión correctamente. Desde aquí puedes cerrar tu sesión.
        </p>

        <button
          onClick={handleLogout}
          className="w-full bg-red-500 text-white font-medium py-2 px-4 rounded-lg
                     hover:bg-red-600 transition-colors duration-200
                     focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2"
        >
          Cerrar sesión
        </button>
      </div>
    </div>
  );
}

export default ProfilePage;
