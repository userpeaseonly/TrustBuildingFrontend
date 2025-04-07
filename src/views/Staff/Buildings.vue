<template>
    <div class="flex h-screen">
        <!-- Sidebar -->
        <StaffSidebar />

        <!-- Main content area -->
        <div class="content-container flex-1 p-8 bg-gray-50">
            <h2 class="text-2xl font-semibold text-center text-indigo-700 mb-6">{{ $t('message.staff.buildings') }}</h2>

            <!-- Button to open create building form -->
            <button class="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded mb-6"
                @click="openCreateBuildingModal">
                {{ $t('message.create_new_building') }}
            </button>

            <!-- Loading Spinner -->
            <div v-if="loading" class="flex justify-center items-center h-48">
                <div class="animate-spin rounded-full h-12 w-12 border-t-4 border-indigo-500"></div>
            </div>

            <!-- Error Message -->
            <div v-else-if="error" class="text-red-600 bg-red-100 rounded p-4 text-center">
                {{ error }}
            </div>

            <!-- Buildings List -->
            <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <div v-for="building in buildings" :key="building.id">
                    <BuildingCard :building="building" />
                </div>
            </div>

            <!-- Create Building Modal -->
            <CreateBuildingModal v-if="showCreateBuildingModal" @close="closeCreateBuildingModal"
                @buildingCreated="handleBuildingCreated" />
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import apiClient from '@/services/api';
import BuildingCard from '@/components/BuildingCard.vue';
import StaffSidebar from '@/components/StaffSidebar.vue';
import CreateBuildingModal from '@/components/CreateBuildingModal.vue';

const buildings = ref([]);
const loading = ref(true);
const error = ref(null);

const showCreateBuildingModal = ref(false);

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

const openCreateBuildingModal = () => {
    showCreateBuildingModal.value = true;
};

const closeCreateBuildingModal = () => {
    showCreateBuildingModal.value = false;
};

const handleBuildingCreated = (newBuilding) => {
    buildings.value.push(newBuilding);
};

onMounted(() => {
    fetchBuildings();
});
</script>

<style scoped>
.content-container {
    min-height: 100vh;
}
</style>