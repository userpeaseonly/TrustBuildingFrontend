<template>
    <div class="card mb-4 shadow-lg border-0 rounded-lg">
        <div class="card-body p-4">
            <h5 class="card-title text-primary d-flex align-items-center mb-3">
                <i class="bi bi-file-text-fill me-2"></i> Contract #{{ contract.id }}
            </h5>

            <!-- Section for Contract Overview -->
            <div class="mb-4">
                <p class="card-text d-flex align-items-center">
                    <i class="bi bi-calendar-check-fill me-2"></i>
                    <strong>Contract Date: &nbsp;</strong> {{ contract.contract_date }}
                </p>
                
                <p class="card-text d-flex align-items-center">
                    <i class="bi bi-check-circle-fill me-2"></i>
                    <strong>Status: &nbsp;</strong> 
                    <span :class="getStatusBadgeClass(contract.status)" class="px-3 py-1 rounded-full text-sm font-semibold uppercase tracking-wide">{{ contract.status }}</span>
                </p>
            </div>

            <!-- Section for Apartment Details -->
            <div class="border-top pt-3 mb-4">
                <h6 class="text-muted mb-3">Apartment Information</h6>
                <p class="card-text d-flex align-items-center">
                    <i class="bi bi-building me-2"></i> 
                    <strong>Apartment Number: &nbsp;</strong> 
                    {{ contract.apartment.apartment_number }}
                </p>
                <p class="card-text d-flex align-items-center">
                    <i class="bi bi-stack me-2"></i> 
                    <strong>Floor Number: &nbsp;</strong> 
                    {{ contract.apartment.floor_number }}
                </p>
                <p class="card-text d-flex align-items-center">
                    <i class="bi bi-door-open-fill me-2"></i> 
                    <strong>Building Entrance: &nbsp;</strong> 
                    {{ contract.apartment.building_entrance }}
                </p>
                <p class="card-text d-flex align-items-center">
                    <i class="bi bi-fullscreen-exit me-2"></i> 
                    <strong>Total Area: &nbsp;</strong> 
                    {{ contract.apartment.total_area }} m²
                </p>
                <p class="card-text d-flex align-items-center">
                    <i class="bi bi-aspect-ratio-fill me-2"></i> 
                    <strong>Living Area: &nbsp;</strong> 
                    {{ contract.apartment.living_area }} m²
                </p>
                <p class="card-text d-flex align-items-center">
                    <i class="bi bi-calendar-fill me-2"></i> 
                    <strong>Created At: &nbsp;</strong> 
                    {{ formatDate(contract.apartment.created_at) }}
                </p>
                <p class="card-text d-flex align-items-center">
                    <i class="bi bi-calendar-check-fill me-2"></i> 
                    <strong>Updated At: &nbsp;</strong> 
                    {{ formatDate(contract.apartment.updated_at) }}
                </p>
            </div>

            <!-- Section for Customer Details -->
            <div class="border-top pt-3 mb-4">
                <h6 class="text-muted mb-3">Customer Information</h6>
                <p class="card-text d-flex align-items-center">
                    <i class="bi bi-person-fill me-2"></i> 
                    <strong>Customer: &nbsp;</strong> 
                    {{ contract.customer.first_name }} {{ contract.customer.last_name }} {{ contract.customer.third_name }}
                </p>
                <p class="card-text d-flex align-items-center">
                    <i class="bi bi-telephone-fill me-2"></i> 
                    <strong>Phone Number: &nbsp;</strong> 
                    {{ contract.customer.user.phone_number }}
                </p>
                <p v-if="contract.customer.phone_number2" class="card-text d-flex align-items-center">
                    <i class="bi bi-telephone-fill me-2"></i> 
                    <strong>Phone Number 2: &nbsp;</strong> 
                    {{ contract.customer.phone_number2 }}
                </p>
                <p class="card-text d-flex align-items-center">
                    <i class="bi bi-file-earmark-text-fill me-2"></i> 
                    <strong>Passport Issuance Place: &nbsp;</strong> 
                    {{ contract.customer.passport_place_issuance }}
                </p>
            </div>

            <!-- Section for Financial Details -->
            <div class="border-top pt-3">
                <h6 class="text-muted mb-3">Financial Information</h6>
                <p class="card-text d-flex align-items-center">
                    <i class="bi bi-cash-stack me-2"></i> 
                    <strong>Price per Square: &nbsp;</strong> 
                    {{ formatPrice(contract.price_per_square) }} UZS
                </p>
                
                <p class="card-text d-flex align-items-center">
                    <i class="bi bi-currency-exchange me-2"></i> 
                    <strong>Contract Amount: &nbsp;</strong> 
                    {{ formatPrice(contract.contract_amount) }} UZS
                </p>
                
                <p class="card-text d-flex align-items-center">
                    <i class="bi bi-clock-history me-2"></i> 
                    <strong>Payment Months: &nbsp;</strong> 
                    {{ contract.payment_months }}
                </p>
                
                <p class="card-text d-flex align-items-center">
                    <i class="bi bi-wallet-fill me-2"></i> 
                    <strong>Monthly Payment: &nbsp;</strong> 
                    {{ formatPrice(contract.monthly_payment) }} UZS
                </p>
            </div>
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    contract: Object
});

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
