import axios from "./axios";

// ========== Autenticación ==========
export const registerRequest = (user) => axios.post("/register", user);
export const loginRequest = (user) => axios.post("/login", user);
export const verifyTokenRequest = () => axios.get("/verify");
export const logoutRequest = () => axios.post("/logout");

// ========== Perfiles ==========
export const getStudentProfile = async () => {
  return await axios.get("/student");
};

export const getAdminProfile = async () => {
  return await axios.get("/admin");
};

export const getUserEmail = async (userId) => {
  return await axios.get(`/user/${userId}`);
};


export const getStudentHome = async () => {
  return await axios.get("/home", {
    withCredentials: true,
  });
}

// ========== Settings - Actualizar información ==========

// ✅ Actualizar información personal
export const updatePersonalInfo = async (data) => {
  return await axios.put("/user/update-personal", data);
};

// ✅ Cambiar contraseña
export const changePassword = async (data) => {
  return await axios.put("/user/change-password", data);
};

// ✅ Actualizar preferencias
export const updatePreferences = async (data) => {
  return await axios.put("/user/preferences", data);
};

// ✅ Desactivar cuenta
export const deactivateAccount = async () => {
  return await axios.put("/user/deactivate", {});
};
