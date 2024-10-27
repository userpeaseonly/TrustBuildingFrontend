<template>
    <div class="flex">
        <!-- Sidebar -->
        <StaffSidebar />

        <!-- Main Content Area -->
        <div class="flex-1 p-8 bg-gray-100">
            <h2 class="text-3xl font-bold text-center mb-8 text-indigo-700">Manage Customers</h2>

            <!-- Tab Navigation for My Customers and All Customers -->
            <div class="flex justify-center mb-6">
                <button
                    class="px-6 py-2 font-semibold rounded-t-md focus:outline-none"
                    :class="activeTab === 'myCustomers' ? 'bg-indigo-600 text-white' : 'bg-gray-300 text-gray-800 hover:bg-gray-400'"
                    @click="activeTab = 'myCustomers'"
                >
                    My Customers
                </button>
                <button
                    class="px-6 py-2 font-semibold rounded-t-md focus:outline-none ml-2"
                    :class="activeTab === 'allCustomers' ? 'bg-indigo-600 text-white' : 'bg-gray-300 text-gray-800 hover:bg-gray-400'"
                    @click="activeTab = 'allCustomers'"
                >
                    All Customers
                </button>
            </div>

            <!-- My Customers Section -->
            <div v-if="activeTab === 'myCustomers'">
                <div v-if="loadingMyCustomers" class="flex justify-center items-center my-5">
                    <div class="animate-spin rounded-full h-10 w-10 border-t-4 border-indigo-500"></div>
                </div>
                <div v-else-if="errorMyCustomers" class="bg-red-100 text-red-800 p-4 rounded text-center">
                    {{ errorMyCustomers }}
                </div>
                <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <CustomerCard v-for="customer in myCustomers" :key="customer.id" :customer="customer" />
                </div>
            </div>

            <!-- All Customers Section -->
            <div v-if="activeTab === 'allCustomers'">
                <div class="flex justify-between items-center mb-4">
                    <h4 class="text-2xl font-bold text-indigo-700">All Customers</h4>
                    <button
                        class="inline-flex items-center px-6 py-2 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all"
                        @click="openModal"
                    >
                        Add Customer
                    </button>
                </div>

                <div v-if="loadingAllCustomers" class="flex justify-center items-center my-5">
                    <div class="animate-spin rounded-full h-10 w-10 border-t-4 border-indigo-500"></div>
                </div>
                <div v-else-if="errorAllCustomers" class="bg-red-100 text-red-800 p-4 rounded text-center">
                    {{ errorAllCustomers }}
                </div>
                <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <AllCustomerCard v-for="customer in allCustomers" :key="customer.id" :customer="customer" />
                </div>
            </div>
        </div>

        <!-- Add Customer Modal -->
        <div class="modal fade show d-block" tabindex="-1" v-if="showAddCustomerModal">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title text-indigo-700">Add New Customer</h5>
                        <button type="button" class="btn-close" @click="closeModal"></button>
                    </div>
                    <div class="modal-body">
                        <form @submit.prevent="submitForm" enctype="multipart/form-data">
                            <!-- General error message -->
                            <div v-if="generalError" class="alert alert-danger">{{ generalError }}</div>

                            <!-- Form Fields -->
                            <div v-for="(field, index) in customerFields" :key="index" class="mb-3">
                                <label :for="field.id" class="form-label">{{ field.label }}</label>
                                <input
                                    :type="field.type"
                                    :id="field.id"
                                    v-model="newCustomer[field.model]"
                                    class="form-control"
                                    :class="{ 'is-invalid': backendErrors[field.model] }"
                                    :required="field.required"
                                />
                                <small v-if="backendErrors[field.model]" class="text-danger">
                                    {{ backendErrors[field.model][0] }}
                                </small>
                            </div>

                            <!-- Passport Copy Upload -->
                            <div class="mb-3">
                                <label for="passportCopy" class="form-label">Passport Copy</label>
                                <input
                                    @change="handleFileUpload"
                                    type="file"
                                    id="passportCopy"
                                    class="form-control"
                                    accept="image/*"
                                />
                                <small v-if="backendErrors.passport_copy" class="text-danger">
                                    {{ backendErrors.passport_copy[0] }}
                                </small>
                            </div>

                            <button type="submit" class="btn btn-success w-full">Add Customer</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import apiClient from '@/services/api';
