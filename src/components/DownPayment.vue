<template>
    <div class="card mb-4 shadow-sm">
        <div class="card-body">
            <h5 class="card-title">Down Payment</h5>
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
    payment: Object
});

const formatPrice = (price) => new Intl.NumberFormat('uz-UZ').format(price);
</script>
