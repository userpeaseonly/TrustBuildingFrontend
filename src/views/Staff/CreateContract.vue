<template>
    <div class="container mx-auto mt-10 p-6 bg-white shadow-md rounded-lg max-w-3xl">
        <h2 class="text-3xl font-bold mb-6 text-center">Create Contract</h2>

        <!-- Building Selection -->
        <div class="mb-6">
            <label for="building" class="block text-sm font-medium text-gray-700 mb-2">Select Building</label>
            <select v-model="selectedBuilding" @change="fetchApartments" class="form-select w-full border border-gray-300 rounded-lg p-2">
                <option value="" disabled>Select a building</option>
                <option v-for="building in buildings" :key="building.id" :value="building.id">
                    {{ building.building_number }} - {{ building.address }}
                </option>
            </select>
        </div>

        <!-- Apartment Selection -->
        <div v-if="apartments.length" class="mb-6">
            <label for="apartment" class="block text-sm font-medium text-gray-700 mb-2">Select Apartment</label>
            <select v-model="selectedApartment" class="form-select w-full border border-gray-300 rounded-lg p-2">
                <option value="" disabled>Select an apartment</option>
                <option v-for="apartment in apartments" :key="apartment.id" :value="apartment.id">
                    Apartment {{ apartment.apartment_number }} - Floor {{ apartment.floor_number }}
                </option>
            </select>
        </div>

        <!-- Customer Selection -->
        <div v-if="customers.length" class="mb-6">
            <label for="customer" class="block text-sm font-medium text-gray-700 mb-2">Select Customer</label>
            <select v-model="selectedCustomer" class="form-select w-full border border-gray-300 rounded-lg p-2">
                <option value="" disabled>Select a customer</option>
                <option v-for="customer in customers" :key="customer.id" :value="customer.id">
                    {{ customer.first_name }} {{ customer.last_name }} - {{ customer.user.phone_number }}
                </option>
            </select>
        </div>

        <!-- Other contract fields -->
        <div class="mb-6">
            <label for="contractDate" class="block text-sm font-medium text-gray-700 mb-2">Contract Date</label>
            <input v-model="contractDate" type="date" class="form-input w-full border border-gray-300 rounded-lg p-2" id="contractDate" />
        </div>

        <div class="mb-6">
            <label for="pricePerSquare" class="block text-sm font-medium text-gray-700 mb-2">Price per Square</label>
            <input v-model="pricePerSquare" type="text" class="form-input w-full border border-gray-300 rounded-lg p-2" id="pricePerSquare" />
        </div>

        <div class="mb-6">
            <label for="paymentMonths" class="block text-sm font-medium text-gray-700 mb-2">Payment Months</label>
            <input v-model="paymentMonths" type="number" class="form-input w-full border border-gray-300 rounded-lg p-2" id="paymentMonths" />
        </div>

        <!-- Down Payment Section -->
        <div class="mb-6">
            <InputPaymentDetails title="Down Payment" :payment="downPayment" v-model:isIncluded="downPaymentIncluded" />
        </div>

        <!-- Last Payment Section -->
        <div class="mb-6">
            <InputPaymentDetails title="Last Payment" :payment="lastPayment" v-model:isIncluded="lastPaymentIncluded" />
        </div>

        <!-- Submit Button -->
        <button @click="submitContract" class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg mt-3 w-full">
            Submit Contract
        </button>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import apiClient from '@/services/api';
import InputPaymentDetails from '@/components/InputPaymentDetails.vue';

// Form fields
const selectedBuilding = ref(null);
const selectedApartment = ref(null);
const selectedCustomer = ref(null);
const contractDate = ref(new Date().toISOString().slice(0, 10)); // Default to today's date
const pricePerSquare = ref('');
const paymentMonths = ref(1);

// Payment-related data
const downPaymentIncluded = ref(false);
const lastPaymentIncluded = ref(false);
const downPayment = ref({
    payment_date: new Date().toISOString().slice(0, 10),
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

// Data for buildings, apartments, and customers
const buildings = ref([]);
const apartments = ref([]);
const customers = ref([]);

// Fetch buildings, apartments, and customers
const fetchBuildings = async () => {
    const response = await apiClient.get('/buildings/');
    buildings.value = response.data;
};

const fetchApartments = async () => {
    if (!selectedBuilding.value) return;
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
        window.location.href = '/staff/contracts';
    } catch (error) {
        alert(`Failed to create contract\n${error.response.data.non_field_errors || ''}`);
    }
};

onMounted(() => {
    fetchBuildings();
    fetchCustomers();
});
</script>
