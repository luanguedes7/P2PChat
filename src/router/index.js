import { createRouter, createWebHistory } from 'vue-router';
import Login from '@/components/Login.vue'; // Login Page
import Chat from '@/components/Chat.vue';   // Chat Page

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login, // Redirecionamento inicial
  },
  {
    path: '/chat',
    name: 'Chat',
    component: Chat, // A página de Chat
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
