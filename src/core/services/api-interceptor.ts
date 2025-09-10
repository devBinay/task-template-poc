import type { AxiosInstance } from "axios";

export const setInterceptor = (axiosInstance: AxiosInstance) => {

    // Request interceptor to add headers (e.g., Authorization)
    axiosInstance.interceptors.request.use(
      (config) => {
        // Example: Add Authorization header if token exists
        const token = localStorage.getItem('token');
        if (token) {
          config.headers = config.headers || {};
          config.headers['Authorization'] = `Bearer ${token}`;
        }
        // Add other headers as needed
        return config;
      },
      (error) => Promise.reject(error)
    );
    
    // Response interceptor to handle errors globally
    axiosInstance.interceptors.response.use(
      (response) => response,
      (error) => {
        // Example: Handle 401 Unauthorized globally
        if (error.response && error.response.status === 401) {
          // Optionally redirect to login or show a message
          // window.location.href = '/login';
        }
        // Handle other status codes or log errors as needed
        alert("error")
        return Promise.reject(error);
      }
    );
}