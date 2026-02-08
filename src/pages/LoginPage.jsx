import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { FormLoginInput } from "../components/ui";

function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { signin, isAuthenticated, errors: loginErrors } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) navigate("/home");
  }, [isAuthenticated]);

  const fieldLabels = {
    first_name: "Nombre",
    last_name: "Apellido",
    email: "Correo Electrónico",
    birth_day: "Fecha de Nacimiento",
    education_level: "Nivel Educativo",
    current_password: "Contraseña Actual",
    new_password: "Nueva Contraseña",
    confirm_password: "Confirmar Contraseña",
  };

  const onSubmit = handleSubmit((values) => signin(values));

  return (
    <div className="flex items-center justify-center h-[calc(100vh-64px)] bg-gray-100 px-4 w-full overflow-x-hidden">
      <div className="bg-white w-full max-w-lg p-12 rounded-2xl shadow-lg">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          Iniciar sesión
        </h1>
        {Array.isArray(loginErrors) &&
          loginErrors.map((error, i) => (
            <div key={i}>
              <p className="text-red-500 text-base">{error}</p>
            </div>
          ))}
        <form onSubmit={onSubmit} className="flex flex-col gap-6">
          <FormLoginInput
            label="Email:"
            name="email"
            type="email"
            register={register}
            rules={{ required: true }}
            errors={errors}
            placeholder="correo@ejemplo.com"
            errorMessage="El email es obligatorio"
          />

          <FormLoginInput
            label="Contraseña:"
            name="password"
            type="password"
            register={register}
            rules={{ required: true }}
            errors={errors}
            placeholder="••••••••"
            errorMessage="La contraseña es obligatoria"
          />
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg py-3 text-lg transition w-full"
          >
            Iniciar sesión
          </button>
        </form>
        <p className="mt-6 text-base text-center text-gray-600">
          ¿No tienes una cuenta?{" "}
          <Link to="/register" className="text-blue-600 hover:underline">
            Regístrate
          </Link>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
