<template>
    <div class="d-flex">
        <StaffSidebar />
        <div class="container mt-5">
            <h2 class="mb-4">Payments</h2>

            <!-- Search Input -->
            <div class="input-group mb-4">
                <input type="text" v-model="searchQuery" @input="fetchCustomers" class="form-control"
                    placeholder="Search customers..." />
            </div>

            <!-- Customer List -->
            <div v-if="loadingCustomers" class="text-center">
                <div class="spinner-border" role="status"></div>
            </div>

            <div v-else-if="customers.length > 0" class="customer-list">
                <CustomerCard v-for="customer in customers" :key="customer.id" :customer="customer"
                    @selectCustomer="fetchContracts" />
            </div>

            <!-- Contract List -->
            <div v-if="selectedCustomer && contracts.length > 0" class="contract-list mt-5">
                <ContractCard v-for="contract in contracts" :key="contract.id" :contract="contract"
                    @makePayment="openPaymentModal" />
            </div>

            <!-- Payment Modal -->
            <PaymentModal v-if="showPaymentModal" :contract="selectedContract" @submitPayment="submitPayment"
                @close="showPaymentModal = false" />
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import apiClient from '@/services/api';
import CustomerCard from '@/components/CustomerCardForPayment.vue';
import ContractCard from '@/components/ContractCardForPayment.vue';
import PaymentModal from '@/components/PaymentModalForPayment.vue';
import StaffSidebar from '@/components/StaffSidebar.vue';

// State management
const customers = ref([]);
const contracts = ref([]);
const selectedCustomer = ref(null);
const selectedContract = ref(null);
const searchQuery = ref('');
const showPaymentModal = ref(false);
const loadingCustomers = ref(true);

// Fetch customers from API
const fetchCustomers = async () => {
    try {
        loadingCustomers.value = true;
        const response = await apiClient.get(`/users/customer/?search=${searchQuery.value}`);
        customers.value = response.data;
    } catch (error) {
        console.error('Error fetching customers:', error);
    } finally {
        loadingCustomers.value = false;
    }
};

// Fetch contracts based on customer selection
const fetchContracts = async (customerId) => {
    try {
        const response = await apiClient.get(`/contracts/staff/contracts/?customer=${customerId}`);
        contracts.value = response.data;
        selectedCustomer.value = customers.value.find(customer => customer.id === customerId);
    } catch (error) {
        console.error('Error fetching contracts:', error);
    }
};

// Open payment modal with the selected contract
const openPaymentModal = (contract) => {
    selectedContract.value = contract;
    showPaymentModal.value = true;
};

// Submit payment request
const submitPayment = async (paymentData) => {
    try {
        await apiClient.post('/contracts/contract/payment-record/make-payment-with-contract/', paymentData);
        alert('Payment successful!');
        showPaymentModal.value = false;
    } catch (error) {
        alert('Failed to make payment.');
        console.error(error);
    }
};

// Initial fetch
onMounted(() => {
    fetchCustomers();
});
</script>

<style scoped>
.customer-list,
.contract-list {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
}

.spinner-border {
    width: 3rem;
    height: 3rem;
}
</style>