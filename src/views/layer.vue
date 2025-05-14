<template>
    <Blogs />
    <!-- <DashboardE/> -->
    <main>
      <router-view />
    </main>
    <!-- <Footer /> -->
  </template>
  
  <script setup>
  import Blogs from './Blogs.vue';
  import Footer from '../components/Footer.vue';
  import DashboardE from './DashboardE.vue';
</script>
  