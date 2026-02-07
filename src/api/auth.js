import axios from "./axios";

export const registerRequest = user => axios.post('/register', user);
export const loginRequest = user => axios.post('/login', user);
export const verifyTokenRequest = () => axios.get('/verify');
export const logoutRequest = () => axios.post('/logout');

export const getStudentProfile = async () => {
  return await axios.get('/student', {
    withCredentials: true,
  });
};

export const getAdminProfile = async () => {
  return await axios.get('/admin', {
    withCredentials: true,
  });
};

export const getUserEmail = async (userId) => {
  return await axios.get(`/user/${userId}`, {
    withCredentials: true,
  });
};

export const getStudentHome = async () => {
  return await axios.get("/home", {
    withCredentials: true,
  });
};
