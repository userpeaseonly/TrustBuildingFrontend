<!-- src/components/AddApartmentForm.vue -->
<template>
<div class="card mb-4 mt-4">
    <div class="card-body">
    <h5 class="card-title">Add New Apartment</h5>

    <!-- Apartment Form -->
    <form @submit.prevent="submitForm">
        <div class="mb-3">
        <label for="apartmentNumber" class="form-label">Apartment Number</label>
        <input
            type="text"
            id="apartmentNumber"
            v-model="apartment.apartment_number"
            class="form-control"
            required
        />
        </div>

        <div class="mb-3">
        <label for="floorNumber" class="form-label">Floor Number</label>
        <input
            type="number"
            id="floorNumber"
            v-model="apartment.floor_number"
            class="form-control"
            required
        />
        </div>

        <div class="mb-3">
        <label for="buildingEntrance" class="form-label">Building Entrance</label>
        <input
            type="number"
            id="buildingEntrance"
            v-model="apartment.building_entrance"
            class="form-control"
            required
        />
        </div>

        <div class="mb-3">
        <label for="livingRoomCount" class="form-label">Living Room Count</label>
        <input
            type="number"
            id="livingRoomCount"
            v-model="apartment.living_room_count"
            class="form-control"
            required
        />
        </div>

        <div class="mb-3">
        <label for="totalArea" class="form-label">Total Area (m²)</label>
        <input
            type="number"
            id="totalArea"
            v-model="apartment.total_area"
            class="form-control"
            required
        />
        </div>

        <div class="mb-3">
        <label for="livingArea" class="form-label">Living Area (m²)</label>
        <input
            type="number"
            id="livingArea"
            v-model="apartment.living_area"
            class="form-control"
            required
        />
        </div>

        <button type="submit" class="btn btn-primary">Add Apartment</button>
    </form>

    <!-- Display error message if submission fails -->
    <div v-if="submissionError" class="alert alert-danger mt-3">
        {{ submissionError }}
    </div>
    </div>
</div>
</template>

<script setup>
import { ref } from 'vue';
import apiClient from '@/services/api'; // Assuming you have an Axios service

// Props to receive the building ID
const props = defineProps({
buildingId: {
    type: Number,
    required: true
}
});

// Emit function for sending events to parent component
const emit = defineEmits(['apartmentAdded']); // Declare the custom event

// Apartment form data
const apartment = ref({
apartment_number: '',
floor_number: 0,
building_entrance: 0,
living_room_count: 0,
total_area: '',
living_area: ''
});

// State to handle submission error
const submissionError = ref(null);

// Submit form and add apartment
const submitForm = async () => {
submissionError.value = null;
try {
    // POST request to add the apartment
    await apiClient.post(`/buildings/${props.buildingId}/apartments/create/`, apartment.value);
    
    // Reset form on success
    apartment.value = {
    apartment_number: '',
    floor_number: 0,
    building_entrance: 0,
    living_room_count: 0,
    total_area: '',
    living_area: ''
    };

    // Trigger event to inform parent about successful addition
    emit('apartmentAdded');
} catch (err) {
    console.log("Error: ", err);
    submissionError.value = 'Failed to add apartment. Please try again.';
}
};
</script>
