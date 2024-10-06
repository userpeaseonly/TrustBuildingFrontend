<!-- src/views/Staff/CreateContract.vue -->
<template>
<div class="container mt-5">
    <h2>Create Contract</h2>

    <!-- Building Selection -->
    <div class="mb-3">
    <label for="building" class="form-label">Select Building</label>
    <select v-model="selectedBuilding" @change="fetchApartments" class="form-select">
        <option v-for="building in buildings" :key="building.id" :value="building.id">
        {{ building.building_number }} - {{ building.address }}
        </option>
    </select>
    </div>

    <!-- Apartment Selection -->
    <div v-if="apartments.length" class="mb-3">
    <label for="apartment" class="form-label">Select Apartment</label>
    <select v-model="selectedApartment" class="form-select">
        <option v-for="apartment in apartments" :key="apartment.id" :value="apartment.id">
        Apartment {{ apartment.apartment_number }} - Floor {{ apartment.floor_number }}
        </option>
    </select>
    </div>

    <!-- Customer Selection -->
    <div v-if="customers.length" class="mb-3">
    <label for="customer" class="form-label">Select Customer</label>
    <select v-model="selectedCustomer" class="form-select">
        <option v-for="customer in customers" :key="customer.id" :value="customer.id">
        {{ customer.first_name }} {{ customer.last_name }} - {{ customer.user.phone_number }}
        </option>
    </select>
    </div>

    <!-- Other contract fields -->
    <div class="mb-3">
    <label for="contractDate" class="form-label">Contract Date</label>
    <input v-model="contractDate" type="date" class="form-control" id="contractDate" />
    </div>

    <div class="mb-3">
    <label for="pricePerSquare" class="form-label">Price per Square</label>
    <input v-model="pricePerSquare" type="text" class="form-control" id="pricePerSquare" />
    </div>

    <div class="mb-3">
    <label for="paymentMonths" class="form-label">Payment Months</label>
    <input v-model="paymentMonths" type="number" class="form-control" id="paymentMonths" />
    </div>

    <!-- Down Payment Section -->
    <InputPaymentDetails title="Down" :payment="downPayment" :isIncluded="downPaymentIncluded" />

    <!-- Last Payment Section -->
    <InputPaymentDetails title="Last" :payment="lastPayment" :isIncluded="lastPaymentIncluded" />

    <!-- Submit Button -->
    <button @click="submitContract" class="btn btn-primary mt-3">Submit Contract</button>
</div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import apiClient from '@/services/api'; // Axios instance
import InputPaymentDetails from '@/components/InputPaymentDetails.vue';

const selectedBuilding = ref(null);
const selectedApartment = ref(null);
const selectedCustomer = ref(null);
const contractDate = ref('');
const pricePerSquare = ref('');
const paymentMonths = ref(1);

// Flags for whether the user wants to include down_payment and last_payment
const downPaymentIncluded = ref(false);
const lastPaymentIncluded = ref(false);

// Payment details
const downPayment = ref({
payment_date: '',
payment_amount: '',
payment_method: '',
payment_reference: '',
payment_notes: '',
payment_paid: false,
});

const lastPayment = ref({
payment_date: '',
payment_amount: '',
payment_method: '',
payment_reference: '',
payment_notes: '',
payment_paid: false,
});

// Buildings, apartments, and customers
const buildings = ref([]);
const apartments = ref([]);
const customers = ref([]);

// Fetch buildings, apartments, and customers
const fetchBuildings = async () => {
const response = await apiClient.get('/buildings/');
buildings.value = response.data;
};

const fetchApartments = async () => {
const response = await apiClient.get(`/buildings/${selectedBuilding.value}/apartments/`);
apartments.value = response.data;
};

const fetchCustomers = async () => {
const response = await apiClient.get('/users/customer/all/');
customers.value = response.data;
};

// Submit contract
const submitContract = async () => {
const data = {
    apartment: selectedApartment.value,
    customer: selectedCustomer.value,
    contract_date: contractDate.value,
    price_per_square: pricePerSquare.value,
    payment_months: paymentMonths.value,
};

// Conditionally add down_payment and last_payment
if (downPaymentIncluded.value) {
    data.down_payment = downPayment.value;
}
if (lastPaymentIncluded.value) {
    data.last_payment = lastPayment.value;
}

try {
    await apiClient.post('/contracts/staff/contracts/create/', data);
    alert('Contract created successfully');
} catch (error) {
    alert(`Failed to create contract\n${error.response.data.non_field_errors || ''}`);
}
};

onMounted(() => {
fetchBuildings();
fetchCustomers();
});
</script>
