<template>
    <div class="modal fade show d-block" tabindex="-1">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Make Payment</h5>
                    <button type="button" class="btn-close" @click="closeModal"></button>
                </div>
                <div class="modal-body">
                    <form @submit.prevent="submitPayment">
                        <div class="mb-3">
                            <label for="paymentDate" class="form-label">Payment Date</label>
                            <input v-model="paymentData.payment_date" type="date" class="form-control" required />
                        </div>

                        <div class="mb-3">
                            <label for="paymentAmount" class="form-label">Payment Amount</label>
                            <input v-model="paymentData.payment_amount" type="text" class="form-control" required />
                        </div>

                        <div class="mb-3">
                            <label for="paymentMethod" class="form-label">Payment Method</label>
                            <select v-model="paymentData.payment_method" class="form-control">
                                <option value="CASH">Cash</option>
                                <option value="BANK_TRANSFER">Bank Transfer</option>
                                <option value="TERMINAL">Terminal</option>
                                <option value="MATERIAL">Material</option>
                                <option value="OTHER">Other</option>
                            </select>
                        </div>

                        <div class="mb-3">
                            <label for="paymentReference" class="form-label">Payment Reference</label>
                            <input v-model="paymentData.payment_reference" type="text" class="form-control" />
                        </div>

                        <button type="submit" class="btn btn-primary">Submit Payment</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps({
    contract: {
        type: Object,
        required: true
    }
});

const emit = defineEmits(['close', 'submitPayment']);

const paymentData = ref({
    payment_date: new Date().toISOString().substr(0, 10),
    payment_amount: '',
    payment_method: 'CASH',
    payment_reference: '',
    contract: props.contract.id // The ID of the selected contract
});

const closeModal = () => {
    emit('close');
};

const submitPayment = () => {
    emit('submitPayment', paymentData.value);
};
</script>

<style scoped>
.modal {
    display: block;
}

.modal-backdrop {
    background-color: rgba(0, 0, 0, 0.5);
}
</style>