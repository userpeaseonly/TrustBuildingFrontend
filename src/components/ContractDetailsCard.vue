<template>
    <div class="card mb-4 shadow-sm">
        <div class="card-body">
            <h5 class="card-title">Contract #{{ contract.id }}</h5>
            <p class="card-text"><strong>Contract Date:</strong> {{ contract.contract_date }}</p>
            <p class="card-text"><strong>Status:</strong> {{ contract.status }}</p>
            <p class="card-text"><strong>Price per Square:</strong> {{ formatPrice(contract.price_per_square) }} UZS</p>
            <p class="card-text"><strong>Contract Amount:</strong> {{ formatPrice(contract.contract_amount) }} UZS</p>
            <p class="card-text"><strong>Payment Months:</strong> {{ contract.payment_months }}</p>
            <p class="card-text"><strong>Monthly Payment:</strong> {{ formatPrice(contract.monthly_payment) }} UZS</p>
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    contract: Object
});

const formatPrice = (price) => new Intl.NumberFormat('uz-UZ').format(price);
</script>
