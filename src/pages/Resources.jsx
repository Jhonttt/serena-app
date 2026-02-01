import { Link } from "react-router-dom";

const resources = [
  { title: "Respiración para Ansiedad", tag: "Ansiedad" },
  { title: "Mindfulness para Principiantes", tag: "Mindfulness" },
  { title: "Meditación para Dormir", tag: "Sueño" },
];

export default function Resources() {
  return (
    <div className="p-8">


      {/* Título principal */}
      <h2 className="text-3xl font-bold text-primary mb-6">
        Recursos de Aprendizaje
      </h2>

      {/* Tarjetas de recursos */}
      <div className="grid md:grid-cols-3 gap-6">
        {resources.map((r, i) => (
          <div key={i} className="bg-white p-6 rounded-xl shadow">
            <span className="text-sm text-primary">{r.tag}</span>
            <h3 className="mt-2 font-semibold">{r.title}</h3>

            {/* Botón funcional, se puede redirigir más adelante a otra ruta */}
            <Link
              to="/" // Aquí puedes cambiar a otra ruta si el recurso tiene página propia
              className="mt-4 inline-block w-full text-center bg-blue-500 text-white rounded py-2 font-medium transition-transform duration-200 hover:scale-105"
            >
              Acceder al Recurso
            </Link>
          </div>
        ))}
      </div>
      {/* Botón de regreso al Home */}
      <section className="mb-6 mt-6">
        <Link
          to="/" // Redirige al Home
          className="inline-flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg font-semibold transition-transform duration-200 hover:scale-105"
        >
          🏠 Volver al inicio
        </Link>
      </section>
    </div>
  );
}
