<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100">
    <div class="bg-white p-8 rounded-lg shadow-lg text-center">
      <h1 class="text-3xl font-bold text-indigo-700 mb-4">Welcome, Authenticated User!</h1>
      <p class="text-gray-600 mb-6">You are now logged in.</p>
      <div class="flex justify-center space-x-4">
        <RouterLink
          to="/staff"
          class="inline-flex items-center px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all"
        >
          Go to Your Dashboard
        </RouterLink>
        <button
          class="inline-flex items-center px-6 py-2 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-all"
          @click="logout"
        >
          Logout
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { RouterLink } from 'vue-router';
import { mapActions } from 'vuex';

export default {
  methods: {
    ...mapActions('auth', ['logout']),
  },
};
</script>

<style scoped>
</style>
