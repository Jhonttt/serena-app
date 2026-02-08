import { FormRegisterInput } from "../ui";

export function SecurityForm({
  register,
  errors,
  isSubmitting,
  onSubmit,
  onCancel,
}) {
  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        Cambiar Contraseña
      </h2>

      <FormRegisterInput
        label="Contraseña Actual"
        name="current_password"
        type="password"
        register={register}
        rules={{ required: true }}
        errors={errors}
        placeholder="••••••••"
        errorMessage="La contraseña actual es obligatoria"
      />

      <FormRegisterInput
        label="Nueva Contraseña"
        name="new_password"
        type="password"
        register={register}
        rules={{ required: true }}
        errors={errors}
        placeholder="••••••••"
        errorMessage="La nueva contraseña es obligatoria"
      />

      <FormRegisterInput
        label="Confirmar Nueva Contraseña"
        name="confirm_password"
        type="password"
        register={register}
        rules={{ required: true }}
        errors={errors}
        placeholder="••••••••"
        errorMessage="Debes confirmar la contraseña"
      />

      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <div className="flex items-start">
          <svg
            className="w-5 h-5 text-yellow-600 mt-0.5 mr-3"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
          <p className="text-sm text-yellow-800">
            Cambiar tu contraseña cerrará todas tus sesiones activas en otros
            dispositivos.
          </p>
        </div>
      </div>

      <div className="flex justify-end space-x-3 pt-4">
        <button
          type="button"
          onClick={onCancel}
          disabled={isSubmitting}
          className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50 cursor-pointer"
        >
          Cancelar
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-medium disabled:bg-gray-400 disabled:cursor-not-allowed cursor-pointer"
        >
          {isSubmitting ? "Cambiando..." : "Cambiar Contraseña"}
        </button>
      </div>
    </form>
  );
}