import { useForm } from "react-hook-form"
import { useAuth } from "../context/AuthContext"
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";


function RegisterPage() {
  const { register, handleSubmit, formState: { errors } } = useForm()
  const { signup, isAuthenticated, errors: registerErrors } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) navigate("/profile");
  }, [isAuthenticated])

  const onSubmit = handleSubmit(values => {
    signup(values);
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white w-full max-w-md p-8 rounded-2xl shadow-lg">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Registro
        </h1>
        {
          registerErrors.map((error, i) => (
            <div key={i}>
              <p className="text-red-500 text-sm">{error}</p>
            </div>
          ))
        }
        <form
          onSubmit={onSubmit}
          className="flex flex-col gap-5"
        >
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">
              Email:
            </label>
            <input
              type="email"
              {...register("email", { required: true })}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="correo@ejemplo.com"
            />
            {errors.email && (<p className="text-red-500 text-sm">El email es obligatorio</p>)}
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">
              Contraseña:
            </label>
            <input
              type="password"
              {...register("password", { required: true })}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="••••••••"
            />
            {errors.password && (<p className="text-red-500 text-sm">La contraseña es obligatoria</p>)}
          </div>

          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg py-2 transition"
          >
            Registrarse
          </button>
        </form>
      </div>
    </div>
  )
}

export default RegisterPage
