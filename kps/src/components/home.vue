<template>
  <Headers/>
    <Accueil />
    <APropos />
    <Expertise />
    <Technologies/>
    <Clients/>
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
  </script>
  