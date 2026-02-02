import { getStudentProfile, getAdminProfile } from "../api/auth";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function ProfilePage() {
  const [profile, setProfile] = useState(null);
  const [userType, setUserType] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        setError(null);
        try {
          const res = await getStudentProfile();
          setProfile(res.data);
          setUserType("student");
        } catch {
          const res = await getAdminProfile();
          setProfile(res.data);
          setUserType("admin");
        }
      } catch (err) {
        setError("Error al cargar el perfil. Por favor, intenta nuevamente.");
        console.error("Error fetching profile:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleEditProfile = () => {
    // Navegar a página de edición
    navigate("/profile/edit");
  };

  const formatDate = (dateString) => {
    if (!dateString) return "No disponible";
    const date = new Date(dateString);
    return date.toLocaleDateString("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const calculateAge = (birthDay) => {
    if (!birthDay) return null;
    const today = new Date();
    const birth = new Date(birthDay);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birth.getDate())
    ) {
      age--;
    }
    return age;
  };

  if (loading) {
    return (
      <div className="container mx-auto p-4 flex justify-center items-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando perfil...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-4 max-w-2xl mt-8">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <svg
            className="w-12 h-12 text-red-500 mx-auto mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <p className="text-red-600 font-medium mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded-lg transition-colors"
          >
            Reintentar
          </button>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="container mx-auto p-4 max-w-2xl mt-8">
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 text-center">
          <p className="text-yellow-800">No se encontraron datos del perfil</p>
        </div>
      </div>
    );
  }

  // Determinar el nombre a mostrar
  const displayName =
    userType === "student"
      ? `${profile.first_name} ${profile.last_name}`
      : profile.display_name || profile.email.split("@")[0];

  const firstInitial =
    userType === "student"
      ? profile.first_name?.charAt(0).toUpperCase()
      : profile.email?.charAt(0).toUpperCase();

  return (
    <div className="container mx-auto p-4 max-w-3xl">
      {/* Header con avatar y badge */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg shadow-lg p-8 mb-6 text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            {/* Avatar */}
            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center text-3xl font-bold text-blue-600">
              {firstInitial || "?"}
            </div>

            {/* Nombre y rol */}
            <div>
              <h1 className="text-3xl font-bold mb-2">{displayName}</h1>
              <span
                className={`inline-block px-4 py-1 rounded-full text-sm font-semibold ${
                  userType === "student"
                    ? "bg-green-500 text-white"
                    : "bg-yellow-400 text-gray-800"
                }`}
              >
                {userType === "student" ? "✓ Estudiante" : "★ Administrador"}
              </span>
              {!profile.is_active && (
                <span className="ml-2 inline-block px-4 py-1 rounded-full text-sm font-semibold bg-red-500 text-white">
                  Inactivo
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Información del perfil */}
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800">
            Información Personal
          </h2>
        </div>

        <div className="p-6 space-y-6">
          {/* Estudiante: Información completa */}
          {userType === "student" && (
            <>
              {/* Nombre completo */}
              <div className="border-b border-gray-100 pb-4">
                <label className="block text-sm font-medium text-gray-500 mb-1">
                  Nombre Completo
                </label>
                <p className="text-lg text-gray-900 font-medium">
                  {profile.full_name ||
                    `${profile.first_name} ${profile.last_name}`}
                </p>
              </div>

              {/* Fecha de nacimiento y edad */}
              <div className="border-b border-gray-100 pb-4 grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">
                    Fecha de Nacimiento
                  </label>
                  <p className="text-lg text-gray-900">
                    {formatDate(profile.birth_day)}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">
                    Edad
                  </label>
                  <p className="text-lg text-gray-900">
                    {calculateAge(profile.birth_day)} años
                    {profile.is_adult && (
                      <span className="ml-2 text-sm text-green-600">
                        (Mayor de edad)
                      </span>
                    )}
                  </p>
                </div>
              </div>

              {/* Nivel educativo */}
              <div className="border-b border-gray-100 pb-4">
                <label className="block text-sm font-medium text-gray-500 mb-1">
                  Nivel Educativo
                </label>
                <p className="text-lg text-gray-900 capitalize">
                  {profile.education_level}
                </p>
              </div>
            </>
          )}
          {/* Email (común para ambos) */}
          <div className="border-b border-gray-100 pb-4">
            <label className="block text-sm font-medium text-gray-500 mb-1">
              Correo Electrónico
            </label>
            <div className="flex items-center space-x-2">
              <svg
                className="w-5 h-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              <p className="text-lg text-gray-900">
                {profile.email || "No disponible"}
              </p>
            </div>
          </div>
          {/* Admin: Información adicional */}
          {userType === "admin" && (
            <>
              <div className="border-b border-gray-100 pb-4">
                <label className="block text-sm font-medium text-gray-500 mb-1">
                  Rol en el Sistema
                </label>
                <div className="flex items-center space-x-2">
                  <svg
                    className="w-5 h-5 text-yellow-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <p className="text-lg text-gray-900 font-medium">
                    {profile.role_name || "Administrador"}
                  </p>
                </div>
              </div>

              {profile.created_at && (
                <div className="border-b border-gray-100 pb-4">
                  <label className="block text-sm font-medium text-gray-500 mb-1">
                    Miembro desde
                  </label>
                  <p className="text-lg text-gray-900">
                    {formatDate(profile.created_at)}
                  </p>
                </div>
              )}
            </>
          )}

          {/* Tutores (solo para estudiantes) */}
          {userType === "student" &&
            profile.tutors &&
            profile.tutors.length > 0 && (
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-3">
                  Tutores Asignados
                </label>
                <div className="space-y-3">
                  {profile.tutors.map((tutor, index) => (
                    <div
                      key={tutor.id || index}
                      className="bg-gray-50 p-4 rounded-lg"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <p className="font-medium text-gray-900">
                            {tutor.full_name}
                            {tutor.is_primary && (
                              <span className="ml-2 text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                                Principal
                              </span>
                            )}
                          </p>
                          <p className="text-sm text-gray-600 mt-1">
                            <span className="font-medium">Relación:</span>{" "}
                            {tutor.relationship}
                          </p>
                          {tutor.phone && (
                            <p className="text-sm text-gray-600 mt-1">
                              📱 {tutor.phone}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          {/* ID (para debugging - opcional) */}
          {profile.user_id && (
            <div className="pt-2">
              <label className="block text-sm font-medium text-gray-500 mb-1">
                ID de Usuario
              </label>
              <p className="text-sm text-gray-600 font-mono bg-gray-50 px-3 py-2 rounded">
                {profile.user_id}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Botones de acción */}
      <div className="mt-6 flex gap-4">
        <button
          onClick={handleEditProfile}
          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition-all duration-200 transform hover:scale-105 flex items-center justify-center space-x-2 cursor-pointer"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
            />
          </svg>
          <span>Editar Perfil</span>
        </button>

        <button
          onClick={() => navigate(-1)}
          className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-3 px-6 rounded-lg shadow-md transition-all duration-200 flex items-center justify-center space-x-2 cursor-pointer"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          <span>Volver</span>
        </button>
      </div>
    </div>
  );
}

export default ProfilePage;
