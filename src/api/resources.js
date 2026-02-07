import axios from "./axios";

// Traer todos los recursos
export const getResourcesRequest = () => axios.get("/resources");

// Crear un recurso
export const createResourceRequest = (resource) =>
  axios.post("/resources", resource, { withCredentials: true });

// Obtener un recurso por ID
export const getResourceByIdRequest = (id) => 
  axios.get(`/resources/${id}`);

// Actualizar un recurso
export const updateResourceRequest = (id, resource) =>
  axios.put(`/resources/${id}`, resource, { withCredentials: true });

// Eliminar un recurso
export const deleteResourceRequest = (id) =>
  axios.delete(`/resources/${id}`, { withCredentials: true });