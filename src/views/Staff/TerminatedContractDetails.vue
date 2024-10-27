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
                <TerminateContractDetailsCard :contract="contract" />

                <!-- Down Payment -->
                <DownPayment v-if="contract.downpayment" :payment="contract.contract.downpayment" />

                <h4 class="text-2xl font-semibold mb-6 text-gray-800">Payments of Termination Amount</h4>
                <table class="table-auto w-full bg-white border-collapse shadow-lg rounded-lg overflow-hidden">
                    <thead class="bg-blue-500 text-lime-800">
                        <tr>
                            <th class="px-4 text-left">Order</th>
                            <th class="px-4 text-left">Date</th>
                            <th class="px-4 text-left">Planned Payment</th>
                            <th class="px-4 text-left">Paid Amount</th>
                            <th class="px-4 text-left">Customer Debt</th>
                            <th class="px-4 text-left">Make / Type</th>
                            <th class="px-4 text-left">Save / Ref</th>
                        </tr>
                    </thead>

                    <!-- Payments for the current record -->
                    <tbody>
                        <tr v-for="payment in contract.terminated_contract_payments" :key="payment.id" class="bg-white hover:bg-gray-50 ">
                            <td>{{ payment.id }}</td>
                            <td class="px-4"><span><strong></strong> {{ payment.payment_date }}</span></td>
                            <td class="px-4">{{ formatPrice(contract.termination_planned_payment) }}</td>
                            <td class="px-4"><span><strong></strong> {{ formatPrice(payment.payment_amount) }} UZS</span></td>
                            <td class="px-4"><span><strong></strong> {{ payment.payment_method }}</span></td>
                            <td class="px-4"><span><strong></strong> {{ payment.payment_reference }}</span></td>
                            <td class="px-4"><span><strong></strong> {{ payment.payment_notes }}</span></td>
                        </tr>
                    </tbody>
                </table>

                <!-- Make Payment Button -->
                <button @click="openMakePaymentModal" class="btn btn-warning mt-2 mb-4">Make Payment for Terminated Contract</button>

                <!-- Payment Modal -->
                <div v-if="showPaymentModal" class="modal fade show d-block" tabindex="-1">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title">Make Payment for Terminated Contract</h5>
                                <button type="button" class="btn-close" @click="closePaymentModal"></button>
                            </div>
                            <div class="modal-body">
                                <form @submit.prevent="submitPayment">
                                    <div class="mb-3">
                                        <label class="form-label">Payment Amount</label>
                                        <input v-model="paymentData.payment_amount" type="number" class="form-control" required />
                                        <div v-if="backendErrors?.payment_amount" class="text-danger">
                                            {{ backendErrors.payment_amount[0] }}
                                        </div>
                                    </div>

                                    <div class="mb-3">
                                        <label class="form-label">Payment Method</label>
                                        <select v-model="paymentData.payment_method" class="form-control" required>
                                            <option value="CASH">Cash</option>
                                            <option value="BANK_TRANSFER">Bank Transfer</option>
                                            <option value="TERMINAL">Terminal</option>
                                            <option value="MATERIAL">Material</option>
                                            <option value="OTHER">Other</option>
                                        </select>
                                        <div v-if="backendErrors?.payment_method" class="text-danger">
                                            {{ backendErrors.payment_method[0] }}
                                        </div>
                                    </div>

                                    <div class="mb-3">
                                        <label class="form-label">Payment Reference</label>
                                        <input v-model="paymentData.payment_reference" type="text" class="form-control" />
                                        <div v-if="backendErrors?.payment_reference" class="text-danger">
                                            {{ backendErrors.payment_reference[0] }}
                                        </div>
                                    </div>

                                    <div class="mb-3">
                                        <label class="form-label">Payment Notes</label>
                                        <textarea v-model="paymentData.payment_notes" class="form-control"></textarea>
                                        <div v-if="backendErrors?.payment_notes" class="text-danger">
                                            {{ backendErrors.payment_notes[0] }}
                                        </div>
                                    </div>

                                    <!-- Error messages -->
                                    <div v-if="backendErrors?.non_field_errors" class="alert alert-danger">
                                        {{ backendErrors.non_field_errors[0] }}
                                    </div>

                                    <!-- Success message -->
                                    <div v-if="successMessage" class="alert alert-success">
                                        {{ successMessage }}
                                    </div>
                                </form>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" @click="closePaymentModal">Cancel</button>
                                <button type="button" class="btn btn-primary" @click="submitPayment">Submit Payment</button>
                            </div>
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
const backendErrors = ref(null);  // Backend errors
const successMessage = ref(null);

// Helper function to format prices
const formatPrice = (price) => new Intl.NumberFormat('uz-UZ').format(price);

// Handle back navigation
const goBack = () => {
    router.push('/staff/terminated/contracts');
};

// Fetch the terminated contract details on mount
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

        const response = await apiClient.post('/contracts/staff/contracts/terminate/make-payment/', paymentData.value);
        if (response.status === 201) {
            successMessage.value = 'Payment made successfully';
            closePaymentModal();
            fetchCompanyTerminatedContractDetails(route.params.contract_id); // Refresh contract details
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

.card {
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.alert {
    font-size: 1rem;
}

.back-btn {
    margin-bottom: 20px;
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
