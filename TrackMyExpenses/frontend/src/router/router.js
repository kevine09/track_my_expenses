import { createRouter, createWebHistory } from 'vue-router';
import LoginPage from '../views/login.vue';
import RegisterPage from '../views/RegisterPage.vue';
import HomePage from '../views/HomePage.vue'; // Ajoute l'import
import FeaturesPage from '../views/FeaturesPage.vue';
import CategoriePage from '../views/CategoriePage.vue';

const routes = [
  { path: '/', redirect: '/login' }, // Redirection vers login
  { path: '/login', component: LoginPage },
  { path: '/register', component: RegisterPage },
  { path: '/home', component: HomePage }, // ✅ Vérifie que cette ligne est bien là
  { path: '/features',component: FeaturesPage },
  { path:'/category', component: CategoriePage},
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

// 🚀 Protection des routes : redirection si pas connecté
router.beforeEach((to, from, next) => {
  const isAuthenticated = !!localStorage.getItem('token'); // Vérifie le token

  console.log(`🔍 Navigation vers ${to.path}, Authentifié: ${isAuthenticated}`);

  if (to.path === '/home' && !isAuthenticated) {
    console.warn("⛔ Accès refusé : Redirection vers /login !");
    return next('/login');
  }

  next();
});

export default router;