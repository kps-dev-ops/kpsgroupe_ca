import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'

// Styles généraux
import './style.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import '@fontsource/nunito/400.css'
import '@fontsource/nunito/600.css'
import '@fontsource/nunito/700.css'
import 'aos/dist/aos.css'
import '@vueup/vue-quill/dist/vue-quill.snow.css'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'





// Plugins et librairies
import AOS from 'aos'
import { QuillEditor } from '@vueup/vue-quill'

// Font Awesome
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import {
  faUsers,
  faFileAlt,
  faClock,
  faPen,
  faTrash,
  faEye,
  faMagnifyingGlass,
  faScroll
} from '@fortawesome/free-solid-svg-icons'

library.add(faUsers, faFileAlt, faClock, faPen, faTrash, faEye, faMagnifyingGlass, faScroll)

const app = createApp(App)
const pinia = createPinia()

AOS.init()

app.component('font-awesome-icon', FontAwesomeIcon)
app.component('QuillEditor', QuillEditor)

app.use(router).use(pinia).mount('#app')
