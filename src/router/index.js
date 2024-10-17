// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import store from '../store';
import Home from '../views/Home.vue';
import Login from '../views/Login.vue';
import Company from '../views/Company.vue';  // Add Company view
import Staff from '../views/Staff.vue';  // Add Staff view
import StaffCustomerPayments from '../views/Staff/Payments.vue';  // Add StaffCustomerPayments view
import Customer from '../views/Customer.vue';  // Add Customer view
import Buildings from '../views/Staff/Buildings.vue';  // Add StaffBuildings view
import BuildingDetails from '../views/Staff/BuildingDetails.vue';  // Add BuildingDetails view
import Customers from '../views/Staff/Customers.vue';  // Add Customers view
import Contracts from '../views/Staff/Contracts.vue';  // Add Contracts view
import ContractDetails from '../views/Staff/ContractDetails.vue';  // Add ContractDetails view
import CreateContract from '../views/Staff/CreateContract.vue';  // Add CreateContract view
import CompanyBuildings from '../views/Company/Buildings.vue';  // Add CompanyBuildings view
import CompanyStaff from '../views/Company/Staff.vue';  // Add CompanyStaff view
import CompanyContracts from '../views/Company/Contracts.vue';  // Add CompanyContracts view
import CompanyContractDetails from '../views/Company/ContractDetails.vue';  // Add CompanyContractDetails view
import CustomerPage from '../views/Customer.vue';  // Add Customer view
import CustomerContracts from '../views/Customer/Contracts.vue';  // Add CustomerContracts view

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
    meta: { requiresAuth: true },  // This should be properly set in meta
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
  },
  {
    path: '/company',
    name: 'company',
    component: Company,
    meta: { requiresAuth: true, role: 'company' },  // Protect company route
  },
  {
    path: '/staff',
    name: 'staff',
    component: Staff,
    meta: { requiresAuth: true, role: 'staff' },  // Protect staff route
  },
  {
    path: '/customer',
    name: 'customer',
    component: Customer,
    meta: { requiresAuth: true, role: 'customer' },  // Protect customer route
  },
  {
    path: '/staff/buildings',
    name: 'StaffBuildings',
    component: Buildings,
    meta: { requiresAuth: true, role: 'staff' }, // Ensure only authenticated users can access
  },
  {
    path: '/building/:building_id/apartments',
    name: 'BuildingDetails',
    component: BuildingDetails,
    meta: { requiresAuth: true }, // Add authentication guard if needed
  },
  {
    path: '/staff/customers',
    name: 'Customers',
    component: Customers,
    meta: { requiresAuth: true, role: 'staff' }, // Ensure only authenticated users can access
  },
  {
    path: '/staff/payments',
    name: 'StaffCustomerPayments',
    component: StaffCustomerPayments,
    meta: { requiresAuth: true, role: 'staff' }, // Ensure only authenticated users can access
  },
  {
    path: '/staff/contracts',
    name: 'Contracts',
    component: Contracts,
    meta: { requiresAuth: true, role: 'staff' }, // Ensure only authenticated users can access
  },
  {
    path: '/staff/contracts/:contract_id',
    name: 'ContractDetails',
    component: ContractDetails,
    props: true,
  },
  {
    path: '/staff/contracts/create',
    name: 'CreateContract',
    component: CreateContract,
    meta: { requiresAuth: true, role: 'staff' }, // Ensure only authenticated users can access
  },
  {
    path: '/company/buildings',
    name: 'CompanyBuildings',
    component: CompanyBuildings,
    meta: { requiresAuth: true, role: 'company' }, // Ensure only authenticated users can access
  },
  {
    path: '/company/staff',
    name: 'CompanyStaff',
    component: CompanyStaff,
    meta: { requiresAuth: true, role: 'company' }, // Ensure only authenticated users can access
  },
  {
    path: '/company/contracts',
    name: 'CompanyContracts',
    component: CompanyContracts,
    meta: { requiresAuth: true, role: 'company' }, // Ensure only authenticated users can access
  },
  {
    path: '/company/contracts/:contract_id',
    name: 'CompanyContractDetails',
    component: CompanyContractDetails,
    props: true,
  },
  {
    path: '/customer',
    name: 'CustomerPage',
    component: CustomerPage,
    meta: { requiresAuth: true, role: 'customer' }, // Ensure only authenticated users can access
  },
  {
    path: '/customer/contracts',
    name: 'CustomerContracts',
    component: CustomerContracts,
    meta: { requiresAuth: true, role: 'customer' }, // Ensure only authenticated users can access
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

// Navigation guard
router.beforeEach(async (to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);  // Fix the scope here
  const roleRequired = to.meta.role;
  const isAuthenticated = store.getters['auth/isAuthenticated'];
  
  if (requiresAuth && !isAuthenticated) {
    next('/login');
  } else if (requiresAuth && !store.getters['auth/userRole']) {
    // If user is authenticated but role is not yet fetched, get the role first
    await store.dispatch('auth/fetchUserRole');
    const role = store.getters['auth/userRole'];
    if (roleRequired && role !== roleRequired) {
      next(`/${role}`);  // Redirect to the appropriate role page
    } else {
      next();
    }
  } else if (roleRequired && store.getters['auth/userRole'] !== roleRequired) {
    next(`/${store.getters['auth/userRole']}`);  // Redirect if role doesn't match
  } else {
    next();
  }
});

export default router;
