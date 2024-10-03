<!-- src/views/Staff/Buildings.vue -->
<template>
<div class="d-flex">
    <!-- Sidebar -->
    <StaffSidebar />
    
    <!-- Main content area -->
    <div class="content-container">
    <h2 class="mb-4">Manage Buildings</h2>

    <!-- Loading Spinner -->
    <div v-if="loading" class="d-flex justify-content-center align-items-center" style="height: 200px;">
        <div class="spinner-border" role="status">
        <span class="sr-only">Loading...</span>
        </div>
    </div>

    <!-- Error Message -->
    <div v-else-if="error" class="alert alert-danger text-center">
        {{ error }}
    </div>

    <!-- Buildings List -->
    <div v-else>
        <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
        <div class="col" v-for="building in buildings" :key="building.id">
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
import StaffSidebar from '@/components/StaffSidebar.vue';

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
.content-container {
flex: 1;
padding: 2rem;
min-height: 100vh; /* Ensure it takes full height of the viewport */
background-color: #f9f9f9; /* Light background for better separation */
}

h2 {
font-weight: 600;
text-align: center;
}

.row-cols-lg-3 .col {
max-width: 33.333%; /* Adjust column width for larger screens */
}

.alert-danger {
padding: 1.5rem;
border-radius: 8px;
}

.spinner-border {
width: 3rem;
height: 3rem;
}
</style>
