<template>
    <!-- <section id="hero" class="hero section">
      <div class="container" data-aos="fade-up" data-aos-delay="100">
        <div class="row align-items-center">
          <div class="col-lg-6">
            <div class="hero-content" data-aos="fade-up" data-aos-delay="100">
              <div style="font-weight: normal" class="company-badge mb-4" >
                {{ store.intro }}
              </div>
              <h2 class="mb-4" style="color: #C5A070">
                {{ store.titre }}
              </h2>
              <p class="mb-4 mb-md-5" style="font-size: 20px;">
                {{ store.description }}
              </p>
              <div class="hero-buttons">
                <a style="font-weight:bold ;" :href="store.contactHref" class="btn btn-primary me-0 me-sm-2 mx-1">{{ store.contactText }}</a>
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
  
        <div class="row stats-row gy-4 mt-5" data-aos="fade-up" data-aos-delay="500">
          <div v-for="(stat, index) in store.stats" :key="index" class="col-lg-3 col-md-6">
            <div class="stat-item">
              <div class="stat-icon">
                <i :class="stat.icon"></i>
              </div>
              <div class="stat-content">
                <h4 style="color: #5E5325;">{{ stat.title }}</h4>
                <p class="mb-0">{{ stat.description }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section> -->

    <section id="hero" class="hero section">
  <div class="container">
    <div class="row align-items-center">
      
      <!-- Texte gauche -->
      <div class="col-lg-6" data-aos="fade-right">
        <div class="hero-content">
          <div class="company-badge mb-3">
            {{ store.intro }}
          </div>
          <h1 class="hero-title mb-4">
            {{ store.titre }}
          </h1>
          <p class="hero-description mb-4">
            {{ store.description }}
          </p>
          <div class="hero-buttons d-flex flex-wrap gap-3">
            <a :href="store.contactHref" class="btn-primary-filled">{{ store.contactText }}</a>
            <a :href="store.videoUrl" class="btn-outline">
              <i class="bi bi-play-circle me-1"></i>
              {{ store.videoText }}
            </a>
          </div>
        </div>
      </div>

      <!-- Image droite -->
      <div class="col-lg-6 text-center" data-aos="zoom-in">
        <div class="hero-image">
          <img :src="store.image" alt="Hero Image" class="img-fluid rounded" />
          <div class="customers-badge mt-3">
            <p class="mb-0">{{ store.message }}</p>
          </div>
        </div>
      </div>
    </div>

  </div>
  <div class="wave-container">
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 100" preserveAspectRatio="none">
    <path d="M0 0v90.2C49.7 99.9 105 82 160 65c75.5-23.3 145.5-22.4 222-3 63 16 119 14 173-8 79.5-32.4 156.2-27.6 240-10 82.6 17.4 143-1 205-31.7V0H0Z" class="wave-shape"></path>
  </svg>
</div>

<div class="row stats-row gy-4 mt-5 justify-content-center">
  <div
    v-for="(stat, index) in store.stats"
    :key="index"
    class="col-12 col-md-6 col-lg-6"
  >
    <div class="stat-item text-center">
      <div class="stat-icon">
        <i :class="stat.icon"></i>
      </div>
      <div class="stat-content">
        <h4 style="color: #5E5325;">{{ stat.title }}</h4>
        <p class="mb-0">{{ stat.description }}</p>
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

<style scoped>

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.stat-icon {
  background-color: #fdf7ef;
  border-radius: 50%;
  padding: 20px;
  margin-bottom: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.stat-icon i {
  font-size: 24px;
  color: #C5A070; /* ou une autre couleur de ta palette */
}


.wave-container {
  position: relative;
  width: 100%;
  height: 100px;
  overflow: hidden;
  line-height: 0;
  margin-bottom: -49px;
  
}


.wave-container svg {
  position: relative;
  display: block;
  width: 100%;
  height: 100%;
  transform: rotate(180deg);
}

.wave-shape {
  fill: white;
}


.hero {
  position: relative;
  background: var(--color-light-blue);
  padding: 200px 0 140px; /* ➕ plus de padding bas pour laisser la place au SVG */
  padding-bottom: 0;
  margin-bottom: 0;
}


.hero-title {
  font-size: 2.8rem;
  font-weight: bold;
  color: var(--color-teal); /* #C5A070 */
}

.hero-description {
  font-size: 1.1rem;
  color: #555;
  max-width: 500px;
}

.company-badge {
  font-weight: 600;
  color: var(--color-dark-brown); /* #5E5325 */
  text-transform: uppercase;
  letter-spacing: 1px;
  font-size: 0.9rem;
}

.btn-primary-filled {
  background-color: var(--color-teal);
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  text-decoration: none;
  font-weight: bold;
  transition: background 0.3s;
}

.btn-primary-filled:hover {
  background-color: #b88c54;
}

.btn-outline {
  background-color: transparent;
  color: var(--color-dark-brown);
  border: 2px solid var(--color-dark-brown);
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  text-decoration: none;
  font-weight: bold;
  transition: all 0.3s ease;
}

.btn-outline:hover {
  background-color: var(--color-dark-brown);
  color: white;
}

.hero-image img {
  max-width: 100%;
  border-radius: 12px;
}

.customers-badge {
  background-color: var(--color-cream);
  padding: 0.6rem 1rem;
  border-radius: 20px;
  color: var(--color-dark-brown);
  font-size: 0.9rem;
  display: inline-block;
}

</style>