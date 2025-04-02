<template>
  <section id="about" class="about section">
    <div class="container" data-aos="fade-up" data-aos-delay="100">
      <div class="row gy-4 align-items-center justify-content-between">
        <div class="col-xl-5" data-aos="fade-up" data-aos-delay="200">
          <span class="about-meta">{{ aProposStore.title }}</span>
          <h2 class="about-title"></h2>
          <p class="about-description">{{ aProposStore.description }}</p>

          <div class="row feature-list-wrapper">
            <p class="about-description">{{ aProposStore.additionalInfo }}</p>
          </div>
        </div>

        <div class="col-xl-6" data-aos="fade-up" data-aos-delay="300">
          <div class="image-wrapper">
            <div class="images position-relative" data-aos="zoom-out" data-aos-delay="400">
              <img :src="aProposStore.imageUrl" alt="Business Meeting" class="img-fluid main-image rounded-4">
              <img :src="aProposStore.smallImageUrl" alt="Team Discussion" class="img-fluid small-image rounded-4">
            </div>
            <div class="experience-badge floating">
              <h3>{{ aProposStore.experienceYears }}+ <span>Années</span></h3>
              <p>Expérience dans le domaine des services aux entreprises</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { useAProposStore } from '../stores/aProposStore'

export default {
  name: 'APropos',
  setup() {
    // Utilisation du store
    const aProposStore = useAProposStore()
    return { aProposStore }
  }
}
</script>
