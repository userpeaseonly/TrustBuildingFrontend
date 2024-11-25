<!-- src/components/MakePaymentModal.vue -->
<template>
    <div class="modal fade" id="makePaymentModal" tabindex="-1" aria-labelledby="makePaymentModalLabel"
        aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="makePaymentModalLabel">Make Payment</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <form @submit.prevent="submitPayment">
                        <div class="mb-3">
                            <label for="paymentAmount" class="form-label">Payment Amount</label>
                            <input v-model="paymentAmount" type="text" id="paymentAmount" class="form-control"
                                required />
                        </div>

                        <div class="mb-3">
                            <label for="paymentMethod" class="form-label">Payment Method</label>
                            <select v-model="paymentMethod" id="paymentMethod" class="form-select" required>
                                <option value="CASH">CASH</option>
                                <option value="BANK_TRANSFER">BANK_TRANSFER</option>
                                <option value="TERMINAL">TERMINAL</option>
                                <option value="MATERIAL">MATERIAL</option>
                                <option value="OTHER">OTHER</option>
                            </select>
                        </div>

                        <div class="mb-3">
                            <label for="paymentReference" class="form-label">Payment Reference</label>
                            <input v-model="paymentReference" type="text" id="paymentReference" class="form-control"
                                required />
                        </div>

                        <!-- Payment Date with checkbox -->
                        <div class="mb-3">
                            <label for="paymentDate" class="form-label">Payment Date</label>
                            <input v-model="paymentDate" type="date" id="paymentDate" class="form-control"
                                :disabled="!allowChangeDate" />
                            <div class="form-check mt-2">
                                <input v-model="allowChangeDate" type="checkbox" class="form-check-input"
                                    id="changeDateCheckbox" />
                                <label class="form-check-label" for="changeDateCheckbox">
                                    Change Payment Date (Default: Today's Date)
                                </label>
                            </div>
                        </div>

                        <button type="submit" class="btn btn-success w-100">
                            Submit Payment
                        </button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, watch } from "vue";
import apiClient from "@/services/api";

const props = defineProps({
    paymentRecordId: {
        type: Number,
        required: true,
    },
});

const emit = defineEmits(["payment-success", "payment-error"]);

// State for payment form
const paymentAmount = ref("");
const paymentMethod = ref("CASH");
const paymentReference = ref("");
const paymentDate = ref(new Date().toISOString().substring(0, 10)); // Default to today
const allowChangeDate = ref(false);

// Watch for allowChangeDate changes, reset the date to today if unchecked
watch(allowChangeDate, (newVal) => {
    if (!newVal) {
        paymentDate.value = new Date().toISOString().substring(0, 10);
    }
});

// Submit payment form
const submitPayment = async () => {
    const data = {
        return_date: paymentDate.value,
        return_amount: paymentAmount.value,
        return_method: paymentMethod.value,
        return_reference: paymentReference.value,
        payment: props.paymentRecordId,
    };

    try {
        await apiClient.post(
            "/contracts/contract/payment-record/return-payment/",
            data
        );
        emit("payment-success", "Payment made successfully");
        // Close the modal
        const modalElement = document.getElementById("makePaymentModal");
        const modal = bootstrap.Modal.getInstance(modalElement);
        modal.hide();
    } catch (error) {
        emit("payment-error", error.response?.data || "Failed to make payment");
    }
};
</script>

<style scoped>
.modal-content {
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.form-control {
    border-radius: 5px;
}
</style>
