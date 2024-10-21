<!-- src/views/BuildingDetails.vue -->
<template>
    <div class="d-flex">
        <!-- Sidebar -->
        <StaffSidebar v-if="isStaff" />
        <CompanySidebar v-else />

        <!-- Main Content Area -->
        <div class="container mt-5" style="flex: 1;">
            <!-- Back to Buildings Button -->
            <div class="d-flex justify-content-end mb-3">
                <RouterLink to="/staff/buildings" class="btn btn-outline-secondary">
                    <i class="bi bi-arrow-left"></i> Back to Buildings
                </RouterLink>
            </div>

            <!-- Check if building data is loaded -->
            <div v-if="loading" class="d-flex justify-content-center align-items-center" style="height: 150px;">
                <div class="spinner-border" role="status">
                    <span class="sr-only">Loading...</span>
                </div>
            </div>
            <div v-else-if="error" class="alert alert-danger text-center">
                {{ error }}
            </div>

            <!-- Building Details -->
            <div v-else-if="building">
                <div class="building-header mb-4">
                    <h2 class="display-6">Building {{ building.building_number }}</h2>
                    <p class="lead">{{ building.address }}</p>
                </div>

                <!-- Building Details Card -->
                <div class="mb-5">
                    <div class="card shadow-sm border-light">
                        <div class="card-body">
                            <h4 class="card-title mb-4">Building Details</h4>
                            <div class="d-flex flex-wrap justify-content-between">
                                <div>
                                    <p><i class="bi bi-geo-alt"></i> <strong>Block Number:</strong> {{
                                        building.block_number }}</p>
                                    <p><i class="bi bi-layers"></i> <strong>Floors:</strong> {{ building.floor_count }}
                                    </p>
                                    <p><i class="bi bi-door-open"></i> <strong>Entrances:</strong> {{
                                        building.entrance_count }}</p>
                                    <p><i class="bi bi-building"></i> <strong>Total Apartments:</strong> {{
                                        building.apartment_count }}</p>
                                </div>
                                <div>
                                    <p><i class="bi bi-person"></i> <strong>Staff Assigned:</strong> {{
                                        building.staff_details.first_name }} {{ building.staff_details.last_name }}</p>
                                    <p><i class="bi bi-phone"></i> <strong>Staff Phone:</strong> {{
                                        building.staff_details.user.phone_number }}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Apartments List Header -->
                <h4 class="mb-4">Apartments</h4>

                <!-- Loading Apartments -->
                <div v-if="loadingApartments" class="d-flex justify-content-center align-items-center"
                    style="height: 150px;">
                    <div class="spinner-border" role="status">
                        <span class="sr-only">Loading...</span>
                    </div>
                </div>
                <div v-else-if="apartmentError" class="alert alert-danger text-center">
                    {{ apartmentError }}
                </div>

                <!-- Apartments List -->
                <div v-else>
                    <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
                        <div class="col" v-for="apartment in apartments" :key="apartment.id">
                            <div class="apartment-card card shadow-sm border-light h-100">
                                <div class="card-body">
                                    <h5 class="card-title mb-3">Apartment {{ apartment.apartment_number }}</h5>
                                    <ul class="list-unstyled">
                                        <li><i class="bi bi-building"></i> <strong>Floor:</strong> {{
                                            apartment.floor_number }}</li>
                                        <li><i class="bi bi-door-closed"></i> <strong>Entrance:</strong> {{
                                            apartment.building_entrance }}</li>
                                        <li><i class="bi bi-door-open"></i> <strong>Living Rooms:</strong> {{
                                            apartment.living_room_count }}</li>
                                        <li><i class="bi bi-square"></i> <strong>Total Area:</strong> {{
                                            apartment.total_area }} m²</li>
                                        <li><i class="bi bi-square-half"></i> <strong>Living Area:</strong> {{
                                            apartment.living_area }} m²</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Add New Apartment Form -->
                <div v-if="isStaff">
                    <AddApartmentForm :buildingId="building.id" @apartmentAdded="fetchApartments" />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import apiClient from '@/services/api';
import StaffSidebar from '@/components/StaffSidebar.vue'; // Add the sidebar
import CompanySidebar from '@/components/CompanySidebar.vue';
import AddApartmentForm from '@/components/AddApartmentForm.vue'; // Import the AddApartmentForm component
import store from '@/store';
import { computed } from 'vue';

// Get route params
const route = useRoute();
const buildingId = route.params.building_id;

// State variables
const building = ref(null);
const apartments = ref([]);
const loading = ref(true);
const loadingApartments = ref(true);
const error = ref(null);
const apartmentError = ref(null);
const userRole = computed(() => store.getters['auth/userRole']);
const isStaff = computed(() => userRole.value === 'staff');

// Fetch building details
const fetchBuildingDetails = async () => {
    try {
        console.log(isStaff);
        const response = await apiClient.get(`/buildings/${buildingId}`);
        building.value = response.data;
    } catch (err) {
        error.value = 'Failed to fetch building details.';
    } finally {
        loading.value = false;
    }
};

// Fetch apartments
const fetchApartments = async () => {
    try {
        const response = await apiClient.get(`/buildings/${buildingId}/apartments`);
        apartments.value = response.data;
    } catch (err) {
        apartmentError.value = 'Failed to fetch apartments.';
    } finally {
        loadingApartments.value = false;
    }
};

// Fetch both building and apartments on mount
onMounted(() => {
    fetchBuildingDetails();
    fetchApartments();
});
</script>
