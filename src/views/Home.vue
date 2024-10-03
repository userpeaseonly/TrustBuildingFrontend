<!-- src/views/Home.vue -->
<template>
    <div class="container mt-5">
      <h1>Welcome, Authenticated User!</h1>
      <button class="btn btn-danger" @click="logout">Logout</button>
    </div>
  </template>
  
  <script>
  import { mapActions } from 'vuex';
  
  export default {
    methods: {
      ...mapActions('auth', ['logout']),
    },
  };
  </script>
  