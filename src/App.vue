<!-- src/App.vue -->
<script setup>
import { RouterView } from 'vue-router';
import { computed } from 'vue';
import { useStore } from 'vuex';
import StaffSidebar from './components/StaffSidebar.vue';

const store = useStore();
const role = computed(() => store.getters['auth/role']); // Retrieve user role from Vuex

</script>

<template>
  <div class="app-container d-flex">
    <!-- Sidebar -->
    <StaffSidebar v-if="role === 'staff'" />

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
