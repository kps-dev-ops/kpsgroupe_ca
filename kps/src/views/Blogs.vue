<template>
  <!-- <Headers/> -->
   <header id="header" class="header fixed-top d-flex align-items-center">
    <div class="header-container container-fluid d-flex align-items-center justify-between px-4">

   
      <a :href="adminStore.menu[0]?.href" class="logo d-flex align-items-center">
        <img :src="adminStore.logoPath" alt="Logo" class="logo-img" />
      </a>

    
      <nav id="navmenu" class="navmenu" :class="{ open: adminStore.isMenuOpen }">
     
        <i
          v-if="adminStore.isMenuOpen"
          class="close-icon bi bi-x d-xl-none"
          @click="adminStore.toggleMenu"
        ></i>

       
        <ul>
          <li v-for="(item, index) in adminStore.menu" :key="index">
            <a
              :href="item.href"
              :class="{ active: activeSection === item.href }"
              @click="handleMenuClick(item.href)"
            >
              {{ item.label }}
            </a>
          </li>
        </ul>
      </nav>

   
      <div class="mobile-icons d-xl-none" v-if="!adminStore.isMenuOpen">
        <i class="bi bi-list" @click="adminStore.toggleMenu"></i>
      </div>

      <button class="btn-getstarted" @click="handleLogout">
        {{ adminStore.contactText }}
      </button>

    </div>
  </header>
  <Dashboard/>
  <Post/>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { Admminstore } from '../stores/Adminstrore'
import { useAuthStore } from '../stores/authStore'
import { Client, Account } from 'appwrite'
import md5 from 'blueimp-md5'
import Dashboard from './Dashboard.vue'
import Post from './Post.vue'
import { useBlogStore } from '../stores/blog'
import Headers from '../components/Headers.vue'

const router = useRouter()
const adminStore = Admminstore()
const authStore = useAuthStore()
const blogStore = useBlogStore()

const activeSection = ref(adminStore.menu[0]?.href)

const client = new Client()
client.setEndpoint('https://[TON_ENDPOINT]').setProject('[TON_PROJECT_ID]')
const account = new Account(client)

const user = ref({ name: '', email: '', avatar: '' })

const handleMenuClick = (href) => {
  activeSection.value = href
  adminStore.toggleMenu()
}

onMounted(async () => {
  try {
    const current = await account.get()
    user.value.name = current.name
    user.value.email = current.email
    user.value.avatar = `https://www.gravatar.com/avatar/${md5(current.email.trim().toLowerCase())}?d=identicon`
  } catch (err) {
    console.error('Erreur Appwrite :', err)
  }
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
  z-index: 1050;
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

/* Menu desktop */
.navmenu {
  display: flex;
  align-items: center;
}
.navmenu ul {
  display: flex;
  gap: 1.5rem;
  margin: 0;
  padding: 0;
  list-style: none;
}
.navmenu a {
  color: #4a4a4a;
  font-weight: 500;
  text-decoration: none;
  padding: 0.4rem 0.6rem;
  transition: all 0.3s ease;
  border-radius: 8px;
}
.navmenu a:hover,
.navmenu a.active {
  background-color: #2aa39a;
  color: white;
  transform: translateY(-2px);
}

.btn-getstarted {
  background-color: #2aa39a;
  color: white;
  font-weight: 500;
  padding: 0.5rem 1rem;
  border-radius: 10px;
  text-decoration: none;
  transition: background 0.3s ease;
}
.btn-getstarted:hover {
  background-color: #248a83;
}

.mobile-icons {
  font-size: 1.6rem;
  cursor: pointer;
}

/* Menu responsive */
@media (max-width: 1200px) {
  .navmenu {
    position: absolute;
    top: 64px;
    right: 0;
    background: white;
    flex-direction: column;
    width: 250px;
    box-shadow: -4px 0 10px rgba(0, 0, 0, 0.08);
    padding: 1.5rem 1rem;
    transform: translateX(100%);
    transition: transform 0.3s ease;
    z-index: 1000;
    display: none;
    opacity: 0;
    visibility: hidden;
  }

  .navmenu.open {
    transform: translateX(0);
    display: flex;
    opacity: 1;
    visibility: visible;
  }

  .navmenu ul {
    display: flex;
    flex-direction: column;
    gap: 1.2rem;
    padding: 0;
    margin: 0;
    list-style: none;
    width: 100%;
  }

  .navmenu li {
    width: 100%;
  }

  .navmenu li a {
    display: block;
    font-size: 1rem;
    font-weight: 500;
    color: #1c1e21;
    text-decoration: none;
    padding: 0.6rem 1rem;
    border-radius: 8px;
    width: 100%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .navmenu li a:hover,
  .navmenu li a.active {
    background-color: #2aa39a;
    color: white;
  }

  .close-icon {
    align-self: flex-end;
    font-size: 1.6rem;
    cursor: pointer;
    margin-bottom: 1rem;
  }
}
</style>
