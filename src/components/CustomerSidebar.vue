<!-- src/components/CustomerSidebar.vue -->
<template>
    <div class="d-flex flex-column flex-shrink-0 p-3 bg-light h-100" style="width: 360px;">
        <a href="/" class="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-dark text-decoration-none">
            <svg class="bi pe-none me-2" width="40" height="32">
                <use xlink:href="#bootstrap"></use>
            </svg>
            <span class="fs-4">Customer Sidebar</span>
        </a>
        <hr />
        <nav>
            <ul class="nav nav-pills flex-column mb-auto">
                <li class="nav-item">
                    <RouterLink class="nav-link" to="/customer" active-class="active" exact-active-class="exact-active">
                        <svg class="bi pe-none me-2" width="16" height="16">
                            <use xlink:href="#home"></use>
                        </svg>
                        Customer Dashboard
                    </RouterLink>
                </li>
                <li>
                    <RouterLink class="nav-link" to="/customer/buildings" active-class="active"
                        exact-active-class="exact-active">
                        <svg class="bi pe-none me-2" width="16" height="16">
                            <use xlink:href="#table"></use>
                        </svg>
                        Manage Buildings
                    </RouterLink>
                </li>
                <li>
                    <RouterLink class="nav-link" to="/customer/contracts" active-class="active"
                        exact-active-class="exact-active">
                        <svg class="bi pe-none me-2" width="16" height="16">
                            <use xlink:href="#grid"></use>
                        </svg>
                        Manage Contracts
                    </RouterLink>
                </li>
            </ul>
            <hr />
            <div class="dropdown">
                <a href="#" class="d-flex align-items-center link-dark text-decoration-none dropdown-toggle"
                    data-bs-toggle="dropdown" aria-expanded="false">
                    <img src="https://github.com/mdo.png" alt="profile" width="32" height="32"
                        class="rounded-circle me-2" />
                    <strong>{{ username }}</strong>
                </a>
                <ul class="dropdown-menu text-small shadow">
                    <li><a class="dropdown-item" href="#">Settings</a></li>
                    <li><a class="dropdown-item" href="#">Profile</a></li>
                    <li>
                        <hr class="dropdown-divider" />
                    </li>
                    <li><button class="dropdown-item" @click="logout">Logout</button></li>
                </ul>
            </div>
        </nav>
    </div>
</template>

<script setup>
import { useStore } from 'vuex';
import { computed } from 'vue';

const store = useStore();
const username = computed(() => store.getters['auth/user']?.username || 'Customer User');

const logout = () => {
    store.dispatch('auth/logout');
    window.location.reload();
};
</script>

<style scoped>
/* Custom styling for active links */
.nav-link.active {
    background-color: #007bff;
    color: white;
}

.nav-link.exact-active {
    background-color: #007bff;
    color: white;
}
</style>