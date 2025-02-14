<template>
    <div class="card h-100 shadow-sm shadow-sm mb-4" @click="selectCustomer">
        <div class="card-body">
            <!-- Title with icons and subtle text color -->
            <h5 class="card-title text-primary d-flex align-items-center mb-3">
                <i class="bi bi-person-fill me-2"></i>
                {{ customer.first_name }} {{ customer.last_name }}
            </h5>

            <!-- Phone numbers with icon and tooltips for better UX -->
            <div class="mb-3">
                <p class="card-text d-flex align-items-center">
                    <i class="bi bi-telephone-fill me-2"></i>
                    <strong>{{ $t('message.phone') }}:&nbsp;</strong> {{ customer.user.phone_number }}
                </p>
                <p v-if="customer.phone_number2" class="card-text d-flex align-items-center">
                    <i class="bi bi-telephone-fill me-2"></i>
                    <strong>{{ $t('message.phone_2') }}:</strong> {{ customer.phone_number2 }}
                </p>
            </div>

            <!-- Passport details -->
            <div class="mb-3">
                <p class="card-text d-flex align-items-center">
                    <i class="bi bi-file-earmark-text-fill me-2"></i>
                    <strong>{{ $t('message.passport') }}:&nbsp;</strong> {{ customer.passport_series }}
                </p>
                <p class="card-text d-flex align-items-center">
                    <i class="bi bi-calendar-fill me-2"></i>
                    <strong>{{ $t('message.issued_at') }}:&nbsp;</strong> {{ customer.passport_place_issuance }} on {{
                        formatDate(customer.passport_date_issuance) }}
                </p>
            </div>

            <!-- Passport copy link with hover effect and tooltip -->
            <div class="mb-3">
                <p class="card-text d-flex align-items-center">
                    <i class="bi bi-image-fill me-2"></i>
                    <strong>{{ $t('message.passport_copy') }}:</strong>
                    <a :href="customer.passport_copy" target="_blank" rel="noopener noreferrer"
                        class="ms-2 text-decoration-none" data-bs-toggle="tooltip" :title="$t('message.view_passport_copy')">
                        {{ $t('message.view') }}
                    </a>
                </p>
            </div>

            <!-- Hidden Passport JSHSHR toggle with hover effect and icons -->
            <div class="">
                <button @click="showJshshr = !showJshshr" class="btn btn-sm btn-outline-primary">
                    <i :class="showJshshr ? 'bi bi-eye-slash-fill' : 'bi bi-eye-fill'"></i>
                    {{ showJshshr ? $t('message.hide_passport_jshshr') : $t('message.show_passport_jshshr') }}
                </button>
                <p v-if="showJshshr" class="mt-2 d-flex align-items-center">
                    <i class="bi bi-file-lock-fill me-2"></i>
                    <strong>{{ $t('message.passport_jshshr') }}: </strong> {{ customer.passport_jshshr }}
                </p>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const props = defineProps({
    customer: {
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

// Initialize tooltips (Bootstrap 5 tooltips)
onMounted(() => {
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(tooltipTriggerEl => {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
});

const emit = defineEmits(['selectCustomer']);

const selectCustomer = () => {
    emit('selectCustomer', props.customer.id);
};

</script>

<style scoped>
.card {
    margin-bottom: 1.5rem;
    border-radius: 10px;
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
}

.card-title {
    font-size: 1.5rem;
    font-weight: bold;
}

.card-text {
    font-size: 1.1rem;
}

a.text-decoration-none:hover {
    text-decoration: underline;
    color: #0056b3;
}

.btn-outline-primary {
    border-color: #007bff;
    color: #007bff;
}

.btn-outline-primary:hover {
    background-color: #007bff;
    color: #fff;
}

i.bi {
    color: #007bff;
}
</style>