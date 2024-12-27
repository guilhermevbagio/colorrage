import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import PrimeVue from "primevue/config";
import { library } from '@fortawesome/fontawesome-svg-core'


import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

import {faCopy, faPaste} from "@fortawesome/free-regular-svg-icons";
import {
    faLock, faLockOpen, faBars, faChevronRight, faChevronLeft, faEyeDropper, faCheck, faPlay
} from "@fortawesome/free-solid-svg-icons";

import Aura from '@primevue/themes/aura';
import App from './App.vue'
import "./assets/index.css"

const app = createApp(App)

library.add(faLock, faLockOpen, faBars, faCopy, faChevronRight, faChevronLeft, faPaste, faEyeDropper, faCheck, faPlay);

app.component('font-awesome-icon', FontAwesomeIcon)
app.use(createPinia())
app.use(PrimeVue, {
    theme: {
        preset: Aura,

    }
});

app.mount('#app')
