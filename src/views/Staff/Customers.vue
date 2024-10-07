<template>
    <div class="d-flex">
        <!-- Sidebar -->
        <StaffSidebar />

        <!-- Main Content Area -->
        <div class="container mt-5" style="flex: 1;">
            <h2 class="mb-4 text-center">Manage Customers</h2>

            <!-- Tab Navigation for My Customers and All Customers -->
            <ul class="nav nav-tabs mb-4">
                <li class="nav-item">
                    <a class="nav-link" :class="{ active: activeTab === 'myCustomers' }" href="#"
                        @click.prevent="activeTab = 'myCustomers'">
                        My Customers
                    </a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" :class="{ active: activeTab === 'allCustomers' }" href="#"
                        @click.prevent="activeTab = 'allCustomers'">
                        All Customers
                    </a>
                </li>
            </ul>

            <!-- My Customers Section -->
            <div v-if="activeTab === 'myCustomers'">
                <div v-if="loadingMyCustomers" class="text-center my-5">
                    <div class="spinner-border" role="status">
                        <span class="sr-only">Loading...</span>
                    </div>
                </div>
                <div v-else-if="errorMyCustomers" class="alert alert-danger text-center">
                    {{ errorMyCustomers }}
                </div>
                <div v-else>
                    <div class="row row-cols-1 g-4">
                        <div class="col" v-for="customer in myCustomers" :key="customer.id">
                            <CustomerCard :customer="customer" />
                        </div>
                    </div>
                </div>
            </div>

            <!-- All Customers Section -->
            <div v-if="activeTab === 'allCustomers'">
                <div class="d-flex justify-content-between align-items-center mb-4">
                    <h4>All Customers</h4>
                    <button class="btn btn-primary" @click="openModal">Add Customer</button>
                </div>

                <div v-if="loadingAllCustomers" class="text-center my-5">
                    <div class="spinner-border" role="status">
                        <span class="sr-only">Loading...</span>
                    </div>
                </div>
                <div v-else-if="errorAllCustomers" class="alert alert-danger text-center">
                    {{ errorAllCustomers }}
                </div>
                <div v-else>
                    <div class="row row-cols-1 g-4">
                        <div class="col" v-for="customer in allCustomers" :key="customer.id">
                            <AllCustomerCard :customer="customer" />
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Add Customer Modal -->
        <div class="modal fade" id="addCustomerModal" tabindex="-1" aria-labelledby="addCustomerModalLabel"
            aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="addCustomerModalLabel">Add New Customer</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <!-- Ensure enctype="multipart/form-data" -->
                        <form @submit.prevent="submitForm" enctype="multipart/form-data">
                            <!-- General error message -->
                            <div v-if="generalError" class="alert alert-danger">{{ generalError }}</div>

                            <div class="mb-3">
                                <label for="firstName" class="form-label">First Name</label>
                                <input v-model="newCustomer.first_name" type="text" id="firstName" class="form-control"
                                    required />
                                <small v-if="backendErrors.first_name" class="text-danger">{{
                                    backendErrors.first_name[0] }}</small>
                            </div>

                            <div class="mb-3">
                                <label for="lastName" class="form-label">Last Name</label>
                                <input v-model="newCustomer.last_name" type="text" id="lastName" class="form-control"
                                    required />
                                <small v-if="backendErrors.last_name" class="text-danger">{{ backendErrors.last_name[0]
                                    }}</small>
                            </div>

                            <div class="mb-3">
                                <label for="thirdName" class="form-label">Third Name</label>
                                <input v-model="newCustomer.third_name" type="text" id="thirdName"
                                    class="form-control" />
                                <small v-if="backendErrors.third_name" class="text-danger">{{
                                    backendErrors.third_name[0] }}</small>
                            </div>

                            <div class="mb-3">
                                <label for="phoneNumber" class="form-label">Phone Number</label>
                                <input v-model="newCustomer.phone_number" type="tel" id="phoneNumber"
                                    class="form-control" required />
                                <small v-if="backendErrors.phone_number" class="text-danger">{{
                                    backendErrors.phone_number[0] }}</small>
                            </div>

                            <div class="mb-3">
                                <label for="phoneNumber2" class="form-label">Phone Number 2</label>
                                <input v-model="newCustomer.phone_number2" type="tel" id="phoneNumber2"
                                    class="form-control" />
                                <small v-if="backendErrors.phone_number2" class="text-danger">{{
                                    backendErrors.phone_number2[0] }}</small>
                            </div>

                            <div class="mb-3">
                                <label for="passportSeries" class="form-label">Passport Series</label>
                                <input v-model="newCustomer.passport_series" type="text" id="passportSeries"
                                    class="form-control" required />
                                <small v-if="backendErrors.passport_series" class="text-danger">{{
                                    backendErrors.passport_series[0] }}</small>
                            </div>

                            <div class="mb-3">
                                <label for="passportPlaceIssuance" class="form-label">Passport Place Issuance</label>
                                <input v-model="newCustomer.passport_place_issuance" type="text"
                                    id="passportPlaceIssuance" class="form-control" required />
                                <small v-if="backendErrors.passport_place_issuance" class="text-danger">{{
                                    backendErrors.passport_place_issuance[0] }}</small>
                            </div>

                            <div class="mb-3">
                                <label for="passportDateIssuance" class="form-label">Passport Date Issuance</label>
                                <input v-model="newCustomer.passport_date_issuance" type="date"
                                    id="passportDateIssuance" class="form-control" required />
                                <small v-if="backendErrors.passport_date_issuance" class="text-danger">{{
                                    backendErrors.passport_date_issuance[0] }}</small>
                            </div>

                            <div class="mb-3">
                                <label for="passportJshshr" class="form-label">Passport JSHSHR</label>
                                <input v-model="newCustomer.passport_jshshr" type="text" id="passportJshshr"
                                    class="form-control" required />
                                <small v-if="backendErrors.passport_jshshr" class="text-danger">{{
                                    backendErrors.passport_jshshr[0] }}</small>
                            </div>

                            <!-- Passport Copy Upload -->
                            <div class="mb-3">
                                <label for="passportCopy" class="form-label">Passport Copy</label>
                                <input @change="handleFileUpload" type="file" id="passportCopy" class="form-control"
                                    accept="image/*" />
                                <small v-if="backendErrors.passport_copy" class="text-danger">{{
                                    backendErrors.passport_copy[0] }}</small>
                            </div>

                            <div class="mb-3">
                                <label for="password" class="form-label">Password</label>
                                <input v-model="newCustomer.password" type="password" id="password" class="form-control"
                                    disabled />
                                <small v-if="backendErrors.password" class="text-danger">{{ backendErrors.password[0]
                                    }}</small>
                            </div>

                            <button type="submit" class="btn btn-success w-100">Add Customer</button>
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
        const modalElement = document.getElementById('addCustomerModal');
        const modal = bootstrap.Modal.getInstance(modalElement);
        modal.hide();
        fetchAllCustomers();
    } catch (error) {
        backendErrors.value = error.response?.data || {};
        generalError.value = backendErrors.value.non_field_errors || 'Failed to create customer.';
    }
};

const openModal = () => {
    const modalElement = document.getElementById('addCustomerModal');
    const modal = new bootstrap.Modal(modalElement);
    modal.show();
};

onMounted(() => {
    fetchMyCustomers();
    fetchAllCustomers();
});
</script>

<style scoped>
.container {
    max-width: 1200px;
}

h2 {
    font-weight: bold;
}

.nav-tabs .nav-link {
    cursor: pointer;
}

.nav-tabs .nav-link.active {
    background-color: #007bff;
    color: white;
}

.card {
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.card-title {
    font-size: 1.25rem;
    font-weight: bold;
}

.text-danger {
    font-size: 0.875rem;
}
</style>
