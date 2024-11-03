<template>
    <div class="flex">
        <!-- Sidebar -->
        <StaffSidebar />

        <!-- Main Content Area -->
        <div class="container mx-auto mt-5 px-4 lg:px-8 flex-1">
            <h2 class="text-3xl font-bold mb-8 text-center">Contract Details</h2>

            <!-- Back button -->
            <button class="bg-gray-500 text-white px-4 py-2 mb-8 rounded hover:bg-gray-600" @click="goBack">
                Back to Contracts
            </button>

            <!-- Loading State -->
            <div v-if="loadingContract" class="flex justify-center items-center h-32">
                <div class="loader border-t-4 border-blue-500 rounded-full w-16 h-16"></div>
            </div>

            <!-- Error Message -->
            <div v-else-if="errorContract" class="bg-red-100 text-red-800 py-4 px-6 text-center rounded mb-4">
                {{ errorContract }}
            </div>

            <!-- Contract Details -->
            <div v-else>
                <!-- Contract Details Card -->
                <TerminateContractDetailsCard :contract="contract" />

                <!-- Down Payment Section -->
                <DownPayment v-if="contract.downpayment" :payment="contract.contract.downpayment" />

                <!-- Payments of Termination Amount -->
                <h4 class="text-2xl font-semibold mb-6 text-gray-800">Payments of Termination Amount</h4>
                <table class="w-full bg-white border-collapse shadow-lg rounded-lg overflow-hidden mb-6">
                    <thead class="bg-blue-600 text-white">
                        <tr>
                            <th class="px-6 py-3 text-left">Order</th>
                            <th class="px-6 py-3 text-left">Date</th>
                            <th class="px-6 py-3 text-left">Planned Payment</th>
                            <th class="px-6 py-3 text-left">Paid Amount</th>
                            <th class="px-6 py-3 text-left">Customer Debt</th>
                            <th class="px-6 py-3 text-left">Make / Type</th>
                            <th class="px-6 py-3 text-left">Save / Ref</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="payment in contract.terminated_contract_payments" :key="payment.id" class="hover:bg-gray-50">
                            <td class="px-6 py-4">{{ payment.id }}</td>
                            <td class="px-6 py-4">{{ payment.payment_date }}</td>
                            <td class="px-6 py-4">{{ formatPrice(contract.termination_planned_payment) }}</td>
                            <td class="px-6 py-4">{{ formatPrice(payment.payment_amount) }} UZS</td>
                            <td class="px-6 py-4">{{ payment.payment_method }}</td>
                            <td class="px-6 py-4">{{ payment.payment_reference }}</td>
                            <td class="px-6 py-4">{{ payment.payment_notes }}</td>
                        </tr>
                    </tbody>
                </table>

                <!-- Make Payment Button -->
                <button @click="openMakePaymentModal" class="bg-yellow-500 text-white px-4 py-2 mb-8 rounded hover:bg-yellow-600">
                    Make Payment for Terminated Contract
                </button>

                <!-- Payment Modal -->
                <div v-if="showPaymentModal" class="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
                    <div class="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
                        <div class="flex justify-between items-center mb-4">
                            <h5 class="text-lg font-semibold">Make Payment for Terminated Contract</h5>
                            <button class="text-gray-600 hover:text-gray-800" @click="closePaymentModal">&times;</button>
                        </div>
                        <div>
                            <form @submit.prevent="submitPayment">
                                <div class="mb-4">
                                    <label class="block text-sm font-medium mb-2">Payment Amount</label>
                                    <input v-model="paymentData.payment_amount" type="number" class="w-full border-gray-300 rounded px-4 py-2" required />
                                    <div v-if="backendErrors?.payment_amount" class="text-red-500 text-sm mt-1">
                                        {{ backendErrors.payment_amount[0] }}
                                    </div>
                                </div>

                                <div class="mb-4">
                                    <label class="block text-sm font-medium mb-2">Payment Method</label>
                                    <select v-model="paymentData.payment_method" class="w-full border-gray-300 rounded px-4 py-2" required>
                                        <option value="CASH">Cash</option>
                                        <option value="BANK_TRANSFER">Bank Transfer</option>
                                        <option value="TERMINAL">Terminal</option>
                                        <option value="MATERIAL">Material</option>
                                        <option value="OTHER">Other</option>
                                    </select>
                                    <div v-if="backendErrors?.payment_method" class="text-red-500 text-sm mt-1">
                                        {{ backendErrors.payment_method[0] }}
                                    </div>
                                </div>

                                <div class="mb-4">
                                    <label class="block text-sm font-medium mb-2">Payment Reference</label>
                                    <input v-model="paymentData.payment_reference" type="text" class="w-full border-gray-300 rounded px-4 py-2" />
                                    <div v-if="backendErrors?.payment_reference" class="text-red-500 text-sm mt-1">
                                        {{ backendErrors.payment_reference[0] }}
                                    </div>
                                </div>

                                <div class="mb-4">
                                    <label class="block text-sm font-medium mb-2">Payment Notes</label>
                                    <textarea v-model="paymentData.payment_notes" class="w-full border-gray-300 rounded px-4 py-2"></textarea>
                                    <div v-if="backendErrors?.payment_notes" class="text-red-500 text-sm mt-1">
                                        {{ backendErrors.payment_notes[0] }}
                                    </div>
                                </div>

                                <div v-if="backendErrors?.non_field_errors" class="bg-red-100 text-red-800 py-2 px-4 mb-4 rounded">
                                    {{ backendErrors.non_field_errors[0] }}
                                </div>

                                <div v-if="successMessage" class="bg-green-100 text-green-800 py-2 px-4 mb-4 rounded">
                                    {{ successMessage }}
                                </div>

                                <div class="flex justify-end">
                                    <button type="button" class="bg-gray-400 text-white px-4 py-2 mr-3 rounded hover:bg-gray-500" @click="closePaymentModal">Cancel</button>
                                    <button type="submit" class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Submit Payment</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

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
import apiClient from '@/services/api';

