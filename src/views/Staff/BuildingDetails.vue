<template>
    <div class="flex h-screen">
        <!-- Sidebar -->
        <StaffSidebar v-if="isStaff" />
        <CompanySidebar v-else />

        <!-- Main Content Area -->
        <div class="flex-1 p-8 bg-gray-50">
            <!-- Back to Buildings Button -->
            <div class="flex justify-end mb-6">
                <RouterLink
                    to="/staff/buildings"
                    class="flex items-center px-4 py-2 text-sm font-medium text-gray-600 bg-gray-200 rounded hover:bg-gray-300 transition-all shadow-sm"
                >
                    <i class="bi bi-arrow-left mr-2"></i> Back to Buildings
                </RouterLink>
            </div>

            <!-- Loading State -->
            <div v-if="loading" class="flex justify-center items-center h-40">
                <div class="animate-spin rounded-full h-12 w-12 border-t-4 border-indigo-500"></div>
            </div>

            <!-- Error State -->
            <div v-else-if="error" class="text-red-600 bg-red-100 rounded p-4 text-center shadow">
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
                <div class="bg-white rounded-lg shadow-lg p-8 mb-8 border border-gray-200">
                    <h3 class="text-2xl font-semibold text-gray-800 mb-4">Building Details</h3>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <p><i class="bi bi-geo-alt mr-2"></i> <strong>Block Number:</strong> {{ building.block_number }}</p>
                            <p><i class="bi bi-layers mr-2"></i> <strong>Floors:</strong> {{ building.floor_count }}</p>
                            <p><i class="bi bi-door-open mr-2"></i> <strong>Entrances:</strong> {{ building.entrance_count }}</p>
                            <p><i class="bi bi-building mr-2"></i> <strong>Total Apartments:</strong> {{ building.apartment_count }}</p>
                        </div>
                        <div>
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

                <div v-else-if="apartmentError" class="text-red-600 bg-red-100 rounded p-4 text-center shadow">
                    {{ apartmentError }}
                </div>

                <!-- Apartments Table -->
                <div v-else class="overflow-hidden rounded-lg shadow-lg border border-gray-200 bg-white">
                    <table class="min-w-full border-collapse bg-white">
                        <thead>
                            <tr class="bg-indigo-600 text-white text-left">
                                <th class="px-6 py-4 text-sm font-semibold">Apartment Number</th>
                                <th class="px-6 py-4 text-sm font-semibold">Floor</th>
                                <th class="px-6 py-4 text-sm font-semibold">Entrance</th>
                                <th class="px-6 py-4 text-sm font-semibold">Living Rooms</th>
                                <th class="px-6 py-4 text-sm font-semibold">Total Area (m²)</th>
                                <th class="px-6 py-4 text-sm font-semibold">Living Area (m²)</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr
                                v-for="apartment in apartments"
                                :key="apartment.id"
                                class="hover:bg-gray-100 transition-all"
                            >
                                <td class="px-6 py-4 text-gray-700">{{ apartment.apartment_number }}</td>
                                <td class="px-6 py-4 text-gray-700">{{ apartment.floor_number }}</td>
                                <td class="px-6 py-4 text-gray-700">{{ apartment.building_entrance }}</td>
                                <td class="px-6 py-4 text-gray-700">{{ apartment.living_room_count }}</td>
                                <td class="px-6 py-4 text-gray-700">{{ apartment.total_area }}</td>
                                <td class="px-6 py-4 text-gray-700">{{ apartment.living_area }}</td>
                            </tr>
                        </tbody>
                    </table>
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
