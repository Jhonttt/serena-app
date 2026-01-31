import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Logo from "../assets/logo.svg";

function Navbar() {
  const { isAuthenticated, logout } = useAuth();
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
      <ul className="flex space-x-6 shrink-0">
        {isAuthenticated ? (
          <>
            <li>
              <Link
                to="/profile"
                className="text-gray-700 hover:text-blue-600 transition-colors duration-200 font-medium"
              >
                Menú
              </Link>
            </li>
            <li>
              <Link
                to="/"
                onClick={() => {
                  logout();
                }}
                className="text-gray-700 hover:text-blue-600 transition-colors duration-200 font-medium"
              >
                Salir
              </Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link
                to="/login"
                className="text-gray-700 hover:text-blue-600 transition-colors duration-200 font-medium"
              >
                Login
              </Link>
            </li>
            <li>
              <Link
                to="/register"
                className="text-gray-700 hover:text-blue-600 transition-colors duration-200 font-medium"
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
