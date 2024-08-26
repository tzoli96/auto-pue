import apiClient from '../api/apiClient';

class AuthService {
  async login(email: string, password: string) {
    const response = await apiClient.post('/auth/login', { email, password });
    const token = response.data.token;
    localStorage.setItem('authToken', token);
    return token;
  }

  async logout() {
    localStorage.removeItem('authToken');
  }

  async getCurrentUser() {
    const response = await apiClient.get('/auth/me');
    return response.data;
  }

  isAuthenticated() {
    const token = localStorage.getItem('authToken');
    return !!token;
  }

}

export default new AuthService();
