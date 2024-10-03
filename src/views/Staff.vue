<!-- src/views/Staff.vue -->
<template>
  <div class="d-flex">
    <!-- Sidebar -->
    <StaffSidebar />

    <!-- Content -->
    <div class="content-container">
      <h1>Staff Dashboard</h1>
      <p>Welcome, staff user!</p>
    </div>
  </div>
</template>

<script>
import StaffSidebar from '../components/StaffSidebar.vue';

export default {
  components: {
    StaffSidebar,
  },
};
</script>

<style scoped>
.content-container {
  padding: 20px;
  flex: 1;
}
</style>
