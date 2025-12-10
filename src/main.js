import "./main.css"
import { createApp } from 'vue'
import App from './App.vue'
import router from "@/router_file/router.js"
import {createPinia} from "pinia";


const app = createApp(App);
    app.use(createPinia())
    app.use(router) // NB use(router) must come BEFORE mount('#app') or you won't see anything.
    app.mount('#app')





