import { createRouter, createWebHistory } from 'vue-router'
import { useBlogStore } from '../stores/blog'

import Secretlogin from '../views/Secretlogin.vue'
import home from '../components/home.vue'
import Blogs from '../views/Blogs.vue'
import Blogdetail from '../views/blogdetail.vue'
import Allblog from '../views/Allblog.vue'

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
  { path: '/', name: 'home', component: home },
  { path: '/login', name: 'Secretlogin', component: Secretlogin, meta: { hidden: true } },
  { path: '/Blogs', name: 'Blogs', component: Blogs, beforeEnter: requireAuth },
  { path: '/blog/:posts_id', name: 'BlogDetail', component: Blogdetail },
  { path: '/Allblog', name: 'Allblog', component: Allblog }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
