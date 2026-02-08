import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { useEffect, useState, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  FormRegisterInput,
  FormRegisterSelect,
  FormRegisterTextArea,
} from "../components/ui";
import { minDate } from "../utils/minDate";

function RegisterPage() {
  const {
    register,
    handleSubmit,
    watch,
    control,
    setFocus,
    unregister,
    formState: { errors },
  } = useForm();

  const { signup, isAuthenticated, errors: registerErrors } = useAuth();
  const navigate = useNavigate();
  const errorTopRef = useRef(null);

  const [mostrarTutor, setMostrarTutor] = useState(false);

  // observar fecha nacimiento
  const birthDay = watch("birth_day");

  const onError = (formErrors) => {
    const firstField = Object.keys(formErrors)[0];

    setFocus(firstField);

    document
      .querySelector(`[name="${firstField}"]`)
      ?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  // redirección si autenticado
  useEffect(() => {
    if (isAuthenticated) navigate("/home");
  }, [isAuthenticated]);

  // calcular edad SOLO para UI
  useEffect(() => {
    if (!birthDay) return;

    const hoy = new Date();
    const nacimiento = new Date(birthDay);

    let edad = hoy.getFullYear() - nacimiento.getFullYear();
    const mesDiff = hoy.getMonth() - nacimiento.getMonth();

    if (
      mesDiff < 0 ||
      (mesDiff === 0 && hoy.getDate() < nacimiento.getDate())
    ) {
      edad--;
    }

    setMostrarTutor(edad < 18);
  }, [birthDay]);

  useEffect(() => {
    if (registerErrors?.length) {
      errorTopRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [registerErrors]);

  useEffect(() => {
    if (!birthDay) return;

    const hoy = new Date();
    const nacimiento = new Date(birthDay);
    let edad = hoy.getFullYear() - nacimiento.getFullYear();
    const mesDiff = hoy.getMonth() - nacimiento.getMonth();

    if (
      mesDiff < 0 ||
      (mesDiff === 0 && hoy.getDate() < nacimiento.getDate())
    ) {
      edad--;
    }

    const esMenor = edad < 18;
    setMostrarTutor(esMenor);

    // SI NO ES MENOR, eliminamos los campos del registro y sus errores
    if (!esMenor) {
      unregister("full_name");
      unregister("phone");
      unregister("relationship");
    }
  }, [birthDay, unregister]);

  // Fecha mínima permitida (120 años atrás)
  const minDateStr = minDate();

  const onSubmit = handleSubmit((values) => signup(values), onError);

  return (
    <div className="flex justify-center w-full">
      <div className="bg-white w-full max-w-lg p-10 rounded-2xl shadow-lg my-18">
        <div ref={errorTopRef}>
          <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
            Registrarse
          </h1>
        </div>

        {/* Errores de registro */}
        {Array.isArray(registerErrors) &&
          registerErrors.map((error, i) => (
            <p key={i} className="text-red-500 text-sm mb-2">
              {error}
            </p>
          ))}

        <form onSubmit={onSubmit} className="flex flex-col gap-4">
          {/* Nombre */}
          <FormRegisterInput
            label="Nombre"
            name="first_name"
            register={register}
            rules={{ required: true }}
            errors={errors}
            placeholder="Juan"
            errorMessage="El nombre es obligatorio"
          />

          {/* Apellido */}
          <FormRegisterInput
            label="Apellidos"
            name="last_name"
            register={register}
            rules={{ required: true }}
            errors={errors}
            placeholder="Pérez García"
            errorMessage="Los apellidos son obligatorios"
          />

          {/* Fecha nacimiento */}
          <FormRegisterInput
            label="Fecha de nacimiento"
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

          {/* Nivel educativo */}
          <FormRegisterSelect
            label="Nivel educativo"
            name="education_level"
            control={control}
            register={register}
            rules={{ required: true }}
            errors={errors}
            placeholder="Selecciona un nivel educativo"
            errorMessage="El nivel educativo es obligatorio"
            options={[
              { value: "primaria", label: "Primaria" },
              { value: "secundaria", label: "Secundaria" },
              { value: "bachillerato", label: "Bachillerato" },
              { value: "universidad", label: "Universidad" },
              { value: "otro", label: "Otro" },
            ]}
          />

          {/* Email */}
          <FormRegisterInput
            label="Email"
            name="email"
            type="email"
            register={register}
            rules={{ required: true }}
            errors={errors}
            placeholder="correo@ejemplo.com"
            errorMessage="El email es obligatorio"
          />

          {/* Contraseña */}
          <FormRegisterInput
            label="Contraseña"
            name="password"
            type="password"
            register={register}
            rules={{ required: true }}
            errors={errors}
            placeholder="••••••••"
            errorMessage="Contraseña obligatoria"
          />

          <FormRegisterTextArea
            label="Describa el motivo de su consulta o problema (Opcional)"
            name="psychological_issue"
            register={register}
            rules={{ required: false }}
            errors={errors}
            placeholder="Tus datos estarán cifrados y protegidos conforme a la normativa de protección de datos"
          />

          {/* Campos tutor SOLO si menor */}
          {mostrarTutor && (
            <>
              <h2 className="text-lg font-semibold mt-4 text-center">
                Datos del tutor
              </h2>

              {/* Nombre del tutor completo */}
              <FormRegisterInput
                label="Nombre completo"
                name="full_name_tutor"
                register={register}
                rules={{ required: mostrarTutor }}
                errors={errors}
                placeholder="Luis Garcia Lopez"
                errorMessage="Nombre del tutor obligatorio"
              />

              {/* Teléfono */}
              <FormRegisterInput
                label="Teléfono"
                name="phone_tutor"
                type="tel"
                register={register}
                rules={{ required: mostrarTutor }}
                errors={errors}
                placeholder="+34 600 123 456"
                errorMessage="Teléfono obligatorio"
              />

              {/* Parentesco */}
              <FormRegisterSelect
                label="Parentesco"
                name="relationship"
                control={control}
                register={register}
                rules={{ required: mostrarTutor }}
                errors={errors}
                placeholder="Selecciona un parentesco"
                errorMessage="El parentesco es obligatorio"
                options={[
                  { value: "padre", label: "Padre" },
                  { value: "madre", label: "Madre" },
                  { value: "tutor legal", label: "Tutor Legal" },
                  { value: "abuelo", label: "Abuelo/a" },
                  { value: "hermano_mayor", label: "Hermano/a Mayor" },
                  { value: "otro", label: "Otro" },
                ]}
              />

              {/* Email */}
              <FormRegisterInput
                label="Email del tutor"
                name="email_tutor"
                type="email"
                register={register}
                rules={{ required: true }}
                errors={errors}
                placeholder="correo@ejemplo.com"
                errorMessage="El email del tutor es obligatorio"
              />
            </>
          )}

          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg py-3"
          >
            Registrarse
          </button>
        </form>

        <p className="mt-6 text-sm text-center text-gray-600">
          ¿Ya tienes una cuenta?{" "}
          <Link to="/login" className="text-blue-600 hover:underline">
            Inicia sesión
          </Link>
        </p>
      </div>
    </div>
  );
}

export default RegisterPage;
