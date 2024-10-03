<!-- src/components/StaffSidebar.vue -->
<template>
  <div class="d-flex flex-column flex-shrink-0 p-3 bg-light h-100" style="width: 360px;">
    <a href="/" class="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-dark text-decoration-none">
      <svg class="bi pe-none me-2" width="40" height="32"><use xlink:href="#bootstrap"></use></svg>
      <span class="fs-4">Staff Sidebar</span>
    </a>
    <hr />
    <nav>
      <ul class="nav nav-pills flex-column mb-auto">
        <li class="nav-item">
          <RouterLink class="nav-link active" aria-current="page" to="/staff">
            <svg class="bi pe-none me-2" width="16" height="16"><use xlink:href="#home"></use></svg>
            Staff Dashboard
          </RouterLink>
        </li>
        <li>
          <RouterLink class="nav-link link-dark" to="/staff/buildings">
            <svg class="bi pe-none me-2" width="16" height="16"><use xlink:href="#table"></use></svg>
            Manage Buildings
          </RouterLink>
        </li>
        <li>
          <RouterLink class="nav-link link-dark" to="/staff/inventory">
            <svg class="bi pe-none me-2" width="16" height="16"><use xlink:href="#grid"></use></svg>
            Inventory
          </RouterLink>
        </li>
      </ul>
      <hr />
      <div class="dropdown">
        <a href="#" class="d-flex align-items-center link-dark text-decoration-none dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
          <img src="https://github.com/mdo.png" alt="profile" width="32" height="32" class="rounded-circle me-2" />
          <strong>{{ username }}</strong>
        </a>
        <ul class="dropdown-menu text-small shadow">
          <li><a class="dropdown-item" href="#">Settings</a></li>
          <li><a class="dropdown-item" href="#">Profile</a></li>
          <li><hr class="dropdown-divider"></li>
          <li><button class="dropdown-item" @click="logout">Logout</button></li>
        </ul>
      </div>
    </nav>
  </div>
</template>

<script setup>
import { useStore } from 'vuex';
import { computed } from 'vue';
import { RouterLink } from 'vue-router';

const store = useStore();
const username = computed(() => store.getters['auth/user']?.username || 'Staff User');

const logout = () => {
  store.dispatch('auth/logout');
  window.location.reload();
};
</script>

<style scoped>
.nav-link.active {
  background-color: #007bff;
  color: white;
}
</style>
