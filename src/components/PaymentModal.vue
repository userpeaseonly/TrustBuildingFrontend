<template>
    <div class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div class="bg-white rounded-lg shadow-lg w-full max-w-md mx-auto">
            <div class="border-b p-4 flex justify-between items-center">
                <h5 class="text-xl font-bold text-gray-700">Make Payment</h5>
                <button type="button" @click="emit('close')" class="text-gray-500 hover:text-gray-700">
                    <i class="bi bi-x-lg"></i>
                </button>
            </div>
            <div class="p-6">
                <form @submit.prevent="submitForm">
                    <div class="mb-4">
                        <label for="paymentAmount" class="block text-sm font-medium text-gray-700 mb-1">Payment
                            Amount</label>
                        <input v-model="paymentData.payment_amount" type="number" id="paymentAmount"
                            class="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
                            :class="{ 'border-red-500': errors?.payment_amount }" required />
                        <p v-if="errors?.payment_amount" class="text-red-500 text-sm mt-1">{{ errors.payment_amount[0]
                            }}</p>
                    </div>

                    <div class="mb-4">
                        <label for="paymentMethod" class="block text-sm font-medium text-gray-700 mb-1">Payment
                            Method</label>
                        <select v-model="paymentData.payment_method" id="paymentMethod"
                            class="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
                            :class="{ 'border-red-500': errors?.payment_method }" required>
                            <option value="CASH">CASH</option>
                            <option value="BANK_TRANSFER">BANK TRANSFER</option>
                            <option value="TERMINAL">TERMINAL</option>
                            <option value="MATERIAL">MATERIAL</option>
                            <option value="OTHER">OTHER</option>
                        </select>
                        <p v-if="errors?.payment_method" class="text-red-500 text-sm mt-1">{{ errors.payment_method[0]
                            }}</p>
                    </div>

                    <div class="mb-4">
                        <label for="paymentReference" class="block text-sm font-medium text-gray-700 mb-1">Payment
                            Reference</label>
                        <input v-model="paymentData.payment_reference" type="text" id="paymentReference"
                            class="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
                            :class="{ 'border-red-500': errors?.payment_reference }" />
                        <p v-if="errors?.payment_reference" class="text-red-500 text-sm mt-1">{{
                            errors.payment_reference[0] }}</p>
                    </div>

                    <div class="mb-4">
                        <label for="paymentDate" class="block text-sm font-medium text-gray-700 mb-1">Payment
                            Date</label>
                        <div class="flex items-center space-x-4">
                            <input v-model="paymentData.payment_date" type="date" id="paymentDate"
                                class="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
                                :disabled="!isDateChangeAllowed" :class="{ 'border-red-500': errors?.payment_date }" />
                            <div class="flex items-center">
                                <input type="checkbox" v-model="isDateChangeAllowed"
                                    class="mr-2 focus:ring focus:border-blue-300" />
                                <span class="text-sm text-gray-600">Allow date change</span>
                            </div>
                        </div>
                        <p v-if="errors?.payment_date" class="text-red-500 text-sm mt-1">{{ errors.payment_date[0] }}
                        </p>
                    </div>

                    <div v-if="errors?.non_field_errors" class="bg-red-100 text-red-600 p-3 rounded mb-4">
                        {{ errors.non_field_errors[0] }}
                    </div>

                    <div class="border-t pt-4 flex justify-end space-x-4">
                        <button type="button" @click="emit('close')"
                            class="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 focus:outline-none focus:ring focus:ring-gray-300">
                            Cancel
                        </button>
                        <button type="submit"
                            class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300">
                            Submit Payment
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, watch } from 'vue';

const emit = defineEmits(['close', 'submit']);
const props = defineProps({
    paymentRecord: {
        type: Object,
        required: true,
    },
    errors: {
        type: Object,
        default: null,
    }
});

const paymentData = ref({
    payment_date: new Date().toISOString().substr(0, 10),
    payment_amount: '',
    payment_method: 'CASH',
    payment_reference: '',
    payment_record: props.paymentRecord.id,
});

const isDateChangeAllowed = ref(false);

watch(isDateChangeAllowed, (newVal) => {
    if (!newVal) {
        paymentData.value.payment_date = new Date().toISOString().substr(0, 10);
    }
});

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
