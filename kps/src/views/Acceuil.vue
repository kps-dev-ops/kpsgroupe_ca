<template>
  <div>
    <h1>{{ appStore.pageTitle }}</h1>
    <HelloWorld />
  </div>
</template>

<script setup>
// Importation du store Pinia
import { useAppStore } from '../stores/appStore'
import HelloWorld from '../components/HelloWorld.vue'

// Utilisation du store
const appStore = useAppStore()

// Mise à jour du titre de la page via le store
appStore.setPageTitle('Accueil')
</script>
