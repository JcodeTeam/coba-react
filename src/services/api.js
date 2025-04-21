import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:5000/api", 
    headers: { "Content-Type": "application/json" },
    withCredentials: true
});

// Tambahkan interceptor untuk menambahkan token ke setiap request
api.interceptors.request.use(
    (config) => {
        // Ambil token dari localStorage
        const token = localStorage.getItem("auth_token");
        if (token) {
            // Menambahkan token ke header Authorization
            config.headers["Authorization"] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default api;
