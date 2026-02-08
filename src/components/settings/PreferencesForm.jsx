export function PreferencesForm({
  register,
  isSubmitting,
  onSubmit,
  onCancel,
}) {
  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        Preferencias de la Aplicación
      </h2>

      {/* Notificaciones */}
      <div className="space-y-4">
        <h3 className="font-medium text-gray-900">Notificaciones</h3>

        <div className="flex items-center justify-between py-3 border-b border-gray-200">
          <div>
            <p className="font-medium text-gray-700">
              Notificaciones por Email
            </p>
            <p className="text-sm text-gray-500">
              Recibe actualizaciones por correo electrónico
            </p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              {...register("notifications_email")}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-2px after:left-2px after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        </div>
      </div>

      {/* Idioma */}
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-gray-700">Idioma</label>
        <select
          {...register("language")}
          className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
        >
          <option value="es">Español</option>
          <option value="en">English</option>
          <option value="ca">Català</option>
        </select>
      </div>

      {/* Tema */}
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-gray-700">
          Tema de la Aplicación
        </label>
        <select
          {...register("theme")}
          className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
        >
          <option value="light">Claro</option>
          <option value="dark">Oscuro</option>
          <option value="auto">Automático</option>
        </select>
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
          {isSubmitting ? "Guardando..." : "Guardar Preferencias"}
        </button>
      </div>
    </form>
  );
}