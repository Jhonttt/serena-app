import { useForm } from "react-hook-form"
import { useAuth } from "../context/AuthContext"
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function LoginPage() {
  const { register, handleSubmit, formState: { errors } } = useForm()
  const { signin, isAuthenticated, errors: loginErrors } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (isAuthenticated) navigate("/profile");
  }, [isAuthenticated])
  
  const onSubmit = handleSubmit(values => {
    signin(values);
  });
  
  return (
    <div className="flex items-center justify-center h-[calc(100vh-64px)] bg-gray-100 px-4 w-full overflow-x-hidden">
      <div className="bg-white w-full max-w-lg p-12 rounded-2xl shadow-lg">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          Iniciar sesión
        </h1>
        {
          Array.isArray(loginErrors) && loginErrors.map((error, i) => (
            <div key={i}>
              <p className="text-red-500 text-base">{error}</p>
            </div>
          ))
        }
        <form
          onSubmit={onSubmit}
          className="flex flex-col gap-6"
        >
          <div className="flex flex-col gap-2">
            <label className="text-base font-medium text-gray-700">
              Email:
            </label>
            <input
              type="email"
              {...register("email", { required: true })}
              className="border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full text-base"
              placeholder="correo@ejemplo.com"
            />
            {errors.email && (<p className="text-red-500 text-base">El email es obligatorio</p>)}
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-base font-medium text-gray-700">
              Contraseña:
            </label>
            <input
              type="password"
              {...register("password", { required: true })}
              className="border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full text-base"
              placeholder="••••••••"
            />
            {errors.password && (<p className="text-red-500 text-base">La contraseña es obligatoria</p>)}
          </div>
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg py-3 text-lg transition w-full"
          >
            Iniciar sesión
          </button>
        </form>
        <p className="mt-6 text-base text-center text-gray-600">
          ¿No tienes una cuenta? <Link to="/register" className="text-blue-600 hover:underline">Regístrate</Link>
        </p>
      </div>
    </div>
  )
}

export default LoginPage
