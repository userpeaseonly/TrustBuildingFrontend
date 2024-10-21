<!-- src/views/Login.vue -->
<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <h2 class="text-center">Login</h2>
        <form @submit.prevent="onSubmit">
          <div class="form-group">
            <label for="phone">Phone Number</label>
            <input
              type="tel"
              id="phone"
              v-model="phoneNumber"
              class="form-control"
              required
              :disabled="loading"
            />
          </div>
          <div v-if="otpRequested" class="form-group mt-3">
            <label for="otp">Enter OTP</label>
            <input
              type="text"
              id="otp"
              v-model="otp"
              maxlength="6"
              class="form-control"
              required
              :disabled="loading"
            />
          </div>
          <div class="text-center mt-4">
            <button
              type="submit"
              class="btn btn-primary"
              :disabled="loading"
            >
              {{ otpRequested ? 'Verify OTP' : 'Request OTP' }}
              <span v-if="loading" class="spinner-border spinner-border-sm" role="status"></span>
            </button>
          </div>
        </form>
        <p v-if="error" class="text-danger mt-3">{{ error }}</p>
      </div>
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
      } catch (error) {
        console.log('error', error);
        this.error = error || 'An error occurred';
      } finally {
        this.loading = false;
      }
      this.$router.push(`/`);
    },
  },
};
</script>
