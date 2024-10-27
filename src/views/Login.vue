<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100">
    <div class="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
      <h2 class="text-3xl font-bold text-center text-gray-800 mb-6">Login</h2>
      <form @submit.prevent="onSubmit">
        <div class="mb-4">
          <label for="phone" class="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
          <input
            type="tel"
            id="phone"
            v-model="phoneNumber"
            class="w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            :disabled="loading"
            required
          />
        </div>
        <div v-if="otpRequested" class="mb-4">
          <label for="otp" class="block text-sm font-medium text-gray-700 mb-1">Enter OTP</label>
          <input
            type="text"
            id="otp"
            v-model="otp"
            maxlength="6"
            class="w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            :disabled="loading"
            required
          />
        </div>
        <div class="mt-6 text-center">
          <button
            type="submit"
            class="w-full px-4 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
            :disabled="loading"
          >
            {{ otpRequested ? 'Verify OTP' : 'Request OTP' }}
            <span v-if="loading" class="spinner-border spinner-border-sm ml-2" role="status"></span>
          </button>
        </div>
      </form>
      <p v-if="error" class="text-center text-red-600 mt-4">{{ error }}</p>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  data() {
    return {
      phoneNumber: '',
      otp: '',
      otpRequested: false,
      error: null,
      loading: false,
    };
  },
  methods: {
    ...mapActions('auth', ['login', 'verifyOtp']),
    async onSubmit() {
      this.loading = true;
      this.error = null;
      try {
        if (!this.otpRequested) {
          await this.login(this.phoneNumber);
          this.otpRequested = true;
        } else {
          await this.verifyOtp(this.otp);
        }
        this.$router.push(`/`);
      } catch (error) {
        this.error = error.message || 'An error occurred';
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<style scoped>
.spinner-border {
  border: 2px solid currentColor;
  border-top-color: transparent;
  border-radius: 50%;
  width: 1rem;
  height: 1rem;
  animation: spin 0.75s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
