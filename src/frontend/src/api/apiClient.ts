import axios from 'axios';
import { requestInterceptor, responseInterceptor, errorInterceptor } from './interceptors';

const apiClient = axios.create({
  baseURL: '/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use(requestInterceptor, error => Promise.reject(error));
apiClient.interceptors.response.use(responseInterceptor, errorInterceptor);

export default apiClient;
