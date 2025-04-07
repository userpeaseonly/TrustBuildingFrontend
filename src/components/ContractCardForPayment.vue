<template>
    <div class="card h-100 shadow-sm">
        <div class="card-body">
            <h5 class="card-title">{{ $t('message.contract_number', { id: contract.id }) }}</h5>

            <div class="mb-3">
                <strong>{{ $t('message.apartment') }}:</strong>
                <p class="card-text">
                    {{ $t('message.apartment_number', { number: contract.apartment.apartment_number }) }}, {{ $t('message.floor_number', { number: contract.apartment.floor_number }) }}
                </p>
            </div>

            <div class="mb-3">
                <strong>{{ $t('message.customer') }}:</strong>
                <p class="card-text">
                    {{ contract.customer.first_name }} {{ contract.customer.last_name }}<br />
                    <i class="bi bi-telephone"></i> {{ contract.customer.user.phone_number }}
                </p>
            </div>

            <div class="mb-3">
                <strong>{{ $t('message.contract_date') }}:</strong>
                <p class="card-text">{{ contract.contract_date }}</p>
            </div>

            <div class="mb-3">
                <strong>{{ $t('message.price_per_square_meter') }}:</strong>
                <p class="card-text">{{ formatPrice(contract.price_per_square) }} UZS</p>
            </div>

            <div class="mb-3">
                <strong>{{ $t('message.payment_months') }}:</strong>
                <p class="card-text">{{ contract.payment_months }} {{ $t('message.months') }}</p>
            </div>

            <!-- Down Payment Section -->
            <div v-if="contract.down_payment" class="mb-3">
                <strong>{{ $t('message.down_payment') }}:</strong>
                <p class="card-text">
                    {{ formatPrice(contract.down_payment.payment_amount) }} UZS ({{ $t('message.paid') }}: {{
                        contract.down_payment.payment_paid ? $t('message.yes') : $t('message.no') }})<br />
                    {{ $t('message.method') }}: {{ contract.down_payment.payment_method }}<br />
                    {{ $t('message.date') }}: {{ contract.down_payment.payment_date }}<br />
                    {{ $t('message.reference') }}: {{ contract.down_payment.payment_reference }}
                </p>
            </div>

            <!-- Last Payment Section -->
            <div v-if="contract.last_payment" class="mb-3">
                <strong>{{ $t('message.last_payment') }}:</strong>
                <p class="card-text">
                    {{ formatPrice(contract.last_payment.payment_amount) }} UZS ({{ $t('message.paid') }}: {{
                        contract.last_payment.payment_paid ? $t('message.yes') : $t('message.no') }})<br />
                    {{ $t('message.method') }}: {{ contract.last_payment.payment_method }}<br />
                    {{ $t('message.date') }}: {{ contract.last_payment.payment_date }}<br />
                    {{ $t('message.reference') }}: {{ contract.last_payment.payment_reference }}
                </p>
            </div>

            <!-- Button to go to contract details -->
            <RouterLink :to="`/${userRole}/contracts/${contract.id}`" class="btn btn-warning mt-3">
                {{ $t('message.view_details') }}
            </RouterLink>&nbsp;

            <button @click="makePayment" class="btn btn-success mt-3">{{ $t('message.make_payment') }}</button>
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

const emit = defineEmits(['makePayment']);

const makePayment = () => {
    emit('makePayment', props.contract);
};
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
