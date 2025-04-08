<template>
  <div class="admin-layout">
    <aside class="sidebar">
      <div class="logo">
        <img :src="authStore.logoUrl" alt="KPS Logo" />
      </div>
      <nav>
        <ul>
          <li><a href="#dashboard">Dashboard</a></li>
          <li><a href="#posts">Posts</a></li>
          <li><a href="#authors">Authors</a></li>
          <li><a href="#comments">Comments</a></li>
          <li><a href="#categories">Categories</a></li>
        </ul>
      </nav>

    </aside>

    <div class="layout-right">
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
      <Dashboard/>
      <Post/>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { Client, Account } from 'appwrite'
import { useAuthStore } from '../stores/authStore'
import Dashboard from './Dashboard.vue'
import Post from './Post.vue'
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
html, body {
  height: 100%;
  margin: 0;
  scroll-behavior: smooth;
  font-family: var(--default-font);
}

.admin-layout {
  display: flex;
}

.sidebar {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 250px;
  background-color: #D6F5E3;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  z-index: 1000;
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
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
}

.sidebar nav ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.sidebar nav ul li {
  margin: 0.5rem 0;
}

.sidebar nav ul li a {
  color: var(--nav-color);
  text-decoration: none;
  padding: 0.5rem;
  display: block;
  border-radius: 5px;
  font-family: var(--nav-font);
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
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
  background-color: var(--accent-color);
  color: var(--color-white);
}

.layout-right {
  margin-left: 250px; /* espace pour la sidebar fixe */
  width: calc(100% - 250px);
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.header {
  position: fixed;
  top: 0;
  left: 250px;
  right: 0;
  height: 70px;
  background: linear-gradient(to right, var(--color-white), #D6F5E3);
  padding: 1rem 2rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  display: flex;
  align-items: center;
  justify-content: space-between;
  z-index: 999;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 1rem;
  color: var(--accent-color);
}

.avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: 2px solid var(--accent-color);
}

.main-content {
  margin-top: 70px; /* espace pour le header fixe */
  flex: 1;
  padding: 2rem;
  background-color: var(--background-color);
  color: var(--default-color);
}

/* Responsive */
@media (max-width: 768px) {
  .sidebar {
    position: relative;
    height: auto;
    width: 100%;
    flex-direction: row;
    overflow-x: auto;
  }

  .layout-right {
    margin-left: 0;
    width: 100%;
  }

  .header {
    left: 0;
    width: 100%;
  }

  .main-content {
    margin-top: 70px;
  }
}

</style>
