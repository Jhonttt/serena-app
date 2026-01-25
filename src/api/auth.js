import axios from "axios";

const API = "http://localhost:4000/auth"; 

export const registerRequest = user => axios.post(`${API}/register`, user);