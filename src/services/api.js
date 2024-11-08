import axios from 'axios';
import store from '../store';
import router from '../router';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_APP_API_BASE_URL || 'https://backend.trust-building.uz/api',
});
let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });

  failedQueue = [];
};

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
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      if (store.getters['auth/refreshToken']) {
        if (isRefreshing) {
          return new Promise(function(resolve, reject) {
            failedQueue.push({ resolve, reject });
          })
            .then(token => {
              originalRequest.headers['Authorization'] = `Bearer ${token}`;
              return apiClient(originalRequest);
            })
            .catch(err => {
              return Promise.reject(err);
            });
        }

        originalRequest._retry = true;
        isRefreshing = true;

        return new Promise(async (resolve, reject) => {
          try {
            await store.dispatch('auth/refreshToken');
            const newToken = store.getters['auth/token'];
            apiClient.defaults.headers['Authorization'] = `Bearer ${newToken}`;
            originalRequest.headers['Authorization'] = `Bearer ${newToken}`;
            processQueue(null, newToken);
            resolve(apiClient(originalRequest));
          } catch (refreshError) {
            processQueue(refreshError, null);
            store.dispatch('auth/logout');
            router.push('/login');
            reject(refreshError);
          } finally {
            isRefreshing = false;
          }
        });
      } else {
        store.dispatch('auth/logout');
        router.push('/login');
      }
    }

    return Promise.reject(error);
  }
);

export default apiClient;
