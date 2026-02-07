import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { createResourceRequest } from "../api/resources";
import { FormRegisterInput } from "../components/ui/FormRegisterInput";
import { FormRegisterTextArea } from "../components/ui/FormRegisterTextArea";
import { FormRegisterSelect } from "../components/ui/FormRegisterSelect";

function CreateResource() {
  const navigate = useNavigate();
  const [feedback, setFeedback] = useState({ text: "", type: "" });
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
    reset,
  } = useForm();

  const typeOptions = [
    { value: "Audio", label: "Audio 🎵" },
    { value: "Video", label: "Video 🎥" },
    { value: "Lectura", label: "Lectura 📚" },
  ];

  const onSubmit = async (data) => {
    setFeedback({ text: "", type: "" });
    try {
      const response = await createResourceRequest(data);
      console.log("Recurso creado:", response.data);

      // Mostrar mensaje de éxito
      setFeedback({ text: "¡Recurso creado exitosamente!", type: "success" });

      // Limpiar formulario
      reset();

      // Redirigir a la lista de recursos
      setTimeout(() => {
        navigate("/resources");
      }, 1500);
    } catch (error) {
      console.error("Error al crear recurso:", error);

      let errMsg = "Error al crear el recurso. Intenta nuevamente.";
      // Manejar errores del backend
      if (error.response?.data?.message) {
        // Error único del backend (ej: "Ya existe un recurso con ese título")
        errMsg = error.response.data.message;
      } else if (Array.isArray(error.response?.data)) {
        // Errores de validación de Zod
        error.response.data.forEach((err) => {
          setError(err.path, {
            type: "manual",
            message: err.message,
          });
        });
        errMsg = "Por favor, revisa los campos del formulario.";
      }

      setFeedback({ text: errMsg, type: "error" });
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-10 py-10 rounded-2xl border border-gray-200 mt-9 mb-9 bg-white">
      <h2 className="text-3xl font-semibold text-gray-800 mb-8">
        Crear Nuevo Recurso
      </h2>

      {/* Renderizado condicional del mensaje*/}
      {feedback.text && (
        <div
          className={`mb-6 p-4 rounded-lg text-sm font-medium ${
            feedback.type === "success"
              ? "bg-green-100 text-green-700 border border-green-200"
              : "bg-red-100 text-red-700 border border-red-200"
          }`}
        >
          {feedback.text}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <FormRegisterInput
          label="Título del recurso"
          name="title"
          type="text"
          register={register}
          rules={{
            required: true,
          }}
          errors={errors}
          placeholder="Ej: Introducción a la meditación"
          errorMessage="El título es requerido"
        />

        <FormRegisterTextArea
          label="Descripción"
          name="description"
          register={register}
          rules={{
            required: true,
          }}
          errors={errors}
          placeholder="Describe brevemente el recurso..."
          errorMessage="La descripción es requerida"
          maxLength={255}
          rows={4}
        />

        <FormRegisterInput
          label="URL del recurso"
          name="url"
          type="url"
          register={register}
          rules={{
            required: true,
          }}
          errors={errors}
          placeholder="https://ejemplo.com/recurso"
          errorMessage="La URL es requerida"
        />

        <FormRegisterSelect
          label="Tipo de recurso"
          name="type_resource"
          control={control}
          rules={{
            required: true,
          }}
          errors={errors}
          options={typeOptions}
          placeholder="Selecciona un tipo"
          errorMessage="El tipo de recurso es requerido"
        />

        <div className="flex gap-4 pt-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex-1 bg-blue-500 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
          >
            {isSubmitting ? "Creando..." : "Crear Recurso"}
          </button>

          <button
            type="button"
            onClick={() => navigate("/resources")}
            disabled={isSubmitting}
            className="flex-1 bg-gray-200 text-gray-700 py-3 px-6 rounded-lg font-semibold hover:bg-gray-300 disabled:opacity-50 transition-colors"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateResource;
