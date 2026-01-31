import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

function RegisterPage() {
  const { register, handleSubmit, formState: { errors }, } = useForm();
  const { signup, isAuthenticated, errors: registerErrors } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) navigate("/profile");
  }, [isAuthenticated]);

  const onSubmit = handleSubmit((values) => signup(values));

  return (
    <div className="flex justify-center w-full">
      <div className="bg-white w-full max-w-md p-10 rounded-2xl shadow-lg my-12">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Registrarse
        </h1>

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
              className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
              className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.last_name && (
              <p className="text-red-500 text-sm">Los apellidos son obligatorio</p>
            )}
          </div>

          {/* Email */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              {...register("email", { required: true })}
              placeholder="correo@ejemplo.com"
              className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">El email es obligatorio</p>
            )}
          </div>

          {/* Fecha de nacimiento */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">
              Fecha de nacimiento
            </label>
            <input
              type="date"
              {...register("birth_day", { required: true })}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.birth_day && (
              <p className="text-red-500 text-sm">La fecha de nacimiento es obligatoria</p>
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
              className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.education_level && (
              <p className="text-red-500 text-sm">
                El nivel educativo es obligatorio
              </p>
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
              className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.password && (
              <p className="text-red-500 text-sm">
                La contraseña es obligatoria
              </p>
            )}
          </div>

          {/* Botón */}
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg py-3 text-lg transition-colors"
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
