<!-- src/views/ManageCustomers.vue -->
<template>
<div class="d-flex">
    <!-- Sidebar -->
    <StaffSidebar />

    <!-- Main Content Area -->
    <div class="container mt-5" style="flex: 1;">
    <h2 class="mb-4 text-center">Manage Customers</h2>
    
    <div class="row">
        <!-- My Customers Section -->
        <div class="col-md-6">
        <h4 class="mb-3">My Customers</h4>
        <div v-if="loadingMyCustomers" class="text-center my-5">
            <div class="spinner-border" role="status">
            <span class="sr-only">Loading...</span>
            </div>
        </div>
        <div v-else-if="errorMyCustomers" class="alert alert-danger text-center">{{ errorMyCustomers }}</div>
        <div v-else>
            <div class="row row-cols-1 g-4">
            <div class="col" v-for="customer in myCustomers" :key="customer.id">
                <CustomerCard :customer="customer" />
            </div>
            </div>
        </div>
        </div>

        <!-- All Customers Section -->
        <div class="col-md-6">
        <h4 class="mb-3">All Customers</h4>
        <div v-if="loadingAllCustomers" class="text-center my-5">
            <div class="spinner-border" role="status">
            <span class="sr-only">Loading...</span>
            </div>
        </div>
        <div v-else-if="errorAllCustomers" class="alert alert-danger text-center">{{ errorAllCustomers }}</div>
        <div v-else>
            <div class="row row-cols-1 g-4">
            <div class="col" v-for="customer in allCustomers" :key="customer.id">
                <AllCustomerCard :customer="customer" />
            </div>
            </div>
        </div>
        </div>
    </div>
    </div>
</div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import apiClient from '@/services/api'; // Assuming Axios is setup
import StaffSidebar from '@/components/StaffSidebar.vue'; // Include the sidebar
import CustomerCard from '@/components/CustomerCard.vue';
import AllCustomerCard from '@/components/AllCustomerCard.vue';

const myCustomers = ref([]);
const allCustomers = ref([]);
const loadingMyCustomers = ref(true);
const loadingAllCustomers = ref(true);
const errorMyCustomers = ref(null);
const errorAllCustomers = ref(null);

// Fetch My Customers
const fetchMyCustomers = async () => {
try {
    const response = await apiClient.get('/users/customer/');
    myCustomers.value = response.data;
} catch (error) {
    errorMyCustomers.value = 'Failed to fetch My Customers.';
} finally {
    loadingMyCustomers.value = false;
}
};

// Fetch All Customers
const fetchAllCustomers = async () => {
try {
    const response = await apiClient.get('/users/customer/all/');
    allCustomers.value = response.data;
} catch (error) {
    errorAllCustomers.value = 'Failed to fetch All Customers.';
} finally {
    loadingAllCustomers.value = false;
}
};

onMounted(() => {
fetchMyCustomers();
fetchAllCustomers();
});
</script>

<style scoped>
.container {
max-width: 1200px;
}

h2 {
font-weight: bold;
}

h4 {
font-weight: bold;
color: #007bff;
}

.card {
border-radius: 10px;
box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.card-title {
font-size: 1.25rem;
font-weight: bold;
}
</style>