const route = useRoute();
const router = useRouter();
const { contract, loadingContract, errorContract, fetchCompanyTerminatedContractDetails } = useContractDetails();

const showPaymentModal = ref(false);
const backendErrors = ref(null);
const successMessage = ref(null);

const formatPrice = (price) => new Intl.NumberFormat('uz-UZ').format(price);

const goBack = () => {
    router.push('/staff/terminated/contracts');
};

onMounted(() => {
    fetchCompanyTerminatedContractDetails(route.params.contract_id);
});

const paymentData = ref({
    payment_amount: '',
    payment_method: 'CASH',
    payment_reference: '',
    payment_notes: '',
    terminate_contract: route.params.contract_id
});

const openMakePaymentModal = () => {
    paymentData.value = {
        payment_amount: '',
        payment_method: 'CASH',
        payment_reference: '',
        payment_notes: '',
        terminate_contract: route.params.contract_id
    };
    backendErrors.value = null;
    successMessage.value = null;
    showPaymentModal.value = true;
};

const closePaymentModal = () => {
    showPaymentModal.value = false;
};

const submitPayment = async () => {
    try {
        const today = new Date().toISOString().slice(0, 10);
        paymentData.value.payment_date = today;

        const response = await apiClient.post('/contracts/staff/contracts/terminate/make-payment/', paymentData.value);
        if (response.status === 201) {
            successMessage.value = 'Payment made successfully';
            closePaymentModal();
            fetchCompanyTerminatedContractDetails(route.params.contract_id);
        }
    } catch (error) {
        if (error.response && error.response.data) {
            backendErrors.value = error.response.data;
        } else {
            backendErrors.value = { non_field_errors: ['An unexpected error occurred.'] };
        }
    }
};
</script>

<style scoped>
.container {
    max-width: 1200px;
    padding: 20px;
}

h2 {
    font-weight: bold;
}

.loader {
    border-width: 4px;
    animation: spin 1s linear infinite;
}

@keyframes spin {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
}
</style>
