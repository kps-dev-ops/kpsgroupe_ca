import { createRouter, createWebHistory } from 'vue-router'
import { useBlogStore } from '../stores/blog'

import Secretlogin from '../views/Secretlogin.vue'
import home from '../components/home.vue'
import Dashboard from '../views/Blogs.vue'
import Blogdetail from '../views/blogdetail.vue'
import Allblog from '../views/Allblog.vue'
import detailblog from '../views/detailblog.vue'
import Documentation from '../components/Documentation.vue'
import DashboardE from '../views/DashboardE.vue'
import Carrrieredash from '../views/Carrrieredash.vue'
import layer from '../views/layer.vue'
import Jobs from '../views/Jobs.vue'
import jobdetail from '../views/jobdetail.vue'


const requireAuth = async (to, from, next) => {
  const blog = useBlogStore()

  await blog.checkAuth()

  if (!blog.user) {
    next({ name: 'Secretlogin' })
  } else {
    next()
  }
}

const routes = [
  //  {
  //   path: '/layer',
  //   name:'layer',
  //   component: layer,
  //   children: [
  //     { path: 'Dashboad', name: 'DashboardE', component: DashboardE },
  //     { path: 'Carrrieredash', name: 'Carrrieredash', component: Carrrieredash},
  //     // { path: 'blog', name: 'Carrrieredash', component: Carrrieredash },
  //   ]
  // },
  { path: '/', name: 'home', component: home },
  { path: '/login', name: 'Secretlogin', component: Secretlogin, meta: { hidden: true } },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard, beforeEnter: requireAuth },
  { path: '/layer', name: 'layer', component: layer, children: [
       { path: 'Dashboad', name: 'DashboardE', component: DashboardE },
       { path: 'Carrrieredash', name: 'Carrrieredash', component: Carrrieredash},
       { path: 'kps-doc', name: 'Documentation', component: Documentation, meta: { hidden: true }, beforeEnter: requireAuth },

       
    ]},

  { path: '/blog', name: 'Allblog', component: Allblog },
  {path: '/blog/:slug', name: 'detailblog', component: detailblog},
  {path: '/job/:slug', name: 'jobdetail', component: jobdetail},
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('../views/NotFound.vue'),
  },
  {
    path: '/jobs',
    name: 'Jobs',
    component: Jobs
  },
  
  // { path: '/kps-doc', name: 'Documentation', component: Documentation, meta: { hidden: true }, beforeEnter: requireAuth },
  //{ path: '/Dashboad', name: 'DashboardE', component: DashboardE, meta: { hidden: true }, beforeEnter: requireAuth },
  // { path: '/Carrrieredash', name: ' Carrrieredash', component:  Carrrieredash, meta: { hidden: true }, beforeEnter: requireAuth }


]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (to.hash) {
      return {
        el: to.hash,
        behavior: 'smooth'
      }
    }
    return { top: 0 }
  }
})

export default router
