<!-- src/components/AllCustomerCard.vue -->
<template>
<div class="card h-100">
    <div class="card-body">
    <h5 class="card-title">{{ customer.first_name }} {{ customer.last_name }}</h5>
    <p class="card-text"><strong>Phone:</strong> {{ customer.user.phone_number }}</p>
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
</script>

<style scoped>
.card {
margin-bottom: 1.5rem;
}
</style>
