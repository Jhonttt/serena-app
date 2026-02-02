import { FiMusic, FiVideo, FiBook } from "react-icons/fi";
import { Link } from "react-router-dom";

const resources = [
  {
    title: "Soledad, acoso e Ideación Suicida en adolescentes",
    type: "Audio",
    description: "Soledad no deseada y riesgo de ideación suicida en adolescentes víctimas de acoso, según Cirenia Quintana-Orts",
    url: "https://www.ivoox.com/soledad-acoso-e-ideacion-suicida-adolescentes-audios-mp3_rf_106572234_1.html",
    icon: <FiMusic size={24} color="#e91e63" />
  },
  {
    title: "El cerebro, nuestro mejor aliado contra el estrés",
    type: "Video",
    description: "Comprender es aliviar, y cuando comprendes por lo que pasa tu mente, te sientes aliviado; porque si no, eres esclavo de síntomas físicos, psicológicos y vas como perdido por la vida",
    url: "https://www.youtube.com/watch?v=0noAwrWY78U",
    icon: <FiVideo size={24} color="#2196f3" />
  },
  {
    title: "Cuatro pilares para una buena autoestima",
    type: "Video",
    description: "‘A mi yo adolescente’ es un espacio en el que escucharemos la voz de los jóvenes y referentes destacados conversarán sobre autoestima",
    url: "https://www.youtube.com/watch?v=mT8qVzEhiEA",
    icon: <FiVideo size={24} color="#4caf50" />
  },
  {
    title: "Cómo combatir la ansiedad: Guía de técnicas esenciales",
    type: "Lectura",
    description: "Guía con técnicas esenciales para manejar la ansiedad",
    url: "https://www.areahumana.es/como-combatir-la-ansiedad/",
    icon: <FiBook size={24} color="#ff9800" />
  },
  {
    title: "Guía de auto ayuda: Mejora tu autoestima",
    type: "Lectura",
    description: "Documento para fortalecer la autoestima personal",
    url: "https://drive.google.com/file/d/1z3thtCKM80cmNBSLZ52AGJhDwBgZG9tn/view?usp=sharing",
    icon: <FiBook size={24} color="#9c27b0" />
  },
  {
    title: "Guía de auto ayuda: Cómo hacer frente a las preocupaciones",
    type: "Lectura",
    description: "Guía práctica para gestionar preocupaciones",
    url: "https://drive.google.com/file/d/1q5-BD-1bbTh_UMrvE7QJ67ic-_wqSTPt/view?usp=sharing",
    icon: <FiBook size={24} color="#ff5722" />
  },
  {
    title: "Guía de auto ayuda: Qué puedo hacer para ayudarme si tengo depresión",
    type: "Lectura",
    description: "Consejos prácticos para la autoayuda en depresión",
    url: "https://drive.google.com/file/d/1yKsNcoGTesibXG4Z-Jcr0o5M16Wl3TWq/view?usp=sharing",
    icon: <FiBook size={24} color="#3f51b5" />
  },
   {
    title: "Gestionar el fracaso | 414",
    type: "Audio",
    description: "Gestionar el fracaso no es solo asumir que algo no salió como esperábamos; es enfrentarnos a la frustración, la vergüenza y a esa voz interna que cuestiona nuestro valor.",
    url: "https://www.ivoox.com/gestionar-fracaso-414-audios-mp3_rf_166708543_1.html",
    icon: <FiMusic size={24} color="#f44336" /> // rojo para audio
  },
];

export default function Resources() {
  return (
    <div className="max-w-7xl mx-auto px-10 rounded-2xl border border-gray-200 mt-9 mb-9" style={{ backgroundColor: '#fffefe' }} >
      <h2 className="text-3xl font-bold text-primary mb-6 mt-5">
        Recursos de Aprendizaje
      </h2>

      <div className="grid md:grid-cols-3 gap-6">
        {resources.map((r, i) => (
          <a
            key={i}
            href={r.url}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white p-6 rounded-xl shadow flex flex-col items-start gap-3 hover:scale-105 transition-transform hover:bg-[#f8f9ff]"
          >
            <div className="flex items-center gap-2">
              {r.icon}
              <h3 className="font-semibold">{r.title}</h3>
            </div>
            <p className="text-gray-600 text-sm">{r.description}</p>
          </a>
        ))}
      </div>
      <Link
          to="/" // Redirige al Home
          className="inline-flex items-center gap-2 bg-blue-500 text-white px-4 py-2 mb-9 mt-8 rounded-lg font-semibold transition-transform duration-200 hover:scale-105"
        >
          🏠 Volver al inicio
        </Link>
    </div>

  );
}
 