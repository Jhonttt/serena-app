import { Controller } from "react-hook-form";
import Select from "react-select";

export function FormRegisterSelect({
  label,
  name,
  control,
  rules,
  errors,
  options = [],
  placeholder = "Selecciona una opción",
  errorMessage,
  selectProps = {},
}) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-medium text-gray-700">{label}</label>

      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field }) => {
          const selectedOption =
            options.find((opt) => opt.value === field.value) ?? null;

          return (
            <Select
              {...selectProps}
              name={field.name}
              options={options}
              placeholder={placeholder}
              classNamePrefix="react-select"
              value={selectedOption}
              onChange={(opt) => field.onChange(opt ? opt.value : undefined)}
              onBlur={field.onBlur}
              ref={field.ref}
              styles={{
                control: (provided, state) => ({
                  ...provided,
                  minHeight: "2.5rem",
                  padding: 0,
                  borderRadius: "0.5rem",
                  borderColor: state.isFocused ? "#3b82f6" : "#d1d5db",
                  boxShadow: state.isFocused ? "0 0 0 1px #3b82f6" : "none",
                }),
                valueContainer: (provided) => ({
                  ...provided,
                  padding: "0 0.75rem",
                  height: "2.5rem",
                }),
                input: (provided) => ({ ...provided, margin: 0, padding: 0 }),
                singleValue: (provided) => ({ ...provided, margin: 0 }),
                menu: (provided) => ({ ...provided, borderRadius: 12 }),
                option: (provided) => ({
                  ...provided,
                  padding: "0.5rem 0.75rem",
                }),
              }}
            />
          );
        }}
      />

      {errors?.[name] && <p className="text-red-500 text-sm">{errorMessage}</p>}
    </div>
  );
}
