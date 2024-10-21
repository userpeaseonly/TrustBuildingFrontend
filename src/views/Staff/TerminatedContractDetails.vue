<!-- src/views/ContractDetails.vue -->
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

            <div v-else-if="errorContract" class="alert alert-danger text-center">{{ errorContract }}</div>

            <div v-else>
                <!-- Contract Details -->
                <TerminateContractDetailsCard :contract="contract.contract" />

                <!-- Down Payment -->
                <DownPayment v-if="contract.downpayment" :payment="contract.contract.downpayment" />

                <!-- Payment Records -->
                <TerminatePaymentRecords :records="contract.contract.payment_records" @openPaymentModal="handleOpenPaymentModal"
                    @openSavePaymentModal="handleSaveOpenPaymentModel" />

                <!-- Last Payment -->
                <LastPayment v-if="contract.contract.lastpayment" :payment="contract.contract.lastpayment" />

            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import useContractDetails from '@/composables/useContractDetails';
import StaffSidebar from '@/components/StaffSidebar.vue';
import TerminateContractDetailsCard from '@/components/TerminateContractDetailsCard.vue';
import DownPayment from '@/components/DownPayment.vue';
import LastPayment from '@/components/LastPayment.vue';
import TerminatePaymentRecords from '@/components/TerminatePaymentRecords.vue';
import PaymentModal from '@/components/PaymentModal.vue';
import SavePaymentModal from '@/components/SavePaymentModel.vue';
import apiClient from '@/services/api'; // Import apiClient

const route = useRoute();
const router = useRouter();
const { contract, loadingContract, errorContract, fetchContractDetails, fetchCompanyTerminatedContractDetails } = useContractDetails();

const showPaymentModal = ref(false);
const selectedPaymentRecord = ref(null);
const backendErrors = ref(null);  // Backend errors

const showSavePaymentModal = ref(false);

// Handle back navigation
const goBack = () => {
    router.push('/staff/terminated/contracts');
};

// Open payment modal
const handleOpenPaymentModal = (paymentRecord) => {
    selectedPaymentRecord.value = paymentRecord;
    backendErrors.value = null; // Reset errors when opening modal
    showPaymentModal.value = true;
};

const handleSaveOpenPaymentModel = (paymentRecord) => {
    selectedPaymentRecord.value = paymentRecord;
    backendErrors.value = null; // Reset errors when opening modal
    showSavePaymentModal.value = true;
};



onMounted(() => {
    fetchCompanyTerminatedContractDetails(route.params.contract_id);
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