import { createApp } from 'vue';
import VueFullscreen from 'vue-fullscreen';
import App from './App.vue';
import router from './router';
import store from './store';

createApp(App).use(store).use(router).use(VueFullscreen).mount('#app');
