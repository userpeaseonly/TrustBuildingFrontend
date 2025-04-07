<template>
  <div class="flex flex-col p-4 bg-gray-100 w-80 h-full">
    <a href="/" class="flex items-center mb-4 text-gray-800 no-underline">
      <svg class="w-10 h-8 text-indigo-600 mr-3">
        <use xlink:href="#logo-icon"></use>
      </svg>
      <span class="text-2xl font-semibold">{{ $t('message.staff_sidebar') }}</span>

    </a>
    <hr class="border-gray-300 mb-4" />

    <nav>
      
      <ul class="space-y-2">
        <li>
          <RouterLink
            to="/staff"
            class="flex items-center px-4 py-2 rounded-lg text-gray-700 hover:bg-indigo-600 hover:text-white"
            active-class="bg-indigo-600 text-white"
          >
            <svg class="w-5 h-5 mr-3 text-current">
              <use xlink:href="#home-icon"></use>
            </svg>
            {{ $t('message.dashboard') }}
          </RouterLink>
        </li>
        <li>
          <RouterLink
            to="/staff/buildings"
            class="flex items-center px-4 py-2 rounded-lg text-gray-700 hover:bg-indigo-600 hover:text-white"
            active-class="bg-indigo-600 text-white"
          >
            <svg class="w-5 h-5 mr-3 text-current">
              <use xlink:href="#buildings-icon"></use>
            </svg>
            {{ $t('message.staff.buildings') }}
          </RouterLink>
        </li>
        <li>
          <RouterLink
            to="/staff/customers"
            class="flex items-center px-4 py-2 rounded-lg text-gray-700 hover:bg-indigo-600 hover:text-white"
            active-class="bg-indigo-600 text-white"
          >
            <svg class="w-5 h-5 mr-3 text-current">
              <use xlink:href="#customers-icon"></use>
            </svg>
            {{ $t('message.staff.customers') }}
          </RouterLink>
        </li>
        <li>
          <RouterLink
            to="/staff/contracts"
            class="flex items-center px-4 py-2 rounded-lg text-gray-700 hover:bg-indigo-600 hover:text-white"
            active-class="bg-indigo-600 text-white"
          >
            <svg class="w-5 h-5 mr-3 text-current">
              <use xlink:href="#contracts-icon"></use>
            </svg>
            {{ $t('message.staff.contracts') }}
          </RouterLink>
        </li>
        <li>
          <RouterLink
            to="/staff/terminated/contracts"
            class="flex items-center px-4 py-2 rounded-lg text-gray-700 hover:bg-indigo-600 hover:text-white"
            active-class="bg-indigo-600 text-white"
          >
            <svg class="w-5 h-5 mr-3 text-current">
              <use xlink:href="#terminated-contracts-icon"></use>
            </svg>
            {{ $t('message.staff.terminated_contracts') }}
          </RouterLink>
        </li>
        <li>
          <RouterLink
            to="/staff/payments"
            class="flex items-center px-4 py-2 rounded-lg text-gray-700 hover:bg-indigo-600 hover:text-white"
            active-class="bg-indigo-600 text-white"
          >
            <svg class="w-5 h-5 mr-3 text-current">
              <use xlink:href="#payments-icon"></use>
            </svg>
            {{ $t('message.staff.payments') }}
          </RouterLink>
        </li>
        
      </ul>
    </nav>
    
    
    <hr class="border-gray-300 my-4" />
    
    
    <!-- Language Selection Dropdown -->
    <select v-model="selectedLanguage" @change="changeLanguage" class="mt-4 p-2 border rounded">
      <option value="uz">🇺🇿 Uzbek</option>
      <option value="en">🇬🇧 English</option>
      <option value="ru">🇷🇺 Russian</option>
    </select>

    <div class="mt-auto">
      <div class="flex items-center cursor-pointer text-gray-700 hover:text-indigo-600" @click="toggleDropdown">
        <img
          src="https://github.com/mdo.png"
          alt="profile"
          class="w-8 h-8 rounded-full mr-3"
        />
        <strong class="text-base">{{ username }}</strong>
        <svg class="w-4 h-4 ml-2 transform" :class="{ 'rotate-180': dropdownOpen }">
          <use xlink:href="#dropdown-arrow-icon"></use>
        </svg>
      </div>
      
      <ul v-if="dropdownOpen" class="mt-2 bg-white border border-gray-200 rounded-md shadow-lg text-sm text-gray-700">
        <li><a href="#" class="block px-4 py-2 hover:bg-gray-100">{{ $t('message.settings') }}</a></li>
        <li><a href="#" class="block px-4 py-2 hover:bg-gray-100">{{ $t('message.profile') }}</a></li>
        <li><hr class="border-gray-200" /></li>
        <li>
          <button @click="logout" class="w-full text-left px-4 py-2 hover:bg-gray-100">
            {{ $t('message.logout') }}
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { useStore } from 'vuex';
import { computed, ref } from 'vue';
import { useI18n } from 'vue-i18n';


const { locale } = useI18n();
const selectedLanguage = ref(locale.value);

const store = useStore();
const username = computed(() => store.getters['auth/user']?.username || 'Staff User');
const dropdownOpen = ref(false);

const toggleDropdown = () => {
  dropdownOpen.value = !dropdownOpen.value;
};

const logout = () => {
  store.dispatch('auth/logout');
  window.location.reload();
};


const changeLanguage = () => {
  locale.value = selectedLanguage.value; // Update the language
  localStorage.setItem('user-language', selectedLanguage.value); // Save preference
};
</script>

<style scoped>
/* Add custom styles if needed */
</style>
