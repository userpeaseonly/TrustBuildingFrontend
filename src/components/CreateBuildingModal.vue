<template>
    <div class="modal fade show d-block" tabindex="-1" aria-modal="true" role="dialog">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Create New Building</h5>
                    <button type="button" class="btn-close" @click="emit('close')"></button>
                </div>
                <div class="modal-body">
                    <form @submit.prevent="submitForm">
                        <div class="mb-3">
                            <label for="buildingNumber" class="form-label">Building Number</label>
                            <input v-model="buildingData.building_number" type="text" id="buildingNumber"
                                class="form-control" required />
                        </div>
                        <div class="mb-3">
                            <label for="address" class="form-label">Address</label>
                            <input v-model="buildingData.address" type="text" id="address" class="form-control"
                                required />
                        </div>
                        <div class="mb-3">
                            <label for="blockNumber" class="form-label">Block Number</label>
                            <input v-model="buildingData.block_number" type="text" id="blockNumber" class="form-control"
                                required />
                        </div>
                        <div class="mb-3">
                            <label for="floorCount" class="form-label">Number of Floors</label>
                            <input v-model="buildingData.floor_count" type="number" id="floorCount" class="form-control"
                                required />
                        </div>
                        <div class="mb-3">
                            <label for="entranceCount" class="form-label">Number of Entrances</label>
                            <input v-model="buildingData.entrance_count" type="number" id="entranceCount"
                                class="form-control" required />
                        </div>
                        <div class="mb-3">
                            <label for="apartmentCount" class="form-label">Number of Apartments</label>
                            <input v-model="buildingData.apartment_count" type="number" id="apartmentCount"
                                class="form-control" required />
                        </div>

                        <!-- Error message display -->
                        <div v-if="backendErrors" class="alert alert-danger">
                            <p v-for="(error, field) in backendErrors" :key="field">{{ error }}</p>
                        </div>

                        <div class="modal-footer">
                            <button type="submit" class="btn btn-primary">Create Building</button>
                            <button type="button" class="btn btn-secondary" @click="emit('close')">Cancel</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import apiClient from '@/services/api'; // Axios instance

const emit = defineEmits(['close', 'buildingCreated']);

// Initialize building data
const buildingData = ref({
    building_number: '',
    address: '',
    block_number: '',
    floor_count: '',
    entrance_count: '',
    apartment_count: ''
});

// State for backend errors
const backendErrors = ref(null);

// Handle form submission to create the building
const submitForm = async () => {
    try {
        const response = await apiClient.post('/buildings/create/', buildingData.value);
        backendErrors.value = null;
        emit('buildingCreated', response.data);  // Emit the created building data
        emit('close');  // Close the modal after successful creation
    } catch (error) {
        // Display backend validation errors
        backendErrors.value = error.response?.data || { error: 'Failed to create building' };
    }
};
</script>

<style scoped>
.modal {
    display: block;
}

.modal-backdrop {
    background-color: rgba(0, 0, 0, 0.5);
}
</style>