import StaffSidebar from '@/components/StaffSidebar.vue';
import CustomerCard from '@/components/CustomerCard.vue';
import AllCustomerCard from '@/components/AllCustomerCard.vue';

const activeTab = ref('myCustomers');
const myCustomers = ref([]);
const allCustomers = ref([]);
const loadingMyCustomers = ref(true);
const loadingAllCustomers = ref(true);
const errorMyCustomers = ref(null);
const errorAllCustomers = ref(null);

const newCustomer = ref({
    first_name: '',
    last_name: '',
    third_name: '',
    phone_number: '',
    phone_number2: '',
    passport_series: '',
    passport_place_issuance: '',
    passport_date_issuance: '',
    passport_jshshr: '',
    password: '',
    passport_copy: null,
});

const backendErrors = ref({});
const generalError = ref('');
const showAddCustomerModal = ref(false);

// Form fields configuration for easier reuse and styling
const customerFields = [
    { label: 'First Name', model: 'first_name', type: 'text', id: 'firstName', required: true },
    { label: 'Last Name', model: 'last_name', type: 'text', id: 'lastName', required: true },
    { label: 'Third Name', model: 'third_name', type: 'text', id: 'thirdName', required: false },
    { label: 'Phone Number', model: 'phone_number', type: 'tel', id: 'phoneNumber', required: true },
    { label: 'Phone Number 2', model: 'phone_number2', type: 'tel', id: 'phoneNumber2', required: false },
    { label: 'Passport Series', model: 'passport_series', type: 'text', id: 'passportSeries', required: true },
    { label: 'Passport Place Issuance', model: 'passport_place_issuance', type: 'text', id: 'passportPlaceIssuance', required: true },
    { label: 'Passport Date Issuance', model: 'passport_date_issuance', type: 'date', id: 'passportDateIssuance', required: true },
    { label: 'Passport JSHSHR', model: 'passport_jshshr', type: 'text', id: 'passportJshshr', required: true },
];

const handleFileUpload = (event) => {
    const file = event.target.files[0];
    newCustomer.value.passport_copy = file;
};

const fetchMyCustomers = async () => {
    try {
        const response = await apiClient.get('/users/customer/');
        myCustomers.value = response.data;
    } catch (error) {
        errorMyCustomers.value = 'Failed to fetch My Customers.';
    } finally {
        loadingMyCustomers.value = false;
    }
};

const fetchAllCustomers = async () => {
    try {
        const response = await apiClient.get('/users/customer/all/');
        allCustomers.value = response.data;
    } catch (error) {
        errorAllCustomers.value = 'Failed to fetch All Customers.';
    } finally {
        loadingAllCustomers.value = false;
    }
};

const submitForm = async () => {
    const formData = new FormData();
    for (const [key, value] of Object.entries(newCustomer.value)) {
        formData.append(key, value);
    }

    try {
        await apiClient.post('/users/customer/create/', formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });
        backendErrors.value = {};
        generalError.value = '';
        showAddCustomerModal.value = false;
        fetchAllCustomers();
    } catch (error) {
        backendErrors.value = error.response?.data || {};
        generalError.value = backendErrors.value.non_field_errors || 'Failed to create customer.';
    }
};

const openModal = () => {
    showAddCustomerModal.value = true;
};

const closeModal = () => {
    showAddCustomerModal.value = false;
};

onMounted(() => {
    fetchMyCustomers();
    fetchAllCustomers();
});
</script>

<style scoped>
/* Tailwind CSS used for styling */
.modal {
    display: block;
}
</style>
