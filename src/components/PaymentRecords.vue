<template>
    <div>
        <h4>Payment Records</h4>
        <div v-if="records.length === 0" class="alert alert-info">
            No payment records found.
        </div>
        <PaymentRecordCard
            v-for="record in records"
            :key="record.id"
            :record="record"
            @openPaymentModal="emitOpenPaymentModal"
        />
    </div>
</template>

<script setup>
import PaymentRecordCard from '@/components/PaymentRecordCard.vue';
const props = defineProps({
    records: Array
});

const emit = defineEmits(['openPaymentModal']);

// Emit to parent the payment record to open modal
const emitOpenPaymentModal = (record) => {
    emit('openPaymentModal', record);
};
</script>
