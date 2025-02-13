<template>
    <div class="bg-white shadow-lg rounded-lg mb-6">
        <div class="p-6">
            <h5 class="text-xl font-bold text-indigo-700 mb-4">{{ $t('message.down_payment') }}</h5>
            <div class="overflow-x-auto">
                <table class="min-w-full bg-white border-collapse border border-gray-200">
                    <thead class="bg-indigo-100 text-indigo-800">
                        <tr>
                            <th class="border border-gray-200 px-4 py-2 text-left">{{ $t('message.date') }}</th>
                            <th class="border border-gray-200 px-4 py-2 text-left">{{ $t('message.amount') }}</th>
                            <th class="border border-gray-200 px-4 py-2 text-left">{{ $t('message.method') }}</th>
                            <th class="border border-gray-200 px-4 py-2 text-left">{{ $t('message.reference') }}</th>
                            <th class="border border-gray-200 px-4 py-2 text-left">{{ $t('message.payment_status') }}</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr class="bg-white hover:bg-gray-50">
                            <td class="border border-gray-200 px-4 py-3">{{ formatDate(payment.payment_date) }}</td>
                            <td class="border border-gray-200 px-4 py-3">{{ formatPrice(payment.payment_amount) }} UZS</td>
                            <td class="border border-gray-200 px-4 py-3">{{ payment.payment_method }}</td>
                            <td class="border border-gray-200 px-4 py-3">{{ payment.payment_reference }}</td>
                            <td class="border border-gray-200 px-4 py-3">
                                <span v-if="payment.payment_paid" class="inline-block px-3 py-1 rounded-full text-sm font-semibold bg-green-100 text-green-800">{{ $t('message.paid') }}</span>
                                <span v-else class="inline-block px-3 py-1 rounded-full text-sm font-semibold bg-red-100 text-red-800">{{ $t('message.unpaid') }}</span>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <!-- Update Button -->
            <button class="mt-6 px-6 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-600" @click="openUpdateModal">
                {{ $t('message.update_down_payment') }}
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
/* No additional styles needed as Tailwind CSS is utilized for all styling */
</style>
