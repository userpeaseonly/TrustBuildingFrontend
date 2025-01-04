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
                    <th class="px-4 text-left">Debt</th>
                    <th class="px-4 text-left">excess</th>
                    <th class="px-4 text-left">Make / Type</th>
                    <th class="px-4 text-left">Save / Ref</th>
                </tr>
            </thead>
            <tbody>
                <template v-for="record in records" :key="record.id">
                    <!-- Main Payment Record Row -->
                    <tr class="border-t bg-gray-50 hover:bg-gray-100" :class="record.is_customer_debt_saved_to_next_month ? 'text-red-600' : 'text-green-600'"> 
                        <td class="px-4">{{ record.order }}</td>
                        <td class="px-4">{{ formatDate(record.date) }}</td>
                        <td class="px-4">{{ formatPrice(record.payment_amount_plan) }} UZS</td>
                        <td class="px-4"> - </td>
                        <td class="px-4">{{ formatPrice(record.customer_additional_payment >= 0 ? record.customer_additional_payment : 0) }} UZS</td>
                        <td class="px-4">{{ formatPrice(record.customer_additional_payment < 0 ? record.customer_additional_payment * -1 : 0) }} UZS</td>
                        <td class="">
                            <div class="inline-flex items-center border border-gray-300 rounded-md overflow-hidden">
                                <button @click="openMakePaymentModal(record)"
                                    class="bg-green-800 text-white font-semibold px-4 py-2 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-600">
                                    Pay
                                </button>
                            <div class="border-l border-gray-300"></div>
                                <button @click="openReturnPaymentModal(record)"
                                    class="bg-red-800 text-white font-semibold px-4 py-2 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-600">
                                    Return
                                </button>
                            </div>
                        </td>
                        <td class="pr-4">
                            <button @click="openSavePaymentModal(record)"
                                class="btn btn-warning bg-lime-800 text-white font-semibold px-4 py-2 rounded hover:bg-lime-600 focus:outline-none focus:ring-2 focus:ring-lime-600">
                                Save
                            </button>
                        </td>
                    </tr>

                    <!-- Payments for the current record -->
                    <tr v-for="payment in record.payments" :key="payment.id" class="bg-white hover:bg-gray-50">
                        <td class="px-4"> - </td>
                        <td class="px-4"><span><strong></strong> {{ formatDate(payment.payment_date) }}</span></td>
                        <td class="px-4"> - </td>
                        <td class="px-4"><span><strong></strong> {{ formatPrice(payment.payment_amount) }} UZS</span></td>
                        <td class="px-4"><span><strong></strong> {{ formatPrice(payment.payment_record_customer_debt >= 0 ? payment.payment_record_customer_debt : 0) }} UZS</span></td>
                        <td class="px-4"><span><strong></strong> {{ formatPrice(payment.payment_record_customer_debt < 0 ? payment.payment_record_customer_debt * -1 : 0) }} UZS</span></td>
                        <td class="px-4"><span><strong></strong> {{ payment.payment_method }}</span></td>
                        <td class="px-4"><span><strong></strong> {{ payment.payment_reference }}</span></td>
                    </tr>

                    <!-- Return Payments for the current record -->
                    <tr v-for="returnPayment in record.return_payments" :key="returnPayment.id" class="bg-yellow-50 hover:bg-yellow-100">
                        <td class="px-4"> - </td>
                        <td class="px-4"><span>{{ formatDate(returnPayment.return_date) }}</span></td>
                        <td class="px-4"> - </td>
                        <td class="px-4"><span><strong>Returned:</strong> {{ formatPrice(returnPayment.return_amount) }} UZS</span></td>
                        <td class="px-4"><span> {{ returnPayment.payment_record_customer_debt >= 0 ? returnPayment.payment_record_customer_debt : 0 }} </span></td>
                        <td class="px-4"><span> {{ returnPayment.payment_record_customer_debt < 0 ? returnPayment.payment_record_customer_debt * -1 : 0 }} </span></td>
                        <td class="px-4"><span> {{ returnPayment.return_method }}</span></td>
                        <td class="px-4"><span> {{ returnPayment.return_reference }}</span></td>
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

const emit = defineEmits(['openPaymentModal', 'openSavePaymentModal', 'openReturnPaymentModal']);

// Helper function to format prices
const formatPrice = (price) => new Intl.NumberFormat('uz-UZ').format(price);

// Emit event to parent to open the payment modal
const openMakePaymentModal = (record) => {
    emit('openPaymentModal', record);
};

// Helper function to format dates
const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
};

const openSavePaymentModal = (record) => {
    emit('openSavePaymentModal', record);
};

const openReturnPaymentModal = (record) => {
    emit('openReturnPaymentModal', record);
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
