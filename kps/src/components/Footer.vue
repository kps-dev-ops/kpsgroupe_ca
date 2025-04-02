<template>
    <footer id="footer" class="footer">
      <div class="container footer-top">
        <div class="row gy-4">
          <!-- Logo & Citation -->
          <div class="col-md-6 footer-about">
            <a href="#hero" class="logo d-flex align-items-center">
              <img :src="store.logo" alt="KPS Consulting Analytics">
            </a>
            <p>{{ store.citation }}</p>
            <div class="social-links">
              <a v-for="(link, index) in store.socialLinks" :key="index" :href="link.href" target="_blank">
                <i :class="link.icon"></i>
              </a>
            </div>
          </div>
  
          <!-- Navigation Links -->
          <div class="col-md-3 footer-links">
            <h4 style="color:#5E5325;">Navigation</h4>
            <ul>
              <li v-for="(item, index) in store.navLinks" :key="index">
                <a style="text-decoration: none;":href="item.href">{{ item.label }}</a>
              </li>
            </ul>
          </div>
  
          <!-- Contact -->
          <div class="col-md-3 footer-links">
            <div class="footer-contact pt-2">
              <p>{{ store.contact.adresse }}</p>
              <p class="mt-3"><strong>Téléphone:</strong> <span>{{ store.contact.tel }}</span></p>
              <p><strong>Email:</strong> <span><a style="color:cadetblue; text-decoration: none;" :href="`mailto:${store.contact.email}`">{{ store.contact.email }}</a></span></p>
            </div>
          </div>
        </div>
      </div>
  
      <div class="container copyright text-center mt-4">
        <p>© <span>Copyright</span> <strong class="px-1 sitename">KPS CONSULTING ANALYTICS</strong> <span>Tous droits réservés</span></p>
      </div>
    </footer>
  </template>
  
  <script setup>
  import { useFooterStore } from '../stores/useFooterStore'
  const store = useFooterStore()
  </script>
  