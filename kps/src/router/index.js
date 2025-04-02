import { createRouter, createWebHistory } from 'vue-router'
import Accueil from '../views/Acceuil.vue'
// import APropos from '../views/APropos.vue'
// import Contact from '../views/Contact.vue'

const routes = [
  { path: '/', name: 'Accueil', component: Accueil },
//   { path: '/a-propos', name: 'APropos', component: APropos },
//   { path: '/contact', name: 'Contact', component: Contact }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
