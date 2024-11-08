<template>
    <div class="flex">
      <!-- Sidebar -->
      <CompanySidebar />
  
      <!-- Main Content Area -->
      <div class="flex-1 p-8 min-h-screen bg-gray-100">
        <h2 class="text-3xl font-semibold text-center mb-8">Company Staff</h2>
        
  
        <!-- Loading Spinner -->
        <div v-if="loadingStaff" class="flex justify-center items-center my-20">
          <div class="w-12 h-12 border-4 border-gray-200 border-t-blue-500 rounded-full animate-spin" role="status">
            <span class="sr-only">Loading...</span>
          </div>
        </div>
  
        <!-- Error Message -->
        <div v-else-if="errorStaff" class="bg-red-500 text-white text-center py-4 rounded mb-6">
          {{ errorStaff }}
        </div>
  
        <!-- Staff List -->
        <div v-else>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <StaffCard v-for="staff in staffList" :key="staff.id" :staff="staff" />
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import apiClient from '@/services/api';
  import CompanySidebar from '@/components/CompanySidebar.vue';
  import StaffCard from '@/components/StaffCard.vue';  // Import the StaffCard component
  
  const staffList = ref([]);
  const loadingStaff = ref(true);
  const errorStaff = ref(null);
  
  // Fetch staff list
  const fetchStaffList = async () => {
      try {
          const response = await apiClient.get('/users/staff/');
          staffList.value = response.data;
      } catch (error) {
          errorStaff.value = 'Failed to fetch staff list.';
      } finally {
          loadingStaff.value = false;
      }
  };
  
  onMounted(() => {
      fetchStaffList();
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
  