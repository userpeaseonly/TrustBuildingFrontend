<template>
    <div class="modal fade show d-block" tabindex="-1">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Add New Staff</h5>
            <button type="button" class="btn-close" @click="emitClose"></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="submitForm">
              <div v-for="(field, key) in formFields" :key="key" class="mb-3">
                <label :for="key" class="form-label capitalize">{{ key.replace(/_/g, ' ') }}</label>
                <input
                  v-if="key !== 'passport_copy'"
                  v-model="formData[key]"
                  :type="field.type"
                  :id="key"
                  class="form-control"
                  required
                />
                <input
                  v-if="key === 'passport_copy'"
                  @change="handleFileUpload"
                  type="file"
                  :id="key"
                  class="form-control"
                  required
                />
                <div v-if="errors?.[key]" class="text-danger">
                  {{ errors[key][0] }}
                </div>
              </div>
              <div v-if="errors?.non_field_errors" class="alert alert-danger">
                {{ errors.non_field_errors[0] }}
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="emitClose">Cancel</button>
            <button type="button" class="btn btn-primary" @click="submitForm">Submit</button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, watch } from 'vue';
  import { defineEmits, defineProps } from 'vue';
  
  const emit = defineEmits(['close', 'submit']);
  const props = defineProps({
    errors: {
      type: Object,
      default: null,
    },
  });
  
  // Form fields configuration
  const formFields = {
    phone_number: { type: 'text', value: '' },
    first_name: { type: 'text', value: '' },
    last_name: { type: 'text', value: '' },
    third_name: { type: 'text', value: '' },
    passport_series: { type: 'text', value: '' },
    passport_place_issuance: { type: 'text', value: '' },
    passport_date_issuance: { type: 'date', value: '' },
    passport_jshshr: { type: 'text', value: '' },
    passport_copy: { type: 'file', value: null },
  };
  
  const formData = ref({});
  
  // Populate formData with empty values from formFields
  watch(
    formFields,
    () => {
      for (const key in formFields) {
        formData.value[key] = formFields[key].value;
      }
    },
    { immediate: true }
  );
  
  // Handle file upload
  const handleFileUpload = (event) => {
    formData.value.passport_copy = event.target.files[0];
  };
  
  // Emit close event
  const emitClose = () => {
    emit('close');
  };
  
  // Handle form submission
  const submitForm = () => {
    emit('submit', formData.value);
  };
  </script>
  
  <style scoped>
  .modal {
    background-color: rgba(0, 0, 0, 0.5);
  }
  
  .modal-dialog {
    max-width: 500px;
    margin: auto;
  }
  
  .modal-content {
    background-color: #fff;
    border-radius: 8px;
    overflow: hidden;
  }
  </style>
  