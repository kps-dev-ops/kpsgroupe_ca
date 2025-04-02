<template>
  <nav>
    <RouterLink to="/">Accueil</RouterLink> |
    <!-- <RouterLink to="/a-propos">À propos</RouterLink> |
    <RouterLink to="/contact">Contact</RouterLink> -->
  </nav>

  <RouterView />
</template>

<script setup>
import { RouterView, RouterLink } from 'vue-router'
</script>
