<!-- src/components/AllCustomerCard.vue -->
<template>
<div class="card h-100 shadow-sm">
    <div class="card-body">
    <!-- Customer Name with Icon -->
    <h5 class="card-title text-primary d-flex align-items-center mb-3">
        <i class="bi bi-person-fill me-2"></i> 
        {{ customer.first_name }} {{ customer.last_name }}
    </h5>

    <!-- Phone number with tooltip for better UX -->
    <p class="card-text d-flex align-items-center">
        <i class="bi bi-telephone-fill me-2"></i> 
        <strong>Phone:</strong> {{ customer.user.phone_number }}
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
.card {
margin-bottom: 1.5rem;
border-radius: 10px;
box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
}

.card-title {
font-size: 1.5rem;
font-weight: bold;
}

.card-text {
font-size: 1.1rem;
}

i.bi {
color: #007bff;
}
</style>
