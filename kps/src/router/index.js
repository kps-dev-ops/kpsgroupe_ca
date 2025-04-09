import { createRouter, createWebHistory } from 'vue-router'
// import Accueil from '../views/Acceuil.vue'
import APropos from '../views/APropos.vue'
import Contact from '../views/Contact.vue'
import Expertise from '../views/Expertise.vue'
import Technologies from '../views/Technologies.vue'
import Secretlogin from '../views/Secretlogin.vue'
import home from '../components/home.vue'
import Blogs from '../views/Blogs.vue'
import Blogdetail from '../views/blogdetail.vue'
import Allblog from '../views/Allblog.vue'
// import APropos from '../views/APropos.vue'
// import Contact from '../views/Contact.vue'

const routes = [
  { path: '/', name: 'home', component: home},
  // { path: '/about', name: 'APropos', component: APropos },
  // { path: '/contact', name: 'Contact', component: Contact },
  // { path: '/home', name: 'home', component: home },
  { path: '/login', name: 'Secretlogin', component: Secretlogin , meta:{hidden: true}},
  { path: '/Blogs', name: 'Blogs', component: Blogs },
  {
    path: '/blog/:posts_id',
    name: 'BlogDetail',
    component: Blogdetail
  },
  {path:'/Allblog', name: 'Allblog', component: Allblog}
  

]


const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
