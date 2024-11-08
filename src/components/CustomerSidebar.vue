<template>
    <div class="flex flex-col p-4 bg-gray-100 h-full w-80">
      <a href="/" class="flex items-center mb-4 text-gray-700 no-underline">
        <svg class="w-10 h-8 mr-2 text-blue-600" fill="currentColor" viewBox="0 0 16 16">
          <use xlink:href="#bootstrap"></use>
        </svg>
        <span class="text-2xl font-semibold">Customer Sidebar</span>
      </a>
      <hr class="mb-4 border-gray-300" />
      <nav>
        <ul class="space-y-2">
          <li>
            <RouterLink
              class="flex items-center px-3 py-2 rounded-lg transition-colors hover:bg-blue-500 hover:text-white"
              to="/customer"
              active-class="bg-blue-500 text-white"
              exact-active-class="bg-blue-500 text-white"
            >
              <svg class="w-4 h-4 mr-2 text-inherit" fill="currentColor" viewBox="0 0 16 16">
                <use xlink:href="#home"></use>
              </svg>
              Customer Dashboard
            </RouterLink>
          </li>
          <li>
            <RouterLink
              class="flex items-center px-3 py-2 rounded-lg transition-colors hover:bg-blue-500 hover:text-white"
              to="/customer/buildings"
              active-class="bg-blue-500 text-white"
              exact-active-class="bg-blue-500 text-white"
            >
              <svg class="w-4 h-4 mr-2 text-inherit" fill="currentColor" viewBox="0 0 16 16">
                <use xlink:href="#table"></use>
              </svg>
              Manage Buildings
            </RouterLink>
          </li>
          <li>
            <RouterLink
              class="flex items-center px-3 py-2 rounded-lg transition-colors hover:bg-blue-500 hover:text-white"
              to="/customer/contracts"
              active-class="bg-blue-500 text-white"
              exact-active-class="bg-blue-500 text-white"
            >
              <svg class="w-4 h-4 mr-2 text-inherit" fill="currentColor" viewBox="0 0 16 16">
                <use xlink:href="#grid"></use>
              </svg>
              Manage Contracts
            </RouterLink>
          </li>
        </ul>
      </nav>
      <hr class="my-4 border-gray-300" />
      <div class="mt-auto">
        <div class="dropdown">
          <button
            class="flex items-center w-full text-left text-gray-700 transition-colors hover:bg-gray-200 rounded-lg p-2"
            @click="dropdownOpen = !dropdownOpen"
          >
            <img
              src="https://github.com/mdo.png"
              alt="profile"
              class="w-8 h-8 rounded-full mr-3"
            />
            <strong>{{ username }}</strong>
            <svg
              class="ml-auto w-4 h-4"
              :class="{ 'transform rotate-180': dropdownOpen }"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fill-rule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </button>
          <ul
            v-if="dropdownOpen"
            class="mt-2 w-full bg-white rounded-lg shadow-lg text-sm"
          >
            <li>
              <a href="#" class="block px-4 py-2 text-gray-700 hover:bg-gray-200">Settings</a>
            </li>
            <li>
              <a href="#" class="block px-4 py-2 text-gray-700 hover:bg-gray-200">Profile</a>
            </li>
            <li>
              <hr class="my-1 border-gray-300" />
            </li>
            <li>
              <button class="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-200" @click="logout">
                Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed } from 'vue';
  import { useStore } from 'vuex';
  
  const store = useStore();
  const username = computed(() => store.getters['auth/user']?.username || 'Customer User');
  const dropdownOpen = ref(false);
  
  const logout = () => {
    store.dispatch('auth/logout');
    window.location.reload();
  };
  </script>
  
  <style scoped>
  /* Styling for dropdown animation */
  button:focus {
    outline: none;
  }
  </style>
  