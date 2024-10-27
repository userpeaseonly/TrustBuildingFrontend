<template>
    <div class="bg-white rounded-lg shadow-lg p-6 h-full">
        <div class="card-body">
            <!-- Title with icons and subtle text color -->
            <h5 class="text-indigo-700 flex items-center mb-3 text-lg font-semibold">
                <i class="bi bi-person-fill mr-2 text-indigo-500"></i>
                {{ customer.first_name }} {{ customer.last_name }}
            </h5>

            <!-- Phone numbers with icon and better UX -->
            <div class="mb-3">
                <p class="text-gray-600 flex items-center">
                    <i class="bi bi-telephone-fill mr-2 text-gray-500"></i>
                    <strong>Phone:</strong>&nbsp;{{ customer.user.phone_number }}
                </p>
                <p v-if="customer.phone_number2" class="text-gray-600 flex items-center">
                    <i class="bi bi-telephone-fill mr-2 text-gray-500"></i>
                    <strong>Phone 2:</strong>&nbsp;{{ customer.phone_number2 }}
                </p>
            </div>

            <!-- Passport details -->
            <div class="mb-3">
                <p class="text-gray-600 flex items-center">
                    <i class="bi bi-file-earmark-text-fill mr-2 text-gray-500"></i>
                    <strong>Passport:</strong>&nbsp;{{ customer.passport_series }}
                </p>
                <p class="text-gray-600 flex items-center">
                    <i class="bi bi-calendar-fill mr-2 text-gray-500"></i>
                    <strong>Issued At:</strong>&nbsp;{{ customer.passport_place_issuance }} on {{
                        formatDate(customer.passport_date_issuance) }}
                </p>
            </div>

            <!-- Passport copy link with hover effect -->
            <div class="mb-3">
                <p class="text-gray-600 flex items-center">
                    <i class="bi bi-image-fill mr-2 text-gray-500"></i>
                    <strong>Passport Copy:</strong>
                    <a :href="customer.passport_copy" target="_blank" rel="noopener noreferrer"
                        class="ml-2 text-indigo-600 hover:underline" data-bs-toggle="tooltip"
                        title="View passport copy">
                        View
                    </a>
                </p>
            </div>

            <!-- Hidden Passport JSHSHR toggle with hover effect -->
            <div class="mt-4">
                <button @click="showJshshr = !showJshshr"
                    class="text-indigo-600 border border-indigo-600 px-4 py-2 rounded hover:bg-indigo-600 hover:text-white transition">
                    <i :class="showJshshr ? 'bi bi-eye-slash-fill' : 'bi bi-eye-fill'"></i>
                    {{ showJshshr ? 'Hide Passport JSHSHR' : 'Show Passport JSHSHR' }}
                </button>
                <p v-if="showJshshr" class="mt-3 text-gray-600 flex items-center">
                    <i class="bi bi-file-lock-fill mr-2 text-gray-500"></i>
                    <strong>Passport JSHSHR:</strong>&nbsp;{{ customer.passport_jshshr }}
                </p>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const props = defineProps({
    customer: {
        type: Object,
        required: true,
    },
});

// State for showing/hiding passport JSHSHR
const showJshshr = ref(false);

// Helper function to format the date
const formatDate = (date) => {
    return new Date(date).toLocaleDateString();
};

// Initialize tooltips (Bootstrap 5 tooltips)
onMounted(() => {
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(tooltipTriggerEl => {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
});
</script>

<style scoped>
/* Adjusting icon color and size to match Tailwind styling */
i.bi {
    color: #4a5568;
    /* Tailwind's gray-700 */
}

.card {
    border-radius: 0.75rem;
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
}

.card-title {
    font-size: 1.5rem;
    font-weight: bold;
}

.card-text {
    font-size: 1.1rem;
}

a.text-indigo-600:hover {
    color: #4f46e5;
    /* Tailwind's indigo-600 for hover state */
    text-decoration: underline;
}

button {
    transition: background-color 0.3s ease, color 0.3s ease;
}
</style>