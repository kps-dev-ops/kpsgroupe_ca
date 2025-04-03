<template>
  <header id="header" class="header d-flex align-items-center fixed-top">
    <div class="header-container container-fluid container-xl position-relative d-flex align-items-center justify-content-between">

      <!-- Logo dynamique -->
      <a :href="store.menu[0].href" class="logo d-flex align-items-center me-auto me-xl-0">
        <img :src="store.logoPath" alt="Logo">
      </a>

      <!-- Menu dynamique -->
      <nav id="navmenu" :class="['navmenu', store.isMenuOpen ? 'menu-open' : '']">
        <ul>
          <li v-for="(item, index) in store.menu" :key="index">
            <a style="text-decoration: none;" :href="item.href" :class="{ active: index === 0 }">{{ item.label }}</a>
          </li>
        </ul>
        <!-- Fix: Appel correct de la fonction avec store -->
        <i class="mobile-nav-toggle d-xl-none bi bi-list" @click="store.toggleMenu"></i>

      </nav>

      <!-- Bouton dynamique -->
      <a style="text-decoration: none;" class="btn-getstarted" :href="store.contactHref">
        {{ store.contactText }}
      </a>
    </div>
  </header>
</template>

<script setup>
import { useHeaderStore } from '../stores/headerStore'
const store = useHeaderStore()
</script>

<style scoped>
html {
  scroll-behavior: smooth;
}
</style>
