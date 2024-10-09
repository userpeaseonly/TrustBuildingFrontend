<!-- src/views/ContractDetails.vue -->
<template>
    <div class="d-flex">
        <!-- Sidebar -->
        <CompanySidebar />

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

            <div v-else-if="errorContract" class="alert alert-danger text-center">{{ errorContract }}</div>

            <div v-else>
                <!-- Contract Details -->
                <ContractDetailsCard :contract="contract" />

                <!-- Down Payment -->
                <DownPayment v-if="contract.downpayment" :payment="contract.downpayment" />

                <!-- Last Payment -->
                <LastPayment v-if="contract.lastpayment" :payment="contract.lastpayment" />

                <!-- Payment Records -->
                <PaymentRecords :records="contract.payment_records" @openPaymentModal="handleOpenPaymentModal" />

                <!-- Make Payment Modal -->
                <PaymentModal v-if="showPaymentModal" :paymentRecord="selectedPaymentRecord" @close="closePaymentModal"
                    @submit="submitPayment" :errors="backendErrors" />
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';
import useContractDetails from '@/composables/useContractDetails';
import ContractDetailsCard from '@/components/ContractDetailsCard.vue';
import DownPayment from '@/components/DownPayment.vue';
import LastPayment from '@/components/LastPayment.vue';
import PaymentRecords from '@/components/PaymentRecords.vue';
import PaymentModal from '@/components/PaymentModal.vue';
import apiClient from '@/services/api'; // Import apiClient
import CompanySidebar from '@/components/CompanySidebar.vue';

const route = useRoute();
const router = useRouter();
const store = useStore();
const { contract, loadingContract, errorContract, fetchCompanyContractDetails } = useContractDetails();

const showPaymentModal = ref(false);
const selectedPaymentRecord = ref(null);
const backendErrors = ref(null);  // Backend errors

// Handle back navigation
const goBack = () => {
    router.push('/company/contracts');
};

// Open payment modal
const handleOpenPaymentModal = (paymentRecord) => {
    selectedPaymentRecord.value = paymentRecord;
    backendErrors.value = null; // Reset errors when opening modal
    showPaymentModal.value = true;
};

// Close payment modal
const closePaymentModal = () => {
    showPaymentModal.value = false;
    backendErrors.value = null; // Clear errors
};

// Handle payment submission
const submitPayment = async (paymentData) => {
    try {
        await apiClient.post('/contracts/contract/payment-record/make-payment/', paymentData);
        closePaymentModal();
        fetchCompanyContractDetails(route.params.contract_id, store.getters['userRole']); // Refresh contract details after payment
    } catch (error) {
        // Capture backend errors and pass them to the modal
        if (error.response && error.response.data) {
            backendErrors.value = error.response.data;
        } else {
            backendErrors.value = { non_field_errors: ['An unexpected error occurred. Please try again.'] };
        }
    }
};

onMounted(() => {
    fetchCompanyContractDetails(route.params.contract_id, store.getters['userRole']);
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

.alert {
    font-size: 1rem;
}

.back-btn {
    margin-bottom: 20px;
}
</style>