export function FormLoginInput({
  label,
  name,
  type = "text",
  register,
  rules,
  errors,
  placeholder,
  errorMessage,
}) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-base font-medium text-gray-700">
        {label}

        <input
          type={type}
          {...register(name, rules)}
          placeholder={placeholder}
          className="border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full text-base"
        />
      </label>

      {errors?.[name] && (
        <p className="text-red-500 text-base">{errorMessage}</p>
      )}
    </div>
  );
}
