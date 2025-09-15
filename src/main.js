import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import store from './store'
import router from './router' 
import axios from './axios'
import mixin from './mixin'

import { VuePdf } from 'vue3-pdfjs'

window.axios = axios

const app = createApp(App)
app.use(store)
app.use(router)
app.component('VuePdf', VuePdf)
app.mixin(mixin)
app.mount('#app')