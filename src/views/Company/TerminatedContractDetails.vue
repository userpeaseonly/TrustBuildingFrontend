<template>
    <div class="flex">
        <!-- Sidebar -->
        <CompanySidebar />

        <!-- Main Content Area -->
        <div class="flex-1 p-8 min-h-screen bg-gray-100">
            <h2 class="text-3xl font-semibold text-center mb-8">Contract Details</h2>

            <!-- Back Button -->
            <button class="bg-gray-600 text-white py-2 px-4 rounded hover:bg-gray-700 mb-4" @click="goBack">
                Back to Contracts
            </button>

            <!-- Loading Spinner -->
            <div v-if="loadingContract" class="flex justify-center items-center my-20">
                <div class="w-12 h-12 border-4 border-gray-200 border-t-blue-500 rounded-full animate-spin"
                    role="status">
                    <span class="sr-only">Loading...</span>
                </div>
            </div>

            <!-- Error Message -->
            <div v-else-if="errorContract" class="bg-red-500 text-white text-center py-4 rounded mb-6">
                {{ errorContract }}
            </div>

            <div v-else>
                <!-- Contract Details -->
                <TerminateContractDetailsCard :contract="contract" />

                <!-- Down Payment -->
                <DownPayment v-if="contract.downpayment" :payment="contract.contract.downpayment" />

                <!-- Payments Table -->
                <h4 class="text-2xl font-semibold mb-6 text-gray-800 mt-10">Payments of Termination Amount</h4>
                <table class="table-auto w-full bg-white border-collapse shadow-lg rounded-lg overflow-hidden mb-6">
                    <thead class="bg-blue-500 text-lime-800">
                        <tr>
                            <th class="px-4 py-2 text-left">Order</th>
                            <th class="px-4 py-2 text-left">Date</th>
                            <th class="px-4 py-2 text-left">Planned Payment</th>
                            <th class="px-4 py-2 text-left">Paid Amount</th>
                            <th class="px-4 py-2 text-left">Customer Debt</th>
                            <th class="px-4 py-2 text-left">Make / Type</th>
                            <th class="px-4 py-2 text-left">Save / Ref</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="payment in contract.terminated_contract_payments" :key="payment.id"
                            class="hover:bg-gray-50">
                            <td class="border px-4 py-2">{{ payment.id }}</td>
                            <td class="border px-4 py-2">{{ payment.payment_date }}</td>
                            <td class="border px-4 py-2">{{ formatPrice(contract.termination_planned_payment) }}</td>
                            <td class="border px-4 py-2">{{ formatPrice(payment.payment_amount) }} UZS</td>
                            <td class="border px-4 py-2">{{ payment.payment_method }}</td>
                            <td class="border px-4 py-2">{{ payment.payment_reference }}</td>
                            <td class="border px-4 py-2">{{ payment.payment_notes }}</td>
                        </tr>
                    </tbody>
                </table>

                <!-- Make Payment Button -->
                <button @click="openMakePaymentModal"
                    class="bg-yellow-500 text-white py-2 px-4 rounded hover:bg-yellow-600 mt-4">
                    Make Payment for Terminated Contract
                </button>

                <!-- Payment Modal -->
                <div v-if="showPaymentModal"
                    class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div class="bg-white rounded-lg shadow-lg max-w-lg w-full p-6">
                        <div class="flex justify-between items-center mb-4">
                            <h5 class="text-xl font-bold">Make Payment for Terminated Contract</h5>
                            <button class="text-gray-500 hover:text-gray-700" @click="closePaymentModal">✖</button>
                        </div>
                        <form @submit.prevent="submitPayment">
                            <div class="mb-4">
                                <label class="block font-semibold mb-2">Payment Amount</label>
                                <input v-model="paymentData.payment_amount" type="number"
                                    class="w-full border rounded py-2 px-3" required />
                                <div v-if="backendErrors?.payment_amount" class="text-red-500 mt-1">
                                    {{ backendErrors.payment_amount[0] }}
                                </div>
                            </div>

                            <div class="mb-4">
                                <label class="block font-semibold mb-2">Payment Method</label>
                                <select v-model="paymentData.payment_method" class="w-full border rounded py-2 px-3"
                                    required>
                                    <option value="CASH">Cash</option>
                                    <option value="BANK_TRANSFER">Bank Transfer</option>
                                    <option value="TERMINAL">Terminal</option>
                                    <option value="MATERIAL">Material</option>
                                    <option value="OTHER">Other</option>
                                </select>
                                <div v-if="backendErrors?.payment_method" class="text-red-500 mt-1">
                                    {{ backendErrors.payment_method[0] }}
                                </div>
                            </div>

                            <div class="mb-4">
                                <label class="block font-semibold mb-2">Payment Reference</label>
                                <input v-model="paymentData.payment_reference" type="text"
                                    class="w-full border rounded py-2 px-3" />
                                <div v-if="backendErrors?.payment_reference" class="text-red-500 mt-1">
                                    {{ backendErrors.payment_reference[0] }}
                                </div>
                            </div>

                            <div class="mb-4">
                                <label class="block font-semibold mb-2">Payment Notes</label>
                                <textarea v-model="paymentData.payment_notes"
                                    class="w-full border rounded py-2 px-3"></textarea>
                                <div v-if="backendErrors?.payment_notes" class="text-red-500 mt-1">
                                    {{ backendErrors.payment_notes[0] }}
                                </div>
                            </div>

                            <!-- Error messages -->
                            <div v-if="backendErrors?.non_field_errors" class="bg-red-500 text-white p-3 rounded mb-4">
                                {{ backendErrors.non_field_errors[0] }}
                            </div>

                            <!-- Success message -->
                            <div v-if="successMessage" class="bg-green-500 text-white p-3 rounded mb-4">
                                {{ successMessage }}
                            </div>

                            <div class="flex justify-end">
                                <button type="button"
                                    class="bg-gray-600 text-white py-2 px-4 rounded hover:bg-gray-700 mr-2"
                                    @click="closePaymentModal">
                                    Cancel
                                </button>
                                <button type="button" class="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
                                    @click="submitPayment">
                                    Submit Payment
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import useContractDetails from '@/composables/useContractDetails';
import TerminateContractDetailsCard from '@/components/TerminateContractDetailsCard.vue';
import DownPayment from '@/components/DownPayment.vue';
import LastPayment from '@/components/LastPayment.vue';
import TerminatePaymentRecords from '@/components/TerminatePaymentRecords.vue';
import apiClient from '@/services/api';
import CompanySidebar from '@/components/CompanySidebar.vue';

