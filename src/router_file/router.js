import { createRouter, createWebHistory } from 'vue-router';
import NavBar from "@/components/NavBar.vue";
import HomePage from "@/components/HomePage.vue";
import Calendar from "@/components/Calendar.vue";
import Tasks from "@/components/Tasks.vue";
import PageNotFound from "@/components/PageNotFound.vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'Home',
            component: HomePage
        },
        {
            path: '/calendar',
            name: 'Calendar',
            component: Calendar
        },
        {
            path: '/tasks',
            name: 'Tasks',
            component: Tasks
        },
        {
            path: '/',
            name: 'NavBar',
            component: NavBar
        },
        {
            path: '/:catchAll(.*)',
            name: 'not-found',
            component: PageNotFound
        }
    ]
})

export default router;