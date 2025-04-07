<template>
    <div class="bg-white rounded-lg shadow-md p-6 h-full mb-6">
        <div class="card-body">
            <h5 class="text-xl font-semibold text-indigo-700 mb-4">{{ $t('message.contract') }} #{{ contract.id }}</h5>

            <!-- Apartment Details -->
            <div class="mb-4">
                <strong class="text-gray-700">{{ $t('message.apartment') }}:</strong>
                <p class="text-gray-600">
                    {{ $t('message.apartment') }} {{ contract.apartment.apartment_number }}, {{ $t('message.floor') }} {{ contract.apartment.floor_number }}
                </p>
            </div>

            <!-- Customer Details -->
            <div class="mb-4">
                <strong class="text-gray-700">{{ $t('message.customer') }}:</strong>
                <p class="text-gray-600">
                    {{ contract.customer.first_name }} {{ contract.customer.last_name }}<br />
                    <i class="bi bi-telephone mr-2"></i>{{ contract.customer.user.phone_number }}
                </p>
            </div>

            <!-- Contract Date -->
            <div class="mb-4">
                <strong class="text-gray-700">{{ $t('message.contract_date') }}:</strong>
                <p class="text-gray-600">{{ contract.contract_date }}</p>
            </div>

            <!-- Price per Square Meter -->
            <div class="mb-4">
                <strong class="text-gray-700">{{ $t('message.price_per_square') }}:</strong>
                <p class="text-gray-600">{{ formatPrice(contract.price_per_square) }} UZS</p>
            </div>

            <!-- Payment Months -->
            <div class="mb-4">
                <strong class="text-gray-700">{{ $t('message.payment_months') }}:</strong>
                <p class="text-gray-600">{{ contract.payment_months }} {{ $t('message.months') }}</p>
            </div>

            <!-- Down Payment Section -->
            <div v-if="contract.down_payment" class="mb-4">
                <strong class="text-gray-700">{{ $t('message.down_payment') }}:</strong>
                <p class="text-gray-600">
                    {{ formatPrice(contract.down_payment.payment_amount) }} UZS ({{ $t('message.paid') }}: {{ contract.down_payment.payment_paid ? $t('message.yes') : $t('message.no') }})<br />
                    {{ $t('message.method') }}: {{ contract.down_payment.payment_method }}<br />
                    {{ $t('message.date') }}: {{ contract.down_payment.payment_date }}<br />
                    {{ $t('message.reference') }}: {{ contract.down_payment.payment_reference }}
                </p>
            </div>

            <!-- Last Payment Section -->
            <div v-if="contract.last_payment" class="mb-4">
                <strong class="text-gray-700">{{ $t('message.last_payment') }}:</strong>
                <p class="text-gray-600">
                    {{ formatPrice(contract.last_payment.payment_amount) }} UZS ({{ $t('message.paid') }}: {{ contract.last_payment.payment_paid ? $t('message.yes') : $t('message.no') }})<br />
                    {{ $t('message.method') }}: {{ contract.last_payment.payment_method }}<br />
                    {{ $t('message.date') }}: {{ contract.last_payment.payment_date }}<br />
                    {{ $t('message.reference') }}: {{ contract.last_payment.payment_reference }}
                </p>
            </div>

            <!-- Button to go to contract details -->
            <RouterLink :to="`/${userRole}/contracts/${contract.id}`" class="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded mt-6 inline-block">
                {{ $t('message.view_details') }}
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
/* Additional Tailwind-based styling for icons */
i.bi {
    color: #4a5568; /* Tailwind's gray-700 */
}
</style>
