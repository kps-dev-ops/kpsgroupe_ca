<template>
    <footer id="footer" class="footer">
      <div class="row gy-4 justify-content-center text-center text-md-start">

<!-- Bloc logo & citation -->
<div class="col-12 col-md-6 col-lg-5 footer-about">
  <a href="#hero" class="logo d-flex justify-content-center justify-content-md-start mb-3">
    <img :src="store.logo" alt="Logo" class="img-fluid" style="max-height: 50px;" />
  </a>
  <p>{{ store.citation }}</p>
  <div class="social-links d-flex justify-content-center justify-content-md-start gap-3 mt-3">
    <a v-for="(link, index) in store.socialLinks" :key="index" :href="link.href" target="_blank">
      <i :class="link.icon" class="fs-5"></i>
    </a>
  </div>
</div>

<!-- Bloc navigation centré sur mobile -->
<div class="col-12 col-md-3 footer-links text-center text-md-start">
  <h5 class="fw-bold mb-3" style="color:#5E5325;">Navigation</h5>
  <ul class="list-unstyled d-flex flex-column align-items-center align-items-md-start">
    <li v-for="(item, index) in store.navLinks" :key="index" class="mb-2">
      <a :href="item.href" class="text-decoration-none text-dark">{{ item.label }}</a>
    </li>
  </ul>
</div>


<!-- Bloc contact centré aussi -->
<div class="col-12 col-md-3 footer-links text-center text-md-start">
  <h5 class="fw-bold mb-3">Contact</h5>
  <p>{{ store.contact.adresse }}</p>
  <p class="mt-2"><strong>Téléphone:</strong> <span>{{ store.contact.tel }}</span></p>
  <p><strong>Email:</strong> 
    <a :href="`mailto:${store.contact.email}`" class="text-decoration-none" style="color:#45A79E;">{{ store.contact.email }}</a>
  </p>
</div>

</div>

    </footer>
  </template>
  
  <script setup>
  import { useFooterStore } from '../stores/useFooterStore'
  const store = useFooterStore()
  </script>
  