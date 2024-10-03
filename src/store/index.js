// src/store/index.js
import { createStore } from 'vuex';
import auth from './modules/auth';  // Import your auth module

export default createStore({
  modules: {
    auth,
  },
});
