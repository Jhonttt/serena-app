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
                  minHeight: "38px",
                  height: "38px",
                  borderRadius: "0.5rem",
                  borderColor: state.isFocused ? "#3b82f6" : "#d1d5db",
                  boxShadow: state.isFocused ? "0 0 0 2px #3b82f6" : "none",
                  "&:hover": {
                    borderColor: state.isFocused ? "#3b82f6" : "#d1d5db",
                  },
                }),
                valueContainer: (provided) => ({
                  ...provided,
                  height: "38px",
                  padding: "8px 12px",
                  fontSize: 14,
                }),
                indicatorsContainer: (provided) => ({
                  ...provided,
                  height: "38px",
                }),
                input: (provided) => ({
                  ...provided,
                  margin: 0,
                  padding: 0,
                }),
                singleValue: (provided) => ({
                  ...provided,
                  margin: 0,
                }),
                placeholder: (provided) => ({
                  ...provided,
                  margin: 0,
                  fontSize: 14,
                  color: "#9CA3AF"
                }),
                menu: (provided) => ({
                  ...provided,
                  borderRadius: "0.5rem",
                }),
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