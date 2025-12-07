import "./main.css"
// import { setupCalendar, Calendar, DatePicker } from "v-calendar";
import { createApp } from 'vue'
import App from './App.vue'
import router from "@/router_file/router.js"

// import 'v-calendar/style.css';


const app = createApp(App);
    app.use(router) // NB use(router) must come BEFORE mount('#app') or you won't see anything.
    // app.use(setupCalendar,{})
    app.mount('#app')


    // app.component('VCalendar', Calendar);
    // app.component('DatePicker', DatePicker);


