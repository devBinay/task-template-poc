import axios, { type AxiosRequestConfig, type AxiosResponse, type AxiosInstance } from 'axios';
import type { DirectResponse, PaginatedResponse } from '@/core/types/pagination.type';
import { setInterceptor } from '@/core/services/api-interceptor';

const axiosInstance: AxiosInstance = axios.create({
  // baseURL: 'https://your-api-url.com', // Optionally set a base URL
  // ...other default configs
});

setInterceptor(axiosInstance);

function get<T>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<DirectResponse<T> | PaginatedResponse<T>>> {
  return axiosInstance.get<DirectResponse<T> | PaginatedResponse<T>>(url, config);
}

function post<T, D = unknown>(url: string, data?: D, config?: AxiosRequestConfig): Promise<AxiosResponse<DirectResponse<T>>> {
  return axiosInstance.post<DirectResponse<T>>(url, data, config);
}

function put<T, D = unknown>(url: string, data?: D, config?: AxiosRequestConfig): Promise<AxiosResponse<DirectResponse<T>>> {
  return axiosInstance.put<DirectResponse<T>>(url, data, config);
}

function patch<T, D = unknown>(url: string, data?: D, config?: AxiosRequestConfig): Promise<AxiosResponse<DirectResponse<T>>> {
  return axiosInstance.patch<DirectResponse<T>>(url, data, config);
}

function del<T>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<DirectResponse<T>>> {
  return axiosInstance.delete<DirectResponse<T>>(url, config);
}

const httpBaseService = {
  get,
  post,
  put,
  patch,
  del
};

export default httpBaseService;