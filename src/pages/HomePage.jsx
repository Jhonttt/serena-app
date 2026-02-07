import { Card, CardIcon } from "../components/ui";
import { useEffect, useState } from "react";
import { getStudentProfile, getAdminProfile, getStudentHome } from "../api/auth";
import { getGreeting } from "../utils/greeting";
import { getTimeIcon } from "../utils/timeIcon";
import { FiVideo, FiMessageSquare, FiSmile, FiBookOpen, FiFileText, FiActivity, FiWind, FiAlertCircle, FiPhone, FiThumbsUp, FiMeh, FiFrown } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function HomePage() {
  const [student, setStudent] = useState(null);
  const [admin, setAdmin] = useState(null);
  const [homeProgress, setHomeProgress] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user, isAdmin } = useAuth();
  const [selectedMood, setSelectedMood] = useState(null);

  const moods = [
    { id: "muy-bien", label: "Muy bien", icon: <FiSmile size={20} className="text-green-700" />, base: "bg-green-100", hover: "hover:bg-green-200", selected: "bg-green-300 border border-green-400" },
    { id: "bien", label: "Bien", icon: <FiThumbsUp size={20} className="text-blue-700" />, base: "bg-blue-100", hover: "hover:bg-blue-200", selected: "bg-blue-300 border border-blue-400" },
    { id: "normal", label: "Normal", icon: <FiMeh size={20} className="text-purple-700" />, base: "bg-purple-100", hover: "hover:bg-purple-200", selected: "bg-purple-300 border border-purple-400" },
    { id: "no-muy-bien", label: "No muy bien", icon: <FiFrown size={20} className="text-red-700" />, base: "bg-red-100", hover: "hover:bg-red-200", selected: "bg-red-300 border border-red-400" },
  ];

  const calcPercent = (done, total) => total ? Math.round((done / total) * 100) : 0;

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const res = await getStudentProfile();
        setStudent(res.data);
      } catch (err) {
        console.log("Error al obtener el estudiante:", err);
      }
    };

    const fetchAdmin = async () => {
      try {
        const res = await getAdminProfile();
        setAdmin(res.data);
      } catch (err) {
        console.log("Error al obtener el admin:", err);
      }
    };

    const fetchHomeProgress = async () => {
      try {
        const res = await getStudentHome();
        setHomeProgress(res.data);
      } catch (err) {
        console.error("Error al obtener progreso del home:", err);
      } finally {
        setLoading(false);
      }
    };

    if (isAdmin) {
      fetchAdmin();
      setLoading(false);
    } else {
      fetchStudent();
      fetchHomeProgress();
    }
  }, [isAdmin]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <p className="text-gray-700 text-lg font-medium">Cargando información...</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      {/* Saludo */}
      <div className="max-w-7xl mx-auto px-10 rounded-2xl border border-gray-200 bg-linear-to-br from-blue-100 via-purple-100 to-rose-100">
        <section className="text-primary py-7">
          <div className="flex items-center gap-4">
            <div className="text-6xl">{getTimeIcon()}</div>
            <div>
              <h1 className="text-4xl font-semibold text-primary">
                {`${getGreeting()}, ${student?.first_name || admin?.email?.split("@")[0] || "Usuario"}!`}
              </h1>
              <p className="mt-2 text-gray-600 text-lg">
                Nos alegra verte de nuevo. ¿Cómo te sientes hoy?
              </p>
            </div>
          </div>
        </section>

        {/* Resumen */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 pb-10">
          <Card
            title={homeProgress?.sessions_completed ?? 0}
            text="Sesiones Completadas"
            titleSize="text-2xl"
            titleColor="#4db6ac"
            className="transition-transform duration-300 hover:scale-103"
          />
          <Card
            title={`${homeProgress?.total_progress ?? 0}%`}
            text="Progreso General"
            titleSize="text-2xl"
            titleColor="#64b5f6"
            className="transition-transform duration-300 hover:scale-103"
          />
          <Card
            title={homeProgress?.streak_days ?? 0}
            text="Días de racha activa"
            titleSize="text-2xl"
            titleColor="#ce93d8"
            className="transition-transform duration-300 hover:scale-103"
          />
        </section>
      </div>

      {/* Acceso rápido */}
      <div className="max-w-7xl mx-auto px-2 rounded-2xl p-6 m-6 border border-gray-200" style={{ background: "rgb(253, 253, 253)" }}>
        <section className="pl-8">
          <h2 className="text-2xl font-medium text-primary">Acceso Rápido</h2>
          <p className="mt-4 text-gray-600">Explora materiales educativos y herramientas para tu bienestar</p>
          <div className="flex justify-center gap-4 mt-8"></div>
        </section>
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 px-8 pb-10">
          <CardIcon title="Sesión de terapia" text="Contacta con tu terapeuta" titleSize="text-lg" className="hover:scale-105 hover:bg-[#f4fafe] transition-colors" iconButton={<button className="p-2 rounded-2xl" style={{ backgroundColor: "#e3f2fd" }}><FiVideo size={20} color="#1e3a8a" /></button>} />
          <CardIcon title="Chatbot de apoyo" text="Habla con un consejero" titleSize="text-lg" className="relative p-6 rounded-xl bg-white/50 hover:bg-[#edf8f7] hover:scale-105 transition-all" iconButton={<button className="p-2 rounded-2xl" style={{ backgroundColor: "#e0f2f1" }}><FiMessageSquare size={20} color="#00695c" /></button>} />
          <CardIcon title="Meditación Guiada" text="Relájate y encuentra calma" titleSize="text-lg" className="relative p-6 rounded-xl bg-white/50 hover:bg-[#faf4fb] hover:scale-105 transition-all" iconButton={<button className="p-2 rounded-2xl" style={{ backgroundColor: "#f3e5f5" }}><FiSmile size={20} color="#6a1b9a" /></button>} />
          <Link to="/resources" className="block">
            <CardIcon title="Biblioteca de recursos" text="Artículos y material educativo" titleSize="text-lg" className="relative p-6 rounded-xl bg-white/50 hover:bg-[#fff8ed] hover:scale-105 transition-all cursor-pointer" iconButton={<div className="p-2 rounded-2xl bg-[#fff3e0] inline-flex items-center justify-center"><FiBookOpen size={20} color="#e65100" /></div>} />
          </Link>
          <CardIcon title="Diario emocional" text="Registra tus sentimientos" titleSize="text-lg" className="relative p-6 rounded-xl bg-white/50 hover:bg-[#f2f9f2] hover:scale-105 transition-all" iconButton={<button className="p-2 rounded-2xl" style={{ backgroundColor: "#e8f5e9" }}><FiFileText size={20} color="#2e7d32" /></button>} />
          <CardIcon title="Ejercicios prácticos" text="Técnicas de afrontamiento" titleSize="text-lg" className="relative p-6 rounded-xl bg-white/50 hover:bg-[#fdeff4] hover:scale-105 transition-all" iconButton={<button className="p-2 rounded-2xl" style={{ backgroundColor: "#fce4ec" }}><FiActivity size={20} color="#c2185b" /></button>} />
        </section>
      </div>

      {/* Estado de ánimo */}
      <div className="max-w-7xl mx-auto px-10 rounded-2xl p-2 m-6 border border-gray-200" style={{ background: "rgb(253, 253, 253)" }}>
        <h2 className="text-2xl font-semibold text-primary mt-5 pb-4">¿Cómo te sientes hoy?</h2>
        <section className="grid grid-cols-2 md:grid-cols-4 gap-4 pb-10 mt-5">
          {moods.map((mood) => {
            const isSelected = selectedMood === mood.id;
            return (
              <button
                key={mood.id}
                onClick={() => setSelectedMood(mood.id)}
                className={`flex flex-col items-center justify-center p-3 rounded-xl transition-all ${isSelected ? `${mood.selected} scale-105` : `${mood.base} ${mood.hover} hover:scale-105`}`}
              >
                {mood.icon}
                <span className="font-medium text-gray-700">{mood.label}</span>
              </button>
            );
          })}
        </section>
        <p className="text-gray-600 mb-5 text-center text-sm">
          Registrar tu estado de ánimo nos ayuda a brindarte mejor apoyo
        </p>
      </div>

      {/* Progreso dinámico */}
      <div className="max-w-7xl mx-auto px-10 rounded-2xl p-2 m-1 border border-gray-200" style={{ background: "rgb(253, 253, 253)" }}>
        <section className="text-primary py-7">
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-semibold text-primary">Progreso</h2>
          </div>
        </section>
        <section className="grid grid-cols-1 gap-6 pb-10">
          <Card title={<div className="flex items-center gap-2"><FiWind size={24} color="#ec4899" /> Técnicas de respiración</div>} text={`${homeProgress?.breathing_done ?? 0} de ${homeProgress?.breathing_total ?? 0} completadas`} titleSize="text-2xl">
            <div className="w-full bg-gray-200 h-3 rounded-full mt-2">
              <div className="bg-pink-500 h-3 rounded-full" style={{ width: `${calcPercent(homeProgress?.breathing_done, homeProgress?.breathing_total)}%` }}></div>
            </div>
            <p className="text-right text-sm text-gray-600 mt-1">{calcPercent(homeProgress?.breathing_done, homeProgress?.breathing_total)}%</p>
          </Card>

          <Card title={<div className="flex items-center gap-2"><FiFileText size={24} color="#2563eb" /> Diario de emociones</div>} text={`${homeProgress?.diary_done ?? 0} de ${homeProgress?.diary_total ?? 0} completadas`} titleSize="text-2xl">
            <div className="w-full bg-gray-200 h-3 rounded-full mt-2">
              <div className="bg-blue-500 h-3 rounded-full" style={{ width: `${calcPercent(homeProgress?.diary_done, homeProgress?.diary_total)}%` }}></div>
            </div>
            <p className="text-right text-sm text-gray-600 mt-1">{calcPercent(homeProgress?.diary_done, homeProgress?.diary_total)}%</p>
          </Card>

          <Card title={<div className="flex items-center gap-2"><FiSmile size={24} color="#7c3aed" /> Meditación diaria</div>} text={`${homeProgress?.meditation_done ?? 0} de ${homeProgress?.meditation_total ?? 0} completadas`} titleSize="text-2xl">
            <div className="w-full bg-gray-200 h-3 rounded-full mt-2">
              <div className="bg-purple-500 h-3 rounded-full" style={{ width: `${calcPercent(homeProgress?.meditation_done, homeProgress?.meditation_total)}%` }}></div>
            </div>
            <p className="text-right text-sm text-gray-600 mt-1">{calcPercent(homeProgress?.meditation_done, homeProgress?.meditation_total)}%</p>
          </Card>
        </section>
      </div>

      {/* Ayuda inmediata */}
      <div className="max-w-7xl mx-auto px-10 rounded-2xl p-2 m-6 border border-red-300 bg-linear-to-br from-red-50 via-red-100 to-red-200">
        <section className="text-primary py-7">
          <div className="flex items-center gap-2">
            <FiAlertCircle size={24} color="#dc2626" />
            <h2 className="text-2xl font-semibold text-primary">¿Necesitas Ayuda Inmediata?</h2>
          </div>
          <p className="mt-4 text-gray-600">Si estás en crisis o necesitas apoyo urgente, estamos aquí para ti las 24 horas.</p>
          <a href="https://www.sanidad.gob.es/linea024/home.htm" target="_blank" rel="noopener noreferrer" className="mt-3 p-2 bg-red-500 rounded-lg inline-flex items-center gap-2 text-white font-semibold transition-transform duration-200 hover:scale-105">
            <FiPhone size={20} color="white" /> Línea de Crisis: 024
          </a>
        </section>
      </div>
    </div>
  );
}
