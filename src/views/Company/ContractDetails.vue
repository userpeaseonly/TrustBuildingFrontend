<template>
    <div class="flex">
      <!-- Sidebar -->
      <CompanySidebar />
  
      <!-- Main Content Area -->
      <div class="flex-1 p-8 min-h-screen bg-gray-100">
        <h2 class="text-3xl font-semibold text-center mb-8">Contract Details</h2>
  
        <!-- Back button -->
        <button class="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded mb-6" @click="goBack">
          Back to Contracts
        </button>
  
        <!-- Loading Spinner -->
        <div v-if="loadingContract" class="flex justify-center items-center my-20">
          <div class="w-12 h-12 border-4 border-gray-200 border-t-blue-500 rounded-full animate-spin" role="status">
            <span class="sr-only">Loading...</span>
          </div>
        </div>
  
        <!-- Error Message -->
        <div v-else-if="errorContract" class="bg-red-500 text-white text-center py-4 rounded mb-6">
          {{ errorContract }}
        </div>
  
        <div v-else>
          <!-- Contract Details -->
          <ContractDetailsCard :contract="contract" class="mb-6" />
  
          <!-- Down Payment -->
          <DownPayment v-if="contract.downpayment" :payment="contract.downpayment" class="mb-6" />
  
          <!-- Last Payment -->
          <LastPayment v-if="contract.lastpayment" :payment="contract.lastpayment" class="mb-6" />
  
          <!-- Payment Records -->
          <PaymentRecords :records="contract.payment_records" @openPaymentModal="handleOpenPaymentModal" class="mb-6" />
  
          <!-- Make Payment Modal -->
          <PaymentModal v-if="showPaymentModal" :paymentRecord="selectedPaymentRecord" @close="closePaymentModal" @submit="submitPayment" :errors="backendErrors" />
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
  
  .back-btn {
    margin-bottom: 20px;
  }
  </style>
  