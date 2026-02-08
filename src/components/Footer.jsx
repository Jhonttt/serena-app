import { Link } from "react-router-dom";
import Logo from "../assets/logo.svg";

function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    plataforma: [
      { name: "Inicio", path: "/home" },
      { name: "Recursos", path: "/resources" },
      { name: "Acerca de", path: "/" },
    ],
    soporte: [
      { name: "Centro de Ayuda", path: "/" },
      { name: "Contacto", path: "/" },
      { name: "Preguntas Frecuentes", path: "/" },
    ],
    legal: [
      { name: "Privacidad", path: "/" },
      { name: "Términos de Uso", path: "/" },
      { name: "Cookies", path: "/" },
    ],
  };

  const socialLinks = [
    {
      name: "Instagram",
      href: "https://www.instagram.com/proyecto_serena/",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
        </svg>
      ),
    },
  ];

  return (
    <footer className="bg-linear-to-b from-white to-gray-50 border-t border-gray-200 mt-auto">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Logo y descripción */}
          <div className="lg:col-span-2">
            <div className="inline-block mb-4">
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
          </div>
            <p className="text-gray-600 text-sm leading-relaxed mb-4 max-w-sm">
              Plataforma de recursos educativos para el bienestar emocional y
              el aprendizaje.
            </p>
            {/* Redes sociales */}
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-blue-600 transition-colors duration-200"
                  aria-label={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Plataforma */}
          <div>
            <h3 className="text-gray-900 font-semibold text-sm mb-4">
              Plataforma
            </h3>
            <ul className="space-y-3">
              {footerLinks.plataforma.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-gray-600 hover:text-blue-600 transition-colors duration-200 text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Soporte */}
          <div>
            <h3 className="text-gray-900 font-semibold text-sm mb-4">
              Soporte
            </h3>
            <ul className="space-y-3">
              {footerLinks.soporte.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-gray-600 hover:text-blue-600 transition-colors duration-200 text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-gray-900 font-semibold text-sm mb-4">Legal</h3>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-gray-600 hover:text-blue-600 transition-colors duration-200 text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-200 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Copyright */}
            <p className="text-gray-500 text-sm">
              © {currentYear} Serena. Todos los derechos reservados.
            </p>

            {/* Enlaces adicionales */}
            <div className="flex items-center space-x-6 text-sm text-gray-500">
              <a
                href="mailto:contacto@proyectoserena.org"
                className="hover:text-blue-600 transition-colors duration-200"
              >
                contacto@proyectoserena.org
              </a>
              <a
                href="https://proyectoserena.org"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-600 transition-colors duration-200"
              >
                proyectoserena.org
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;