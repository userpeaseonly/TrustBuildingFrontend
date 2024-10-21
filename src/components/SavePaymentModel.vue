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
                        <!-- Non-field errors -->
                        <div v-if="errors?.non_field_errors" class="alert alert-danger">
                            {{ errors.non_field_errors[0] }}
                        </div>

                        <div v-if="errors?.payment_record_id" class="invalid-feedback">
                            {{ errors.payment_record_id }}
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
    payment_record_id: props.paymentRecord.id,
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
