<template>
    <div class="overflow-x-auto p-4 bg-gray-100">
        <h4 class="text-2xl font-semibold mb-6 text-gray-800">Payment Records</h4>

        <div v-if="records.length === 0" class="text-center py-4 bg-yellow-100 text-yellow-800 rounded-lg">
            No payment records found.
        </div>

        <!-- Payment Records Table -->
        <table class="table-auto w-full bg-white border-collapse shadow-lg rounded-lg overflow-hidden">
            <thead class="bg-blue-600 text-white">
                <tr>
                    <th class="px-4 py-3 text-left">Order</th>
                    <th class="px-4 py-3 text-left">Date</th>
                    <th class="px-4 py-3 text-left">Planned Payment</th>
                    <th class="px-4 py-3 text-left">Paid Amount</th>
                    <th class="px-4 py-3 text-left">Customer Debt</th>
                    <th class="px-4 py-3 text-left">Make / Type</th>
                    <th class="px-4 py-3 text-left">Save / Ref</th>
                </tr>
            </thead>
            <tbody>
                <template v-for="record in records" :key="record.id">
                    <!-- Main Payment Record Row -->
                    <tr class="border-t bg-gray-50 hover:bg-gray-100" 
                        :class="record.is_customer_debt_saved_to_next_month ? 'text-red-600' : 'text-green-600'">
                        <td class="px-4 py-3">{{ record.order }}</td>
                        <td class="px-4 py-3">{{ record.date }}</td>
                        <td class="px-4 py-3">{{ formatPrice(record.payment_amount_plan) }} UZS</td>
                        <td class="px-4 py-3">{{ formatPrice(record.payment_amount_paid) }} UZS</td>
                        <td class="px-4 py-3">{{ formatPrice(record.customer_debt) }} UZS</td>
                        <td class="px-4 py-3">
                            <button :disabled="!canMakePayment(record)" @click="openMakePaymentModal(record)"
                                class="bg-blue-800 text-white font-semibold px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600 disabled:opacity-50 disabled:cursor-not-allowed">
                                Make Payment
                            </button>
                        </td>
                        <td class="px-4 py-3">
                            <button :disabled="!canSavePayment(record)" @click="openSavePaymentModal(record)"
                                class="bg-blue-800 text-white font-semibold px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600 disabled:opacity-50 disabled:cursor-not-allowed">
                                Save Payment
                            </button>
                        </td>
                    </tr>

                    <!-- Payments for the current record -->
                    <tr v-for="payment in record.payments" :key="payment.id" class="bg-white hover:bg-gray-50">
                        <td class="px-4 py-3">{{ record.order }}</td>
                        <td class="px-4 py-3">{{ payment.payment_date }}</td>
                        <td class="px-4 py-3">{{ formatPrice(record.payment_amount_plan) }} UZS</td>
                        <td class="px-4 py-3">{{ formatPrice(payment.payment_amount) }} UZS</td>
                        <td class="px-4 py-3">{{ formatPrice(payment.payment_record_customer_debt) }} UZS</td>
                        <td class="px-4 py-3">{{ payment.payment_method }}</td>
                        <td class="px-4 py-3">{{ payment.payment_reference }}</td>
                    </tr>

                    <!-- Return Payments for the current record -->
                    <tr v-for="returnPayment in record.return_payments" :key="returnPayment.id" class="bg-gray-50 hover:bg-gray-100">
                        <td class="px-4 py-3">{{ record.order }}</td>
                        <td class="px-4 py-3">{{ returnPayment.return_date }}</td>
                        <td class="px-4 py-3">{{ formatPrice(returnPayment.return_amount) }} UZS</td>
                        <td class="px-4 py-3">{{ returnPayment.return_method }}</td>
                        <td class="px-4 py-3">{{ returnPayment.return_reference }}</td>
                        <td class="px-4 py-3" colspan="2">{{ returnPayment.return_notes || 'N/A' }}</td>
                    </tr>
                </template>
            </tbody>
        </table>
    </div>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps({
    records: {
        type: Array,
        required: true,
    }
});

const emit = defineEmits(['openPaymentModal', 'openSavePaymentModal']);

// Helper function to format prices
const formatPrice = (price) => new Intl.NumberFormat('uz-UZ').format(price);

// Emit event to parent to open the payment modal
const openMakePaymentModal = (record) => {
    emit('openPaymentModal', record);
};

const openSavePaymentModal = (record) => {
    emit('openSavePaymentModal', record);
};

// Determine if Make Payment button should be enabled
const canMakePayment = (record) => {
    return record.customer_debt > 0;  // Example condition for enabling make payment
};

// Determine if Save Payment button should be enabled
const canSavePayment = (record) => {
    return !record.is_customer_debt_saved_to_next_month;  // Example condition for enabling save payment
};
</script>

<style scoped>
.table-auto th,
.table-auto td {
    text-align: left;
    padding: 0.75rem;
    border: 1px solid #e5e7eb;
    white-space: nowrap;
}

thead th {
    background-color: #1e3a8a; /* Changed to match Tailwind's blue-600 for uniformity */
}

tbody tr:hover {
    background-color: #f0f4f8;
}

.table-auto {
    margin-bottom: 2rem;
}
</style>
