<template>
    <div class="flex">
        <!-- Sidebar -->
        <StaffSidebar />

        <!-- Main Content Area -->
        <div class="flex-1 container mx-auto mt-8 p-6 bg-white shadow rounded-lg">
            <h2 class="text-2xl font-bold text-center mb-8">{{ $t('message.contract_details') }}</h2>

            <!-- Back button -->
            <button class="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mb-6" @click="goBack">
                {{ $t('message.back_to_contracts') }}
            </button>

            <!-- Loading Spinner -->
            <div v-if="loadingContract" class="flex justify-center items-center my-10">
                <div class="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            </div>

            <!-- Error Message -->
            <div v-else-if="errorContract" class="text-red-500 text-center my-5">
                {{ errorContract }}
            </div>

            <!-- Contract Details -->
            <div v-else>
                <!-- Contract Details Card -->
                <ContractDetailsCard :contract="contract" />

                <!-- Down Payment -->
                <DownPayment v-if="contract.downpayment" :payment="contract.downpayment" @openUpdateModal="openUpdateDownPaymentModal" />

                <!-- Payment Records -->
                <PaymentRecords :records="contract.payment_records" @openPaymentModal="handleOpenPaymentModal" @openSavePaymentModal="handleSaveOpenPaymentModel" @openReturnPaymentModal="handleReturnPaymentModal" />

                <!-- Last Payment -->
                <LastPayment v-if="contract.lastpayment" :payment="contract.lastpayment" @openUpdateModal="openUpdateLastPaymentModal" />

                <!-- Return Payment Modal -->
                <ReturnPaymentModal v-if="showReturnPaymentModal" :paymentRecord="selectedPaymentRecord" @close="closeReturnPaymentModal"
                    @submit="returnPayment" :errors="backendErrors" />

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
import apiClient from '@/services/api';
import ReturnPaymentModal from '@/components/ReturnPaymentModal.vue';

const route = useRoute();
const router = useRouter();
const { contract, loadingContract, errorContract, fetchContractDetails } = useContractDetails();

const showPaymentModal = ref(false);
const showReturnPaymentModal = ref(false);
const selectedPaymentRecord = ref(null);
const backendErrors = ref(null);

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

// Open make payment modal
const handleOpenPaymentModal = (paymentRecord) => {
    selectedPaymentRecord.value = paymentRecord;
    backendErrors.value = null; // Reset errors when opening modal
    showPaymentModal.value = true;
};

// Open return payment modal
const handleReturnPaymentModal = (paymentRecord) => {
    selectedPaymentRecord.value = paymentRecord;
    backendErrors.value = null; // Reset errors when opening modal
    showReturnPaymentModal.value = true;
};

// Open save payment modal
const handleSaveOpenPaymentModel = (paymentRecord) => {
    selectedPaymentRecord.value = paymentRecord;
    backendErrors.value = null; // Reset errors when opening modal
    showSavePaymentModal.value = true;
};

// Close make payment modal
const closePaymentModal = () => {
    showPaymentModal.value = false;
    backendErrors.value = null; // Clear errors
};

// Close return payment modal
const closeReturnPaymentModal = () => {
    showReturnPaymentModal.value = false;
    backendErrors.value = null; // Clear errors
};

// Close save payment modal
const closeSavePaymentModal = () => {
    showSavePaymentModal.value = false;
    backendErrors.value = null; // Clear errors
};

// Close update payment modal
const closeUpdateModal = () => {
    showUpdateModal.value = false;
    backendErrors.value = null;
};

// Handle payment submission
const submitPayment = async (paymentData) => {
    try {
        await apiClient.post('/contracts/contract/payment-record/make-payment/', paymentData);
        closePaymentModal();
        fetchContractDetails(route.params.contract_id); // Refresh contract details after payment
    } catch (error) {
        if (error.response && error.response.data) {
            backendErrors.value = error.response.data;
        } else {
            backendErrors.value = { non_field_errors: ['An unexpected error occurred. Please try again.'] };
        }
    }
};

// Handle return payment
const returnPayment = async (paymentData) => {
    try {
        await apiClient.post('/contracts/contract/payment-record/return-payment/', paymentData);
        closeReturnPaymentModal();
        fetchContractDetails(route.params.contract_id); // Refresh contract details after payment
    } catch (error) {
        console.log(error);
        if (error.response && error.response.data) {
            backendErrors.value = error.response.data;
        } else {
            backendErrors.value = { non_field_errors: ['An unexpected error occurred. Please try again.'] };
        }
    }
};

// Handle saving payment
const savePayment = async (paymentData) => {
    try {
        await apiClient.post('/contracts/update-next-payment-record-customer-debt/', paymentData);
        closeSavePaymentModal();
        fetchContractDetails(route.params.contract_id); // Refresh contract details after payment
    } catch (error) {
        if (error.response && error.response.data) {
            backendErrors.value = error.response.data;
        } else {
            backendErrors.value = { non_field_errors: ['An unexpected error occurred. Please try again.'] };
        }
    }
};

// Submit payment update
const submitPaymentUpdate = async (paymentData) => {
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

<style scoped>
</style>
