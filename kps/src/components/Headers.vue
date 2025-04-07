<template>
  <header id="header" class="header d-flex align-items-center fixed-top">
    <div class="header-container container-fluid container-xl position-relative d-flex align-items-center justify-content-between">

      <!-- Logo dynamique -->
      <a style="text-decoration: none;" :href="store.menu[0].href" class="logo d-flex align-items-center me-auto me-xl-0">
        <img :src="store.logoPath" alt="Logo">
      </a>

      <!-- Menu dynamique -->
      <nav id="navmenu" class="navmenu">
        <!-- CROIX (×) en haut à droite du menu mobile -->
        <i
          v-if="store.isMenuOpen"
          class="close-icon bi bi-x d-xl-none"
          @click="store.toggleMenu"
        ></i>

        <ul>
          <li v-for="(item, index) in store.menu" :key="index">
            <a style="text-decoration: none;"
              :href="item.href"
              :class="{ active: activeSection === item.href }"
              @click="store.toggleMenu"
            >
              {{ item.label }}
            </a>
          </li>
        </ul>
      </nav>

      <!-- Icône menu (☰) mobile -->
      <div class="mobile-icons d-xl-none" v-if="!store.isMenuOpen">
        <i class="bi bi-list" @click="store.toggleMenu"></i>
      </div>

      <!-- Bouton contact -->
      <a style="text-decoration: none;" class="btn-getstarted" :href="store.contactHref">
        {{ store.contactText }}
      </a>
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { useHeaderStore } from '../stores/headerStore'

const store = useHeaderStore()
const activeSection = ref(window.location.hash || '#hero')

onMounted(() => {
  window.addEventListener('hashchange', () => {
    activeSection.value = window.location.hash
  })
})

watch(() => store.isMenuOpen, (isOpen) => {
  if (isOpen) {
    document.body.classList.add('mobile-nav-active')
  } else {
    document.body.classList.remove('mobile-nav-active')
  }
})
</script>

<style scoped>
html {
  scroll-behavior: smooth;
}

a {
  position: relative;
  padding-bottom: 4px;
  color: black;
  font-weight: normal;
  transition: all 0.3s ease-in-out;
}

/* Style actif (texte) */
a.active {
  color:#2aa39a;
  font-weight: bold;
}

/* Effet de soulignement animé */
a::after {
  content: '';
  position: absolute;
  left: 0;
  bottom: 0;
  height: 2px;
  width: 0;
  background-color: #2aa39a;
  transition: width 0.4s ease-in-out;
}

/* Active = ligne qui s'étire */
a.active::after {
  width: 100%;
}


/* Lien actif */
.active {
  color: #2aa39a;
  font-weight: normal;
  border: none;
  text-decoration: none;
}

/* Icône menu mobile */
.mobile-icons {
  display: flex;
  align-items: center;
  margin-left: auto;
  margin-right: 10px;
}

.mobile-icons i {
  font-size: 28px;
  color: #222;
  cursor: pointer;
  transition: 0.2s;
}

@media (min-width: 1200px) {
  .mobile-icons {
    display: none;
  }
}

/* CROIX dans le menu mobile */
.close-icon {
  position: absolute;
  top: 15px;
  right: 20px;
  font-size: 28px;
  color: #111;
  cursor: pointer;
  z-index: 10001;
}

/* Menu mobile */
@media (max-width: 1199px) {
  .navmenu ul {
    display: none;
  }

  body.mobile-nav-active .navmenu {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background: rgba(33, 37, 41, 0.8);
    z-index: 9998;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  body.mobile-nav-active .navmenu ul {
    display: flex;
    flex-direction: column;
    background: white;
    border-radius: 12px;
    padding: 30px 20px 20px;
    width: 80%;
    max-width: 300px;
    box-shadow: 0 0 30px rgba(0, 0, 0, 0.15);
    position: relative;
  }

  body.mobile-nav-active .navmenu li {
    margin-bottom: 1.5rem;
    text-align: center;
  }

  body.mobile-nav-active .navmenu a {
    font-size: 18px;
    font-weight: normal;
    color: #111;
    text-decoration: none;
    transition: color 0.2s ease-in-out;
  }

  body.mobile-nav-active .navmenu a.active {
    color: #2aa39a;
    font-weight: 600;
    border: none;
    text-decoration: none;
  }

  body.mobile-nav-active .navmenu a.active::after {
    display: none !important;
  }

  body.mobile-nav-active .navmenu a.active:focus,
  body.mobile-nav-active .navmenu a.active:visited {
    outline: none;
    box-shadow: none;
    border: none;
  }

  body.mobile-nav-active {
    overflow: hidden;
  }
}
</style>
