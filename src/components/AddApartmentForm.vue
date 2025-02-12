<template>
    <div class="bg-white rounded-lg shadow-lg p-6 mb-6 mt-6 border border-gray-200">
        <h5 class="text-2xl font-bold text-gray-800 mb-6">{{ $t('message.add_new_apartment') }}</h5>

        <!-- Apartment Form -->
        <form @submit.prevent="submitForm">
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                <!-- Apartment Number -->
                <div>
                    <label for="apartmentNumber" class="block text-sm font-medium text-gray-700 mb-2">{{ $t('message.apartment_number') }}</label>
                    <input
                        type="text"
                        id="apartmentNumber"
                        v-model="apartment.apartment_number"
                        class="block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        :placeholder="$t('message.enter_apartment_number')"
                        required
                    />
                </div>

                <!-- Floor Number -->
                <div>
                    <label for="floorNumber" class="block text-sm font-medium text-gray-700 mb-2">{{ $t('message.floor_number') }}</label>
                    <input
                        type="number"
                        id="floorNumber"
                        v-model="apartment.floor_number"
                        class="block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        :placeholder="$t('message.enter_floor_number')"
                        required
                    />
                </div>

                <!-- Building Entrance -->
                <div>
                    <label for="buildingEntrance" class="block text-sm font-medium text-gray-700 mb-2">{{ $t('message.building_entrance') }}</label>
                    <input
                        type="number"
                        id="buildingEntrance"
                        v-model="apartment.building_entrance"
                        class="block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        :placeholder="$t('message.enter_entrance_number')"
                        required
                    />
                </div>

                <!-- Living Room Count -->
                <div>
                    <label for="livingRoomCount" class="block text-sm font-medium text-gray-700 mb-2">{{ $t('message.living_room_count') }}</label>
                    <input
                        type="number"
                        id="livingRoomCount"
                        v-model="apartment.living_room_count"
                        class="block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        :placeholder="$t('message.enter_living_room_count')"
                        required
                    />
                </div>

                <!-- Total Area -->
                <div>
                    <label for="totalArea" class="block text-sm font-medium text-gray-700 mb-2">{{ $t('message.total_area') }} (m²)</label>
                    <input
                        type="number"
                        id="totalArea"
                        v-model="apartment.total_area"
                        class="block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        :placeholder="$t('message.enter_total_area')"
                        required
                    />
                </div>

                <!-- Living Area -->
                <div>
                    <label for="livingArea" class="block text-sm font-medium text-gray-700 mb-2">{{ $t('message.living_area') }} (m²)</label>
                    <input
                        type="number"
                        id="livingArea"
                        v-model="apartment.living_area"
                        class="block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        :placeholder="$t('message.enter_living_area')"
                        required
                    />
                </div>
            </div>

            <!-- Submit Button -->
            <button
                type="submit"
                class="w-full bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all"
            >
                {{ $t('message.add_apartment') }}
            </button>
        </form>

        <!-- Error Message -->
        <div v-if="submissionError" class="mt-6 p-4 bg-red-100 text-red-800 rounded-lg shadow">
            {{ submissionError }}
        </div>
    </div>
</template>

<script setup>
import { ref } from "vue";
import apiClient from "@/services/api";

// Props to receive the building ID
const props = defineProps({
    buildingId: {
        type: Number,
        required: true,
    },
});

// Emit function for sending events to parent component
const emit = defineEmits(["apartmentAdded"]); // Declare the custom event

// Apartment form data
const apartment = ref({
    apartment_number: "",
    floor_number: 0,
    building_entrance: 0,
    living_room_count: 0,
    total_area: "",
    living_area: "",
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
            apartment_number: "",
            floor_number: 0,
            building_entrance: 0,
            living_room_count: 0,
            total_area: "",
            living_area: "",
        };

        // Trigger event to inform parent about successful addition
        emit("apartmentAdded");
    } catch (err) {
        console.log("Error: ", err);
        submissionError.value = "Failed to add apartment. Please try again.";
    }
};
</script>
