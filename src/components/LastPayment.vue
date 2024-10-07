<!-- src/components/LastPayment.vue -->
<template>
    <div class="card mb-4 shadow-sm">
        <div class="card-body">
            <h5 class="card-title">Last Payment</h5>
            <p class="card-text"><strong>Date:</strong> {{ payment.payment_date }}</p>
            <p class="card-text"><strong>Amount:</strong> {{ formatPrice(payment.payment_amount) }} UZS</p>
            <p class="card-text"><strong>Method:</strong> {{ payment.payment_method }}</p>
            <p class="card-text"><strong>Reference:</strong> {{ payment.payment_reference }}</p>
            <p class="card-text"><strong>Paid:</strong> {{ payment.payment_paid ? 'Yes' : 'No' }}</p>
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    payment: {
        type: Object,
        required: true
    }
});

// Helper function to format prices
const formatPrice = (price) => {
    return new Intl.NumberFormat('uz-UZ').format(price);
};
</script>

<style scoped>
.card {
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
</style>