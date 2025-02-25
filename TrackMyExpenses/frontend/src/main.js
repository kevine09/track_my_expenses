import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import router from '../src/router/router'; // Assurez-vous que le chemin est correct
import '@fortawesome/fontawesome-free/css/all.css';

const app = createApp(App);
app.use(router); // Injection du routeur
app.mount('#app');
console.log("📌 Vue Router chargé avec les routes :", router.getRoutes());