import { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';

export function requestInterceptor(config: AxiosRequestConfig) {
  const token = localStorage.getItem('authToken');
  if (token) {
    if (config.headers) {
      if (typeof config.headers.set === 'function') {
        config.headers.set('Authorization', `Bearer ${token}`);
      } else {
        config.headers['Authorization'] = `Bearer ${token}`;
      }
    }
  }
  return config;
}

export function responseInterceptor(response: AxiosResponse) {
  return response;
}

export function errorInterceptor(error: AxiosError) {
  if (error.response?.status === 401) {
    localStorage.removeItem('authToken');
    window.location.href = '/login';
  }
  return Promise.reject(error);
}
