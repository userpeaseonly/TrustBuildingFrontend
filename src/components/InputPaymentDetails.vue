<!-- src/components/InputPaymentDetails.vue -->
<template>
<div>
    <!-- Checkbox to toggle payment details -->
    <div class="form-check">
    <input
        type="checkbox"
        class="form-check-input"
        v-model="showPaymentDetails"
        id="togglePaymentDetails"
    />
    <label class="form-check-label" for="togglePaymentDetails">
        Include {{ title }} Payment
    </label>
    </div>

    <!-- Payment details form (shown if checkbox is checked) -->
    <div v-if="showPaymentDetails" class="mt-3">
    <div class="mb-3">
        <label for="paymentDate" class="form-label">Payment Date</label>
        <input
        type="date"
        v-model="payment.payment_date"
        class="form-control"
        id="paymentDate"
        required
        />
    </div>

    <div class="mb-3">
        <label for="paymentAmount" class="form-label">Payment Amount</label>
        <input
        type="text"
        v-model="payment.payment_amount"
        class="form-control"
        id="paymentAmount"
        required
        />
    </div>

    <div class="mb-3">
        <label for="paymentMethod" class="form-label">Payment Method</label>
        <input
        type="text"
        v-model="payment.payment_method"
        class="form-control"
        id="paymentMethod"
        required
        />
    </div>

    <div class="mb-3">
        <label for="paymentReference" class="form-label">Payment Reference</label>
        <input
        type="text"
        v-model="payment.payment_reference"
        class="form-control"
        id="paymentReference"
        required
        />
    </div>

    <div class="mb-3">
        <label for="paymentNotes" class="form-label">Payment Notes</label>
        <textarea
        v-model="payment.payment_notes"
        class="form-control"
        id="paymentNotes"
        ></textarea>
    </div>

    <div class="form-check mb-3">
        <input
        type="checkbox"
        class="form-check-input"
        v-model="payment.payment_paid"
        id="paymentPaid"
        />
        <label class="form-check-label" for="paymentPaid">
        Payment Completed
        </label>
    </div>
    </div>
</div>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps({
title: {
    type: String,
    required: true,
},
payment: {
    type: Object,
    required: true,
},
isIncluded: {
    type: Boolean,
    default: false,
},
});

const showPaymentDetails = ref(props.isIncluded);
</script>

<style scoped>
.form-check-input {
margin-right: 10px;
}
</style>
