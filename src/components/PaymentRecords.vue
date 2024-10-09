<template>
    <div class="overflow-x-auto p- bg-gray-100">
        <h4 class="text-2xl font-semibold mb-6 text-gray-800">Payment Records</h4>

        <div v-if="records.length === 0" class="text-center py-4 bg-yellow-100 text-yellow-800 rounded-lg">
            No payment records found.
        </div>

        <!-- Payment Records Table -->
        <table class="table-auto w-full bg-white border-collapse shadow-lg rounded-lg overflow-hidden">
            <thead class="bg-blue-500 text-lime-800">
                <tr>
                    <th class="px-4 text-left">Order</th>
                    <th class="px-4 text-left">Date</th>
                    <th class="px-4 text-left">Planned Payment</th>
                    <th class="px-4 text-left">Paid Amount</th>
                    <th class="px-4 text-left">Customer Debt</th>
                    <th class="px-4 text-left">Debt to Next Month</th>
                    <th class="px-4 text-left">Actions</th>
                    <th class="px-4 text-left">Actions</th>
                </tr>
            </thead>
            <tbody>
                <template v-for="record in records" :key="record.id">
                    <!-- Main Payment Record Row -->
                    <tr class="border-t bg-gray-50 hover:bg-gray-100">
                        <td class="px-4">{{ record.order }}</td>
                        <td class="px-4">{{ record.date }}</td>
                        <td class="px-4">{{ formatPrice(record.payment_amount_plan) }} UZS</td>
                        <td class="px-4">{{ formatPrice(record.payment_amount_paid) }} UZS</td>
                        <td class="px-4">{{ formatPrice(record.customer_debt) }} UZS</td>
                        <td class="px-4">
                            <span :class="record.is_customer_debt_saved_to_next_month ? 'text-green-600' : 'text-red-600'">
                                {{ record.is_customer_debt_saved_to_next_month ? 'Yes' : 'No' }}
                            </span>
                        </td>
                        <td class="px-4">
                            <button @click="openMakePaymentModal(record)"
                                class="btn btn-info bg-blue-800 text-white font-semibold px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600">
                                Make Payment
                            </button>
                        </td>
                        <td class="px-4">
                            <button @click="openSavePaymentModal(record)"
                                class="btn btn-warning bg-blue-800 text-white font-semibold px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600">
                                Save Payment
                            </button>
                        </td>
                    </tr>

                    <!-- Payments for the current record -->
                    <tr v-for="payment in record.payments" :key="payment.id" class="bg-white hover:bg-gray-50">
                        <td colspan="7" class="px-4 py-3 grid grid-cols-5 gap-6 text-sm pl-8">
                            <td class="px-4"><span><strong>Date:</strong> {{ payment.payment_date }}</span></td>
                            <td class="px-4"><span><strong>Amount:</strong> {{ formatPrice(payment.payment_amount) }} UZS</span></td>
                            <td class="px-4"><span><strong>Method:</strong> {{ payment.payment_method }}</span></td>
                            <td class="px-4"><span><strong>Reference:</strong> {{ payment.payment_reference }}</span></td>
                            <td class="px-4"><span><strong>Customer Debt:</strong> {{ formatPrice(payment.payment_record_customer_debt) }} UZS</span></td>
                        </td>
                    </tr>

                    <!-- Return Payments for the current record -->
                    <tr v-for="returnPayment in record.return_payments" :key="returnPayment.id" class="bg-gray-50 hover:bg-grey-100">
                        <td colspan="9" class="px-4 py-3 grid grid-cols-5 gap-6 text-sm pl-8">
                            <td class="px-4"><span><strong>Date:</strong> {{ returnPayment.return_date }}</span></td>
                            <td class="px-4"><span><strong>Amount:</strong> {{ formatPrice(returnPayment.return_amount) }} UZS</span></td>
                            <td class="px-4"><span><strong>Method:</strong> {{ returnPayment.return_method }}</span></td>
                            <td class="px-4"><span><strong>Reference:</strong> {{ returnPayment.return_reference }}</span></td>
                            <td class="px-4"><span><strong>Notes:</strong> {{ returnPayment.return_notes || 'N/A' }}</span></td>
                        </td>
                    </tr>
                </template>
            </tbody>
        </table>
    </div>
</template>

<script setup>
const props = defineProps({
    records: Array
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
    background-color: #f7fafc;
}

tbody tr:hover {
    background-color: #f0f4f8;
}

.table-auto {
    margin-bottom: 2rem;
}
</style>
