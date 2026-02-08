import { FormRegisterInput, FormRegisterSelect } from "../ui";

export function PersonalInfoForm({
  userType,
  register,
  control,
  errors,
  isSubmitting,
  onSubmit,
  onCancel,
  educationOptions,
  minDateStr,
}) {
  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        Información Personal
      </h2>

      {userType === "student" && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormRegisterInput
              label="Nombre"
              name="first_name"
              register={register}
              rules={{ required: true }}
              errors={errors}
              placeholder="Pablo"
              errorMessage="El nombre es obligatorio"
            />

            <FormRegisterInput
              label="Apellido"
              name="last_name"
              register={register}
              rules={{ required: true }}
              errors={errors}
              placeholder="Tu apellido"
              errorMessage="El apellido es obligatorio"
            />
          </div>

          <FormRegisterSelect
            label="Nivel Educativo"
            name="education_level"
            control={control}
            rules={{ required: true }}
            errors={errors}
            options={educationOptions}
            placeholder="Selecciona un nivel"
            errorMessage="El nivel educativo es obligatorio"
          />

          <FormRegisterInput
            label="Fecha de Nacimiento"
            name="birth_day"
            type="date"
            register={register}
            rules={{ required: true }}
            errors={errors}
            inputProps={{
              max: new Date().toISOString().split("T")[0],
              min: minDateStr,
            }}
            errorMessage="La fecha de nacimiento es obligatoria"
          />
        </>
      )}

      <FormRegisterInput
        label="Correo Electrónico"
        name="email"
        type="email"
        register={register}
        rules={{ required: true }}
        errors={errors}
        placeholder="tu@email.com"
        errorMessage="El email es obligatorio"
      />

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
          {isSubmitting ? "Guardando..." : "Guardar Cambios"}
        </button>
      </div>
    </form>
  );
}
