<!-- src/views/Home.vue -->
<template>
  <div class="container mt-5">
    <h1>Welcome, Authenticated User!</h1>
    <p>You are now logged in.</p>
    <RouterLink to="/staff" class="btn btn-primary mr-2">Go to Your Dashboard</RouterLink>&nbsp;
    <button class="btn btn-danger" @click="logout">Logout</button>
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