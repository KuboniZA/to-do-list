import "./main.css"
import { createApp } from 'vue'
import App from './App.vue'
import router from "@/router_file/router.js"


const app = createApp(App);
    app.use(router) // NB use(router) must come BEFORE mount('#app') or you won't see anything.
    app.mount('#app')


