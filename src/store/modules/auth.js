// src/store/modules/auth.js
import apiClient from '../../services/api';

export default {
    namespaced: true,
    state: {
        token: localStorage.getItem('token') || null,
        refreshToken: localStorage.getItem('refreshToken') || null,
        isAuthenticated: !!localStorage.getItem('token'),
        role: localStorage.getItem('role') || null, // Load role from localStorage
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
            localStorage.setItem('role', role); // Persist role in localStorage
        },
        CLEAR_AUTH(state) {
            state.token = null;
            state.refreshToken = null;
            state.isAuthenticated = false;
            state.role = null;
            localStorage.removeItem('token');
            localStorage.removeItem('refreshToken');
            localStorage.removeItem('role');
        },
    },
    actions: {
        async login({ commit }, phoneNumber) {
            try {
                const response = await apiClient.post('/otp/login/', { phone_number: phoneNumber });
                return response.status === 200;
            } catch (error) {
                throw new Error('Login failed. Please try again.');
            }
        },
        async verifyOtp({ commit, dispatch }, otp) {
            try {
                const response = await apiClient.post('/otp/verify/', { otp_key: otp });
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
                if (response.data && response.data.user_type) {
                    commit('SET_ROLE', response.data.user_type);
                } else {
                    throw new Error('User role data is invalid');
                }
            } catch (error) {
                throw new Error('Failed to fetch user role');
            }
        },
        async refreshToken({ commit, state }) {
            try {
                const response = await apiClient.post('/otp/token/refresh/', { refresh_token: state.refreshToken });
                commit('SET_TOKEN', { token: response.data.access_token, refreshToken: response.data.refresh_token });
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
