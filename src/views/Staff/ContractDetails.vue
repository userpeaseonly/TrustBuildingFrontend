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
                <ContractDetailsCard :contract="contract" />

                <!-- Down Payment -->
                <DownPayment v-if="contract.downpayment" :payment="contract.downpayment" @openUpdateModal="openUpdateDownPaymentModal" />

                <!-- Payment Records -->
                <PaymentRecords :records="contract.payment_records" @openPaymentModal="handleOpenPaymentModal" @openSavePaymentModal="handleSaveOpenPaymentModel" />

                <!-- Last Payment -->
                <LastPayment v-if="contract.lastpayment" :payment="contract.lastpayment" @openUpdateModal="openUpdateLastPaymentModal" />

                <!-- Make Payment Modal -->
                <PaymentModal v-if="showPaymentModal" :paymentRecord="selectedPaymentRecord" @close="closePaymentModal"
                    @submit="submitPayment" :errors="backendErrors" />

                <!-- Save Payment Modal -->
                <SavePaymentModal v-if="showSavePaymentModal" :paymentRecord="selectedPaymentRecord" @close="closeSavePaymentModal"
                    @submit="savePayment" :errors="backendErrors" />

                <!-- Update Payment Modal -->
                <PaymentUpdateModal v-if="showUpdateModal" :paymentData="selectedPaymentRecord" @close="closeUpdateModal"
                    @submit="submitPaymentUpdate" :errors="backendErrors" />
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import useContractDetails from '@/composables/useContractDetails';
import StaffSidebar from '@/components/StaffSidebar.vue';
import ContractDetailsCard from '@/components/ContractDetailsCard.vue';
import DownPayment from '@/components/DownPayment.vue';
import LastPayment from '@/components/LastPayment.vue';
import PaymentRecords from '@/components/PaymentRecords.vue';
import PaymentModal from '@/components/PaymentModal.vue';
import SavePaymentModal from '@/components/SavePaymentModel.vue';
import PaymentUpdateModal from '@/components/PaymentUpdateModal.vue';
import apiClient from '@/services/api'; // Import apiClient

const route = useRoute();
const router = useRouter();
const { contract, loadingContract, errorContract, fetchContractDetails } = useContractDetails();

const showPaymentModal = ref(false);
const selectedPaymentRecord = ref(null);
const backendErrors = ref(null);  // Backend errors

const showSavePaymentModal = ref(false);
const showUpdateModal = ref(false);
let updatePaymentType = null; // Track the type of payment (down or last)

// Handle back navigation
const goBack = () => {
    router.push('/staff/contracts');
};

// Open down payment update modal
const openUpdateDownPaymentModal = (paymentRecord) => {
    selectedPaymentRecord.value = paymentRecord;
    backendErrors.value = null; // Reset errors when opening modal
    showUpdateModal.value = true;
    updatePaymentType = 'down_payment';
};

// Open last payment update modal
const openUpdateLastPaymentModal = (paymentRecord) => {
    selectedPaymentRecord.value = paymentRecord;
    backendErrors.value = null; // Reset errors when opening modal
    showUpdateModal.value = true;
    updatePaymentType = 'last_payment';
};

// Close modals
const closeUpdateModal = () => {
    showUpdateModal.value = false;
    backendErrors.value = null;
};

// Submit payment update
const submitPaymentUpdate = async (paymentData) => {
    console.log(paymentData);
    try {
        let url = '';
        if (updatePaymentType === 'down_payment') {
            url = `/contracts/staff/contracts/down_payment/${paymentData.id}/update/`;
        } else if (updatePaymentType === 'last_payment') {
            url = `/contracts/staff/contracts/last_payment/${paymentData.id}/update/`;
        }

        await apiClient.put(url, paymentData);
        closeUpdateModal();
        fetchContractDetails(route.params.contract_id); // Refresh contract details after update
    } catch (error) {
        if (error.response && error.response.data) {
            backendErrors.value = error.response.data;
        } else {
            backendErrors.value = { non_field_errors: ['An unexpected error occurred. Please try again.'] };
        }
    }
};

onMounted(() => {
    fetchContractDetails(route.params.contract_id);
});
</script>
