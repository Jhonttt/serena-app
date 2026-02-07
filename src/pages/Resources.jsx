import { useEffect, useState } from "react";
import { FiMusic, FiVideo, FiBook } from "react-icons/fi";
import { Link } from "react-router-dom";
import { getResourcesRequest } from "../api/resources";

export default function Resources() {
  const [resources, setResources] = useState([]);

  useEffect(() => {
    const fetchResources = async () => {
      try {
        const res = await getResourcesRequest();
        // mapeamos para añadir iconos según type
        const mapped = res.data.map(r => ({
          ...r,
          icon: r.type_resource === "Video" ? <FiVideo size={24} color="#2196f3" /> :
                r.type_resource === "Audio" ? <FiMusic size={24} color="#e91e63" /> :
                <FiBook size={24} color="#ff9800" />
        }));
        setResources(mapped);
      } catch (error) {
        console.error("Error cargando recursos:", error);
      }
    };

    fetchResources();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-10 rounded-2xl border border-gray-200 mt-9 mb-9" style={{ backgroundColor: '#fffefe' }} >
      <h2 className="text-3xl font-semibold text-primary mb-8 mt-10">
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
        to="/" 
        className="inline-flex items-center gap-2 bg-blue-500 text-white px-4 py-2 mb-9 mt-8 rounded-lg font-semibold transition-transform duration-200 hover:scale-105"
      >
        🏠 Volver al inicio
      </Link>
    </div>
  );
}
