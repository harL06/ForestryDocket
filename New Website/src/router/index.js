import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Table from '../views/PlantationData.vue'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            component: Home,
        },
        {
            path: '/login',
            component: () => import ('../views/LoginPage.vue')
        },
        {
            path: '/signup',
            component: () => import('../views/SignupPage.vue')
        },
        {
            path: '/dashboard',
            component: () => import('../views/DashboardHome.vue')
        },
        {
            path: '/table/:forestryCode?',
            name: 'table',
            component: Table
        },
        {
            path: '/about',
            component: () => import('../views/About.vue')
        },
        {
            path: '/landing',
            component: () => import('../views/Home.vue')
        }
    ]
})

export default router