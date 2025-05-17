import axios from "axios";
const API_URL = import.meta.env.VITE_URL;
console.log("URL de l'API:", import.meta.env.VITE_URL);
const api = axios.create({
  baseURL: API_URL,
  withCredentials: true, // Pour les cookies d'authentification
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

interface TokenProps {
  token: string;
}

interface TokenProps {
  token: string;
}

export function setAuthToken({ token }: TokenProps) {
  if (token) {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    localStorage.setItem("authToken", token);
    console.log("Token défini:", token); // Debug
  } else {
    delete api.defaults.headers.common["Authorization"];
    localStorage.removeItem("authToken");
    console.log("Token supprimé"); // Debug
  }
}

api.interceptors.response.use(
  (response) => {
    console.log("Réponse reçue:", response); // Debug
    return response;
  },
  (error) => {
    console.error("Erreur interceptée:", error); // Debug
    if (error.response?.status === 401) {
      localStorage.removeItem("authToken");
      window.location.href = "/login";
    }
    return Promise.reject(error); // Important pour propager l'erreur
  }
);
// export function setAuthToken({ token }: TokenProps) {
//   if (token) {
//     api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
//   } else {
//     delete api.defaults.headers.common["Authorization"];
//   }
// }

export default api;
