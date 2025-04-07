<template>
    <div class="card mb-4 shadow-lg border-0 rounded-lg">
        <div class="card-body p-4">
            <h5 class="card-title text-primary d-flex align-items-center mb-3">
                <i class="bi bi-file-text-fill me-2"></i> {{ $t('message.contract_number', { id: contract.contract.id }) }}
            </h5>

            <!-- Section for Contract Overview -->
            <div class="mb-4">
                <p class="card-text d-flex align-items-center">
                    <i class="bi bi-calendar-check-fill me-2"></i>
                    <strong>{{ $t('message.contract_date') }}: &nbsp;</strong> {{ contract.contract.contract_date }}
                </p>

                <p class="card-text d-flex align-items-center">
                    <i class="bi bi-check-circle-fill me-2"></i>
                    <strong>{{ $t('message.status') }}: &nbsp;</strong>
                    <span :class="getStatusBadgeClass(contract.contract.status)"
                        class="px-3 py-1 rounded-full text-sm font-semibold uppercase tracking-wide">{{ contract.contract.status }}</span>
                </p>
            </div>

            <!-- Section for Apartment Details -->
            <div class="border-top pt-3 mb-4">
                <h6 class="text-muted mb-3">{{ $t('message.apartment_information') }}</h6>
                <p class="card-text d-flex align-items-center">
                    <i class="bi bi-building me-2"></i>
                    <strong>{{ $t('message.apartment_number') }}: &nbsp;</strong>
                    {{ contract.contract.apartment.apartment_number }}
                </p>
                <p class="card-text d-flex align-items-center">
                    <i class="bi bi-stack me-2"></i>
                    <strong>{{ $t('message.floor_number') }}: &nbsp;</strong>
                    {{ contract.contract.apartment.floor_number }}
                </p>
                <p class="card-text d-flex align-items-center">
                    <i class="bi bi-door-open-fill me-2"></i>
                    <strong>{{ $t('message.building_entrance') }}: &nbsp;</strong>
                    {{ contract.contract.apartment.building_entrance }}
                </p>
                <p class="card-text d-flex align-items-center">
                    <i class="bi bi-fullscreen-exit me-2"></i>
                    <strong>{{ $t('message.total_area') }}: &nbsp;</strong>
                    {{ contract.contract.apartment.total_area }} m²
                </p>
                <p class="card-text d-flex align-items-center">
                    <i class="bi bi-aspect-ratio-fill me-2"></i>
                    <strong>{{ $t('message.living_area') }}: &nbsp;</strong>
                    {{ contract.contract.apartment.living_area }} m²
                </p>
                <p class="card-text d-flex align-items-center">
                    <i class="bi bi-calendar-fill me-2"></i>
                    <strong>{{ $t('message.created_at') }}: &nbsp;</strong>
                    {{ formatDate(contract.contract.apartment.created_at) }}
                </p>
                <p class="card-text d-flex align-items-center">
                    <i class="bi bi-calendar-check-fill me-2"></i>
                    <strong>{{ $t('message.updated_at') }}: &nbsp;</strong>
                    {{ formatDate(contract.contract.apartment.updated_at) }}
                </p>
            </div>

            <!-- Section for Customer Details -->
            <div class="border-top pt-3 mb-4">
                <h6 class="text-muted mb-3">{{ $t('message.customer_information') }}</h6>
                <p class="card-text d-flex align-items-center">
                    <i class="bi bi-person-fill me-2"></i>
                    <strong>{{ $t('message.customer') }}: &nbsp;</strong>
                    {{ contract.contract.customer.first_name }} {{ contract.contract.customer.last_name }} {{ contract.contract.customer.third_name }}
                </p>
                <p class="card-text d-flex align-items-center">
                    <i class="bi bi-telephone-fill me-2"></i>
                    <strong>{{ $t('message.phone_number') }}: &nbsp;</strong>
                    {{ contract.contract.customer.user.phone_number }}
                </p>
                <p v-if="contract.contract.customer.phone_number2" class="card-text d-flex align-items-center">
                    <i class="bi bi-telephone-fill me-2"></i>
                    <strong>{{ $t('message.phone_number_2') }}: &nbsp;</strong>
                    {{ contract.contract.customer.phone_number2 }}
                </p>
                <p class="card-text d-flex align-items-center">
                    <i class="bi bi-file-earmark-text-fill me-2"></i>
                    <strong>{{ $t('message.passport_issuance_place') }}: &nbsp;</strong>
                    {{ contract.contract.customer.passport_place_issuance }}
                </p>
            </div>

            <!-- Section for Financial Details -->
            <div class="border-top pt-3">
                <h6 class="text-muted mb-3">{{ $t('message.financial_information') }}</h6>
                <p class="card-text d-flex align-items-center">
                    <i class="bi bi-cash-stack me-2"></i>
                    <strong>{{ $t('message.price_per_square') }}: &nbsp;</strong>
                    {{ formatPrice(contract.contract.price_per_square) }} UZS
                </p>

                <p class="card-text d-flex align-items-center">
                    <i class="bi bi-currency-exchange me-2"></i>
                    <strong>{{ $t('message.contract_amount') }}: &nbsp;</strong>
                    {{ formatPrice(contract.contract.contract_amount) }} UZS
                </p>

                <p class="card-text d-flex align-items-center">
                    <i class="bi bi-clock-history me-2"></i>
                    <strong>{{ $t('message.payment_months') }}: &nbsp;</strong>
                    {{ contract.contract.payment_months }}
                </p>

                <p class="card-text d-flex align-items-center">
                    <i class="bi bi-wallet-fill me-2"></i>
                    <strong>{{ $t('message.monthly_payment') }}: &nbsp;</strong>
                    {{ formatPrice(contract.contract.monthly_payment) }} UZS
                </p>
            </div>

            <!-- Section for Termination Details -->
            <div class="border-top pt-3 mt-3">
                <h6 class="text-muted mb-3">{{ $t('message.termination_details') }}</h6>
                <p class="card-text d-flex align-items-center">
                    <i class="bi bi-cash-stack me-2"></i>
                    <strong>{{ $t('message.termination_fine') }}: &nbsp;</strong>
                    {{ formatPrice(contract.termination_fine_amount) }} UZS
                </p>

                <p class="card-text d-flex align-items-center">
                    <i class="bi bi-currency-exchange me-2"></i>
                    <strong>{{ $t('message.termination_planned_payment') }}: &nbsp;</strong>
                    {{ formatPrice(contract.termination_planned_payment) }} UZS
                </p>

                <p class="card-text d-flex align-items-center">
                    <i class="bi bi-clock-history me-2"></i>
                    <strong>{{ $t('message.termination_reason') }}: &nbsp;</strong>
                    {{ contract.termination_reason }}
                </p>

                <p class="card-text d-flex align-items-center">
                    <i class="bi bi-wallet-fill me-2"></i>
                    <strong>{{ $t('message.termination_date') }}: &nbsp;</strong>
                    {{ contract.termination_date }}
                </p>
                <p class="mt-4">
                    <i class="bi bi-wallet-fill me-2"></i>
                    <strong class="text-warning">{{ $t('message.paid_amount') }}: &nbsp;</strong>
                    <span class="py-2 px-3 border-warning border-2 rounded">{{ formatPrice(contract.termination_payment_paid_amount) }} UZS</span>
                </p>
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



const formatPrice = (price) => new Intl.NumberFormat('uz-UZ').format(price);

// Helper function to format date in a readable way
const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('uz-UZ');
};

// Helper function to get status badge classes based on contract status
const getStatusBadgeClass = (status) => {
    switch (status.toLowerCase()) {
        case 'active':
            return 'badge-success';
        case 'completed':
            return 'badge-primary';
        case 'pending':
            return 'badge-warning';
        case 'cancelled':
            return 'badge-danger';
        default:
            return 'badge-secondary';
    }
};
</script>

<style scoped>
.card {
    border-radius: 15px;
    background-color: #f9f9f9;
}

.card-body {
    background-color: #ffffff;
    border-radius: 10px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.card-title {
    font-size: 1.5rem;
    font-weight: bold;
}

.card-text {
    font-size: 1.1rem;
}

.badge {
    font-size: 1rem;
    padding: 0.5em 1em;
}
</style>
