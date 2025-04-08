import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import './style.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import '@fontsource/nunito/400.css'   // Regular
import '@fontsource/nunito/600.css'   // Semi-bold
import '@fontsource/nunito/700.css'   // Bold
import AOS from 'aos'
import 'aos/dist/aos.css'

AOS.init()
const pinia = createPinia()
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faFileAlt, faUser } from '@fortawesome/free-solid-svg-icons'

library.add(faFileAlt, faUser)


// App.component('font-awesome-icon', FontAwesomeIcon)
createApp(App).use(router).use(pinia).mount('#app')
