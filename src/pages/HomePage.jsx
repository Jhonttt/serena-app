import Card from "../components/ui/Card";
import { useAuth } from "../context/AuthContext";

export default function HomePage() {
  const { isAdmin } = useAuth();
  return (
    <div className="bg-gray-50 min-h-screen p-6">
      <div
        className="max-w-7xl mx-auto px-10 rounded-2xl  border border-gray-200 bg-linear-to-br from-blue-100 via-purple-100 to-rose-100"
      >
        <section className="text-primary py-7">
          <h1 className="text-4xl font-semibold text-primary">
            Buenos días, Usuario
          </h1>
          <p className="mt-4 text-gray-600">
            Nos alegra verte de nuevo. ¿Cómo te sientes hoy?
          </p>
        </section>

          <section className="grid grid-cols-1 md:grid-cols-3 gap-6 pb-10">
            <Card title="12" text="Sesiones Completadas" titleSize="text-2xl" />
            <Card title="15%" text="Progreso General" titleSize="text-2xl" />
            <Card title="5" text="Días de racha activa" titleSize="text-2xl" />
          </section>
        </div>

        <div
          className="max-w-7xl mx-auto px-2 rounded-2xl p-6 m-6 border border-gray-200"
          style={{ background: "rgb(253, 253, 253)" }}
        >
          <section className="pl-8">
            {" "}
            {/* pl-6 = padding-left */}
            <h2 className="text-2xl font-medium text-primary">
              Acceso Rápido{" "}
            </h2>
            <p className="mt-4 text-gray-600">
              Explora materiales educativos y herramientas para tu bienestar
            </p>
            <div className="flex justify-center gap-4 mt-8"></div>
          </section>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 px-8 pb-10">
          <Card
            title="Sesión de Terapia"
            titleSize="text-lg"
            text="Conecta con tu terapeuta"  >
            <button
              style={{ backgroundColor: "#7C3AED", color: "white", padding: "0.75rem 1.5rem", borderRadius: "0.5rem", border: "none" }}
            >
              Acceder al recurso
            </button>
          </Card>
          <Card
            titleSize="text-lg"
            title="Chatbot de apoyo"
            text="Habla con un consejero"  >
            <button
              style={{ backgroundColor: "#7C3AED", color: "white", padding: "0.75rem 1.5rem", borderRadius: "0.5rem", border: "none" }}
            >
              Acceder al recurso
            </button>
          </Card>
          <Card
            title="Meditación Guiada"
            titleSize="text-lg"
            text="Relájate y encuentra calma"  >
            <button
              style={{ backgroundColor: "#7C3AED", color: "white", padding: "0.75rem 1.5rem", borderRadius: "0.5rem", border: "none" }}
            >
              Acceder al recurso
            </button>
          </Card>
          <Card
            title="Biblioteca de recursos"
            titleSize="text-lg"
            text="Artículos y material educativo" >
            <button
              style={{ backgroundColor: "#7C3AED", color: "white", padding: "0.75rem 1.5rem", borderRadius: "0.5rem", border: "none" }}
            >
              Acceder al recurso
            </button>
          </Card>
          <Card
            title="Diario emocional"
            titleSize="text-lg"
            text="Registra tus sentimientos"  >
            <button
              style={{ backgroundColor: "#7C3AED", color: "white", padding: "0.75rem 1.5rem", borderRadius: "0.5rem", border: "none" }}
            >
              Acceder al recurso
            </button>
          </Card>
          <Card
            title="Ejercicios prácticos"
            titleSize="text-lg"
            text="Técnicas de afrontamiento"  >
            <button
              style={{ backgroundColor: "#7C3AED", color: "white", padding: "0.75rem 1.5rem", borderRadius: "0.5rem", border: "none" }}
            >
              Acceder al recurso
            </button>
          </Card>

        </section>

      </div>

        <div
          className="max-w-7xl mx-auto px-10 rounded-2xl p-2 m-6 border border-gray-200"
          style={{ background: "rgb(253, 253, 253)" }}
        >
          <section className="text-primary py-7">
            <h2 className="text-2xl font-semibold text-primary">📈 Progreso</h2>
            <p className="mt-4 text-gray-600">
              Nos alegra verte de nuevo. ¿Cómo te sientes hoy?
            </p>
          </section>

          <section className="grid grid-cols-1  gap-6 pb-10">
            <Card
              title="Técnicas de respiración"
              text="9 de 10 completadas"
              titleSize="text-2xl"
            >
              {/* Barra de progreso dentro del children */}
              <div className="w-full bg-gray-200 h-3 rounded-full mt-2">
                <div
                  className="bg-pink-500 h-3 rounded-full"
                  style={{ width: `${(9 / 10) * 100}%` }}
                ></div>
              </div>
              <p className="text-right text-sm text-gray-600 mt-1">90%</p>
            </Card>

            <Card
              title="Diario de emociones"
              text="14 de 20 completadas"
              titleSize="text-2xl"
            >
              <div className="w-full bg-gray-200 h-3 rounded-full mt-2">
                <div
                  className="bg-blue-500 h-3 rounded-full"
                  style={{ width: `${(14 / 20) * 100}%` }}
                ></div>
              </div>
              <p className="text-right text-sm text-gray-600 mt-1">70%</p>
            </Card>

            <Card
              title="Meditación diaria"
              text="14 de 20 completadas"
              titleSize="text-2xl"
            >
              <div className="w-full bg-gray-200 h-3 rounded-full mt-2">
                <div
                  className="bg-purple-500 h-3 rounded-full"
                  style={{ width: `${(17 / 20) * 100}%` }}
                ></div>
              </div>
              <p className="text-right text-sm text-gray-600 mt-1">85%</p>
            </Card>
          </section>
        </div>

      <div className="max-w-7xl mx-auto px-10 rounded-2xl p-2 m-6 border border-gray-200 bg-linear-to-br from-red-50 via-red-100 to-red-200"  >
        <section className="text-primary py-7">
          <h2 className="text-2xl font-semibold text-primary">
            ¿Necesitas Ayuda Inmediata?
          </h2>
          <p className="mt-4 text-gray-600">
            Si estás en crisis o necesitas apoyo urgente, estamos aquí para ti las 24 horas.
          </p>
          <button className="border border-red-200 mt-3 p-2 bg-red-300 rounded-lg">
              📞 Linea de Crisis: 024
            </button>
          </section>
        </div>
      </div>
  );
}
