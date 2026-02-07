import axios from "./axios";

// Traer todos los recursos
export const getResourcesRequest = () => axios.get("/resources");

// Crear un recurso (opcional si luego quieres subir desde el front)
export const createResourceRequest = (resource) =>
  axios.post("/resources", resource, { withCredentials: true });
