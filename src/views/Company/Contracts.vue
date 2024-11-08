<template>
    <div class="flex">
      <!-- Sidebar -->
      <CompanySidebar />
  
      <!-- Main Content Area -->
      <div class="flex-1 p-8 min-h-screen bg-gray-100">
        <h2 class="text-3xl font-semibold text-center mb-8">Manage Contracts</h2>
  
        <div class="flex justify-end mb-6">
          <RouterLink to="/company/contracts/create" class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
            Create Contract
          </RouterLink>
        </div>
  
        <!-- Loading Spinner -->
        <div v-if="loadingContracts" class="flex justify-center items-center my-20">
          <div class="w-12 h-12 border-4 border-gray-200 border-t-blue-500 rounded-full animate-spin" role="status">
            <span class="sr-only">Loading...</span>
          </div>
        </div>
  
        <!-- Error Message -->
        <div v-else-if="errorContracts" class="bg-red-500 text-white text-center py-4 rounded mb-6">
          {{ errorContracts }}
        </div>
  
        <!-- Contracts List -->
        <div v-else>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ContractCard v-for="contract in contracts" :key="contract.id" :contract="contract" />
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import apiClient from '@/services/api'; // Assuming Axios is setup
  import CompanySidebar from '@/components/CompanySidebar.vue'; // Include the sidebar
  import ContractCard from '@/components/ContractCard.vue'; // Include the reusable contract card
  
  // Data for Contracts
  const contracts = ref([]);
  const loadingContracts = ref(true);
  const errorContracts = ref(null);
  
  // Fetch Contracts
  const fetchContracts = async () => {
      try {
          const response = await apiClient.get('/contracts/company/contracts/');
          contracts.value = response.data;
      } catch (error) {
          errorContracts.value = 'Failed to fetch contracts.';
      } finally {
          loadingContracts.value = false;
      }
  };
  
  onMounted(() => {
      fetchContracts();
  });
  </script>
  
  <style scoped>
  .container {
      max-width: 1200px;
  }
  
  h2 {
      font-weight: bold;
  }
  </style>
  