const route = useRoute();
const router = useRouter();
const { contract, loadingContract, errorContract, fetchCompanyTerminatedContractDetailsForCompanyUser } = useContractDetails();

const showPaymentModal = ref(false);
const backendErrors = ref(null);  // Backend errors
const successMessage = ref(null);

// Helper function to format prices
const formatPrice = (price) => new Intl.NumberFormat('uz-UZ').format(price);

// Handle back navigation
const goBack = () => {
    router.push('/company/terminated/contracts');
};

// Fetch the terminated contract details on mount
onMounted(() => {
    fetchCompanyTerminatedContractDetailsForCompanyUser(route.params.contract_id);
});

const paymentData = ref({
    payment_amount: '',
    payment_method: 'CASH',
    payment_reference: '',
    payment_notes: '',
    terminate_contract: route.params.contract_id
});

// Open payment modal
const openMakePaymentModal = () => {
    paymentData.value = {
        payment_amount: '',
        payment_method: 'CASH',
        payment_reference: '',
        payment_notes: '',
        terminate_contract: route.params.contract_id
    };
    backendErrors.value = null; // Reset errors
    successMessage.value = null; // Clear previous success messages
    showPaymentModal.value = true;
};

// Close payment modal
const closePaymentModal = () => {
    showPaymentModal.value = false;
};

// Submit payment
const submitPayment = async () => {
    try {
        const today = new Date().toISOString().slice(0, 10);
        paymentData.value.payment_date = today; // Automatically use today's date

        const response = await apiClient.post('/contracts/company/contracts/terminate/make-payment/', paymentData.value);
        if (response.status === 201) {
            successMessage.value = 'Payment made successfully';
            closePaymentModal();
            fetchCompanyTerminatedContractDetailsForCompanyUser(route.params.contract_id); // Refresh contract details
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
}

h2 {
    font-weight: bold;
}

.table-auto th,
.table-auto td {
    text-align: left;
    padding: 0.75rem;
    border: 1px solid #e5e7eb;
    white-space: nowrap;
}

thead th {
    background-color: #f7fafc;
}

tbody tr:hover {
    background-color: #f0f4f8;
}

.table-auto {
    margin-bottom: 2rem;
}
</style>