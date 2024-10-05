<template>
<div class="card h-100 shadow-sm">
    <div class="card-body">
    <h5 class="card-title">Contract #{{ contract.id }}</h5>

    <div class="mb-3">
        <strong>Apartment:</strong>
        <p class="card-text">
        Apartment {{ contract.apartment.apartment_number }}, Floor {{ contract.apartment.floor_number }}
        </p>
    </div>

    <div class="mb-3">
        <strong>Customer:</strong>
        <p class="card-text">
        {{ contract.customer.first_name }} {{ contract.customer.last_name }}<br />
        <i class="bi bi-telephone"></i> {{ contract.customer.user.phone_number }}
        </p>
    </div>

    <div class="mb-3">
        <strong>Contract Date:</strong>
        <p class="card-text">{{ contract.contract_date }}</p>
    </div>

    <div class="mb-3">
        <strong>Price per Square Meter:</strong>
        <p class="card-text">{{ formatPrice(contract.price_per_square) }} UZS</p>
    </div>

    <div class="mb-3">
        <strong>Payment Months:</strong>
        <p class="card-text">{{ contract.payment_months }} months</p>
    </div>

    <!-- Down Payment Section -->
    <div v-if="contract.down_payment" class="mb-3">
        <strong>Down Payment:</strong>
        <p class="card-text">
        {{ formatPrice(contract.down_payment.payment_amount) }} UZS (Paid: {{ contract.down_payment.payment_paid ? 'Yes' : 'No' }})<br />
        Method: {{ contract.down_payment.payment_method }}<br />
        Date: {{ contract.down_payment.payment_date }}<br />
        Reference: {{ contract.down_payment.payment_reference }}
        </p>
    </div>

    <!-- Last Payment Section -->
    <div v-if="contract.last_payment" class="mb-3">
        <strong>Last Payment:</strong>
        <p class="card-text">
        {{ formatPrice(contract.last_payment.payment_amount) }} UZS (Paid: {{ contract.last_payment.payment_paid ? 'Yes' : 'No' }})<br />
        Method: {{ contract.last_payment.payment_method }}<br />
        Date: {{ contract.last_payment.payment_date }}<br />
        Reference: {{ contract.last_payment.payment_reference }}
        </p>
    </div>

    <!-- Button to go to contract details -->
    <RouterLink :to="`/staff/contracts/${contract.id}`" class="btn btn-primary mt-3">
    View Details
    </RouterLink>
    </div>
</div>
</template>

<script setup>
const props = defineProps({
contract: {
    type: Object,
    required: true,
},
});

// Helper function to format price
const formatPrice = (price) => {
return new Intl.NumberFormat('uz-UZ').format(price);
};
</script>

<style scoped>
.card {
margin-bottom: 1.5rem;
border-radius: 10px;
box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.card-title {
font-size: 1.25rem;
font-weight: bold;
}

.card-text {
font-size: 1rem;
}

.text-muted {
color: #6c757d;
}
</style>
