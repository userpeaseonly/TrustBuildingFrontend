<!-- src/views/Staff.vue -->
<template>
  <div class="d-flex">
    <!-- Sidebar -->
    <Sidebar />

    <!-- Content -->
    <div class="content-container">
      <h1>Staff Dashboard</h1>
      <p>Welcome, staff user!</p>
    </div>
  </div>
</template>

<script>
import Sidebar from '../components/Sidebar.vue';

export default {
  components: {
    Sidebar,
  },
};
</script>

<style scoped>
.content-container {
  padding: 20px;
  flex: 1;
}
</style>
