<template>
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
              <!-- <a :href="store.videoUrl" class="btn-outline glightbox">
                <i class="bi bi-play-circle me-1"></i>
                {{ store.videoText }}
              </a> -->
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

    <!-- Wave separator -->
    <div class="wave-container">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 100" preserveAspectRatio="none">
        <path d="M0 0v90.2C49.7 99.9 105 82 160 65c75.5-23.3 145.5-22.4 222-3 63 16 119 14 173-8 79.5-32.4 156.2-27.6 240-10 82.6 17.4 143-1 205-31.7V0H0Z" class="wave-shape"></path>
      </svg>
    </div>

   <!-- Encadré avec icônes et textes -->
<div class="container my-5"
     data-aos="fade-up"
     data-aos-duration="1000"
     data-aos-offset="120"
     data-aos-easing="ease-in-out">
  <div class="row">
    <div
      v-for="(stat, index) in store.stats"
      :key="index"
      class="col-12 col-sm-6 col-md-4 col-lg-3 mb-4 text-center"
      :data-aos="'zoom-in'"
      :data-aos-delay="index * 150"
      data-aos-duration="900"
      data-aos-easing="ease-out-cubic"
    >
      <div class="p-4 bg-white shadow rounded h-100 d-flex flex-column align-items-center justify-content-center">
        <div class="feature-icon mb-3">
          <i :class="stat.icon" style="color:#45A79E"></i>
        </div>
        <div class="feature-text">
          <h5 class="fw-bold">{{ stat.title }}</h5>
          <p class="text-muted small">{{ stat.description }}</p>
        </div>
      </div>
    </div>
  </div>
</div>

  </section>
</template>

<script setup>
import { onMounted } from 'vue'
import { useAccueilStore } from '../stores/useAccueilStore'
import GLightbox from 'glightbox'
import 'glightbox/dist/css/glightbox.min.css'
import AOS from 'aos'
import 'aos/dist/aos.css'

const store = useAccueilStore()

onMounted(() => {
  AOS.init({
    once: true,
    offset: 120,
    duration: 800,
    easing: 'ease-in-out'
  })

  GLightbox({ selector: '.glightbox' })
})
</script>


<style scoped>
:root {
  --color-light-blue: #d6e7fd;
  --color-teal: #45A79E;
  --color-dark-brown: #45A79E;
  --color-cream: #fdf7ef;
}

.hero {
  position: relative;
  background: var(--color-light-blue);
  /* padding: 0px 0 80px; */
  margin-bottom: 0;
}

.hero-title {

  /* font-weight: gra; */
  font-size: 2.3rem !important;
  color: var(--color-teal);
  /* white-space: nowrap; */
}

.hero-description {
  font-size: 1.1rem;
  color: #555;
  max-width: 500px;
}
/* .fs-1 text-primary{
  color:#45A79E;
} */
.company-badge {
  font-weight: 600;
  color: var(--color-dark-brown);
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
  background-color: #71bab3;
}
.stat.icon{
  color:#71bab3;
}
.btn-outline {
  background-color: transparent;
  color: #45A79E;
  border: 2px solid #45A79E;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  text-decoration: none;
  font-weight: bold;
  transition: all 0.3s ease;
}

.btn-outline:hover {
  background-color: #45A79E;
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

.wave-container {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 100px;
  overflow: hidden;
  line-height: 0;
  z-index: 0;
}

.wave-container svg {
  display: block;
  width: 100%;
  height: 100%;
  transform: rotate(180deg);
}

.wave-shape {
  fill: white;
}

.feature-box-wrapper {
  background: white;
  margin-top: -30px;
  margin-bottom: -70px;
  padding: 2rem 1rem;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.05);
  border-radius: 24px;
  width: 85%;
  max-width: 1100px;
  margin-left: auto;
  margin-right: auto;
  z-index: 2;
  position: relative;
}

.feature-box {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 2rem;
  text-align: center;
}

.feature-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.8rem;
}

.feature-icon {
  background: var(--color-cream);
  padding: 20px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);

}

.feature-icon i {
  font-size: 28px;
  color: var(--color-teal);
}

.feature-text h5 {
  font-size: 1.1rem;
  color: var(--color-dark-brown);
  font-weight: 600;
  margin: 0;
}

.feature-text p {
  font-size: 0.95rem;
  color: #666;
  margin: 0;
}


@media (max-width: 600px) {
  
.hero-title {

/* font-weight: gra; */
font-size: 2.3rem !important;
color: var(--color-teal);

}
  
}
</style>
