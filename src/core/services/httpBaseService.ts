import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { DirectResponse, PaginatedResponse } from '../types/pagination.type';

const axiosInstance = axios.create({
  // baseURL: 'https://your-api-url.com', // Optionally set a base URL
  // ...other default configs
});

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
    return Promise.reject(error);
  }
);

export const httpBaseService = {
  get<T = any>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<DirectResponse<T> | PaginatedResponse<T>>> {
    return axiosInstance.get<DirectResponse<T> | PaginatedResponse<T>>(url, config);
  },

  post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<DirectResponse<T>>> {
    return axiosInstance.post<DirectResponse<T>>(url, data, config);
  },

  put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<DirectResponse<T>>> {
    return axiosInstance.put<DirectResponse<T>>(url, data, config);
  }
};
