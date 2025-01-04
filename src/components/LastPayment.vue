<template>
    <div class="card mb-4 shadow-lg rounded-lg border-0">
        <div class="card-body p-6 bg-white rounded-lg">
            <h5 class="card-title text-primary d-flex align-items-center mb-3">
                <i class="bi bi-wallet-fill me-2"></i> Last Payment
            </h5>
            <table class="w-full table-auto text-left border-collapse">
                <thead class="bg-blue-500 text-white">
                    <tr>
                        <th class="px-4 py-2 border">Date</th>
                        <th class="px-4 py-2 border">Amount</th>
                        <th class="px-4 py-2 border">Method</th>
                        <th class="px-4 py-2 border">Reference</th>
                        <th class="px-4 py-2 border">Payment Status</th>
                    </tr>
                </thead>
                <tbody>
                    <tr class="bg-white hover:bg-gray-50">
                        <td class="px-4 py-2 border">{{ formatDate(payment.payment_date) }}</td>
                        <td class="px-4 py-2 border">{{ formatPrice(payment.payment_amount) }} UZS</td>
                        <td class="px-4 py-2 border">{{ payment.payment_method }}</td>
                        <td class="px-4 py-2 border">{{ payment.payment_reference }}</td>
                        <td class="px-4 py-2 border">
                            <span v-if="payment.payment_paid" class="inline-block px-2 py-1 text-sm font-semibold text-white bg-green-500 rounded">Paid</span>
                            <span v-else class="inline-block px-2 py-1 text-sm font-semibold text-white bg-red-500 rounded">Unpaid</span>
                        </td>
                    </tr>
                </tbody>
            </table>
            <!-- Update Button -->
            <button class="btn btn-primary mt-4 px-4 py-2 font-semibold text-white bg-blue-600 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50" @click="openUpdateModal">
                Update Last Payment
            </button>
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    payment: Object
});

const emit = defineEmits(['openUpdateModal']);

const formatPrice = (price) => new Intl.NumberFormat('uz-UZ').format(price);

// Helper function to format dates
const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
};


// Emit event to parent to open the update modal with payment details
const openUpdateModal = () => {
    emit('openUpdateModal', props.payment); // Pass the payment object
};
</script>

<style scoped>
.card {
    border-radius: 15px;
    box-shadow: 0 6px 10px rgba(0, 0, 0, 0.1);
}

.card-body {
    padding: 20px;
}

.card-title {
    font-size: 1.5rem;
    font-weight: bold;
}

.table-auto th,
.table-auto td {
    padding: 0.75rem;
    border: 1px solid #e5e7eb;
    white-space: nowrap;
}

.table-auto tbody tr:hover {
    background-color: #f0f4f8;
}

.btn {
    transition: background-color 0.3s ease;
}
</style>
