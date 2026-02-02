export function FormRegisterInput({ label, name, type = "text", register, rules, errors, placeholder, errorMessage, inputProps = {}}) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-medium text-gray-700">{label}</label>

      <input
        type={type}
        placeholder={placeholder}
        {...register(name, rules)}
        {...inputProps}
        className="border border-gray-300 rounded-lg px-3 py-2"
      />

      {errors?.[name] && <p className="text-red-500 text-sm">{errorMessage}</p>}
    </div>
  );
}
