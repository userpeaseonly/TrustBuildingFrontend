<!-- src/components/StaffCard.vue -->
<template>
    <div class="card h-100 shadow-sm">
        <div class="card-body">
            <!-- Title with icons and subtle text color -->
            <h5 class="card-title text-primary d-flex align-items-center mb-3">
                <i class="bi bi-person-fill me-2"></i>
                {{ staff.first_name }} {{ staff.last_name }}
            </h5>

            <!-- Phone numbers with icon and tooltips for better UX -->
            <div class="mb-3">
                <p class="card-text d-flex align-items-center">
                    <i class="bi bi-telephone-fill me-2"></i>
                    <strong>Phone:&nbsp;</strong> {{ staff.user.phone_number }}
                </p>
                <p v-if="staff.phone_number2" class="card-text d-flex align-items-center">
                    <i class="bi bi-telephone-fill me-2"></i>
                    <strong>Phone 2:</strong> {{ staff.phone_number2 }}
                </p>
            </div>

            <!-- Passport details -->
            <div class="mb-3">
                <p class="card-text d-flex align-items-center">
                    <i class="bi bi-file-earmark-text-fill me-2"></i>
                    <strong>Passport:&nbsp;</strong> {{ staff.passport_series }}
                </p>
                <p class="card-text d-flex align-items-center">
                    <i class="bi bi-calendar-fill me-2"></i>
                    <strong>Issued At:&nbsp;</strong> {{ staff.passport_place_issuance }} on {{
                        formatDate(staff.passport_date_issuance) }}
                </p>
            </div>

            <!-- Passport copy link with hover effect and tooltip -->
            <div class="mb-3">
                <p class="card-text d-flex align-items-center">
                    <i class="bi bi-image-fill me-2"></i>
                    <strong>Passport Copy:</strong>
                    <a :href="staff.passport_copy" target="_blank" rel="noopener noreferrer"
                        class="ms-2 text-decoration-none" data-bs-toggle="tooltip" title="View passport copy">
                        View
                    </a>
                </p>
            </div>

            <!-- Hidden Passport JSHSHR toggle with hover effect and icons -->
            <div class="">
                <button @click="showJshshr = !showJshshr" class="btn btn-sm btn-outline-primary">
                    <i :class="showJshshr ? 'bi bi-eye-slash-fill' : 'bi bi-eye-fill'"></i>
                    {{ showJshshr ? 'Hide Passport JSHSHR' : 'Show Passport JSHSHR' }}
                </button>
                <p v-if="showJshshr" class="mt-2 d-flex align-items-center">
                    <i class="bi bi-file-lock-fill me-2"></i>
                    <strong>Passport JSHSHR:</strong> {{ staff.passport_jshshr }}
                </p>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps({
    staff: {
        type: Object,
        required: true,
    },
});

// State for showing/hiding passport JSHSHR
const showJshshr = ref(false);

// Helper function to format the date
const formatDate = (date) => {
    return new Date(date).toLocaleDateString();
};
</script>

<style scoped>
.card {
    margin-bottom: 1.5rem;
    border-radius: 10px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.card-title {
    font-size: 1.25rem;
    font-weight: bold;
}

.card-text {
    font-size: 1rem;
}

a:hover {
    text-decoration: underline;
}
</style>