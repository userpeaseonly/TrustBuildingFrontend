<!-- src/components/CustomerCard.vue -->
<template>
<div class="card h-100">
    <div class="card-body">
    <h5 class="card-title">{{ customer.first_name }} {{ customer.last_name }}</h5>
    <p class="card-text"><strong>Phone:</strong> {{ customer.user.phone_number }}</p>
    <p class="card-text"><strong>Passport:</strong> {{ customer.passport_series }}</p>
    <p class="card-text">
        <strong>Issued At:</strong> {{ customer.passport_place_issuance }} on {{ formatDate(customer.passport_date_issuance) }}
    </p>
    </div>
</div>
</template>

<script setup>
const props = defineProps({
customer: {
    type: Object,
    required: true,
},
});

// Helper function to format the date
const formatDate = (date) => {
return new Date(date).toLocaleDateString();
};
</script>

<style scoped>
.card {
margin-bottom: 1.5rem;
}
</style>
