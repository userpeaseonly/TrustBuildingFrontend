<!-- src/components/Sidebar.vue -->
<template>
    <div class="d-flex flex-column flex-shrink-0 p-3 bg-body-tertiary h-100" style="width: 360px; height: 100%;">
      <a href="/" class="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-body-emphasis text-decoration-none">
        <svg class="bi pe-none me-2" width="40" height="32"><use xlink:href="#bootstrap"></use></svg>
        <span class="fs-4">Sidebar</span>
      </a>
      <hr />
      <nav v-if="isAuthenticated">
        <ul class="nav nav-pills flex-column mb-auto">
          <li class="nav-item">
            <RouterLink class="nav-link active" aria-current="page" to="/">
              <svg class="bi pe-none me-2" width="16" height="16"><use xlink:href="#home"></use></svg>
              Home
            </RouterLink>
          </li>
          <li v-for="item in menuItems" :key="item.label">
            <RouterLink class="nav-link link-body-emphasis" :to="item.path">
              <svg class="bi pe-none me-2" width="16" height="16"><use :xlink:href="item.icon"></use></svg>
              {{ item.label }}
            </RouterLink>
          </li>
        </ul>
        <hr />
        <div class="dropdown">
          <a href="#" class="d-flex align-items-center link-body-emphasis text-decoration-none dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
            <img src="https://github.com/mdo.png" alt="profile" width="32" height="32" class="rounded-circle me-2" />
            <strong>{{ username }}</strong>
          </a>
          <ul class="dropdown-menu text-small shadow">
            <li><a class="dropdown-item" href="#">New project...</a></li>
            <li><a class="dropdown-item" href="#">Settings</a></li>
            <li><a class="dropdown-item" href="#">Profile</a></li>
            <li><hr class="dropdown-divider"></li>
            <li><button class="btn btn-warning dropdown-item" @click="logout">Logout</button></li>
          </ul>
        </div>
      </nav>
      <nav v-else>
        <ul class="nav nav-pills flex-column mb-auto">
          <li class="nav-item">
            <RouterLink class="nav-link active" aria-current="page" to="/login">Login</RouterLink>
          </li>
        </ul>
      </nav>
    </div>
  </template>
  
  <script setup>
  import { useStore } from 'vuex';
  import { computed } from 'vue';
  import { RouterLink } from 'vue-router';
  
  const store = useStore();
  const isAuthenticated = computed(() => store.getters['auth/isAuthenticated']);
  const username = computed(() => store.getters['auth/user']?.username || 'Guest');
  
  // Menu items dynamically generated
  const menuItems = [
    { label: 'Dashboard', path: '/dashboard', icon: '#speedometer2' },
    { label: 'Orders', path: '/orders', icon: '#table' },
    { label: 'Products', path: '/products', icon: '#grid' },
    { label: 'Customers', path: '/customers', icon: '#people-circle' },
  ];
  
  const logout = () => {
    store.dispatch('auth/logout');
    window.location.reload(); // Optional: You could do more sophisticated navigation without reloading the page.
  };
  </script>
  