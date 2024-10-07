<!-- src/components/PaymentModal.vue -->
<template>
    <div class="modal fade show d-block" tabindex="-1" aria-modal="true" role="dialog">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Make Payment</h5>
                    <button type="button" class="btn-close" @click="emit('close')"></button>
                </div>
                <div class="modal-body">
                    <form @submit.prevent="submitForm">
                        <div class="mb-3">
                            <label for="paymentAmount" class="form-label">Payment Amount</label>
                            <input v-model="paymentData.payment_amount" type="number" id="paymentAmount"
                                class="form-control" :class="{ 'is-invalid': errors?.payment_amount }" required />
                            <div v-if="errors?.payment_amount" class="invalid-feedback">
                                {{ errors.payment_amount[0] }}
                            </div>
                        </div>

                        <div class="mb-3">
                            <label for="paymentMethod" class="form-label">Payment Method</label>
                            <select v-model="paymentData.payment_method" id="paymentMethod" class="form-control"
                                :class="{ 'is-invalid': errors?.payment_method }" required>
                                <option value="CASH">CASH</option>
                                <option value="BANK_TRANSFER">BANK TRANSFER</option>
                                <option value="TERMINAL">TERMINAL</option>
                                <option value="MATERIAL">MATERIAL</option>
                                <option value="OTHER">OTHER</option>
                            </select>
                            <div v-if="errors?.payment_method" class="invalid-feedback">
                                {{ errors.payment_method[0] }}
                            </div>
                        </div>

                        <div class="mb-3">
                            <label for="paymentReference" class="form-label">Payment Reference</label>
                            <input v-model="paymentData.payment_reference" type="text" id="paymentReference"
                                class="form-control" :class="{ 'is-invalid': errors?.payment_reference }" />
                            <div v-if="errors?.payment_reference" class="invalid-feedback">
                                {{ errors.payment_reference[0] }}
                            </div>
                        </div>
<!-- 
                        <div class="mb-3">
                            <label for="paymentNotes" class="form-label">Payment Note</label>
                            <input v-model="paymentData.payment_notes" type="text" id="paymentNotes"
                                class="form-control" :class="{ 'is-invalid': errors?.payment_notes }" />
                            <div v-if="errors?.payment_notes" class="invalid-feedback">
                                {{ errors.payment_notes[0] }}
                            </div>
                        </div> -->

                        <div class="mb-3">
                            <label for="paymentDate" class="form-label">Payment Date</label>
                            <div class="input-group">
                                <input v-model="paymentData.payment_date" type="date" id="paymentDate"
                                    class="form-control" :disabled="!isDateChangeAllowed"
                                    :class="{ 'is-invalid': errors?.payment_date }" />
                                <div class="input-group-text">
                                    <input type="checkbox" v-model="isDateChangeAllowed" /> Allow date change
                                </div>
                                <div v-if="errors?.payment_date" class="invalid-feedback">
                                    {{ errors.payment_date[0] }}
                                </div>
                            </div>
                        </div>

                        <!-- Non-field errors -->
                        <div v-if="errors?.non_field_errors" class="alert alert-danger">
                            {{ errors.non_field_errors[0] }}
                        </div>

                        <div class="modal-footer">
                            <button type="submit" class="btn btn-primary">Submit Payment</button>
                            <button type="button" class="btn btn-secondary" @click="emit('close')">Cancel</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, watch, defineEmits, defineProps } from 'vue';

const emit = defineEmits(['close', 'submit']);
const props = defineProps({
    paymentRecord: {
        type: Object,
        required: true,
    },
    errors: { // Receive backend errors as a prop
        type: Object,
        default: null,
    }
});

const paymentData = ref({
    payment_date: new Date().toISOString().substr(0, 10), // Default to today's date
    payment_amount: '',
    payment_method: 'CASH',
    payment_reference: '',
    // payment_notes: '',
    payment_record: props.paymentRecord.id,
});

const isDateChangeAllowed = ref(false);

// If the date change checkbox is unchecked, set the payment date to today
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
    display: block;
}

.modal-backdrop {
    background-color: rgba(0, 0, 0, 0.5);
}
</style>
