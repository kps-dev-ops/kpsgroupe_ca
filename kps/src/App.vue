<template>
  <nav>
    <RouterLink to="/">Accueil</RouterLink> |
    <RouterLink to="/about">À propos</RouterLink> |
    <RouterLink to="/contact">Contact</RouterLink> |
    <RouterLink to="/expertise">Expertise</RouterLink> |
    <RouterLink to="/technologies">Technologies</RouterLink>
  </nav>

  <RouterView />
</template>

<script setup>
import { RouterView, RouterLink } from 'vue-router'
</script>
