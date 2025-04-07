<template>
  <div class="admin-layout">
    <aside class="sidebar">
      <div class="logo">
        <img :src="authStore.logoUrl" alt="KPS Logo" />
        <!-- <h1>KPS<br /><small>DATA ANALYTICS</small></h1> -->
      </div>
      <nav>
        <ul>
          <li><router-link to="/dashboard">Dashboard</router-link></li>
          <li><router-link to="/posts">Posts</router-link></li>
          <li><router-link to="/authors">Authors</router-link></li>
          <li><router-link to="/comments">Comments</router-link></li>
          <li><router-link to="/categories">Categories</router-link></li>
        </ul>
      </nav>
    </aside>

    <header class="header">
      <span>Admin</span>
      <div class="user-info">
        <img class="avatar" :src="user.avatar" :alt="user.name" />
        <span>{{ user.name }}</span>
      </div>
    </header>

    <main class="main-content">
      <router-view />
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { Client, Account } from 'appwrite'
import { useAuthStore } from '../stores/authStore'
import md5 from 'blueimp-md5'

const client = new Client()
const authStore = useAuthStore()
client.setEndpoint('https://[TON_ENDPOINT]').setProject('[TON_PROJECT_ID]')

const account = new Account(client)

const user = ref({ name: '', email: '', avatar: '' })

onMounted(async () => {
  try {
    const current = await account.get()
    user.value.name = current.name
    user.value.email = current.email
    user.value.avatar = `https://www.gravatar.com/avatar/${md5(current.email.trim().toLowerCase())}?d=identicon`
  } catch (err) {
    console.error("Erreur Appwrite :", err)
  }
})
</script>
<style scoped>
.admin-layout {
  display: flex;
  min-height: 100vh;
  font-family: var(--default-font);
}

.sidebar {
  width: 250px;
  background-color: #D6F5E3;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.sidebar .logo {
  text-align: center;
  margin-bottom: 1rem;
}

.sidebar .logo img {
  width: 70px;
  height: 60px;
  border-radius: 50%;
  background-color: var(--color-white);
  padding: 6px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1); /* optionnel : léger effet d'élévation */
}


.sidebar nav ul {
  list-style: none;
  padding: 0;
}

.sidebar nav ul li {
  margin: 0.5rem 0;
}
/* 
.sidebar nav ul li a {
  
  text-decoration: none;
  padding: 0.5rem;
  display: block;
  border-radius: 5px;
  font-family: var(--nav-font);
} */

.sidebar nav ul li a {
  color: var(--nav-color);
  text-decoration: none;
  padding: 0.5rem;
  display: block;
  border-radius: 5px;
  font-family: var(--nav-font);
  position: relative;
  overflow: hidden;
}

.sidebar nav ul li a::after {
  content: '';
  position: absolute;
  bottom: 5px;
  left: 0;
  width: 0;
  height: 2px;
  background-color: var(--accent-color);
  transition: width 0.3s ease-in-out;
}

.sidebar nav ul li a:hover::after,
.sidebar nav ul li a.router-link-active::after {
  width: 100%;
}


.sidebar nav ul li a.router-link-active {
  background-color: var(--accent-color); /* vert turquoise */
  color: var(--color-white);
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: linear-gradient(to right, var(--color-white),#D6F5E3);
  padding: 1rem;
  width: calc(100% - 250px);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  font-family: var(--default-font);
}

.user-info {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--accent-color); /* turquoise */
}

.avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: 2px solid var(--accent-color);
}

.main-content {
  flex: 1;
  padding: 2rem;
  background-color: var(--background-color); /* blanc */
  color: var(--default-color);
}

@media (max-width: 768px) {
  .admin-layout {
    flex-direction: column;
  }

  .header {
    width: 100%;
  }

  .sidebar {
    width: 100%;
    flex-direction: row;
    overflow-x: auto;
  }
}
</style>
