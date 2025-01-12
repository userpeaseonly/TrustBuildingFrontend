<template>
    <div class="flex">
        <!-- Sidebar -->
        <StaffSidebar />

        <!-- Main Content Area -->
        <div class="container mx-auto mt-10 p-6 bg-white shadow-md rounded-lg w-full max-w-5xl flex">
            <!-- Customer Search and List -->
            <div class="w-1/2 pr-6">
                <h2 class="text-3xl font-bold mb-6">Payments</h2>

                <!-- Search Input -->
                <div class="mb-6">
                    <input
                        type="text"
                        v-model="searchQuery"
                        @input="fetchCustomers"
                        class="w-full border border-gray-300 rounded-lg p-3 text-sm"
                        placeholder="Search customers... (Name, Passport)"
                    />
                </div>

                <!-- Customer List -->
                <div v-if="loadingCustomers" class="flex justify-center items-center mb-6">
                    <div class="animate-spin h-10 w-10 border-4 border-blue-500 border-t-transparent rounded-full"></div>
                </div>

                <div v-else-if="customers.length > 0" class="cursor-pointer customer-list flex flex-wrap gap-4">
                    <CustomerCard
                        v-for="customer in customers"
                        :key="customer.id"
                        :customer="customer"
                        @selectCustomer="fetchContracts"
                    />
                </div>

                <!-- No customers found -->
                <div v-else class="text-center py-6 bg-yellow-100 text-yellow-800 rounded-lg mb-6">
                    No customers found. Please refine your search.
                </div>
            </div>

            <!-- Contract List Section -->
            <div class="w-1/2 pl-6">
                <div v-if="selectedCustomer && contracts.length > 0" class="contract-list">
                    <h3 class="text-2xl font-semibold mb-6 text-gray-800 text-center">Contracts for {{ selectedCustomer.first_name }} {{ selectedCustomer.last_name }}</h3>
                    <div class="flex flex-wrap gap-4">
                        <ContractCard
                            v-for="contract in contracts"
                            :key="contract.id"
                            :contract="contract"
                            @makePayment="openPaymentModal"
                        />
                    </div>
                </div>
            </div>
        </div>

        <!-- Payment Modal -->
        <PaymentModal
            v-if="showPaymentModal"
            :contract="selectedContract"
            @submitPayment="submitPayment"
            @close="showPaymentModal = false"
        />
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
        fetchContracts(selectedCustomer.value.id); // Refresh contracts list after payment
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
    gap: 1.5rem;
}

.animate-spin {
    border-top-color: transparent;
}
</style>
