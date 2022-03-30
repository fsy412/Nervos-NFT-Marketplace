import { createApp } from 'vue';
import App from './App.vue';
import store from './store';
import './assets/tailwind.css';
import router from './router';
import Toaster from "@meforma/vue-toaster";

createApp(App)
  .use(store)
  .use(router)
  .use(Toaster)
  .mount('#app');
