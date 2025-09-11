import axios, { type AxiosRequestConfig, type AxiosInstance } from 'axios';

import { setInterceptor } from '@/core/services/api-interceptor';

const axiosInstance: AxiosInstance = axios.create({
  // baseURL: 'https://your-api-url.com', // Optionally set a base URL
  // ...other default configs
});

setInterceptor(axiosInstance);

function get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
  return axiosInstance.get<T>(url, config) as Promise<T>;
}


function post<T, D = unknown>(url: string, data?: D, config?: AxiosRequestConfig): Promise<T> {
  return axiosInstance.post<T>(url, data, config) as Promise<T>;
}


function put<T, D = unknown>(url: string, data?: D, config?: AxiosRequestConfig): Promise<T> {
  return axiosInstance.put<T>(url, data, config) as Promise<T>;
}


function patch<T, D = unknown>(url: string, data?: D, config?: AxiosRequestConfig): Promise<T> {
  return axiosInstance.patch<T>(url, data, config) as Promise<T>;
}


function del<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
  return axiosInstance.delete<T>(url, config) as Promise<T>;
}

export default {
  get,
  post,
  put,
  patch,
  del
};