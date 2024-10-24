<!-- src/components/PaymentUpdateModal.vue -->
<template>
    <div class="modal fade show d-block" tabindex="-1" aria-modal="true" role="dialog">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Update Payment</h5>
                    <button type="button" class="btn-close" @click="emit('close')"></button>
                </div>
                <div class="modal-body">
                    <form @submit.prevent="submitForm">
                        <div class="mb-3">
                            <label for="paymentMethod" class="form-label">Payment Method</label>
                            <select v-model="paymentData.payment_method" id="paymentMethod" class="form-control"
                                :class="{ 'is-invalid': errors?.payment_method }" required>
                                <option value="CASH">Cash</option>
                                <option value="BANK_TRANSFER">Bank Transfer</option>
                                <option value="TERMINAL">Terminal</option>
                                <option value="MATERIAL">Material</option>
                                <option value="OTHER">Other</option>
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

                        <div class="mb-3">
                            <label for="paymentNotes" class="form-label">Payment Notes</label>
                            <textarea v-model="paymentData.payment_notes" id="paymentNotes" class="form-control"
                                :class="{ 'is-invalid': errors?.payment_notes }"></textarea>
                            <div v-if="errors?.payment_notes" class="invalid-feedback">
                                {{ errors.payment_notes[0] }}
                            </div>
                        </div>

                        <div class="mb-3">
                            <label for="paymentPaid" class="form-label">Payment Paid</label>
                            <input type="checkbox" v-model="paymentData.payment_paid" id="paymentPaid" />
                        </div>

                        <!-- Non-field errors -->
                        <div v-if="errors?.non_field_errors" class="alert alert-danger">
                            {{ errors.non_field_errors[0] }}
                        </div>

                        <div class="modal-footer">
                            <button type="submit" class="btn btn-primary">Submit Payment Update</button>
                            <button type="button" class="btn btn-secondary" @click="emit('close')">Cancel</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, defineProps, defineEmits } from 'vue';

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
