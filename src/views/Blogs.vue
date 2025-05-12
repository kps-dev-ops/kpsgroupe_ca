<template>

   <header id="header" class="header fixed-top d-flex align-items-center">
    <div class="header-container container-fluid d-flex align-items-center justify-between px-4">

   
      <a :href="adminStore.menu[0]?.href" class="logo d-flex align-items-center">
        <img :src="adminStore.logoPath" alt="Logo" class="logo-img" />
      </a>  

      <nav class="nav-links">
  <a
    v-for="item in adminStore.menu"
    :key="item.href"
    :href="item.href"
    class="nav-link"
    :class="{ active: activeSection === item.href }"
    @click="handleMenuClick(item.href)"
  >
    {{ item.label }}
  </a>
</nav>


      <!-- <button class="btn-getstarted" @click="handleLogout" style="border: none;">
        {{ adminStore.contactText }}
      </button>
      <button class="btn-tutoriel" @click="goToTutoriel" style="border: none;">
        {{ adminStore.tutoriels }}  
      </button> -->

      <div class="btn-group">
        <button class="btn-carriere" @click="goToCarriere" style="border: none;">
        {{ adminStore.Carriere }}
      </button>
      <button class="btn-dashboad" @click="goToDash" style="border: none;">
        {{ adminStore.Dashboad }}
      </button>
        <button class="btn-tutoriel" @click="goToTutoriel" style="border: none;">
          {{ adminStore.tutoriels }}
        </button>
      <button class="btn-getstarted" @click="handleLogout" style="border: none;">
        {{ adminStore.contactText }}
      </button>
     </div>



    </div>
  </header>
  <Dashboard/>

</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { Admminstore } from '../stores/Adminstrore'
import { useAuthStore } from '../stores/authStore'
import { Client, Account } from 'appwrite'
import md5 from 'blueimp-md5'
import Dashboard from './DashboardE.vue'
import Post from './Post.vue'
import { useBlogStore } from '../stores/blog'
import Headers from '../components/Headers.vue'
import { useHead } from '@vueuse/head'

useHead({
  title: 'Dashboard | KPS',
  meta: [
    {
      name: 'robots',
      content: 'noindex, nofollow'
    }
  ],
  link: [
    {
      rel: 'canonical',
      href: 'https://www.kps-analytics.com/dashboard'
    }
  ]
})


const router = useRouter()
const adminStore = Admminstore()
const authStore = useAuthStore()
const blogStore = useBlogStore()

const activeSection = ref(adminStore.menu[0]?.href)



const user = ref({ name: '', email: '', avatar: '' })

const handleMenuClick = (href) => {
  activeSection.value = href
  adminStore.toggleMenu()
}

const goToTutoriel = () => {
  router.push('/kps-doc')
}


const goToDash = () => {
  router.push('/Dashboad')
}



const goToCarriere = () => {
  router.push('/Carrrieredash')
}


onMounted(async () => {
 
})

const handleLogout = async () => {
  try {
    await blogStore.logout()
    router.push('/login') 
  } catch (err) {
    console.error('Erreur de déconnexion :', err)
  }
}
</script>

<style scoped>
.nav-links {
  display: flex;
  gap: 1rem;
}

.nav-link {
  text-decoration: none;
  color: #333;
  font-weight: 500;
}

.nav-link.active {
  color: #45A79E;
}

.btn-group {
  display: flex;
  align-items: center;
  gap: 12px;
}


.btn-tutoriel {
  background-color: transparent;
  color: #45A79E;
  font-weight: 500;
  padding: 0.5rem 1rem;
  /* border: 2px solid #45A79E; */
  border-radius: 10px;
  margin-left: 0.5rem;
  transition: all 0.3s ease;
}
.btn-tutoriel:hover {
  background-color: #45A79E;
  color: white;
}
 
.header {
  background-color: white;
  height: 64px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.03);
  display: flex;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 10;
}

.header-container {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.logo-img {
  height: 42px;
  border-radius: 8px;
}

.btn-getstarted {
  background-color: #45A79E;
  color: white;
  font-weight: 500;
  padding: 0.5rem 1rem;
  border-radius: 10px;
  text-decoration: none;
  transition: background 0.3s ease;
}


.btn-carriere {
  background-color: white;
  color: #45A79E;
  font-weight: 500;
  padding: 0.5rem 1rem;
  border-radius: 10px;
  text-decoration: none;
  transition: background 0.3s ease;
}


.btn-dashboad {
  
  /* color: white; */
  background: white;
  color: #45A79E;
  font-weight: 500;
  padding: 0.5rem 1rem;
  border-radius: 10px;
  text-decoration: none;
  transition: background 0.3s ease;
}

.btn-carriere:hover {
  background-color: #45A79E;
  color: white;
}

.btn-dashboad:hover {
  background-color: #45A79E;
  color: white;
}
.btn-getstarted:hover {
  background-color: #866840;
}

.mobile-icons {
  font-size: 1.6rem;
  cursor: pointer;
}

</style>
