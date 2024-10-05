<template>
<div class="d-flex">
    <!-- Sidebar -->
    <StaffSidebar />

    <!-- Main Content Area -->
    <div class="container mt-5" style="flex: 1;">
    <h2 class="mb-4 text-center">Contract Details</h2>
    
    <!-- Back button -->
    <button class="btn btn-secondary mb-4" @click="goBack">Back to Contracts</button>

    <div v-if="loadingContract" class="text-center my-5">
        <div class="spinner-border" role="status">
        <span class="sr-only">Loading...</span>
        </div>
    </div>
    <div v-else-if="errorContract" class="alert alert-danger text-center">
        {{ errorContract }}
    </div>
    <div v-else>
        <!-- Contract Details Section -->
        <div class="card mb-4 shadow-sm">
        <div class="card-body">
            <h5 class="card-title">Contract #{{ contract.id }}</h5>
            <p class="card-text"><strong>Contract Date:</strong> {{ contract.contract_date }}</p>
            <p class="card-text"><strong>Status:</strong> {{ contract.status }}</p>
            <p class="card-text"><strong>Price per Square:</strong> {{ formatPrice(contract.price_per_square) }} UZS</p>
            <p class="card-text"><strong>Contract Amount:</strong> {{ formatPrice(contract.contract_amount) }} UZS</p>
            <p class="card-text"><strong>Payment Months:</strong> {{ contract.payment_months }}</p>
            <p class="card-text"><strong>Monthly Payment:</strong> {{ formatPrice(contract.monthly_payment) }} UZS</p>
        </div>
        </div>

        <!-- Optional Down Payment Section -->
        <div v-if="contract.downpayment" class="card mb-4 shadow-sm">
        <div class="card-body">
            <h5 class="card-title">Down Payment</h5>
            <p class="card-text"><strong>Date:</strong> {{ contract.downpayment.payment_date }}</p>
            <p class="card-text"><strong>Amount:</strong> {{ formatPrice(contract.downpayment.payment_amount) }} UZS</p>
            <p class="card-text"><strong>Method:</strong> {{ contract.downpayment.payment_method }}</p>
            <p class="card-text"><strong>Reference:</strong> {{ contract.downpayment.payment_reference }}</p>
            <p class="card-text"><strong>Paid:</strong> {{ contract.downpayment.payment_paid ? 'Yes' : 'No' }}</p>
        </div>
        </div>

        <!-- Optional Last Payment Section -->
        <div v-if="contract.lastpayment" class="card mb-4 shadow-sm">
        <div class="card-body">
            <h5 class="card-title">Last Payment</h5>
            <p class="card-text"><strong>Date:</strong> {{ contract.lastpayment.payment_date }}</p>
            <p class="card-text"><strong>Amount:</strong> {{ formatPrice(contract.lastpayment.payment_amount) }} UZS</p>
            <p class="card-text"><strong>Method:</strong> {{ contract.lastpayment.payment_method }}</p>
            <p class="card-text"><strong>Reference:</strong> {{ contract.lastpayment.payment_reference }}</p>
            <p class="card-text"><strong>Paid:</strong> {{ contract.lastpayment.payment_paid ? 'Yes' : 'No' }}</p>
        </div>
        </div>

        <!-- Payment Records Section -->
        <div class="mb-4">
        <h4>Payment Records</h4>
        <div v-if="contract.payment_records.length === 0" class="alert alert-info">
            No payment records found.
        </div>
        <div v-for="record in contract.payment_records" :key="record.id" class="card mb-4 shadow-sm">
            <div class="card-body">
            <h5 class="card-title">Payment Record #{{ record.order }}</h5>
            <p class="card-text"><strong>Date:</strong> {{ record.date }}</p>
            <p class="card-text"><strong>Planned Payment:</strong> {{ formatPrice(record.payment_amount_plan) }} UZS</p>
            <p class="card-text"><strong>Paid:</strong> {{ formatPrice(record.payment_amount_paid) }} UZS</p>
            <p class="card-text"><strong>Customer Debt:</strong> {{ formatPrice(record.customer_debt) }} UZS</p>
            <p class="card-text"><strong>Debt Saved to Next Month:</strong> {{ record.is_customer_debt_saved_to_next_month ? 'Yes' : 'No' }}</p>

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
            </div>
        </div>
        </div>
    </div>
    </div>
</div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import apiClient from '@/services/api';
import StaffSidebar from '@/components/StaffSidebar.vue';

const contract = ref(null);
const loadingContract = ref(true);
const errorContract = ref(null);

const route = useRoute();
const router = useRouter();

// Fetch contract details by contract ID
const fetchContractDetails = async () => {
try {
    const contractId = route.params.contract_id;
    const response = await apiClient.get(`/contracts/staff/contracts/${contractId}`);
    contract.value = response.data;
} catch (error) {
    errorContract.value = 'Failed to fetch contract details.';
} finally {
    loadingContract.value = false;
}
};

// Navigate back to contracts page
const goBack = () => {
router.push('/staff/contracts');
};

// Helper function to format prices
const formatPrice = (price) => {
return new Intl.NumberFormat('uz-UZ').format(price);
};

onMounted(() => {
fetchContractDetails();
});
</script>

<style scoped>
.container {
max-width: 1200px;
}

h2 {
font-weight: bold;
}

.card {
border-radius: 10px;
box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.card-title {
font-size: 1.25rem;
font-weight: bold;
}

.card-text {
font-size: 1rem;
}

.list-group-item {
border: 0;
}

.alert {
font-size: 1rem;
}

.back-btn {
margin-bottom: 20px;
}
</style>
