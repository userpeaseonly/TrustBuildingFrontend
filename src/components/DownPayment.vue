<template>
    <div class="card mb-4 shadow-sm">
        <div class="card-body">
            <h5 class="card-title">Down Payment</h5>
            <table class="table table-bordered">
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Amount</th>
                        <th>Method</th>
                        <th>Reference</th>
                        <th>Payment Status</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{{ payment.payment_date }}</td>
                        <td>{{ formatPrice(payment.payment_amount) }} UZS</td>
                        <td>{{ payment.payment_method }}</td>
                        <td>{{ payment.payment_reference }}</td>
                        <td>
                            <span v-if="payment.payment_paid" class="badge bg-success">Paid</span>
                            <span v-else class="badge bg-danger">Unpaid</span>
                        </td>
                    </tr>
                </tbody>
            </table>
            <!-- Update Button -->
            <button class="btn btn-primary mt-3" @click="openUpdateModal">Update Down Payment</button>
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    payment: Object
});

const emit = defineEmits(['openUpdateModal']);

const formatPrice = (price) => new Intl.NumberFormat('uz-UZ').format(price);

// Emit event to parent to open the update modal with payment details
const openUpdateModal = () => {
    emit('openUpdateModal', props.payment); // Pass the payment object
};
</script>
