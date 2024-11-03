<template>
    <div class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div class="bg-white rounded-lg shadow-lg w-full max-w-md mx-auto">
            <div class="border-b p-4 flex justify-between items-center">
                <h5 class="text-xl font-bold text-gray-700">Update Payment</h5>
                <button type="button" @click="emit('close')" class="text-gray-500 hover:text-gray-700">
                    <i class="bi bi-x-lg"></i>
                </button>
            </div>
            <div class="p-6">
                <form @submit.prevent="submitForm">
                    <!-- Payment Method -->
                    <div class="mb-4">
                        <label for="paymentMethod" class="block text-sm font-medium text-gray-700 mb-1">Payment Method</label>
                        <select v-model="paymentData.payment_method" id="paymentMethod" class="block w-full px-3 py-2 border rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            :class="{ 'border-red-500': errors?.payment_method }" required>
                            <option value="CASH">Cash</option>
                            <option value="BANK_TRANSFER">Bank Transfer</option>
                            <option value="TERMINAL">Terminal</option>
                            <option value="MATERIAL">Material</option>
                            <option value="OTHER">Other</option>
                        </select>
                        <div v-if="errors?.payment_method" class="text-red-500 text-sm mt-1">
                            {{ errors.payment_method[0] }}
                        </div>
                    </div>

                    <!-- Payment Reference -->
                    <div class="mb-4">
                        <label for="paymentReference" class="block text-sm font-medium text-gray-700 mb-1">Payment Reference</label>
                        <input v-model="paymentData.payment_reference" type="text" id="paymentReference" class="block w-full px-3 py-2 border rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            :class="{ 'border-red-500': errors?.payment_reference }" />
                        <div v-if="errors?.payment_reference" class="text-red-500 text-sm mt-1">
                            {{ errors.payment_reference[0] }}
                        </div>
                    </div>

                    <!-- Payment Notes -->
                    <div class="mb-4">
                        <label for="paymentNotes" class="block text-sm font-medium text-gray-700 mb-1">Payment Notes</label>
                        <textarea v-model="paymentData.payment_notes" id="paymentNotes" class="block w-full px-3 py-2 border rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            :class="{ 'border-red-500': errors?.payment_notes }"></textarea>
                        <div v-if="errors?.payment_notes" class="text-red-500 text-sm mt-1">
                            {{ errors.payment_notes[0] }}
                        </div>
                    </div>

                    <!-- Payment Paid Checkbox -->
                    <div class="mb-4">
                        <div class="flex items-center">
                            <input type="checkbox" v-model="paymentData.payment_paid" id="paymentPaid" class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded">
                            <label for="paymentPaid" class="ml-2 block text-sm text-gray-700">Payment Paid</label>
                        </div>
                    </div>

                    <!-- Non-field errors -->
                    <div v-if="errors?.non_field_errors" class="bg-red-100 text-red-600 p-3 rounded mb-4">
                        {{ errors.non_field_errors[0] }}
                    </div>

                    <!-- Form Buttons -->
                    <div class="border-t pt-4 flex justify-end space-x-4">
                        <button type="button" @click="emit('close')" class="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 focus:outline-none focus:ring focus:ring-gray-300">
                            Cancel
                        </button>
                        <button type="submit" class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300">
                            Submit Payment Update
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';

const emit = defineEmits(['close', 'submit']);
const props = defineProps({
    paymentData: {
        type: Object,
        required: true,
    },
    errors: {
        type: Object,
        default: () => ({}),
    }
});

// Initialize paymentData as a reactive object
const paymentData = ref({ ...props.paymentData });

// Submit form method to emit the updated paymentData
const submitForm = () => {
    emit('submit', paymentData.value);
};
</script>

<style scoped>
.modal {
    display: flex;
    align-items: center;
    justify-content: center;
}

.modal-content {
    max-width: 500px;
    width: 100%;
}
</style>
