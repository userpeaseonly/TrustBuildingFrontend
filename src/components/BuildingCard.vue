<!-- src/components/BuildingCard.vue -->
<template>
    <div class="card shadow-sm border-light h-100">
      <div class="card-body">
        <!-- Header Section: Building Number & Address -->
        <div class="d-flex justify-content-between align-items-center mb-3">
          <h5 class="card-title mb-0">Building {{ building.building_number }}</h5>
          <small class="text-muted">{{ building.address }}</small>
        </div>
        
        <!-- Building Details Section -->
        <div class="mb-3">
          <ul class="list-unstyled">
            <li>
              <i class="bi bi-box"></i> Block: <strong>{{ building.block_number }}</strong>
            </li>
            <li>
              <i class="bi bi-building"></i> Floors: <strong>{{ building.floor_count }}</strong>
            </li>
            <li>
              <i class="bi bi-house"></i> Apartments: <strong>{{ building.apartment_count }}</strong>
            </li>
            <li>
              <i class="bi bi-door-closed"></i> Entrances: <strong>{{ building.entrance_count }}</strong>
            </li>
          </ul>
        </div>
        
        <!-- Staff Section -->
        <div class="staff-info">
          <h6 class="text-secondary">Staff Assigned</h6>
          <p class="mb-1"><i class="bi bi-person"></i> {{ building.staff_details.first_name }} {{ building.staff_details.last_name }}</p>
        </div>
  
        <!-- Footer Section: Last Updated -->
        <div class="text-muted">
          <small class="text-muted">
            Created at: {{ formatDate(building.created_at) }}
          </small>
        </div>

        <div class="">
          <small class="text-muted">
            Last updated: {{ formatDate(building.updated_at) }}
          </small>
        </div>
        <!-- Manage Building Button -->
        <RouterLink :to="`/building/${building.id}/apartments`" class="btn btn-primary mt-3">
            Manage Building
        </RouterLink>
      </div>
    </div>
  </template>
  
  <script setup>
  import { defineProps } from 'vue';
  
  // Props
  const props = defineProps({
    building: Object,
  });
  
  // Helper function to format the date
  const formatDate = (date) => {
    return new Date(date).toLocaleString();
  };
  </script>
  
  <style scoped>
  .card {
    border-radius: 10px;
  }
  
  .card-body {
    padding: 20px;
  }
  
  .list-unstyled li {
    margin-bottom: 0.5rem;
  }
  
  .staff-info {
    margin-top: 10px;
    padding-top: 10px;
    border-top: 1px solid #eaeaea;
  }
  
  h6 {
    font-size: 0.95rem;
  }
  </style>
  