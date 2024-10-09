<template>
    <div class="d-flex">
        <!-- Sidebar -->
        <CompanySidebar />

        <!-- Main Content Area -->
        <div class="container mt-5" style="flex: 1;">
            <h2 class="mb-4 text-center">Manage Contracts</h2>

            <div>
                <RouterLink to="/staff/contracts/create" class="btn btn-primary mb-3">Create Contract</RouterLink>
            </div>

            <div v-if="loadingContracts" class="text-center my-5">
                <div class="spinner-border" role="status">
                    <span class="sr-only">Loading...</span>
                </div>
            </div>
            <div v-else-if="errorContracts" class="alert alert-danger text-center">
                {{ errorContracts }}
            </div>
            <div v-else>
                <div class="row row-cols-1 row-cols-md-2 g-4">
                    <div class="col" v-for="contract in contracts" :key="contract.id">
                        <ContractCard :contract="contract" />
                    </div>
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

.spinner-border {
    width: 3rem;
    height: 3rem;
}

.alert {
    font-size: 1rem;
}

.card {
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.card-title {
    font-size: 1.25rem;
    font-weight: bold;
}

.text-muted {
    color: #6c757d;
}
</style>