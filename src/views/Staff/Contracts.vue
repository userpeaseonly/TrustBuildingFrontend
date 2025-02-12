<template>
    <div class="flex">
        <!-- Sidebar -->
        <StaffSidebar />
        <!-- Main Content Area -->
        <div class="flex-1 container mx-auto mt-8 p-6 bg-white shadow rounded-lg">
            <h2 class="text-2xl font-bold text-center mb-8">{{ $t('message.manage_contract') }}</h2>

            <div class="flex justify-center mb-6">
                <RouterLink to="/staff/contracts/create" class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    {{ $t('message.create_contract') }}
                </RouterLink>
            </div>

            <div v-if="loadingContracts" class="flex justify-center my-10">
                <div class="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
            <div v-else-if="errorContracts" class="text-red-500 text-center my-5">
                {{ errorContracts }}
            </div>
            <div v-else>
                <div class="grid gap-6 md:grid-cols-2">
                    <ContractCard v-for="contract in contracts" :key="contract.id" :contract="contract" />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import apiClient from '@/services/api'; // Assuming Axios is setup
import StaffSidebar from '@/components/StaffSidebar.vue'; // Include the sidebar
import ContractCard from '@/components/ContractCard.vue'; // Include the reusable contract card

// Data for Contracts
const contracts = ref([]);
const loadingContracts = ref(true);
const errorContracts = ref(null);

// Fetch Contracts
const fetchContracts = async () => {
    try {
        const response = await apiClient.get('/contracts/staff/contracts/');
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
</style>
