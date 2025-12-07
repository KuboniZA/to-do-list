import { createRouter, createWebHistory } from 'vue-router';
import HomePage from "@/components/HomePage.vue";
// import Calendar from "@/components/Calendar.vue";
import Tasks from "@/components/Tasks.vue";
import PageNotFound from "@/components/PageNotFound.vue";
import ToDoList from "@/components/ToDoList.vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'HomePage',
            component: HomePage
        },
        // {
        //     path: '/calendar',
        //     name: 'Calendar',
        //     component: Calendar
        // },
        {
            path: '/add-tasks',
            name: 'Tasks',
            component: Tasks
        },
        {
            path: '/to-do-list',
            name: 'ToDoList',
            component: ToDoList
        },
        {
            path: '/:catchAll(.*)',
            name: 'not-found',
            component: PageNotFound
        }
    ]
})

export default router;