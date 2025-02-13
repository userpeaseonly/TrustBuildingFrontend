<template>
    <div class="bg-white rounded-lg shadow-md p-6 h-full mb-6">
        <div class="card-body">
            <!-- Customer Name with Icon -->
            <h5 class="text-lg font-semibold text-indigo-700 flex items-center mb-3">
                <i class="bi bi-person-fill mr-2 text-indigo-500"></i>
                {{ customer.first_name }} {{ customer.last_name }}
            </h5>

            <!-- Phone number with tooltip for better UX -->
            <p class="text-gray-600 flex items-center">
                <i class="bi bi-telephone-fill mr-2 text-gray-500"></i>
                <strong>{{ $t('message.phone') }}: </strong> {{ customer.user.phone_number }}
            </p>
        </div>
    </div>
</template>

<script setup>
import { onMounted } from 'vue';

const props = defineProps({
    customer: {
        type: Object,
        required: true,
    },
});

// Initialize tooltips (Bootstrap 5 tooltips)
onMounted(() => {
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(tooltipTriggerEl => {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
});
</script>

<style scoped>
/* Card Styling with Tailwind */
.card {
    border-radius: 0.75rem;
    /* Tailwind's equivalent of rounded-lg */
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    /* Tailwind's shadow-md equivalent */
}

/* Icon Styling */
i.bi {
    color: #4a5568;
    /* Tailwind's gray-700 */
}

/* Text Styling */
.card-title {
    font-size: 1.25rem;
    /* Tailwind equivalent for text-lg */
    font-weight: bold;
    /* font-semibold */
}

.card-text {
    font-size: 1.1rem;
    /* Consistent with the rest of the component */
}
</style>