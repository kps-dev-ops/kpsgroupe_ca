<template>
    <!-- <Headers/> -->
    <header id="header" class="header d-flex align-items-center fixed-top">
    <div class="header-container container-fluid container-xl position-relative d-flex align-items-center justify-content-between">

   
      <a :href="adminStore.menu[0]?.href" class="logo d-flex align-items-center">
        <img :src="logo" alt="Logo" class="logo-img" />
      </a>

    
      <nav id="navmenu" class="navmenu" :class="{ open: adminStore.isMenuOpen }">
     
        <i
          v-if="adminStore.isMenuOpen"
          class="close-icon bi bi-x d-xl-none"
          @click="adminStore.toggleMenu"
        ></i>

       
        <ul>
          <li v-for="(item, index) in adminStore.menu" :key="index">
           
            <router-link
                :to="item.href"
                :class="{ active: isActive(item.href) }"
                >
                {{ item.label }}
            </router-link>

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
  <div class="blog-detail" v-if="post">
    <div class="banner">
  <img :src="post.image_url" alt="banner" class="banner-background" />
</div>

<div class="banner-title">
  <h1>{{ post.title }}</h1>
</div>


  <div class="content-container">
    <div class="main-content" v-html="post.content" />
  </div>
</div>

</template>

<script setup> 
  import Headers from '../components/Headers.vue';
import {detailmenu} from '../stores/detailmenu.js'
import logo from '/src/assets/img/logo2.png'
import { useRoute } from 'vue-router'
import { ref, onMounted } from 'vue'

const route = useRoute()


import { useBlogStore } from '../stores/blog'

const  adminStore = detailmenu()

const isActive = (href) => {
  const pathOnly = href.split('#')[0]
  return route.path === pathOnly
}
const blogStore = useBlogStore()

const post = ref(null)
const loading = ref(true)

onMounted(async () => {
  await blogStore.fetchArticleBySlug(route.params.slug)
  post.value = blogStore.currentArticle
  loading.value = false
})

const formatDate = (date) =>
  new Date(date).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  })
</script>


<style scoped>
.header {
  padding: 20px 0;
  transition: all 0.5s;
  z-index: 997;
}

.header .header-container {
  background: var(--surface-color);
  border-radius: 50px;
  padding: 5px 25px;
  box-shadow: 0px 2px 15px rgba(0, 0, 0, 0.1);
}

.scrolled .header .header-container {
  background: color-mix(in srgb, var(--surface-color), transparent 5%);
}

.header .logo {
  line-height: 1;
  padding-left: 5px;
}

.header .logo img {
  max-height: 60px;
  margin-right: 8px;
}

.header .logo h1 {
  font-size: 24px;
  margin: 0;
  font-weight: 500;
  color: var(--heading-color);
}

.header .btn-getstarted,
.header .btn-getstarted:focus {
  background: var(--accent-color);
  color: var(--contrast-color);
  font-size: 14px;
  padding: 8px 20px;
  margin: 0 0 0 30px;
  border-radius: 50px;
  transition: 0.3s;
}

.header .btn-getstarted:hover,
.header .btn-getstarted:focus:hover {
  background: color-mix(in srgb, var(--accent-color), transparent 15%);
  color: var(--contrast-color);
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

.blog-detail {
  font-family: var(--default-font);
  color: var(--default-color);
  background: var(--background-color);
}

.banner {
  position: relative;
  width: 100%;
  height: 450px;
  overflow: hidden;
  border-bottom-left-radius: 30px;
  border-bottom-right-radius: 30px;
}

.banner::after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background: rgba(0, 123, 190, 0.); /* 👈 Couleur bleue avec transparence */
  z-index: 2;
}

.banner-background {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  position: relative;
  z-index: 1;
}

/* 
.banner-background {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
} */

/* ✅ Nouveau bloc texte EN DESSOUS de l'image */
.banner-title {
  margin-top: -80px; /* remonte le bloc sous l’image */
  padding-left: 8%;
  position: relative;
  z-index: 10;
}

.banner-title h1 {
  background: linear-gradient(135deg, #0569a1, #368c85);
  color: white;
  font-size: 2.5rem;
  font-weight: 700;
  padding: 2rem 3rem;
  border-radius: 12px;
  max-width: 500px;
  box-shadow: 0 10px 24px rgba(0, 0, 0, 0.15);
  margin: 0;
}


.author-bar {
  margin-top: 1.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
}

.author-bar .avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid #fff;
}

.meta {
  text-align: left;
}

.meta p {
  margin: 0;
  font-weight: 600;
}

.meta small {
  font-size: 0.85rem;
  color: #e0f2f1;
}

/* --------------------
   Contenu
-------------------- */
.content-container {
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  padding: 3rem 1rem;
  justify-content: center;
}

/* Carte Auteur */
.author-section {
  flex: 0 0 250px;
  background: white;
  border-radius: 16px;
  padding: 1.5rem;
  text-align: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
  position: sticky;
  top: 2rem;
  height: fit-content;
}

.author-section .author-img {
  width: 100%;
  height: 240px;
  object-fit: cover;
  border-radius: 12px;
  margin-bottom: 1rem;
}

.author-section h2 {
  font-size: 1.1rem;
  font-weight: 600;
  margin: 0.3rem 0;
}

.bio {
  font-size: 0.9rem;
  color: #555;
  margin-top: 0.5rem;
}

/* Article */
.main-content {
  flex: 1;
  max-width: 800px;
  background: #fff;
  padding: 2.5rem;
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  line-height: 1.7;
}

.main-content h2 {
  font-size: 1.8rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: var(--heading-color);
}

.main-content p {
  font-size: 1rem;
  color: #333;
  margin-bottom: 1.2rem;
  line-height: 1.8;
}

.main-content ul {
  padding-left: 1.2rem;
  margin-bottom: 1.5rem;
}

.main-content li {
  margin-bottom: 0.6rem;
  line-height: 1.5;
}
</style>
