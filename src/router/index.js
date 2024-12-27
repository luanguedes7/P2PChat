import { createRouter, createWebHistory } from 'vue-router';
import IdentificationPage from '@/components/IdentificationPage.vue';
import MainPage from '@/components/Home.vue';

const routes = [
  {
    path: '/identification',
    name: 'Identification',
    component: IdentificationPage,
  },
  {
    path: '/',
    name: 'MainPage',
    component: MainPage,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
