<!-- src/App.vue -->
<script setup>
import { RouterView } from 'vue-router';
import Sidebar from './components/Sidebar.vue';
</script>

<template>
  <div class="app-container d-flex">
    <!-- Sidebar -->
    <Sidebar />

    <!-- Router View -->
    <div class="content-container">
      <RouterView />
    </div>
  </div>
</template>

<style scoped>
.app-container {
  display: flex;
  height: 100vh;
}
.content-container {
  flex: 1;
  padding: 20px;
}
</style>
