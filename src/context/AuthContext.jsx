import { createContext, useState, useContext, useEffect } from "react";
import {
  registerRequest,
  loginRequest,
  verifyTokenRequest,
  logoutRequest,
} from "../api/auth";

export const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [errors, setError] = useState([]);
  const [loading, setLoading] = useState(true); // poner a true?
  const [isAdmin, setIsAdmin] = useState(false);

  const signup = async (userData) => {
    try {
      const res = await registerRequest(userData);
      console.log(res.data);

      const userInfo = res.data.user || res.data;
      setUser(userInfo);
      setIsAuthenticated(true);
    } catch (errors) {
      console.log(errors.response.data);
      setError(errors.response.data);
    }
  };

  const signin = async (userData) => {
    try {
      const res = await loginRequest(userData);
      console.log("Login response: " + JSON.stringify(res.data));

      const userInfo = res.data.user;
      setUser(userInfo);
      setIsAuthenticated(true);

      if (userInfo.role_name === "admin") {
        setIsAdmin(true);
        console.log("User is admin");
      }
    } catch (errors) {
      console.log(errors.response.data);
      setError(errors.response?.data || ["Error en el login"]);
    }
  };

  const logout = async () => {
    try {
      console.log("🚪 Cerrando sesión...");

      // ✅ Llamar al backend para eliminar la cookie
      await logoutRequest();

      // ✅ Limpiar el estado
      setIsAuthenticated(false);
      setUser(null);
      setIsAdmin(false);

      console.log("✅ Sesión cerrada correctamente");
    } catch (error) {
      console.error("❌ Error al cerrar sesión:", error);

      // ✅ Aunque falle el backend, limpiar el estado local
      setIsAuthenticated(false);
      setUser(null);
      setIsAdmin(false);
    }
  };

  useEffect(() => {
    if (errors.length > 0) {
      const timer = setTimeout(() => {
        setError([]);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [errors]);

  useEffect(() => {
    async function checkLogin() {
      try {
        const res = await verifyTokenRequest();

        console.log("Respuesta de verifyToken: " + res.data);

        if (!res.data || res.data.error) {
          setIsAuthenticated(false);
          setLoading(false);
          return;
        }

        const userInfo = res.data;

        console.log("Datos del usuario al verificar:", userInfo);
        setIsAuthenticated(true);
        setUser(userInfo);

        if (userInfo.role_name === "admin") {
          setIsAdmin(true);
          console.log("User is admin");
        }

        setLoading(false);
      } catch (error) {
        // ✅ Si es error 401, es porque no hay sesión (NO mostrar en consola)
        if (error.response?.status === 401) {
          setIsAuthenticated(false);
          setUser(null);
          setIsAdmin(false);
        } else {
          // Solo mostrar errores inesperados (500, network, etc)
          console.error("❌ Error al verificar sesión:", error);
          setIsAuthenticated(false);
          setUser(null);
          setIsAdmin(false);
        }
      } finally {
        // ✅ Siempre finalizar el loading
        setLoading(false);
      }
    }
    checkLogin();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        signup,
        signin,
        logout,
        loading,
        user,
        isAuthenticated,
        errors,
        isAdmin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
