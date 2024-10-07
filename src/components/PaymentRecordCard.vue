<!-- src/components/PaymentRecordCard.vue -->
<template>
    <div class="card mb-4 shadow-sm">
        <div class="card-body">
            <h5 class="card-title">Payment Record #{{ record.order }}</h5>
            <p class="card-text"><strong>Date:</strong> {{ record.date }}</p>
            <p class="card-text"><strong>Planned Payment:</strong> {{ formatPrice(record.payment_amount_plan) }} UZS</p>
            <p class="card-text"><strong>Paid:</strong> {{ formatPrice(record.payment_amount_paid) }} UZS</p>
            <p class="card-text"><strong>Customer Debt:</strong> {{ formatPrice(record.customer_debt) }} UZS</p>
            <p class="card-text"><strong>Debt Saved to Next Month:</strong> {{
                record.is_customer_debt_saved_to_next_month ? 'Yes' : 'No' }}</p>

            <!-- Payments under each record -->
            <div v-if="record.payments.length > 0">
                <h6 class="mt-3">Payments:</h6>
                <ul class="list-group">
                    <li v-for="payment in record.payments" :key="payment.id" class="list-group-item">
                        <p class="mb-1"><strong>Date:</strong> {{ payment.payment_date }}</p>
                        <p class="mb-1"><strong>Amount:</strong> {{ formatPrice(payment.payment_amount) }} UZS</p>
                        <p class="mb-1"><strong>Method:</strong> {{ payment.payment_method }}</p>
                        <p class="mb-1"><strong>Reference:</strong> {{ payment.payment_reference }}</p>
                    </li>
                </ul>
            </div>

            <!-- Make Payment Button -->
            <button @click="openMakePaymentModal(record)" class="btn btn-primary mt-3">Make Payment</button>
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    record: {
        type: Object,
        required: true,
    },
});

// Emit the event to parent component (PaymentRecords.vue)
const emit = defineEmits(['openPaymentModal']);

// Format price helper function
const formatPrice = (price) => {
    return new Intl.NumberFormat('uz-UZ').format(price);
};

// Emit event to open the payment modal in the parent component
const openMakePaymentModal = (record) => {
    emit('openPaymentModal', record);
};
</script>

<style scoped>
.card {
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
</style>
