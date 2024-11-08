<template>
    <div class="flex flex-col flex-shrink-0 p-4 bg-gray-100 h-full w-72">
      <a href="/" class="flex items-center mb-4 text-gray-800 no-underline">
        <svg class="w-10 h-8 mr-2">
          <use xlink:href="#bootstrap"></use>
        </svg>
        <span class="text-xl font-semibold">Company Sidebar</span>
      </a>
      <hr class="mb-4" />
      <nav>
        <ul class="space-y-2">
          <li>
            <RouterLink
              class="flex items-center p-2 rounded-md text-gray-800 hover:bg-blue-500 hover:text-white"
              to="/company"
              active-class="bg-blue-500 text-white"
              exact-active-class="bg-blue-500 text-white"
            >
              <svg class="w-4 h-4 mr-2">
                <use xlink:href="#home"></use>
              </svg>
              Company Dashboard
            </RouterLink>
          </li>
          <li>
            <RouterLink
              class="flex items-center p-2 rounded-md text-gray-800 hover:bg-blue-500 hover:text-white"
              to="/company/buildings"
              active-class="bg-blue-500 text-white"
              exact-active-class="bg-blue-500 text-white"
            >
              <svg class="w-4 h-4 mr-2">
                <use xlink:href="#table"></use>
              </svg>
              Manage Buildings
            </RouterLink>
          </li>
          <li>
            <RouterLink
              class="flex items-center p-2 rounded-md text-gray-800 hover:bg-blue-500 hover:text-white"
              to="/company/staff"
              active-class="bg-blue-500 text-white"
              exact-active-class="bg-blue-500 text-white"
            >
              <svg class="w-4 h-4 mr-2">
                <use xlink:href="#grid"></use>
              </svg>
              Manage Staff
            </RouterLink>
          </li>
          <li>
            <RouterLink
              class="flex items-center p-2 rounded-md text-gray-800 hover:bg-blue-500 hover:text-white"
              to="/company/contracts"
              active-class="bg-blue-500 text-white"
              exact-active-class="bg-blue-500 text-white"
            >
              <svg class="w-4 h-4 mr-2">
                <use xlink:href="#grid"></use>
              </svg>
              Manage Contracts
            </RouterLink>
          </li>
          <li>
            <RouterLink
              class="flex items-center p-2 rounded-md text-gray-800 hover:bg-blue-500 hover:text-white"
              to="/company/terminated/contracts"
              active-class="bg-blue-500 text-white"
              exact-active-class="bg-blue-500 text-white"
            >
              <svg class="w-4 h-4 mr-2">
                <use xlink:href="#grid"></use>
              </svg>
              Manage Terminated Contracts
            </RouterLink>
          </li>
        </ul>
        <hr class="my-4" />
        <div class="relative">
          <a
            href="#"
            class="flex items-center text-gray-800 no-underline"
            @click.prevent="dropdownOpen = !dropdownOpen"
          >
            <img
              src="https://github.com/mdo.png"
              alt="profile"
              class="w-8 h-8 rounded-full mr-2"
            />
            <strong>{{ username }}</strong>
          </a>
          <ul
            v-if="dropdownOpen"
            class="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2"
          >
            <li><a class="block px-4 py-2 text-gray-800 hover:bg-gray-100" href="#">Settings</a></li>
            <li><a class="block px-4 py-2 text-gray-800 hover:bg-gray-100" href="#">Profile</a></li>
            <li><hr class="my-1" /></li>
            <li>
              <button class="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100" @click="logout">Logout</button>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  </template>
  
  <script setup>
  import { useStore } from 'vuex';
  import { computed, ref } from 'vue';
  
  const store = useStore();
  const username = computed(() => store.getters['auth/user']?.username || 'Company User');
  const dropdownOpen = ref(false);
  
  const logout = () => {
    store.dispatch('auth/logout');
    window.location.reload();
  };
  </script>
  