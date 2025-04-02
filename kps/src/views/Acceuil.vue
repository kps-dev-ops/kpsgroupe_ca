<!-- <template>
    <div>
      <h1>Bienvenue sur la page d'accueil !</h1>
      <HelloWorld />
    </div>
  </template>
  
  <script setup>
  import HelloWorld from '../components/HelloWorld.vue'
  </script>
   -->

<script setup>
import { useAppStore } from '../stores/appStore'
const appStore = useAppStore()
appStore.setPageTitle('Accueil')
</script>

<template>
  <h1>{{ appStore.pageTitle }}</h1>
</template>
