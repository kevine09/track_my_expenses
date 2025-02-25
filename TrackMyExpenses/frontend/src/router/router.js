import { createRouter, createWebHistory } from 'vue-router';
import HomeLayout from '../components/HomeLayout.vue'; // Layout principal
import HomePage from '../views/HomePage.vue'; // Page d'accueil
import CategoriePage from '../views/CategoriePage.vue'; // Page des catégories
import DepensePage from '../views/Depense.vue'; // Page des dépenses
import Budget from '../views/Budget.vue';
import Rapports from '../views/Rapports.vue';
import Parametre from '../views/Parametre.vue';

const routes = [
  {
    path: '/home',
    component: HomeLayout, // Utilisez HomeLayout comme layout
    children: [
      { path: '', component: HomePage }, // Page d'accueil
      { path: 'category', component: CategoriePage }, // Catégories
      { path: 'expenses', component: DepensePage }, // Dépenses
      { path: 'budget', component: Budget }, // Budget
      { path: 'reports', component: Rapports }, // Rapports
      { path: 'settings', component: Parametre }, // Paramètres

      // Ajoutez d'autres routes imbriquées ici
    ],
  },
  { path: '/', redirect: '/home' }, // Redirection vers /home
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;