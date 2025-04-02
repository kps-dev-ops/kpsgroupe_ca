import { createRouter, createWebHistory } from 'vue-router'
import Accueil from '../views/Acceuil.vue'
import APropos from '../views/APropos.vue'
import Contact from '../views/Contact.vue'
import Expertise from '../views/Expertise.vue'
import Technologies from '../views/Technologies.vue'
// import APropos from '../views/APropos.vue'
// import Contact from '../views/Contact.vue'

const routes = [
  { path: '/', name: 'Accueil', component: Accueil },
  { path: '/about', name: 'APropos', component: APropos },
  { path: '/contact', name: 'Contact', component: Contact },
  { path: '/expertise', name: 'Expertise', component: Expertise },
  { path: '/technologies', name: 'Technologies', component: Technologies }
]



const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
