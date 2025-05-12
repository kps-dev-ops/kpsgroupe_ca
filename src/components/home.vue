<template>
  <Headers/>
    <Accueil />
    <APropos />
    <Expertise />
    
    <Technologies/>
    <Clients/>
    <blog/>
    <carriere/>
    <Contact/>
    <Footer/>
    
    </template>
  
  <script setup>

  import Accueil from '../views/Acceuil.vue'
  import APropos from '../views/APropos.vue'
  import Technologies from '../views/Technologies.vue';
  import Clients from '../views/Clients.vue';
  import Footer from './Footer.vue';
  import Headers from './Headers.vue';
  import Expertise from '../views/Expertise.vue';
  import Contact from '../views/Contact.vue';
  import blog from '../views/blog.vue';
  import carriere from '../views/carriere.vue';
  import { useHead } from '@vueuse/head'
  useHead({
  title: 'Accueil | KPS – Conseil en données & développement web',
  meta: [
    {
      name: 'description',
      content: 'KPS Analytics vous accompagne en développement web, data science, Vue.js, Node.js et cybersécurité.'
    }
  ],
  link: [
    {
      rel: 'canonical',
      href: 'https://www.kps-analytics.com/'
    }
  ]
})


  </script>
  