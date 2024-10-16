<!-- src/views/Customer.vue -->
<template>
  <div class="d-flex">
    <!-- Sidebar -->
    <CustomerSidebar />

    <!-- Content -->
    <div class="content-container">
      <h1>Customer Dashboard</h1>
      <p>Welcome, Customer user!</p>
    </div>
  </div>
</template>

<script>
import CustomerSidebar from '../components/CustomerSidebar.vue';

export default {
  components: {
    CustomerSidebar,
  },
};
</script>

<style scoped>
.content-container {
  padding: 20px;
  flex: 1;
}
</style>
