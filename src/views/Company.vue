<!-- src/views/Company.vue -->
<template>
  <div class="d-flex">
    <!-- Sidebar -->
    <CompanySidebar />

    <!-- Content -->
    <div class="content-container">
      <h1>Company Dashboard</h1>
      <p>Welcome, Company user!</p>
    </div>
  </div>
</template>

<script>
import CompanySidebar from '../components/CompanySidebar.vue';

export default {
  components: {
    CompanySidebar,
  },
};
</script>

<style scoped>
.content-container {
  padding: 20px;
  flex: 1;
}
</style>
