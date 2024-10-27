<template>
    <div class="flex h-screen">
        <!-- Sidebar -->
        <StaffSidebar v-if="isStaff" />
        <CompanySidebar v-else />

        <!-- Main Content Area -->
        <div class="flex-1 p-8 bg-gray-100">
            <!-- Back to Buildings Button -->
            <div class="flex justify-end mb-6">
                <RouterLink to="/staff/buildings" class="flex items-center px-4 py-2 text-sm font-medium text-gray-600 bg-gray-200 rounded hover:bg-gray-300 transition-all">
                    <i class="bi bi-arrow-left mr-2"></i> Back to Buildings
                </RouterLink>
            </div>

            <!-- Loading State -->
            <div v-if="loading" class="flex justify-center items-center h-40">
                <div class="animate-spin rounded-full h-12 w-12 border-t-4 border-indigo-500"></div>
            </div>

            <!-- Error State -->
            <div v-else-if="error" class="text-red-600 bg-red-100 rounded p-4 text-center">
                {{ error }}
            </div>

            <!-- Building Details -->
            <div v-else>
                <!-- Header Section -->
                <div class="mb-8">
                    <h2 class="text-4xl font-extrabold text-indigo-800 mb-2">Building {{ building.building_number }}</h2>
                    <p class="text-lg text-gray-600">{{ building.address }}</p>
                </div>

                <!-- Building Details Card -->
                <div class="bg-white rounded-lg shadow-md p-8 mb-8">
                    <h3 class="text-2xl font-semibold text-gray-800 mb-4">Building Details</h3>
                    <div class="flex justify-between flex-wrap">
                        <div class="w-full lg:w-1/2 mb-4">
                            <p><i class="bi bi-geo-alt mr-2"></i> <strong>Block Number:</strong> {{ building.block_number }}</p>
                            <p><i class="bi bi-layers mr-2"></i> <strong>Floors:</strong> {{ building.floor_count }}</p>
                            <p><i class="bi bi-door-open mr-2"></i> <strong>Entrances:</strong> {{ building.entrance_count }}</p>
                            <p><i class="bi bi-building mr-2"></i> <strong>Total Apartments:</strong> {{ building.apartment_count }}</p>
                        </div>
                        <div class="w-full lg:w-1/2 mb-4">
                            <p><i class="bi bi-person mr-2"></i> <strong>Staff Assigned:</strong> {{ building.staff_details.first_name }} {{ building.staff_details.last_name }}</p>
                            <p><i class="bi bi-phone mr-2"></i> <strong>Staff Phone:</strong> {{ building.staff_details.user.phone_number }}</p>
                        </div>
                    </div>
                </div>

                <!-- Apartments List Header -->
                <h3 class="text-2xl font-semibold text-gray-800 mb-6">Apartments</h3>

                <!-- Loading Apartments -->
                <div v-if="loadingApartments" class="flex justify-center items-center h-40">
                    <div class="animate-spin rounded-full h-12 w-12 border-t-4 border-indigo-500"></div>
                </div>
                
                <div v-else-if="apartmentError" class="text-red-600 bg-red-100 rounded p-4 text-center">
                    {{ apartmentError }}
                </div>

                <!-- Apartments List -->
                <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div v-for="apartment in apartments" :key="apartment.id" class="bg-white rounded-lg shadow-md p-6">
                        <h4 class="text-xl font-semibold text-gray-800 mb-4">Apartment {{ apartment.apartment_number }}</h4>
                        <ul class="text-gray-700 space-y-2">
                            <li><i class="bi bi-building mr-2"></i> <strong>Floor:</strong> {{ apartment.floor_number }}</li>
                            <li><i class="bi bi-door-closed mr-2"></i> <strong>Entrance:</strong> {{ apartment.building_entrance }}</li>
                            <li><i class="bi bi-door-open mr-2"></i> <strong>Living Rooms:</strong> {{ apartment.living_room_count }}</li>
                            <li><i class="bi bi-square mr-2"></i> <strong>Total Area:</strong> {{ apartment.total_area }} m²</li>
                            <li><i class="bi bi-square-half mr-2"></i> <strong>Living Area:</strong> {{ apartment.living_area }} m²</li>
                        </ul>
                    </div>
                </div>

                <!-- Add New Apartment Form (Staff Only) -->
                <div v-if="isStaff" class="mt-10">
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
import StaffSidebar from '@/components/StaffSidebar.vue';
import CompanySidebar from '@/components/CompanySidebar.vue';
import AddApartmentForm from '@/components/AddApartmentForm.vue';
import store from '@/store';
import { computed } from 'vue';

const route = useRoute();
const buildingId = route.params.building_id;

const building = ref(null);
const apartments = ref([]);
const loading = ref(true);
const loadingApartments = ref(true);
const error = ref(null);
const apartmentError = ref(null);
const userRole = computed(() => store.getters['auth/userRole']);
const isStaff = computed(() => userRole.value === 'staff');

const fetchBuildingDetails = async () => {
    try {
        const response = await apiClient.get(`/buildings/${buildingId}`);
        building.value = response.data;
    } catch (err) {
        error.value = 'Failed to fetch building details.';
    } finally {
        loading.value = false;
    }
};

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

onMounted(() => {
    fetchBuildingDetails();
    fetchApartments();
});
</script>

<style scoped>
.bi {
    font-size: 1.25rem;
    color: #4a5568; /* Tailwind's gray-700 */
}

.card {
    border-radius: 0.75rem;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
</style>
