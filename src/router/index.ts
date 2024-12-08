import { createRouter, createWebHistory } from 'vue-router';
import HomePage from "@/pages/HomePage.vue";
import WeatherDetailPage from "@/pages/WeatherDetailPage.vue";
import profilePage from "@/pages/ProfilePage.vue";

const routes = [
    {
        path: '/',
        name: 'Home',
        component: HomePage,
    },
    {
        path: '/:id',
        name: 'WeatherDetailPage',
        component: WeatherDetailPage,
    },
    {
        path: '/profile',
        name: 'profilePage',
        component: profilePage,
    },
];

const router = createRouter({
    history: createWebHistory(import.meta.env.VITE_BASE_URL),
    routes,
});

export default router;