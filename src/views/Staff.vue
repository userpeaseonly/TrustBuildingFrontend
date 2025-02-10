<template>
  <div class="flex h-screen">
    <!-- Sidebar -->
    <StaffSidebar />

    <!-- Content -->
    <div class="flex-1 p-8 bg-gray-50">
      <div class="bg-white shadow-md rounded-lg p-6 max-w-3xl mx-auto text-center">
        <h1 class="text-3xl font-semibold text-indigo-600">{{ $t('message.dashboard') }}</h1>
        <p class="text-gray-700 text-lg mt-4">{{ $t('message.welcome_staff') }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import StaffSidebar from '../components/StaffSidebar.vue';

export default {
  components: {
    StaffSidebar,
  },
};
</script>

<style scoped>
/* Additional custom styling can go here */
</style>
