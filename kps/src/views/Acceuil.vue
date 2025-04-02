<template>
    <section id="hero" class="hero section">
      <div class="container" data-aos="fade-up" data-aos-delay="100">
        <div class="row align-items-center">
          <div class="col-lg-6">
            <div class="hero-content" data-aos="fade-up" data-aos-delay="200">
              <div class="company-badge mb-4">
                {{ store.intro }}
              </div>
              <h2 class="mb-4" style="color: #45A79E;">
                {{ store.titre }}
              </h2>
              <p class="mb-4 mb-md-5" style="font-size: 20px;">
                {{ store.description }}
              </p>
              <div class="hero-buttons">
                <a :href="store.contactHref" class="btn btn-primary me-0 me-sm-2 mx-1">{{ store.contactText }}</a>
                <a :href="store.videoUrl" class="btn btn-link mt-2 mt-sm-0 glightbox">
                  <i class="bi bi-play-circle me-1"></i>
                  {{ store.videoText }}
                </a>
              </div>
            </div>
          </div>
  
          <div class="col-lg-6">
            <div class="hero-image" data-aos="zoom-out" data-aos-delay="300">
              <img :src="store.image" alt="Hero Image" class="img-fluid" />
              <div class="customers-badge">
                <p class="mb-0 mt-2">{{ store.message }}</p>
              </div>
            </div>
          </div>
        </div>
  
        <!-- Statistiques dynamiques -->
        <div class="row stats-row gy-4 mt-5" data-aos="fade-up" data-aos-delay="500">
          <div v-for="(stat, index) in store.stats" :key="index" class="col-lg-3 col-md-6">
            <div class="stat-item">
              <div class="stat-icon">
                <i :class="stat.icon"></i>
              </div>
              <div class="stat-content">
                <h4>{{ stat.title }}</h4>
                <p class="mb-0">{{ stat.description }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </template>
  
  <script setup>
import { onMounted } from 'vue' // ✅ import manquant

import { useAccueilStore } from '../stores/useAccueilStore'
const store = useAccueilStore()

import GLightbox from 'glightbox'
import 'glightbox/dist/css/glightbox.min.css'

onMounted(() => {
  GLightbox({
    selector: '.glightbox'
  })
})
</script>
