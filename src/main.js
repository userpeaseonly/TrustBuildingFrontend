import { createApp } from 'vue'
import App from './App.vue'
import store from './store';
import router from './router'
import './assets/tailwind.css'; // Import Tailwind here

const app = createApp(App)

app.use(store)

app.use(router)


app.mount('#app')
