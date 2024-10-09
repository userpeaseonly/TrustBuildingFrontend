<!-- src/views/Company/Staff.vue -->
<template>
    <div class="d-flex">
        <!-- Sidebar -->
        <CompanySidebar />

        <!-- Main Content Area -->
        <div class="container mt-5" style="flex: 1;">
            <h2 class="mb-4 text-center">Company Staff</h2>

            <div v-if="loadingStaff" class="text-center my-5">
                <div class="spinner-border" role="status">
                    <span class="sr-only">Loading...</span>
                </div>
            </div>

            <div v-else-if="errorStaff" class="alert alert-danger text-center">
                {{ errorStaff }}
            </div>

            <div v-else>
                <div class="row row-cols-1 row-cols-md-2 g-4">
                    <div class="col" v-for="staff in staffList" :key="staff.id">
                        <StaffCard :staff="staff" />
                    </div>
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

.card {
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.alert {
    font-size: 1rem;
}
</style>