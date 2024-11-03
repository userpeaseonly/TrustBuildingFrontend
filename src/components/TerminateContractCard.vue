<template>
    <div class="flex flex-col h-full shadow-lg rounded-lg p-6 bg-white">
        <h5 class="text-lg font-bold mb-4">Contract #{{ contract.contract.id }}</h5>

        <div class="mb-4">
            <strong>Termination Fine Amount:</strong>
            <p class="text-gray-700">
                Termination Fine: {{ formatPrice(contract.termination_fine_amount) }}
            </p>
        </div>

        <div class="mb-4">
            <strong>Termination Fine Paid:</strong>
            <p class="text-gray-700">
                <span v-if="contract.termination_fine_paid"
                    class="px-2 py-1 rounded-full bg-green-100 text-green-700">Paid</span>
                <span v-else class="px-2 py-1 rounded-full bg-red-100 text-red-700">Unpaid</span>
            </p>
        </div>

        <div class="mb-4">
            <strong>Apartment:</strong>
            <p class="text-gray-700">
                Apartment {{ contract.contract.apartment.apartment_number }}, Floor {{ contract.contract.apartment.floor_number }}
            </p>
        </div>

        <div class="mb-4">
            <strong>Customer:</strong>
            <p class="text-gray-700">
                {{ contract.contract.customer.first_name }} {{ contract.contract.customer.last_name }}<br />
                <i class="bi bi-telephone mr-1"></i> {{ contract.contract.customer.user.phone_number }}
            </p>
        </div>

        <div class="mb-4">
            <strong>Contract Date:</strong>
            <p class="text-gray-700">{{ contract.contract.contract_date }}</p>
        </div>

        <div class="mb-4">
            <strong>Price per Square Meter:</strong>
            <p class="text-gray-700">{{ formatPrice(contract.contract.price_per_square) }} UZS</p>
        </div>

        <div class="mb-4">
            <strong>Payment Months:</strong>
            <p class="text-gray-700">{{ contract.contract.payment_months }} months</p>
        </div>

        <!-- Down Payment Section -->
        <div v-if="contract.contract.down_payment" class="mb-4">
            <strong>Down Payment:</strong>
            <p class="text-gray-700">
                {{ formatPrice(contract.contract.down_payment.payment_amount) }} UZS
                <span v-if="contract.contract.down_payment.payment_paid"
                    class="px-2 py-1 rounded-full bg-green-100 text-green-700">Paid</span>
                <span v-else class="px-2 py-1 rounded-full bg-red-100 text-red-700">Unpaid</span><br />
                Method: {{ contract.contract.down_payment.payment_method }}<br />
                Date: {{ contract.contract.down_payment.payment_date }}<br />
                Reference: {{ contract.contract.down_payment.payment_reference }}
            </p>
        </div>

        <!-- Last Payment Section -->
        <div v-if="contract.last_payment" class="mb-4">
            <strong>Last Payment:</strong>
            <p class="text-gray-700">
                {{ formatPrice(contract.contract.last_payment.payment_amount) }} UZS
                <span v-if="contract.contract.last_payment.payment_paid"
                    class="px-2 py-1 rounded-full bg-green-100 text-green-700">Paid</span>
                <span v-else class="px-2 py-1 rounded-full bg-red-100 text-red-700">Unpaid</span><br />
                Method: {{ contract.contract.last_payment.payment_method }}<br />
                Date: {{ contract.contract.last_payment.payment_date }}<br />
                Reference: {{ contract.contract.last_payment.payment_reference }}
            </p>
        </div>

        <!-- Button to go to contract details -->
        <RouterLink :to="`/${userRole}/terminated/contracts/${contract.id}`"
            class="mt-4 inline-block text-center bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300">
            View Details
        </RouterLink>
    </div>
</template>

<script setup>
import { useStore } from 'vuex';

const store = useStore(); // Access Vuex store

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

<style scoped></style>
