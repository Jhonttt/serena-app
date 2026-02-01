import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { useEffect, useState, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";

function RegisterPage() {
  const {
    register,
    handleSubmit,
    watch,
    setFocus,
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

  // Fecha mínima permitida (120 años atrás)
  const minBirthDate = new Date();
  minBirthDate.setFullYear(minBirthDate.getFullYear() - 110);
  const minDateStr = minBirthDate.toISOString().split("T")[0];

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
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">Nombre</label>
            <input
              type="text"
              {...register("first_name", { required: true })}
              placeholder="Juan"
              className="border border-gray-300 rounded-lg px-3 py-2"
            />
            {errors.first_name && (
              <p className="text-red-500 text-sm">El nombre es obligatorio</p>
            )}
          </div>

          {/* Apellido */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">
              Apellidos
            </label>
            <input
              type="text"
              {...register("last_name", { required: true })}
              placeholder="Pérez García"
              className="border border-gray-300 rounded-lg px-3 py-2"
            />
            {errors.last_name && (
              <p className="text-red-500 text-sm">
                Los apellidos son obligatorios
              </p>
            )}
          </div>

          {/* Fecha nacimiento */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">
              Fecha de nacimiento
            </label>
            <input
              type="date"
              max={new Date().toISOString().split("T")[0]}
              min={minDateStr}
              {...register("birth_day", { required: true })}
              className="border border-gray-300 rounded-lg px-3 py-2"
            />
            {errors.birth_day && (
              <p className="text-red-500 text-sm">La fecha es obligatoria</p>
            )}
          </div>

          {/* Nivel educativo */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">
              Nivel educativo
            </label>
            <input
              type="text"
              {...register("education_level", { required: true })}
              placeholder="Ej: Secundaria, Universidad"
              className="border border-gray-300 rounded-lg px-3 py-2"
            />
            {errors.education_level && (
              <p className="text-red-500 text-sm">
                El nivel educativo es obligatorio
              </p>
            )}
          </div>
          {/* Email */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              {...register("email", { required: true })}
              placeholder="correo@ejemplo.com"
              className="border border-gray-300 rounded-lg px-3 py-2"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">El email es obligatorio</p>
            )}
          </div>
          {/* Contraseña */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">
              Contraseña
            </label>
            <input
              type="password"
              {...register("password", { required: true })}
              placeholder="••••••••"
              className="border border-gray-300 rounded-lg px-3 py-2"
            />
            {errors.password && (
              <p className="text-red-500 text-sm">Contraseña obligatoria</p>
            )}
          </div>

          {/* Campos tutor SOLO si menor */}
          {mostrarTutor && (
            <>
              <h2 className="text-lg font-semibold mt-4">Datos del tutor</h2>

              {/* Nombre del tutor completo */}
              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-gray-700">
                  Nombre completo
                </label>
                <input
                  type="text"
                  placeholder="Luis Garcia Lopez"
                  {...register("full_name", { required: mostrarTutor })}
                  className="border border-gray-300 rounded-lg px-3 py-2"
                />
                {errors.full_name && (
                  <p className="text-red-500 text-sm">
                    Nombre del tutor obligatorio
                  </p>
                )}
              </div>
              {/* Contraseña */}
              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-gray-700">
                  Teléfono
                </label>
                <input
                  type="text"
                  placeholder="Teléfono"
                  {...register("phone", { required: mostrarTutor })}
                  className="border border-gray-300 rounded-lg px-3 py-2"
                />
                {errors.phone && (
                  <p className="text-red-500 text-sm">Teléfono obligatorio</p>
                )}
              </div>
              {/* Contraseña */}
              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-gray-700">
                  Parentesco
                </label>
                <input
                  type="text"
                  placeholder="Parentesco"
                  {...register("relationship", { required: mostrarTutor })}
                  className="border border-gray-300 rounded-lg px-3 py-2"
                />
                {errors.relationship && (
                  <p className="text-red-500 text-sm">Parentesco obligatorio</p>
                )}
              </div>
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
