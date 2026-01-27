import { Link } from "react-router-dom";
import Logo from "../assets/logo.svg";

function Footer() {
  return (
    <div className="bg-white shadow-inner mt-12">
      <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col md:flex-row justify-between items-center">
        {/* Logo y texto */}
        <div className="flex items-center space-x-2 mb-4 md:mb-0">
          <Link to="/" className="flex items-center space-x-2">
            <img src={Logo} alt="Serena Logo" className="h-8 w-auto max-w-200px object-contain" />
          </Link>
        </div>

        {/* Enlaces */}
        <ul className="flex space-x-6 text-gray-600">
          <li>
            <Link to="/" className="hover:text-blue-600 transition-colors duration-200">Inicio</Link>
          </li>
          <li>
            <Link to="/about" className="hover:text-blue-600 transition-colors duration-200">Acerca de</Link>
          </li>
          <li>
            <Link to="/contact" className="hover:text-blue-600 transition-colors duration-200">Contacto</Link>
          </li>
          <li>
            <Link to="/privacy" className="hover:text-blue-600 transition-colors duration-200">Privacidad</Link>
          </li>
        </ul>
      </div>

      {/* Copyright */}
      <div className="bg-gray-100 text-gray-500 text-sm text-center py-4">
        © {new Date().getFullYear()} Serena. Todos los derechos reservados.
      </div>
    </div>
  );
}

export default Footer;
