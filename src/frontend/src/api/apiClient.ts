import axios from 'axios';
import { requestInterceptor, responseInterceptor, errorInterceptor } from './interceptors';

const token = localStorage.getItem('authToken');

const apiClient = axios.create({
  baseURL: '/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
  },
});

apiClient.interceptors.request.use(requestInterceptor, error => Promise.reject(error));
apiClient.interceptors.response.use(responseInterceptor, errorInterceptor);

export default apiClient;
