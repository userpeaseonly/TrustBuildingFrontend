<template>
    <div class="bg-white shadow-lg rounded-lg mb-6 p-6">
        <div>
            <h5 class="text-2xl font-bold text-indigo-700 flex items-center mb-6">
                <i class="bi bi-file-text-fill mr-2 text-indigo-600"></i> Contract #{{ contract.id }}
            </h5>

            <!-- Section for Contract Overview -->
            <div class="mb-6">
                <p class="flex items-center mb-4">
                    <i class="bi bi-calendar-check-fill mr-2 text-gray-500"></i>
                    <strong>Contract Date:&nbsp;</strong> {{ contract.contract_date }}
                </p>
                <p class="flex items-center">
                    <i class="bi bi-check-circle-fill mr-2 text-gray-500"></i>
                    <strong>Status:&nbsp;</strong>
                    <span :class="getStatusBadgeClass(contract.status)"
                        class="px-3 py-1 rounded-full text-sm font-semibold uppercase tracking-wide">
                        {{ contract.status }}
                    </span>
                </p>
            </div>

            <!-- Section for Apartment Details -->
            <div class="border-t border-gray-200 pt-6 mb-6">
                <h6 class="text-lg font-semibold text-gray-700 mb-4">Apartment Information</h6>
                <p class="flex items-center mb-3">
                    <i class="bi bi-building mr-2 text-gray-500"></i>
                    <strong>Apartment Number:&nbsp;</strong> {{ contract.apartment.apartment_number }}
                </p>
                <p class="flex items-center mb-3">
                    <i class="bi bi-stack mr-2 text-gray-500"></i>
                    <strong>Floor Number:&nbsp;</strong> {{ contract.apartment.floor_number }}
                </p>
                <p class="flex items-center mb-3">
                    <i class="bi bi-door-open-fill mr-2 text-gray-500"></i>
                    <strong>Building Entrance:&nbsp;</strong> {{ contract.apartment.building_entrance }}
                </p>
                <p class="flex items-center mb-3">
                    <i class="bi bi-fullscreen-exit mr-2 text-gray-500"></i>
                    <strong>Total Area:&nbsp;</strong> {{ contract.apartment.total_area }} m²
                </p>
                <p class="flex items-center mb-3">
                    <i class="bi bi-aspect-ratio-fill mr-2 text-gray-500"></i>
                    <strong>Living Area:&nbsp;</strong> {{ contract.apartment.living_area }} m²
                </p>
                <p class="flex items-center mb-3">
                    <i class="bi bi-calendar-fill mr-2 text-gray-500"></i>
                    <strong>Created At:&nbsp;</strong> {{ formatDate(contract.apartment.created_at) }}
                </p>
                <p class="flex items-center">
                    <i class="bi bi-calendar-check-fill mr-2 text-gray-500"></i>
                    <strong>Updated At:&nbsp;</strong> {{ formatDate(contract.apartment.updated_at) }}
                </p>
            </div>

            <!-- Section for Customer Details -->
            <div class="border-t border-gray-200 pt-6 mb-6">
                <h6 class="text-lg font-semibold text-gray-700 mb-4">Customer Information</h6>
                <p class="flex items-center mb-3">
                    <i class="bi bi-person-fill mr-2 text-gray-500"></i>
                    <strong>Customer:&nbsp;</strong> {{ contract.customer.first_name }} {{ contract.customer.last_name }}
                    {{ contract.customer.third_name }}
                </p>
                <p class="flex items-center mb-3">
                    <i class="bi bi-telephone-fill mr-2 text-gray-500"></i>
                    <strong>Phone Number:&nbsp;</strong> {{ contract.customer.user.phone_number }}
                </p>
                <p v-if="contract.customer.phone_number2" class="flex items-center mb-3">
                    <i class="bi bi-telephone-fill mr-2 text-gray-500"></i>
                    <strong>Phone Number 2:&nbsp;</strong> {{ contract.customer.phone_number2 }}
                </p>
                <p class="flex items-center">
                    <i class="bi bi-file-earmark-text-fill mr-2 text-gray-500"></i>
                    <strong>Passport Issuance Place:&nbsp;</strong> {{ contract.customer.passport_place_issuance }}
                </p>
            </div>

            <!-- Section for Financial Details -->
            <div class="border-t border-gray-200 pt-6">
                <h6 class="text-lg font-semibold text-gray-700 mb-4">Financial Information</h6>
                <p class="flex items-center mb-3">
                    <i class="bi bi-cash-stack mr-2 text-gray-500"></i>
                    <strong>Price per Square:&nbsp;</strong> {{ formatPrice(contract.price_per_square) }} UZS
                </p>

                <p class="flex items-center mb-3">
                    <i class="bi bi-currency-exchange mr-2 text-gray-500"></i>
                    <strong>Contract Amount:&nbsp;</strong> {{ formatPrice(contract.contract_amount) }} UZS
                </p>

                <p class="flex items-center mb-3">
                    <i class="bi bi-clock-history mr-2 text-gray-500"></i>
                    <strong>Payment Months:&nbsp;</strong> {{ contract.payment_months }}
                </p>

                <p class="flex items-center mb-3">
                    <i class="bi bi-wallet-fill mr-2 text-gray-500"></i>
                    <strong>Monthly Payment:&nbsp;</strong> {{ formatPrice(contract.monthly_payment) }} UZS
                </p>
            </div>

            <div class="border-t border-gray-200 pt-6 mt-6 flex space-x-4">
                <button @click="downloadContract"
                    class="bg-blue-600 text-white font-semibold px-6 py-2 rounded shadow hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-600">
                    Download Contract
                </button>
                <button @click="openTerminateContract"
                    class="bg-red-600 text-white font-semibold px-6 py-2 rounded shadow hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-red-600">
                    Terminate Contract
                </button>
            </div>
        </div>
    </div>

    <!-- Termination Confirmation Modal -->
    <div v-if="showInitTerminationModal" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div class="bg-white rounded-lg shadow-lg max-w-md w-full p-6">
            <div class="mb-4">
                <h5 class="text-xl font-semibold text-red-600">Terminate Contract</h5>
            </div>
            <p class="mb-6">Are you sure you want to initiate the termination of this contract?</p>
            <div v-if="initError" class="text-red-600 bg-red-100 p-4 rounded mb-4">{{ initError }}</div>
            <div class="flex justify-end space-x-4">
                <button type="button" class="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400" @click="closeModal">Cancel</button>
                <button type="button" class="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-500" @click="initTerminateContract">Init Termination</button>
            </div>
        </div>
    </div>

    <!-- Termination Details Modal -->
    <div v-if="showTerminationForm" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div class="bg-white rounded-lg shadow-lg max-w-lg w-full p-6">
            <div class="mb-4">
                <h5 class="text-xl font-semibold text-red-600">Finalize Termination</h5>
            </div>
            <div class="mb-4">
                <label class="block font-semibold text-gray-700 mb-1">Company Verification Code</label>
                <input v-model="terminationData.company_verification_code" type="text" class="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500" />
            </div>
            <div class="mb-4">
                <label class="block font-semibold text-gray-700 mb-1">Termination Reason</label>
                <textarea v-model="terminationData.termination_reason" class="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"></textarea>
            </div>
            <div class="mb-4">
                <label class="block font-semibold text-gray-700 mb-1">Termination Fine Amount</label>
                <input v-model="terminationData.termination_fine_amount" type="text" class="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500" />
            </div>
            <div v-if="terminationErrors" class="text-red-600 bg-red-100 p-4 rounded mb-4">
                <ul>
                    <li v-for="(error, field) in terminationErrors" :key="field">{{ field }}: {{ error[0] }}</li>
                </ul>
            </div>
            <div class="flex justify-end space-x-4">
                <button type="button" class="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400" @click="closeModal">Cancel</button>
                <button type="button" class="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-500" @click="finalizeTermination">Submit Termination</button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import apiClient from '@/services/api';
