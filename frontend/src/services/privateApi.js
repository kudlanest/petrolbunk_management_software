import axios from "axios";

const privateApi = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

// Add JWT to every protected request
privateApi.interceptors.request.use((config) => {

    const token = localStorage.getItem("accessToken");

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

// Handle expired token
privateApi.interceptors.response.use(

    (response) => response,

    (error) => {

        if (error.response?.status === 401) {

            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");
            localStorage.removeItem("user");

            window.location.href = "/login";
        }

        return Promise.reject(error);
    }

);

export default privateApi;