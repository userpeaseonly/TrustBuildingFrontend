// src/services/api.js
import axios from 'axios';
import store from '../store';
import router from '../router';

const apiClient = axios.create({
  baseURL: 'http://0.0.0.0:8020/api',
});

// Attach token to requests
apiClient.interceptors.request.use(config => {
  const token = store.getters['auth/token'];
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});

// Handle token expiration
apiClient.interceptors.response.use(
  response => response,
  async error => {
    if (error.response.status === 401 && store.getters['auth/refreshToken']) {
      await store.dispatch('auth/refreshToken');
      return apiClient.request(error.config);
    }
    if (error.response.status === 401) {
      store.dispatch('auth/logout');
      router.push('/login');
    }
    return Promise.reject(error);
  }
);

export default apiClient;
