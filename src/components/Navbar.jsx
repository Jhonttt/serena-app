import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Logo from "../assets/logo.svg";
import { FiUpload } from "react-icons/fi";

function Navbar() {
  const { isAuthenticated, logout, isAdmin, loading } = useAuth();
  if (loading) return null;

  console.log(isAdmin);
  return (
    <nav className="bg-white shadow-md px-6 py-4 flex items-center justify-between w-full">
      {/* Logo / Título */}
      <a
        href="https://proyectoserena.org"
        className="flex items-center space-x-2"
      >
        <img
          src={Logo}
          alt="Serena Logo"
          className="h-8 w-auto object-contain"
        />
      </a>
      {/* Menú */}
      <ul className="flex space-x-3 shrink-0">
        {isAuthenticated ? (
          <>
            {isAdmin && (
              <li>
                <Link
                  // to="/upload"
                  to="/profile" // Temporal
                  className="rounded-full px-4 py-2
                bg-purple-600 text-white font-medium hover:bg-blue-500 transition-colors duration-200 flex items-center gap-2"
                >
                  <FiUpload size={20} color="#ffffff" />
                  Subir archivos
                </Link>
              </li>
            )}
            <li>
              <Link
                to="/profile"
                className="squared-full px-4 py-2
                bg-blue-500 text-white font-medium hover:bg-purple-700 transition-colors duration-200 flex items-center gap-2 rounded-lg"
              >
                Perfil
              </Link>
            </li>
            <li>
              <Link
                to="/home"
                className="squared-full px-4 py-2
                bg-blue-500 text-white font-medium hover:bg-purple-700 transition-colors duration-200 flex items-center gap-2 rounded-lg"
              >
                Inicio
              </Link>
            </li>
            <li>
              <Link
                to="/"
                onClick={() => {
                  logout();
                }}
                className="squared-full px-4 py-2
                bg-red-500 text-white font-medium hover:bg-red-700 transition-colors duration-200 flex items-center gap-2 rounded-lg"
              >
                Cerrar sesión
              </Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link
                to="/login"
                className="squared-full px-4 py-2
                bg-blue-500 text-white font-medium hover:bg-purple-700 transition-colors duration-200 flex items-center gap-2 rounded-lg"
              >
                Login
              </Link>
            </li>
            <li>
              <Link
                to="/register"
                className="squared-full px-4 py-2
                bg-blue-500 text-white font-medium hover:bg-purple-700 transition-colors duration-200 flex items-center gap-2 rounded-lg"
              >
                Register
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}
export default Navbar;
