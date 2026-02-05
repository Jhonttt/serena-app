import { Card, CardIcon } from "../components/ui";
import { useEffect, useState } from "react";
import { getStudentProfile, getAdminProfile } from "../api/auth";
import { getGreeting } from "../utils/greeting";
import { getTimeIcon } from "../utils/timeIcon";
import { FiVideo, FiMessageSquare, FiSmile, FiBookOpen, FiFileText, FiActivity, FiWind, FiAlertCircle, FiPhone, FiThumbsUp, FiMeh, FiFrown } from "react-icons/fi";
//Esta biblioteca nos permite hacer un enlace interno en react
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function HomePage() {
  const [student, setStudent] = useState(null);
  const [admin, setAdmin] = useState(null);
  const { user, isAdmin } = useAuth();
  const [selectedMood, setSelectedMood] = useState(null);

  const moods = [
    { id: "muy-bien", label: "Muy bien", icon: <FiSmile size={20} />, color: "green" },
    { id: "bien", label: "Bien", icon: <FiThumbsUp size={20} />, color: "blue" },
    { id: "normal", label: "Normal", icon: <FiMeh size={20} />, color: "purple" },
    { id: "no-muy-bien", label: "No muy bien", icon: <FiFrown size={20} />, color: "red" },
  ];

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const res = await getStudentProfile();
        console.log(res.data); // Datos del estudiante
        setStudent(res.data);
      } catch (err) {
        console.log("Error al obtener el estudiante:", err);
      }
    };

    const fetchAdmin = async () => {
      try {
        const res = await getAdminProfile();
        console.log(res.data); // Datos del admin
        setAdmin(res.data);
      } catch (err) {
        console.log("Error al obtener el admin:", err);
      }
    };

    if (isAdmin) {
      fetchAdmin();
    } else {
      fetchStudent();
    }
  }, [isAdmin]);

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      <div className="max-w-7xl mx-auto px-10 rounded-2xl border border-gray-200 bg-linear-to-br from-blue-100 via-purple-100 to-rose-100">
        <section className="text-primary py-7">
          <div className="flex items-center gap-4">
            {/* Icono dinámico, con tamaño grande */}
            <div className="text-6xl">{getTimeIcon()}</div>

            {/* Saludo + frase en dos líneas */}
            <div>
              <h1 className="text-4xl font-semibold text-primary">
                {`${getGreeting()}, ${student?.first_name || admin?.email || "Usuario"}!`}
              </h1>
              <p className="mt-2 text-gray-600 text-lg">
                Nos alegra verte de nuevo. ¿Cómo te sientes hoy?
              </p>
            </div>
          </div>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 pb-10">
          <Card
            title="12"
            text="Sesiones Completadas"
            titleSize="text-2xl"
            titleColor="#4db6ac"
            className="transition-transform duration-300 hover:scale-103"
          />
          <Card
            title="15%"
            text="Progreso General"
            titleSize="text-2xl"
            titleColor="#64b5f6"
            className="transition-transform duration-300 hover:scale-103"
          />
          <Card
            title="5"
            text="Días de racha activa"
            titleSize="text-2xl"
            titleColor="#ce93d8"
            className="transition-transform duration-300 hover:scale-103"
          />
        </section>
      </div>

      <div
        className="max-w-7xl mx-auto px-2 rounded-2xl p-6 m-6 border border-gray-200"
        style={{ background: "rgb(253, 253, 253)" }}
      >
        <section className="pl-8">
          <h2 className="text-2xl font-medium text-primary">Acceso Rápido</h2>
          <p className="mt-4 text-gray-600">
            Explora materiales educativos y herramientas para tu bienestar
          </p>

          <div className="flex justify-center gap-4 mt-8"></div>
        </section>
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 px-8 pb-10">
          {/* Sesión de terapia */}
          <CardIcon
            className="hover:scale-105 hover:bg-[#f4fafe] transition-colors"
            title="Sesión de terapia"
            text="Contacta con tu terapeuta"
            titleSize="text-lg"
            iconButton={
              <button
                className="p-2 rounded-2xl"
                style={{ backgroundColor: "#e3f2fd" }}
              >
                <FiVideo size={20} color="#1e3a8a" /> {/* Azul contraste */}
              </button>
            }
          />

          {/* Chatbot de apoyo */}
          <CardIcon
            title="Chatbot de apoyo"
            titleSize="text-lg"
            text="Habla con un consejero"
            className="relative p-6 rounded-xl bg-white/50 hover:bg-[#edf8f7] hover:scale-105 transition-all"
            iconButton={
              <button
                className="p-2 rounded-2xl"
                style={{ backgroundColor: "#e0f2f1" }}
              >
                <FiMessageSquare size={20} color="#00695c" />{" "}
                {/* Verde contraste */}
              </button>
            }
          />

          {/* Meditación Guiada */}
          <CardIcon
            title="Meditación Guiada"
            titleSize="text-lg"
            text="Relájate y encuentra calma"
            className="relative p-6 rounded-xl bg-white/50 hover:bg-[#faf4fb] hover:scale-105 transition-all"
            iconButton={
              <button
                className="p-2 rounded-2xl"
                style={{ backgroundColor: "#f3e5f5" }}
              >
                <FiSmile size={20} color="#6a1b9a" /> {/* Morado contraste */}
              </button>
            }
          />

          {/* Biblioteca de recursos */}
          <Link to="/resources" className="block">
            <CardIcon
              title="Biblioteca de recursos"
              titleSize="text-lg"
              text="Artículos y material educativo"
              className="relative p-6 rounded-xl bg-white/50 hover:bg-[#fff8ed] hover:scale-105 transition-all cursor-pointer"
              iconButton={
                <div
                  className="p-2 rounded-2xl bg-[#fff3e0] inline-flex items-center justify-center"
                >
                  <FiBookOpen size={20} color="#e65100" />
                </div>
              }
            />
          </Link>

          {/* Diario emocional */}
          <CardIcon
            title="Diario emocional"
            titleSize="text-lg"
            text="Registra tus sentimientos"
            className="relative p-6 rounded-xl bg-white/50 hover:bg-[#f2f9f2] hover:scale-105 transition-all"
            iconButton={
              <button
                className="p-2 rounded-2xl"
                style={{ backgroundColor: "#e8f5e9" }}
              >
                <FiFileText size={20} color="#2e7d32" /> {/* Verde contraste */}
              </button>
            }
          />

          {/* Ejercicios prácticos */}
          <CardIcon
            title="Ejercicios prácticos"
            titleSize="text-lg"
            text="Técnicas de afrontamiento"
            className="relative p-6 rounded-xl bg-white/50 hover:bg-[#fdeff4] hover:scale-105 transition-all"
            iconButton={
              <button
                className="p-2 rounded-2xl"
                style={{ backgroundColor: "#fce4ec" }}
              >
                <FiActivity size={20} color="#c2185b" /> {/* Rosa contraste */}
              </button>
            }
          />
        </section>
      </div>
      
      <div className="max-w-7xl mx-auto px-10 rounded-2xl p-2 m-6 border border-gray-200"
        style={{ background: "rgb(253, 253, 253)" }}>
        <h2 className="text-2xl font-semibold text-primary mt-5 pb-4">¿Cómo te sientes hoy?</h2>
        <section className="grid grid-cols-2 md:grid-cols-4 gap-4 pb-10 mt-5">
          {moods.map((mood) => {
            const isSelected = selectedMood === mood.id;
            return (
              <button
                key={mood.id}
                onClick={() => setSelectedMood(mood.id)}
                className={`flex flex-col items-center justify-center p-3 rounded-xl transition-all
          ${isSelected ? `bg-${mood.color}-500 text-white scale-105` : `bg-${mood.color}-100 text-gray-700 hover:bg-${mood.color}-200 hover:scale-105`}`}
              >
                {mood.icon}
                <span className="font-medium">{mood.label}</span>
              </button>
            );
          })}
        </section>
        <p className="text-gray-600 mb-5 text-center text-sm">
          Registrar tu estado de ánimo nos ayuda a brindarte mejor apoyo
        </p>
      </div>
      <div
        className="max-w-7xl mx-auto px-10 rounded-2xl p-2 m-1 border border-gray-200"
        style={{ background: "rgb(253, 253, 253)" }}

      >
        <section className="text-primary py-7">
          {/* Sección de progreso con icono verde */}
          <div className="flex items-center gap-2">
            {/* Icono verde */}
            <FiActivity size={28} color="#22c55e" /> {/* Verde brillante */}
            <h2 className="text-2xl font-semibold text-primary">Progreso</h2>
          </div>
        </section>

        <section className="grid grid-cols-1 gap-6 pb-10">
          {/* Técnicas de respiración */}
          <Card
            title={
              <div className="flex items-center gap-2">
                <FiWind size={24} color="#ec4899" />{" "}
                {/* Icono rosa para contraste */}
                Técnicas de respiración
              </div>
            }
            text="9 de 10 completadas"
            titleSize="text-2xl"
          >
            <div className="w-full bg-gray-200 h-3 rounded-full mt-2">
              <div
                className="bg-pink-500 h-3 rounded-full"
                style={{ width: `${(9 / 10) * 100}%` }}
              ></div>
            </div>
            <p className="text-right text-sm text-gray-600 mt-1">90%</p>
          </Card>

          {/* Diario de emociones */}
          <Card
            title={
              <div className="flex items-center gap-2">
                <FiFileText size={24} color="#2563eb" />{" "}
                {/* Azul para contraste */}
                Diario de emociones
              </div>
            }
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

          {/* Meditación diaria */}
          <Card
            title={
              <div className="flex items-center gap-2">
                <FiSmile size={24} color="#7c3aed" />{" "}
                {/* Morado para contraste */}
                Meditación diaria
              </div>
            }
            text="17 de 20 completadas"
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

      <div className="max-w-7xl mx-auto px-10 rounded-2xl p-2 m-6 border border-red-300 bg-linear-to-br from-red-50 via-red-100 to-red-200">
        <section className="text-primary py-7">
          <div className="flex items-center gap-2">
            <FiAlertCircle size={24} color="#dc2626" />{" "}
            {/* Icono informativo rojo */}
            <h2 className="text-2xl font-semibold text-primary">
              ¿Necesitas Ayuda Inmediata?
            </h2>
          </div>
          <p className="mt-4 text-gray-600">
            Si estás en crisis o necesitas apoyo urgente, estamos aquí para ti
            las 24 horas.
          </p>

          {/* Botón funcional con icono de teléfono blanco y hover */}
          <a
            href="https://www.sanidad.gob.es/linea024/home.htm"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 p-2 bg-red-500 rounded-lg inline-flex items-center gap-2 text-white font-semibold transition-transform duration-200 hover:scale-105"
          >
            <FiPhone size={20} color="white" /> {/* Icono de teléfono */}
            Línea de Crisis: 024
          </a>
        </section>
      </div>
    </div>
  );
}
