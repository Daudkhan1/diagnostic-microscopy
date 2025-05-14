// axiosInstance.js
import axios from "axios";

const API = axios.create({
    // Set the base URL for your API
    baseURL: import.meta.env.VITE_BASE_URL,
    // You might want to add default headers here if needed, e.g.,
    // headers: { 'Content-Type': 'application/json' }
});

// Optional: Interceptor for logging or adding auth tokens, etc.
API.interceptors.request.use(
    (config) => {
        console.log("API Request Sent:", config.method.toUpperCase(), config.url, config.data ? 'with data' : '');
        // If sending JSON explicitly (though Axios often handles it)
        // if (config.method === 'post' || config.method === 'put') {
        //     config.headers['Content-Type'] = 'application/json';
        // }
        return config;
    },
    (error) => {
        console.error("API Request Error:", error);
        return Promise.reject(error);
    }
);

// Optional: Interceptor for handling responses
API.interceptors.response.use(
    (response) => {
        console.log("API Response Received:", response.status, response.data);
        return response; // Important: return the response
    },
    (error) => {
        console.error("API Response Error:", error.response?.status, error.response?.data || error.message);
        return Promise.reject(error); // Important: re-reject the error
    }
);


export default API;
