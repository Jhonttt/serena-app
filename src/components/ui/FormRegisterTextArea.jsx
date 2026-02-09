export function FormRegisterTextArea({
  label,
  name,
  register,
  rules,
  errors,
  placeholder,
  errorMessage,
  maxLength = 150,
  rows = 4,
}) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-medium text-gray-700">{label}

      <textarea
        placeholder={placeholder}
        {...register(name, rules)}
        rows={rows}
        maxLength={maxLength}
        className={`border border-gray-300 rounded-lg px-3 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 w-full
        }`}
        // border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full text-base
      />
      </label>

      {errors?.[name] && (
        <p className="text-red-500 text-sm">
          {errorMessage || "Campo requerido"}
        </p>
      )}
    </div>
  );
}
