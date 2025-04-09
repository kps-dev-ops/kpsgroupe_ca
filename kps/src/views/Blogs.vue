<template>
  <div class="admin-layout">
    <!-- Sidebar -->
    <aside class="sidebar">
      <div class="logo">
        <img :src="authStore.logoUrl" alt="KPS Logo" />
      </div>
      <nav>
        <ul>
          <li><a href="#dashboard" class="nav-link">Dashboard</a></li>
          <li><a href="#posts" class="nav-link">Posts</a></li>
          <li><a href="#authors" class="nav-link">Authors</a></li>
          <li><a href="#comments" class="nav-link">Comments</a></li>
          <li><a href="#categories" class="nav-link">Categories</a></li>
        </ul>
      </nav>
    </aside>

    <!-- Contenu principal -->
    <div class="layout-right">
      <header class="header">
        <div class="header-left">
          <i class="fas fa-chart-line icon-btn"></i>
          <h1 class="admin-title">Admin</h1>
        </div>
        <div class="user-info">
          <img class="avatar" :src="user.avatar" :alt="user.name" />
          <span>{{ user.name }}</span>
        </div>
      </header>

      <main class="main-content">
        <router-view />
      </main>

      <!-- TEST TEMP -->
      <Dashboard />
      <Post />
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
    console.error('Erreur Appwrite :', err)
  }
})
</script>

<style scoped>
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css');

:root {
  --accent-color: #00b894;
  --color-white: #ffffff;
  --background-color: #f5f8fa;
  --nav-color: #2d3436;
  --nav-font: 'Poppins', sans-serif;
  --default-font: 'Inter', sans-serif;
  --default-color: #2c3e50;
}

.admin-layout {
  display: flex;
  height: 100vh;
  background: #f0f4f8;
  font-family: var(--default-font);
}

.sidebar {
  width: 250px;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  background-color: #d8f6ee;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  box-shadow: 2px 0 10px rgba(0, 0, 0, 0.05);
  z-index: 1000;
}

.logo {
  text-align: center;
}
.logo img {
  width: 70px;
  height: 70px;
  border-radius: 50%;
  background-color: var(--color-white);
  padding: 6px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
}

nav ul {
  list-style: none;
  padding: 0;
}
.nav-link {
  display: block;
  color: var(--nav-color);
  font-family: var(--nav-font);
  text-decoration: none;
  padding: 0.75rem 1rem;
  border-radius: 8px;
  transition: all 0.3s ease;
}
.nav-link:hover,
.nav-link.router-link-active {
  background-color: var(--accent-color);
  color: white;
  transform: translateX(5px);
}

.layout-right {
  margin-left: 250px;
  width: calc(100% - 250px);
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.header {
  height: 64px;
  background: linear-gradient(to right, var(--color-white), #e0f7f1);
  padding: 0 2rem;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
  display: flex;
  align-items: center;
  justify-content: space-between;
  z-index: 998;
  position: fixed;
  left: 250px;
  right: 0;
  top: 0;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 1rem;
}
.icon-btn {
  font-size: 1.4rem;
  color: var(--accent-color);
}

.admin-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--accent-color);
}

.user-info {
  display: flex;
  align-items: center;
  gap: 1rem;
  font-weight: 500;
  color: var(--accent-color);
}
.avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: 2px solid var(--accent-color);
}

/* Scrollable main content */
.main-content {
  margin-top: 64px;
  padding: 2rem;
  flex: 1;
  overflow-y: auto;
  background-color: var(--background-color);
  height: calc(100vh - 64px);
}

/* Responsive */
@media (max-width: 768px) {
  .sidebar {
    width: 100%;
    height: auto;
    position: relative;
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
    position: relative;
  }
}
</style>
