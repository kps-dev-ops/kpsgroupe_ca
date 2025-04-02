// src/components/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import Login from '../Login.vue'  
import Welcome from '../Welcome.vue'
import Custumers from '../Custumers.vue'
import Formcreatecoach from '../Formcreatecoach.vue'
import GardeRobe from '../GardeRobe.vue'
import Statistique from '../Statistique.vue'
import Compatibilite from '../Compatibilité.vue'
import Tips from '../Tips.vue'
import Formcoach from '../Formcoach.vue'
import Formcoach1 from '../Formcoach1.vue'
import Events from '../Events.vue'
import Redirect from '../Redirect.vue'
// import Sharedoc from '../Sharedoc.vue'

const routes = [
  { path: '/', component: Login },
  { path: '/home', component: Welcome },
  { path: '/Custumers' , component:Custumers},
  { path: '/GardeRobe', component:GardeRobe},
  { path: '/Statistique', component:Statistique},
  { path: '/Coaches', component: Formcreatecoach},
  { path: '/Compatibilite', component:Compatibilite},
  { path: '/Tips', component:Tips},
  {path: '/Formcoach/:coachinfo', name: 'Formcoach', component:Formcoach},
  {path: '/createcoach', component:Formcoach1},
  {path: '/events', component:Events},
  {path: '/redirection', component:Redirect},
  // {path: '/Share', component:Sharedoc}


]

const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_BASE_URL),
  routes: routes,
  linkActiveClass: 'active'
})

export default router

