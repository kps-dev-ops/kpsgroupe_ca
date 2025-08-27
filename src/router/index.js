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
import Formations from '../views/Formations.vue'

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
  { 
    path: '/', 
    name: 'home', 
    component: home,
    meta: {
      title: 'Accueil | KPS – Conseil en données & développement web',
      description: 'KPS Analytics vous accompagne dans tout processus de transformation digitale : web, data science, cybersécurité...'
    }
  },
  { 
    path: '/login', 
    name: 'Secretlogin', 
    component: Secretlogin, 
    meta: { hidden: true } 
  },
  { 
    path: '/dashboard', 
    name: 'Dashboard', 
    component: Dashboard, 
    beforeEnter: requireAuth 
  },
  { 
    path: '/layer', 
    name: 'layer', 
    component: layer, 
    children: [
      { path: 'Dashboad', name: 'DashboardE', component: DashboardE },
      { path: 'Carrrieredash', name: 'Carrrieredash', component: Carrrieredash},
      { path: 'kps-doc', name: 'Documentation', component: Documentation, meta: { hidden: true }, beforeEnter: requireAuth },
    ]
  },
  { 
    path: '/blog', 
    name: 'Allblog', 
    component: Allblog,
    meta: {
      title: 'Blog | KPS Analytics - Actualités et conseils',
      description: 'Découvrez nos articles sur le développement web, la data science, la cybersécurité et les dernières tendances technologiques.'
    }
  },
  {
    path: '/blog/:slug', 
    name: 'detailblog', 
    component: detailblog,
    meta: {
      title: 'Article | KPS Analytics Blog',
      description: 'Lisez nos articles détaillés sur les technologies et tendances du digital.'
    }
  },
  {
    path: '/job/:slug', 
    name: 'jobdetail', 
    component: jobdetail,
    meta: {
      title: 'Offre d\'emploi | KPS Analytics Carrières',
      description: 'Découvrez les détails de cette opportunité de carrière chez KPS Analytics.'
    }
  },
  {
    path: '/jobs',
    name: 'Jobs',
    component: Jobs,
    meta: {
      title: 'Carrières | KPS Analytics - Rejoignez notre équipe',
      description: 'Découvrez nos offres d\'emploi et opportunités de carrière dans le développement web, la data science et la cybersécurité.'
    }
  },
  {
    path: '/formations',
    name: 'Formations',
    component: Formations,
    meta: {
      title: 'Formations | KPS Analytics - Développez vos compétences',
      description: 'Découvrez notre catalogue de formations professionnelles pour développer vos compétences en développement web, data science et cybersécurité.',
      keywords: 'formations, développement web, data science, cybersécurité, apprentissage, compétences'
    }
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('../views/NotFound.vue'),
    meta: {
      title: 'Page non trouvée | KPS Analytics',
      description: 'La page que vous recherchez n\'existe pas.'
    }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else if (to.hash) {
      return {
        el: to.hash,
        behavior: 'smooth'
      }
    } else {
      return { top: 0 }
    }
  }
})

// Gestion des métadonnées pour le SEO
router.beforeEach((to, from, next) => {
  // Mise à jour du titre de la page
  if (to.meta.title) {
    document.title = to.meta.title
  }
  
  // Mise à jour de la meta description
  if (to.meta.description) {
    let metaDescription = document.querySelector('meta[name="description"]')
    if (!metaDescription) {
      metaDescription = document.createElement('meta')
      metaDescription.name = 'description'
      document.head.appendChild(metaDescription)
    }
    metaDescription.setAttribute('content', to.meta.description)
  }
  
  // Mise à jour des meta keywords
  if (to.meta.keywords) {
    let metaKeywords = document.querySelector('meta[name="keywords"]')
    if (!metaKeywords) {
      metaKeywords = document.createElement('meta')
      metaKeywords.name = 'keywords'
      document.head.appendChild(metaKeywords)
    }
    metaKeywords.setAttribute('content', to.meta.keywords)
  }
  
  // Mise à jour du lien canonique
  const canonicalUrl = `${window.location.origin}${to.path}`
  let canonicalLink = document.querySelector('link[rel="canonical"]')
  if (!canonicalLink) {
    canonicalLink = document.createElement('link')
    canonicalLink.setAttribute('rel', 'canonical')
    document.head.appendChild(canonicalLink)
  }
  canonicalLink.setAttribute('href', canonicalUrl)
  
  // Mise à jour des Open Graph tags
  if (to.meta.title) {
    let ogTitle = document.querySelector('meta[property="og:title"]')
    if (!ogTitle) {
      ogTitle = document.createElement('meta')
      ogTitle.setAttribute('property', 'og:title')
      document.head.appendChild(ogTitle)
    }
    ogTitle.setAttribute('content', to.meta.title)
  }
  
  if (to.meta.description) {
    let ogDescription = document.querySelector('meta[property="og:description"]')
    if (!ogDescription) {
      ogDescription = document.createElement('meta')
      ogDescription.setAttribute('property', 'og:description')
      document.head.appendChild(ogDescription)
    }
    ogDescription.setAttribute('content', to.meta.description)
  }
  
  // URL Open Graph
  let ogUrl = document.querySelector('meta[property="og:url"]')
  if (!ogUrl) {
    ogUrl = document.createElement('meta')
    ogUrl.setAttribute('property', 'og:url')
    document.head.appendChild(ogUrl)
  }
  ogUrl.setAttribute('content', canonicalUrl)
  
  next()
})

export default router