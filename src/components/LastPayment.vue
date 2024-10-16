<!-- src/components/LastPayment.vue -->
<template>
    <div class="card mb-4 shadow-sm">
        <div class="card-body">
            <h5 class="card-title">Last Payment</h5>
            <table class="table table-bordered">
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Amount</th>
                        <th>Method</th>
                        <th>Reference</th>
                        <th>Paid</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{{ payment.payment_date }}</td>
                        <td>{{ formatPrice(payment.payment_amount) }} UZS</td>
                        <td>{{ payment.payment_method }}</td>
                        <td>{{ payment.payment_reference }}</td>
                        <td><span v-if="payment.payment_paid" class="badge bg-success">Paid</span><span v-else class="badge bg-danger">Unpaid</span></td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>


<script setup>
const props = defineProps({
    payment: {
        type: Object,
        required: true
    }
});

// Helper function to format prices
const formatPrice = (price) => {
    return new Intl.NumberFormat('uz-UZ').format(price);
};
</script>

<style scoped>
.card {
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
</style>