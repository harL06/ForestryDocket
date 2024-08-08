import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Table from '../views/PlantationData.vue';

// Function to check if user is authenticated
function isAuthenticated() {
    let userUuid = sessionStorage.getItem('user_uuid');
     if (!userUuid) {
        userUuid = localStorage.getItem('user_uuid');
    }
  return userUuid !== null;
}

const routes = [
  {
    path: '/',
    component: Home,
  },
  {
    path: '/login',
    component: () => import('../views/LoginPage.vue'),
  },
  {
    path: '/signup',
    component: () => import('../views/SignupPage.vue'),
  },
  {
    path: '/logout',
    component: () => import('../views/Logout.vue')
  },
  {
    path: '/dashboard',
    component: () => import('../views/DashboardHome.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/table/:forestryCode?',
    name: 'table',
    component: Table,
    meta: { requiresAuth: true },
  },
  {
    path: '/about',
    component: () => import('../views/About.vue'),
  },
  {
    path: '/landing',
    component: () => import('../views/Home.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Navigation guard
router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    if (isAuthenticated()) {
      next();
    } else {
      next('/login'); // Redirect to login if not authenticated
    }
  } else {
    next(); // Always call next() to allow the route
  }
});

export default router;
