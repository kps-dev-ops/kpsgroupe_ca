<template>
    <div class="notfound-container">
      <div class="animation" ref="lottieContainer"></div>
      <h1>404 - Not Found</h1>
      <p>On dirait que cette page s’est envolée !</p>
      <router-link to="/" class="btn-home" aria-label="Retour à la page d'accueil">Retour à l'accueil</router-link>
    </div>
  </template>
  
  <script setup>
  import { onMounted, ref } from 'vue'
  import lottie from 'lottie-web/build/player/lottie_light.min.js'
  import { useHead } from '@vueuse/head'

  useHead({
    title: '404 - Page non trouvée | KPS Analytics',
    meta: [
      {
        name: 'description',
        content: "Cette page n'existe pas ou a été déplacée. Revenez à l'accueil."
      }
    ]
  })
  
  const lottieContainer = ref(null)
  
  onMounted(() => {
    lottie.loadAnimation({
      container: lottieContainer.value,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      path: 'https://assets1.lottiefiles.com/packages/lf20_bhw1ul4g.json'
    })
  })
  </script>

  <style scoped>
  .notfound-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    padding: 2rem;
    text-align: center;
    background-color: #d6e7fd;
  }
  
  .animation {
    width: 300px;
    height: 300px;
    margin-bottom: 2rem;
  }
  
  h1 {
    font-size: 2.5rem;
    margin-bottom: 1rem;
    color: #1f2937;
  }
  
  p {
    font-size: 1.2rem;
    color: #6b7280;
    margin-bottom: 2rem;
  }
  
  .btn-home {
    padding: 0.75rem 1.5rem;
    background-color: #3b82f6;
    color: white;
    border-radius: 8px;
    text-decoration: none;
    transition: background 0.3s ease;
  }
  
  .btn-home:hover {
    background-color: #2563eb;
  }
  </style>
  