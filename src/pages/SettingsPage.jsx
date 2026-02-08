import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import {
  getStudentProfile,
  getAdminProfile,
  updatePersonalInfo,
  changePassword,
  updatePreferences,
  deactivateAccount,
} from "../api/auth";
import { useAuth } from "../context/AuthContext";
import { ErrorSummary, ConfirmModal } from "../components/ui";
import { PersonalInfoForm } from "../components/settings/PersonalInfoForm";
import { SecurityForm } from "../components/settings/SecurityForm";
import { PreferencesForm } from "../components/settings/PreferencesForm";
import { minDate } from "../utils/minDate";

function SettingsPage() {
  const { user, logout, updateUser } = useAuth(); // ✅ Agregamos updateUser
  const [activeTab, setActiveTab] = useState("personal");
  const [profile, setProfile] = useState(null);
  const [userType, setUserType] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [feedback, setFeedback] = useState({ text: "", type: "" });
  const [showDeactivateModal, setShowDeactivateModal] = useState(false);
  const navigate = useNavigate();

  // Labels para el resumen de errores
  const fieldLabels = {
    first_name: "Nombre",
    last_name: "Apellido",
    email: "Correo Electrónico",
    birth_day: "Fecha de Nacimiento",
    education_level: "Nivel Educativo",
    current_password: "Contraseña Actual",
    new_password: "Nueva Contraseña",
    confirm_password: "Confirmar Contraseña",
  };

  // React Hook Form para Información Personal
  const {
    register: registerPersonal,
    handleSubmit: handleSubmitPersonal,
    formState: { errors: errorsPersonal, isSubmitting: isSubmittingPersonal },
    control: controlPersonal,
    reset: resetPersonal,
    setError: setErrorPersonal,
  } = useForm({
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      birth_day: "",
      education_level: "",
    },
  });

  // React Hook Form para Contraseña
  const {
    register: registerPassword,
    handleSubmit: handleSubmitPassword,
    formState: { errors: errorsPassword, isSubmitting: isSubmittingPassword },
    reset: resetPassword,
    setError: setErrorPassword,
  } = useForm();

  // React Hook Form para Preferencias
  const {
    register: registerPreferences,
    handleSubmit: handleSubmitPreferences,
    formState: { isSubmitting: isSubmittingPreferences },
  } = useForm({
    defaultValues: {
      notifications_email: true,
      notifications_push: false,
      language: "es",
      theme: "light",
    },
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        setError(null);

        if (user?.role_id === 3) {
          const res = await getStudentProfile();
          setProfile(res.data);
          setUserType("student");

          // ✅ Asegurarnos que el valor del select coincida EXACTAMENTE
          resetPersonal({
            first_name: res.data.first_name || "",
            last_name: res.data.last_name || "",
            email: res.data.email || "",
            birth_day: res.data.birth_day?.split("T")[0] || "",
            education_level: res.data.education_level || "", // Debe coincidir con value de opciones
          });
        } else if (user?.role_id === 1) {
          const res = await getAdminProfile();
          setProfile(res.data);
          setUserType("admin");

          resetPersonal({
            email: res.data.email || "",
          });
        }
      } catch (err) {
        setError("Error al cargar el perfil.");
        console.error("Error fetching profile:", err);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchProfile();
    }
  }, [user, resetPersonal]);

  const onSubmitPersonalInfo = async (data) => {
    setFeedback({ text: "", type: "" });

    try {
      await updatePersonalInfo(data);

      // ✅ Actualizar perfil local
      const updatedProfile = {
        ...profile,
        ...data,
        full_name: `${data.first_name} ${data.last_name}`,
      };
      setProfile(updatedProfile);

      // ✅ CRÍTICO: Actualizar el contexto de autenticación
      if (updateUser) {
        updateUser(updatedProfile);
      }

      // ✅ Actualizar formulario
      resetPersonal(data);

      setFeedback({
        text: "✅ Información actualizada correctamente",
        type: "success",
      });

      setTimeout(() => setFeedback({ text: "", type: "" }), 3000);
    } catch (error) {
      console.error("Error updating personal info:", error);

      if (Array.isArray(error.response?.data)) {
        error.response.data.forEach((err) => {
          setErrorPersonal(err.path, {
            type: "manual",
            message: err.message,
          });
        });
      }
    }
  };

  const onSubmitPassword = async (data) => {
    setFeedback({ text: "", type: "" });

    if (data.new_password !== data.confirm_password) {
      setErrorPassword("confirm_password", {
        type: "manual",
        message: "Las contraseñas no coinciden",
      });
      return;
    }

    try {
      await changePassword({
        current_password: data.current_password,
        new_password: data.new_password,
      });

      setFeedback({
        text: "✅ Contraseña actualizada correctamente",
        type: "success",
      });
      resetPassword();
      setTimeout(() => setFeedback({ text: "", type: "" }), 3000);
    } catch (error) {
      console.error("Error changing password:", error);

      if (Array.isArray(error.response?.data)) {
        error.response.data.forEach((err) => {
          setErrorPassword(err.path, {
            type: "manual",
            message: err.message,
          });
        });
      }
    }
  };

  const onSubmitPreferences = async (data) => {
    setFeedback({ text: "", type: "" });

    try {
      await updatePreferences(data);
      setFeedback({
        text: "✅ Preferencias actualizadas correctamente",
        type: "success",
      });
      setTimeout(() => setFeedback({ text: "", type: "" }), 3000);
    } catch (error) {
      console.error("Error updating preferences:", error);
      setFeedback({
        text: "Error al actualizar las preferencias",
        type: "error",
      });
      setTimeout(() => setFeedback({ text: "", type: "" }), 5000);
    }
  };

  const handleDeactivateAccount = async () => {
    try {
      await deactivateAccount();
      setShowDeactivateModal(false); // ✅ Cerrar modal
      setFeedback({
        text: "✅ Cuenta desactivada correctamente",
        type: "success",
      });
      setTimeout(async () => {
        await logout();
        navigate("/login");
      }, 1500);
    } catch (error) {
      console.error("Error deactivating account:", error);
      setShowDeactivateModal(false);
      setFeedback({
        text: "Error al desactivar la cuenta",
        type: "error",
      });
      setTimeout(() => setFeedback({ text: "", type: "" }), 5000);
    }
  };

  const tabs = [
    { id: "personal", label: "Información Personal", icon: "👤" },
    { id: "security", label: "Seguridad", icon: "🔒" },
    { id: "preferences", label: "Preferencias", icon: "⚙️" },
  ];

  const educationOptions = [
    { value: "primaria", label: "Primaria" },
    { value: "secundaria", label: "Secundaria" },
    { value: "bachillerato", label: "Bachillerato" },
    { value: "universidad", label: "Universidad" },
    { value: "otro", label: "Otro" },
  ];

  if (loading) {
    return (
      <div className="container mx-auto p-4 flex justify-center items-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando configuración...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-4 max-w-2xl mt-8">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
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

  const minDateStr = minDate();

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Configuración</h1>
            <p className="text-gray-600 mt-1">Gestiona tu cuenta y preferencias</p>
          </div>
          <button
            onClick={() => navigate("/home")}
            className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium py-2 px-4 rounded-lg transition-colors flex items-center space-x-2 cursor-pointer"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span>Volver</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="border-b border-gray-200">
          <nav className="flex -mb-px">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  setFeedback({ text: "", type: "" });
                }}
                className={`flex-1 py-4 px-6 text-center font-medium text-sm transition-colors cursor-pointer ${
                  activeTab === tab.id
                    ? "border-b-2 border-blue-500 text-blue-600 bg-blue-50"
                    : "text-gray-600 hover:text-gray-800 hover:bg-gray-50"
                }`}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {/* Mensaje de feedback */}
          {feedback.text && feedback.type === "success" && (
            <div className="mb-6 p-4 rounded-lg text-sm font-medium bg-green-100 text-green-700 border border-green-200">
              {feedback.text}
            </div>
          )}

          {feedback.text && feedback.type === "error" && (
            <div className="mb-6 p-4 rounded-lg text-sm font-medium bg-red-100 text-red-700 border border-red-200">
              {feedback.text}
            </div>
          )}

          {/* Resumen de errores */}
          {activeTab === "personal" && (
            <ErrorSummary errors={errorsPersonal} fieldLabels={fieldLabels} />
          )}
          {activeTab === "security" && (
            <ErrorSummary errors={errorsPassword} fieldLabels={fieldLabels} />
          )}

          {/* Formularios modulares */}
          {activeTab === "personal" && (
            <PersonalInfoForm
              userType={userType}
              register={registerPersonal}
              control={controlPersonal}
              errors={errorsPersonal}
              isSubmitting={isSubmittingPersonal}
              onSubmit={handleSubmitPersonal(onSubmitPersonalInfo)}
              onCancel={() => navigate("/profile")}
              educationOptions={educationOptions}
              minDateStr={minDateStr}
            />
          )}

          {activeTab === "security" && (
            <SecurityForm
              register={registerPassword}
              errors={errorsPassword}
              isSubmitting={isSubmittingPassword}
              onSubmit={handleSubmitPassword(onSubmitPassword)}
              onCancel={() => resetPassword()}
            />
          )}

          {activeTab === "preferences" && (
            <PreferencesForm
              register={registerPreferences}
              isSubmitting={isSubmittingPreferences}
              onSubmit={handleSubmitPreferences(onSubmitPreferences)}
              onCancel={() => navigate("/profile")}
            />
          )}
        </div>
      </div>

      {/* Zona de peligro */}
      <div className="mt-8 bg-red-50 border border-red-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-red-800 mb-4">Zona de Peligro</h3>
        <div className="space-y-3">
          <p className="text-sm text-red-700">
            Estas acciones son permanentes y no se pueden deshacer.
          </p>
          <button
            onClick={() => setShowDeactivateModal(true)} // ✅ Abrir modal
            className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-lg transition-colors cursor-pointer"
          >
            Desactivar Cuenta
          </button>
        </div>
      </div>

      {/* ✅ Modal de confirmación */}
      <ConfirmModal
        isOpen={showDeactivateModal}
        onClose={() => setShowDeactivateModal(false)}
        onConfirm={handleDeactivateAccount}
        title="¿Desactivar tu cuenta?"
        message="Esta acción marcará tu cuenta como inactiva y cerrarás sesión. Esta acción no se puede deshacer."
        confirmText="Sí, desactivar"
        cancelText="Cancelar"
        type="danger"
      />
    </div>
  );
}

export default SettingsPage;
