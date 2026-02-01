import axios from "./axios";

export const registerRequest = user => axios.post(`/register`, user);
export const loginRequest = user => axios.post(`/login`, user);
export const verityTokenRequest = () => axios.get(`/verify`);


export const getStudentProfile = async () => {
  return await axios.get('http://localhost:4000/api/student', {
    withCredentials: true, // esto es importante si usas cookies
  });
};
