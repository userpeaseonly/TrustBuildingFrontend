<template>
    <div class="flex">
        <!-- Sidebar -->
        <StaffSidebar />
        
        <!-- Main Content Area -->
        <div class="container mx-auto mt-10 p-6 bg-white shadow-md rounded-lg w-full max-w-5xl">
            <h2 class="text-3xl font-bold mb-6 text-center">{{ $t('message.manage_terminated_contracts') }}</h2>

            <!-- Loading Spinner -->
            <div v-if="loadingContracts" class="flex justify-center items-center my-10">
                <div class="animate-spin h-12 w-12 border-4 border-blue-500 border-t-transparent rounded-full"></div>
            </div>

            <!-- Error Message -->
            <div v-else-if="errorContracts" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded text-center mb-6">
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
import apiClient from '@/services/api'; // Assuming Axios is setup
import StaffSidebar from '@/components/StaffSidebar.vue'; // Include the sidebar
import TerminateContractCard from '@/components/TerminateContractCard.vue'; // Include the reusable contract card

// Data for Contracts
const contracts = ref([]);
const loadingContracts = ref(true);
const errorContracts = ref(null);

// Fetch Contracts
const fetchContracts = async () => {
    try {
        const response = await apiClient.get('/contracts/staff/contracts/terminate/list');
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
/* No additional custom styles needed as Tailwind CSS classes handle the styling effectively */
</style>
