export function FormRegisterTextArea({ 
  label, 
  name, 
  register, 
  rules, 
  errors, 
  placeholder, 
  errorMessage,
  maxLength = 150,
  rows = 4 
}) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-medium text-gray-700">{label}</label>

      <textarea
        placeholder={placeholder}
        {...register(name, rules)}
        rows={rows}
        maxLength={maxLength}
        className={`border rounded-lg px-3 py-2 resize-none focus:outline-none focus:ring-1 focus:ring-blue-500 ${
          errors?.[name] ? "border-red-500" : "border-gray-300"
        }`}
      />

      {errors?.[name] && (
        <p className="text-red-500 text-sm">{errorMessage || "Campo requerido"}</p>
      )}
    </div>
  );
}