const props = defineProps({
    contract: Object
});

const showInitTerminationModal = ref(false);
const showTerminationForm = ref(false);
const initError = ref(null);
const terminationData = ref({
    company_verification_code: '',
    termination_reason: '',
    termination_fine_amount: ''
});
const terminationErrors = ref(null);

// Open initial termination confirmation modal
const openTerminateContract = () => {
    showInitTerminationModal.value = true;
    initError.value = null;
};

// Close any modal
const closeModal = () => {
    showInitTerminationModal.value = false;
    showTerminationForm.value = false;
    initError.value = null;
    terminationErrors.value = null;
};

// Initiate contract termination
const initTerminateContract = async () => {
    try {
        const response = await apiClient.post('/contracts/staff/contracts/terminate/init/', {
            contract: props.contract.id
        });
        if (response.status === 200) {
            showInitTerminationModal.value = false;
            showTerminationForm.value = true;
        }
    } catch (error) {
        initError.value = error.response?.data?.non_field_errors || 'Failed to initiate termination.';
    }
};

// Finalize termination with additional details
const finalizeTermination = async () => {
    try {
        const response = await apiClient.post('/contracts/staff/contracts/terminate/', {
            contract_id: props.contract.id,
            ...terminationData.value
        });
        if (response.status === 201) {
            alert('Termination completed successfully');
            closeModal();
        }
    } catch (error) {
        terminationErrors.value = error.response?.data || { non_field_errors: ['An unexpected error occurred.'] };
    }
};

// Download contract
const downloadContract = async () => {
    try {
        const response = await apiClient.get(`/contracts/generate-contract/${props.contract.id}/`, {
            responseType: 'blob'
        });
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `Contract_${props.contract.id}.docx`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    } catch (error) {
        alert('Failed to download contract.');
        console.error(error);
    }
};

const formatPrice = (price) => new Intl.NumberFormat('uz-UZ').format(price);
const formatDate = (dateString) => new Date(dateString).toLocaleDateString('uz-UZ');

const getStatusBadgeClass = (status) => {
    switch (status.toLowerCase()) {
        case 'active':
            return 'bg-green-100 text-green-800';
        case 'completed':
            return 'bg-blue-100 text-blue-800';
        case 'pending':
            return 'bg-yellow-100 text-yellow-800';
        case 'cancelled':
            return 'bg-red-100 text-red-800';
        default:
            return 'bg-gray-100 text-gray-800';
    }
};
</script>

<style scoped>
/* Add any specific custom styles for finer details */
</style>
