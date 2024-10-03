// src/store/modules/auth.js
import apiClient from '../../services/api';
export default {
    namespaced: true,  // Add this line to declare it as namespaced
    state: {
      token: localStorage.getItem('token') || null,
      refreshToken: localStorage.getItem('refreshToken') || null,
      isAuthenticated: !!localStorage.getItem('token'),
      role: null,
    },
    mutations: {
      SET_TOKEN(state, { token, refreshToken }) {
        state.token = token;
        state.refreshToken = refreshToken;
        state.isAuthenticated = true;
        localStorage.setItem('token', token);
        localStorage.setItem('refreshToken', refreshToken);
      },
      SET_ROLE(state, role) {
        state.role = role;
      },
      CLEAR_AUTH(state) {
        state.token = null;
        state.refreshToken = null;
        state.isAuthenticated = false;
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
      },
    },
    actions: {
      async login({ commit }, phoneNumber) {
        try {
          const response = await apiClient.post('/otp/login/', { phone_number: phoneNumber });
          return response.status === 200;
        } catch (error) {
          throw new Error('Login failed \n Please try again');
        }
      },
      async verifyOtp({ commit }, otp) {
        try {
          const response = await apiClient.post('/otp/verify/', { otp_key: otp });
          console.log(response.data);
          const { access, refresh } = response.data;
          commit('SET_TOKEN', { token: access, refreshToken: refresh });
          await dispatch('fetchUserRole');
        } catch (error) {
          throw new Error('OTP verification failed');
        }
      },
      async fetchUserRole({ commit }) {
        try {
          const response = await apiClient.get('/users/user-type/');
          commit('SET_ROLE', response.data.user_type);
        } catch (error) {
          throw new Error('Failed to fetch user role');
        }
      },
      async refreshToken({ commit, state }) {
        try {
          const response = await apiClient.post('/otp/token/refresh/', { refresh_token: state.refreshToken });
          commit('SET_TOKEN', { token: response.data.access_token, refreshToken: state.refresh_token });
        } catch (error) {
          commit('CLEAR_AUTH');
        }
      },
      logout({ commit }) {
        commit('CLEAR_AUTH');
      },
    },
    getters: {
      isAuthenticated: state => state.isAuthenticated,
      token: state => state.token,
      userRole: state => state.role,
    },
  };
  