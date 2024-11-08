<template>
  <div class="flex">
    <!-- Sidebar -->
    <CompanySidebar />

    <!-- Content -->
    <div class="flex-1 p-8 min-h-screen bg-gray-100">
      <h1 class="text-3xl font-bold mb-4">Company Dashboard</h1>
      <p class="text-lg text-gray-700">Welcome, Company user!</p>
    </div>
  </div>
</template>

<script>
import CompanySidebar from '../components/CompanySidebar.vue';

export default {
  components: {
    CompanySidebar,
  },
};
</script>

<style scoped>
</style>
