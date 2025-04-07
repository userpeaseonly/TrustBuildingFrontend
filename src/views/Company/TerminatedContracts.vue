<template>
  <div class="flex">
      <!-- Sidebar -->
      <CompanySidebar />

      <!-- Main Content Area -->
      <div class="flex-1 p-8 min-h-screen bg-gray-100">
          <h2 class="text-3xl font-semibold text-center mb-8">{{ $t('message.manage_terminated_contracts') }}</h2>

          <!-- Loading Spinner -->
          <div v-if="loadingContracts" class="flex justify-center items-center my-20">
              <div class="w-12 h-12 border-4 border-gray-200 border-t-blue-500 rounded-full animate-spin" role="status">
                  <span class="sr-only">{{ $t('message.loading') }}</span>
              </div>
          </div>

          <!-- Error Message -->
          <div v-else-if="errorContracts" class="bg-red-500 text-white text-center py-4 rounded mb-6">
              {{ errorContracts }}
          </div>

          <!-- Terminated Contracts List -->
          <div v-else>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <TerminateContractCard v-for="contract in contracts" :key="contract.id" :contract="contract" />
              </div>
          </div>
      </div>
  </div>
</template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import apiClient from '@/services/api';
  import CompanySidebar from '@/components/CompanySidebar.vue';
  import TerminateContractCard from '@/components/TerminateContractCard.vue';
  
  // Data for Contracts
  const contracts = ref([]);
  const loadingContracts = ref(true);
  const errorContracts = ref(null);
  
  // Fetch Contracts
  const fetchContracts = async () => {
    try {
      const response = await apiClient.get('/contracts/company/contracts/terminate/list');
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
  h2 {
    font-weight: bold;
  }
  </style>
  