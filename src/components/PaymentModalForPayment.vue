<template>
    <div class="modal fade show d-block" tabindex="-1">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">{{ $t('message.make_payment') }}</h5>
                    <button type="button" class="btn-close" @click="closeModal"></button>
                </div>
                <div class="modal-body">
                    <form @submit.prevent="submitPayment">
                        <div class="mb-3">
                            <label for="paymentDate" class="form-label">{{ $t('message.payment_date') }}</label>
                            <input v-model="paymentData.payment_date" type="date" class="form-control" required />
                        </div>

                        <div class="mb-3">
                            <label for="paymentAmount" class="form-label">{{ $t('message.payment_amount') }}</label>
                            <input v-model="paymentData.payment_amount" type="text" class="form-control" required />
                        </div>

                        <div class="mb-3">
                            <label for="paymentMethod" class="form-label">{{ $t('message.payment_method') }}</label>
                            <select v-model="paymentData.payment_method" class="form-control">
                                <option value="CASH">{{ $t('message.cash') }}</option>
                                <option value="BANK_TRANSFER">{{ $t('message.bank_transfer') }}</option>
                                <option value="TERMINAL">{{ $t('message.terminal') }}</option>
                                <option value="MATERIAL">{{ $t('message.material') }}</option>
                                <option value="OTHER">{{ $t('message.other') }}</option>
                            </select>
                        </div>

                        <div class="mb-3">
                            <label for="paymentReference" class="form-label">{{ $t('message.payment_reference') }}</label>
                            <input v-model="paymentData.payment_reference" type="text" class="form-control" />
                        </div>

                        <button type="submit" class="btn btn-primary">{{ $t('message.submit_payment') }}</button>
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