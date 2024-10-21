<template>
    <div class="card h-100 shadow-sm">
        <div class="card-body">
            <h5 class="card-title">Contract #{{ contract.contract.id }}</h5>
            <div class="mb-3">
                <strong>Termination Fine Amount:</strong>
                <p class="card-text">
                    Termination Fine: {{ contract.termination_fine_amount }}
                </p>
            </div>
            <div class="mb-3">
                <strong>Termination Fine Paid:</strong>
                <p class="card-text">
                    <span v-if="contract.termination_fine_paid" class="badge bg-success">Paid</span><span v-else class="badge bg-danger">Unpaid</span>
                </p>
            </div>
            
            <div class="mb-3">
                <strong>Apartment:</strong>
                <p class="card-text">
                    Apartment {{ contract.contract.apartment.apartment_number }}, Floor {{ contract.contract.apartment.floor_number }}
                </p>
            </div>

            <div class="mb-3">
                <strong>Customer:</strong>
                <p class="card-text">
                    {{ contract.contract.customer.first_name }} {{ contract.contract.customer.last_name }}<br />
                    <i class="bi bi-telephone"></i> {{ contract.contract.customer.user.phone_number }}
                </p>
            </div>

            <div class="mb-3">
                <strong>Contract Date:</strong>
                <p class="card-text">{{ contract.contract.contract_date }}</p>
            </div>

            <div class="mb-3">
                <strong>Price per Square Meter:</strong>
                <p class="card-text">{{ formatPrice(contract.contract.price_per_square) }} UZS</p>
            </div>

            <div class="mb-3">
                <strong>Payment Months:</strong>
                <p class="card-text">{{ contract.contract.payment_months }} months</p>
            </div>

            <!-- Down Payment Section -->
            <div v-if="contract.contract.down_payment" class="mb-3">
                <strong>Down Payment:</strong>
                <p class="card-text">
                    {{ formatPrice(contract.contract.down_payment.payment_amount) }} UZS (Paid: {{
                        contract.contract.down_payment.payment_paid ? 'Yes' : 'No' }})<br />
                    Method: {{ contract.contract.down_payment.payment_method }}<br />
                    Date: {{ contract.contract.down_payment.payment_date }}<br />
                    Reference: {{ contract.contract.down_payment.payment_reference }}
                </p>
            </div>

            <!-- Last Payment Section -->
            <div v-if="contract.last_payment" class="mb-3">
                <strong>Last Payment:</strong>
                <p class="card-text">
                    {{ formatPrice(contract.contract.last_payment.payment_amount) }} UZS (Paid: {{
                        contract.contract.last_payment.payment_paid ? 'Yes' : 'No' }})<br />
                    Method: {{ contract.contract.last_payment.payment_method }}<br />
                    Date: {{ contract.contract.last_payment.payment_date }}<br />
                    Reference: {{ contract.contract.last_payment.payment_reference }}
                </p>
            </div>

            <!-- Button to go to contract details -->
            <RouterLink :to="`/${userRole}/terminated/contracts/${contract.id}`" class="btn btn-primary mt-3">
                View Details
            </RouterLink>
        </div>
    </div>
</template>

<script setup>
import { useStore } from 'vuex';

const store = useStore();  // Access Vuex store

// Computed property to get userRole from Vuex store
const userRole = store.getters['auth/userRole']


// Props definition
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
