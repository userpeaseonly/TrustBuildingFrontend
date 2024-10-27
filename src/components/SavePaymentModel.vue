<template>
    <div class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div class="bg-white rounded-lg shadow-lg w-full max-w-md mx-auto">
            <div class="border-b p-4 flex justify-between items-center">
                <h5 class="text-xl font-bold text-gray-700">Save Payment</h5>
                <button type="button" @click="emit('close')" class="text-gray-500 hover:text-gray-700">
                    <i class="bi bi-x-lg"></i>
                </button>
            </div>
            <div class="p-6">
                <form @submit.prevent="submitForm">
                    <!-- Non-field errors -->
                    <div v-if="errors?.non_field_errors" class="bg-red-100 text-red-600 p-3 rounded mb-4">
                        {{ errors.non_field_errors[0] }}
                    </div>

                    <!-- Payment Record ID Error -->
                    <div v-if="errors?.payment_record_id" class="text-red-500 text-sm mb-4">
                        {{ errors.payment_record_id }}
                    </div>

                    <!-- Form Buttons -->
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
import { ref } from 'vue';

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
    payment_record_id: props.paymentRecord.id,
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
