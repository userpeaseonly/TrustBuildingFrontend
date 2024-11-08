<template>
    <div class="flex">
      <!-- Sidebar -->
      <CompanySidebar />
  
      <!-- Main content area -->
      <div class="flex-1 p-8 min-h-screen bg-gray-100">
        <h2 class="text-3xl font-semibold text-center mb-8">Manage Buildings</h2>
  
        <!-- Loading Spinner -->
        <div v-if="loading" class="flex justify-center items-center h-52">
          <div class="w-12 h-12 border-4 border-gray-200 border-t-blue-500 rounded-full animate-spin" role="status">
            <span class="sr-only">Loading...</span>
          </div>
        </div>
  
        <!-- Error Message -->
        <div v-else-if="error" class="bg-red-500 text-white text-center py-4 rounded mb-6">
          {{ error }}
        </div>
  
        <!-- Buildings List -->
        <div v-else>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div v-for="building in buildings" :key="building.id">
              <BuildingCard :building="building" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import apiClient from '@/services/api';
  import BuildingCard from '@/components/BuildingCard.vue'; // Import the BuildingCard component
  import CompanySidebar from '@/components/CompanySidebar.vue';
  
  const buildings = ref([]);
  const loading = ref(true);
  const error = ref(null);
  
  const fetchBuildings = async () => {
    try {
      const response = await apiClient.get('/buildings/');
      buildings.value = response.data;
    } catch (err) {
      error.value = 'Failed to fetch buildings.';
      console.error(err);
    } finally {
      loading.value = false;
    }
  };
  
  onMounted(() => {
    fetchBuildings();
  });
  </script>
  
  <style scoped>
  .spinner-border {
    width: 3rem;
    height: 3rem;
  }
  </style>
  