import api from '../../services/api';

const authService = {
  async register(email, password) {
    const response = await api.post('/auth/register', { email, password });
    return response.data; // { token, user }
  },

  async login(email, password) {
    const response = await api.post('/auth/login', { email, password });
    return response.data; // { token, user }
  },

  saveSession(token, user) {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
  },

  clearSession() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  getToken() {
    return localStorage.getItem('token');
  },

  getCurrentUser() {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },
};

export default authService;
